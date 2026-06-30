# Deploying the UCM design system service

Two long-running services: the MCP server (a discovery layer over `@ucm/ui`) and
the private registry that hosts `@ucm/ui`. Both run as containers behind a
Cloudflare Tunnel so neither needs a public port, with Cloudflare Access in front
for zero-trust auth. Recommended host: Hetzner (EU/GDPR, near the Berlin team).

## What is in this folder

- `docker-compose.yml` runs `mcp`, `registry`, and `tunnel` together.
- `.env.example` lists the two secrets you must supply (`MCP_TOKENS`,
  `TUNNEL_TOKEN`). Copy to `.env`; never commit the real file.

## One-time setup

1. Provision a small host (2 vCPU / 4 GB is plenty). Install Docker + compose.
2. In Cloudflare Zero Trust, create a Tunnel and copy its token. Add two public
   hostnames routed at the tunnel:
   - `mcp.ucm.<domain>` to `http://mcp:8787`
   - `registry.ucm.<domain>` to `http://registry:4873`
3. Put a Cloudflare Access policy on both hostnames (the team's identity provider
   or an email allowlist). This is the auth perimeter; the registry trusts it.
4. `cp infra/deploy/.env.example infra/deploy/.env` and fill in both secrets.
   Generate `MCP_TOKENS` with `openssl rand -hex 32`.

## Bring it up

```bash
docker compose -f infra/deploy/docker-compose.yml --env-file infra/deploy/.env up -d --build
```

Verify:

```bash
docker compose -f infra/deploy/docker-compose.yml ps
curl https://mcp.ucm.<domain>/health        # {"ok":true} (through Access)
```

## Publish @ucm/ui to the deployed registry

From a machine with repo access and a registry account:

```bash
npm adduser --registry https://registry.ucm.<domain>
pnpm --filter @ucm/ui build
pnpm --filter @ucm/ui publish --registry https://registry.ucm.<domain> --no-git-checks
```

Set `auth.htpasswd.max_users: -1` in `infra/registry/config.yaml` after the
accounts exist, then redeploy, to disable open self-registration.

## Point teams at it

Hand out `MCP_TOKENS` value and the server URL, then:

```bash
npx @ucm/create-app my-app \
  --url https://mcp.ucm.<domain>/mcp \
  --token <one-of-MCP_TOKENS> \
  --registry https://registry.ucm.<domain>
```

## Notes

- The MCP server runs `tsx src/http.ts` (TypeScript at runtime, by design). The
  image builds the catalog at build time so it always serves the latest ready
  components.
- The server is stateless: each POST gets a fresh transport, which suits the
  read-only tools and keeps scaling trivial.
- Auth seam: `isAuthorized()` in `packages/mcp-server/src/auth.ts` is where
  OAuth 2.1 (per-user scoping, audit) would slot in later.
