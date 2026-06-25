# Step 2: Build the MCP server (`packages/mcp-server`)

Assumes the standing context and a working `catalog.json` from Step 1.

Create `packages/mcp-server`: a **stdio** MCP server on `@modelcontextprotocol/sdk` that reads `catalog.json` (it must not import `@ucm/ui` into any build). Expose three read tools:

- `search_components(query, mode?)`: ready components matching by name / summary / intent; filter by mode when given.
- `get_component(name)`: full entry, props, import, example, mode, guidelines.
- `get_tokens(category?)`: the structured token set as real CSS variables and values.

Tool descriptions must aggressively claim the territory and state the mode rule. For example, for `search_components`: "Use for ANY UI work at UCM. Brand mode for marketing pages (ucm.jobs), product mode for the internal app. Never mix modes."

Also add:

- A `pnpm mcp:dev` script to run the server over stdio.
- MCP Inspector wiring so I can call the tools (`npx @modelcontextprotocol/inspector ...`).
- A short README in the package: how to run it, plus the example client config snippet.

**Stop and verify:** start the Inspector and call `search_components("button", "brand")`, `get_component("BrandButton")`, and `get_tokens("color")`. Confirm modes filter correctly and that `get_component` returns real props, import, and example. Do not move on to coverage yet.
