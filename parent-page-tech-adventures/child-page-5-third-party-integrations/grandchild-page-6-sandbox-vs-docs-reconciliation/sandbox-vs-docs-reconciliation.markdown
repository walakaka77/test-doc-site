---
layout: page
title: When Sandbox Behavior Doesn't Match the Docs
permalink: /tech-adventures/third-party-integrations/sandbox-vs-docs-reconciliation
parent: Third Party Integrations
grand_parent: Tech Adventures
nav_order: 6
index: 'yes'
follow: 'yes'
description: Four controlled experiments against the Wise Platform sandbox -- quote expiry, rate expiry, idempotency, and an unresolved fee discrepancy -- reconciling documented API behavior against what actually happens.
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-6-sandbox-vs-docs-reconciliation/01-rate-no-longer-guaranteed-banner.png
---

# When Sandbox Behavior Doesn't Match the Docs: Quote Expiry, Rate Expiry & a Fee Mystery
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

The [previous post](/tech-adventures/third-party-integrations/postman-cross-border-transfer-testing) walked through a full happy-path-ish transfer against Wise Platform's sandbox. That run raised a question I couldn't let go of: the quote said the fee was 1.29 SGD, but the UI showed 8.17 SGD for the exact same transfer. Was that a one-off sandbox glitch, or something systematic?

So I stopped running a single demo flow and started running **controlled experiments** -- pairs of transfers where I deliberately varied one condition (timing, repeat requests) and compared the before/after state at each stage. This post covers four of those experiments: two where the sandbox behaved exactly as documented, one where it behaved reasonably but the documentation simply doesn't say what happens, and one where I still don't have an answer. This is the part of the exercise that's closest to what integration support work actually looks like -- reading the spec, forming a hypothesis, then testing it against the live system instead of trusting either source blindly.

{: .highlight }
Quick vocabulary check before diving in: a Wise quote has **two separate expiry clocks**. `expirationTime` is a 30-minute window to *create* a transfer against the quote. `rateExpirationTime` is a much longer window (4 days, in my testing) to *fund* that transfer at the locked rate. They fail differently, as you'll see below.

## Experiment 1 — What happens when you create a transfer with an expired quote?

**Setup**: Sandbox V2 (`api.wise-sandbox.com`), personal profile `29263618`. Create a quote, let its 30-minute `expirationTime` pass, then attempt `POST /v1/transfers` against it.

My first attempt was inconclusive -- I built in too little margin and the quote was still technically valid when I hit the endpoint. Second attempt: fresh quote `4b3d0d31-60ac-45c9-9b15-151116e8c5c7`, created at `06:03:53Z`, expired at `06:33:53Z`. I waited past expiry, then created the transfer:

```json
{
  "errors": [
    {
      "code": "error.quote.not.found",
      "message": "We couldn't find a quote with that ID (4b3d0d31-60ac-45c9-9b15-151116e8c5c7)",
      "arguments": ["4b3d0d31-60ac-45c9-9b15-151116e8c5c7"]
    }
  ]
}
```

### The finding

I expected something like `error.quote.expired`. What actually comes back is `error.quote.not.found` -- **the quote isn't marked expired, it's purged entirely.** The error is indistinguishable from passing a `quoteUuid` that was never created in the first place.

{: .warning }
I checked Wise's [error handling guide](https://docs.wise.com/guides/developer/errors), the [quotes guide](https://docs.wise.com/guides/product/send-money/quotes), and the public [GitHub API docs](https://github.com/transferwise/api-docs/blob/master/source/includes/reference/_quotes.md). All three state the 30-minute window. None of them specify what error code you actually get once it passes. This is undocumented behavior, confirmed empirically.

**Why this matters in practice**: a partner engineer seeing `error.quote.not.found` on transfer creation cannot tell, from the error alone, whether the `quoteUuid` expired, was mistyped, or came from the wrong environment (sandbox vs. production tokens are easy to cross wire). The right diagnostic question becomes "when was the quote created, and how long after did you try to use it?" rather than trusting the error message at face value.

## Experiment 2 — What happens when you fund a transfer after the rate lock expires?

This is the one I ran as a proper control-vs-test pair, since it's the highest-stakes question: does the customer's guaranteed rate actually get enforced?

**Setup**: two nearly-identical transfers. One (**control**) gets funded *within* the 4-day `rateExpirationTime` window. The other (**test**) gets funded *after* it. Same corridor, same amount, same environment (Sandbox V2, personal profile).

