---
layout: page
title: Reversal — Adyen Terminal API Unhappy Path
permalink: /tech-adventures/third-party-integrations/adyen-pos-reversal-flow
parent: Third Party Integrations
grand_parent: Tech Adventures
nav_order: 17
index: 'yes'
follow: 'yes'
description: Reversing a previously authorised Terminal API payment against Adyen's mock terminal, and the one nuance that matters -- ID reuse is enforced in real life but not in this mock.
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-17-adyen-pos-reversal-flow/01-reversal-postman-request-response.png
---

# Reversal: One Nuance That Actually Matters
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

This is the first of two short unhappy-path posts following the [approved payment walkthrough](/tech-adventures/third-party-integrations/adyen-pos-approved-payment-flow) -- same mock, same Postman collection, same PIN-entry mechanic for the *original* payment this reverses. Setup is already covered in [the mock terminal post](/tech-adventures/third-party-integrations/adyen-mock-terminal-local-setup); not repeated here.

## Objective

Reverse a previously authorised payment, confirm the response shape, and check what the mock actually validates about the transaction being reversed.

## Request sent

`POST {baseUrlMock}/sync`, `MessageCategory: Reversal`, referencing the prior Payment's identifiers (auto-filled by the collection's chaining variables, confirmed populated in the [previous post](/tech-adventures/third-party-integrations/adyen-pos-approved-payment-flow#screenshots--step-by-step-walkthrough)):

```json
"ReversalRequest": {
  "ReversalReason": "MerchantCancel",
  "OriginalPOITransaction": {
    "POIID": "{poiId}",
    "POITransactionID": {
      "TransactionID": "{lastTransactionId}",
      "TimeStamp": "{lastTimestamp}"
    }
  }
}
```

## Actual result

`200 OK`, immediate (no PIN-entry wait -- only `Payment` requests block on that):

```json
{
  "SaleToPOIResponse": {
    "ReversalResponse": {
      "POIData": { "POITransactionID": { "TimeStamp": "2013-06-12T12:08:36+00:00", "TransactionID": "21f1268f-9126-4bce-b127-9c2d5ffa024e" } },
      "Response": { "Result": "Success", "AdditionalResponse": ".+" },
      "PaymentReceipt": [ "fake cashier + cardholder receipt, TOTAL €10.99, card ending 9990" ]
    },
    "MessageHeader": { "SaleID": "SALE_ID_42", "ServiceID": "1234567890AB", "POIID": "V400m-123456789", "MessageCategory": "Reversal", "MessageType": "Response" }
  }
}
```

Same static-fixture pattern as the approved payment -- full proof already in [the previous post's appendix](/tech-adventures/third-party-integrations/adyen-pos-approved-payment-flow#appendix--proof-that-the-mock-terminals-response-is-static); not repeated here.

## Screenshot

![Postman: reversal request and response](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-17-adyen-pos-reversal-flow/01-reversal-postman-request-response.png)

Request body showing `{lastTransactionId}`/`{lastTimestamp}` referencing the prior Payment, response `200 OK` in `3ms` (no PIN wait), `Result: Success`.

## Test mode vs. real life

**The important nuance here is ID reuse.** In this test, `OriginalPOITransaction.POITransactionID` (`TransactionID` + `TimeStamp`) is populated automatically from the last Payment, but confirmed in the mock's own routing code that **it's never actually checked** -- the mock returns `Success` for a Reversal referencing *any* value, including one that never existed.

{: .important }
**In real life, this is exactly backwards:** `OriginalPOITransaction` must precisely match a real, previously-authorised transaction on that terminal -- it's how the terminal (and Adyen behind it) identifies *which* transaction to reverse. Get it wrong and a real terminal returns an error (e.g. "original transaction not found"), not a silent success. `TransactionID`/`TimeStamp` from a genuine prior authorisation are mandatory inputs, not decorative fields -- same category as `ServiceID` in the main flow, just enforced at a different layer (the terminal/Adyen, not the message schema).

Also worth knowing generally (not verified against this mock, since it doesn't implement any timing logic at all): real reversals are typically only valid for a limited window -- before the original transaction is captured/settled. Once settled, a **refund** is needed instead, which is a different message/flow entirely. Worth confirming against [Adyen's own docs](https://docs.adyen.com/point-of-sale/design-your-integration/terminal-api/terminal-api-reference/) when this becomes relevant against a real terminal.

**Net takeaway:** this test confirms the *request/response shape* for Reversal and that the collection's chaining variables wire up correctly -- it does not, and cannot, tell us anything about real transaction-matching behaviour. Familiarization with the message contract only.

## See also

[Insufficient balance decline](/tech-adventures/third-party-integrations/adyen-pos-insufficient-balance-decline) -- the other short unhappy-path scenario in this series, using the same approved-payment request with one digit changed.

Until next time, peace and love!
