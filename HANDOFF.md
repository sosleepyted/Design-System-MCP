# Project handoff (context for a new chat)

## What this is

The UCM Design System as a service: an MCP server that lets non-designers
vibecode UIs that come out on-brand by default. Correctness is structural (lint +
MCP tools), not dependent on the user's judgment. The system is its **rules** as
much as its **components**.

## Where everything is

Everything is in this one folder: `/Users/thanayoot/Downloads/GitHub/Design System MCP/`
(a pnpm monorepo, git branch `feat/icon-system`, no remote yet). It used to be
split across a sibling `ucm design/` folder; that has been consolidated here.

```
packages/
  ui/            @ucm/ui        component library (tokens, modes, 16 components)
  catalog/       @ucm/catalog   emits dist/catalog.json from UI src + docs + tokens + rules
  mcp-server/    @ucm/mcp-server the MCP server (7 tools, stdio + HTTP)
  rules/         @ucm/rules     single-source rules manifest + CI lint
  create-app/    @ucm/create-app  npx scaffolder + starter template
  be-structure/  @ucm/be-structure RESERVED placeholder (backend skill, not built)
apps/docs/       Astro docs site (component MDX, island demos, templates)
docs/plan/       the original 8-step build plan (00..07)
DESIGN-SYSTEM.md the spec (global rules in Section 1)
Dockerfile, .github/workflows/ci.yml
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
- After editing `@ucm/ui`, `astro check` (docs typecheck) can show stale errors
  until `pnpm build` rebuilds the library's dist. Re-run build, then typecheck.
- Lint escape hatch: put `ucm-lint-ignore` on a line that legitimately quotes a
  banned token (docs explaining a rule). Em dash and emoji are never exempt.
- `get_pattern` serves the real template source verbatim (from
  `apps/docs/src/templates/*.tsx`), so served code can never drift from what builds.
- Rules are defined once in `packages/rules/src/manifest.ts` (RULES + RULE_IDS);
  checks.ts, review_code, the catalog, and `get_rules` all reference it.
- `.git.plandocs-bak` at the repo root is a safety backup of a throwaway git repo
  (just the plan docs). Safe to delete: `rm -rf ".git.plandocs-bak"`.

## Done since the last handoff (branch `feat/icon-system`, pushed)

- `63fc1de` root `CLAUDE.md` (old open item 2).
- Pushed to GitHub, remote `origin` =
  `github.com/sosleepyted/Design-System-MCP` (private). Old open item 3.
- `686c6a9` registry setup: `@ucm/ui` 0.0.0 -> 0.1.0, Verdaccio config,
  create-app `.npmrc` wiring. Registry decision: kept the `@ucm` scope (baked
  into 174 refs) and self-hosted rather than rename. `ucm` is not a free GitHub
  or npm handle, which ruled out GitHub Packages without a rename.
- `1c1ae28` production deploy compose + runbook.

## Active workstream: brand book update (branch `docs/brandbook-update`)

The UCM brand book lives in Confluence and is being rewritten in English to
match the built system, one page at a time. The user pastes a page into chat;
the raw text is filed verbatim under `docs/brandbook/incoming/`, the rewrite
goes to `docs/brandbook/updated/`, and the user pastes that back into
Confluence. Repo specs are the source of truth; conflicts with old Confluence
content are logged in `docs/brandbook/TRACKER.md`, never silently resolved.
Full process: `docs/brandbook/README.md`. This work stays off `feat/icon-system`
so the launch PR remains clean.

## Launch verdict: code is GO; the rest is infra + secrets (yours to do)

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

## Caveats a fresh session should know

- The Docker image build itself was never run (no Docker daemon in the dev box).
  The Dockerfile is validated by inspection plus a direct `node` run of the HTTP
  server; first `compose up --build` on the host is the real test.
- The publish round-trip was proven against a throwaway local Verdaccio. The
  deployed registry is empty until step 4 above runs there.

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
