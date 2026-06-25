# /publish — Publish Article to GitHub Pages

Commit and push an approved article to `origin/main`, which triggers the GitHub Pages deployment for blog.shafikwalakaka.com.

## What this command does

1. Shows you exactly what files will be committed (safety check)
2. Commits the article to the local `main` branch
3. Pushes to `origin/main` → live on the blog within ~60 seconds

## Arguments

`$ARGUMENTS` — optional article folder path or title hint (e.g. `grandchild-page-21-my-topic`). If omitted, the command will inspect all changed files to identify the article being published.

---

## Steps

### Step 1 — Verify branch

Run:
```bash
git branch --show-current
```

If not on `main`, stop and tell the user: "You are on branch `{branch}`. Switch to `main` before publishing."

### Step 2 — Show pending changes

Run:
```bash
git status
git diff --stat HEAD
```

List the files that will be committed. Confirm with the user that these are the correct article files before proceeding.

If there are unexpected unrelated changes mixed in (e.g. edits to `_config.yml` or other articles), flag this and ask which files to include in this commit.

### Step 3 — Stage the article files

Stage only the article folder (and any images alongside it). If `$ARGUMENTS` provides a folder hint, use it. Otherwise, infer the folder from `git status`.

```bash
git add <article-folder-path>
```

Never use `git add -A` or `git add .` — always add specific paths to avoid accidentally committing unrelated changes or sensitive files.

### Step 4 — Commit

Use a descriptive commit message in this format:
```
publish: <article title>
```

Where `<article title>` comes from the article's frontmatter `title:` field.

```bash
git commit -m "publish: <article title>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

### Step 5 — Push to origin/main

```bash
git push origin main
```

This triggers GitHub Pages to rebuild and deploy the site. The article will be live at blog.shafikwalakaka.com within approximately 60 seconds.

### Step 6 — Confirm

After the push succeeds, report:
- The commit hash (`git log -1 --oneline`)
- The live URL the article will be available at (inferred from the article's `permalink:` frontmatter)
- Remind the user to wait ~60s for GitHub Pages to rebuild

---

## Notes

- GitHub Pages deploys from `origin/main` automatically on every push.
- If the push is rejected (remote has diverged), run `git pull --rebase origin main` first, then push again.
- Do NOT force push (`git push --force`) without explicit user approval.
- If unsure which files belong to the article, read the article's `.md` file to confirm its `title:` and `permalink:` before committing.
