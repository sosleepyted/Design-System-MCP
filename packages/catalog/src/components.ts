import { withCustomConfig } from "react-docgen-typescript";
import type { ComponentDoc, PropItem } from "react-docgen-typescript";
import { discoverComponentFiles, UI_TSCONFIG } from "./paths";
import { extractDefaults } from "./defaults";
import { exampleFor } from "./examples";
import { findDocForComponent, loadMdxDocs } from "./mdx";
import type { ComponentEntry, Mode, PropEntry } from "./types";

// Keep only props declared in @ucm/ui source. Inherited DOM/React props live in
// node_modules and are noise for the catalog.
const parser = withCustomConfig(UI_TSCONFIG, {
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  savePropValueAsString: true,
  propFilter: (prop: PropItem) => {
    if (prop.parent) return !prop.parent.fileName.includes("node_modules");
    return true;
  },
});

export function buildComponents(): ComponentEntry[] {
  const docs = loadMdxDocs();
  const parsed = parser.parse(discoverComponentFiles());
  const entries: ComponentEntry[] = [];

  for (const doc of parsed) {
    const filePath = doc.filePath;
    const mode = modeFromPath(filePath);
    if (!mode) continue;

    const props = toProps(doc, filePath);
    const mdx = findDocForComponent(docs, doc.displayName);
    const status = mdx?.status ?? "draft";

    entries.push({
      name: doc.displayName,
      mode,
      status,
      servable: status === "ready",
      summary: mdx?.summary ?? doc.description ?? "",
      props,
      import: "@ucm/ui",
      example: exampleFor(doc.displayName),
      guidelines: mdx?.guidelines ?? { do: [], dont: [] },
    });
  }

  return entries.sort((a, b) => a.name.localeCompare(b.name));
}

// Mode is structural: source directory, not MDX frontmatter (icon.mdx labels
// the Icon `product`, but a foundation atom is shared).
function modeFromPath(filePath: string): Mode | null {
  if (filePath.includes("/product/")) return "product";
  if (filePath.includes("/brand/")) return "brand";
  if (filePath.includes("/shared/")) return "shared";
  if (filePath.includes("/foundation/")) return "shared";
  return null;
}

function toProps(doc: ComponentDoc, filePath: string): PropEntry[] {
  const names = Object.keys(doc.props);
  const literalDefaults = extractDefaults(filePath, names);

  return names
    .map((name): PropEntry => {
      const prop = doc.props[name]!;
      const docgenDefault = prop.defaultValue?.value;
      const fallback = literalDefaults[name];
      const resolved =
        docgenDefault !== undefined && docgenDefault !== null
          ? String(docgenDefault)
          : (fallback ?? null);

      return {
        name,
        type: prop.type.name,
        required: prop.required,
        default: resolved,
        description: prop.description ?? "",
      };
    })
    .sort((a, b) => {
      // Required first, then alphabetical, for stable readable output.
      if (a.required !== b.required) return a.required ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}