| | Control | Test |
|---|---|---|
| Transfer ID | `2147719694` | `2147719426` |
| Original locked rate | `0.579488` | `0.579263` |
| `rateExpirationTime` | `2026-07-07T06:06:06Z` | `2026-07-07T05:40:53Z` |
| Funded | Within window (3 Jul) | After window (8 Jul) |

### Control result: rate held exactly as documented

| Stage | Rate | sourceValue | targetValue |
|---|---|---|---|
| `incoming_payment_waiting` | `0.579488` | 191.62 SGD | 111.04 GBP |
| `processing` | `0.579488` ✅ | 191.78 SGD | 111.13 GBP |
| `funds_converted` | `0.579488` ✅ | 191.78 SGD | 111.13 GBP |

No surprises here. Funding inside the rate-lock window preserves the exact rate from the quote, at every stage.

### Test result: the rate gets silently zeroed, then silently repriced

| Stage | Rate | sourceValue | targetValue |
|---|---|---|---|
| `incoming_payment_waiting` (baseline, 3 Jul) | `0.579263` | 191.62 SGD | 111.00 GBP |
| `incoming_payment_waiting` (re-checked post-expiry, 8 Jul) | **`0.0`** | 191.62 SGD | **`0.00`** |
| `processing` (funded post-expiry) | **`0.578983`** | 191.75 SGD | 111.02 GBP |
| `funds_converted` | `0.578983` | 191.75 SGD | 111.02 GBP |
| `outgoing_payment_sent` | `0.578983` | 191.75 SGD | 111.02 GBP |

### The finding

Funding was **not rejected**. Instead, two things happen, in order:

1. Once `rateExpirationTime` passes, Wise actively nulls the rate on the transfer record (`rate: 0.0`, `targetValue: 0.00`) while the transfer just sits in `incoming_payment_waiting`. This isn't a display quirk -- it's the transfer record itself.
2. When funding is eventually attempted, Wise silently reprices to whatever the *live market rate* is at that moment (`0.578983`, not the originally quoted `0.579263`) and processes the transfer normally.

The UI does surface a warning, to its credit:

![Sandbox UI: rate no longer guaranteed banner](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-6-sandbox-vs-docs-reconciliation/01-rate-no-longer-guaranteed-banner.png)

> *"Your rate is no longer guaranteed. So when we receive your money, we'll convert it at the live rate."*

The UI's displayed rate (`≈ 0.5790`) matches the repriced API value (`0.578983`) exactly. UI and API are consistent with each other -- it's the *quote's original promise* that silently doesn't hold.

