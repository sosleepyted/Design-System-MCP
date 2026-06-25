# UCM Design System x MCP, Standing Context

## What we are building

An internal "design system as a service": an MCP server that lets non-designers
vibecode UIs that come out on-brand by default. They cannot tell good design from
bad, so correctness has to be **structural**, never dependent on their judgment or
on a human reviewing the output. The MCP is a discovery layer over `@ucm/ui`; its
output (imports, examples) is useless unless the package is installed, so the two
are coupled by design.

## Source of truth (read before acting)

1. `UCM-DESIGN SYSTEM.md` (the language / intent spec).
2. The built-state reference (tokens, atoms, modes, bans, architecture, Sections 1 to 14).
3. `packages/ui/src/index.ts` plus the existing button and icon source.

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
