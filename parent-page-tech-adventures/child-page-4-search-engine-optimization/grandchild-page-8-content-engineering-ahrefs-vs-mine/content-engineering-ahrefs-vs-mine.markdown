---
layout: page
title: "Content Engineering With Claude Code: Comparing My Flow With Ahrefs'"
permalink: /tech-adventures/search-engine-optimization/content-engineering-ahrefs-vs-mine
grand_parent: Tech Adventures
parent: Search Engine Optimization
nav_order: 8
index: 'yes'
follow: 'yes'
description: I compared the Claude Code workflow I use for one small business site, petcoach.sg, with the 23-skill content pipeline Ahrefs described, using a real six-article cluster as evidence. What lined up, what I'm missing, and what I'm taking from theirs.
image: ../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-8-content-engineering-ahrefs-vs-mine/pipeline-side-by-side.png
---

# Content Engineering With Claude Code: Comparing My Flow With Ahrefs'
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

A while back I read Ryan Law's [How I Do Content Engineering with Claude Code](https://ahrefs.com/blog/how-i-do-content-engineering-with-claude-code/) on the Ahrefs blog. Ryan is Ahrefs' Director of Content Marketing, and the post walks through how his team turns a keyword into a nearly finished article with a chain of Claude Code skill files.

Some context on where I'm coming from. Ahrefs is one of the biggest names in SEO, and their content team runs at a scale I don't. I'm one person doing the SEO for [Pet Coach SG](https://petcoach.sg), a dog training business in Singapore, and I've been working with Claude Code for most of this year.

So it was reassuring, halfway through Ryan's post, to recognise a lot of my own workflow in it: similar stages, the same idea of saving an output at every step, the same insistence on a human at the wheel. The difference is that his is properly formalised. Mine lives in a pile of docs, checklists and scripts, and in my head.

This series is my attempt to do an honest side-by-side and learn from it. Instead of comparing diagrams, I'm using a real piece of work as the evidence: a **six-article Border Collie cluster** I published on petcoach.sg between 16 and 22 October 2026, from the first plan through to the Google Search Console and GA4 numbers afterwards.

{: .highlight }
The short version: my flow lines up with most of what Ryan describes, which was good to see. The biggest thing I'm missing is the part that makes his reliable. His process is encoded in skills; mine depends on me remembering to open the right doc.

## What Ahrefs built

Here's the pipeline as Ryan describes it, in my own summary. Go read the original; it's a good post.

- **An orchestrator skill called `blog-pipeline`** runs the stages in order, taking a keyword idea to a nearly finished article. Every stage can also run on its own.
- **The stages:**
  1. keyword research and gap analysis;
  2. an outline;
  3. a research primer;
  4. the draft;
  5. an HTML preview that opens in Chrome;
  6. a final formatting skill for tables and shortcodes.
- **"~23 skill files" in total.** These are Markdown files that tell Claude how to do each step, with examples to copy and the output format to follow.
- **A `context` parameter** where Ryan adds expert direction up front: the angle, the sub-topics, product features to mention. It gets saved to a file the drafting skill reads.
- **Mandated data sources.** Keyword and SERP data come from the Ahrefs MCP, plus competitor headers, deep research and a product-features file. He's clear about why: without them, LLMs produce content that "sounds coherent but lacks substance."
- **An output file at every stage**, so he can inspect it, fix the output or the skill, and restart from the last good step.

The numbers he gives:
- drafts in "six to twelve minutes", down from "several days";
- "around 15 articles" published with the new process, and "some 30 or so more" updated.

He's also upfront about the limits:
- he reads every article before it goes out;
- it's not for mass-producing content;
- images are still a manual problem.

## What my flow looks like

For petcoach.sg there's no orchestrator skill. Instead, there's an SEO repo with:
- **23 Markdown docs** that govern each stage (brand voice, fact-checking, publishing checklist, internal linking, content structure, and so on);
- **about a dozen small Node scripts** that do the mechanical checks;
- **me**, approving at every gate.

Every stage still leaves a file behind. Here's the path the Border Collie articles took, next to Ryan's.

