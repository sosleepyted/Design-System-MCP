# Brand book page tracker

Status values: `dropped`, `in rework`, `updated`, `pasted back`. Pages
handled after the refocus below use the shorter lifecycle `dropped`,
`reconciled`, `pasted back` from docs/brandbook/README.md.

## Refocus 2026-07-06: the repo is canonical

The brand book moved to `brand/` (spec:
docs/superpowers/specs/2026-07-06-brand-home-design.md). The `updated/`
folder dissolved; its deliverables became the canonical pages. Mapping:

| # | Old deliverable | Canonical file |
|---|---|---|
| 01 | updated/01-brand-hub.md | brand/guidelines/brand-hub.md |
| 02-03 | updated/02-03-b2b-presentations.md | brand/guidelines/b2b-presentations.md |
| 04 | updated/04-vibecoding-with-claude.md | brand/guidelines/vibecoding.md |
| 05 | updated/05-vibecoding-environment.md | brand/guidelines/vibecoding-environment.md |

The net-new canonical pages written repo-first (modes, color, typography,
motion, voice-and-copy, layout, components, dos-and-donts, all in
brand/guidelines/) get tracker rows when they are pasted to Confluence for
the first time. Historical log entries below keep their original paths;
they are records, not links.

| # | Page title | Status | Spec sections referenced | Conflicts and decisions |
|---|------------|--------|--------------------------|-------------------------|
| 01 | Welcome to the ucm Brand Hub | updated | DS S1, S2.1, S2.2, S8, S10; UCM S1.1, S1.5, S1.9, S2.7, S3.7 | See "Page 01 conflict log" below |
| 02 | Guidelines für Slide Decks / B2B-Präsentationen | updated (merged into 02-03) | DS S1.8, S2.1, S2.2; UCM S1.1, S1.5, S1.8, S1.9, S2.7 | See "Page 02 conflict log" and "Merge decision 02+03" below |
| 03 | B2B-Präsentationssystem für ucm.agency | updated (merged into 02-03) | UCM S1.9, S2.7 | See "Page 03 conflict log" and "Merge decision 02+03" below |
| 04 | Vibecoding with the UCM Design System | updated (net-new, no incoming page) | HANDOFF (MCP tools, create-app); DS S1, S2.1, S2.2, S8; 02-03 deliverable | See "Page 04 notes" below |
| 05 | Setting up the vibecoding environment | updated (net-new, no incoming page) | HANDOFF (registry, quick commands); repo source: mcp-server http.ts, create-app index.mjs, infra/registry/config.yaml | See "Page 05 notes" below |
| 06 | The logo | pasted back (net-new, no incoming page; pasted 2026-07-07) | DS S2.1, S2.2, S5.1; UCM S1.3, S1.5, S1.8, S2.3; canonical file brand/guidelines/logo.md | See "Logo wordmark decision", "Logo page", and "Logo use cases and the live-site audit" below |

## Page 01 conflict log (Brand Hub)

Resolved by following the repo:

- Palette: the old 22-color list is replaced by the triad plus ramps. Value
  changes: yellow #FABA00 to #FCC224, off-white #F6F6F6 to page #F5F5F3,
  warning red #DE2B2B to danger #A32D2D, apple green #0FBF00 and dark green
  #1E6A4F to success #0F5E2A. #000000 is banned, #FFFFFF is card-surface only.
  Kept: Midnight #001E2B (now the ink), Ice Blue #C2E8FF (decorative
  sub-palette). Retired for digital UI: Pine #124259, Petrol #1C738C, Orange
  #FB9700, Sky Blue #88D4FF, Pink #E1C4FF, Green (Like) #88E3B2, Red (Dislike)
  #F64740, Light Grey #DDDDDD, Neutral #8E8E8E, Dark Grey #535353, UX Text
  #27272D.
- Typography: "Regular, Semi-Bold, Bold" replaced by the built reality,
  Figtree variable 300 to 900 with Light 300 headings as the brand voice, plus
  Nunito 800 as wordmark-only.
- Emoji in headings removed (global emoji ban; Material Symbols Icon instead).
- En dashes used as clause separators replaced per copy mechanics (en dash is
  numeric ranges only).
- Brand name casing: page wrote "ucm", rewrite uses "UCM" per repo convention.
- "It's not a rulebook" framing reversed: the core rules are non-negotiable
  and tool-enforced; the rewrite says so while keeping the toolkit spirit.

Open questions for the user:

- Video Black #1A1A1C looks like a video-production value, out of digital UI
  scope. Decide whether it survives on a separate media-production page.
