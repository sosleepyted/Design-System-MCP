import { readFileSync } from "node:fs";

// react-docgen-typescript does not reliably read default values from
// destructured function parameters (`{ variant = "primary" }`), which is the
// pattern every @ucm/ui component uses. We recover literal defaults by scanning
// ONLY the component's destructuring regions, never the whole file, so JSX
// attributes like `className="size-3"` are not mistaken for prop defaults.
export function extractDefaults(
  filePath: string,
  propNames: string[],
): Record<string, string> {
  const source = readFileSync(filePath, "utf8");
  const regions = destructuringRegions(source);
  const defaults: Record<string, string> = {};

  for (const name of propNames) {
    const pattern = new RegExp(
      `\\b${escapeRegExp(name)}\\s*=\\s*("[^"]*"|'[^']*'|true|false|-?\\d+(?:\\.\\d+)?)`,
    );
    for (const region of regions) {
      const match = region.match(pattern);
      if (match && match[1] !== undefined) {
        defaults[name] = normalizeLiteral(match[1]);
        break;
      }
    }
  }

  return defaults;
}

// Isolate the destructuring bodies where defaults legitimately live:
//   function Name({ a = 1, b }) {...}        -> param destructuring
//   function Name(props) { const { a = 1 } = props } -> body destructuring
function destructuringRegions(source: string): string[] {
  const regions: string[] = [];

  for (const match of source.matchAll(
    /function\s+[A-Za-z0-9_]+\s*\(\s*{([^}]*)}/g,
  )) {
    if (match[1]) regions.push(match[1]);
  }
  for (const match of source.matchAll(/const\s*{([^}]*)}\s*=\s*props/g)) {
    if (match[1]) regions.push(match[1]);
  }

  return regions;
}

function normalizeLiteral(raw: string): string {
  if (raw.startsWith("'") && raw.endsWith("'")) {
    return `"${raw.slice(1, -1)}"`;
  }
  return raw;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
