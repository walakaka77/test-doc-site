---
layout: page
title: What I Couldn't Test (Yet)
permalink: /tech-adventures/third-party-integrations/paynow-kyc-open-questions
parent: Third Party Integrations
grand_parent: Tech Adventures
nav_order: 7
index: 'yes'
follow: 'yes'
description: PayNow funding, KYC-gated simulation states, and a closing list of open questions from hands-on testing against the Wise Platform sandbox -- what got blocked, and why that's still a useful result.
---

# What I Couldn't Test (Yet): PayNow, KYC Gates, and Open Questions
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

The [previous post](/tech-adventures/third-party-integrations/sandbox-vs-docs-reconciliation) covered four experiments that mostly succeeded -- I got a clean pass/fail result out of each one, even when the result contradicted the docs. This closing post is the opposite: a few things I tried that simply didn't work, plus one fee-tier comparison that surfaced almost by accident while I was trying to get PayNow funding working. A blocked test is still a result, and in support-style API work, knowing exactly *why* something is blocked is often as valuable as a green checkmark.

## Attempting PayNow funding

Singapore's PayNow is Wise's most distinctive local payment rail for this corridor -- instead of routing to a bank account number, you address a payment to a phone number, NRIC/FIN, or business UEN, and the PayNow network resolves it to the underlying account. I wanted to fund a transfer via PayNow specifically to see how that addressing showed up on the API side.

### What the quote actually revealed

Before the funding attempt even failed, the quote response for this corridor turned up something genuinely useful: the full fee-tier ladder Wise applies across every available payIn method for a 200 SGD → GBP transfer.

| payIn method | Fee % | Total fee (SGD) | Notes |
|---|---|---|---|
| `BALANCE` | 0.65% | **1.30** | Cheapest -- funds already sitting in Wise |
| `BANK_TRANSFER` / `PAYNOW` | 0.73% | 1.46 | Tied -- both settle instantly, same fee tier |
| `FAST_DIRECT_DEBIT` | 0.89% | 1.77 | Direct debit surcharge on top of base fee |
| `VISA_DEBIT_OR_PREPAID` | 5.07% | 10.13 | Card rails jump sharply |
| `MC_DEBIT_OR_PREPAID` / `CARD` / `MAESTRO` | 5.48% | 10.95 | |
| `VISA_BUSINESS_DEBIT` | 5.22% | 10.43 | |
| `MC_BUSINESS_DEBIT` | 5.43% | 10.86 | |
| `DEBIT` | 5.48% | 10.95 | |
| `INTERNATIONAL_DEBIT` | 7.95% | 15.89 | Most expensive by far |

The gap between `BALANCE`/`BANK_TRANSFER`/`PAYNOW` (sub-1%) and any card-based payIn (5-8%) is stark, and it's a clean illustration of *why* Wise pushes partners toward bank-rail funding wherever possible: card payIn methods cost roughly 6-10x more than direct bank or balance funding, driven almost entirely by the `PAYIN` fee component (the underlying rail's own cost) rather than Wise's own margin, which stays flat at roughly 1.3-1.5 SGD across every method.

{: .note }
Interestingly, `BANK_TRANSFER` and `PAYNOW` share an identical fee percentage (0.73%) and `payInProduct` classification (`CHEAP`) in this quote. From a pricing perspective, Wise treats PayNow as equivalent to a standard bank transfer, not as a distinct premium/discount rail -- despite PayNow settling near-instantly versus bank transfer's slower clearing.

### The funding attempt itself

With the fee structure confirmed, I attempted to actually fund via PayNow:

```http
POST /v1/profiles/{profileId}/payin-sessions/{payinSessionId}/paynow
```

```json
{
  "type": "/errors/types/access",
  "title": "Forbidden",
  "status": 403,
  "detail": "Unauthorized",
  "instance": "/v1/profiles/29263618/payin-sessions/.../paynow",
  "code": "forbidden"
}
```

