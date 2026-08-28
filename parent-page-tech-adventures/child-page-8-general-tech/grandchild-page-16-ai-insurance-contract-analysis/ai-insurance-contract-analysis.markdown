---
layout: page
title: "From PDFs to Insight: Getting an AI to Actually Read the Fine Print"
permalink: /tech-adventures/general-tech/ai-insurance-contract-analysis
parent: General Tech
grand_parent: Tech Adventures
nav_order: 16
index: 'yes'
follow: 'yes'
description: What reading 180+ pages of real insurance contracts turned up -- a coverage design flaw hiding in plain sight, a disability payout that hinges on a 180-day clock, and why sizing cover against income was the wrong yardstick.
---

# From PDFs to Insight: Getting an AI to Actually Read the Fine Print
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

[Part 1](/tech-adventures/general-tech/ai-insurance-singpass-safety) of this series covered why it was safe to automate the login-adjacent parts of pulling my own insurance documents. [Part 2](/tech-adventures/general-tech/ai-insurance-bulk-document-download) covered the mechanics of actually getting 153 documents onto disk. Neither of those, on their own, tell me anything useful -- a folder full of PDFs is not the same thing as knowing whether my coverage is any good.

This post is about the part that turned out to matter more than the automation: having Claude Code actually *read* the contracts -- not skim a portal's summary page, the real 60-to-90-page legal documents -- and what came out of doing that.

## Premiums, first, because they're simple

Across the 6 policies (4 with AIA, 2 with Singlife), the annual premium total came to **SGD 4,093.03**. Checking that number against my own bank statement turned up two AXS bill payments, made on the same day, totalling SGD 3,364.03 -- SGD 729 short of the policy total.

That gap isn't a discrepancy, it's CPF MediSave quietly doing its job: part of one hospitalisation policy's premium is paid straight out of my MediSave account, which never touches a bank statement at all. Reconciling both numbers side by side confirmed it to the cent -- the CPF-funded portion plus the two AXS payments add up exactly to SGD 4,093.03.

{: .note }
This matters for anything that checks premiums against a "percentage of income" rule of thumb: the cash actually leaving my take-home pay is SGD 3,364/year, not SGD 4,093 -- a meaningfully different number if you're trying to answer "am I spending too much on insurance."

## The finding I didn't expect: one term policy, three "separate" benefits, one shared pot

One of the Singlife policies is a term life plan carrying three headline numbers: SGD 1,000,000 death cover, SGD 1,000,000 total-and-permanent-disability (TPD) cover, and SGD 100,000 critical illness (CI) cover. Read quickly, that looks like SGD 2,100,000 of stacked protection.

Reading the actual 86-page policy contract said otherwise. The Terminal Illness Benefit clause is explicit:

> "the Terminal Illness Benefit will be paid in one (1) lump sum **as an advancement of the Death Benefit**. No further Death Benefit shall be payable upon the Life Assured's death."

So is the TPD rider's:

> "We will pay the TPD Benefit **as an advancement of the Death Benefit**"

And the TPD rider goes further, tying the CI rider into the same pot too:

> "If We pay a part of the Death Benefit as a result of **a claim for a Critical Illness Supplementary Benefit** attached to this Policy... the Sum Assured of this Supplementary Benefit shall be reduced accordingly to the revised Sum Assured of the Death Benefit."

