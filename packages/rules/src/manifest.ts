// The canonical UCM global rules: a single source of truth. The mechanical
// checks (checks.ts), review_code, the catalog, and the MCP get_rules tool all
// reference this, so the rules cannot drift between enforcement and docs.

export type RuleSeverity = "error" | "warn" | "advisory";
export type RuleEnforcement = "lint" | "review" | "authoring";

export type Rule = {
  id: string;
  title: string;
  statement: string;
  severity: RuleSeverity;
  /** Where the rule is caught: CI lint, the review_code tool, or at authoring time. */
  enforcedBy: RuleEnforcement[];
  /** Reference into DESIGN-SYSTEM.md, or the concept name. */
  reference: string;
};

// Stable ids. The mechanical checks emit these exact ids in their findings.
export const RULE_IDS = {
  modes: "modes",
  bilingual: "bilingual",
  emDash: "no-em-dash",
  emoji: "no-emoji",
  eyebrow: "no-eyebrow",
  widow: "widow-control",
  pureBlackWhite: "no-pure-black-white",
  triad: "triad-only",
  transitionAll: "no-transition-all",
  layoutAnimation: "no-layout-animation",
  muiEmotion: "no-mui-emotion",
  hierarchy: "hierarchy",
} as const;

export const RULES: Rule[] = [
  {
    id: RULE_IDS.modes,
    title: "Never mix modes",
    statement:
      "Brand mode is expressive marketing (yellow CTAs, glow); product mode is the restrained internal app (navy, no glow). Choose one per surface and never mix them.",
    severity: "error",
    enforcedBy: ["review", "authoring"],
    reference: "modes",
  },
  {
    id: RULE_IDS.bilingual,
    title: "Bilingual by default",
    statement:
      "Every visible string is a bilingual { de, en } label via the locale layer, default German. A string is not done until both languages exist.",
    severity: "error",
    enforcedBy: ["authoring"],
    reference: "§1.5",
  },
  {
    id: RULE_IDS.emDash,
    title: "No em dashes",
    statement:
      "No em dashes in any shipped string, including code comments. Use a comma, or 'to' / 'bis' for ranges.",
    severity: "error",
    enforcedBy: ["lint", "review"],
    reference: "§1.1",
  },
  {
    id: RULE_IDS.emoji,
    title: "No emoji",
    statement:
      "No emoji anywhere. Use the Material Symbols Icon component for all iconography; where no icon fits, use a plain word.",
    severity: "error",
    enforcedBy: ["lint", "review"],
    reference: "§1.8",
  },
  {
    id: RULE_IDS.eyebrow,
    title: "No eyebrows",
    statement:
      "No uppercase letter-spaced kickers. Uppercase only for acronyms like UCM or for data.",
    severity: "warn",
    enforcedBy: ["lint", "review"],
    reference: "§1.2",
  },
  {
    id: RULE_IDS.widow,
    title: "No widows",
    statement:
      "The last line carries at least 3 words on mobile and 5 on desktop. Bind the final words with non-breaking spaces or rewrite the line.",
    severity: "advisory",
    enforcedBy: ["authoring"],
    reference: "§1.3",
  },
  {
    id: RULE_IDS.pureBlackWhite,
    title: "No pure black or white",
    statement:
      "Never pure black or white as ink or surface. Ink is #001E2B, page is #F5F5F3; white is allowed only as a card surface.",
    severity: "error",
    enforcedBy: ["lint", "review"],
    reference: "§1.4",
  },
  {
    id: RULE_IDS.triad,
    title: "Triad only",
    statement:
      "One triad: cream page, navy ink, yellow accent. Status and named-surface tokens are accents; no undocumented hues.",
    severity: "error",
    enforcedBy: ["lint", "review"],
    reference: "§1.4",
  },
  {
    id: RULE_IDS.transitionAll,
    title: "No transition-all",
    statement:
      "Never transition-all. Transition only transform, opacity, and clip-path.",
    severity: "error",
    enforcedBy: ["lint", "review"],
    reference: "§1.6",
  },
  {
    id: RULE_IDS.layoutAnimation,
    title: "No layout animation",
    statement:
      "Never animate layout properties (width, height, top, left, margin, padding, font-size). Animate compositor-friendly properties only.",
    severity: "error",
    enforcedBy: ["lint", "review"],
    reference: "§1.6",
  },
  {
    id: RULE_IDS.muiEmotion,
    title: "No @mui / @emotion in @ucm/ui",
    statement:
      "@mui and @emotion must never enter @ucm/ui. The library stays zero-runtime and server-render safe.",
    severity: "error",
    enforcedBy: ["lint", "review"],
    reference: "architecture",
  },
  {
    id: RULE_IDS.hierarchy,
    title: "Hierarchy through contrast",
    statement:
      "Adjacent type steps differ by at least 1.25x in size or weight. Headings are light weight with tight tracking.",
    severity: "advisory",
    enforcedBy: ["authoring"],
    reference: "§1.7",
  },
];