![Diagram of the Ahrefs pipeline and my petcoach.sg pipeline side by side. Both have keyword research, research, an outline and a draft. Ahrefs has an HTML preview and a final formatting step; I have no pre-publish preview and verify after publishing instead. My flow also has an interlinking plan and a performance review, which are outside the scope of Ryan's post.](../../parent-page-tech-adventures/child-page-4-search-engine-optimization/grandchild-page-8-content-engineering-ahrefs-vs-mine/pipeline-side-by-side.png)

The cluster itself:
- **a pillar**, [Border Collie Training in Singapore](https://petcoach.sg/border-collie-singapore/);
- **five supporting articles:** [prey drive](https://petcoach.sg/border-collie-prey-drive/), [obedience](https://petcoach.sg/border-collie-obedience/), [herding](https://petcoach.sg/border-collie-herding/), [working vs show lines](https://petcoach.sg/working-vs-show-line-border-collies/), and the most recent one, [Why Border Collies React to Sudden Change](https://petcoach.sg/border-collie-sudden-change/).

That last one went from outline to live in a single day, so it's the example I'll lean on most.

## Stage by stage

Here's how my flow compares with each stage Ryan describes, plus two stages from my side that his post doesn't set out to cover.

| Stage | Ahrefs (per Ryan's post) | Mine | Where I am |
|---|---|---|---|
| Keyword research | Ahrefs MCP, mandated | SE Ranking exports (no MCP) + Search Console | **Partial.** I skipped the export for the newer articles |
| Expert direction | `context` parameter, saved to a file | My input quoted word for word in the outline, with a coverage table | **Doing it**, in a different form |
| Outline | Own stage, own file | Own stage, own file, approved before drafting | **Doing it** |
| Research | Research primer | Client casework dataset, fact-check log, expert-source library | **Doing it**, built around our own client cases |
| Draft | Own stage, own file | Draft + "notes for review" + "pending before publish" | **Doing it** |
| Preview | HTML preview in Chrome | None. I verify after publishing | **Gap** |
| Formatting | Final formatting skill | Ad hoc converter, tables become infographics | **Partial** |
| Orchestration | `blog-pipeline` + ~23 skills | Prose docs + scripts + me | **Gap** |
| Testing the process | Anthropic's skill-creator, A/B per stage | Nothing | **Gap** |
| Interlinking | Outside the post's scope | Its own approved plan, every link verified | Part of my flow |
| Measuring results | Outside the post's scope | Search Console + GA4 review after publishing | Part of my flow |

## Parts of my flow the post doesn't cover

Ryan's post is about producing articles, so it doesn't go into what happens after publishing. That isn't the same as Ahrefs not doing it; a company that builds SEO tools clearly measures its results. These are just the parts of my process outside that post's scope, and the ones I think are most worth sharing from a small-site point of view. Each gets its own article later, so here's the headline with the receipt.

### Measuring what happened after publishing

With one site and one person, measuring is how I find out whether any of this is working, so it's built into my flow. For the Border Collie cluster, I ran an audit a week in.
- **Indexing:** Google indexed the pillar on the day it went live.
- **Early ranking:** within six days it had about 92 impressions and was sitting around **position 6 for "border collie singapore"**.
- **The surprise was in GA4.** It showed 13 "Google organic" visits to the cluster. When I matched them against actual Search Console clicks, only **2** were real Google searches. The rest were most likely links opened from Gmail or Google Docs. Those pass through a google.com redirect, and GA4 labels them as organic search.

{: .important }
GA4's "Organic Search" channel is not the same thing as "someone found you on Google." Cross-check it against Search Console clicks before reading too much into it.

### Verifying every live edit

This one exists mostly because my setup is fragile. Publishing goes through a WordPress MCP server, and its search-and-replace tool sometimes reports `"replacements": 1` when nothing changed at all. So nothing counts as done until I've checked the live result:
- the stored post content compared byte for byte with what I sent;
- a before-and-after diff showing exactly one changed line;
- a scan for duplicated tags.

That habit is the only reason I caught a quieter problem. The database tool I verify with was turning the en dashes in one article's Sources list into `�`. If I'd built an edit from that output, I'd have pushed the garbled characters live.

### Capturing my input point by point

Ryan front-loads his direction into a context file. I do something similar in a different shape. I paste my raw messages, word for word, into the outline, then add a coverage table mapping each point to the section it lands in. Both aim at the same thing: getting expert judgement in before the draft, instead of fixing it at the end.

On the sudden-change article, that meant six rounds of input, each of which changed the article:
- why dogs that react at home often cope fine in a busy shopping mall;
- the handler being part of what the dog anticipates;
- splitting "dislike" out from fear;
- one case I'd filed as sudden contrast turning out to be fear after an in-person consult.

## What I'm taking from Ahrefs

### Encode the process, don't rely on memory

This is the big one. My publishing checklist is full of notes like this one, copied straight from the doc:

> This step is correctly documented above but still got skipped in practice.

It describes a step that was correctly documented and still got skipped. When a process lives in prose, it depends on someone remembering to open the right file at the right moment. Skills fix exactly that: they trigger themselves and carry their own checks. I wrote a plan to move my flow into skills in September, and I haven't started it.

{: .warning }
If your process is a folder of good docs, it's only as reliable as your memory of which doc to open. That's the failure mode skills solve.

### Make mandated inputs actually mandatory

Ryan's stages don't run without their data. My keyword export is a manual step, because SE Ranking has no MCP. For the newer Border Collie articles I simply didn't run it, and they shipped with provisional target keywords. Nothing in my flow stopped that.

### Preview before publishing

I check everything after it's live. A pre-publish HTML preview would catch layout and image problems before readers see them. It's a stage I'd happily copy exactly as Ryan has it.

### Test the process itself

Ryan's team runs each skill with and without its guidance to see whether the instructions help. I have no equivalent. My process improves when something breaks and I write a new watch-out into a doc.

## A quick word on the sources

The Ahrefs articles around this one also explain "information gain": add original data, because pages with more unique data points tend to score as more original. Out of curiosity, I traced the studies they cite back to the source.

Ahrefs summarises them accurately. The underlying research just comes with caveats worth knowing, several of which the study authors point out themselves. The "15+ unique data points" figure (an average score of 62 against 40) comes from:
- a small, single-day sample;
- a weak overall correlation (r = 0.17);
- a scoring metric built by the vendor that ran the study.

The bigger lesson was closer to home. Going back over my own notes from the first time I read these posts, I found two errors of my own.

## What's in this series

The rest of the series is on its way. I'll link each article here as it's published.

1. **Comparing my flow with Ahrefs'** (you're here)
2. Before the prompt: capturing human input and gating each stage
3. Information gain from your own data: 201 case records, 4 infographics
4. Fact-checking an AI draft: primary sources, course notes and a log
5. Publishing and interlinking without breaking WordPress
6. Did it work? Week one in Search Console and GA4
7. What I'm formalising next: skills, an idea gate and mandated inputs

If you're more interested in the Claude Code side than the SEO side, I've written about the two places I *did* turn this blog's own workflow into reusable pieces: [automating blog post generation with Claude](/tech-adventures/jekyll-blog/automating-jekyll-blog-post-generation) and [a /publish skill that watches its own deploy](/tech-adventures/jekyll-blog/claude-code-publish-skill). And for earlier PetCoach SEO results, there's [ranking first for "dog training singapore"](/tech-adventures/search-engine-optimization/rank-first-dog-training).

## Conclusion

Comparing my flow with Ryan's was reassuring and humbling in equal parts. The shape is much the same: human direction first, an output at every stage, real data, someone who reads everything before it goes out. My setup has grown a few extra habits, measuring and verifying, mostly because I'm one person on one site and need to know quickly whether something worked or broke. But Ahrefs has taken the step I keep putting off. Their process runs itself; mine runs on my memory. The rest of this series walks through each stage with the Border Collie cluster as evidence, and ends with my plan to close that gap.

Until next time, peace and love!
