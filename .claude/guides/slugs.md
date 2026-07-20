# Slug & Naming Conventions

How folder names, filenames, and permalinks get chosen for new articles. This formalizes what's already implicit in `CLAUDE.md`'s folder structure section, with the actual decision process spelled out.

## Folder naming

```
child-page-{N}-{kebab-slug}/                                    (child page)
grandchild-page-{N}-{kebab-slug}/                                (grandchild page)
```

- `{N}` is a sequential integer scoped to that folder level -- check existing siblings with `ls -d grandchild-page-*` (or `child-page-*`) and take the highest + 1. Never guess; never reuse a number.
- `{kebab-slug}` is a short, descriptive, all-lowercase, hyphenated phrase. It does not need to match the final article title exactly, but should be recognizable from it.
- Case precedent is mixed in this repo (`grandchild-page-1-Adyen-Online-Payments` has capitals, `grandchild-page-14-adyen-pos-terminal-api-architecture` doesn't) -- **default to fully lowercase-hyphenated for all new folders**, matching the more recent and more common pattern. Don't "fix" old folder names to match; that would break existing permalinks and image paths.

## Markdown filename

The article file inside the folder should be named `{same-kebab-slug-as-the-folder}.markdown` (matching the folder's slug, not necessarily identical to the folder name if the folder has an `N-` prefix stripped). Example: folder `grandchild-page-14-adyen-pos-terminal-api-architecture/` → file `adyen-pos-terminal-api-architecture.markdown`.

`.markdown` vs `.md`: both extensions exist in this repo (older articles favor `.markdown`, some newer ones use `.md`). Either works with Jekyll. When adding to an existing child page folder, match whatever extension its existing siblings use, for consistency within that section.

## Permalink

```
permalink: /{parent-path}/{child-path}/{grandchild-slug}
```

- `{parent-path}` is fixed per top-level section (see `placement.md`): `tech-adventures`, `canine-chronicles`, `new-home-kallang`.
- `{child-path}` matches the child page's own `permalink` (e.g. `third-party-integrations`, `jekyll-blog`).
- `{grandchild-slug}` is the same kebab-slug used for the folder/file, **without** the numeric `grandchild-page-N-` prefix.

This means the permalink is stable even if the folder later gets renumbered or reorganized -- the slug is the durable identifier, not the folder's position.

## Choosing the slug itself

1. Start from the article's working title, strip filler words (articles, "a guide to", "how to").
2. Prefer the phrase a reader would actually search for or expect in a URL -- `adyen-pos-approved-payment-flow`, not `payment-1` or `test-scenario-approved`.
3. If the article is part of a named series, keep a consistent prefix across the series (`adyen-pos-*` for the whole Terminal API series, `sandbox-vs-docs-*` style continuity for the Wise reconciliation piece) -- this makes the series visually obvious in a flat directory listing and in the URL itself, before even opening the file.
4. Keep it to 3-6 words. If it's running longer, the title itself is probably trying to do too much.

## Image filenames within an article folder

- Use a numeric prefix matching the order screenshots appear in the article body (`01-`, `02-`, ...), then a short descriptive slug: `01-mock-terminal-cleared-idle.png`.
- Rename source screenshots on copy -- don't keep the original capture filenames (`Screenshot 2025-07-27 at 9.46.56 PM.png`, `IMG_4021.png`) verbatim; they carry no information about what the image shows and make the folder listing meaningless.
- Exception: if an existing article folder already has a large batch of numbered-but-undescriptive images (`image.png`, `image-1.png`, ...) from before this convention was established, don't mass-rename them retroactively just to fix the pattern -- that risks breaking existing references for no reader-facing benefit. Apply the convention going forward.
