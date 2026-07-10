# Project handoff (context for a new chat)

## State 2026-07-10 (read this first)

File access is healthy again (the 2026-07-07 macOS grant loss is over; it
explains some artifacts below). Branch `docs/brand-home` is in sync with
origin, PR #9 is OPEN, and the working tree carries the user's brand
restructure UNCOMMITTED:

- `brand/guidelines/color.md` slimmed back to tokens, ramps, and rules; the
  pairing tables moved to a new page `brand/guidelines/color-pairings.md`
  (measured WCAG tables, ink ramp floors, banned pairings).
- NEW `brand/guidelines/logo.md`, the canonical logo page: wordmark "ucm."
  lowercase closed by the dot; Nunito Extra-Bold 800, used for nothing
  else; the dot is #FF9932 (explicitly NOT the triad yellow #FCC224, this
  closed the open dot question); never retype EXCEPT interface chrome (site
  header/footer, docs header) where the wordmark is typed at 22px with
  tracking -0.04em; everything else uses delivered files. In running text
  the name is UCM; domain names like ucm.jobs stay lowercase.
- Production logo files landed: `brand/assets/logos/production/` (pine 512,
  white 32, white preview on dark, wordmark-pill-header) plus
  `brand/assets/logo-usage.pdf` (generated companion for Confluence,
  regenerate after editing logo.md, never edit directly).
- The ink opacity ramp is 100/80/60/30 (adopted 2026-07-10 at the user's
  direction, superseding the earlier 100/85/78/65/55/45/35). The four-step
  ramp is canonical across color.md, color-pairings.md, both SVGs, and
  color-reference.html. Note: ink-60 measures 4.47 on the page, a hair
  under the 4.5 AA bar for normal text; it passes on white cards and is
  logged as a known gap.
- `docs/brandbook/TRACKER.md` gained about 104 lines of decisions.
- Also modified, uncommitted: brand/README.md, brand-hub.md,
  dos-and-donts.md, logos/README.md, color-reference.html (user-edited,
  see the drift warning below).

## Cleanup queue (reviewed 2026-07-08, still pending)

1. `.handoff-pending/` at the repo root is STALE AND DANGEROUS: it stages a
   2026-07-07 color.md and HANDOFF.md that would clobber the restructure.
   Delete it; never run the script inside the staged HANDOFF.md.
2. Commit `7b3661b` ("push") accidentally committed 15 Playwright debris
   files under `.playwright-mcp/`; three more YMLs sit untracked plus a
   stray `color-pairings-check.png` at the root. Add `.playwright-mcp/`
   and `.DS_Store` to .gitignore, `git rm -r --cached .playwright-mcp`,
   delete the strays.
3. `logo.md` still says "No logo files live in the repo yet" while
   `brand/assets/logos/production/` now holds four PNGs. Fix the sentence
   (the gate was lifted for production files) or log the conflict in the
   tracker.
4. MIRROR DRIFT: `brand/assets/color-reference.html` (the self-contained
   Tailwind reference webpage) was built in the 2026-07-07 session and
   then hand-edited by the user. The ink ramp is now reconciled: all
   mirrors (color.md, color-pairings.md, both SVGs, and this webpage with
   its embedded JSON) carry the canonical 100/80/60/30 ramp as of
   2026-07-10. Still verify the logo section and the old logo treatment,
   then keep the webpage and pages mirrored in the same commit forever.
5. The uncommitted restructure needs a proper commit onto PR #9 (or a new
   PR) before anything goes to Confluence.

## Proposed project skills (recommended 2026-07-08, awaiting the user's go)

`.claude/` currently has NO project skills, only settings and launch.json.
Recommended set, grounded in recurring work:

1. `contrast`: skill plus `scripts/contrast.mjs`; measure WCAG contrast
   between tokens or hexes, with a verify mode that parses every ratio in
   color-pairings.md and diffs it against math (this class of check caught
   a wrong published ratio once already).
2. `color-mirrors`: skill plus checker script; the color truth lives in
   six places (color.md, color-pairings.md, logo.md, color-diagram.svg,
   color-pairings.svg, color-reference.html with its JSON) and has already
   drifted once. Script cross-checks hexes and ratios across all six.
3. `confluence-paste`: the sync ritual; merge first, PNG exports never
   SVG, verbatim drop into docs/brandbook/incoming/, tracker entry, repo
   always wins.
4. `handoff`: the session-close ritual; refresh this file's dated
   sections, verify tree and lint, list open questions.
5. `new-component`: the Section 11 workflow, for when the parked MCP work
   resumes.

Plus a PostToolUse hook running the em dash / emoji grep on edited files,
and the .gitignore additions from the cleanup queue.

## Confluence plan (agreed 2026-07-07)

Already up: the main core page and the presentation page. Next, in order:
color (only after the restructure merges; attach PNG exports), logo
(logo.md plus logo-usage.pdf, ready once cleanup item 3 is fixed),
typography, voice, dos-and-donts. Keep dev pages (modes, motion, layout,
components, vibecoding, environment) repo-first. Candidate new page: a
short asset inventory. Log every paste in docs/brandbook/TRACKER.md.

## Pivot 2026-07-06: brand-first, MCP parked (implemented, merged)

