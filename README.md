# UCM Design System x MCP

A design system as a service: an MCP server that lets non-designers vibecode UIs
that come out on-brand by default. Correctness is structural, not dependent on
the user's judgment. The system is its **rules** as much as its **components**.

See [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) for the full spec, and
[docs/plan/](docs/plan/) for the step-by-step build plan this was made from.

## Packages

| Package | What it is |
|---------|------------|
| `@ucm/ui` (`packages/ui`) | The component library: tokens, modes, 16 components |
| `@ucm/catalog` (`packages/catalog`) | Build tool that emits `dist/catalog.json` from the UI source, docs, tokens, rules |
| `@ucm/mcp-server` (`packages/mcp-server`) | The MCP server, 7 tools, stdio and HTTP |
| `@ucm/rules` (`packages/rules`) | The single-source rules manifest + CI lint |
| `@ucm/create-app` (`packages/create-app`) | Scaffolder: `npx @ucm/create-app` |
| `@ucm/be-structure` (`packages/be-structure`) | Reserved slot for the future backend-structure skill |
| `apps/docs` | The Astro docs site |

## MCP tools

`get_rules`, `get_pattern`, `search_components`, `get_component`, `get_tokens`,
`preflight`, `review_code`.

## Run it

```bash
pnpm install
pnpm catalog:build      # build catalog.json
pnpm mcp:inspect        # open the MCP Inspector
pnpm mcp:dev            # run the MCP server over stdio

pnpm test               # unit tests
pnpm build              # build @ucm/ui + the docs site
pnpm lint:rules         # design-rule lint
pnpm typecheck          # typecheck all packages
```

## Deploy (remote MCP)

```bash
docker build -t ucm-mcp .
docker run -e MCP_TOKENS=your-secret -p 8787:8787 ucm-mcp
```

See `packages/mcp-server/README.md` for the HTTP transport, bearer auth, and the
Cloudflare Tunnel + Access deploy notes.
