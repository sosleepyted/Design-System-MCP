import { readFileSync } from "node:fs";
import { DOCS_GLOBALS_CSS, MOTION_CSS, TOKENS_CSS } from "./paths";
import type { MotionEntry, TokenEntry, TokenSet } from "./types";

type RawToken = { name: string; value: string };

// Match `--name: value;` declarations.
const DECL = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;

export function buildTokenSet(): TokenSet {
  const fontResolutions = parseFontResolutions();
  const raw = parseDeclarations(readFileSync(TOKENS_CSS, "utf8"));

  const set: TokenSet = {
    color: [],
    type: [],
    spacing: [],
    radius: [],
    shadow: [],
    other: [],
    motion: parseMotion(),
  };

  for (const token of raw) {
    const value = resolveValue(token.value, fontResolutions);
    const entry: TokenEntry = { name: token.name, value };
    bucketFor(set, token.name).push(entry);
  }

  return set;
}

function bucketFor(set: TokenSet, name: string): TokenEntry[] {
  const segment = name.replace(/^--/, "").split("-")[0] ?? "";
  switch (segment) {
    case "color":
      return set.color;
    case "font":
    case "text":
    case "type":
      return set.type;
    case "space":
    case "spacing":
    case "gap":
      return set.spacing;
    case "radius":
    case "rounded":
      return set.radius;
    case "shadow":
      return set.shadow;
    default:
      return set.other;
  }
}

function parseDeclarations(css: string): RawToken[] {
  const out: RawToken[] = [];
  for (const match of css.matchAll(DECL)) {
    const name = match[1];
    const value = match[2];
    // Collapse internal newlines/runs of whitespace so multi-line stacks emit
    // as a single clean value.
    if (name && value) out.push({ name, value: value.replace(/\s+/g, " ").trim() });
  }
  return out;
}

// Resolve the actual font stacks from the docs app `:root`, since tokens.css
// only declares self-referential `--font-*: var(--font-*)` placeholders.
function parseFontResolutions(): Record<string, string> {
  const css = readFileSync(DOCS_GLOBALS_CSS, "utf8");
  const root = css.match(/:root\s*{([^}]*)}/);
  const resolutions: Record<string, string> = {};
  if (!root || !root[1]) return resolutions;
  for (const token of parseDeclarations(root[1] + ";")) {
    resolutions[token.name] = token.value;
  }
  return resolutions;
}

// Replace `var(--font-x)` references with the resolved app value. A token that
// resolves only to another unresolved var is dropped to its literal var() so we
// never emit a circular placeholder.
function resolveValue(
  value: string,
  resolutions: Record<string, string>,
): string {
  return value.replace(/var\((--[a-z0-9-]+)\)/gi, (whole, ref: string) => {
    const resolved = resolutions[ref];
    if (resolved && resolved !== whole) return resolved;
    return whole;
  });
}

// Extract animation utilities and keyframes intent from motion.css so the
// catalog can describe motion as real, named primitives.
function parseMotion(): MotionEntry[] {
  const css = readFileSync(MOTION_CSS, "utf8");
  // Drop @media blocks (e.g. prefers-reduced-motion sets `animation: none`,
  // which is not a real primitive) before reading the animation utilities.
  const base = css.replace(/@media[^{]*{[\s\S]*?}\s*}/g, "");
  const out: MotionEntry[] = [];
  const seen = new Set<string>();

  for (const match of base.matchAll(/\.(animate-[a-z0-9-]+)\s*{([^}]*)}/gi)) {
    const name = match[1];
    const body = match[2];
    const animation = body?.match(/animation\s*:\s*([^;]+);/i);
    const value = animation?.[1]?.trim();
    if (name && value && value !== "none" && !seen.has(name)) {
      seen.add(name);
      out.push({ name: `.${name}`, value });
    }
  }

  for (const match of css.matchAll(/@keyframes\s+([a-z0-9-]+)/gi)) {
    const name = match[1];
    if (name) out.push({ name: `@keyframes ${name}`, value: "keyframes" });
  }

  return out;
}
