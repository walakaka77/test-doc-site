# /fix-image-paths — Fix image paths in a grandchild article

Grandchild articles use a custom `permalink:` that does not match the file's physical path in the repo.
This means `./image.png` resolves to the wrong URL when Jekyll renders the page.
All image references must use a two-level-up deep relative path instead.

## Why this is needed

The permalink structure is: `/section/child/grandchild-slug`  
The file lives at: `parent-page-{section}/child-page-{N}-{slug}/grandchild-page-{N}-{slug}/article.md`  
The image lives at: `parent-page-{section}/child-page-{N}-{slug}/grandchild-page-{N}-{slug}/image.png`

Jekyll renders the page at the permalink URL. The browser resolves `./` relative to the URL's directory (`/section/child/`), not the repo folder. The image, however, is served from its original repo path (`/parent-page-{section}/child-page-{N}-{slug}/grandchild-page-{N}-{slug}/image.png`). These do not match, so `./` breaks.

The fix: use `../../` to go up two levels from `/section/child/` to the site root `/`, then navigate to the full repo path.

## Correct pattern

```markdown
../../parent-page-{section}/child-page-{N}-{slug}/grandchild-page-{N}-{slug}/image.png
```

## Steps

### Step 1 — Identify the article file

If `$ARGUMENTS` is provided, use it as the path to the article `.md` file.  
Otherwise, ask the user which article to fix.

### Step 2 — Determine the correct base path

Read the article's file path. The grandchild folder name (e.g. `grandchild-page-2-wco-2026-livestream-scam`) and its parent folders give you the base path:

```
../../{child-page-parent-folder}/{grandchild-folder}/
```

Example for an article at:
`parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/grandchild-page-2-wco-2026-livestream-scam/wco-2026-livestream-scam.md`

The base path is:
`../../parent-page-tech-adventures/child-page-6-Security-Cookies-and-More/grandchild-page-2-wco-2026-livestream-scam/`

### Step 3 — Find all image references using `./`

Search the article for any image references using `./`:

```bash
grep -n "!\[.*\](\./.*)" <article-path>
```

Also check the `image:` field in the frontmatter.

### Step 4 — Replace each `./filename.ext` with the full deep path

For each match, replace `./filename.ext` with `../../{parent-folder}/{child-folder}/{grandchild-folder}/filename.ext`.

Use the Edit tool for each replacement (or replace_all if the same filename appears multiple times).

### Step 5 — Verify

After replacing, grep the file again to confirm no `./` image references remain:

```bash
grep -n "!\[.*\](\./.*)" <article-path>
```

Report how many paths were fixed and confirm the article is clean.
