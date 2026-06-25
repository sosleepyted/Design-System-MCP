// Mechanical UCM design-rule checks. Pure string in, findings out, zero deps.
// Shared by the CI lint (per file) and the MCP review_code tool (per snippet)
// so enforcement never drifts between them. Rule ids come from the single-source
// manifest.
import { RULE_IDS } from "./manifest";

export {
  RULES,
  RULE_IDS,
  type Rule,
  type RuleSeverity,
  type RuleEnforcement,
} from "./manifest";

export type Severity = "error" | "warn";

export type Finding = {
  rule: string;
  severity: Severity;
  message: string;
  line: number;
  match: string;
};

export type CheckOptions = {
  /** Apply the @mui / @emotion import ban (always on for shipped @ucm/ui). */
  banUiRuntimeDeps?: boolean;
};

// The documented palette: triad, status, named surfaces, and the known shades
// used by existing components. Any other hex is an undocumented hue.
const ALLOWED_HEX = new Set([
  "#001e2b", // ink
  "#0a0f14", // hero-dark
  "#0a2a37", // brand dark button hover
  "#0a2d3c", // product button hover
  "#0f5e2a", // success
  "#8c2424", // danger hover
  "#a32d2d", // danger
  "#edecea", // light-gray
  "#f0f0eb", // ink-on-dark
  "#f1f6f4", // glow
  "#f5f5f3", // page
  "#f7f7f7", // faint-gray
  "#f8f5ee", // cream
  "#fcc224", // accent
  "#ffd84d", // accent-hover
  "#ffffff", // card (the one sanctioned white, only as a card surface)
]);

const EMOJI =
  /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2705}\u{274C}\u{2B00}-\u{2BFF}\u{FE0F}]/u;
const LAYOUT_PROP = /(width|height|top|left|margin|padding|font-size)/;

export function runChecks(
  code: string,
  options: CheckOptions = {},
): Finding[] {
  const findings: Finding[] = [];
  const lines = code.split("\n");

  lines.forEach((text, index) => {
    const line = index + 1;
    // Escape hatch for lines that legitimately quote a banned token (e.g. docs
    // that explain a rule). Em dash and emoji are still never allowed.
    if (text.includes("ucm-lint-ignore")) return;
    const add = (rule: string, severity: Severity, message: string, match: string) =>
      findings.push({ rule, severity, message, line, match });

    if (text.includes("—")) {
      add(RULE_IDS.emDash, "error", "Em dash; use a comma (rule 1.1).", "—");
    }

    const emoji = text.match(EMOJI);
    if (emoji) {
      add(
        RULE_IDS.emoji,
        "error",
        "Emoji; use the Material Symbols Icon component (rule 1.8).",
        emoji[0],
      );
    }

    // Pure black / white as ink or surface. #ffffff is allowed (card only).
    const bw = text.match(/#(?:000000|000|fff)\b/i);
    if (bw) {
      add(
        RULE_IDS.pureBlackWhite,
        "error",
        "Pure black or white as ink or surface; use the ink and page tokens (rule 1.4).",
        bw[0],
      );
    }

    // Undocumented hues.
    for (const hex of text.matchAll(/#[0-9a-f]{6}\b/gi)) {
      const value = hex[0].toLowerCase();
      if (value === "#000000") continue; // covered by no-pure-black-white
      if (!ALLOWED_HEX.has(value)) {
        add(
          RULE_IDS.triad,
          "error",
          `Hue ${hex[0]} is outside the triad and documented accents (rule 1.4).`,
          hex[0],
        );
      }
    }

    if (/\btransition-all\b/.test(text)) {
      add(
        RULE_IDS.transitionAll,
        "error",
        "transition-all; transition only transform, opacity, and clip-path (rule 1.6).",
        "transition-all",
      );
    }
    const arbitraryTransition = text.match(/transition-\[[^\]]*\]/);
    if (arbitraryTransition && LAYOUT_PROP.test(arbitraryTransition[0])) {
      add(
        RULE_IDS.layoutAnimation,
        "error",
        "Animating a layout property; animate transform / opacity / clip-path only (rule 1.6).",
        arbitraryTransition[0],
      );
    }

    if (options.banUiRuntimeDeps) {
      const dep = text.match(/@(?:mui|emotion)\/[\w-]+/);
      if (dep && /\bimport\b|\brequire\b|from\s*["']/.test(text)) {
        add(
          RULE_IDS.muiEmotion,
          "error",
          "@mui / @emotion must never enter @ucm/ui (zero-runtime guarantee).",
          dep[0],
        );
      }
    }

    const eyebrow = text.match(/uppercase\s+tracking-\[/);
    if (eyebrow) {
      add(
        RULE_IDS.eyebrow,
        "warn",
        "Possible eyebrow (uppercase letter-spaced); allowed only for acronyms or data (rule 1.2).",
        eyebrow[0],
      );
    }
  });

  return findings;
}

export function hasErrors(findings: Finding[]): boolean {
  return findings.some((f) => f.severity === "error");
}
