---
name: ucm-install
description: Use when a project needs the UCM design system wired up, when the user asks to install the design system, set up @ucm/ui, or connect a project to UCM, and whenever the MCP preflight tool reports @ucm/ui missing or outdated. Scaffolds fresh apps via @ucm/create-app and retrofits existing projects with the registry mapping, @ucm/ui, token styles, MCP registration, and the consumer CLAUDE.md.
---

# UCM install

Set up the current project to use the UCM design system: the @ucm/ui package,
the @ucm registry mapping, the ucm-design-system MCP registration, and the
consumer CLAUDE.md. Handle both a fresh directory and an existing project.

## 1. Environment check

Resolve configuration from the environment before touching any file:

- `UCM_MCP_TOKEN`, required. The bearer token for the MCP server. If it is
  missing, walk the user through adding an export to their shell profile
  (`export UCM_MCP_TOKEN=...`) and stop until it is set. Never write a literal
  token into any project file.
- `UCM_REGISTRY_URL`, optional. The npm registry that hosts the @ucm scope.
  Default: `http://localhost:4873`.
- `UCM_MCP_URL`, optional. The MCP endpoint. Default:
  `http://localhost:8787/mcp`.

## 2. Detect the situation

- No `package.json` in the working directory: fresh path.
- An existing `package.json`: retrofit path.

## 3. Fresh path

Delegate to the scaffolder and do not duplicate its logic:

```bash
npx @ucm/create-app <name> --registry "$UCM_REGISTRY_URL"
```

create-app is the single source of truth for the starter template. It writes
the app, the `.npmrc` mapping, the project `.mcp.json`, and the consumer
CLAUDE.md, then installs dependencies.

## 4. Retrofit path

Apply these steps in order. Every step is idempotent, so a re-run after a
failure is safe.

1. Registry mapping. Append `@ucm:registry=<UCM_REGISTRY_URL>` to `.npmrc`,
   creating the file when absent. Skip when the line already exists.
2. Packages. Detect the package manager by lockfile (`pnpm-lock.yaml` means
   pnpm, `yarn.lock` means yarn, otherwise npm). Install `@ucm/ui`, and add
   `react` plus `react-dom` when the project does not already have them.
3. Styles. Import `@ucm/ui/styles/tokens.css` and `@ucm/ui/styles/motion.css`
   at the app entry, `src/main.tsx` or whatever entry the bundler config
   names. When the project has a global stylesheet, `@import` there instead.
4. MCP registration. Write a project `.mcp.json` with the
   `ucm-design-system` server, referencing `${UCM_MCP_TOKEN}` so the token is
   expanded from the environment, never stored:

   ```json
   {
     "mcpServers": {
       "ucm-design-system": {
         "type": "http",
         "url": "${UCM_MCP_URL:-http://localhost:8787/mcp}",
         "headers": { "Authorization": "Bearer ${UCM_MCP_TOKEN}" }
       }
     }
   }
   ```

5. CLAUDE.md. Add the consumer snippet, the same content create-app writes:
   the before-any-UI-work workflow (get_rules, preflight, get_pattern for
   whole pages, search_components and get_component for pieces, get_tokens
   for values, review_code before finishing) and the non-negotiable rules
   (two modes never mixed, bilingual de and en strings, no em dashes, no
   emoji, no eyebrows, triad only, compositor-friendly motion only). When a
   CLAUDE.md already exists, append the snippet instead of overwriting.

## 5. Verify

Call the MCP `preflight` tool. The installed `@ucm/ui` version must match the
catalog version. Report the result plainly, including the exact versions.

## Error handling

- Missing env vars: guided setup, then stop.
- Registry unreachable: name the exact URL that failed and the likely causes,
  VPN or Cloudflare Access not active, or a wrong `UCM_REGISTRY_URL`.
- Version mismatch from preflight: print the exact update command for the
  detected package manager, for example `pnpm update @ucm/ui`.
- Install failure mid-retrofit: report which step failed and what was already
  changed, so the user can re-run safely.
