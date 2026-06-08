# UCM Design System — Library + Docs Site (Design Spec)

**Date:** 2026-06-08
**Status:** Approved (brainstorm), pending implementation plan
**Source of truth for the design language:** `UCM-DESIGN SYSTEM.md` (v1)

---

## 1. Purpose & scope

Build the `@ucm/ui` React component library and a wise.design-style **Astro docs
site** that documents it, implementing the UCM Unified Design System (v1).

This spec covers the **first vertical slice** only: the shared foundation plus the
two reference Button surfaces. It establishes every pattern (tokens, fonts,
locale, motion, docs page shape, testing) so that subsequent components — provided
later — slot into a proven structure.

**In scope (pass one):**
- pnpm monorepo scaffold (`packages/ui`, `apps/docs`).
- Shared foundation: design tokens, fonts (Figtree + Nunito), `LocaleContext`,
  motion primitives.
- Product `Button` (navy) — fully built + documented.
- Brand `GlowButton` + CTA variants (yellow) — fully built + documented.
- Astro docs site in **Brand-mode chrome** with Foundations + Components nav.
- Test + lint + typecheck tooling, with the two Buttons covered.

**Out of scope (later slices):** all other primitives (Field, Textarea,
CheckboxRow, StickyActionBar, Modal, nav shell, mega nav), marketing/app screens,
Instrument Serif, the Content & IA reference pages.

---

## 2. Key decisions

| Decision | Choice | Rationale |
|---|---|---|
| Project type | Component library + docs | User intent. |
| Framework (library) | React 19 + TypeScript 5 (strict) | Per design system §1.2. |
| Library coupling | **No Next.js dependency** | Lets the same package feed both the Astro docs site and the real Next.js `ucm.jobs` app. Components use CSS-var fonts and plain `<a>`/`<button>`. |
| Styling | **Tailwind v4, no config file** | Mandated by §1.2/1.3. Tokens via `@theme inline`. Overrides earlier "CSS Modules / OKLCH" assumption. |
| Repo structure | pnpm monorepo | `packages/ui` publishable, `apps/docs` consumes it. |
| Docs framework | **Astro** + `@tailwindcss/vite` + React islands | User choice; editorial, fast. Fidelity preserved by sharing the exact tokens + class usage with the library. |
| Docs chrome mode | **Brand mode** | User choice. |
| First slice | Foundation + both Buttons | Per the spec's own build order §6.1. |
| Fonts loaded now | **Figtree + Nunito only** | Instrument Serif is Brand-only and unused by the Button slice; deferred to keep payload minimal. |

---

## 3. Architecture

### 3.1 Framework-agnostic library

`@ucm/ui` is pure React + Tailwind v4 utility classes. Constraints that keep it
framework-agnostic:

- Fonts are referenced **only** through CSS variables (`var(--font-figtree)`,
  `var(--font-nunito)`). The library never imports `next/font`; the consuming app
  defines those variables.
- Links render a plain `<a>` when `href` is passed, else a `<button>` (matches the
  spec examples). No `next/link`.
- `LocaleContext` lives in the library (pure React context); the consuming app
  mounts the provider.

Result: the Astro docs site and the future Next.js `ucm.jobs` app consume the
**identical** package.

### 3.2 Tailwind v4 across the monorepo (no config file)

Tailwind v4 generates utilities by scanning source. The library ships its tokens
as importable CSS; each app wires Tailwind to scan the library:

```css
/* apps/docs/src/styles/globals.css */
@import "tailwindcss";
@import "@ucm/ui/styles/tokens.css";   /* @theme inline triad + named surfaces */
@import "@ucm/ui/styles/motion.css";   /* keyframes + reduced-motion gate */
@source "../../../packages/ui/src";     /* generate utilities for library classes */
```

`tokens.css` contains the `@theme inline` block, named surfaces, and the ink
opacity ramp verbatim from design system §1.3/§1.6 (hex, not OKLCH).

### 3.3 Repo layout

