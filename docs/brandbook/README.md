# Brand book Confluence sync

The canonical UCM brand book lives in this repo, under `brand/` (start at
`brand/README.md`). Confluence carries pasted copies for colleagues who work
there. This folder is the sync layer between the two, and the record of what
Confluence said before the repo became canonical.

## Folders

- `incoming/` holds Confluence pages dropped into chat, verbatim, one file
  per page, with frontmatter. Never edit the body of an incoming file; it is
  the record of what Confluence said. See `incoming/_TEMPLATE.md` for the
  shape.
- `TRACKER.md` is the page-by-page status table, the log of conflicts and
  decisions, and the mapping from page numbers to canonical files.

There is no `updated/` folder anymore. The deliverables it used to hold are
the canonical pages in `brand/guidelines/`.

## Lifecycle per page

`dropped -> reconciled -> pasted back`

1. Someone pastes a Confluence page into chat (title plus body, URL if
   handy). It is filed verbatim into `incoming/NN-<slug>.md` and gets a
   tracker row with status `dropped`.
2. The page is reconciled against the canonical files in `brand/guidelines/`
   and the technical specs. Whatever is worth keeping is merged into the
   canonical page; every conflict is resolved in favor of the repo and
   logged in the tracker. Status moves to `reconciled`.
3. The refreshed canonical page is pasted back into Confluence, replacing
   the old content. Status moves to `pasted back`.

Net-new canonical pages (written repo-first, no incoming Confluence page)
get a tracker row when they are pasted to Confluence for the first time.

## Rules

- The repo wins. Confluence content never overrides `brand/` or the specs
  (`DESIGN-SYSTEM.md`, `UCM-DESIGN SYSTEM.md`, the rules manifest);
  conflicts are logged in `TRACKER.md`, never silently resolved.
- Copy and formatting rules for all brand book files live in
  `brand/README.md` (no em dashes, no emoji, no eyebrows,
  Confluence-paste-friendly Markdown, exact values only).
- Incoming files keep banned characters verbatim (they are records); only
  canonical and pasted-back content is held to the copy rules.
