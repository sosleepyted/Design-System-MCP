import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
// src -> packages/catalog -> packages -> repo root
export const REPO_ROOT = resolve(here, "..", "..", "..");

export const UI_SRC = resolve(REPO_ROOT, "packages/ui/src");
export const UI_PKG = resolve(REPO_ROOT, "packages/ui/package.json");
export const UI_TSCONFIG = resolve(REPO_ROOT, "packages/ui/tsconfig.json");
export const TOKENS_CSS = resolve(UI_SRC, "foundation/styles/tokens.css");
export const MOTION_CSS = resolve(UI_SRC, "foundation/styles/motion.css");

export const DOCS_COMPONENTS = resolve(
  REPO_ROOT,
  "apps/docs/src/content/components",
);
// Resolved --font-* values live in the app, not the library (tokens.css only
// declares the names). Step 1 mandates reading them from here.
export const DOCS_GLOBALS_CSS = resolve(
  REPO_ROOT,
  "apps/docs/src/styles/globals.css",
);

// Blessed page templates that get_pattern serves. Their source is read verbatim
// as the pattern code, so what the MCP returns is always real, buildable JSX.
export const TEMPLATES_DIR = resolve(REPO_ROOT, "apps/docs/src/templates");

export const OUT_DIR = resolve(REPO_ROOT, "packages/catalog/dist");
export const OUT_FILE = resolve(OUT_DIR, "catalog.json");

// Auto-discover component sources so new components are picked up without
// editing this list. We scan the mode directories (product, brand, shared) plus
// the one foundation atom we treat as a component (Icon); the rest of
// foundation (cx, locale) is infrastructure, not catalog components.
const COMPONENT_ROOTS = ["product", "brand", "shared", "foundation/icon"];

function walkTsx(dir: string, out: string[]): void {
  if (!existsSync(dir)) return; // directory may not exist yet
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTsx(full, out);
    } else if (
      /^[A-Z][A-Za-z0-9]*\.tsx$/.test(entry.name) &&
      !entry.name.endsWith(".test.tsx")
    ) {
      out.push(full);
    }
  }
}

export function discoverComponentFiles(): string[] {
  const out: string[] = [];
  for (const root of COMPONENT_ROOTS) {
    walkTsx(resolve(UI_SRC, root), out);
  }
  return out.sort();
}
