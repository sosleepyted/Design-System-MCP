import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadCatalog } from "./catalog";

export type PreflightResult = {
  installed: boolean;
  installedVersion: string | null;
  catalogVersion: string;
  match: boolean;
  action: string;
};

// Verifies the caller project has @ucm/ui installed and at the catalog version.
// For the local stdio server the cwd is the consumer project, so we can read its
// node_modules. The MCP output (imports, examples) is useless unless the package
// is installed, so this runs before generating.
export function preflight(cwd: string = process.cwd()): PreflightResult {
  const catalogVersion = loadCatalog().catalogVersion;

  let installedVersion: string | null = null;
  try {
    const pkgPath = resolve(cwd, "node_modules/@ucm/ui/package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version?: string };
    installedVersion = pkg.version ?? null;
  } catch {
    installedVersion = null;
  }

  const installed = installedVersion !== null;
  const match = installed && installedVersion === catalogVersion;

  let action: string;
  if (!installed) {
    action =
      "Install @ucm/ui in this project before generating UI. The MCP output is useless without it.";
  } else if (!match) {
    action = `Update @ucm/ui to ${catalogVersion} (installed: ${installedVersion}) so imports and examples match the catalog.`;
  } else {
    action = "OK: @ucm/ui is installed and matches the catalog. Proceed.";
  }

  return { installed, installedVersion, catalogVersion, match, action };
}
