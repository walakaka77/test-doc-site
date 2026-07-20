# Placement Guide — Where a New Article Goes

How to decide parent section, child page, and grandchild vs. child-level depth for a new article. `CLAUDE.md` already states the top-level rule ("always ask if unclear") -- this is the decision process behind that rule, plus the precedent-matching heuristic that's actually been used in practice.

## Step 1 — Top-level section

Three sections exist: **Tech Adventures**, **Canine Chronicles**, **New Home Kallang**. This is almost never ambiguous -- a technical/career/API-testing article is Tech Adventures; anything else is a rare edge case worth actually asking about rather than guessing.

## Step 2 — Child page: match an existing category before creating a new one

Read the existing child pages under the section first (`ls -d parent-page-tech-adventures/child-page-*`) and check whether the new article's topic already has a home:

- **Third Party Integrations** (`child-page-5`) -- any article about testing/integrating an external vendor's API (Adyen, Wise, Stripe, ADFS, SPCP/Corppass so far). This has become the de facto home for "hands-on API testing writeups" regardless of which vendor, because the *shape* of those articles (docs → hands-on testing → findings) is more similar to each other than to anything else in Tech Adventures.
- **Jekyll Blog** (`child-page-1`) -- meta-articles about the blog's own tooling and workflow (Claude Code skills, the blog post generator, git branching strategy for this repo specifically). Not vendor-integration content, even if Claude Code itself is technically "a tool being integrated."
- **Wordpress**, **YouTrack**, **SEO**, **Security**, **DevOps**, **General Tech** -- topic-specific, self-explanatory from the name.

**Precedent-matching heuristic:** before creating a new child page, ask "does an existing sibling article already cover a similar *shape* of content, even if a different vendor/topic?" If yes, that's the home -- a new child page fragments a series that belongs together (e.g. don't create `child-page-9-adyen-testing` when `child-page-5-third-party-integrations` already holds the Wise, ADFS, and SPCP testing series in the same shape). Only create a new child page when the topic is genuinely structurally different, not just a different vendor.

## Step 3 — Grandchild vs. child-level article

Almost everything is a grandchild page under an existing child page. Write directly at the child level only for a page that's meant to be the section's own index/landing content (rare -- most child pages in this repo are thin index stubs and all real content lives in grandchildren).

## Step 4 — `nav_order`

Always read existing frontmatter to find the current max, never guess:

```bash
for f in child-page-X-name/grandchild-page-*/*.markdown; do grep "^nav_order:" "$f"; done
```

New article's `nav_order` = max + 1. This holds even when the new article is part of a series that conceptually "belongs" earlier -- `nav_order` reflects publish/discovery order in the sidebar, not narrative chronology. If several articles in one series are being created in the same session, assign them sequential numbers in the order they should be read, starting from max + 1.

## Step 5 — Multi-article series within one child page

When a single session produces several related articles (a "series"), they all go into the *same* child page as separate grandchild folders with sequential `nav_order`, not nested under each other. Cross-linking (see `interlinking.md`) is what conveys the series relationship to a reader -- the folder structure itself stays flat.

## When it's genuinely unclear

If the topic doesn't cleanly match an existing child page's established shape, and creating a new child page also feels premature (e.g. a one-off article that doesn't obviously start a series) -- stop and ask the user, per `CLAUDE.md`'s existing instruction. Don't silently default to the closest-but-imperfect fit just to avoid asking.
