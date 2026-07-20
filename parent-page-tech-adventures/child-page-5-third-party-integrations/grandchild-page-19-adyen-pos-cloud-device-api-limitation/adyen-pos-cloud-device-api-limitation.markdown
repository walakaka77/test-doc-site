---
layout: page
title: Why the Cloud Device API Can't Be Tested Without Hardware
permalink: /tech-adventures/third-party-integrations/adyen-pos-cloud-device-api-limitation
parent: Third Party Integrations
grand_parent: Tech Adventures
nav_order: 19
index: 'yes'
follow: 'yes'
description: A documented negative result -- Adyen's Cloud Device API has a hard structural requirement for a boarded deviceId that no API call, test mode, or workaround can create without real hardware.
image: ../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-19-adyen-pos-cloud-device-api-limitation/01-pos-cloud-flow-404-postman.png
---

# Why the Cloud Device API Can't Be Tested Without Hardware
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

This closes out the series. It isn't a scenario walkthrough like the previous four posts -- it's a documented negative result. Context: [the architecture post](/tech-adventures/third-party-integrations/adyen-pos-terminal-api-architecture) (cloud vs. local tradeoff, who owns each part of the stack) and [the mock terminal post](/tech-adventures/third-party-integrations/adyen-mock-terminal-local-setup) (why Track A, the mock, exists as the alternative to begin with).

## The finding, stated plainly

**The Cloud Device API has a hard, structural requirement for an existing `deviceId` -- there is no API call, test mode, or workaround that creates one out of thin air.** This was confirmed three ways: by hitting the real endpoint and reading its error, by reading Adyen's own architecture docs, and by researching every documented path to getting a `deviceId` at all. All three converge on the same answer: without a physical terminal or a phone running Adyen's Payments Test app, this cloud path cannot be exercised beyond its auth/routing layer.

## What was actually tried

1. `GET /v1/merchants/{merchantAccount}/connectedDevices` -- the discovery endpoint, checking what's already boarded. Confirmed nothing is.
2. `POST /v1/merchants/{merchantAccount}/devices/{deviceId}/sync` (`Payment - Sync`) with `deviceId` left blank, since there's none to put there.

## What came back

![Postman: cloud POS flow returning 404](../../parent-page-tech-adventures/child-page-5-third-party-integrations/grandchild-page-19-adyen-pos-cloud-device-api-limitation/01-pos-cloud-flow-404-postman.png)

URL resolved to `.../devices//sync` -- Postman visibly flags the missing `deviceId` in red as unresolved. Response: `404 Not Found` in `217ms`:

```json
{
  "errorCode": "00_404",
  "requestId": "490be45f8ca18a382733e7994a6cb902",
  "status": 404,
  "title": "Not found",
  "type": "https://docs.adyen.com/errors/not-found"
}
```

{: .note }
Worth being precise about what this error does and doesn't prove: this is a **structured, well-formed Adyen error envelope** -- same shape (`errorCode`/`status`/`title`/`type`) as a bad-API-key `00_401` -- which confirms the request genuinely reached Adyen's platform and was handled by their real error-handling layer, not dropped or misrouted. But because `deviceId` was empty, the path itself was malformed (`devices//sync`, double slash) -- this is a **routing-level 404**, not Adyen saying "that specific device doesn't exist." There's no valid-but-nonexistent device ID available to trigger the more specific version of that error instead.

## Why there's no way around this

Confirmed by reading Adyen's own docs, not assumed:

- **[Building a cloud integration](https://docs.adyen.com/point-of-sale/design-your-integration/choose-your-architecture/cloud)** -- the whole model is "send Terminal API requests to our platform and it forwards them to cloud-connected payment terminals." The architecture is defined around relaying to something that already exists and is already connected -- there's no concept of a request that also creates the thing it's addressed to.
- **No "create a device" endpoint exists.** The closest thing, `generatePaymentsAppBoardingToken`, is the *middle step* of a 3-step boarding flow (`www.adyen.com/test/boarded` → `generatePaymentsAppBoardingToken` → `www.adyen.com/test/board`) -- calling it alone, without a real phone running Adyen's Payments Test app completing the other two steps, produces nothing usable.
- **Both real paths to a `deviceId` require something that can actually process a `PaymentRequest`** -- capture a card, show a screen, respond. A device isn't a database row; it's an active endpoint. The two ways to get one: order physical hardware via the Management API (real terminals, "at least four business days" to arrive), or board an Android phone via the Payments Test app (free, immediate, but requires an actual Android device with NFC).

## Best we can do is mock it — and we already have

The key reframe: **only the cloud-specific *transport* is unreachable, not the payload.** The `SaleToPOIRequest`/`SaleToPOIResponse` JSON body is *identical* whether it travels over local or cloud transport -- cloud vs. local only changes *how* the message gets to a terminal, not *what's* inside it. [Track A](/tech-adventures/third-party-integrations/adyen-mock-terminal-local-setup) has already fully exercised that shared payload contract, across the [approved](/tech-adventures/third-party-integrations/adyen-pos-approved-payment-flow), [reversal](/tech-adventures/third-party-integrations/adyen-pos-reversal-flow), and [declined](/tech-adventures/third-party-integrations/adyen-pos-insufficient-balance-decline) scenarios covered earlier in this series.

What Track A genuinely cannot stand in for, because it never touches Adyen's real infrastructure, is the **cloud-specific transport mechanics**:

- The real `X-API-Key` auth handshake against `device-api-test.adyen.com`
- Adyen's actual relay behavior (Cloud → real terminal → back)
- The sync (long-held connection, >150s timeout) vs. async (immediate `200 OK` + separate notification) delivery mechanics
- What a genuine "device not found" error looks like for a *valid but nonexistent* device ID, versus the malformed-path 404 above

That gap only closes with a real device. Everything else about the cloud flow -- the message shape, the decline logic, the field semantics -- is already covered via Track A.

## Test mode vs. real life

**In real life**, this problem never comes up for someone doing this professionally -- by the time cloud integration testing starts, the merchant already has a `deviceId` from their terminal fleet, boarded via the normal ordering/assignment process ahead of go-live. The `deviceId` isn't something generated for a test; it's a byproduct of actual hardware existing and being provisioned.

**In test mode, without hardware**, this is a genuine hard wall -- not a configuration mistake, not a missing role, not something fixable by trying harder in Postman. The only ways through it (order hardware, or board a phone via the Payments Test app) both require real-world setup outside the API itself.

## Conclusion

The cloud path is fully documented at the request/response *shape* level, and this series has now confirmed exactly where its ceiling is and why. Track A plus this finding is the complete picture for the cloud-vs-local question, unless an Android phone becomes available to pursue genuine boarding later.

That closes the series: [architecture](/tech-adventures/third-party-integrations/adyen-pos-terminal-api-architecture) → [local mock setup](/tech-adventures/third-party-integrations/adyen-mock-terminal-local-setup) → [approved payment](/tech-adventures/third-party-integrations/adyen-pos-approved-payment-flow) → [reversal](/tech-adventures/third-party-integrations/adyen-pos-reversal-flow) and [insufficient balance](/tech-adventures/third-party-integrations/adyen-pos-insufficient-balance-decline) → this post. If you're coming at Adyen from the online checkout side instead of point-of-sale, [Adyen Online Payments](/tech-adventures/third-party-integrations/adyen-online-payments) covers that flow.

Until next time, peace and love!
