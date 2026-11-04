# Gotchas & Insights Log

A running, append-only record of things that went wrong (or almost did) and what was learned. Newest entries at the top.

**When to add an entry:** any time something breaks in a way that wasn't obvious in advance, a fix takes real investigation, or a wrong assumption costs a round-trip. Not for routine bugs with obvious causes. Follow the template below.

## Template

```
## YYYY-MM-DD — short, specific title

**What happened:** the observable symptom.
**Root cause:** what was actually going on underneath.
**Fix:** what resolved it.
**How to avoid next time:** the generalizable lesson.
```

---

## 2026-11-04 — Pages deploy fails at "Setup Ruby" after GitHub moved `ubuntu-latest` to Ubuntu 26.04

**What happened:** pushed the glucose page to `main`; the push succeeded but the page stayed 404. The "Deploy Jekyll site to Pages" run had failed in 23s at the Setup Ruby step with "The current runner (ubuntu-26.04-x64) was detected as self-hosted". The previous successful deploy was 2026-10-22, so the break was silent until the next publish.
**Root cause:** `.github/workflows/jekyll.yml` pins `ruby/setup-ruby` to v1.195.0 (2024) by commit SHA. That version has no prebuilt Ruby for `ubuntu-26.04`, which `ubuntu-latest` started pointing to in late October 2026, so it treats the runner as self-hosted and gives up.
**Fix:** pinned the build job to `runs-on: ubuntu-24.04` (commit "Pin Pages build runner to ubuntu-24.04"). Redeploy succeeded in 1m32s.
**How to avoid next time:** a successful `git push` is not a successful publish. Always confirm the Actions run for the pushed commit concluded `success` and the live URL returns 200, which `/publish` Step 7 already does; don't push directly and skip it. Pinning an action by SHA freezes the runner images it knows about, so `ubuntu-latest` will eventually outrun it. When GitHub announces `ubuntu-24.04` retirement, bump `setup-ruby` to a current release and go back to `ubuntu-latest`. Also: right after a deploy the CDN may serve a cached 404 for up to ~10 min to anyone (including a poll) who requested the URL before it existed. Check with `?x=1` before assuming the file is missing.
