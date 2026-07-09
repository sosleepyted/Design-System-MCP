# Project handoff (context for a new chat)

## Session state 2026-07-07 (READ THIS FIRST, action required)

macOS revoked this app's Downloads file grant mid-session. Consequence:
pre-existing repo files could not be read, overwritten, or deleted; new
files could be created; directory listing and git were blocked entirely.
Fix before doing anything else: restart Claude Code (macOS re-prompts) or
re-grant Downloads in System Settings, Privacy and Security, Files and
Folders. Verify with `ls brand/assets/` and `git status`.

Because of this, the session finished its work in the scratchpad and only
part of it landed in the working tree:

- IN the working tree (new files, current): `brand/assets/color-reference.html`
  (the finished webpage) plus turn-1 leftovers that are SUPERSEDED:
  an old chip-grid `brand/assets/color-pairings.svg` and a one-line embed
  edit in `brand/guidelines/color.md`.
- PENDING (finished): the overhauled `color.md`, the Nord-style
  `color-pairings.svg`, and this refreshed `HANDOFF.md`. They must replace
  the repo versions. Durable copies sit INSIDE the repo at
  `.handoff-pending/` (new files were still creatable); the user also has
  them as chat attachments.

Land-and-merge script (user's own terminal, or a restored session):

```bash
cd "/Users/thanayoot/Downloads/GitHub/Design System MCP"
cp .handoff-pending/color.md brand/guidelines/color.md
cp .handoff-pending/color-pairings.svg brand/assets/color-pairings.svg
cp .handoff-pending/HANDOFF.md HANDOFF.md
rm -rf .handoff-pending .playwright-mcp   # staging + verification debris, never commit
pnpm lint:rules
git add brand/guidelines/color.md brand/assets/color-pairings.svg \
  brand/assets/color-reference.html HANDOFF.md
git commit -m "docs(brand): canonical color reference with token ids, measured pairings, 100/80/60/30 ramp, and logo usage"
git push
gh pr merge 9 --merge
```

## Done 2026-07-07 (the color reference session)

- `brand/guidelines/color.md` overhauled into the canonical color
  reference: stable kebab-case token ids, one concrete pair per row with
  measured WCAG contrast, and a machine-readable JSON block that mirrors
  the page one to one (update both in the same commit, always).
- User decision: the ink text opacity ramp is now 100 / 80 / 60 / 30
  (was 100/85/78/65/55/45/35). Measured on page: 15.8 / 8.7 / 4.47 / 1.9.
  NEW known gap: ink-60 is 4.47 on the page, just under the 4.5 bar,
  passes on white cards (4.6); prefer ink-80 for essential small text on
  the page. NOT yet swept: `packages/ui` tokens, `DESIGN-SYSTEM.md`, and
  other guideline pages still carry the old ramp; sweep and log the
  conflict in `docs/brandbook/TRACKER.md` once file access is back.
- Correction found by measurement: warning #8A5A00 on the yellow tint is
  4.9, not the 5.0 the page previously claimed (tint composites to about
  #F7EAC5 over the page).
- `brand/assets/color-pairings.svg` rebuilt in the Nord token-row style
  (swatch, name, description, prominent measured ratio), replacing the
  first chip-grid version.
- NEW `brand/assets/color-reference.html`: self-contained webpage (Tailwind
  CDN, Figtree + Nunito from Google Fonts, no build step) with every token,
  ramp, rule, and pairing as Nord-style rows; anchor nav pills with a
  scroll-spy (aria-current, navy pill active state); click-to-copy hex
  buttons; the same JSON in the DOM as `script#ucm-color-data`; responsive
  and verified at 320 / 375 (zero horizontal overflow; the JSON pre scrolls
  internally). If it ever moves into apps/docs, the markup ports to Astro
  plus Tailwind v4 directly.
- Logo usage section added to both the color page and the webpage. Rules
  as stated by the user this session: the wordmark is "ucm." in Nunito
  ExtraBold (800), always lowercase, ends in the dot #FF9932, never
  retyped (asset files only; `brand/assets/logos/` stays a README pointing
  at the Drive folder until the owner's go). On light: ink letterforms,
  dot unchanged. On dark: ink-on-dark letterforms, dot unchanged (dot
  measures 8.1 on ink, 9.0 on hero dark). On the accent: the mark sits in
  its WHITE CONTAINER, a compact pill at maximum border radius, never
  directly on yellow (the dot measures 1.31 on #FCC224 and disappears).
  Never on decorative mid-tones. The webpage shows Nunito stand-in
  specimens with an explicit disclaimer; production always places assets.
  Nunito exists ONLY for the wordmark (also saved to project memory).

## Open questions from 2026-07-07

- DOT COLOR, unresolved and blocking public use: the logo file the user
  shared shows a dot that reads accent-yellow (#FCC224-like), while the
  brand book documents #FF9932. Ask the user which is true, then reconcile
  color.md, the webpage, the SVG, both JSON blocks, the tracker, and the
  `ucm-wordmark-typeface` project memory in one pass.
- Tracker entries not yet written (file access): the ramp decision and
  ink-60 gap, the 4.9 warning-tint correction, and the logo rules
  (typeface, white pill container) which likely also belong in the
  identity page. `brand/guidelines/identity.md` does not exist under that
  name; find the real identity page filename when access is back.
- Confluence next pages (user has the main core page and the presentation
  page up already). Recommended order: color (only after PR #9 merges,
  attach PNG exports, not SVG), identity/logo (after the dot decision),
  typography, voice, dos-and-donts. Keep dev pages (modes, motion, layout,
  components, vibecoding, environment) repo-first. Candidate new page: a
  short asset inventory (where logo files live, formats, who to ask).
  Log every paste in `docs/brandbook/TRACKER.md`, repo always wins.

## Pivot 2026-07-06: brand-first, MCP parked (implemented, merged)

User decision: the repo is the canonical home of the UCM brand (identity,
rules, guidelines, assets) under `brand/`, and the MCP-as-a-service
direction is parked, not deleted. The pivot is fully implemented and merged
to `main` (PR #8): 12 canonical guideline pages in `brand/guidelines/`, the
color diagram SVG, the assets scaffold, the inverted Confluence sync, and
the brand-first repositioning of README, CLAUDE.md, and this file. All
service code stays green (`pnpm lint:rules`, `pnpm -r typecheck`,
`pnpm test`, CI); it just is not the focus.
Spec: `docs/superpowers/specs/2026-07-06-brand-home-design.md`.
Plan: `docs/superpowers/plans/2026-07-06-brand-home.md`.
Working branch: `docs/brand-home` (PR per chunk into `main`).

Standing gates from the pivot: logo files enter the repo only on the brand
owner's explicit go (until then `brand/assets/logos/` is a README pointing
at the Drive folder), and the brand book syncs to Confluence via
`docs/brandbook/README.md`. The sections below describe the parked service
and remain the resume point for a future launch.

## What this is

The UCM Design System as a service: an MCP server that lets non-designers
vibecode UIs that come out on-brand by default. Correctness is structural (lint +
MCP tools), not dependent on the user's judgment. The system is its **rules** as
much as its **components**.

## Where everything is

Everything is in this one folder: `/Users/thanayoot/Downloads/GitHub/Design System MCP/`
(a pnpm monorepo). Remote: `github.com/sosleepyted/Design-System-MCP`
(private). Default branch `main`, working branch `docs/brand-home`.

```
brand/           the canonical brand book (START HERE: brand/README.md)
  guidelines/    12 canonical pages (identity, modes, color, typography,
                 motion, voice, layout, components, dos-and-donts, B2B
                 decks, vibecoding, environment)
  assets/        color-diagram.svg, color-pairings.svg,
                 color-reference.html; logos/ is a README until the user go
packages/
  ui/            @ucm/ui        component library (tokens, modes, 16 components)
  catalog/       @ucm/catalog   emits dist/catalog.json from UI src + docs + tokens + rules
  mcp-server/    @ucm/mcp-server the MCP server (7 tools, stdio + HTTP)
  rules/         @ucm/rules     single-source rules manifest + CI lint
  create-app/    @ucm/create-app  npx scaffolder + starter template
  claude-plugin/ ucm-design Claude Code plugin (MCP registration + ucm-install skill)
  be-structure/  @ucm/be-structure RESERVED placeholder (backend skill, not built)
apps/docs/       Astro docs site (component MDX, island demos, templates)
docs/brandbook/  Confluence sync layer (incoming/ verbatim records + TRACKER.md)
docs/superpowers/ specs and plans (brand-home spec + plan live here)
docs/plan/       the original 8-step build plan (00..07)
DESIGN-SYSTEM.md the built-state spec (global rules in Section 1)
Dockerfile, .github/workflows/ci.yml, infra/ (registry + deploy)
```

## Status: all 7 plan steps + extras are DONE and green

- 16 components in `@ucm/ui`: product (Button, Card, Field/Input/Select/Checkbox),
  brand (BrandButton, GlowButton), shared (Nav, Footer, Container, Section, Stack,
  Grid, Divider), foundation (Icon).
- MCP tools (7): `get_rules`, `get_pattern`, `search_components`, `get_component`,
  `get_tokens`, `preflight`, `review_code`.
- 2 blessed page templates served via `get_pattern`: landing (brand), dashboard (product).
- Enforcement: `@ucm/rules` manifest (12 rules) drives both the CI lint and
  `review_code`; CI workflow runs lint -> typecheck -> test -> catalog -> build.
- Ship: Dockerfile, Streamable HTTP transport + bearer auth (MCP_TOKENS env),
  `npx @ucm/create-app`.
- Registry: self-hosted Verdaccio (`infra/registry/`) hosts the private `@ucm/*`
  scope so `@ucm/ui` publishes without renaming. `@ucm/ui` is version 0.1.0 with
  `publishConfig`; `create-app` injects an `.npmrc` registry mapping into
  scaffolded apps. Publish round-trip proven against a local Verdaccio.
- Deploy: `infra/deploy/` has a production compose (mcp + registry + Cloudflare
  tunnel, no public ports), `.env.example`, and a Hetzner + Access runbook.
- Verified (2026-07-06): 52 tests pass, all packages typecheck, build 14 pages,
  lint 0/0, em dash 0, emoji 0, no hardcoded secrets, `pnpm install
  --frozen-lockfile` in sync, MCP auth gate returns 401/200 correctly.

## Non-negotiable rules (the design system IS these)

- Two modes, never mixed: brand (marketing, yellow CTAs, glow) vs product
  (internal app, navy, restrained, no glow). Shared components work in both.
- No em dashes anywhere (incl. comments). No emoji (use the Material Symbols
  `Icon`). No eyebrows (uppercase letter-spaced kickers).
- Bilingual: every visible string is `{ de, en }` via the locale layer, default
  German.
- Triad only (cream page #F5F5F3, navy ink #001E2B, yellow accent #FCC224); never
  pure black/white as ink or surface (white allowed only as a card surface).
- Ink text opacity ramp is 100 / 80 / 60 / 30 (decision 2026-07-07; the
  built tokens still carry the old ramp until the sweep).
- Animate only transform / opacity / clip-path; never `transition-all` or layout
  props.
- `@ucm/ui` stays zero-runtime, server-render safe; never `@mui/*` or `@emotion/*`.
- The wordmark: "ucm." in Nunito ExtraBold, lowercase, dot #FF9932, never
  retyped, white pill container on yellow. Nunito is for the wordmark only.

## Conventions and gotchas

- Catalog auto-discovers components by scanning `packages/ui/src/{product,brand,
  shared}` + `foundation/icon` for PascalCase `*.tsx`. Mode is derived from the
  directory, not MDX frontmatter.
- The docs typecheck builds `@ucm/ui` itself (`pnpm --filter @ucm/ui build
  && astro check` in apps/docs), so `pnpm -r typecheck` is self-sufficient
  on a cold checkout.
- Lint escape hatch: put `ucm-lint-ignore` on a line that legitimately quotes a
  banned token (docs explaining a rule). Em dash and emoji are never exempt.
- `get_pattern` serves the real template source verbatim (from
  `apps/docs/src/templates/*.tsx`), so served code can never drift from what builds.
- Rules are defined once in `packages/rules/src/manifest.ts` (RULES + RULE_IDS);
  checks.ts, review_code, the catalog, and `get_rules` all reference it.
- The color page and its JSON block are mirrors: any change to one changes
  the other in the same commit. Same for `color-reference.html`.
- `.git.plandocs-bak` at the repo root is a safety backup of a throwaway git
  repo (just the plan docs). Safe to delete.

## Active workstream: the brand home (branch `docs/brand-home`)

The canonical brand book lives in `brand/` and is edited there. Confluence
receives pasted copies; `docs/brandbook/` is the sync layer (incoming/ holds
verbatim drops, TRACKER.md holds statuses, decisions, conflicts, and the
page-to-canonical-file mapping). The repo always wins; conflicts are logged,
never silently resolved. Full process: `docs/brandbook/README.md`. The MCP
service is parked; keep it green, do not extend it unless asked.

Open at handoff time: PR #9 (color pairings + this session's color
reference work once pushed) awaits the land-and-merge script at the top.
The logo files still wait for the user's explicit go. Confluence has the
main core page and the presentation page; next pastes per the plan above.

## Launch verdict (parked since 2026-07-06): code is GO; the rest is infra + secrets

1. Provision a Hetzner host + Docker. Create a Cloudflare Tunnel + Access.
2. `cp infra/deploy/.env.example infra/deploy/.env`, fill `MCP_TOKENS`
   (`openssl rand -hex 32`) and `TUNNEL_TOKEN`.
3. `docker compose -f infra/deploy/docker-compose.yml --env-file
   infra/deploy/.env up -d --build`.
4. Publish `@ucm/ui` to the deployed registry (see `infra/registry/README.md`),
   then set `auth.htpasswd.max_users: -1` and redeploy.
5. The Docker image build itself was never run locally; first
   `compose up --build` on the host is the real test.

## Caveats a fresh session should know

- Pages vibecoding.md and vibecoding-environment.md say create-app ships the
  /ucm-setup and /ucm-page commands; those skills live on repo PR #3 (not
  merged). Soften both pages if PR #3 dies.
- Open questions for the user live in docs/brandbook/TRACKER.md per page
  (ucm.agency sub-brand, client references, slide template, German deck
  version, Video Black, Brand Guide naming, Like/Dislike colors) plus the
  color gaps: #A96B00 inline warning 4.02 at 12px, ink-60 4.47 on page.
- The gh token lacks the workflow scope, so pushes touching
  .github/workflows/ fail from this machine; fix via the GitHub web editor.
- Project memory exists at the Claude project memory dir; it currently
  holds the wordmark typeface rule.

## Quick commands

```bash
pnpm install
pnpm catalog:build     # build catalog.json
pnpm test              # unit tests
pnpm build             # @ucm/ui + docs
pnpm lint:rules        # design-rule lint
pnpm typecheck         # all packages
pnpm mcp:inspect       # MCP Inspector
MCP_TOKENS=secret pnpm --filter @ucm/mcp-server start:http   # HTTP server

# Registry (local): serve, then publish @ucm/ui
cd infra/registry && npx verdaccio@6 --config config.yaml   # http://localhost:4873
pnpm --filter @ucm/ui build && pnpm --filter @ucm/ui publish \
  --registry http://localhost:4873 --no-git-checks

# Deploy (on the host)
docker compose -f infra/deploy/docker-compose.yml --env-file infra/deploy/.env up -d --build
```
