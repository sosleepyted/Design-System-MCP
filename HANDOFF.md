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
- Verified: 47 tests pass, all 5 packages typecheck, build 14 pages, lint 0/0,
  em dash 0, emoji 0.

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

## Open items (not code; user decisions/infra)

1. Publish `@ucm/ui` to an internal registry (it is version 0.0.0). Recommended:
   GitHub Packages. Needed so `create-app` install and `preflight` resolve it.
2. Create `CLAUDE.md` at the repo root from `docs/plan/00-context.md` (was blocked
   by an auto-guard in the prior session; user can `cp docs/plan/00-context.md CLAUDE.md`).
3. Push to GitHub (private). All work is uncommitted on `feat/icon-system`.
   No remote configured.
4. Deploy: recommended container on Hetzner (EU/GDPR, near Berlin team) behind
   Cloudflare Tunnel + Access (zero-trust, no VPN, data stays in the container).
   Set MCP_TOKENS. Auth is static bearer token via env (OAuth 2.1 seam left in
   `isAuthorized`).

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
```
