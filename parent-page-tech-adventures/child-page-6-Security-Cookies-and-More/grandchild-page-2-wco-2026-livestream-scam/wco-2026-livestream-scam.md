---
layout: page
title: "Warning: Fake WCO 2026 Livestream Links Are a Subscription Scam"
permalink: /tech-adventures/security-cookies-and-more/wco-2026-livestream-scam
parent: Security, Cookies and More!
grand_parent: Tech Adventures
nav_order: 2
index: 'yes'
follow: 'yes'
description: A fake WCO 2026 livestream link circulating on Facebook leads to a subscription trap — here's how it works, who's behind it, and what to do if you've already entered your card details.
image: ../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/grandchild-page-2-wco-2026-livestream-scam/01-landing-page.png
---

# Warning: Fake WCO 2026 Livestream Links Are a Subscription Scam
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

If you're part of the dog obedience community and you've been looking for a way to watch the FCI World Championship of Obedience 2026 in Helsingborg, Sweden — you may have come across a link shared in a Facebook group. This article is a warning: that link does not lead to a livestream. It leads to a subscription trap that will charge your card **£9.95–£39.95 per month**, and cancelling is notoriously difficult.

Here's what's actually going on, how the scam works, and what to do if you've already clicked through and entered your card details.

---

## The Bigger Picture: Fake Facebook Groups and a Fight Facebook Won't Help With

Before we get into the technical details of how the scam works, it's worth understanding the broader pattern here — because this isn't a one-off.

The WCO FCI obedience community has been dealing with **fake Facebook groups and pages impersonating official WCO channels** for a while now. These fake groups look convincingly official — they use the right event names, the right branding, and sometimes even display an Admin badge. They're created specifically to reach dog sports fans who are looking for official information or livestream links for events like WCO 2026.

The WCO FCI team is aware of this. They've been **reporting these fake groups to Facebook repeatedly** — and getting nowhere. Facebook's reporting process for impersonation is notoriously slow and inconsistent, and the scammers have figured out the loophole: as soon as one group gets taken down, they **spin up a new one**. New group, new scam links, same old subscription trap. It's a cat-and-mouse game that Facebook hasn't been equipped (or motivated) to stop.

The same pattern applies to the fake websites behind the links — 176 domains and counting (more on that later). Every time one gets flagged, a new one appears. The infrastructure is designed to be disposable.

{: .warning }
The link `https://livetvshow24.com/wcobedience2026/` — and any similar-looking link shared in Facebook groups — is **not** the official WCO 2026 livestream. Do not enter your card details.

---

## What the Scam Actually Does

Here's the scam in plain English: you see a link shared in what looks like an official WCO Facebook group. You click it. A professional-looking page loads — correct event name, correct dates, Helsingborg venue, a video player. You click play. A popup tells you that you need to "create a free account" to watch. You go through a registration flow. Eventually a payment page appears that says "Basic Membership — £0.00 — Total: £0.00" and "Your credit card will NOT BE CHARGED for validating your account." You enter your card details.

And then the charges start.

Victims report being charged £1 immediately, followed by recurring monthly charges (£9.95/month and above) starting within days. There is no livestream. There is no WCO content anywhere behind the paywall. What you've signed up for is a generic on-demand content library with "over 30,000 titles" of films, music, and audiobooks — none of which have anything to do with dog obedience.

---

## The Link Chain, Step by Step

I traced this link through every step of the flow, so you can see exactly what's happening under the hood.

### Step 1: The Facebook Post

A link appears in a WCO-themed Facebook group — sometimes from an account with an Admin badge. The link is:

```
https://livetvshow24.com/wcobedience2026/
```

This is not an official link. The domain `livetvshow24.com` has no connection to WCO, FCI, or any broadcasting organisation.

### Step 2: The Fake Landing Page

The page at `livetvshow24.com/wcobedience2026/` is professionally designed. It shows the correct WCO 2026 event dates, the Helsingborg venue, and a video player. The player appears to be loading a stream — it isn't. It's a decorative HTML element with no video source behind it.

