import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { relative } from "node:path";
import { buildComponents } from "./components";
import { buildTokenSet } from "./tokens";
import { buildPatterns } from "./patterns";
import { buildStructures } from "./structures";
import { RULES } from "@ucm/rules";
import { OUT_DIR, OUT_FILE, REPO_ROOT, UI_PKG } from "./paths";
import type { Catalog } from "./types";

function readCatalogVersion(): string {
  const pkg = JSON.parse(readFileSync(UI_PKG, "utf8")) as { version?: string };
  return pkg.version ?? "0.0.0";
}

function main(): void {
  const components = buildComponents();
  const tokens = buildTokenSet();
  const patterns = buildPatterns();
  const structures = buildStructures();

  const catalog: Catalog = {
    catalogVersion: readCatalogVersion(),
    generatedFrom: "@ucm/ui",
    components,
    tokens,
    patterns,
    rules: RULES,
    structures,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(catalog, null, 2) + "\n", "utf8");

  const servable = components.filter((c) => c.servable).length;
  const tokenCount = Object.values(tokens)
    .filter(Array.isArray)
    .reduce((sum, list) => sum + list.length, 0);

  console.log(`catalog.json -> ${relative(REPO_ROOT, OUT_FILE)}`);
  console.log(`  version:    ${catalog.catalogVersion}`);
  console.log(
    `  components: ${components.length} (${servable} servable / ready)`,
  );
  for (const c of components) {
    console.log(
      `    - ${c.name} [${c.mode}/${c.status}] ${c.props.length} props`,
    );
  }
  console.log(`  tokens:     ${tokenCount} across categories + motion`);
  console.log(`  patterns:   ${patterns.length}`);
  for (const p of patterns) {
    console.log(`    - ${p.name} [${p.mode}] ${p.slots.length} slots`);
  }
  console.log(`  rules:      ${RULES.length}`);
  console.log(`  structures: ${structures.length} (reserved, see @ucm/be-structure)`);
}

main();
