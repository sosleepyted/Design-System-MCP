import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  Catalog,
  ComponentEntry,
  Mode,
  Pattern,
  Rule,
  TokenCategory,
} from "./types";

const here = dirname(fileURLToPath(import.meta.url));

// Default to the sibling catalog package's build output. CATALOG_PATH overrides
// it (used by the deployed server, which bundles its own catalog.json).
function catalogPath(): string {
  return (
    process.env.CATALOG_PATH ??
    resolve(here, "..", "..", "catalog", "dist", "catalog.json")
  );
}

let cached: Catalog | null = null;

export function loadCatalog(): Catalog {
  if (cached) return cached;
  const path = catalogPath();
  let raw: string;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    throw new Error(
      `Catalog not found at ${path}. Run \`pnpm catalog:build\` first, or set CATALOG_PATH.`,
    );
  }
  cached = JSON.parse(raw) as Catalog;
  return cached;
}

/** Servable = ready. Draft entries are kept in catalog.json but never served. */
function servable(catalog: Catalog): ComponentEntry[] {
  return catalog.components.filter((c) => c.servable);
}

// A mode filter includes that mode plus shared atoms (an Icon is valid in both
// brand and product). Modes themselves are never mixed by the caller.
function modeMatches(entry: ComponentEntry, mode: Mode | undefined): boolean {
  if (!mode) return true;
  return entry.mode === mode || entry.mode === "shared";
}

export function searchComponents(
  query: string,
  mode?: Mode,
): ComponentEntry[] {
  const catalog = loadCatalog();
  const needle = query.trim().toLowerCase();
  return servable(catalog)
    .filter((c) => modeMatches(c, mode))
    .filter((c) => {
      if (!needle) return true;
      const haystack = [
        c.name,
        c.summary,
        c.example,
        ...c.guidelines.do,
        ...c.guidelines.dont,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getComponent(name: string): ComponentEntry | null {
  const catalog = loadCatalog();
  const wanted = name.trim().toLowerCase();
  // Only ready components are exposed, matching search.
  return (
    servable(catalog).find((c) => c.name.toLowerCase() === wanted) ?? null
  );
}

export function getTokens(category?: TokenCategory) {
  const { tokens } = loadCatalog();
  if (!category) return tokens;
  return { [category]: tokens[category] };
}

export function listPatterns(): Pattern[] {
  return loadCatalog().patterns ?? [];
}

export function listRules(): Rule[] {
  return loadCatalog().rules ?? [];
}

// Reserved seam for the backend-structure skill (@ucm/be-structure). Returns []
// today. A get_structure tool will be registered once the skill ships; until
// then there is no half-working tool to mislead the agent.
export function listStructures() {
  return loadCatalog().structures ?? [];
}

export function getPattern(name: string, mode?: Mode): Pattern | null {
  const wanted = name.trim().toLowerCase();
  const matches = listPatterns().filter(
    (p) => p.name.toLowerCase() === wanted,
  );
  if (matches.length === 0) return null;
  // When a mode is given, prefer the pattern in that mode.
  if (mode) return matches.find((p) => p.mode === mode) ?? matches[0] ?? null;
  return matches[0] ?? null;
}
