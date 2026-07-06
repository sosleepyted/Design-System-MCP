# UCM install skill and Claude Code plugin, design

Date: 2026-07-06
Status: approved by user, pending spec review

## Purpose

Consumers who attach the UCM design-system MCP get useful output only when
`@ucm/ui` is installed in their project. Today the bridge is manual: read the
README, run `npx @ucm/create-app`, or hand-edit `.npmrc` and `.mcp.json`. This
design adds a Claude Code plugin that bundles the MCP registration and an
install skill, so one plugin install gives a user the complete kit and the
agent can set up any project (fresh or existing) without human judgment.

## Decisions made during brainstorming

1. Scope: the skill detects the situation and handles both paths, scaffolding
   a fresh starter app or retrofitting an existing project.
2. Distribution: a Claude Code plugin (not an MCP-served skill resource, not
   files scaffolded into consumer projects).
3. Bundle: the plugin carries both the install skill and the MCP server
   registration.
4. Config: secrets and endpoints come from env vars (`UCM_MCP_TOKEN`,
   `UCM_REGISTRY_URL`), with the deployed registry hostname baked in as the
   default. The skill guides users through setting missing vars. No secrets
   ship in the plugin.
5. Home: the plugin lives in this monorepo; the repo root doubles as a plugin
   marketplace. Users need git read access to install.
6. Internals: the fresh path delegates to `npx @ucm/create-app`; only the
   retrofit path is implemented in the skill itself.

## Plugin structure

```
.claude-plugin/marketplace.json        repo root, lists the plugin
packages/claude-plugin/
├── .claude-plugin/plugin.json         name "ucm-design", version, description
├── .mcp.json                          bundled MCP registration
└── skills/
    └── ucm-install/
        └── SKILL.md                   the install skill
```

The bundled `.mcp.json` registers the HTTP transport:

```json
{
  "mcpServers": {
    "ucm-design-system": {
      "type": "http",
      "url": "https://<mcp-hostname>/mcp",
      "headers": { "Authorization": "Bearer ${UCM_MCP_TOKEN}" }
    }
  }
}
```

Claude Code expands `${VAR}` in MCP configs at load time, so the token never
appears in the plugin or in any committed file. `<mcp-hostname>` is not left
open: it is the deployed `mcp.` hostname from `infra/deploy`, written into the
file when the plugin is authored.

Install flow for users:

```bash
claude plugin marketplace add sosleepyted/Design-System-MCP
claude plugin install ucm-design
```

## Skill behavior (`ucm-install`)

Triggers: requests like "install the design system", "set up @ucm/ui", "wire
this project to UCM", and whenever the MCP `preflight` tool reports that
`@ucm/ui` is missing or outdated. The skill description encodes these triggers
so the agent invokes it without being asked by name.

Flow:

1. Env check. Verify `UCM_MCP_TOKEN` is set. Resolve the registry URL from
   `UCM_REGISTRY_URL`, falling back to the deployed default. If the token is
   missing, walk the user through adding exports to their shell profile and
   stop until it is set.
2. Detect context. No `package.json` in the working directory means the fresh
   path. An existing `package.json` means the retrofit path.
3. Fresh path. Delegate to
   `npx @ucm/create-app <name> --registry $UCM_REGISTRY_URL`. The skill never
   duplicates scaffold logic; create-app stays the single source of truth.
4. Retrofit path, implemented in the skill:
   - append `@ucm:registry=<url>` to `.npmrc` (create the file if absent),
   - install `@ucm/ui`, plus `react` and `react-dom` if absent, using the
     project's detected package manager (pnpm, npm, or yarn by lockfile),
   - import `@ucm/ui/styles/tokens.css` and `@ucm/ui/styles/motion.css` at the
     detected app entry (`src/main.tsx` or the equivalent the bundler config
     names),
   - write a project `.mcp.json` that references `${UCM_MCP_TOKEN}`, never a
     literal token,
   - add the consumer CLAUDE.md snippet (same content create-app writes).
5. Verify. Call the MCP `preflight` tool and confirm the installed `@ucm/ui`
   version matches the catalog. Report the result plainly.

Copy rules: SKILL.md obeys the repo global rules, no em dashes, no emoji, no
eyebrows, uppercase only for acronyms.

## Prerequisites and touchpoints

- Publish `@ucm/create-app` to the Verdaccio registry. It is currently
  `private: true` at version 0.0.0. It needs a version bump, a
  `publishConfig` block matching `@ucm/ui`, and a publish, so that
  `npx @ucm/create-app` resolves for consumers.
- Change create-app to write `${UCM_MCP_TOKEN}` into the generated `.mcp.json`
  instead of the literal `--token` value. The `--token` flag stays for
  backwards compatibility but becomes optional.
- README and HANDOFF gain a short consumer section: install the plugin, set
  the env vars, ask the agent to set up your project.

## Testing

Manual end-to-end against a local Verdaccio:

1. Install the plugin from a local marketplace path.
2. Run the skill in an empty directory; expect a scaffolded app and a passing
   `preflight`.
3. Run the skill in a throwaway Vite project without `@ucm/ui`; expect the
   retrofit steps and a passing `preflight`.
4. Unset `UCM_MCP_TOKEN` and confirm the skill stops at the env check with
   clear guidance.

No unit tests: the skill is a markdown process document, and the executable
logic stays in create-app, which already has a proven publish round-trip.

## Error handling

- Missing env vars: guided setup, then stop.
- Registry unreachable: name the exact URL that failed and the likely causes
  (VPN or Cloudflare Access not active, wrong `UCM_REGISTRY_URL`).
- Version mismatch from `preflight`: print the exact update command.
- Install failure mid-retrofit: report which step failed and what was already
  changed, so the user can re-run safely. All retrofit steps are idempotent.

## Out of scope

- OAuth for the MCP endpoint (the bearer-token seam already exists for later).
- Backend structures (`@ucm/be-structure` stays a reserved placeholder).
- Publishing the plugin to any public marketplace.
