# Step 1: Build the catalog package (`packages/catalog`)

Assumes the standing context in `CLAUDE.md`. This is build tooling, NOT shipped in `@ucm/ui`.

Create `packages/catalog`: a script that emits `catalog.json` by joining three sources.

1. **Component props and types** via `react-docgen-typescript` over `packages/ui/src`, the exported components and their `*Props` types (`ButtonProps`, `BrandButtonProps`, `GlowButtonProps`, `IconProps`).
2. **Metadata** from the `apps/docs` component MDX frontmatter (`apps/docs/src/content/components/*`): `mode`, `status`, `summary`, `availability`. Match MDX entries to components by name.
3. **Tokens** by parsing the CSS custom properties in `packages/ui/src/foundation/styles/tokens.css` into a structured set (color / type / spacing / radius / shadow), plus motion from `motion.css`. Read the **resolved font values from `apps/docs/src/styles/globals.css`**, not the library, because the library only declares the `--font-*` names.

Each component entry: `name`, `mode` (brand / product / shared), `status`, `summary`, `props` (name / type / required / default / description), `import` (`@ucm/ui`), a short runnable `example`, and a `guidelines` object (`do: string[]`, `dont: string[]`; stub empty if no source yet). Include a `catalogVersion` field at the top, read from the `@ucm/ui` package version.

Rules:

- Mark `status: ready` entries as servable; keep `draft` entries in the JSON but flagged, not servable.
- Emit `catalog.json` to a stable path (for example `packages/catalog/dist/catalog.json`) and add a `pnpm catalog:build` script.
- Do not add runtime deps to `@ucm/ui`. The catalog package may depend on react-docgen and similar freely.

**Stop and verify:** run `pnpm catalog:build` and show me `catalog.json`. I want to see the three buttons and `Icon` with real props, correct modes (Button = product, BrandButton / GlowButton = brand, Icon = shared), and a populated token set with resolved font families. Do not build the server yet.
