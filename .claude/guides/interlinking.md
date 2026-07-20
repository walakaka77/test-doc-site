# Interlinking Guide

How to decide which articles link to which, when writing a new article or a new series. This is the process actually followed when writing the Adyen POS Terminal API series (5 articles) against the existing Wise Platform series, ADFS/SPCP series, and the older Adyen Online Payments article.

## The process, per new article (or series)

For every new article, in both directions:

1. **List outbound candidates** -- every other article that the new one could plausibly reference.
2. **Accept or reject each one explicitly**, with a one-line reason. Don't silently skip candidates and don't silently add low-value links either -- both are decisions, both deserve a reason.
3. **List inbound candidates** -- every existing article that could plausibly link *into* the new one.
4. **Accept or reject each one explicitly.** Accepting an inbound link usually means editing an already-published article to add a short pointer -- that's expected and fine; it's a small, additive edit, not a rewrite.

## Accept criteria

Link when the relationship is one of these:

- **Direct series membership** -- article N and N+1 in the same intentional series (architecture → setup → happy path → unhappy paths → closing limitation). These get linked essentially always, both directions (forward "what's next," backward "previously covered").
- **Prerequisite/dependency** -- article B assumes article A's setup or context ("setup already covered in [the mock terminal post]; not repeated here"). Link instead of re-explaining.
- **Direct reference to specific content** -- article B quotes, extends, or contradicts a specific finding in article A (e.g. the reversal article's ID-reuse point directly extends the approved-payment article's `ServiceID` discussion). Deep-link to the specific heading/anchor when the reference is that precise, not just the article as a whole.
- **Explicit contrast/counterpart** -- same vendor, structurally similar but different integration surface (Adyen's online checkout article vs. the new Adyen POS/Terminal API series). Worth a "if you're coming at this from the other side" pointer in both directions, even though they were written months apart by different sessions.
- **Sibling short articles grouped by the user's own framing** -- e.g. two short "unhappy path" articles explicitly requested together get a lightweight bidirectional "see also," even without one depending on the other's content.

## Reject criteria

Don't link when:

- **Same site section, unrelated topic** -- e.g. an Adyen article and an ADFS/SAML article both sit under "Third Party Integrations," but authentication-protocol testing and payment-terminal testing share no reader-relevant connection. Proximity in the folder tree is not a reason to link.
- **Different persona/audience** -- a beginner-level generic API explainer (e.g. "How API Works," a Stripe 101 for laypeople) next to a deep vendor-specific investigation. Even same general subject (APIs), different enough audience that a link would feel like a non-sequitur.
- **Would create a link-farm pattern** -- if every article in a series links to every other article individually "just in case," that's noise. Prefer: immediate-neighbor links throughout the series, plus **one** consolidated recap list in the closing article of the series (see the POS series' closing article for the pattern: one line listing the whole series in reading order).
- **Manual index-page edits** -- don't hand-edit a parent/child index page to list new grandchildren; Just the Docs auto-generates the sidebar nav from `parent`/`nav_order` frontmatter. A manual edit here is redundant work with no reader benefit and a future maintenance trap.

## Directionality

- New series → new series: link forward and backward liberally between immediate neighbors (this is the actual reading path).
- New series → older unrelated article in the same series (e.g. new POS article → older ADFS article): reject, per above.
- New series → an older *thematically parallel* article (e.g. new POS series → old Adyen ecom article): accept a light two-way pointer, and actually go edit the old article to add the inbound link -- don't leave it one-directional just because the old article already shipped.

## Depth of a single link

- Link to the article as a whole by default (`/tech-adventures/.../slug`).
- Link to a specific `#heading-anchor` only when the reference is precise enough that "somewhere in this article" would waste the reader's time (e.g. pointing at a specific appendix or a specific screenshot step, not just "see the previous post").

## Verifying links actually resolve

After adding any cross-links, before considering the work done:

1. Confirm every linked permalink actually exists as a `permalink:` in some article's frontmatter (a broken internal link is worse than no link).
2. Rebuild the site (`bundle exec jekyll build`) and spot-check that anchors used with `#` actually match a heading Jekyll/kramdown generated (kramdown auto-slugifies headings -- verify rather than guess the exact slug it produced).
3. Do this check from the raw markdown source, not just the built HTML -- the built sidebar nav lists every sibling page regardless of whether you actually linked to it, which makes grepping rendered HTML for "does X link to Y" unreliable. Check the `.markdown` source files directly.
