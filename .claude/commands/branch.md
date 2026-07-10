# /branch — Start a new branch for article work

Creates a new git branch off an up-to-date `main` before starting work on a new article or set of articles, so drafts and screenshots can be committed and reviewed in isolation before merging into `main` and running `/publish`.

## What this command does

1. Confirms the working tree is clean (or flags what isn't)
2. Ensures `main` is up to date with `origin/main`
3. Creates and switches to a new branch, named from the topic
4. Confirms the branch is ready for article work

## Arguments

`$ARGUMENTS` — optional topic or short slug for the branch (e.g. `wise-testing`, `stripe-webhooks-deep-dive`). If omitted, ask the user for a one-to-three-word topic before naming the branch.

---

## Steps

### Step 1 — Check working tree state

```bash
git status
```

If there are uncommitted changes that aren't expected local tooling state (e.g. `.claude/settings.json` permission-cache diffs, which are fine to leave as-is), stop and ask the user whether to commit, stash, or discard them before branching. Never stash or discard without asking first.

### Step 2 — Sync main

```bash
git checkout main
git pull origin main
```

Branching off a stale `main` risks a messier merge later. If `git pull` reports local changes blocking the checkout (e.g. a stray untracked file colliding with a tracked one, as happened previously with `.claude/settings.json`), move the conflicting file aside, retry, and let the user know what was moved.

### Step 3 — Name and create the branch

Naming convention observed in this repo: `shafik/<topic>/<short-slug>` (e.g. `shafik/wise/articles-on-quote-transfer-flows`).

- If `$ARGUMENTS` was provided, derive `<topic>/<short-slug>` from it (lowercase, hyphenated).
- If not provided, ask the user for a short topic before proceeding — don't guess a name for something this durable.

```bash
git checkout -b shafik/<topic>/<short-slug>
```

### Step 4 — Confirm

Report to the user:
- The new branch name
- That `main` was confirmed up to date before branching
- That all article drafts, images, and commits for this set of articles should happen on this branch
- That `/preview` works the same way on a feature branch (Jekyll doesn't care which branch is checked out)
- That when the articles are approved, the wrap-up is: switch to `main`, fast-forward (or `--no-ff`) merge this branch in, then run `/publish` (or push directly) — same flow as previous article sets

---

## Notes

- Never push the new branch to `origin` automatically — keep it local until the user explicitly asks to back it up or open a PR. The default workflow here merges locally into `main` and pushes only `main`.
- If `main` has diverged from `origin/main` (unlikely for a solo-maintained blog, but possible), stop and tell the user rather than force-pushing or rebasing unprompted.
- This command does not commit anything by itself — it only prepares the branch. Article commits happen as work progresses, same as before.
