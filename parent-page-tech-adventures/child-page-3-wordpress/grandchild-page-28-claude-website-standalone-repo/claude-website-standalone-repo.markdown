---
layout: page
title: Making the Repo Standalone -- Keychain Credentials, One Deploy Script and a Second Mac
permalink: /tech-adventures/wordpress/claude-website-standalone-repo
parent: Wordpress
grand_parent: Tech Adventures
nav_order: 28
index: 'yes'
follow: 'yes'
description: How the petcoach.sg website repo stopped depending on another project -- site code moved in with its git history, credentials only in the macOS Keychain, a deploy script that re-downloads every file it uploads, a drift check, proof from a fresh clone, and a second Mac set up by Claude.
image: ../../parent-page-tech-adventures/child-page-3-wordpress/grandchild-page-22-claude-website-initiative-overview/release-flow-overview.png
---

# Making the Repo Standalone -- Keychain Credentials, One Deploy Script and a Second Mac
{: .no_toc }

<details closed markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

Part 7, the last in the series (start at the [overview](/tech-adventures/wordpress/claude-website-initiative-overview)). Everything worked on my Mac. The real test of a process is the *second* machine: could Qiai clone the repo and get exactly the same capability? When I checked, the honest answer was no, and this post is how that got fixed.

## The problem: it only worked because of where my folders were

When I asked "if Qiai pulls the repo and follows the setup guide, will it all work?", Claude found three gaps:

1. **Her local site setup would fail.** The child theme and two mu-plugins still lived only in my SEO repo. The local setup script copied them from a folder that happened to sit *next to* the website repo on my Mac. Her Mac wouldn't have it.
2. **She couldn't deploy to live.** Live deploys used an upload tool in the SEO repo, which read the FTP password from a credentials file in *that* repo. The setup guide had her store passwords in her Keychain, but nothing read them from there.
3. **Missing prerequisites**: Homebrew, the Xcode command-line tools, a GitHub login, and the WordPress connection added at user level (some scripts look for it there).

My direction was short: **the website repo must be standalone**. Everything about the site lives there; the SEO repo keeps blog content and its own blog tools, nothing else.

## Moving code across repos without losing its history

The theme, the two plugins and the redirects each have months of history I wanted to keep. `git subtree split` extracts one folder's history into a branch, which the other repo can then merge in:

```bash
# in the SEO repo: one history branch per folder
git subtree split --prefix=wp-code/themes/astra-child HEAD -b split/astra-child
git subtree split --prefix=wp-code/mu-plugins         HEAD -b split/mu-plugins
git subtree split --prefix=docs/redirects             HEAD -b split/redirects

# in the website repo: add them where they belong
git subtree add --prefix=wp-content/themes/astra-child ../seo-pipeline split/astra-child
git subtree add --prefix=redirects                     ../seo-pipeline split/redirects
```

The mu-plugins needed a small trick, because `wp-content/mu-plugins/` already existed: merge the history with `-s ours`, read the tree into a temporary folder, then `git mv` the two files into place in the same commit. The plugins' six commits stay reachable through that merge.

## Finding: the "source of truth" copy of an image was garbage

The first thing I did after moving the code was compare every deployable file against both sites, byte for byte. Two files differed on **both** sites:

- **`pc-lead-tracking.php`**: three comment lines (a folder path in a note) had been edited in the repo and never deployed. The code itself was identical.
- **`astra-child/screenshot.jpg`**: the repo's copy was 671 KB of garbage. The live file was a valid 366 KB JPEG.

The image is the interesting one. Its first bytes in the repo:

```
00000000: efbf bdef bfbd efbf bdef bfbd 0010 4a46  ..............JF
```

`ef bf bd` is the UTF-8 encoding of the Unicode "replacement character". The old upload tool's **pull** command read files as UTF-8 text, so every byte that wasn't valid text became `ef bf bd`. Any binary file it ever pulled into the repo was silently corrupted. (Its *push* was fine, which is why the live sites were never affected.)

{: .important }
Live is the source of truth, so both live versions went into the repo, and a `.gitattributes` now marks images and fonts as binary so git never touches them either. The broader lesson: a "tracked copy" is only as good as the tool that captured it. Verify against the real thing.

## One deploy script, credentials only in the Keychain

The new `scripts/deploy.mjs` replaces both my hand-rolled staging uploads and the SEO repo's tool:

```bash
node scripts/deploy.mjs --env uat  --tag uat-2026-11-25-2            # dry run
node scripts/deploy.mjs --env uat  --tag uat-2026-11-25-2 --confirm  # do it
node scripts/deploy.mjs --env prod --check                           # drift check
```