```text
ucm-design/
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── foundation/
│       │   │   ├── locale/        # LocaleContext, useLocale, Label, t
│       │   │   └── styles/        # tokens.css, motion.css
│       │   ├── product/button/    # Button.tsx, Button.test.tsx, index.ts
│       │   ├── brand/button/      # GlowButton.tsx, BrandCta.tsx, index.ts
│       │   └── index.ts
│       ├── package.json           # exports: ., ./styles/*
│       └── tsconfig.json
├── apps/
│   └── docs/
│       ├── src/
│       │   ├── content/
│       │   │   ├── foundations/   # color.mdx, typography.mdx, motion.mdx
│       │   │   └── components/    # product-button.mdx, brand-button.mdx
│       │   ├── components/docs/    # Demo, DoDont, PropsTable, TokenSwatch, LocaleToggle
│       │   ├── islands/            # React demo wrappers (LocaleProvider + component)
│       │   ├── layouts/            # BrandDocsLayout (sidebar + brand header)
│       │   ├── pages/
│       │   └── styles/globals.css
│       ├── astro.config.mjs
│       └── package.json
├── pnpm-workspace.yaml
├── package.json                   # root scripts
├── tsconfig.base.json
├── .eslintrc / prettier / stylelint config
└── docs/superpowers/specs/        # this file
```

---

## 4. Foundation (build first, per §6.1)

### 4.1 Tokens
`tokens.css` = `@theme inline` triad (`--color-ink #001e2b`, `--color-page
#f5f5f3`, `--color-accent #fcc224`, `--color-accent-hover #ffd84d`), status colors
(`--color-success #0f5e2a`, `--color-danger #a32d2d`), font vars, named surfaces
(Page/Card/Cream tint/Light gray/etc.), and the documented ink opacity ramp. No
new hues. No `#000`/`#fff` as ink/surface.

### 4.2 Fonts
Self-hosted via Fontsource (matches `next/font` intent: `display:swap`, latin +
latin-ext for ä ö ü ß, preload critical weight):
- **Figtree** 300–900 → `--font-figtree` (default UI/body).
- **Nunito** 800 → `--font-nunito` (wordmark only).
- Instrument Serif: **not loaded** this slice.

The Astro app defines the `--font-*` vars; the library only consumes them.

### 4.3 Locale (§1.7)
`LocaleContext` exposes `useLocale() → { locale, setLocale, t }`. Default `"de"`,
persisted in `localStorage` as `ucm-locale`. `Label = { de: string; en: string }`;
every user-visible string rendered via `t(label)`. Demos wrapped in
`LocaleProvider`; docs chrome has a DE/EN toggle.

### 4.4 Motion (§1.4/§1.8)
`motion.css` = `rise`, `slide-down`, `brand-rise`, `marquee`, `pulseDot`
keyframes; signature easing `cubic-bezier(0.22,1,0.36,1)`; transform/opacity/
clip-path only, never layout props, no `transition-all`; full
`prefers-reduced-motion: reduce` gate.

---

## 5. Reference components

### 5.1 Product `Button` (§3.5)
- **Base:** `inline-flex items-center justify-center gap-2 rounded-full
  font-medium tracking-[-0.005em] transition disabled:cursor-not-allowed`.
- **Variants:** `primary` (navy `#001E2B`, white text, navy shadow,
  `hover:bg-[#0a2d3c]`, `disabled:opacity-45 disabled:shadow-none`), `ghost`,
  `outline`, `danger`.
- **Sizes:** `default = h-9 px-4 text-[13.5px]`, `lg = h-11 px-5 text-[14.5px]`.
- **Props:** `variant`, `size`, `hideArrow` (primary shows a forward arrow by
  default — MUI `ArrowForward`, `sx={{fontSize:16}}`), `iconLeft`, `href`,
  standard button/anchor attributes.
- **Render:** `<a>` if `href` present, else `<button>`.
- **A11y:** real interactive element; `aria-hidden` on decorative arrow;
  icon-only usage requires `aria-label`.

### 5.2 Brand `GlowButton` + CTAs (§2.5)
- **CTA variants:** primary (yellow `#FCC224`, navy text, `hover:bg-[#FFD84D]`),
  dark (`#001E2B`, white), outlined (`border-[#001E2B]/15`). `rounded-full`.