- The old page says "Brand Guide 2025". Rewrite drops the year; decide whether
  the guide itself gets renamed for 2026 when that page is dropped here.
- Like/Dislike colors (#88E3B2, #F64740) suggest a swipe or rating feature. If
  that feature still exists in the product, it needs tokens from the built
  system (success #0F5E2A, danger #A32D2D or the accent family); confirm.

## Page 02 conflict log (slide deck guidelines)

Resolved by following the repo:

- Language: source page is German; rewrite is English per the workstream
  decision. The German original is preserved verbatim in incoming/.
- "Verwende 1-2 klare Schriftarten" replaced by the actual brand faces:
  Figtree only (Light 300 headings), Nunito confined to the logo asset.
  Instrument Serif was not offered for decks; it is a brand-web decorative
  family and is not loaded anywhere yet (DS S2.2).
- "Klare Kontraste: heller Text auf dunklem Hintergrund oder umgekehrt"
  replaced by the sanctioned pairings: cream #F5F5F3 with ink #001E2B, or
  dark hero #0A0F14 with ink-on-dark #F0F0EB used sparingly. Free choice of
  any light-on-dark combination would break the triad and the pure
  black/white ban.
- En dashes as separators ("Einstieg – Konflikt – Lösung", the pitch
  structure) replaced with commas and colons per copy mechanics.
- Added: no-emoji rule and Material Symbols for slide icons; motion restraint
  wording aligned with the brand motion rules (subtle, ease-out).
- Mode framing added: decks are external surfaces, so brand mode applies.
- Confluence chrome (author line, "1 min", "Listen", reaction count) treated
  as page metadata, not content; kept in incoming/, excluded from the rewrite.

Kept as-is (presentation craft, no conflict): one statement per slide, six
words max, 30 pt minimum, no clipart, storytelling arc, dos and don'ts, the
five-step B2B pitch structure, tone guidance.

Open questions for the user:

- Does the team need a maintained German version of this page as well? The
  rewrite added a rule of thumb (German clients get German decks) that the
  original never stated; confirm or drop.
- Is there an official UCM slide template (Google Slides, PowerPoint, Keynote)
  to link from this page? The old page names rules but links no template. If
  one exists it should be re-linked in Confluence; if not, building one from
  the brand tokens would make these rules structural instead of advisory.

## Page 03 conflict log (B2B presentation system, ucm.agency)

Resolved by following the repo:

- The example claims used en dashes as clause separators ("... für Ihre
  Veranstaltungen – Mit ucm.agency ..."). Kept in German as example data, but
  rewritten with periods per copy mechanics.
- Language: German source, English rewrite. The three example claims stay
  German because real decks for German clients will be German.
- The vague "visually appealing with fitting graphics" line now points to the
  page 02 slide design rules, so the visual guidance lives in one place.
- "Dolce&Gabbana" normalized to "Dolce & Gabbana".
- Domain-style names (ucm.agency) stay lowercase, matching how the repo
  treats ucm.jobs; standalone "ucm" would become "UCM".

No design-token conflicts: this page is sales structure, not visual spec.

Open questions for the user:

- ucm.agency is a brand surface the built system does not formally cover
  (the specs know ucm.jobs brand mode and the internal product mode). The
  rewrite treats agency decks as brand-mode surfaces. Confirm that
  ucm.agency shares the UCM triad and logo, or whether it has its own
  sub-brand rules that belong in the brand book.
- Client references (Messe Berlin, Dolce & Gabbana, Deutsche Bahn): confirm
  these are still current and approved for external use in 2026.
- The medium and large tiers promise "measurable results" and KPI case
  studies. If no maintained case study library exists, that is a content gap
  worth its own Confluence page.

## Merge decision 02+03 (2026-07-06)

User decision: pages 02 and 03 overlap (craft vs content for the same B2B
decks) and are merged into one deliverable,
`updated/02-03-b2b-presentations.md`, so a deck builder opens one page. The
two separate deliverables were removed; both incoming files stay as the
verbatim records.

- Skeleton conflict resolved problem-first: page 02's arc (Problem, Solution,
  Benefit, Proof, Call to action) is the spine for every deck size. Page 03's
  tier structures were remapped onto it; the company introduction moved from
  the opening slot into Proof, matching the "client benefit, not self-praise"
  rule.
- An Assets section was added at the top. Links provided by the user
  (2026-07-06), both Google Drive folders, normalized to canonical URLs
  without the /u/0/ account segment:
  - Photo gallery: drive.google.com/drive/folders/12iQZW7Q7YHNGDWbahoJJYqBd2to2J6pW
  - Branding elements (logos): drive.google.com/drive/folders/1I6p89HNb2kteBE6LIKWr4fAlxixvjdFb
  The same branding elements link replaced the "UCM Logo Kit" Confluence link
  placeholder on page 01 (Brand Hub), so both deliverables point at one
  source.
- Both pages' tone sections merged into one Language and tone section.
- Open item: in Confluence, paste the merged content into one of the two
  existing pages and archive or redirect the other. Recommendation: keep the
  page with more inbound links. The open questions from the page 02 and 03
  logs (German version, deck template, ucm.agency sub-brand, reference
  approvals, case study library) carry over to the merged page.

## Logo wordmark decision (2026-07-06)

User decision: the logo is always "ucm." in lowercase, closed by the accent
dot. Dot color confirmed by the user as #FF9932, the value both specs list
as "logo accent dot" ("yellow accent dot" in the request was shorthand for
it, not the triad yellow #FCC224). The lowercase form is logo-only; running
text keeps the UCM casing convention from the page 01 log.

- Applied to: page 01 (Brand Hub, Logo section) and page 02-03 (Assets,
  branding elements bullet). Both now state the "ucm." plus dot form and
  forbid retyping or rebuilding the logo.
- Follow-up outside this workstream: DESIGN-SYSTEM.md S5.1 describes the
  docs header wordmark as Nunito "UCM" and calls it an acronym. Under this
  decision the rendered wordmark should be "ucm." with the dot, so the docs
  header (BrandDocsLayout.astro) and that spec passage need a matching
  update. The brand book follows the user decision; the spec conflict is
  recorded here, not silently resolved.

## Color pairing rules (2026-07-07)

User decision: the brand book states which color pairings are allowed, on
the principle dark on light or light on dark within the same tone, never
color on color, with accessibility and readability maintained. Added to
brand/guidelines/color.md as "Sanctioned pairings": measured WCAG contrast
tables for text on light and dark surfaces, ink ramp floors, and banned
pairings. dos-and-donts.md links to the tables. All ratios computed from
the token hex values (WCAG relative luminance); tint backgrounds computed
as alpha blends over the page color.

Conflicts found by the math, resolved by sanctioning narrowly and logging
here (token changes are spec and code territory, outside this workstream):

- Inline warning #A96B00 measures 4.02 to 1 on page, below the 4.5 AA bar
  at its built 12px size (UCM S3.8 uses it at 12px). Open question: revisit
  the token or its size; interim guidance in the page prefers #8A5A00
  (5.4 to 1) where strict AA applies.
- Secondary text at 60 percent ink measures 4.47 to 1 on the page, a hair
  under the 4.5 AA bar for normal text (built label style is 12px, UCM
  S3.2); it passes on white cards (4.6). Interim guidance: prefer full ink
  or 80 percent for meaning-bearing small text on the page. See the ramp
  adoption entry below (2026-07-10).
- White button text (navy and danger buttons) is built reality and passes
  (17.2 and 7.1); the pairing tables sanction it as buttons-only so it does
  not soften the "white is card-surface only" rule elsewhere.

## Color pairings page split (2026-07-07)

User request: the pairing rules become their own Confluence page. The
"Sanctioned pairings" section moved verbatim from brand/guidelines/color.md
to the new canonical page brand/guidelines/color-pairings.md, together with
the color-pairings.svg reference; color.md keeps the one-line pairing
principle and points at the page. Pointers updated: dos-and-donts.md, the
brand/README.md reading order, the color-reference.html meta description.
The known gaps (#A96B00 inline warning, 60 percent secondary text) travel
with the tables and stay logged in "Color pairing rules" above. The page
gets its tracker row when it is pasted to Confluence for the first time.

## Ink opacity ramp adopted at four steps (2026-07-10)

User decision: the ink text opacity ramp is 100 / 80 / 60 / 30, replacing
the seven-step 100/85/78/65/55/45/35 that had been canonical. This reverses
the 2026-07-07 note that the four-step ramp was "not adopted"; the user
confirmed the four-step ramp is what they want for the whole project. Role
mapping: body and emphasis collapse to 80, secondary body and labels and
fine print to 60, icon strokes and placeholders and disabled states to 30.

Measured on the page (sRGB alpha-composite, WCAG): 100 is 15.8, 80 is 8.7,
60 is 4.47, 30 is 1.9. The 60 step lands a hair under the 4.5 AA bar for
normal text on the page (passes on white cards at 4.6), which is the known
gap logged above; revisit the token or reserve 60 for larger or card-bound
text if strict AA is required.

Reconciled in the same pass: color.md, color-pairings.md (floors and known
gaps), typography.md (docs prose body 78 to 80), color-diagram.svg,
color-pairings.svg (ramp-floors panel and caption opacities), and
color-reference.html (visible ramp, embedded JSON, known gaps). HANDOFF.md
non-negotiables and cleanup item 4 updated to match.

## Logo page (2026-07-07, net-new)

Authored at the user's request; there is no incoming Confluence page. The
canonical file is brand/guidelines/logo.md. It gathers the standing
decisions in one place: the "ucm." wordmark rule (lowercase, accent dot
#FF9932, never retyped or rebuilt), Nunito Extra-Bold 800 as the
wordmark-only face, the Drive branding elements folder as the single file
source until the brand owner's go, the built in-code wordmark style (22px,
tracking -0.04em, site header only), and logo motion under the global
motion rules (standard ease cubic-bezier(0.16, 1, 0.3, 1), marquee logo
parades brand-only). brand-hub.md and assets/logos/README.md now point at
the page; the Brand Hub keeps its at-a-glance summary.

Open questions for the user:

- Clear space, minimum size, and placement contrast rules exist only in
  the old Brand Guide. The page points there for now; provide the values
  (or the Brand Guide export) and they will be migrated so the repo page
  is self-sufficient.
- Which variants do the delivered files include (dark surface, single
  color, favicon or app icon)? The page currently sanctions whatever the
  branding elements folder delivers; naming the variants explicitly would
  be stronger.
- The docs header conflict from the wordmark decision (it renders "UCM",
  the decision says "ucm." with the dot) remains open; see "Logo wordmark
  decision (2026-07-06)" above.

## Logo use cases and the live-site audit (2026-07-07)

User request: the logo page states which logo goes where. The repo has no
record of the kit's contents (the incoming Brand Hub page only links a
"ucm Logo Kit"), so www.ucm.jobs was audited as the production reality.
The page follows the standing decisions; the divergences found are logged
here, never silently adopted.

Observed on www.ucm.jobs (2026-07-07):

- Header and footer render the wordmark as HTML text: "ucm" plus a dot
  span, Nunito 800 at 18px, letter-spacing 0, letters in #001E2B, the dot
  in the triad yellow #FCC224, on a white pill.
- The favicon set: ucm-logo_pine.png at 32px (light scheme), 48px, and as
  the touch and app icons at 180, 192, and 512px; ucm-logo_white.png at
  32px (dark scheme).
- Both icon files draw "ucm" without the closing dot. The pine file's
  dominant pixel measures #114358, the retired Pine #124259 within
  compression tolerance; the white file is pure white.
- Client logos run as a marquee parade, matching the spec's brand-web
  pattern.

Conflicts (repo rule vs production), decision pending:

- Dot color: the decision of 2026-07-06 says #FF9932; the live dot is
  #FCC224. Either the site moves or the decision is amended; the brand
  book keeps #FF9932 until the user rules.
- Dotless icons: the wordmark rule says never without the dot; both icon
  files are dotless. Possible resolutions: regenerate the icons with the
  dot, or sanction a dotless icon variant explicitly.
- Icon color: Pine is retired for digital UI; the expected value is ink
  #001E2B. The file naming suggests the kit still carries old-palette
  exports.
- Type style: the spec wordmark style is 22px with tracking -0.04em; the
  live header uses 18px with letter-spacing 0.

Open questions for the user:

- For each conflict above: does production get updated, or the rule
  amended? The page states the rules and lists the divergences until then.
- Does the Drive kit contain more variants (lockups, monochrome, social
  avatars)? The use-case table can only be completed from the kit's real
  file list.

Pasted back 2026-07-07 (user confirmation, first paste; row 06 above). The
Confluence URL was not provided; add it to the row when handy. Markdown
paste does not carry the images, so the images live in Confluence only if
added by hand or via the attached PDF companion (brand/assets/
logo-usage.pdf); confirm one of the two happened, or the Confluence copy
shows broken image references.

Update 2026-07-07, images and the PDF companion: at the user's request the
logo page shows each logo next to its use case. The images are production
records in brand/assets/logos/production/ (the two icon files from the
live site's public CDN, a screenshot of the live header pill, and a
preview compositing the white icon onto a hero-dark swatch for
visibility). This does not lift the kit gate: official kit files still
enter the repo only on the brand owner's explicit go, and the records are
labeled as evidence of production state, divergences included. Because
pasted Markdown does not carry images into Confluence, a generated PDF
companion (brand/assets/logo-usage.pdf) mirrors the page for attaching to
Confluence; logo.md stays the canonical source and the PDF is regenerated
from it, never edited directly.

## Page 04 notes (vibecoding guide, net-new)

Authored 2026-07-06 at the user's request; there is no incoming Confluence
page. User decisions: two audiences (developers in Claude Code with the MCP
server, non-technical colleagues in claude.ai), and the presentation track
produces slide content as text, not slide files.

- Grounded in the built system: the seven MCP tools (get_rules, get_pattern,
  search_components, get_component, get_tokens, preflight, review_code), the
  two blessed templates (landing, dashboard), and npx @ucm/create-app.
- Track B output is explicitly a mockup or spec; only Track A output ships.
- Track C encodes the merged B2B guide (problem-first spine, six-word slide
  lines, copy rules) as a fill-in prompt template.

Placeholders the user must fill before pasting into Confluence:

- The MCP server URL and the token request process (deploy is still pending
  per HANDOFF; the runbook is infra/deploy/). Interim added 2026-07-06:
  Track A now includes the local stdio connection for developers with the
  repo cloned, so the track is usable before the deploy.
- The Confluence link to the merged B2B Presentation Guide page.

Update 2026-07-06: create-app now ships /ucm-setup and /ucm-page skills in
every scaffolded app (repo PR #3, stacked on the launch PR #2). Track A was
rewritten from six manual steps to the one-command story: scaffold, run
/ucm-setup, build with /ucm-page.

Open questions:

- Does a shared claude.ai team Project for UCM exist yet? If yes, link it in
  Track B instead of asking each person to create one.
- Slide file generation (pptx or HTML) was deliberately left out; revisit if
  a maintained brand slide template lands.

## Page 05 notes (vibecoding environment, net-new)

Authored 2026-07-06 at the user's request; there is no incoming Confluence
page. The page tells developers to use the design system repo as the
vibecoding environment: the repo runs the MCP server, the private registry,
and `@ucm/ui` locally, and the colleague's app is scaffolded in its own
folder next to the clone (user decision: own app, repo alongside).

Decisions:

- Local HTTP transport (`start:http`, port 8787, endpoint `/mcp`) instead of
  the stdio connect that page 04 used in its interim paragraph. Reason:
  `create-app` writes `.mcp.json` with HTTP plus bearer token, so the
  scaffolded app connects with zero extra steps, and it mirrors production.
- The scaffolder is run from the clone (`node [clone]/packages/create-app/
  index.mjs`) because the `@ucm` scope resolves from no public registry, so
  `npx @ucm/create-app` fails on a fresh machine. The npx form is named as
  the future path once the package is published.
- `npm adduser --registry http://localhost:4873` added before the publish
  step: the registry config allows open reads but requires an authenticated
  user for publishing (infra/registry/config.yaml, max_users 1000).
- Page 04 edit (2026-07-06): its Track A interim paragraph ("Until the
  hosted server is live: clone ... claude mcp add ucm ...") replaced with a
  pointer to this page. The non-scaffolded-repo HTTP connect command in
  Track A stays.
- Scope statement added at the user's request (2026-07-06): the environment
  is UI only; backend services, databases, and APIs are out of scope. This
  matches the built system (@ucm/be-structure is a reserved placeholder, not
  built).
- Restructure at the user's request (2026-07-06): cloning the repo is the
  only one-time step. Registry, publish, server, and scaffold moved under a
  "Starting a project" section that begins with git pull, pnpm install, and
  pnpm catalog:build, so every project starts from the current design
  system. Added: adduser is first-time only, and a note that re-publishing
  an unchanged @ucm/ui version stops with a harmless conflict error.

Dependency: the page says create-app wires the `/ucm-setup` and `/ucm-page`
commands. Those skills ship with repo PR #3 (stacked on launch PR #2) and are
not on this branch yet; page 04 makes the same assumption. If PR #3 does not
merge before the page is pasted back, soften both pages.

Placeholders the user must fill before pasting into Confluence:

- The Confluence link to Vibecoding with the UCM Design System (page 04),
  referenced twice (intro and Next step).
- After the hosted deploy: replace `http://localhost:8787/mcp` and the
  self-chosen token with the real server URL and the token request process.
  The rest of the page is deploy-independent by design.

## How to read this table

- One row per Confluence page, in intake order. The number matches the file
  prefix in `incoming/`; the canonical file is in the refocus mapping above.
- "Spec sections referenced" lists the sections of `DESIGN-SYSTEM.md` or
  `UCM-DESIGN SYSTEM.md` the rewrite leaned on, for example "DS S2.1, S8".
- "Conflicts and decisions" records every place the old Confluence content
  disagreed with the built system, and how it was resolved. The repo wins by
  default; anything else is a decision worth a note here.
