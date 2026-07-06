# Brand book page tracker

Status values: `dropped`, `in rework`, `updated`, `pasted back`.

| # | Page title | Status | Spec sections referenced | Conflicts and decisions |
|---|------------|--------|--------------------------|-------------------------|
| 01 | Welcome to the ucm Brand Hub | updated | DS S1, S2.1, S2.2, S8, S10; UCM S1.1, S1.5, S1.9, S2.7, S3.7 | See "Page 01 conflict log" below |
| 02 | Guidelines für Slide Decks / B2B-Präsentationen | updated (merged into 02-03) | DS S1.8, S2.1, S2.2; UCM S1.1, S1.5, S1.8, S1.9, S2.7 | See "Page 02 conflict log" and "Merge decision 02+03" below |
| 03 | B2B-Präsentationssystem für ucm.agency | updated (merged into 02-03) | UCM S1.9, S2.7 | See "Page 03 conflict log" and "Merge decision 02+03" below |
| 04 | Vibecoding with the UCM Design System | updated (net-new, no incoming page) | HANDOFF (MCP tools, create-app); DS S1, S2.1, S2.2, S8; 02-03 deliverable | See "Page 04 notes" below |

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

Open questions:

- Does a shared claude.ai team Project for UCM exist yet? If yes, link it in
  Track B instead of asking each person to create one.
- Slide file generation (pptx or HTML) was deliberately left out; revisit if
  a maintained brand slide template lands.

## How to read this table

- One row per Confluence page, in intake order. The number matches the file
  prefix in `incoming/` and `updated/`.
- "Spec sections referenced" lists the sections of `DESIGN-SYSTEM.md` or
  `UCM-DESIGN SYSTEM.md` the rewrite leaned on, for example "DS S2.1, S8".
- "Conflicts and decisions" records every place the old Confluence content
  disagreed with the built system, and how it was resolved. The repo wins by
  default; anything else is a decision worth a note here.
