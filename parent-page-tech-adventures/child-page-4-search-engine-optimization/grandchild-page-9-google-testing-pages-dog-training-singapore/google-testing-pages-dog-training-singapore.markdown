---
layout: page
title: "Is Google Testing My Pages? Reading a Ranking Drop in Search Console"
permalink: /tech-adventures/search-engine-optimization/google-testing-pages-dog-training-singapore
grand_parent: Tech Adventures
parent: Search Engine Optimization
nav_order: 9
index: 'yes'
follow: 'yes'
description: Semrush said petcoach.sg fell from #1 to #45 for "dog training singapore". Here's how I used Google Search Console to work out that Google was swapping in other Pet Coach pages, not dropping the homepage, and how I judged that the page still meets searchers' needs.
image: ../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-9-google-testing-pages-dog-training-singapore/homepage-share-by-week.png
---

# Is Google Testing My Pages? Reading a Ranking Drop in Search Console
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

On 19 November 2026 I got an email from Semrush with the subject line "Your rankings declined (petcoach.sg)". The one keyword that campaign tracks, **"dog training singapore"**, had gone from **#1 to #6** the week before, and now to **#45**. The page ranking wasn't even the homepage any more. It was the services page.

That keyword matters. It's the main commercial search for [Pet Coach SG](https://petcoach.sg), the dog training business I do the SEO for, and getting the homepage to the top for it took a long time (I wrote about that in [Ranking First - Dog Training Singapore](https://blog.shafikwalakaka.com/tech-adventures/search-engine-optimization/rank-first-dog-training)). So a drop to #45 is the kind of thing that makes your stomach turn.

This post walks through how I investigated it over the following week, with Claude Code doing most of the data pulling and number crunching, and how I got to a fairly confident conclusion: **the homepage didn't drop. Google was trying other Pet Coach pages in its place, on desktop only, during its November core update.** I'll also cover the question that came after: if Google is testing our pages, can we tell whether the homepage still meets searchers' needs?

{: .highlight }
The short version: when the homepage was shown, it still ranked #1–3. What changed was *how often* Google showed it on desktop, which fell from ~100% of our appearances to ~50%, with our own puppy guide, About page and services page swapped in. A week later Semrush had it back in the top 10. Monitor, don't panic.

## The setup: four sources, four different views

Before getting into the investigation, it helps to know what each tool actually measures, because they disagreed loudly.

| Source | What it measures | Strength | Blind spot |
|---|---|---|---|
| **Semrush** (free campaign) | One keyword, one daily check from one location, desktop | Names the page that ranks; history back to Jan 2024 | One check isn't what real searchers see |
| **SE Ranking** | ~150 keywords, daily, desktop and mobile | Broad coverage, shows competitors | Same single-location limit |
| **Google Search Console** | What real searchers were shown, by query, page, device and day | It's Google's own data | Can't see competitors |
| **GA4** | What visitors did on the site | Engagement and bookings | Can't split by search term |

Semrush and SE Ranking each run one search a day and record what they see. Search Console summarises thousands of real searches. When they disagree, Search Console is usually the one that reflects reality.

## Step 1: Can I trust the Semrush email?

The first thing I did was check how good these emails have been at predicting anything. I pulled all **134 Semrush "Position Tracking Update" emails** from Gmail (Jan 2024 to Nov 2026) and had Claude Code extract the position, the ranking page and the alert type from each one, then line them up against SE Ranking, Search Console and GA4 for the same dates.

What came out of that:

- **Semrush agrees with SE Ranking.** Same-day positions were within 2 places 56% of the time and within 5 places 91% of the time. Both are single-location trackers, so that makes sense.
- **Semrush's weekly moves don't show up in Search Console.** When Semrush said the position went up or down, Search Console moved the same direction only **54%** of the time. That's a coin flip.
- **The subject line doesn't predict clicks.** In the week after a "rankings declined" email, clicks for this keyword were down 20% compared with the previous four weeks; after an "increased" email, down 5%; after a normal email, down 11%. With only 1–15 clicks a week, those gaps are one or two clicks.
- **Drops revert.** Of 27 "declined" emails, the position was back within one place within two emails in 18 cases. Back in 2025 there were several drops to #16–20 that each lasted exactly two emails and never appeared in Search Console at all.

{: .note }
The one genuinely useful thing Semrush adds is **which page ranks**. That matched Search Console's best desktop page on the same day 82% of the time. And this time, the page had changed.

So the email on its own wasn't proof of anything. But the page switch (homepage → puppy guide → services page) was worth chasing.