![Fake WCO 2026 livestream landing page at livetvshow24.com](../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/grandchild-page-2-wco-2026-livestream-scam/01-landing-page.png)

Clicking the player triggers a modal:

> *"You must create a free account to watch World Championship of Obedience 2026 Live"*

![Modal asking to create a free account](../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/grandchild-page-2-wco-2026-livestream-scam/02-modal-create-account.png)

### Step 3: The Affiliate Redirect

The "Create Free Account" button doesn't go to any WCO registration. It goes through an **affiliate tracking link**:

```
https://cjewz.com/af?o=9d8bd5c62b60a921e76974ef3398a152:...&v=live_events
```

`cjewz.com` is an affiliate network. The person who posted the link on Facebook earns a **commission** for every person who completes a signup through that link. This is the commercial engine behind the scam.

That affiliate link then redirects you to a **brand registration page** — and here's where things get strange.

### Step 4: The Brand Rotation

You don't always land on the same site. The affiliate link rotates through **170+ different brand websites**, all running on the same underlying platform. In seven consecutive tests of the same WCO link, seven different brand registration pages appeared:

| Test | Brand | Domain | Company |
|---|---|---|---|
| 1 | PlayFusion | register.playfusion.net | Tivora Ltd |
| 2 | PlayFocus | register.playfocus.net | Medialias |
| 3 | StreamEcho | register.streamecho.net | Javna Limited |
| 4 | StreamShift | register.streamshift.net | Javna Limited |
| 5 | SuperQuizzes | register.superquizzes.net | Coraj Media |
| 6 | MediaVibeHub | register.mediavibehub.net | Acathla Limited |
| 7 | GamerExpert | register.gamerexpert.net | Classic Content Corp |

Same page template. Same registration flow. Different brand name each time.

![Rotation test 1 — register.playfusion.net](../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/grandchild-page-2-wco-2026-livestream-scam/redirect-01-register-playfusion-net.png)

![Rotation test 2 — register.playfocus.net](../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/grandchild-page-2-wco-2026-livestream-scam/redirect-02-register-playfocus-net.png)

This rotation is intentional. By cycling through hundreds of brand names, no single brand ever accumulates enough complaints to become easily discoverable in a web search. Victims leave a Trustpilot review for "StreamShift" — but by the time the next person searches for reviews, they're being shown "PlayFocus" instead. The footprint stays invisible.

### Step 5: The Subscription Trap

Each registration page collects your email address and a password. After submitting, a payment page appears — **without navigating to a new URL**. The transition happens via JavaScript so it looks seamless:

![Payment page showing £0.00 and "will NOT BE CHARGED"](../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/grandchild-page-2-wco-2026-livestream-scam/05c-pricing-step.png)

The payment page displays:

- "Basic Membership — £0.00 — Total: £0.00"
- "Your credit card will **NOT BE CHARGED** for validating your account"
- Fine print: "£1 or less with a temporary hold when validating your payment details"

And then it asks for your full card number, expiry date, and CVV.

{: .important }
> This is the trap. The "£0.00 / not charged" message is directly above live card entry fields. Victims report £1 charged immediately, then recurring monthly charges starting within days. The actual subscription prices — hidden during this flow — range from £4.50/month to £42.95/month depending on which brand you land on.

---

## Who's Behind It

This isn't one rogue scammer. It's a network of UK-registered companies, all operating the same subscription trap under different brand names through a shared commercial platform called **MilkBox** (milkboxsites.com).

The companies confirmed in the WCO flow include:

| Brand | Company | Companies House # |
|---|---|---|
| PlayFusion, HubPulse | Tivora Ltd | 15967187 |
| PlayFocus, HubNova | Medialias | 16142635 |
| StreamEcho, StreamShift | Javna Limited | 16142888 |
| MediaVibeHub | Acathla Limited | 16180940 |
| SuperQuizzes, HermesVPN | Coraj Media Limited | 615415 |
| GamerExpert, ConfidentialVPN | Classic Content Corp | 10259448 |
| IQRealm | Bilubu Limited | 11296184 |

