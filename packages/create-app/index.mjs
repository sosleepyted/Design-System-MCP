#!/usr/bin/env node
import {
  cpSync,
  existsSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const positionals = [];
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags[arg.slice(2)] = next;
        i += 1;
      } else {
        flags[arg.slice(2)] = "true";
      }
    } else {
      positionals.push(arg);
    }
  }
  return { positionals, flags };
}

const { positionals, flags } = parseArgs(process.argv.slice(2));
const name = positionals[0] ?? "ucm-app";
const url = flags.url ?? "https://REPLACE-WITH-YOUR-SERVER/mcp";
const token = flags.token ?? "REPLACE-WITH-YOUR-TOKEN";
const registry = flags.registry ?? "http://localhost:4873";
const dest = resolve(process.cwd(), name);

if (existsSync(dest)) {
  console.error(`Directory "${name}" already exists. Choose another name.`);
  process.exit(1);
}

// 1. Clone the starter app.
cpSync(join(here, "template"), dest, { recursive: true });
renameSync(join(dest, "_gitignore"), join(dest, ".gitignore"));

// 1a. Point the @ucm scope at the configured private registry so `npm install`
// can resolve @ucm/ui.
const npmrcPath = join(dest, ".npmrc");
renameSync(join(dest, "_npmrc"), npmrcPath);
writeFileSync(
  npmrcPath,
  readFileSync(npmrcPath, "utf8").replace(
    "http://localhost:4873",
    registry,
  ),
);

// 2. Name the project.
const pkgPath = join(dest, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.name = name;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// 3. Wire the MCP server (Claude Code reads .mcp.json at the project root).
const mcpConfig = {
  mcpServers: {
    "ucm-design-system": {
      type: "http",
      url,
      headers: { Authorization: `Bearer ${token}` },
    },
  },
};
writeFileSync(
  join(dest, ".mcp.json"),
  JSON.stringify(mcpConfig, null, 2) + "\n",
);

// 4. Drop the consumer CLAUDE.md.
writeFileSync(join(dest, "CLAUDE.md"), consumerClaudeMd());

// 5. Install (best effort; @ucm/ui resolves from your configured registry).
if (flags.install === "true" || flags.install === undefined) {
  console.log("Installing dependencies...");
  const result = spawnSync("npm", ["install"], { cwd: dest, stdio: "inherit" });
  if (result.status !== 0) {
    console.warn("\nInstall did not complete. Run it yourself once your registry has @ucm/ui.");
  }
}

console.log(`\nCreated ${name}.`);
console.log("Next steps:");
console.log(`  cd ${name}`);
if (url.includes("REPLACE")) {
  console.log("  edit .mcp.json with your server URL and bearer token");
}
console.log(`  @ucm/ui resolves from ${registry} (.npmrc); override with --registry`);
console.log("  open the folder in Claude Code, then ask it to build a page");

function consumerClaudeMd() {
  return `# UCM app

This app uses the UCM design system through the \`ucm-design-system\` MCP server
(configured in \`.mcp.json\`) and the \`@ucm/ui\` package.

## Before any UI work

1. Call \`get_rules\` once and obey them. The design system is its rules as much
   as its components.
2. Call \`preflight\` to confirm \`@ucm/ui\` is installed and matches the server.
3. For a whole page (landing, dashboard), call \`get_pattern\` and edit only the
   marked slots. Do not assemble a page from scratch.
4. For individual pieces, call \`search_components\` then \`get_component\`. Never
   hand-write a component that already exists.
5. Use \`get_tokens\` for colors, fonts, and motion instead of inventing values.
6. Before finishing, run \`review_code\` and fix every error.

## Rules (non-negotiable)

- Brand mode for marketing pages (ucm.jobs): yellow CTAs, glow, expressive.
  Product mode for the internal app: navy, restrained, no glow. Never mix modes.
- Every visible string is bilingual \`{ de, en }\`, default German.
- No em dashes. No emoji (use the Material Symbols \`Icon\`). No eyebrows.
- Triad only (cream page, navy ink, yellow accent). Never pure black or white as
  ink or surface. Animate only transform, opacity, and clip-path.
`;
}
