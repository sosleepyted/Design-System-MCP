# @ucm/mcp-server

The UCM design-system MCP server. It reads `catalog.json` (built by
`@ucm/catalog`) and serves on-brand `@ucm/ui` components and tokens to coding
agents. It never imports `@ucm/ui` itself, so it stays light and safe to deploy.

The server is a discovery layer over `@ucm/ui`. Its output (imports, examples)
is only useful if the package is installed in the caller's project, so the two
are coupled by design.

## Tools

| Tool | Purpose |
| --- | --- |
| `get_rules(severity?)` | The global design rules with severity and how each is enforced. Read first. |
| `get_pattern(name, mode?)` | A whole blessed page template (landing, dashboard) with editable slots. Use first for whole-page requests. |
| `search_components(query, mode?)` | Find ready components by name, summary, or intent. Scope with `mode`. |
| `get_component(name)` | Full spec for one component: mode, props, import, example, guidelines. |
| `get_tokens(category?)` | Design tokens as real CSS variables and values. |

**Mode rule:** brand mode for marketing pages (ucm.jobs): yellow CTAs, glow,
expressive. Product mode for the internal app: navy, restrained, no glow.
Never mix modes. Shared atoms (like `Icon`) appear in both.

## Run it

From the repo root, build the catalog first, then start the server:

```bash
pnpm catalog:build
pnpm mcp:dev          # runs this server over stdio
```

`CATALOG_PATH` overrides the catalog location (defaults to
`packages/catalog/dist/catalog.json`).

## Inspect it

The MCP Inspector gives you a UI to call the tools:

```bash
pnpm mcp:inspect      # opens the Inspector wired to this server
```

Then call, for example, `search_components("button", "brand")`,
`get_component("BrandButton")`, and `get_tokens("color")`.

## Client config

Point an MCP client (Claude Code, Claude Desktop, etc.) at the stdio server:

```json
{
  "mcpServers": {
    "ucm-design-system": {
      "command": "pnpm",
      "args": ["--filter", "@ucm/mcp-server", "dev"],
      "cwd": "/absolute/path/to/ucm-design"
    }
  }
}
```

## Remote (Streamable HTTP)

For shared / hybrid use, run the HTTP transport (a single `/mcp` endpoint, not
the deprecated SSE transport):

```bash
MCP_TOKENS=secret-a,secret-b pnpm --filter @ucm/mcp-server start:http
```

- Auth: every request needs `Authorization: Bearer <token>`; tokens come from
  `MCP_TOKENS` (comma-separated, so you can add a new one before retiring the
  old). The server refuses to start with no tokens set. The single
  `isAuthorized()` call is the seam for OAuth 2.1 later.
- `GET /health` returns `{ ok: true }`.

### Deploy

Build the container (it builds the catalog at image time, so it always serves
the latest `ready` components):

```bash
docker build -t ucm-mcp .
docker run -e MCP_TOKENS=your-secret -p 8787:8787 ucm-mcp
```

For a hybrid team (home + office) without a VPN, put the container behind
**Cloudflare Tunnel + Access**: the server and all component data stay in your
container, but it is reachable from anywhere with zero-trust auth. This keeps
unreleased component data off third-party compute, unlike deploying the catalog
to an edge Worker.

### Client config (HTTP)

```json
{
  "mcpServers": {
    "ucm-design-system": {
      "type": "http",
      "url": "https://your-server/mcp",
      "headers": { "Authorization": "Bearer your-token" }
    }
  }
}
```

`npx @ucm/create-app my-app --url <url> --token <token>` writes this for you.

## Reserved: backend structure

The catalog carries an empty `structures` array and the server has a documented
(but unregistered) `get_structure` seam, reserved for the backend-structure
skill in `packages/be-structure`. Nothing ships until that skill exists; the slot
is there so it can be added without a breaking change.
