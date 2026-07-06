# Setting up the vibecoding environment

This page gets a developer from zero to a working vibecoding setup. The design
system repo is the environment: it runs the UCM design system MCP server, the
private package registry, and the `@ucm/ui` component library on your machine.
Your app lives in its own folder next to the clone and consumes all three.

The environment covers the UI only. Pages, components, and styling come out
on-brand by default; backend services, databases, and APIs are not part of
the design system. The scaffolded app is a frontend that you connect to your
own services.

How to build once you are set up is covered in Vibecoding with the UCM Design
System (link the Confluence page here). This page only covers the environment.

When the hosted server goes live, only the server URL and the token change;
every other step on this page stays the same.

## What you need

- Access to the private GitHub repo
  `github.com/sosleepyted/Design-System-MCP` (ask the design system team).
- Node 20 or newer, pnpm, and npm.
- Claude Code.

## One-time setup

Clone the design system repo:

```
git clone https://github.com/sosleepyted/Design-System-MCP.git
```

That is the whole one-time setup. Everything else happens per project.

## Starting a project

### Step 1: Pull and build the latest design system

From the clone:

```
git pull
pnpm install
pnpm catalog:build
```

The pull brings in the current rules and components; `pnpm catalog:build`
writes the component catalog that the MCP server serves. This way every
project starts from the latest design system.

### Step 2: Start the package registry

In its own terminal, from the repo folder:

```
cd infra/registry
npx verdaccio@6 --config config.yaml
```

The registry now serves `http://localhost:4873`. It hosts the private `@ucm`
packages and proxies everything else to npmjs. It only needs to run while you
install packages; the MCP server (step 4) is the one that stays on.

### Step 3: Publish the component library into the registry

Installing from the registry is open, but publishing needs an account on it.
Create one the first time; skip `npm adduser` after that. Then build and
publish, from the repo folder:

```
npm adduser --registry http://localhost:4873
pnpm --filter @ucm/ui build
pnpm --filter @ucm/ui publish --registry http://localhost:4873 --no-git-checks
```

If the registry already has this version, the publish stops with a conflict
error. That only means the registry is already current; move on.

### Step 4: Start the MCP server

In another terminal, from the repo folder. Pick a token first; any long random
string works, for example the output of `openssl rand -hex 32`:

```
MCP_TOKENS=[your token] pnpm --filter @ucm/mcp-server start:http
```

The server now answers on `http://localhost:8787/mcp` and expects your token
as a bearer token. This is the process Claude talks to. Keep it running while
you vibecode.

### Step 5: Scaffold your app

From the folder where your app should live, not inside the repo clone:

```
node [path to the clone]/packages/create-app/index.mjs my-app --url http://localhost:8787/mcp --token [your token]
```

One command wires everything: the registry mapping (`.npmrc`), the `@ucm/ui`
install, the server connection (`.mcp.json`), and the `/ucm-setup` and
`/ucm-page` commands. The registry defaults to `http://localhost:4873`, so no
extra flag is needed.

Once `@ucm/create-app` is published to a registry your npm can reach, the same
scaffold becomes `npx @ucm/create-app my-app --url [server URL] --token [your
token]`.

## Every session on the same project

1. Start the MCP server (step 4). Start the registry too if you plan to
   install packages.
2. Open your app folder in Claude Code and build.

Pulling the repo again is only for new projects; a running project keeps the
design system version it started with unless you decide to update.

## Verify it works

- `curl http://localhost:8787/health` answers `{"ok":true}`.
- In Claude Code, inside your app, run `/ucm-setup`. It verifies the server
  connection and the library install, and repairs whatever is missing.

## What the environment gives Claude

- Seven design system tools: `get_rules`, `get_pattern`, `search_components`,
  `get_component`, `get_tokens`, `preflight`, `review_code`.
- The 16 components of `@ucm/ui` across brand, product, and shared modes.
- Two blessed page templates: landing (brand mode) and dashboard (product
  mode).
- A reviewer, `review_code`, that checks the result against the same rules
  that gate CI.

## Next step

Open Vibecoding with the UCM Design System (link the Confluence page here) and
build your first page with `/ucm-page`.
