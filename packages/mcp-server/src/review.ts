import { runChecks, RULE_IDS, type Finding } from "@ucm/rules";
import { loadCatalog } from "./catalog";
import type { Mode } from "./types";

// review_code reuses the shared mechanical checks (so it never drifts from CI)
// and adds the semantic checks it can manage from the catalog: a brand-only
// component used in product mode, and a className that fights a component's own
// surface.

const SURFACE_COMPONENTS = ["Button", "BrandButton", "GlowButton", "Card"];

export function reviewCode(code: string, mode: Mode): Finding[] {
  const findings = runChecks(code, { banUiRuntimeDeps: true });
  findings.push(...wrongModeFindings(code, mode));
  findings.push(...classNameFightFindings(code));
  return findings.sort((a, b) => a.line - b.line);
}

function componentModes(): Map<string, string> {
  const map = new Map<string, string>();
  for (const c of loadCatalog().components) map.set(c.name, c.mode);
  return map;
}

function lineOf(code: string, needle: string): number {
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i]!.includes(needle)) return i + 1;
  }
  return 1;
}

// Only the unambiguous direction: an expressive brand component (yellow / glow)
// in the restrained product app. Shared atoms and product surfaces used in brand
// pages are fine, so we do not flag those.
function wrongModeFindings(code: string, mode: Mode): Finding[] {
  if (mode !== "product") return [];
  const modes = componentModes();
  const out: Finding[] = [];
  const seen = new Set<string>();
  for (const match of code.matchAll(/<([A-Z][A-Za-z0-9]*)/g)) {
    const name = match[1]!;
    if (seen.has(name)) continue;
    seen.add(name);
    if (modes.get(name) === "brand") {
      out.push({
        rule: RULE_IDS.modes,
        severity: "error",
        message: `${name} is a brand component; never use it in product mode (never mix modes).`,
        line: lineOf(code, `<${name}`),
        match: `<${name}`,
      });
    }
  }
  return out;
}

// A className that sets a background or text color on a component that owns its
// surface is almost always fighting the design system.
function classNameFightFindings(code: string): Finding[] {
  const out: Finding[] = [];
  const lines = code.split("\n");
  lines.forEach((text, index) => {
    for (const name of SURFACE_COMPONENTS) {
      const tag = new RegExp(`<${name}\\b[^>]*className="[^"]*(bg-\\[|text-\\[)`);
      if (tag.test(text)) {
        out.push({
          rule: "classname-fight",
          severity: "warn",
          message: `className on ${name} overrides its own surface or text color; prefer the component's variants.`,
          line: index + 1,
          match: name,
        });
      }
    }
  });
  return out;
}
