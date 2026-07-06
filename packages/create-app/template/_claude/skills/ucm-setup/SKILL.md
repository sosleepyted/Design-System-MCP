---
name: ucm-setup
description: Verify and repair this app's UCM design system connection. Use when starting work in this app, when ucm-design-system MCP tools are missing or erroring, when .mcp.json still has placeholder values, or when asked whether the app is ready for UI work.
---

# UCM setup check

Leave this app ready for on-brand UI work, or report exactly what is
missing. Run the checks in order; stop at the first one that needs the user.

## 1. Connection config

Read `.mcp.json` at the project root.

- If the URL contains `REPLACE-WITH-YOUR-SERVER` or the token contains
  `REPLACE-WITH-YOUR-TOKEN`, ask the user for the real server URL and bearer
  token (the design system team issues them), write both into `.mcp.json`,
  then tell the user to restart Claude Code so the connection reloads, and
  stop.
- If the file is missing entirely, recreate it with the shape below, ask the
  user for the two values, and stop for the same restart.

```json
{
  "mcpServers": {
    "ucm-design-system": {
      "type": "http",
      "url": "https://REPLACE-WITH-YOUR-SERVER/mcp",
      "headers": { "Authorization": "Bearer REPLACE-WITH-YOUR-TOKEN" }
    }
  }
}
```

## 2. Server connection

Call the `get_rules` tool of the `ucm-design-system` server.

- If the tool does not exist or the call errors, the server is not
  connected. The usual causes, in order: Claude Code was not restarted after
  `.mcp.json` changed, the token is wrong (the server answers 401), or the
  server is unreachable. Say which one it looks like and stop.

## 3. Library install

Run the `preflight` tool. It confirms `@ucm/ui` is installed and matches the
server catalog.

- If `@ucm/ui` is missing, run `npm install` (the app's `.npmrc` maps the
  `@ucm` scope to the private registry), then run `preflight` again.
- If the versions mismatch, report both versions and ask the user before
  updating anything.

## 4. Report

State plainly: server connection ok or not, the installed `@ucm/ui`
version, and whether the app is ready. If everything passes, point the user
at `/ucm-page` to start building.
