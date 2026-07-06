# UCM brand home

The home of the UCM brand: identity, rules, guidelines, assets, and the
design system that enforces them. The system is its rules as much as its
components; correctness is structural, never a matter of taste.

Start here: **[brand/README.md](brand/README.md)**, the canonical brand
book. Twelve guideline pages (identity, modes, color, typography, motion,
voice and copy, layout, components, dos and don'ts, presentations,
vibecoding, environment setup), the color diagram, and the logo rules.
Confluence carries pasted copies; the sync workflow is
[docs/brandbook/README.md](docs/brandbook/README.md).

## The rules

- [brand/guidelines/dos-and-donts.md](brand/guidelines/dos-and-donts.md):
  the quick reference.
- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md): the built-state technical reference.
- [UCM-DESIGN SYSTEM.md](<UCM-DESIGN SYSTEM.md>): the intent spec.
- `packages/rules`: the twelve-rule manifest that drives the CI lint and the
  code reviewer. `pnpm lint:rules` must always report zero.

## The components

`@ucm/ui` (`packages/ui`) is the component library: tokens, two modes, 16
components, zero runtime dependencies, server-render safe. `apps/docs` is
the Astro docs site with the component pages and island demos.

```bash
pnpm install
pnpm test               # unit tests
pnpm build              # build @ucm/ui + the docs site
pnpm lint:rules         # design-rule lint
pnpm typecheck          # typecheck all packages
```

## Design system service (parked)

The MCP service around the library is built, green, and parked while the
brand work leads; nothing here is deprecated. `@ucm/mcp-server` (7 tools:
get_rules, get_pattern, search_components, get_component, get_tokens,
preflight, review_code), `@ucm/catalog`, `@ucm/create-app`, the Claude Code
plugin (`packages/claude-plugin`), the private registry and deploy material
(`infra/`), and `@ucm/be-structure` (a reserved slot). The launch runbook
and the resume point live in [HANDOFF.md](HANDOFF.md); the deploy notes in
`packages/mcp-server/README.md`.

```bash
pnpm catalog:build      # build catalog.json
pnpm mcp:inspect        # open the MCP Inspector
pnpm mcp:dev            # run the MCP server over stdio
```