{: .important }
**TSE-relevant implication**: `rateExpirationTime` is enforced as a repricing trigger, not a hard funding deadline. A partner whose customer funds after this window will see their recipient receive a different amount than originally quoted, with zero API error. If a partner has built their own funding UI on top of the API (rather than using Wise's hosted UI), they need to surface this warning themselves, or their customers will see an unexplained amount discrepancy. Diagnosing this after the fact means checking `rateExpirationTime` against the actual funding timestamp -- there's no error to search logs for.

## Experiment 3 — Does `rateExpirationTime` actually mean what I think it means?

Before trusting the experiment above, I wanted to independently verify the anchor points for both expiry fields, and cross-check them against what a real user sees in the UI.

| Field | Value |
|---|---|
| Quote `createdTime` | `2026-07-03T05:46:53Z` |
| Quote `expirationTime` | `2026-07-03T06:16:53Z` |
| Quote `rateExpirationTime` | `2026-07-07T05:46:53Z` |
| Transfer `created` | `2026-07-03T05:49:25Z` |

Doing the arithmetic: `expirationTime − createdTime = exactly 30 minutes`. `rateExpirationTime − createdTime = exactly 4 days`. Both anchor to **quote creation time**, not transfer creation time -- worth knowing since the transfer here was created 3 minutes after the quote, and a sloppier test could have conflated the two anchor points.

The UI cross-check: the sandbox displayed *"Your rate is guaranteed until July 7 at 1:46 PM."* Converting `2026-07-07T05:46:53Z` UTC to SGT (UTC+8) gives exactly `1:46 PM` on July 7.

![Wise UI rate guarantee cross-check](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-6-sandbox-vs-docs-reconciliation/02-rate-guaranteed-until-ui-crosscheck.png)

Exact match, down to the minute. Whatever else is going on with the fee, the rate-expiry mechanics are internally consistent between the raw API timestamps and the human-readable UI copy.

## Experiment 4 — Is `customerTransactionId` actually idempotent?

The docs claim retrying a transfer creation with the same `customerTransactionId` is safe and won't create a duplicate. I tested this directly rather than taking it on faith, since it's the kind of guarantee a partner's retry logic depends on.

**Call 1** — create transfer with `customerTransactionId: acbfbf65-972f-4522-8985-8ef4e9a7e9f5`:
```json
{
  "id": 2147719456,
  "status": "incoming_payment_waiting",
  "customerTransactionId": "acbfbf65-972f-4522-8985-8ef4e9a7e9f5",
  "created": "2026-07-03 05:43:07",
  "rate": 0.579353
}
```

**Call 2** — identical request, same `customerTransactionId`, replayed:
```json
{
  "id": 2147719456,
  "status": "incoming_payment_waiting",
  "customerTransactionId": "acbfbf65-972f-4522-8985-8ef4e9a7e9f5",
  "created": "2026-07-03 05:43:07",
  "rate": 0.579353
}
```

### Result: PASS ✅

Identical `id`, identical `created` timestamp, identical everything. No duplicate transfer was created. This is the one experiment in this whole series that came back exactly as documented — a good reminder that not everything under the hood is a surprise. `customerTransactionId` does what the docs say: it's safe for a partner to retry a create-transfer call after a timeout without fear of double-charging.

## Experiment 5 — The fee discrepancy that never resolved

This is the finding I couldn't close out, and I'm including it precisely because leaving an open question undocumented would be less honest than the alternative.

**The pattern**: every quote's `paymentOptions[BALANCE].fee.total` states a fee of roughly **1.29-1.30 SGD**. But once that same transfer reaches `incoming_payment_waiting` or later, the *implied* fee -- back-calculated from `sourceValue` -- is consistently **8.17-8.38 SGD**. That's not a rounding difference; it's a different number entirely, off by a factor of roughly 6x.

I reproduced this three separate times, deliberately varying the conditions each time to rule out obvious explanations:

| Run | Environment | Profile type | Quote fee (explicit) | Implied fee (from sourceValue) |
|---|---|---|---|---|
| 1 (1 Jul) | Sandbox V1 | Business | 1.29 SGD | 8.34 → 8.17 SGD (pre → post funding) |
| 2 (2 Jul) | Sandbox V1 | Business | 1.30 SGD | 8.38 SGD |
| 3 (3 Jul) | Sandbox V2 | **Personal** | 1.30 SGD | 8.38 SGD |

Run 3 specifically ruled out "maybe it's a business-profile quirk" -- same result on a personal profile, on a different sandbox version entirely.

### What I ruled out

- **Rate movement** -- the rate is locked at quote time and verified identical at transfer time in every run.
- **Quote-to-transfer timing** -- Run 2's transfer was created just 2 minutes after its quote; the gap didn't matter.
- **`hasActiveIssues`** -- `false` at creation in every run, so it isn't a compliance-hold side effect at that point.
- **Random sandbox noise** -- the pattern is too tight (8.17-8.38 SGD every time) to be noise.

I did the math check independently each time too: `sourceValue × rate = targetValue` holds exactly (e.g. `191.83 × 0.582737 = 111.79` GBP), so whatever fee is actually being applied, it's internally consistent -- it's just not the fee the quote advertised.

### What I couldn't rule out (open questions)

1. Is `paymentOptions[BALANCE].fee.total` in the quote **binding or purely indicative**? If indicative, what actually determines the fee applied at transfer creation?
2. Does `sourceValue` at `incoming_payment_waiting` use a different fee basis than the payIn method selected in the quote?
3. Does `clientId: "transferwise-personal-tokens"` against a business profile shift the pricing tier applied at execution vs. what the quote projected?
4. Is this specific to sandbox fee simulation, or would production show the same gap?

{: .note }
I want to be direct about what this is and isn't. It's not a security issue and not evidence of anything malicious -- it's an internal inconsistency between two numbers the API surfaces for the same transfer, and I don't have access to Wise's internal pricing engine to say definitively why. If I were investigating this as a TSE with internal tooling, the next move would be pulling the pricing decision log via `priceDecisionReferenceId` (visible in the quote response) to see which fee schedule actually got applied at execution.

## What this series of experiments actually demonstrates

Running these four tests back to back reinforced something that isn't obvious until you do it: **documentation, sandbox behavior, and the production UI are three separate sources of truth, and they don't always agree.** The quote-expiry and rate-expiry experiments showed sandbox behavior that was reasonable but *undocumented*. The idempotency test showed the docs were simply correct. The fee discrepancy showed a gap between two numbers the API itself produces, with no available explanation from outside Wise's systems.

None of that is a knock on Wise specifically -- any sufficiently complex payments API is going to have edges like this. The point of doing this kind of controlled, before/after testing is that it surfaces exactly those edges, instead of assuming the spec and the system always agree.

Until next time, peace and love!
