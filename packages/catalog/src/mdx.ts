import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { DOCS_COMPONENTS } from "./paths";
import type { Guidelines, Status } from "./types";

export type MdxDoc = {
  file: string;
  title: string;
  summary: string;
  status: Status;
  guidelines: Guidelines;
  /** Component names this doc documents, parsed from the availability table. */
  components: string[];
  raw: string;
};

// One MDX file can document several components (brand-button.mdx covers both
// BrandButton and GlowButton). We map docs to components by reading the
// backtick-wrapped names in the "Web" availability row, which is the precise,
// structured signal and avoids "Button" matching inside "BrandButton".
export function loadMdxDocs(): MdxDoc[] {
  const files = readdirSync(DOCS_COMPONENTS).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = readFileSync(join(DOCS_COMPONENTS, file), "utf8");
    const { data, content } = matter(raw);
    return {
      file,
      title: String(data.title ?? file),
      summary: String(data.summary ?? ""),
      status: data.status === "draft" ? "draft" : "ready",
      guidelines: parseGuidelines(data.guidelines),
      components: parseAvailabilityComponents(content),
      raw,
    };
  });
}

function parseGuidelines(value: unknown): Guidelines {
  const source = (value ?? {}) as { do?: unknown; dont?: unknown };
  const toStrings = (list: unknown): string[] =>
    Array.isArray(list) ? list.filter((x): x is string => typeof x === "string") : [];
  return { do: toStrings(source.do), dont: toStrings(source.dont) };
}

// Pull `@ucm/ui` -> `Name`, `Other` component references out of the availability
// table. Matches every backticked PascalCase token on a line that mentions
// `@ucm/ui`.
function parseAvailabilityComponents(content: string): string[] {
  const names = new Set<string>();
  for (const line of content.split("\n")) {
    if (!line.includes("@ucm/ui")) continue;
    const backticked = line.matchAll(/`([^`]+)`/g);
    for (const [, token] of backticked) {
      if (!token) continue;
      for (const word of token.split(/[^A-Za-z0-9]+/)) {
        if (/^[A-Z][A-Za-z0-9]+$/.test(word)) names.add(word);
      }
    }
  }
  return [...names];
}

/** Find the doc that documents a given component name. */
export function findDocForComponent(
  docs: MdxDoc[],
  componentName: string,
): MdxDoc | undefined {
  return docs.find((doc) => doc.components.includes(componentName));
}
