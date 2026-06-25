import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runChecks, type Finding } from "./checks";

const here = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(here, "..", "..", "..");

// Lint the shipped design surface only: the library and the docs app. The
// tooling packages (catalog, mcp-server, rules) legitimately contain hex
// strings and rule text as data, so they are out of scope.
const TARGETS = [
  { dir: "packages/ui/src", banUiRuntimeDeps: true },
  { dir: "apps/docs/src", banUiRuntimeDeps: false },
];

const EXTENSIONS = [".ts", ".tsx", ".astro", ".mdx", ".css"];
const SKIP_DIRS = new Set(["node_modules", "dist", ".astro"]);

function walk(dir: string, out: string[]): void {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(join(dir, entry.name), out);
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      out.push(join(dir, entry.name));
    }
  }
}

function main(): void {
  let errors = 0;
  let warnings = 0;

  for (const target of TARGETS) {
    const files: string[] = [];
    walk(resolve(REPO_ROOT, target.dir), files);
    for (const file of files.sort()) {
      const code = readFileSync(file, "utf8");
      const findings = runChecks(code, {
        banUiRuntimeDeps: target.banUiRuntimeDeps,
      });
      if (findings.length === 0) continue;
      const rel = relative(REPO_ROOT, file);
      for (const f of findings) {
        report(rel, f);
        if (f.severity === "error") errors += 1;
        else warnings += 1;
      }
    }
  }

  const summary = `design-rule lint: ${errors} error(s), ${warnings} warning(s)`;
  if (errors > 0) {
    console.error(`\n${summary}`);
    process.exit(1);
  }
  console.log(summary || "design-rule lint: clean");
}

function report(file: string, f: Finding): void {
  const tag = f.severity === "error" ? "ERROR" : "warn ";
  const message = `${tag} ${file}:${f.line}  [${f.rule}] ${f.message} (found: ${f.match})`;
  if (f.severity === "error") console.error(message);
  else console.warn(message);
}

main();
