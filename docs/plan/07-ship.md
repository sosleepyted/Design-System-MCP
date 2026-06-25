# Step 7: Ship it (remote server, auth, scaffolder)

Assumes the standing context and a working stdio server with the tools from the earlier steps.

1. **Remote transport.** Add a Streamable HTTP entry point to `packages/mcp-server` exposing a single `/mcp` endpoint, keeping stdio for local dev. Do not use the deprecated SSE transport.
2. **Auth.** Require a bearer token in the Authorization header (internal use). Keep issuance and rotation simple for now, and leave a clear seam for OAuth 2.1 later if we add per-user scoping or audit.
3. **Deploy.** Set up deployment to either a Cloudflare Worker or an internal container, decided by whether component data may leave the network (unreleased components probably should not). Add the catalog build to CI so the deployed server always serves the latest `ready` components.
4. **`create-app` scaffolder** (`packages/create-app`, run via `npx @ucm/create-app`). In one command it: clones a starter app, installs `@ucm/ui`, writes `mcp.json` pointing at the deployed server (URL plus token), and drops a consumer `CLAUDE.md` that says: before any UI work call `preflight` then `search_components`; never hand-write components that exist; use `get_pattern` for whole pages; brand mode for marketing, product mode for the app; emit both `de` and `en`; obey all global rules.

**Stop and verify:** scaffold a fresh app with `create-app`, connect Claude Code to the deployed server, and ask it to build a landing page. Confirm it calls `preflight`, then `get_pattern`, pulls real `@ucm/ui` components, and the result passes the CI lint.