**403 Forbidden.** I also tried the standard payments endpoint with `{"type": "PAYNOW"}` directly -- same result. This isn't a scope or token misconfiguration on my end: PayNow funding via a **personal API token** is a partner-restricted capability. It requires the kind of partner-level integration credentials that Wise Platform issues to actual bank/enterprise partners, not something available to an individual developer token in sandbox.

{: .important }
This is a genuinely useful negative result. If I were troubleshooting this as a support engineer and a partner reported "PayNow funding returns 403," the diagnostic path isn't "check your OAuth scopes" -- it's "confirm your integration tier actually has PayNow funding enabled," since the restriction sits above the token-scope layer entirely.

## The KYC gate, revisited

The [Postman walkthrough post](/tech-adventures/third-party-integrations/postman-cross-border-transfer-testing) already showed one KYC-gated failure directly -- the business profile used in that run couldn't advance a transfer past `processing` via the simulation API because it wasn't KYC-verified, producing a `wrong_status` error that specifically referenced profile verification.

Digging into this further while working across both sandbox profiles surfaced a cleaner picture of exactly where that gate sits:

| | Personal profile | Business profile |
|---|---|---|
| KYC status | ✅ Cleared | ❌ Unresolved |
| Funding via console UI | ✅ Works | ⚠️ Blocked |
| Simulation state-advance endpoints | ✅ Work | ❌ `wrong_status` (KYC message) |
| `GET /v3/profiles/{id}/kyc-reviews` | -- | Returns 404 in sandbox (endpoint not supported) |

The practical workaround was straightforward once the pattern was clear: run the full happy-path flow -- `processing → funds_converted → outgoing_payment_sent` -- against the **personal** profile instead, where KYC was already cleared. That flow completed end to end with no gate at all, which is itself a useful confirmation: the block genuinely is KYC-specific to that one profile, not a broader sandbox limitation on simulation endpoints.

One extra wrinkle worth flagging: attempting `GET /v3/profiles/{id}/kyc-reviews` to inspect the business profile's verification status directly returned a 404 -- that introspection endpoint simply isn't available in this sandbox environment, so there was no way to query *why* the business profile was stuck, only that it was.

## Open questions I'd take back to the API team

Between this post and the [fee discrepancy investigation](/tech-adventures/third-party-integrations/sandbox-vs-docs-reconciliation) in the previous one, here's the running list of things I couldn't resolve from outside Wise's systems -- exactly the kind of list I'd bring into a conversation with an API/product owner if I had one:

1. **Fee basis** -- Is `paymentOptions[BALANCE].fee.total` in the quote binding, or purely indicative? What actually determines the ~6x higher fee implied by `sourceValue` at transfer creation?
2. **Quote expiry error code** -- Is `error.quote.not.found` (rather than a distinct "expired" code) intentional, or should the API distinguish "never existed" from "expired and purged"?
3. **Rate-expiry documentation gap** -- Since `rateExpirationTime` triggers a silent reprice rather than a rejection, should that behavior be documented explicitly rather than left implicit in the UI copy alone?
4. **PayNow tier equivalence** -- Why does PayNow share an identical fee tier with generic bank transfer despite materially different settlement speed?
5. **KYC introspection in sandbox** -- Is there a supported way to query a sandbox profile's verification status programmatically, given `kyc-reviews` returns 404?

## Closing thoughts on the series

Across this series I went from reading fundamentals, to running a live transfer through Postman, to deliberately trying to break assumptions with controlled experiments, to documenting exactly where I hit a wall. The blocked tests in this post aren't a weaker result than the passing ones in the previous post -- a 403 with a clear cause and a documented workaround is exactly as useful, operationally, as a clean 200 OK. That's really the whole point of hands-on API testing over just reading documentation: the docs tell you what's supposed to happen, and only actually running the requests tells you what does.

Until next time, peace and love!
