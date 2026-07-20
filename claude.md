# CLAUDE.md — Jekyll Blog Post Generator

This file configures Claude Code to act as a Jekyll blog post generator for **blog.shafikwalakaka.com**.

---

## About This Blog

- **Site**: blog.shafikwalakaka.com
- **Theme**: Just the Docs (Jekyll)
- **Repo**: `walakaka77/test-doc-site`, branch `main`
- **Hosted via**: GitHub Pages

---

## Two Modes of Operation

### Mode 1 — Outline / Instructions
The user provides a topic, title, and/or bullet-point outline directly in the chat. Claude Code writes the full article from scratch.

### Mode 2 — Draft File (`_draft.md`)
The user drops a `_draft.md` file into the target folder before starting the Claude Code session. This draft was pre-processed by Claude.ai (the browser chat), which read a Claude conversation thread and converted it into a structured markdown draft.

**Claude Code should never attempt to fetch a claude.ai thread URL directly — this is blocked and will not work.** The `_draft.md` file is always the handoff point between Claude.ai and Claude Code.

When a `_draft.md` exists in the target folder:
1. Read it fully to understand the content, problem, solution, and structure
2. Use it as the source of truth for the article body
3. Apply all formatting, frontmatter, and style rules from this `CLAUDE.md`
4. Generate the final article `.md` file in the same folder
5. Delete `_draft.md` after the final article is written (or ask the user)

---

## Before Generating — Always Ask If Unclear

Before writing any article, confirm:

1. **Which parent section?** (Tech Adventures / Canine Chronicles / New Home Kallang)
   - If not obvious from the content, **ask the user** before proceeding.
2. **Which child/grandchild subsection?**
   - If not obvious, **ask the user** before proceeding.
3. **Where should the file be saved?**
   - State the exact file path explicitly and confirm with the user before writing.

Do not guess silently — always surface ambiguity and resolve it with the user first.

---

## Repo Structure & File Placement

### Top-Level Sections

| Section | Repo folder | permalink prefix |
|---|---|---|
| Tech Adventures | `parent-page-tech-adventures/` | `/tech-adventures/` |
| Canine Chronicles | `parent-page-canine-chronicles/` | `/canine-chronicles/` |
| New Home Kallang | `new-home-kallang/` | `/new-home-kallang/` |

### Folder Naming Convention

Child pages:
```
parent-page-{section}/child-page-{N}-{slug}/index.md
```

Grandchild pages:
```
parent-page-{section}/child-page-{N}-{slug}/grandchild-page-{N}-{slug}/grandchild-page-{N}-{slug}.md
```

### Reference Example — Article 18 (Wordpress > Online Course Implementation)

File path:
```
parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/online-course-implementation.md
```

Images stored alongside the markdown file:
```
parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/testing-4002-port-localhost.png
parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/woocommerce-config.png
...
```

Image reference in markdown (relative path from the article file):
```markdown
![alt text](./image-name.png)
```

---

## nav_order — How to Infer

Before generating, **read the existing markdown files** in the target section folder to find the highest current `nav_order` value. Set the new article's `nav_order` to `highest + 1`.

Use filesystem access (e.g. `ls` or `cat` frontmatter) — do not guess.

---

## Frontmatter Template

```yaml
---
layout: page
title: [Title of the article]
permalink: /[parent-path]/[child-path]/[grandchild-slug]
parent: [Parent Section Title — exact match to the parent page's title field]
grand_parent: [Grand Parent Title — exact match, omit if top-level child]
nav_order: [next available number, check existing files]
index: 'yes'
follow: 'yes'
description: [1 sentence, SEO-friendly summary of the article]
image: [relative path to hero/first image, e.g. ./screenshot-hero.png]
---
```

---

## Article Structure (always follow this exactly)

```markdown
# Title
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

[Opening paragraph — what is this about, why does it matter, brief context]

## Section Heading

### Subsection if needed

Content...

## Another Section

...

## Conclusion

[Wrap-up paragraph]

Until next time, peace and love!
```

---

## Just the Docs Formatting

Use the following Just the Docs components correctly:

### Callouts

Single paragraph callout:
```markdown
{: .note }
Your note text here.
```

Callout with custom title:
```markdown
{: .note-title }
> My Custom Title
>
> Your note text here.
```

Multi-paragraph callout:
```markdown
{: .important }
> First paragraph.
>
> Second paragraph.
```

Available callout types (as configured in `_config.yml`): `highlight`, `important`, `new`, `note`, `warning`

Use `{: .note }` for tips and gotchas. Use `{: .warning }` for things that can break. Use `{: .important }` for critical steps.

### Code Blocks

Always use fenced code blocks with a language identifier:

````markdown
```bash
brew install httpd php mariadb
```
````

````markdown
```php
define('DB_NAME', 'local_course_db');
```
````

````markdown
```yaml
layout: page
title: My Article
```
````

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Value | Value | Value |
```

---

## Images — Generation & Placement

### Generating Images

When the article would benefit from screenshots or diagrams that don't exist yet, **generate placeholder images** using a web image search or describe what should go there. For each image in the article:

1. Add a clearly labelled image placeholder in the markdown:
   ```markdown
   ![Description of what this screenshot shows](./screenshot-step-1.png)
   ```
2. List all required images at the **end of the generated article** in a section called `## Images Required`, like this:
   ```markdown
   ## Images Required
   
   Please add the following screenshots to the article folder before publishing:
   
   | Filename | What to capture |
   |---|---|
   | `screenshot-step-1.png` | Apache virtual host config in terminal |
   | `woocommerce-config.png` | WooCommerce payment settings screen |
   ```

### Image Path Rule

