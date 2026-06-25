import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { TEMPLATES_DIR } from "./paths";
import type { Pattern, PatternSlot } from "./types";

type PatternMeta = {
  name: string;
  mode: "brand" | "product";
  summary: string;
  file: string;
  component: string;
  slots: PatternSlot[];
};

// Hand-authored metadata; the `code` is read from the real template file so it
// can never drift from what actually builds.
const PATTERNS: PatternMeta[] = [
  {
    name: "landing",
    mode: "brand",
    summary:
      "Brand landing page: nav, hero with the GlowButton CTA, three feature cards, a closing CTA band, and the footer.",
    file: "BrandLanding.tsx",
    component: "BrandLanding",
    slots: [
      { name: "nav", description: "Header links and the primary CTA." },
      { name: "hero", description: "Headline, subhead, and the two hero CTAs." },
      {
        name: "features",
        description: "Section heading and the three feature cards (icon, title, body).",
      },
      { name: "cta", description: "Closing CTA band headline and button." },
      { name: "footer", description: "Tagline, link groups, and the legal line." },
    ],
  },
  {
    name: "dashboard",
    mode: "product",
    summary:
      "Product dashboard shell: nav, page header with a primary action, a request form panel and an activity panel, and the footer.",
    file: "ProductDashboard.tsx",
    component: "ProductDashboard",
    slots: [
      { name: "nav", description: "Header links and the account CTA." },
      { name: "header", description: "Page title, subtitle, and the primary action." },
      {
        name: "requestPanel",
        description: "The quick-request form: labels, placeholders, role options, submit.",
      },
      {
        name: "activityPanel",
        description: "The recent-activity list items (icon, text, meta).",
      },
      { name: "footer", description: "Link groups and the legal line." },
    ],
  },
];

// Pull the component names imported from @ucm/ui, dropping `type` imports so the
// list is the real runtime components a caller needs installed.
function parseUiImports(code: string): string[] {
  const match = code.match(
    /import\s*{([^}]*)}\s*from\s*["']@ucm\/ui["']/s,
  );
  if (!match || !match[1]) return [];
  return match[1]
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && !part.startsWith("type "))
    .sort();
}

export function buildPatterns(): Pattern[] {
  return PATTERNS.map((meta) => {
    const code = readFileSync(resolve(TEMPLATES_DIR, meta.file), "utf8");
    return {
      name: meta.name,
      mode: meta.mode,
      summary: meta.summary,
      component: meta.component,
      imports: parseUiImports(code),
      slots: meta.slots,
      code,
    };
  });
}
