# Voice & Writing Style Guide

Extends `CLAUDE.md`'s "Writing Style" section with the specifics that have actually held up across the Wise Platform, ADFS/SPCP, and Adyen POS series -- concrete enough to self-check a draft against, not just "casual and friendly."

## Voice

- First person, personal-project framing: "I wanted to understand this," "I ran this test," not "one might explore" or third-person case-study language.
- Present the work as genuine curiosity-driven investigation, not a tutorial handed down from authority. The reader is looking over your shoulder while you figure something out, not being lectured at.
- It's fine, even good, to say "I expected X, got Y" -- the gap between expectation and result is usually the most interesting sentence in the article. Don't smooth it into a flat, expected-outcome narrative after the fact.

## Every claim needs a receipt

This is the single most load-bearing rule across every series so far. Don't write "the API returns an error in this case" -- show the actual JSON error response. Don't write "the UI shows a warning" -- show the screenshot and quote the exact copy. If a claim can be backed by a real artifact (JSON snippet, screenshot, log line, source-code excerpt), it must be, inline, not just described.

- **Real values, not placeholders**, wherever the source material has them: real (if sandbox/test-environment) transaction IDs, rates, timestamps, error codes -- not `<your-value-here>`. Redact only what's genuinely sensitive (API keys, tokens); everything else stays concrete.
- When a response is trimmed for length, say so explicitly (`// paymentOptions[] omitted here for length`) rather than silently presenting a partial JSON blob as if it were complete.
- Prefer showing the actual source code of a tool being tested (a mock server's routing logic, a config file) over describing its behavior secondhand, when that source is available -- it's a stronger, more falsifiable claim than "this tool seems to always return the same response."

## Findings over features

Structure articles around what was *discovered* (an undocumented behavior, an unexplained discrepancy, a hard technical wall) rather than a flat "step 1, step 2, step 3" feature tour. A callout like:

{: .important }
This is not documented anywhere in the vendor's official docs. Confirmed empirically, not assumed.

...is worth more than a paragraph of generic description. If a test came back exactly as documented with no surprises (this happens, and should be reported too, not just the surprising ones) -- say so plainly rather than manufacturing false tension.

## Honesty about limits

Say directly when something couldn't be tested, wasn't resolved, or is still an open question -- don't paper over a gap with confident-sounding hedge words. "I don't have access to X, so I can't say definitively why" is a better sentence than a vague implication that everything was figured out. A whole article can legitimately be "here's exactly why this couldn't be tested, and here's proof I actually tried" (see the POS cloud-limitation closer) -- that's not a weaker result than a passing test, it's a different kind of useful result.

## Callouts -- when to reach for each

| Callout | Use for |
|---|---|
| `{: .note }` | A clarifying aside, a definitional point, a "worth knowing" detail that isn't the main thread |
| `{: .warning }` | Something that will actually break if the reader doesn't know it -- a strict ordering requirement, a hard limitation |
| `{: .important }` | The actual finding/takeaway of a section -- what a practitioner (TSE, implementation engineer, developer) would need to know on the job |
| `{: .highlight }` | A short, punchy framing statement, usually near the top of an article, that orients the rest of the read |

Don't overuse callouts to the point they lose meaning -- reserve them for the sentence that would genuinely be worth re-reading if skimming. A 200-word callout is a sign the content belongs in a regular paragraph instead.

## Structure

- Every article: `# Title` with `{: .no_toc }`, then the collapsible TOC block, then a short opening paragraph that states what this post is and why it exists (often: what it builds on from a previous post, or what question it's answering).
- Section headings (`##`) should describe a step, a finding, or a question -- not a generic label. "The sandbox surprise: an uninvited jump to `bounced_back`" over "Additional Observations."
- Close with a one-paragraph honest summary of what the piece actually demonstrated (not a restatement of the intro), then the sign-off line.

## Sign-off

Always end with a short, warm, consistent closer. The two in current rotation:

- "Until next time, peace and love!"
- "That's a wrap! Peace and love, Shafik."

Pick one per article; don't invent new variants without a reason -- consistency here is part of the voice, not a place for novelty.

## Diagrams

Prefer Mermaid `sequenceDiagram`/`stateDiagram-v2`/`flowchart` over prose descriptions of a flow whenever more than ~3 steps/participants are involved -- it renders natively and reads faster than an equivalent paragraph. Reuse a diagram from an earlier post in the same series verbatim (with a link back) rather than redrawing a slightly different version of the same thing -- consistency across a series matters more than each post being fully self-contained.