- **`GlowButton`** props (`href`, `bg=#FCC224`, `fg=#001E2B`, `glow=#F1F6F4`,
  `border?`, `hideArrow?`): tracks `--x`/`--y` from cursor; on hover paints
  `radial-gradient(260px circle at var(--x) var(--y), var(--glow), transparent
  60%)` (the **only** permitted gradient, brand only); `hover:-translate-y-[1px]`;
  arrow `group-hover:translate-x-1`.
- **Arrow glyph:** inline SVG (12×12) from §2.5, `aria-hidden`.

### 5.3 Documentation pages
Each component gets an MDX page following the **provided component template
exactly**: When to use → Anatomy/Variants (Priorities, Sizes, Accessories) →
Behaviour (Interaction, Placement) → Best practice (Do/Don't pairs) →
Accessibility → Content → Availability. Live demo islands + view-source. Button
documented rules include "one primary per screen".

---

## 6. Docs site (Brand-mode chrome)

- **Layout:** brand-styled header (Nunito wordmark, yellow CTA) + left sidebar
  nav. Sections: **Foundations** (color, typography, motion) and **Components**
  (Product Button, Brand Button).
- **Chrome scope:** clean brand styling (radii, shadows, cream/navy surfaces).
  **Not** building the full mega-nav / parallax / lenis machinery (YAGNI for a
  reference site).
- **Docs primitives:** `<Demo>` (renders an island + view-source), `<DoDont>`
  (paired ✅/❌ examples), `<PropsTable>`, `<TokenSwatch>`, `<LocaleToggle>`.
- **Copy mechanics in chrome:** no em dashes, no `#000`/`#fff`, sentence-case
  data — same global rules.

---

## 7. Tooling & quality

- **Package manager:** pnpm workspaces. No Turborepo yet (root scripts suffice).
- **Build (library):** Vite library mode (or `tsup`) emitting ESM + `.d.ts`; CSS
  shipped as importable files under `@ucm/ui/styles/*`.
- **Lint/format:** ESLint + Prettier + Stylelint; TypeScript strict.
- **Tests:**
  - Unit (Vitest + Testing Library): Product `Button` — variant→class mapping,
    `href`→`<a>` vs `<button>`, disabled behaviour, click handler. GlowButton —
    renders, hover sets `--x/--y`, arrow toggles with `hideArrow`.
  - Visual regression (Playwright) config stubbed at 320/768/1024/1440, covering
    the two component doc pages. Wired but only Buttons covered this slice.
- **Verification (§6.2 checklist):** typecheck clean; no em dashes in new copy;
  both DE + EN present for every `Label`; mode-appropriate bans respected;
  responsive at all breakpoints; touch targets ≥36px (primary mobile CTA 44px).

---

## 8. Risks & notes

- **Tailwind v4 monorepo scanning:** the `@source` directive must point at the
  library source so utilities used only in `@ucm/ui` are generated in the docs
  app. This is the main wiring gotcha; verify with a smoke test early.
- **Fonts in Astro vs Next:** docs uses Fontsource; the future Next app uses
  `next/font`. Both must define identical `--font-*` vars so the shared library
  renders the same. Documented as the contract.
- **Library publishability:** keeping zero Next dependency is a hard constraint —
  any future component must not import Next APIs. Enforce in review.

---

## 9. Build order (for the implementation plan)

1. Monorepo scaffold (pnpm workspace, root configs, tsconfig base).
2. `@ucm/ui` foundation: `tokens.css`, `motion.css`, locale module.
3. Astro docs app scaffold + Tailwind v4 wiring + Fontsource fonts + globals.css;
   smoke-test that a library Tailwind class renders.
4. Product `Button` + tests; brand `GlowButton`/CTAs + tests.
5. Docs primitives (`Demo`, `DoDont`, `PropsTable`, `TokenSwatch`, `LocaleToggle`).
6. Foundations MDX (color, typography, motion) + two component MDX pages.
7. Playwright visual config + lint/typecheck wiring; run the §6.2 verification.
