import { timingSafeEqual } from "node:crypto";

// Internal bearer auth. Tokens come from MCP_TOKENS (comma-separated, so a new
// token can be added before the old one is retired). This is intentionally
// simple; the seam for OAuth 2.1 (per-user scoping, audit) is the single
// isAuthorized() call in the HTTP entry.
export function validTokens(): string[] {
  return (process.env.MCP_TOKENS ?? "")
    .split(",")
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

export function isAuthorized(authorizationHeader: string | undefined): boolean {
  const tokens = validTokens();
  if (tokens.length === 0) return false; // fail closed when unconfigured
  if (!authorizationHeader) return false;

  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);
  if (!match || !match[1]) return false;

  const provided = match[1].trim();
  return tokens.some((token) => constantTimeEqual(token, provided));
}

function constantTimeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}
