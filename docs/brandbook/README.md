# Brand book update: Confluence page intake

This folder is the working area for updating the UCM brand book. The brand book
lives in Confluence and is out of date relative to the design system built in
this repo. Pages are dropped here one at a time, rewritten in English to match
the built system, and the result is pasted back into Confluence.

The repo specs are the source of truth. Confluence content never overrides them.

## Folders

- `incoming/` holds each dropped page verbatim, one file per page, with
  frontmatter. Never edit the body of an incoming file; it is the record of
  what Confluence said. See `incoming/_TEMPLATE.md` for the shape.
- `updated/` holds the rewritten pages, one file per page, mirroring the
  incoming file names. These are the deliverables to paste back into Confluence.
- `TRACKER.md` is the page-by-page status table and the log of conflicts and
  decisions.

## Lifecycle per page

`dropped -> in rework -> updated -> pasted back`

1. The user pastes a Confluence page into chat (title plus body, URL if handy).
2. Claude files the raw text verbatim into `incoming/NN-<slug>.md` with
   frontmatter (title, Confluence URL if given, date dropped). NN is the next
   free two-digit number.
3. Claude adds a row to `TRACKER.md` with status `dropped`.
4. Claude compares the page content against the source-of-truth documents
   listed below and rewrites it into `updated/NN-<slug>.md`. Status moves to
   `in rework`, then `updated` when the rewrite is done.
5. Anywhere the old Confluence content contradicts the built system (a stale
   hex value, a retired component, an old rule), the rewrite follows the repo
   and the conflict is logged in the tracker row. Conflicts are never silently
   resolved.
6. The user pastes the updated page back into Confluence and says so; status
   moves to `pasted back`.

## Source of truth for rewrites (read, never modified by this workstream)

- `DESIGN-SYSTEM.md` at the repo root: the built-state reference. Tokens are
  Section 2, modes at a glance Section 8, bans Section 10, component inventory
  Section 13.
- `UCM-DESIGN SYSTEM.md` at the repo root: the intent spec. Philosophy, brand
  vs product mode, voice, copy mechanics.
- Root `CLAUDE.md`: the standing global rules.

## Rewrite rules

- Output language is English.
- Global copy rules apply to every file in this folder, incoming and updated:
  no em dashes (use commas; ranges use "to" or a hyphen), no emoji, no eyebrows
  (no uppercase letter-spaced kickers). Uppercase only for acronyms like UCM
  and for data.
- Every concrete value must match `DESIGN-SYSTEM.md` exactly: hex colors, px
  sizes, radii, font names and weights, component names, token names. When in
  doubt, quote the spec, do not paraphrase from memory.
- Keep the Markdown Confluence-paste-friendly: plain headings, bullets, simple
  tables. No raw HTML, no nested tables, no footnotes.
- One incoming page produces one updated page. Do not merge or split pages
  without logging the decision in the tracker.

## Exception to the verbatim rule

If a pasted page contains an em dash or emoji, the incoming file keeps them
(it is a verbatim record) and the file gets a `ucm-lint-ignore` note only if
the repo lint ever flags it. The updated file never contains them.
