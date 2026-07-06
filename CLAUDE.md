# UCM Brand Home, Standing Context

## What we are building

The canonical home of the UCM brand: identity, rules, guidelines, and assets
under `brand/`, enforced by the design system built here. Correctness is
**structural**, never dependent on judgment or human review. The MCP service
layer (server, catalog, create-app, plugin, registry) is built and green but
**parked** since 2026-07-06 (spec:
`docs/superpowers/specs/2026-07-06-brand-home-design.md`); keep it passing,
do not extend it unless asked. Brand and guideline work leads.

## Source of truth (read before acting)

1. `brand/README.md` and `brand/guidelines/` (the canonical brand book).
2. `UCM-DESIGN SYSTEM.md` (the language / intent spec).
3. The built-state reference (tokens, atoms, modes, bans, architecture, Sections 1 to 14).
4. `packages/ui/src/index.ts` plus the existing component source.

When a brand book page and a spec disagree, the spec wins and the page gets
fixed; conflicts are logged in `docs/brandbook/TRACKER.md`.

## What exists (do not rebuild)

- pnpm monorepo: `packages/ui` (`@ucm/ui`, framework-agnostic React, zero runtime deps, no MUI / emotion) and `apps/docs` (Astro 5).
- Built: tokens, motion, `cx`, locale, `Icon` (20 paths), product `Button`, brand `BrandButton` and `GlowButton`. That is three buttons and an icon.
- Tailwind v4 `@theme inline`, no `tailwind.config.js`. Fonts via Fontsource. Library builds in Vite library mode.

## Two modes (never mix)

- **brand** = external ucm.jobs: yellow CTA, glow, `BrandButton` / `GlowButton`, larger radii, expressive.
- **product** = internal app: navy `Button`, no glow, restrained. Has extra product-only bans (no nested cards, no gradient backgrounds except the GlowButton radial, no hero-metric template, no identical repeated card grids, modal last).

## Global rules (every file, code and copy)

- No em dashes (use commas; ranges use "to" or a hyphen, German "bis"). Greppable to zero.
- No eyebrows (no uppercase letter-spaced kickers). Uppercase only for acronyms like UCM and for data.
- No emoji anywhere (code, copy, comments, docs). All iconography is the Material Symbols `Icon` from `@ucm/ui`; where no icon fits, use a plain word. Greppable to zero.
- Widow control: the last line carries at least 3 words on mobile, 5 on desktop.
- Triad only (cream page, navy ink, yellow accent). Never `#000` / `#fff`. Borders are navy with alpha.
- Bilingual: every visible string is `{ de, en }` via `t()`, default `de`.
- Motion: animate only `transform` / `opacity` / `clip-path`, ease-out only, off under `prefers-reduced-motion`. Never `transition-all`.
- Hierarchy: adjacent type steps differ by at least 1.25x. Headings are Figtree 300 with tight tracking.

## How to work

- Read the docs first. Follow the existing button structure and the Section 11 contribution workflow for any new component (component + Vitest tests + `index.ts` export + MDX doc with island demos, both `de` and `en`, responsive at 320 / 375 / 768 / 1024 / 1440, touch targets at least 36px).
- Never break the library public API or its zero-dependency, server-render-safe guarantee. Never reintroduce `@mui/*` or `@emotion/*` into `@ucm/ui`.
- Ask before any hard-to-reverse decision (package layout, naming, schema changes).
- Obey the global rules in everything you generate, including shipped code comments.