## Step 2: Which page is actually ranking?

The natural question was: has the services page taken over from the homepage, and has the homepage dropped out? Search Console can answer that directly. Filter the Performance report (or the API) to the query `dog training singapore` and break it down by **date × page × device**.

Here's one day from that breakdown, 23 November, desktop:

| Page Google showed | Impressions | Avg position |
|---|---|---|
| Homepage | 9 (+3 on `www.`) | 2.7 |
| About page | 8 | 65 |
| Dog obedience training page | 3 | 5.7 |
| Services page | 1 | 77 |

Two things jump out:

1. **The homepage still ranks #2–3 when it's shown.** It didn't fall to #45.
2. **The services page ranks way down (#40–80).** It didn't take over. It had actually *risen*, from about #97 to #45, and that one day it happened to be the best Pet Coach result in Semrush's single check because the homepage wasn't in that particular results page.

So the real question became: **how often was the homepage not shown at all?**

## Step 3: Measure how often the homepage is shown

Search Console gives you two different counts, and comparing them is the trick:

- **Query-level impressions:** pull with dimensions `date, query, device` (no page). Each search that showed *any* Pet Coach page counts once.
- **Page-level impressions:** pull with `date, page, device`. Each page that appeared counts separately.

Divide the homepage's impressions by the query-level impressions and you get the share of our appearances where Google chose to show the homepage. I've been calling it the **target share**.

![Weekly share of Pet Coach search appearances for "dog training singapore" where Google showed the homepage, desktop and mobile, August to November 2026](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-9-google-testing-pages-dog-training-singapore/homepage-share-by-week.png)

| Week starting | Desktop share | Mobile share |
|---|---|---|
| Aug – mid-Oct | 86–114% | 89–104% |
| 26 Oct | **53%** | 91% |
| 2 Nov | **52%** | 98% |
| 9 Nov | **65%** | 104% |
| 16 Nov | **66%** | 105% |

{: .note }
Values over 100% are normal. `petcoach.sg/` and `www.petcoach.sg/` (the Google Business Profile link) both count as the homepage, and sometimes both appear in the same search.

That's the whole story in one chart. **On desktop, from 26 October, Google stopped showing the homepage in roughly half of the searches where it showed a Pet Coach page.** Mobile didn't change.

## Step 4: What did Google show instead?

The same page-level data shows which pages filled the gap.

![Stacked weekly impressions on desktop for "dog training singapore" by Pet Coach page: homepage, puppy training guide, About page, services page and other pages, 21 September to 16 November 2026](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-9-google-testing-pages-dog-training-singapore/pages-shown-desktop-by-week.png)

{: .note }
These bars add up impressions per page, so a search that showed two Pet Coach pages counts twice. Use it to see the *mix* of pages, not the number of searches.

Week by week, you can watch Google trying different pages:

- **Late October:** the **puppy training guide** appeared at **#1–3** for a few days (28 Oct – 2 Nov). That's Google seriously testing it as the answer.
- **Early November:** the puppy guide faded to #7–20. The **services page**, the **dog obedience training page** and a few others (including an old test subdomain, since removed) appeared deep in the results.
- **Mid-November:** the puppy guide disappeared. The **About page** became the main stand-in, at around #54–65.

The pattern isn't "the homepage dropped". It's "Google is rotating through other Pet Coach pages for this search on desktop". Google usually shows only one or two results from the same site, so when it's unsure which of your pages best answers a query, it swaps them.

## Step 5: Rule out our own changes and technical problems

Before blaming Google, I checked whether we'd caused it:

- **The homepage relaunch.** We rebuilt the homepage and it went live on **30 October**. But the swapping started on **26 October**, four days earlier. The title stayed "Dog Training Singapore \| Pet Coach SG". Not the trigger.
- **The puppy guide.** It hadn't been edited since July. Its title, "Puppy Training Singapore: Complete Guide", does share "training singapore" with the keyword, which is probably why Google tried it.
- **Indexing.** Search Console's URL Inspection showed the homepage indexed, crawled recently, and with the canonical Google agreed with. No problem there.
- **Timing.** Google's November core update started rolling out on 10 November, and the run-up to a core update is a common time for this kind of shuffling. Desktop impressions for most of our tracked keywords dipped the same week the swapping started.

## Step 6: A competitor, or Google testing?

This was the key judgement call, and Search Console's data shape is what decides it:

| If a competitor had overtaken us | What we actually saw |
|---|---|
| The homepage's position would slip every day (#2 → #4 → #6) | The homepage still ranked **#1–3** whenever it was shown |
| Our impressions would fall across the board | Mobile was unchanged; only desktop swapped |
| The stand-in pages wouldn't matter | The stand-ins were **our own pages**, ranking deep |

Everything points to Google choosing *which Pet Coach page* to show, not someone else taking the spot. So the decision was: **monitor only, no site changes during the core update.** If the trend turned down, the first step would be a live search to see whether a competitor had moved up. If none had, we'd treat it as Google update testing.

## Step 7: Semrush confirms the recovery

A few days later, a different kind of Semrush email arrived: **"Notification of rank change"**. These fire whenever the keyword enters or leaves the top 10, and I hadn't been archiving them because they have a different subject line. There were 23 of them going back to 2024.

The newest said "dog training singapore" **entered the top 10 at #5**, up 40 places.

![Ranking position for "dog training singapore" on desktop: Semrush's single daily check against Search Console's weekly average for the homepage when shown, August to November 2026](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-9-google-testing-pages-dog-training-singapore/semrush-vs-search-console.png)

The alert history is reassuring. The keyword has dropped out of the top 10 many times and every time it came back:

- **2024:** #9 ↔ #11–13, back within 1–4 days.
- **2025:** #23, #16 and #20, back within about a week each time.
- **November 2026:** #45 on 18 November, back to #5 a week later.

Meanwhile, the blue line, Search Console's view of the homepage, barely moved. That gap is exactly why one tracker's alert shouldn't drive decisions on its own.

## Does the homepage still meet searchers' needs?

Once it was clear Google was testing pages, the next question was a fair one: if Google is trying alternatives, does it think our homepage isn't good enough?

Search Console can't answer that directly. Google doesn't share its quality judgements. But three signals get you close:

1. **Google keeps choosing it, and ranks it well.** When the homepage is shown, it's at #1–3. A page that no longer fit the search would sink in position, not just get swapped out some of the time. This is the strongest signal.
2. **Clicks at its position.** Desktop homepage clicks for this keyword were 5 in the four weeks to 19 November, against 8 in the four weeks before. Mobile went from 12 to 15. Small numbers, but no collapse.
3. **What visitors do after they land.** GA4 shows engagement and bookings from organic visitors landing on the homepage. It can't split them by search term, so it's a supporting signal rather than proof.

Taken together: the homepage still ranks well whenever it's shown, it still matches what people searching "dog training singapore" want, and nothing suggests it has stopped fitting.

## What Search Console can't tell you

It's worth being honest about the limits, because they shape how confident you can be:

- **Competitors.** Search Console only sees your own pages. You need a rank tracker or a live search for that.
- **Searches where you didn't appear at all.** The share only counts searches that showed at least one of your pages.
- **Why Google made a change.** A deliberate test, location, personalisation or the core update all look the same in the data. "Google is testing" is an inference from the pattern, not something Google confirms.
- **Exact positions.** Positions are averages, and a handful of impressions at #60–80 can drag a page's daily average down a lot.
- **The latest days.** Data lags 2–3 days, and the most recent day is usually incomplete.

## What I changed in my weekly checks

The investigation exposed a gap: my weekly rank checks looked at positions, but nothing checked *which page* was ranking. So I added two rules to the weekly check that Claude Code runs:

- **Target share.** For each priority keyword, compare the target page's impressions with query-level impressions. Below 75% is amber; below 75% for three weeks running is red.
- **Semrush page flip or drop.** If Semrush's ranking page isn't the homepage, or the position is 5+ places worse than its four-email median, that's amber. Red only if it lasts three emails, or another source agrees the same week.

I also added the "Notification of rank change" emails to the weekly fetch, because an "Enters the top 10" alert is the quickest sign of recovery.

{: .important }
If you want to try this yourself, the whole method is two Search Console pulls for one query: `date, query, device` and `date, page, device`. Divide the target page's impressions by the query-level impressions, day by day and week by week, and look at which other pages appear when the share drops.

## Conclusion

A "#1 to #45" email looked alarming. The data underneath said something much calmer: the homepage still ranked at the top when shown, mobile was fine, and on desktop Google was trying our own puppy guide, About page and services page in its place during a core update. A week later the tracker had it back at #5.

The bigger lesson for me is how much Search Console can show when you break one query down by page and day. It won't tell you *why* Google does something, but it shows you *what* Google tried, when, and on which device, and that's usually enough to decide between "fix something now" and "watch it". This time, it was watch it.

Until next time, peace and love!