Images live in the **same folder as the article markdown file**. However, the path used in the markdown depends on whether the article is a child page or a grandchild page — because the `permalink:` URL does not match the repo file path, so `./` resolves incorrectly for grandchild pages.

#### Grandchild pages — use the deep relative path (2 levels up)

The permalink for a grandchild article is `/section/child/grandchild-slug`. The browser resolves `./` relative to `/section/child/`, but the image is served from the repo path `/parent-page-{section}/child-page-{N}/grandchild-page-{N}/image.png`. These don't match.

Use `../../` to go up two levels from `/section/child/` to the site root, then navigate to the full repo path:

```markdown
<!-- ✓ CORRECT for grandchild articles -->
![alt text](../../parent-page-tech-adventures/child-page-1-jekyll-blog/grandchild-page-8-some-slug/image.png)
```

The pattern is always:
```
../../{parent-page-folder}/{child-page-folder}/{grandchild-folder}/image.png
```

Apply this same deep path to the `image:` frontmatter field.

#### Child pages — use `./`

For top-level child pages (no grandparent), `./` works correctly:

```markdown
<!-- ✓ CORRECT for child articles -->
![alt text](./image.png)
```

#### Quick check

Run `/fix-image-paths` on any grandchild article to automatically audit and fix all `./` image references.

---

## Domain Access — Request All at Once

If fetching external URLs is needed (Just the Docs docs, GitHub API, etc.), **request access to all required domains at once** at the start of the task — do not ask one by one. List all domains needed and wait for user approval before proceeding.

> **Important:** Never attempt to fetch `claude.ai` URLs — these are blocked for programmatic access. Thread content is always provided via a pre-processed `_draft.md` file.

Example request format:
```
I need to access the following domains to complete this task. Please approve all at once:
- raw.githubusercontent.com (to read existing article files)
- just-the-docs.com (to verify formatting)
```

---

## Writing Style

- **Tone**: Casual, friendly, practical. Like a knowledgeable friend explaining things.
- **Voice**: First person ("I", "we"). Personal anecdotes welcome.
- **Jargon**: Explain technical terms simply on first use.
- **Sign-off**: Always end with a short friendly closer, e.g.:
  - "Until next time, peace and love!"
  - "That's a wrap! Peace and love, Shafik."
- **Screenshots**: Add `![descriptive alt text](./filename.png)` placeholders wherever a screenshot would help. List them in the `## Images Required` section at the end.
- **Step numbering**: Use `### Step 1: ...`, `### Step 2: ...` for sequential how-to sections.
- **Notes/warnings**: Use Just the Docs callout syntax (see above), not plain bold text.

---

## Standardization Guides

The sections above cover the mechanics of a single article. For decisions that span *multiple* articles or an entire series — which slug, which section, how things link together, the fuller voice rules — see the guides under `.claude/guides/`:

- [`slugs.md`](.claude/guides/slugs.md) — folder/filename/permalink conventions, how to pick a slug
- [`placement.md`](.claude/guides/placement.md) — how to choose parent/child/grandchild placement, the precedent-matching heuristic
- [`interlinking.md`](.claude/guides/interlinking.md) — the accept/reject process for cross-links between articles, both within a new series and against existing ones
- [`voice.md`](.claude/guides/voice.md) — the fuller writing-voice guide (this section is the summary)

These are living documents — refine them as patterns solidify or as exceptions come up, the same way this file itself gets refined.

---

## Output — What to Produce

1. **State the exact file path** where the article will be saved. Confirm with user if unsure.
2. **Write the complete `.md` file** — frontmatter + full article body.
3. **Save the file** to the correct location in the repo.
4. **List any images required** at the bottom of the article under `## Images Required`.
5. **Summarise** what was generated: file path, nav_order used, parent/grandparent inferred.

---

## Example Workflows

### Example A — Outline mode

**User says:**
> "Write a post about fixing YouTube embed error 153 in Elementor. It goes under Tech Adventures > Wordpress."

**Claude Code should:**
1. Confirm: "I'll place this under `parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-{N}-fixing-youtube-embed-error-153-elementor/`. Let me check the existing nav_orders in that folder..."
2. Read existing files in `child-page-3-wordpress/` to find the next `nav_order`.
3. Generate the full `.md` file with correct frontmatter, article body, callouts, code blocks, image placeholders.
4. Save the file to the correct path.
5. Print a summary: file saved, nav_order used, images needed.

### Example B — Draft file mode

**User says:**
> "There is a draft at `parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-19-my-topic/_draft.md`. Please generate the article from it."

**Claude Code should:**
1. Read `_draft.md` from that folder.
2. Confirm: "I'll generate the article at `grandchild-page-19-my-topic/my-topic.md`, under Wordpress > Tech Adventures, nav_order 19. Is that correct?"
3. Generate the full `.md` file using `_draft.md` as the content source, applying all formatting rules.
4. Save the final article.
5. Delete `_draft.md`.
6. Print a summary.

> **Note:** Claude Code never fetches claude.ai thread URLs directly — that is blocked. The `_draft.md` is always prepared first in Claude.ai (the browser chat) and dropped into the folder manually by the user.

---

## Quick Reference — Checklist Before Saving

- [ ] Parent and grandparent sections confirmed (asked user if unclear)
- [ ] File path stated explicitly to user
- [ ] `nav_order` checked from existing files (not guessed)
- [ ] Frontmatter complete with all fields
- [ ] TOC block included
- [ ] Article ends with friendly sign-off
- [ ] Image placeholders use `./filename.png` relative paths
- [ ] `## Images Required` section at the end lists all needed screenshots
- [ ] Callouts use correct Just the Docs syntax (`{: .note }`, `{: .warning }`, etc.)
- [ ] Code blocks have language identifiers