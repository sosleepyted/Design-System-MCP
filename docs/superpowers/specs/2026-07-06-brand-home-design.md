# Brand-first repo refocus (MCP parked)

Date: 2026-07-06. Status: approved in session, pending user review of this
spec. Branch: docs/brand-home.

## Context and decision

The repo so far presented itself as an MCP service project. The user decision
is to park that direction for now and make the repo the canonical home of
everything branding related: identity, rules, guidelines, and assets. The MCP
service code stays in the tree untouched and green; the parking is editorial
(what the docs lead with), never mechanical (no .gitignore tricks, no
deletions, no package changes).

Decisions taken with the user:

- The repo is the canonical brand book. Confluence receives pasted copies
  through the existing brandbook workflow, now inverted (repo to Confluence).
- Logo files move into the repo. The photo gallery stays on Google Drive and
  is linked.
- The external skills catalog (docs/references.md) becomes part of the
  environment setup instructions, so colleagues install the same skill set.
- UCM-DESIGN SYSTEM.md Section 7 (external site content and IA) is explicitly
  deferred: site information architecture, not brand rules.

## Goals

1. One obvious front door for branding: a top-level brand/ tree.
2. Every rule in the system has a named, human-readable home in
   brand/guidelines/, with the technical specs staying the source of truth.
3. The repo README, CLAUDE.md, and HANDOFF.md read brand-first; the MCP
   service is one short "parked" section.

## Non-goals

- No changes under packages/ or infra/. All code, tests, and CI behavior stay
  as they are.
- No deletion or hiding of the MCP server, catalog, create-app, claude-plugin,
  or registry material.
- No new rendering layer (the Astro option was considered and rejected for
  now; the content structure keeps it possible later).

## Target structure

```
brand/
  README.md                    brand book index and entry point
  guidelines/
    brand-hub.md               moved from docs/brandbook/updated/01-brand-hub.md
    modes.md                   new
    color.md                   new
    typography.md              new
    motion.md                  new
    voice-and-copy.md          new
    layout.md                  new
    components.md              new
    dos-and-donts.md           new
    b2b-presentations.md       moved from 02-03-b2b-presentations.md
    vibecoding.md              moved from 04-vibecoding-with-claude.md
    vibecoding-environment.md  moved from 05-vibecoding-environment.md
  assets/
    logos/                     the "ucm." wordmark files (from the user), plus
                               a README with usage rules and the Drive links
    color-diagram.svg          committed swatch diagram, drawn to brand rules
```

Moves use git mv so history survives. The NN- intake prefixes drop off.

## Guideline page map (content sources)

Every value is quoted exactly from the named source. DS = DESIGN-SYSTEM.md,
UCM = UCM-DESIGN SYSTEM.md.

