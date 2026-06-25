import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "./server";
import { isAuthorized, validTokens } from "./auth";

// Streamable HTTP transport (not the deprecated SSE transport). Stateless: each
// POST gets a fresh server and transport, which suits read-only tools and keeps
// the deploy simple. stdio stays available via `dev` for local use.
const PORT = Number(process.env.PORT ?? 8787);

function unauthorized(res: express.Response): void {
  res.status(401).json({
    jsonrpc: "2.0",
    error: { code: -32001, message: "Unauthorized" },
    id: null,
  });
}

async function main(): Promise<void> {
  if (validTokens().length === 0) {
    console.error(
      "Refusing to start: set MCP_TOKENS (comma-separated bearer tokens).",
    );
    process.exit(1);
  }

  const app = express();
  app.use(express.json({ limit: "4mb" }));

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/mcp", async (req, res) => {
    if (!isAuthorized(req.headers.authorization)) {
      unauthorized(res);
      return;
    }
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    const server = createServer();
    res.on("close", () => {
      void transport.close();
      void server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });

  // Stateless server: no SSE stream or session deletion.
  const methodNotAllowed = (_req: express.Request, res: express.Response) => {
    res.status(405).json({ error: "Method Not Allowed" });
  };
  app.get("/mcp", methodNotAllowed);
  app.delete("/mcp", methodNotAllowed);

  app.listen(PORT, () => {
    console.error(`ucm-design-system MCP server (HTTP) listening on :${PORT}/mcp`);
  });
}

main().catch((error) => {
  console.error("Failed to start HTTP server:", error);
  process.exit(1);
});
