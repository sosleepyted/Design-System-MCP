import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  getComponent,
  getPattern,
  getTokens,
  listPatterns,
  listRules,
  loadCatalog,
  searchComponents,
} from "./catalog";
import { reviewCode } from "./review";
import { preflight } from "./preflight";
import type { ComponentEntry, Pattern, Rule, TokenCategory } from "./types";
import type { Finding } from "@ucm/rules";

const MODE_RULE =
  "Brand mode for marketing pages (ucm.jobs): yellow CTAs, glow, expressive. " +
  "Product mode for the internal app: navy, restrained, no glow. Never mix modes.";

export function createServer(): McpServer {
  const catalog = loadCatalog();
  const server = new McpServer({
    name: "ucm-design-system",
    version: catalog.catalogVersion,
  });

  server.registerTool(
    "search_components",
    {
      title: "Search UCM components",
      description:
        "Use for ANY individual-component UI work at UCM. Returns on-brand " +
        "@ucm/ui components that match your intent by name, summary, or example. " +
        "For a WHOLE PAGE (landing page, dashboard), call get_pattern first " +
        "instead of assembling one from atoms. " +
        MODE_RULE +
        " Pass mode to scope results; shared atoms (like Icon) appear in both. " +
        "Always search here before hand-writing UI: a component that exists must " +
        "not be reinvented.",
      inputSchema: {
        query: z
          .string()
          .describe("Intent or component name, e.g. 'button', 'cta', 'icon'."),
        mode: z
          .enum(["brand", "product"])
          .optional()
          .describe("Scope to brand (marketing) or product (internal app)."),
      },
    },
    async ({ query, mode }) => {
      const results = searchComponents(query, mode);
      return text(renderSearch(query, mode, results));
    },
  );

  server.registerTool(
    "get_component",
    {
      title: "Get a UCM component",
      description:
        "Return the full spec for one @ucm/ui component: mode, props (type, " +
        "required, default), the exact import, a runnable example, and do/dont " +
        "guidelines. Call this before using a component so the output is correct " +
        "by construction. " +
        MODE_RULE,
      inputSchema: {
        name: z
          .string()
          .describe("Exact component name, e.g. 'BrandButton', 'Button', 'Icon'."),
      },
    },
    async ({ name }) => {
      const entry = getComponent(name);
      if (!entry) {
        return text(
          `No servable component named "${name}". Use search_components to find the right one.`,
        );
      }
      return text(renderComponent(entry));
    },
  );

  server.registerTool(
    "get_tokens",
    {
      title: "Get UCM design tokens",
      description:
        "Return the UCM design tokens as real CSS variables and values: the " +
        "color triad (cream page, navy ink, yellow accent), font families, and " +
        "motion primitives. Use these instead of inventing hex values or fonts; " +
        "never use #000 or #fff as ink or surface.",
      inputSchema: {
        category: z
          .enum(["color", "type", "spacing", "radius", "shadow", "other", "motion"])
          .optional()
          .describe("Filter to one token category. Omit for all."),
      },
    },
    async ({ category }) => {
      const tokens = getTokens(category as TokenCategory | undefined);
      return text(renderTokens(tokens));
    },
  );

  server.registerTool(
    "get_pattern",
    {
      title: "Get a blessed UCM page template",
      description:
        "Use this FIRST for any whole-page request (landing page, dashboard, " +
        "marketing page, app shell). Returns a complete, on-brand page composed " +
        "only from real @ucm/ui components, with the editable content slots " +
        "marked. Edit the copy in the slots; do not rearrange the structure or " +
        "swap in hand-written components. " +
        MODE_RULE +
        " Known patterns: " +
        listPatterns()
          .map((p) => `${p.name} (${p.mode})`)
          .join(", ") +
        ". Use get_component only for individual pieces.",
      inputSchema: {
        name: z
          .string()
          .describe("Pattern name, e.g. 'landing' or 'dashboard'."),
        mode: z
          .enum(["brand", "product"])
          .optional()
          .describe("Preferred mode when a pattern exists in more than one."),
      },
    },
    async ({ name, mode }) => {
      const pattern = getPattern(name, mode);
      if (!pattern) {
        const available = listPatterns()
          .map((p) => `${p.name} (${p.mode})`)
          .join(", ");
        return text(
          `No pattern named "${name}". Available patterns: ${available || "none"}.`,
        );
      }
      return text(renderPattern(pattern));
    },
  );

  server.registerTool(
    "get_rules",
    {
      title: "Get the UCM design rules",
      description:
        "Read this BEFORE generating UI. The UCM design system is its rules as " +
        "much as its components: modes, the triad, no em dashes, no emoji, " +
        "bilingual copy, motion discipline, hierarchy. Returns the global rules " +
        "with their severity and how each is enforced (lint, review_code, or " +
        "authoring). review_code checks the mechanical ones; the rest are on you.",
      inputSchema: {
        severity: z
          .enum(["error", "warn", "advisory"])
          .optional()
          .describe("Filter to one severity. Omit for all."),
      },
    },
    async ({ severity }) => {
      const rules = listRules().filter(
        (r) => !severity || r.severity === severity,
      );
      return text(renderRules(rules));
    },
  );

  server.registerTool(
    "preflight",
    {
      title: "Check the UCM setup before generating",
      description:
        "Run this BEFORE generating any UI. Confirms @ucm/ui is installed in the " +
        "caller project and matches the catalog version. If it reports a problem, " +
        "fix it (install or update @ucm/ui) before writing components, because the " +
        "imports and examples this server returns are useless without the package.",
      inputSchema: {},
    },
    async () => {
      const result = preflight();
      return text(
        [
          `catalog version:   ${result.catalogVersion}`,
          `installed @ucm/ui: ${result.installedVersion ?? "not installed"}`,
          `match:             ${result.match ? "yes" : "no"}`,
          "",
          result.action,
        ].join("\n"),
      );
    },
  );

  server.registerTool(
    "review_code",
    {
      title: "Review generated UI against the UCM rules",
      description:
        "Advisory review of generated UI code against the UCM design rules: em " +
        "dashes, emoji, pure black/white, undocumented hues, transition-all and " +
        "layout animation, @mui/@emotion, eyebrows, plus brand components used in " +
        "product mode and className overrides that fight a component. Runs the same " +
        "checks as CI. Pass the mode you generated for. Fix every error before " +
        "finishing.",
      inputSchema: {
        code: z.string().describe("The UI code to review."),
        mode: z
          .enum(["brand", "product"])
          .describe("The mode the code was generated for."),
      },
    },
    async ({ code, mode }) => {
      const findings = reviewCode(code, mode);
      return text(renderFindings(findings));
    },
  );

  // RESERVED: get_structure(name) for the backend-structure skill
  // (@ucm/be-structure). Intentionally not registered yet: `structures` in the
  // catalog is empty, and shipping a tool that returns nothing would mislead the
  // agent. When the skill exists, register it here mirroring get_pattern, reading
  // from listStructures() in catalog.ts.

  return server;
}

