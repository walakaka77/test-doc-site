---
layout: page
title: "153 Documents, Two Insurers, One Popup Blocker"
permalink: /tech-adventures/general-tech/ai-insurance-bulk-document-download
parent: General Tech
grand_parent: Tech Adventures
nav_order: 15
index: 'yes'
follow: 'yes'
description: What it actually took to pull six years of insurance documents from two Singapore insurers once Claude Code was logged in -- a fight with a popup blocker, a batching pattern, and the real time this saved.
---

# 153 Documents, Two Insurers, One Popup Blocker
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

[Part 1 of this series](/tech-adventures/general-tech/ai-insurance-singpass-safety) covered why it was safe to let Claude Code drive a browser toward two Singpass-gated insurance portals in the first place -- the short version being that Singpass itself won't let anything but a live human finish the login. This post is about what happened *after* that login: turning "I'm now looking at a table of documents" into "I have 153 organised PDFs on disk," across 6 policies and 2 insurers.

## Finding the actual document list

Each portal buries its document history a few clicks deep: dashboard, into "All Policies," click a specific policy card, then a separate "eDocuments" tile at the bottom of that page. The first real lesson here was a wrong guess, not a right one: deep-linking straight to a policy's detail URL after logging in loaded a blank "NON-SERVICING" page with every field showing `-`. The single-page app keeps track of "which policy is currently selected" only in memory, not in the URL -- so the only reliable path is always **Dashboard → All Policies → click the policy card**, never a shortcut straight to the detail page.

Once there, one insurer's eDocuments table went back to 2019 -- 61 rows for a single hospitalisation policy alone, everything from the original application form to a servicing letter sent the same week this project started.

## The mechanism: intercept the data, not the viewer

Clicking a document's download icon runs the insurer's own JavaScript, which:

1. POSTs to an internal API with the document's ID.
2. Gets back JSON shaped like `{"success":true,"data":{"fileName":"...", "fileBody":"<base64-encoded PDF>"}}`.
3. Turns that into a Blob and calls `window.open()` on it, opening the PDF inside **Chrome's own built-in PDF viewer** -- a browser plugin, not a webpage.

That third step is a dead end for automation. Chrome's native PDF viewer has no accessibility tree Playwright can see into -- no buttons to find, no download link to click. Trying to automate *that* viewer is the wrong target entirely.

The fix is to intercept the data one layer earlier, before it ever becomes a PDF viewer:

```javascript
window.fetch = async (...args) => {
  const res = await origFetch(...args);
  const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
  if (url && url.includes('/edocument/preview')) {
    window.__pending = res.clone();
  }
  return res;
};
```

`window.fetch` gets swapped out for a version that clones any response matching the document-preview endpoint and stashes it, then lets the original call through unmodified. The real click still happens -- the insurer's own code still runs, still gets its data -- Claude Code is just also holding onto a copy.

## The popup blocker that ate an hour

The obvious next move was to stop `window.open()` from actually opening a tab, since the PDF viewer was never going to be useful anyway:

```javascript
window.open = () => null; // seemed reasonable
```

It backfired immediately. The insurer's own code checks whether its `window.open()` call succeeded, and when it got `null` back, it assumed the *browser's* popup blocker was active and threw up its own modal: **"Pop up blocker detected — please ensure pop-up blocker is turned off."** That modal then sat on top of the page, intercepting every subsequent click until dismissed.

{: .important }
This was the single biggest time-sink in the whole project -- not the Singpass login, not the JSON structure, a self-inflicted popup blocker fight. The fix wasn't to block `window.open()`, it was to satisfy it:

```javascript
window.open = () => ({ focus(){}, close(){}, closed: false });
```

A fake-but-truthy object -- something with the shape `window.open()`'s caller expects, that just does nothing when used. The insurer's code sees a "successful" open and moves on quietly. No dialog, no real tab, no popup blocker anywhere in the loop.

