# /publish — Publish Article to GitHub Pages

Commit and push an approved article to `origin/main`, which triggers the GitHub Pages deployment for blog.shafikwalakaka.com.

## What this command does

1. Shows you exactly what files will be committed (safety check)
2. Commits the article to the local `main` branch
3. Pushes to `origin/main` → live on the blog within ~60 seconds
4. Kicks off a background poll of GitHub Actions for the deploy workflow, and reports back once it succeeds or fails — no need to manually check

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

### Step 6 — Confirm the push

After the push succeeds, report:
- The commit hash (`git log -1 --oneline`)
- The live URL the article will be available at (inferred from the article's `permalink:` frontmatter)
- That a background check for the deploy result is starting (Step 7)

### Step 7 — Poll GitHub Actions for the deploy result

This repo deploys via a GitHub Actions workflow named **"Deploy Jekyll site to Pages"** — not the legacy Pages-builds API (that endpoint 404s here). Check deploy status through the Actions runs API instead.

Get the commit SHA that was just pushed:
```bash
git rev-parse HEAD
```

Launch this as a **background** Bash command (`run_in_background: true`) so it doesn't block. It polls every 2 minutes and exits with exactly one line once the run for that commit reaches a terminal state:

```bash
SHA=$(git rev-parse HEAD)
REPO="walakaka77/test-doc-site"
while true; do
  RESULT=$(curl -s "https://api.github.com/repos/$REPO/actions/runs?per_page=10" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for r in d.get('workflow_runs', []):
    if r['head_sha'] == '$SHA':
        print(f\"{r['status']}|{r['conclusion']}|{r['html_url']}\")
        break
")
  if [ -n "$RESULT" ]; then
    STATUS=$(echo "$RESULT" | cut -d'|' -f1)
    if [ "$STATUS" = "completed" ]; then
      echo "$RESULT"
      break
    fi
  fi
  sleep 120
done
```

Set a timeout around 900000ms (15 min) — Pages deploys normally finish in 1-2 minutes, so this gives generous buffer without hanging indefinitely if something is stuck.

When the background task notification arrives, parse the final `status|conclusion|html_url` line and report to the user:
- **`conclusion=success`**: "Published — deploy succeeded" with the run URL and the live article URL.
- **`conclusion=failure`** (or anything other than `success`): "Deploy failed" with the run URL, and fetch the failing job's logs to summarize the error:
  ```bash
  curl -s "https://api.github.com/repos/walakaka77/test-doc-site/actions/runs/<run_id>/jobs" | python3 -m json.tool
  ```
  Point out which step failed and why, so the user doesn't have to open GitHub themselves.
- If the loop times out without ever finding `completed` (workflow hasn't started, API hiccup, etc.), say so plainly rather than assuming success.

---

## Notes

- GitHub Pages deploys from `origin/main` automatically on every push, via the Actions workflow — not the classic branch-based Pages build.
- If the push is rejected (remote has diverged), run `git pull --rebase origin main` first, then push again.
- Do NOT force push (`git push --force`) without explicit user approval.
- If unsure which files belong to the article, read the article's `.md` file to confirm its `title:` and `permalink:` before committing.
- The Actions API call is unauthenticated (public repo) and rate-limited to 60 requests/hour per IP — polling every 2 minutes stays well within that.
- If `gh` CLI is available in the environment, prefer `gh run list --commit <sha>` / `gh run view <run-id> --log-failed` over raw `curl` — same information, less parsing.