User decision: the repo is the canonical home of the UCM brand (identity,
rules, guidelines, assets) under `brand/`, and the MCP-as-a-service
direction is parked, not deleted. Implemented and merged to `main` (PR #8).
All service code stays green (`pnpm lint:rules`, `pnpm -r typecheck`,
`pnpm test`, CI); it just is not the focus.
Spec: `docs/superpowers/specs/2026-07-06-brand-home-design.md`.
Plan: `docs/superpowers/plans/2026-07-06-brand-home.md`.
Working branch: `docs/brand-home` (PR per chunk into `main`).
The brand book syncs to Confluence via `docs/brandbook/README.md`; the repo
always wins, conflicts are logged in TRACKER.md, never silently resolved.

## What this is

The UCM Design System as a service: an MCP server that lets non-designers
vibecode UIs that come out on-brand by default. Correctness is structural
(lint + MCP tools), not dependent on the user's judgment. The system is its
**rules** as much as its **components**.

## Where everything is

Everything is in this one folder: `/Users/thanayoot/Downloads/GitHub/Design System MCP/`
(a pnpm monorepo). Remote: `github.com/sosleepyted/Design-System-MCP`
(private). Default branch `main`, working branch `docs/brand-home`.

```
brand/           the canonical brand book (START HERE: brand/README.md)
  guidelines/    14 canonical pages: brand-hub, color, color-pairings,
                 logo, typography, motion, voice-and-copy, layout,
                 components, modes, dos-and-donts, b2b-presentations,
                 vibecoding, vibecoding-environment
  assets/        color-diagram.svg, color-pairings.svg,
                 color-reference.html (Tailwind reference webpage),
                 logo-usage.pdf, logos/production/ (four PNGs)
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
docs/superpowers/ specs and plans
docs/plan/       the original 8-step build plan (00..07)
DESIGN-SYSTEM.md the built-state spec (global rules in Section 1)
Dockerfile, .github/workflows/ci.yml, infra/ (registry + deploy)
```

## Status: all 7 plan steps + extras are DONE and green (service parked)

- 16 components in `@ucm/ui`: product (Button, Card, Field/Input/Select/Checkbox),
  brand (BrandButton, GlowButton), shared (Nav, Footer, Container, Section, Stack,
  Grid, Divider), foundation (Icon).
- MCP tools (7): `get_rules`, `get_pattern`, `search_components`, `get_component`,
  `get_tokens`, `preflight`, `review_code`.
- Enforcement: `@ucm/rules` manifest (12 rules) drives both the CI lint and
  `review_code`; CI runs lint -> typecheck -> test -> catalog -> build.
- Ship: Dockerfile, HTTP transport + bearer auth, `npx @ucm/create-app`,
  self-hosted Verdaccio registry (`infra/registry/`), deploy compose +
  Hetzner/Cloudflare runbook (`infra/deploy/`). Publish round-trip proven
  locally; the Docker image build itself never ran (no local daemon).
- Verified 2026-07-06: 52 tests, all typecheck, 14 doc pages build,
  lint 0/0, em dash 0, emoji 0.

## Non-negotiable rules (the design system IS these)

- Two modes, never mixed: brand (marketing, yellow CTAs, glow) vs product
  (internal app, navy, restrained, no glow). Shared components work in both.
- No em dashes anywhere (incl. comments). No emoji (use the Material Symbols
  `Icon`). No eyebrows (uppercase letter-spaced kickers).
- Bilingual: every visible string is `{ de, en }` via the locale layer,
  default German.
- Triad only (cream page #F5F5F3, navy ink #001E2B, yellow accent #FCC224);
  never pure black/white as ink or surface (white only as a card surface).
- Ink text opacity ramp: 100/80/60/30. Floors and every sanctioned
  pairing with measured contrast: brand/guidelines/color-pairings.md.
- Animate only transform / opacity / clip-path; never `transition-all` or
  layout props.
- `@ucm/ui` stays zero-runtime, server-render safe; never `@mui/*` or
  `@emotion/*`.
- The wordmark: "ucm." lowercase with the #FF9932 dot, Nunito Extra-Bold
  800 (Nunito for nothing else). Typed only in interface chrome (22px,
  tracking -0.04em); delivered files everywhere else. Full rules:
  brand/guidelines/logo.md.

## Conventions and gotchas

- Catalog auto-discovers components by scanning `packages/ui/src/{product,
  brand,shared}` + `foundation/icon` for PascalCase `*.tsx`; mode derives
  from the directory.
- The docs typecheck builds `@ucm/ui` first, so `pnpm -r typecheck` works
  on a cold checkout.
- Lint escape hatch: `ucm-lint-ignore` on a line that legitimately quotes a
  banned token. Em dash and emoji are never exempt.
- Rules are defined once in `packages/rules/src/manifest.ts`; checks.ts,
  review_code, the catalog, and `get_rules` all reference it.
- color-reference.html and the color pages are mirrors; change them in the
  same commit (see cleanup item 4 for the current drift).
- logo-usage.pdf is generated from logo.md; regenerate, never hand-edit.
- `.git.plandocs-bak` at the root is a throwaway backup, safe to delete.
- Project memory (Claude) holds the wordmark typeface rule.

## Caveats a fresh session should know

- Pages vibecoding.md and vibecoding-environment.md reference /ucm-setup
  and /ucm-page skills that live on unmerged PR #3; soften if PR #3 dies.
- Open questions live in docs/brandbook/TRACKER.md (ucm.agency sub-brand,
  client references, slide template, German deck version, Video Black,
  Brand Guide naming, Like/Dislike colors, the #A96B00 inline warning gap
  at 4.02 on page).
- The gh token lacks the workflow scope; fix workflows via the GitHub web
  editor.

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
