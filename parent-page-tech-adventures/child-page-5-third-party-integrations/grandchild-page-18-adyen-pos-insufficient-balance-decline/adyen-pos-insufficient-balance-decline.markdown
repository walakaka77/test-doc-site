---
layout: page
title: Declined Payment — Insufficient Balance (Adyen Terminal API)
permalink: /tech-adventures/third-party-integrations/adyen-pos-insufficient-balance-decline
parent: Third Party Integrations
grand_parent: Tech Adventures
nav_order: 18
index: 'yes'
follow: 'yes'
description: Triggering a declined payment via Adyen's mock Terminal API amount-suffix convention, and what the refusal-reason shape actually tells a POS integration versus a real card decline.
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-18-adyen-pos-insufficient-balance-decline/02-insufficient-balance-postman.png
---

# Declined Payment: Insufficient Balance
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

The second of two short unhappy-path posts, mirroring the [approved payment walkthrough](/tech-adventures/third-party-integrations/adyen-pos-approved-payment-flow) with one digit changed. Setup is already covered in [the mock terminal post](/tech-adventures/third-party-integrations/adyen-mock-terminal-local-setup); not repeated here.

## Objective

Trigger a declined payment via the mock's amount-suffix convention and confirm the refusal-reason shape a POS would need to parse.

## Request sent

Identical to the approved-payment request, only `RequestedAmount` changed to end in `124` (minor units):

```json
"PaymentTransaction": {
  "AmountsReq": { "Currency": "{currency}", "RequestedAmount": 1.24 }
}
```

## Actual result

`200 OK`, after the same PIN-entry step as an approved payment -- the mock doesn't know it's "declining" until after PIN confirmation:

```json
"Response": {
  "AdditionalResponse": "message=NOT_ENOUGH_BALANCE&refusalReason=210%20Not%20enough%20balance",
  "ErrorCondition": "Refusal",
  "Result": "Failure"
}
```

The rest of the payload (`PaymentAcquirerData`, `PaymentInstrumentData.CardData` with a fake masked PAN/maestro brand, `SaleData.SaleTransactionID`) is the same kind of static fixture content as the approved flow -- see the [approved-payment post's appendix](/tech-adventures/third-party-integrations/adyen-pos-approved-payment-flow#appendix--proof-that-the-mock-terminals-response-is-static) for the full proof.

## Screenshots

![Mock terminal UI showing the insufficient-balance request and response](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-18-adyen-pos-insufficient-balance-decline/01-insufficient-balance-mock-terminal-ui.png)

The mock terminal's own Request/Response panel -- `RequestedAmount: 1.24` in the request, `AdditionalResponse: message=NOT_ENOUGH_BALANCE&refusalReason=210 Not enough balance` in the response.

![Postman showing the insufficient-balance response](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-18-adyen-pos-insufficient-balance-decline/02-insufficient-balance-postman.png)

Postman: `200 OK`, `8.02s` (PIN-entry wait, same as any Payment request), same refusal payload.

## Test mode vs. real life

**The trigger mechanism is pure test convenience, not something real.** In this mock, *any* amount ending in `124` (minor units) always declines with "not enough balance" -- it has nothing to do with an actual card or balance; it's a lookup table in the mock's source. Adyen's own physical test cards use a similar amount-suffix convention for the same reason: so decline paths can be exercised deliberately without needing a card that would genuinely decline.

{: .note }
**In real life, this refusal originates from the card issuer**, returned through the real authorisation network based on the cardholder's actual available balance/credit -- there's no "magic number" that forces it; it's a genuine outcome of a genuine authorisation attempt. What *is* real and worth trusting: the **shape** of the refusal -- `Result: "Failure"`, `ErrorCondition: "Refusal"`, and an `AdditionalResponse` string carrying a `message=`/`refusalReason=` pair. That structure matches Adyen's actual refusal-reason taxonomy, so this is a legitimate way to build and verify POS-side branching logic (check `Response.Result`, parse `AdditionalResponse` for the reason) before ever touching a real card.

**Net takeaway:** this test is solely for familiarization with *how a decline looks* over the API -- it tells us nothing about real issuer decline behaviour, timing, or which real-world scenarios produce which refusal reasons. Useful for verifying error-handling code exists and works; not useful for anything beyond that.

## See also

[Reversal](/tech-adventures/third-party-integrations/adyen-pos-reversal-flow) -- the other short unhappy-path scenario in this series, reversing the approved payment instead of declining a new one.

Until next time, peace and love!
