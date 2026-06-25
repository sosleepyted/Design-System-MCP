# UCM design-system MCP server (Streamable HTTP). Builds the catalog at image
# time so the deployed server always serves the latest ready components.
FROM node:22-slim

RUN corepack enable
WORKDIR /app

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm catalog:build

ENV PORT=8787
EXPOSE 8787

# MCP_TOKENS must be provided at runtime, e.g.
#   docker run -e MCP_TOKENS=secret-a,secret-b -p 8787:8787 ucm-mcp
CMD ["pnpm", "--filter", "@ucm/mcp-server", "start:http"]
