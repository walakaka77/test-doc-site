# Blog Generation Instructions

I want to document the learnings from this conversation as a blog post for **blog.shafikwalakaka.com**.

Please generate a `_draft.md` file following all the rules below.

---

## Your Role

You are generating a **draft** (`_draft.md`), not the final article. The draft will be handed off to Claude Code in VS Code, which will finalise the formatting, set the correct `nav_order` from the filesystem, and save the file to the repo.

---

## Blog Structure

The blog has three top-level sections:

| Section | Folder | permalink prefix |
|---|---|---|
| Tech Adventures | `parent-page-tech-adventures/` | `/tech-adventures/` |
| Canine Chronicles | `parent-page-canine-chronicles/` | `/canine-chronicles/` |
| New Home Kallang | `new-home-kallang/` | `/new-home-kallang/` |

Child pages: `parent-page-{section}/child-page-{N}-{slug}/`
Grandchild pages: `parent-page-{section}/child-page-{N}-{slug}/grandchild-page-{N}-{slug}/`

Reference example:
```
parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-18-online-course-implementation/
```

**If the correct section is not obvious, ask me before generating.**

---

## Draft Output Format

Output a single fenced markdown code block I can copy and save directly as `_draft.md`.

The draft must contain these four parts in order:

### Part 1 — Placement metadata comment (for Claude Code)

```markdown
<!--
DRAFT METADATA — for Claude Code
Suggested section:      [e.g. Tech Adventures > Wordpress]
Suggested folder:       [e.g. parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-{N}-{slug}/]
Suggested slug:         [e.g. fixing-ssl-mixed-content]
Suggested title:        [e.g. Fixing SSL Mixed Content in WordPress]
Suggested permalink:    [e.g. /tech-adventures/wordpress/fixing-ssl-mixed-content]
Suggested parent:       [e.g. Wordpress]
Suggested grand_parent: [e.g. Tech Adventures]
nav_order:              [TO BE SET BY CLAUDE CODE]
-->
```

### Part 2 — Suggested frontmatter

```yaml
---
layout: page
title: [title]
permalink: /[parent-path]/[slug]
parent: [Parent Section Title]
grand_parent: [Grand Parent Title — omit if top-level child]
nav_order: [TO BE SET BY CLAUDE CODE]
index: 'yes'
follow: 'yes'
description: [1 sentence SEO-friendly summary]
image: ./screenshot-hero.png
---
```

### Part 3 — Full article body

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

### Step 1: ...

[Content]

### Step 2: ...

[Content]

## Conclusion

[Wrap-up]

Until next time, peace and love!
```

### Part 4 — Images required table

```markdown
## Images Required

| Filename | What to capture |
|---|---|
| `screenshot-hero.png` | [description] |
| `step-1-result.png` | [description] |
```

---

## Just the Docs Formatting Rules

### Callouts

```markdown
{: .note }
Single paragraph tip or gotcha.

{: .note-title }
> My Custom Title
>
> Note with a custom title.

{: .warning }
Something that can break or go wrong.

{: .important }
> Critical step — do not skip.
>
> Additional detail here.
```

Available types: `highlight`, `note`, `important`, `new`, `warning`

Use `{: .note }` for tips. Use `{: .warning }` for things that can break. Use `{: .important }` for critical steps.

### Code blocks — always include a language identifier

````markdown
```bash
brew install httpd
```

```php
define('DB_HOST', '127.0.0.1');
```

```yaml
nav_order: 18
```
````

### Images — always use relative path

```markdown
![Descriptive alt text](./filename.png)
```

### Step headings

```markdown
## Phase or Topic Heading

### Step 1: Do the thing

### Step 2: Do the next thing
```

---

## Writing Style

- **Tone**: Casual, friendly, practical — like a knowledgeable friend explaining things
- **Voice**: First person ("I", "we"). Personal anecdotes welcome
- **Depth**: Step-by-step, written so a layman can follow along and understand the nuances of the implementation — not just what to do, but why
- **Jargon**: Explain technical terms simply on first use
- **Dead ends**: Skip failed attempts unless they teach something useful
- **Sign-off**: Always end with something like "Until next time, peace and love!" or "That's a wrap! Peace and love, Shafik."
- **Screenshots**: Add `![descriptive alt text](./filename.png)` placeholders wherever a screenshot would help. List every image in the `## Images Required` table at the end
- **Callouts**: Use Just the Docs syntax for all tips and warnings — never plain bold text

---

## After You Generate

Tell me:
1. The suggested folder path to save `_draft.md`
2. Any images I need to prepare before publishing