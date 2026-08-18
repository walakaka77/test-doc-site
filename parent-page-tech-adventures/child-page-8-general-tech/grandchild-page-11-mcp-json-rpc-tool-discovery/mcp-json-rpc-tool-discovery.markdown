---
layout: page
title: "JSON-RPC, Capability Negotiation, and What Actually Crosses the Pipe"
permalink: /tech-adventures/general-tech/mcp-json-rpc-tool-discovery
parent: General Tech
grand_parent: Tech Adventures
nav_order: 11
index: 'yes'
follow: 'yes'
description: What actually travels over the pipe between Claude Code and an MCP server -- real captured JSON-RPC messages, the difference between capability negotiation and tool discovery, and why a whole SDK exists to fake a "direct function call" across a process boundary that doesn't allow one.
---

# JSON-RPC, Capability Negotiation, and What Actually Crosses the Pipe
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

[Last post](/tech-adventures/general-tech/mcp-server-mental-model) established that Claude Code and an MCP server (in this case, [the Acuity Scheduling MCP server](https://github.com/walakaka77/acuity-mcp)) are two separate processes talking over a pipe -- and that a pipe is just a wire for raw bytes, with no concept of "requests" or "tools" built in. This post is about the layer on top of that wire: what the bytes actually spell out, captured directly rather than described secondhand.

## Capturing the real exchange

`server.js` is a normal Node script -- it doesn't care whether its stdin is wired to Claude Code or to a terminal. So the exact thing Claude Code does can be reproduced by hand:

```bash
printf '%s\n' \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{"roots":{"listChanged":true},"sampling":{}},"clientInfo":{"name":"demo-client","version":"1.0"}}}' \
  | node server.js
```

Response, formatted for readability:

```json
{
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "tools": { "listChanged": true }
    },
    "serverInfo": { "name": "acuity-mcp", "version": "2.0.0" }
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

That's a real request and a real response, captured from the actual repo, not a paraphrase.

## The message format: JSON-RPC 2.0

Every message is one JSON object, one per line. The shared rule both sides follow:

- `method` -- which operation to run, like a function name.
- `id` -- a ticket number. Whichever reply carries the same `id` is the answer to *that specific* request -- this is what lets several requests be in flight over the same pipe at once without confusion about which reply belongs to which.
- `jsonrpc` -- a version tag, always `"2.0"`.

This isn't an MCP invention. **JSON-RPC** is a pre-existing, general-purpose standard, and MCP picked it as the vocabulary spoken over the pipe from [the previous post](/tech-adventures/general-tech/mcp-server-mental-model). Pipes are the wire; JSON-RPC is the language agreed upon for what a sentence over that wire looks like.

{: .note }
The pattern of "JSON-RPC messages over stdio pipes" isn't unique to MCP, either -- the Language Server Protocol (how VS Code talks to language analyzers like `tsserver` or `pyright`) uses the exact same combination.

## Capability negotiation: the very first handshake

The `initialize` exchange above is **capability negotiation** -- and it's worth being precise about what that word means here, because it's easy to conflate with the next section.

I told the server: "I support `roots` and `sampling`" (things a *client* can offer). The server told me back: "I support `tools`, and specifically I'll tell you when my tool list changes (`listChanged: true`). I do not support `resources`, `prompts`, or `logging`." Neither side has to support everything the spec allows -- they just need to know, after this one exchange, what the *other* side is actually capable of. This server never implemented `resources` or `prompts` (separate MCP features for exposing readable data or reusable prompt templates) because it didn't need them, and its capability response says so honestly.

## Tool discovery: a different, later step

Once negotiation confirms `tools` is supported, Claude Code asks a separate question: *what tools, specifically, and what does each one need?*

```json
{"jsonrpc":"2.0","id":2,"method":"tools/list"}
```

Here's `create_appointment`'s real advertised schema, pulled directly from a live `tools/list` response against this repo:

```json
{
  "name": "create_appointment",
  "description": "Book a new appointment on the live Acuity calendar. This sends real confirmation emails to the client unless the account is configured otherwise — confirm with the user before calling.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "appointmentTypeID": { "type": "integer" },
      "datetime": { "type": "string", "description": "ISO 8601 datetime, e.g. 2026-08-10T14:00:00+08:00" },
      "firstName": { "type": "string" },
      "lastName": { "type": "string" },
      "email": { "type": "string" },
      "phone": { "type": "string" },
      "calendarID": { "type": "integer" },
      "notes": { "type": "string" },
      "timezone": { "type": "string" },
      "account": { "type": "string", "description": "Named Acuity account to use for this call..." }
    },
    "required": ["appointmentTypeID", "datetime", "firstName", "lastName", "email"],
    "additionalProperties": false
  }
}
```

{: .warning }
**Misconception I had to correct in myself:** I initially assumed this worked in two round trips per tool -- "what tools exist?", then, separately, "okay, give me *this* tool's parameters." It doesn't. `tools/list` returns *every* tool's full schema, all at once, in a single response. Claude Code caches that whole menu up front; a later `tools/call` just uses the arguments it already knows are required, with no extra round trip to ask.

| | Capability negotiation (`initialize`) | Tool discovery (`tools/list`) |
|---|---|---|
| When | Once, at session start | After `initialize`; typically once, cached |
| Granularity | Coarse: whole feature categories (tools / resources / prompts) | Fine: exact tool names + full input schemas |
| Answers | "Can I even ask about tools at all?" | "What are they, and what does each one need?" |

That `inputSchema` isn't hand-typed twice, either -- it's auto-generated from the same `zod` validation definitions the server's code already needed at runtime, in [server.js](https://github.com/walakaka77/acuity-mcp/blob/main/server.js). Write the validation once, get the advertisable schema for free.

## The real question: why does any of this need an SDK at all?

Once a tool is known, calling it is one more message:

```json
{"jsonrpc":"2.0","id":9,"method":"tools/call","params":{"name":"create_appointment","arguments":{"appointmentTypeID":97219000,"datetime":"2026-08-25T14:00:00+08:00","firstName":"Jane","lastName":"Doe","email":"jane@example.com","account":"sandbox"}}}
```

The server looks up `create_appointment`, runs its handler function, and eventually a real Acuity API call happens. This raises the obvious question: **why go through all this JSON message-passing at all -- why can't Claude Code just call the handler function directly?**

The answer isn't "the SDK adds convenience over a simpler option." Direct calling was never an option, for exactly the reason from the previous post: two OS processes have no shared memory, so there is no such thing as "just calling a function that lives in the other one." The only way to get *the effect of* calling a remote function is to fake it -- send a message describing the call, have the other side receive it, run the real function locally, send a message back with the result. That faked function call is literally what **RPC** stands for: **R**emote **P**rocedure **C**all. It's in the protocol's name -- JSON-**RPC** -- not by coincidence.

Given that, the `@modelcontextprotocol/sdk` library (open source, MIT-licensed, published by Anthropic -- the same company behind Claude, though the protocol itself has independent implementations in multiple languages) exists to implement that illusion correctly, so a project like this one never has to hand-roll:

- Parsing raw bytes off a pipe into distinct messages (pipes give you no free message boundaries).
- Matching a response to the right request when several are in flight (that `id` field).
- Validating arguments before a handler runs, and returning a clean error instead of crashing on malformed input.
- Generating an advertisable schema from the same validation code, instead of maintaining two descriptions by hand.
- Speaking the exact same dialect every other MCP server does -- which is the actual payoff: Claude Code can talk to this Acuity server, a Notion server, a Google Drive server, and anything written tomorrow, with zero custom glue code per integration, because they all obey the same SDK-enforced message shapes.

## Where this series goes next

Everything so far has stayed entirely local to this one machine -- a pipe, JSON-RPC, a handler function getting matched and called. None of it has touched the actual internet yet. The next post is about the other end of that handler: the point where `server.js` stops talking MCP entirely and becomes an ordinary HTTP client hitting Acuity's real API -- and a wrong assumption I made about how that connection works, which turned out to be the most useful mistake in the whole investigation. [Continued here](/tech-adventures/general-tech/mcp-server-api-bridge).

## Images Required

None for this article — it's real captured protocol output and code throughout.

Until next time, peace and love!
