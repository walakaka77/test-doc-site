# /preview — Run Jekyll locally with live reload

Starts the Jekyll development server so you can preview the blog at http://localhost:4000 before pushing live.

## Command

```bash
bundle exec jekyll serve --livereload
```

Run this from the repo root: `/Users/shafikwalakaka/Documents/Personal Projects/test-doc-site`

## What it does

- Builds the site and serves it at http://localhost:4000
- Watches for file changes and rebuilds automatically
- Live-reloads the browser on each rebuild (no manual refresh needed)

## Steps

1. Run the command in the terminal from the repo root.
2. Wait for the line: `Server running... press ctrl-c to stop.`
3. Open http://localhost:4000 in your browser.
4. Edit article files — the browser will reload automatically.
5. Press `ctrl-c` to stop the server when done.

## Notes

- If port 4000 is already in use, add `--port 4001` (or any free port).
- If you see a `bundler` error, run `bundle install` first.
- `--livereload` requires a WebSocket connection — if it doesn't auto-reload, a manual refresh still works.
- Changes to `_config.yml` require a server restart (stop with `ctrl-c`, then re-run).