What it does, in order:

1. **Reads the site's `pc-release.json`** to learn which commit is there now, and deploys exactly the difference between that commit and the tag.
2. **Takes file contents from the tagged commit** (`git show <tag>:<path>`), never from whatever happens to be on disk.
3. **Dry run by default**: each file listed as NEW / CHANGED / identical, text diffs shown, PHP syntax-checked.
4. With `--confirm`: **backs up** every file it will overwrite, uploads, then **re-downloads every file and compares checksums**, retrying up to three times and stopping before anything else if one still doesn't match. That's the answer to the silent upload failure during the [blog release](/tech-adventures/wordpress/claude-website-elementor-removal-case-study#shipping-the-batch).
5. Runs the **release steps** of every release in the batch, from a small per-release file: switch files to create or remove, migrations (dry run first, then for real).
6. Purges the cache, writes the new `pc-release.json`, and smoke-tests the home page, `/blog/` and `/about/`.

Credentials come only from the macOS Keychain, by entry name. The password goes into a temporary `curl` config file (readable only by the user) and never appears on a command line, where other processes could see it.

`--check` compares *every* deployable file with a site, so it doubles as a drift check. After the move, both sites reported:

```
uat: all 19 deployable files identical to HEAD (946daec).
prod: all 19 deployable files identical to HEAD (946daec).
```

The redirects got the same treatment: `scripts/redirects.mjs` splices only the custom-redirects block of `.htaccess` (leaving WordPress's and LiteSpeed's blocks byte for byte), and a checker tests every rule against a site (live: 48 pass, 2 pass via a second hop).

## Proving it from a fresh clone

"It works on my Mac" proves nothing, because my Mac has the other repo sitting right there. So the proof was run from a **fresh clone in a temporary folder, with no SEO repo anywhere near it**:

```
clone at 2f25c11
seo-pipeline next to clone: none
== deploy --check uat     → uat: all 19 deployable files identical to HEAD (2f25c11).
== deploy --check prod    → prod: all 19 deployable files identical to HEAD (2f25c11).
== deploy dry run uat     → Files (0) … Steps (0): none
== redirects              → prod: the live custom-redirects block already matches staged.
== local refresh          → live database copied with Keychain credentials, http://local.petcoach.sg → HTTP 200
== local verify           → 0 FAIL, 1 WARN, 13 OK
```

(The one WARN is YouTube's own cancelled request on the daycare post, present before too.)

## The second Mac: Claude installs what's missing

The setup guide now starts with a prerequisites table that **Claude works through, not the person**:

| Check | If missing | The person does |
|---|---|---|
| `xcode-select -p` | `xcode-select --install` | click Install |
| `brew --version` | Homebrew's official installer | type their Mac password once |
| `node --version` | `brew install node` | nothing |
| `gh auth status` | `brew install gh`, `gh auth login --web` | log in to GitHub in the browser |
| WordPress connection listed | add it **at user scope** | paste the application password when asked |

After that: clone, link the router skill, store the logins in her Keychain one at a time (typed into chat, stored by Claude, recorded in the repo by *name only*), build her own copy of the site, verify, and a test request.

Two small things I learned on the GitHub side:

- On a **personal** account's private repo, collaborators simply get *write* access (push branches, merge, tag). The Read/Triage/Maintain/Admin roles only exist for organisation-owned repos. Write is all this flow needs.
- **Branch protection isn't available** on a free private personal repo, so nothing on GitHub stops a push to `main`. In this setup, the protection is the release rules and the skills, plus GitHub's normal refusal to accept a push that would overwrite someone else's commits.

## Conclusion

Standalone turned out to mean three concrete things: all the site's code in one place (with its history), credentials only in each Mac's Keychain, and one deploy script that trusts nothing until it has read the file back. The fresh-clone proof is the part I'd insist on for anyone doing this, because it's the only test that can't be fooled by your own machine. With that, the second Mac really is "clone the repo and let Claude set it up".

That's the series. In reading order: [the overview](/tech-adventures/wordpress/claude-website-initiative-overview), [one repo, three sites](/tech-adventures/wordpress/claude-website-local-staging-live), [the release tests](/tech-adventures/wordpress/claude-website-release-tests), [skills for business users](/tech-adventures/wordpress/claude-website-skills-for-business-users), [two people, one website](/tech-adventures/wordpress/claude-website-two-people-one-site), [the Elementor case study](/tech-adventures/wordpress/claude-website-elementor-removal-case-study), and this one.

Until next time, peace and love!