| Page | Covers | Sources |
|---|---|---|
| brand-hub.md | identity, philosophy, logo rule ("ucm." lowercase, dot #FF9932, never retyped; UCM in prose), essentials | existing page 01; UCM S1.1 |
| modes.md | brand vs product, when each applies, expressive license vs restraint, product-only bans, never mixed | UCM S2.1, S2.2, S3.1; DS S8 |
| color.md | triad, ink-opacity ramps, yellow under about 10 percent, sanctioned pairings, semantic colors, sub-palette, logo dot #FF9932, black and white ban, old-palette migration table | DS S2.1; UCM S1.6; page 01 conflict log |
| typography.md | Figtree variable 300 to 900, Light 300 headings with tight tracking, brand and product type scales, 1.25x hierarchy, Nunito wordmark-only, latin-ext | DS S2.2, S1.7; UCM S1.5, S2.3, S3.2 |
| motion.md | transform, opacity, clip-path only; the three sanctioned easings; no transition-all; no layout animation; off under prefers-reduced-motion | DS S1.6; UCM S1.8 |
| voice-and-copy.md | em dash, eyebrow, widow (3 words mobile, 5 desktop), emoji rules; bilingual { de, en }, German first; brand vs product voice; UCM in prose vs "ucm." logo; German register via the ucm-german-ux-copy skill | DS S1.1 to 1.3, S1.5, S1.8; UCM S1.7, S1.9, S2.7, S3.7 |
| layout.md | spacing, radius, shadow per mode; brand layout license; forms; state styles; responsive at 320, 375, 768, 1024, 1440; touch targets at least 36px | UCM S2.4, S2.8, S3.3 to 3.6, S3.8, S4 |
| components.md | the 16 components by mode and when to reach for which; CTA rules (primary yellow, GlowButton radial as the one gradient, glow never in product); cards and navigation; templates and pages as blessed starting points; icon doctrine (Material Symbols Outlined, currentColor, plain word fallback, no icon dependencies) | DS S3, S5, S6, S13; UCM S2.5, S2.6, S3.5, S3.9 |
| dos-and-donts.md | consolidated quick-reference bans, one to one with the 12 rule IDs in packages/rules/src/manifest.ts, plus product-only bans and the external-library guardrails | DS S10; UCM S5; rules manifest; docs/references.md |
| b2b-presentations.md | unchanged content | existing page 02-03 |
| vibecoding.md | unchanged content plus external-library guardrails (motion, three.js, 21st.dev: docs and brand surfaces only, dynamic import, rework to UCM rules, pass review_code) | existing page 04; docs/references.md |
| vibecoding-environment.md | unchanged content plus a skills install step | existing page 05; docs/references.md |

dos-and-donts.md cross-references the rule IDs so the brand book and the lint
cannot drift silently.

## Assets

- brand/assets/logos/: the user supplies the wordmark files from the branding
  elements Drive folder. Until they land, the folder ships only its README
  (usage rules, Drive links). The README states the logo rule and forbids
  retyping or rebuilding the logo.
- brand/assets/color-diagram.svg: swatch grid of triad, ramps, semantic
  colors, and sub-palette with hex labels. Drawn to the brand rules (Figtree,
  no banned patterns). color.md embeds it and repeats the values as a plain
  table so the Confluence paste works without the image.

## Workflow inversion (Confluence sync)

- docs/brandbook/incoming/ stays the verbatim record of dropped Confluence
  pages. Never edited.
- docs/brandbook/updated/ disappears; its files are the ones moved to
  brand/guidelines/.
- docs/brandbook/TRACKER.md stays the status log and now maps each page
  number to its canonical file in brand/guidelines/. New net-new pages get
  tracker rows, as pages 04 and 05 did.
- Editing happens in brand/. Paste-back copies from brand/guidelines/ to
  Confluence. The Confluence-paste-friendly copy rules (plain headings,
  bullets, simple tables, no raw HTML) move into brand/README.md because they
  now govern the canonical files.
- docs/brandbook/README.md is rewritten to describe the inverted flow.

## Repositioning edits

- Root README.md: leads with "the home of the UCM brand: identity, rules,
  guidelines, assets, and the design system that enforces them". Points at
  brand/ first, then the rules (packages/rules, DESIGN-SYSTEM.md), then the
  components (@ucm/ui, apps/docs). One short "Design system service (parked)"
  section covers mcp-server, catalog, create-app, claude-plugin, and infra,
  and points at HANDOFF.md for the launch runbook.
- CLAUDE.md: the "What we are building" framing updates to brand-home first
  so future sessions read the new priority. Global rules unchanged.
- HANDOFF.md: pivot recorded with date; the launch checklist marked parked;
  the brandbook workstream promoted to the primary track.

## Skills and tooling instructions

- brand/README.md gets a "Tooling and skills" section: install instructions
  for the external skill packs cataloged in docs/references.md (taste-skill,
  karpathy-guidelines, ui-ux-pro-max, the 20-skill ecc design subset, the
  21st.dev plugin), with the standing guardrail that skills inform building
  and nothing from them ships into @ucm/ui.
- vibecoding-environment.md gets a matching install step.
- docs/references.md stays the catalog of record; the brand pages instruct
  and link, they do not duplicate the catalog.

## Sequencing and dependencies

1. Land PR #6 (plugin, logo rule) and the CI fix first. The CI fix commit
   (build @ucm/ui before typecheck) is on docs/brandbook-update and its push
   is blocked until the user grants the gh token the workflow scope, or edits
   ci.yml through the GitHub web UI.
2. This branch (docs/brand-home) then rebases on main so the moves start from
   the logo-rule state of the pages.
3. Implementation order: moves first, then new pages, then repositioning
   edits, then tracker and brandbook README updates.
4. Logo files are a user dependency; everything else proceeds without them.

## Acceptance checks

- pnpm lint:rules reports 0 errors, 0 warnings.
- Grep for em dashes, emoji, and eyebrow patterns over brand/ returns zero
  (quoting exceptions per the brandbook rules stay confined to the tracker).
- Every guideline page states its spec sources; spot-check hex, px, and font
  values against DS and UCM.
- All internal links resolve after the moves (README, tracker, cross-page).
- git log --follow works on every moved file.
- No diffs under packages/ or infra/.

## Out of scope

- UCM S7 content and IA reference (deferred, see decisions).
- Rendering the brand book in apps/docs (possible later).
- Any change to the MCP server, tools, registry, or deploy material.
- Slide template files, case study library (open questions in the tracker).