{: .note }
Clicking the actual row also needed a plain DOM `querySelector`, not Playwright's accessibility-role locator -- every row's download icon shares the identical accessible name ("file"), so role-based `nth()` targeting occasionally clicked the wrong row or silently did nothing. Querying `tbody tr`, indexing into the specific row, then `querySelector('img[alt="file"]')` inside *that* row fixed it.

## Batching, not one document at a time

With 61 documents in one policy alone, doing this one click per tool call would have meant dozens of round trips. Instead, the loop lives inside a single browser-side script, 5 documents per batch:

```javascript
async () => {
  const results = [];
  const rows = document.querySelectorAll('tbody tr');
  for (let i = START; i < END && i < rows.length; i++) {
    const row = rows[i];
    const icon = row.querySelector('img[alt="file"]');
    window.__pending = null;
    icon.click();
    let waited = 0;
    while (!window.__pending && waited < 8000) {
      await new Promise(r => setTimeout(r, 100));
      waited += 100;
    }
    let json = null;
    if (window.__pending) { try { json = await window.__pending.json(); } catch (e) {} }
    results.push({ /* docName, category, docDate, fileBody */ });
    await new Promise(r => setTimeout(r, 200)); // be polite to their API
  }
  return results;
}
```

That result -- base64 PDF data for 5 documents at once -- gets written straight to a file on disk rather than passed back through the conversation as text (5 documents' worth of base64 is a lot of tokens for data that's just going to be written to disk anyway). A small Python script then does the purely mechanical part: decode the base64, parse the document's date, build a sensible filename (`2024-02-20_official-receipt.pdf`), de-duplicate when two documents share the same name and date (which genuinely happens), and validate that what comes out actually starts with a PDF's magic bytes before trusting it.

## Two agents, one browser, one lock file

Partway through, a second Claude Code session on the same machine picked up the other insurer's policies at the same time, using the same registered browser tool. That's a real instance of the pattern from an [earlier post on running concurrent AI agents safely](/tech-adventures/general-tech/ai-concurrent-agent-workflow) -- except here the shared resource wasn't a ticket queue, it was a single Chrome process.

Playwright's browser holds an OS-level lock (`SingletonLock`) on its profile directory for as long as it's running, regardless of whether either session is actively clicking anything. The second session's first attempt failed outright: *"Browser is already in use... use --isolated."* The fix was simple once the actual constraint was clear -- the first session called `browser_close()`, releasing the lock (cookies are stored on disk in the profile directory, not lost), and confirmed it in a message to the other session before it relaunched against the same profile.

{: .note-title }
> Cookies survive; the lock doesn't
>
> Because the profile isn't `--isolated`, closing the browser only releases the process lock -- both insurers' login sessions were still sitting in the profile directory afterward, exactly where the second session needed them.

## What this actually saved

Reconstructed from real file timestamps, not memory:

| Phase | Time taken |
|---|---|
| Setup -- registering the MCP server, first login, finding the download mechanism (including the popup blocker fight above) | ~1 hour |
| Bulk retrieval -- 153 documents, 6 policies, 2 insurers, once the mechanism worked | **~35 minutes** |
| Manual-human equivalent for the same scope | conservatively **10-15+ hours** |

That manual estimate isn't padding: 153 documents at even a brisk 1-2 minutes each to find, view, download, and sensibly rename comes to roughly 4 hours on its own -- before accounting for repeated Singpass logins as hour-long sessions expire, or actually reading any of what got downloaded closely enough to know what it says.

{: .highlight }
That last point turns out to matter more than the time saved on clicking. [Part 3 of this series](/tech-adventures/general-tech/ai-insurance-contract-analysis) is about what was actually sitting inside those 153 PDFs -- including a coverage design flaw in one policy that most people holding a similar plan probably don't know exists, because reading a 68-page insurance contract closely enough to find it is exactly the kind of task nobody does manually.

Until next time, peace and love!
