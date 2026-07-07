# Project handoff (context for a new chat)

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
  assets/        color-diagram.svg; logos/ is a README until the user go
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
  scaffolded apps. Publish round-trip (publish, scaffold, install, preflight OK)
  proven against a local Verdaccio.
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
- Animate only transform / opacity / clip-path; never `transition-all` or layout
  props.
- `@ucm/ui` stays zero-runtime, server-render safe; never `@mui/*` or `@emotion/*`.

## Conventions and gotchas

- Catalog auto-discovers components by scanning `packages/ui/src/{product,brand,
  shared}` + `foundation/icon` for PascalCase `*.tsx`. Mode is derived from the
  directory, not MDX frontmatter.
- Component mode "shared" lives in `packages/ui/src/shared/`. MDX `mode` enum and
  the catalog both understand brand|product|shared.
- The docs typecheck builds `@ucm/ui` itself (`pnpm --filter @ucm/ui build
  && astro check` in apps/docs), so `pnpm -r typecheck` is self-sufficient
  on a cold checkout and stale-dist errors are a thing of the past.
- Lint escape hatch: put `ucm-lint-ignore` on a line that legitimately quotes a
  banned token (docs explaining a rule). Em dash and emoji are never exempt.
- `get_pattern` serves the real template source verbatim (from
  `apps/docs/src/templates/*.tsx`), so served code can never drift from what builds.
- Rules are defined once in `packages/rules/src/manifest.ts` (RULES + RULE_IDS);
  checks.ts, review_code, the catalog, and `get_rules` all reference it.
- `.git.plandocs-bak` at the repo root is a safety backup of a throwaway git repo
  (just the plan docs). Safe to delete: `rm -rf ".git.plandocs-bak"`.

## Done since the last handoff (sessions of 2026-07-06 and 07-07)

- Brand book pages 04 (vibecoding, three tracks) and 05 (vibecoding
  environment: clone once, per-project pull, local registry + HTTP MCP,
  scaffold own app), the "ucm." logo rule (lowercase, dot #FF9932, never
  retyped), and the ucm-design Claude Code plugin. Merged via PRs #4 to #6.
- CI root cause found and fixed: every CI run in repo history had failed at
  Type check because apps/docs resolves @ucm/ui types from dist, which does
  not exist on a cold checkout. Fix: the docs typecheck script builds the
  library first (`pnpm --filter @ucm/ui build && astro check`), no workflow
  edit needed (the gh token lacks the workflow scope; that no longer
  matters). CI green for the first time, and on every PR since.
- The brand-first pivot: spec and plan written and user-approved (PR #7),
  implemented and merged (PR #8). See the pivot section above.
- Sanctioned color pairings with measured WCAG contrast added to
  brand/guidelines/color.md (user rule: dark on light or light on dark in
  the same tone, never color on color). Two built-token AA gaps found and
  logged in the tracker (#A96B00 inline warning 4.02 at 12px; field labels
  at 55 percent ink 3.8). PR #9, open at handoff time.

## Active workstream: the brand home (branch `docs/brand-home`)

The canonical brand book lives in `brand/` and is edited there. Confluence
receives pasted copies; `docs/brandbook/` is the sync layer (incoming/ holds
verbatim drops, TRACKER.md holds statuses, decisions, conflicts, and the
page-to-canonical-file mapping). The repo always wins; conflicts are logged,
never silently resolved. Full process: `docs/brandbook/README.md`. The MCP
service is parked; keep it green, do not extend it unless asked.

## Launch verdict (parked since 2026-07-06): code is GO; the rest is infra + secrets

The only work between here and live is provisioning, not code:

1. Provision a Hetzner host + Docker. Create a Cloudflare Tunnel + Access (tunnel
   token, two hostnames `mcp.` and `registry.`, an Access policy).
2. `cp infra/deploy/.env.example infra/deploy/.env`, fill `MCP_TOKENS`
   (`openssl rand -hex 32`) and `TUNNEL_TOKEN`.
3. `docker compose -f infra/deploy/docker-compose.yml --env-file
   infra/deploy/.env up -d --build`.
4. Publish `@ucm/ui` to the deployed registry (see `infra/registry/README.md`),
   then set `auth.htpasswd.max_users: -1` and redeploy.
5. Decide whether to merge `feat/icon-system` -> `main`. Everything is on that
   branch; CI only gates `main` and PRs. Recommended: open the PR so the launch
   version runs the CI gate first.

## Caveats and open items a fresh session should know

- Open at handoff time: PR #9 (color pairings) awaits merge. The logo files
  still wait for the user's explicit go. No brand page has been pasted back
  to Confluence yet.
- Pages vibecoding.md and vibecoding-environment.md say create-app ships the
  /ucm-setup and /ucm-page commands; those skills live on repo PR #3 (not
  merged, template has no .claude dir on main). Soften both pages if PR #3
  dies.
- Open questions for the user live in docs/brandbook/TRACKER.md per page
  (ucm.agency sub-brand, client references, slide template, German deck
  version, Video Black, Brand Guide naming, Like/Dislike colors) plus the
  two color AA gaps from the pairing work.
- The Docker image build itself was never run (no Docker daemon in the dev box).
  The Dockerfile is validated by inspection plus a direct `node` run of the HTTP
  server; first `compose up --build` on the host is the real test.
- The publish round-trip was proven against a throwaway local Verdaccio. The
  deployed registry is empty until the deploy runbook runs there.
- The gh token lacks the workflow scope, so pushes touching
  .github/workflows/ fail from this machine; fix workflows via the GitHub
  web editor or `gh auth refresh -s workflow` if ever needed again.

## External references and skills (added 2026-07-06)

Full catalog with the per-source rules: `docs/references.md`.

- Skills in `~/.claude/skills`: taste-skill, karpathy-guidelines, ui-ux-pro-max
  (were already installed, kept). From `affaan-m/ecc`, only 20 design/frontend/
  brand/motion/a11y skills were kept (frontend-design-direction, frontend-a11y,
  brand-voice, brand-discovery, liquid-glass-design, motion-{foundations,patterns,
  advanced,ui}, react-{patterns,performance,testing}, ui-to-vue, ui-demo,
  vue-patterns, vite-patterns, ...); the other 257 ecc skills were removed as
  off-domain. The full ecc set can be reinstalled from the repo if ever needed.
- Libraries (documented, NEVER in @ucm/ui): `google/material-design-icons`
  (Apache-2.0) is the vendored `Icon` source; `motiondivision/motion` and
  `mrdoob/three.js` are allowed in `apps/docs` / brand surfaces ONLY, behind a
  dynamic import, respecting the motion rule.
- 21st.dev animations: installed as a Claude Code plugin (marketplace `21st` from
  `21st-dev/claude-code-plugin`, plugin `21st@21st` v0.2.0, user scope). It
  bundles the MCP server `plugin:21st:21st` (https://21st.dev/api/mcp) plus the
  21st skills. The endpoint is OAuth-protected (a raw x-api-key returns 401), so
  it needs a one-time interactive authorize: restart Claude Code, then `/mcp` ->
  21st -> authenticate (browser). The pasted API key is unused by this path.
  Guardrail: apps/docs / brand only, reworked to the UCM rules, pass `review_code`
  before shipping, never dropped raw into `@ucm/ui` or a product surface.

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
# Bump @ucm/ui version first, then `pnpm catalog:build` (catalog version tracks
# the package, or preflight reports a mismatch).

# Deploy (on the host)
docker compose -f infra/deploy/docker-compose.yml --env-file infra/deploy/.env up -d --build
```