type ToolResult = { content: { type: "text"; text: string }[] };

function text(value: string): ToolResult {
  return { content: [{ type: "text", text: value }] };
}

function renderSearch(
  query: string,
  mode: string | undefined,
  results: ComponentEntry[],
): string {
  const scope = mode ? ` in ${mode} mode` : "";
  if (results.length === 0) {
    return `No components match "${query}"${scope}.`;
  }
  const lines = results.map(
    (c) => `- ${c.name} [${c.mode}], ${c.summary}`,
  );
  return [
    `${results.length} component(s) for "${query}"${scope}:`,
    ...lines,
    "",
    "Call get_component(name) for props, import, example, and guidelines.",
  ].join("\n");
}

function renderComponent(entry: ComponentEntry): string {
  const props =
    entry.props.length === 0
      ? "  (none)"
      : entry.props
          .map((p) => {
            const req = p.required ? "required" : "optional";
            const def = p.default !== null ? `, default ${p.default}` : "";
            const desc = p.description ? `, ${p.description.replace(/\s+/g, " ")}` : "";
            return `  - ${p.name}: ${p.type} (${req}${def})${desc}`;
          })
          .join("\n");

  const guide = renderGuidelines(entry);

  return [
    `${entry.name} [${entry.mode}/${entry.status}]`,
    entry.summary,
    "",
    `import: ${entry.import}`,
    "",
    "Props:",
    props,
    "",
    "Example:",
    entry.example,
    guide,
  ].join("\n");
}

function renderGuidelines(entry: ComponentEntry): string {
  if (entry.guidelines.do.length === 0 && entry.guidelines.dont.length === 0) {
    return "";
  }
  const doLines = entry.guidelines.do.map((d) => `  do: ${d}`);
  const dontLines = entry.guidelines.dont.map((d) => `  dont: ${d}`);
  return ["", "Guidelines:", ...doLines, ...dontLines].join("\n");
}

function renderRules(rules: Rule[]): string {
  if (rules.length === 0) return "No rules in that severity.";
  const lines = rules.map((r) => {
    const enforced = r.enforcedBy.join(", ");
    return `- [${r.severity}] ${r.title} (${r.reference}; enforced by ${enforced})\n    ${r.statement}`;
  });
  return [
    "UCM global rules (non-negotiable). Obey all of them in every mode:",
    ...lines,
  ].join("\n");
}

function renderFindings(findings: Finding[]): string {
  if (findings.length === 0) {
    return "No issues found. The code passes the UCM mechanical and mode checks.";
  }
  const errors = findings.filter((f) => f.severity === "error").length;
  const warnings = findings.length - errors;
  const lines = findings.map(
    (f) =>
      `${f.severity === "error" ? "ERROR" : "warn "} line ${f.line} [${f.rule}] ${f.message} (found: ${f.match})`,
  );
  return [
    `${errors} error(s), ${warnings} warning(s). Fix every error before finishing.`,
    ...lines,
  ].join("\n");
}

function renderPattern(pattern: Pattern): string {
  const slots = pattern.slots
    .map((s) => `  - ${s.name}: ${s.description}`)
    .join("\n");
  return [
    `Pattern: ${pattern.name} [${pattern.mode}]`,
    pattern.summary,
    "",
    `Component: ${pattern.component}`,
    `Requires @ucm/ui components: ${pattern.imports.join(", ")}`,
    "",
    "Editable slots (edit the copy in these; keep the structure fixed):",
    slots,
    "",
    "Full template (drop in, then edit only the slots above):",
    "```tsx",
    pattern.code.trimEnd(),
    "```",
  ].join("\n");
}

function renderTokens(tokens: Record<string, { name: string; value: string }[]>): string {
  const blocks: string[] = [];
  for (const [category, entries] of Object.entries(tokens)) {
    if (!entries || entries.length === 0) continue;
    const lines = entries.map((t) => `  ${t.name}: ${t.value};`);
    blocks.push(`${category}:\n${lines.join("\n")}`);
  }
  if (blocks.length === 0) return "No tokens in that category.";
  return blocks.join("\n\n");
}
