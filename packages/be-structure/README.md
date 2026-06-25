# @ucm/be-structure (reserved slot)

> Status: **placeholder, not yet implemented.** This package reserves the place
> in the project for the UCM backend-structure skill so it can be added later
> without reshaping the monorepo or the MCP.

## Intent

`@ucm/ui` is the source of truth for the **frontend** design system; the MCP
serves it so non-experts produce on-brand UI by default. `@ucm/be-structure`
will be the **backend** counterpart: the agreed structure a backend should have,
served the same way so backends come out consistent by default.

Scope is intentionally undefined for now. It may cover any of:

- folder and architecture conventions (layering, module organization),
- service and API scaffolding (routes, controllers, services),
- data and schema structure (models, migrations, repositories).

Define the scope before implementing; until then this stays a placeholder.

## How it will plug in (the reserved seam)

When implemented, this package will emit entries that the catalog build picks up
into `catalog.json` under a top-level **`structures`** array (already present and
empty, see `packages/catalog`). The MCP will then expose a `get_structure` tool
(reserved and documented in `packages/mcp-server`, intentionally **not**
registered yet to avoid shipping a half-working tool).

Nothing imports this package today, and it ships no runtime code. See
`src/index.ts` for the placeholder type.