{: .important }
Terminal Illness, TPD, and Critical Illness aren't three separate pots stacked on top of a SGD 1,000,000 death benefit -- they're three different doors into the *same* SGD 1,000,000. The CI rider does get to pay out up to 600% of its own SGD 100,000 sum assured across multiple claims over a lifetime without reducing its own claiming capacity -- but each of those payouts is still drawn from, and reduces, that one shared pool. A single severe-stage CI claim pays SGD 300,000 (300% of the rider's own sum assured) -- and leaves only SGD 700,000 of the shared pool for any TPD or death claim afterward.

This isn't a flaw exactly -- it's how the product is designed, and it's disclosed, in writing, in a document almost nobody reads cover to cover. That's really the finding: not that the policy is bad, but that the actual protection ceiling (SGD 1,000,000, not SGD 2,100,000) is something you'd only ever learn by reading the contract, not the policy schedule summary.

## A payout that hinges on a 180-day clock

The other Singlife policy is a disability-income plan -- a fixed monthly benefit if I become unable to work. Reading its contract surfaced a genuinely useful distinction I wouldn't have gone looking for from the summary page alone: there are **two different disability definitions**, and which one applies depends on timing, not just on being disabled.

- **"Working Total Disability"** applies if disability starts while actively working, *or* within the first 180 days of not working. It pays the full contracted benefit.
- **"Non-working Total Disability"** only applies once you've gone 180+ *consecutive* days without any work at all. It pays a much smaller, escalating fallback benefit instead -- starting well below the full amount.

I have a career transition coming up where I expect a stretch of time without active income, so this genuinely changes how I think about the policy: staying disability-covered at the full rate isn't about "am I currently employed," it's about "how long have I gone without any work at all when the disability starts." Become disabled in the first 180 days of that gap, full benefit applies. Go past 180 consecutive days first, and only the much smaller fallback tier does. That's a real planning detail that a portal's "coverage amount: $X/month" summary line simply doesn't communicate.

## The exclusions nobody reads until they need to

The hospitalisation policy -- private ward, "as-charged," a genuinely high-tier plan -- has a two-page General Exclusions section buried around page 24 of a 68-page contract. Reading it in full turned up two concrete, named exclusions worth actually knowing about: **ambulance fees** and **TCM/chiropractic treatment** are both excluded outright, unless a specific additional rider (which this policy doesn't carry) is added. Both are genuinely common scenarios -- an ambulance ride is not a rare or edge-case event -- and neither showed up anywhere in the portal's own coverage summary. Everything that actually matters financially (hospitalisation, surgery, cancer treatment, organ transplant, emergency overseas treatment) was confirmed covered, comprehensively -- but the two real gaps only surfaced by reading the source document.

## Sizing cover against income was the wrong question

The generic rule of thumb for how much death and critical-illness cover to hold is a multiple of annual income -- roughly 9x for death cover, 4x for critical illness. Run against my own income, both of those benchmarks said I was meaningfully underinsured on critical illness.

Then came the question that actually mattered: **I don't currently have any financial dependents.** That single fact breaks the income-multiple logic at its foundation -- those multiples exist to replace what *dependents* would lose. With none, the real yardstick for critical illness and disability cover isn't "how much of my income needs replacing" -- it's "how much do I personally need to keep living on if I can't work." That's an expenditure question, not an income question.

This project already had the answer sitting in an unrelated part of the same finance-tracking setup: a monthly essential-spending figure of **SGD 1,898.30**, computed months earlier for a completely different purpose (tracking cash flow, not insurance). Four years of that -- the same "how long would treatment and recovery realistically take" logic behind the 4x-income rule, just applied to actual spending instead of income -- comes to roughly **SGD 91,000**. Against that number, the SGD 300,000 first-claim critical illness payout from earlier in this post is comfortably sufficient, not short by SGD 100,000+ the way the income-based math suggested.

{: .note-title }
> Death cover is about dependents. CI and disability cover are about you.
>
> That distinction is the actual reusable lesson here, past the specific numbers: no dependents doesn't reduce your own need to keep living costs covered if you can't work -- it just means the income-based formula was never measuring the right thing for a single person to begin with.

## What this series actually demonstrated

Start to finish: [Part 1](/tech-adventures/general-tech/ai-insurance-singpass-safety) covered why identity verification stayed entirely human, by Singpass's own design. [Part 2](/tech-adventures/general-tech/ai-insurance-bulk-document-download) covered turning that into 153 organised documents in about 35 minutes of actual work, against a realistic manual estimate north of 10 hours. This post is the part that surprised me most going in: the time saved on clicking turned out to matter less than what became *possible* once reading 180+ pages of contract text stopped being the bottleneck -- a real coverage design flaw, a real 180-day claim-timing gap, two real exclusions, and a sizing method that was measuring the wrong thing entirely for my actual situation.

None of that required a human to be less involved in the parts that actually needed a human -- the Singpass approvals, the final judgment calls about what the numbers mean. It just meant the tedious, error-prone, and (for most people) never-actually-done reading got done properly.

Until next time, peace and love!