Using a public internet security tool (URLScan.io), the full network was traced to **176 active brand domains** — all running on the same MilkBox platform, all operating the same subscription trap. Every time one gets reported and taken down, a new one spins up. This mirrors exactly what's happening with the fake Facebook groups: disposable, replaceable, rinse and repeat.

Director lookups on Companies House revealed **two names appearing repeatedly across multiple companies** in the network:

| Director | Companies confirmed | Notable brands |
|---|---|---|
| **James Robert O'Shea** | 19 companies | Isocol Limited (ShadowsCast), Tutron Limited (ChillVPN), Arlmedia Limited (SeriousVPN), and 16+ others |
| **John Mark Deeks** | 4 companies | Bilubu Limited (IQRealm) |

These are not coincidences — the same individuals appear as directors or persons of significant control across a web of UK-registered companies, each running a different brand name on the same MilkBox platform.

---

## Real Victim Reviews

The IQRealm brand (one of the network's brands) has a Trustpilot profile — a rarity, since most brands rotate fast enough to avoid accumulating reviews. What's there is consistent, and it's worth reading in full because it shows exactly what happens to people who go through the full payment flow.

Most other brands in the network — PlayFusion, HubPulse, StreamShift — return 404 on Trustpilot. Too new. Too quickly rotated. Not enough complaints to be findable yet. IQRealm is the exception, and it's a preview of what victims across all 176 brands are experiencing.

![IQRealm Trustpilot page showing 5 one-star fraud reviews](../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/grandchild-page-2-wco-2026-livestream-scam/trustpilot-iqrealm-net.png)

---

**★☆☆☆☆ — 30 October 2025**
*"Free sports/rally livestream — 2 unauthorised payments taken"*

> "I wanted to watch a livestream of the **Mull Rally** this year. However the **Facebook page that usually posts the real livestream link had been hacked**, unbeknownst to me, I trusted the page, and clicked on the link which took me to IQrealm.net. It seemed legit, and said that I had to pop my bank details in etc — but that it only charges you for things that you purchase in app basically. I approved it on my banking app. Thinking I was approving it for £0.00. And it **charged me £1**. Immediately I knew this was a scam [...] 2 weeks go by and I notice another payment to IQrealm.net. Only this time for **£9.95**. [...] their films all seem like fake made up films with absolutely no recognisable actors/actresses [...] I logged in and turns out they had saved my bank details to my account and opted me into some sort of subscription. **ABSOLUTELY AVOID.**"

{: .note }
This is exactly the same playbook as WCO 2026 — a trusted Facebook page for a sporting event, a fake livestream link, a redirect to one of these brand sites, card details collected under the guise of "free", then recurring charges. Same scam, different community.

---

**★☆☆☆☆ — 8 January 2026**
*"Scam website and doesn't even hide it"*

> "Had never even been to this website in my life. I foolishly spent $1 on a phone SIM unlocking service and for some reason 3 days later I am **charged $39.95** from iqrealm.net. [...] If you select the 'forgot email' option, it asks for your the first 4 and last 6 of your credit card number. **A literal and obvious scam.**"

---

**★☆☆☆☆ — 20 August 2025**
*"A complete scam of a company"*

> "A complete scam of a company... they took **over $150** from my account for nothing.... please be aware."

---

**★☆☆☆☆ — 27 March 2025**
*"Definitely a scam company"*

> "Definitely a scam company. **They stole my credit card**, and when I tried to report the fraud, they hung up on me."

---

**★☆☆☆☆ — 11 January 2025**
*"This website steals credit card info"*

> "This website steals credit card info from people who have **never visited the site** or utilized whatever services the site offers. Scam. Report. Fraud."

---

The pattern across all five reviews is the same: unauthorised charges, no recourse, card details captured without meaningful consent. These are the reviews that slipped through before the brand rotation strategy could suppress them. For every IQRealm review visible on Trustpilot, there are likely dozens more across the other 175 brands in the network that will never accumulate enough complaints to be found.

---

## What There Is No Stream Of

Just to be absolutely clear: there is no WCO 2026 livestream behind any of these payment pages. The registration and payment pages describe the product as:

> *"Movies, TV Shows, Audiobooks, Games, Books, Music & Sports — over 30,000 titles"*

A generic content library. No WCO. No FCI. No obedience. No live anything.

---

## If You've Already Entered Your Card

If you went through the flow and entered your card details, here's what to do:

1. **Contact your bank immediately** — request a chargeback for any charges from Tivora / HubPulse / IQRealm / PlayFusion / ConfidentialVPN or any of the brand names listed above. Don't wait.
2. **Freeze or cancel your card** — victims report being charged without a clear subscription agreement. Cancelling the card is the safest way to stop recurring charges.
3. **Report to Action Fraud (UK):** [actionfraud.police.uk](https://www.actionfraud.police.uk) — reference the company names: Tivora Limited, Bilubu Limited (Norwich), Classic Content Limited (Coventry), Javna Limited.
4. **Report to Trading Standards** via Citizens Advice: 0808 223 1133.
5. **Leave a Trustpilot review** for whichever brand name you signed up with — this is one of the few things that helps future victims find a warning before they enter their own card details.

{: .note }
If you're outside the UK, contact your own national fraud reporting service and your card issuer. The companies are UK-registered but the scam targets victims globally.

---

## What the Community Can Do

The scammers know that Facebook is slow to act. The WCO FCI team has been pushing Facebook to take down these impersonator groups and gets nowhere — and as soon as one group falls, another one appears. The platform isn't the solution here.

What actually helps:

- **Share this article** in genuine WCO groups and obedience communities — so people know what to look for before they click
- **Pin a warning post** in any group you admin, with the specific domain name `livetvshow24.com` called out
- **Report the fake groups** using the "impersonating an organisation" option — it's slower than it should be, but volume of reports does eventually matter
- **Don't trust livestream links shared in Facebook groups** for major events without verifying against the official WCO/FCI website or the event's verified social accounts

The official WCO 2026 information will be on the FCI and official WCO channels — not in a random Facebook group post from an account with an Admin badge.

---

## Conclusion

This is a well-resourced, systematic subscription fraud operation — not a one-off phishing attempt. The rotating brand names, the shared corporate infrastructure, the 176 domains, the fake Facebook groups, the inability to get Facebook to act — all of it is designed to be hard to pin down and hard to stop.

The dog sports community is a tight-knit one, and the scammers are betting that trust in that community — the kind that makes you click a link a fellow fan shares — is the attack surface. The best defence is knowing what the attack looks like.

If you see a link for a WCO 2026 livestream anywhere that isn't the official FCI or WCO website, assume it's this scam. Share this article. Warn your group.

Until next time, peace and love!

---

## Images Required

Please copy the following screenshots from the investigation evidence folder into this article folder (`grandchild-page-2-wco-2026-livestream-scam/`) before publishing. Source paths are relative to the `wco-obedience-2026-livestream` project.

| Filename (save as) | Source file | What it shows |
|---|---|---|
| `01-landing-page.png` | `evidence/screenshots/chain-full/01-landing-page.png` | The fake livetvshow24.com WCO landing page |
| `02-modal-create-account.png` | `evidence/screenshots/chain-full/02-modal-create-account.png` | The "create free account" modal on the fake player |
| `05c-pricing-step.png` | `evidence/screenshots/chain-full/05c-pricing-step.png` | The card-entry page showing £0.00 / "NOT BE CHARGED" |
| `redirect-01-register-playfusion-net.png` | `evidence/screenshots/redirect-tests/redirect-01-register-playfusion-net.png` | Brand rotation test 1 — PlayFusion |
| `redirect-02-register-playfocus-net.png` | `evidence/screenshots/redirect-tests/redirect-02-register-playfocus-net.png` | Brand rotation test 2 — PlayFocus |
