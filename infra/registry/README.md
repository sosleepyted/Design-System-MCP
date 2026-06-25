# UCM private registry (Verdaccio)

The MCP server is a discovery layer over `@ucm/ui`; its output (imports, examples)
is useless unless the package is installed. This registry is where `@ucm/ui` (and
any future `@ucm/*` package) lives so that `npx @ucm/create-app` and the MCP
`preflight` tool can resolve it.

The scope stays `@ucm/*` on purpose: it is the on-brand import surface baked into
the MCP output, the catalog, and the templates. A self-hosted registry keeps that
name and keeps the packages private.

## Run it

### Locally (Node, no Docker)

```bash
cd infra/registry
npx verdaccio@6 --config config.yaml      # serves http://localhost:4873
```

### With Docker

```bash
docker compose -f infra/registry/docker-compose.yml up -d   # http://localhost:4873
```

## First-time setup

Create a publishing account (only needed to publish, not to install):

```bash
npm adduser --registry http://localhost:4873
```

After you have the accounts you need, set `auth.htpasswd.max_users: -1` in
`config.yaml` to disable open self-registration.

## Publish `@ucm/ui`

From the repo root:

```bash
pnpm --filter @ucm/ui build
pnpm --filter @ucm/ui publish --registry http://localhost:4873 --no-git-checks
```

`packages/ui/package.json` already pins `publishConfig.registry`, so plain
`npm publish` from that package also targets this registry. Bump the version first
(`@ucm/ui` is the source of the catalog version, see below).

### Version coupling

`preflight` reports a mismatch unless the installed `@ucm/ui` equals the catalog
version. The catalog reads its version straight from `packages/ui/package.json`
(`packages/catalog/src/build.ts`), so the flow is always:

1. Bump `packages/ui/package.json` version.
2. `pnpm catalog:build` (regenerates `catalog.json` at the new version).
3. `pnpm --filter @ucm/ui build && pnpm --filter @ucm/ui publish`.

## Consuming `@ucm/ui`

Apps scaffolded with `npx @ucm/create-app` get an `.npmrc` mapping the `@ucm`
scope to this registry, so `npm install` resolves `@ucm/ui` automatically. To
point an app at a different registry host:

```bash
npx @ucm/create-app my-app --registry https://registry.ucm.internal
```

Any other project just needs this line in its `.npmrc`:

```
@ucm:registry=http://localhost:4873
```

## Production

Run the container on the same host as the MCP server (Hetzner, EU/GDPR) behind a
Cloudflare Tunnel + Access, with no public port. The network perimeter is the
auth boundary: reads inside it are open, publishing requires an npm token. If you
need npm-level auth for reads as well, change `@ucm/*` `access` to
`$authenticated` in `config.yaml` and ship a read-only token in consumer
`.npmrc` files.
