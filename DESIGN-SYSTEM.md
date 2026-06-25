# UCM Design System: Built-State Reference (v1)

This document describes the design system **as it actually exists in code today**,
organized using atomic design. It is the practical companion to the language spec
in `UCM-DESIGN SYSTEM.md`. Where the language spec describes intent, this document
records what is built, where it lives, how it behaves, and the rules every new
piece must follow.

Two surfaces, one foundation:

- **Brand mode** drives the external marketing site (`ucm.jobs`): expressive,
  yellow primary CTA, larger radii, the radial glow.
- **Product mode** drives the internal app: restrained, navy primary CTA, no glow.

The library (`@ucm/ui`) is framework-agnostic React. It carries the foundation and
both modes, and it is consumed by the Astro docs site today and by the future
Next.js product app later.

This system is its **rules** as much as its **components**. The two are co-equal
deliverables: a correct UI obeys the global rules in Section 1 (modes, the triad,
no em dashes, no emoji, bilingual copy, motion discipline, hierarchy) just as much
as it reuses the right component. The rules are defined once in `@ucm/rules`,
enforced by the CI lint and the `review_code` tool, and served to agents through
the MCP `get_rules` tool, so they travel with the components rather than living
only in this document.

> Authoring note for this file and every user-visible string: this document
> follows the global rules in Section 1, including the em dash ban. There are no
> em dashes anywhere in this file.

---

## 0. How this document is organized (atomic design)

Everything is grouped by atomic level, mapped to real files.

| Atomic level | What it means here | Lives in |
|---|---|---|
| **Tokens** | Color, type, spacing, radius, shadow, motion primitives | `packages/ui/src/foundation/styles/*` |
| **Atoms** | Smallest usable units: `Icon`, `Button`, `BrandButton`, `GlowButton`, `cx`, locale primitives | `packages/ui/src/foundation/*`, `packages/ui/src/product/*`, `packages/ui/src/brand/*` |
| **Molecules** | Small compositions of atoms: docs primitives `Demo`, `DoDont`, `PropsTable`, `TokenSwatch` | `apps/docs/src/components/docs/*` |
| **Organisms** | Standalone sections: the docs header and sidebar | `apps/docs/src/layouts/BrandDocsLayout.astro` |
| **Templates** | Page skeletons: the component and foundation page shells | `apps/docs/src/pages/**` |
| **Pages** | Concrete content: each MDX foundation and component page | `apps/docs/src/content/**` |

Promotion path: a molecule that proves itself in the docs app (for example
`PropsTable` or a future `Card`) graduates into `@ucm/ui` so the product app can
use it too.

---

## 1. Global rules (non-negotiable, both modes)

These apply everywhere, in every mode, in code and in copy. The first three are the
newest and the most frequently missed, so they lead.

### 1.1 No em dashes (replace every one with a comma)

- Never use an em dash in any user-visible text, any component label, any docs
  copy, or any source comment that ships.
- Replace each em dash with a comma by default. When a comma reads poorly, use a
  colon, a semicolon, parentheses, or split into two sentences.
- Numeric ranges use "to" or a hyphen ("300 to 900", "4-13"). In German prefer
  "bis".
- This rule is mechanical and absolute. A reviewer should be able to grep for the
  em dash character and find zero results in shipped strings.

### 1.2 No eyebrow text anywhere (especially the header)

- An "eyebrow" is the small, uppercase, letter-spaced kicker placed above a
  heading or at the top of a section (for example a tiny "FOUNDATIONS" or
  "COMPONENTS" label, or an all-caps category tag over a title).
- Do not use eyebrows. Not above headings, not in section intros, and above all
  not in the site header or page headers.
- Replace an eyebrow with one of these: lead directly with the heading, fold the
  context into the heading itself, or use a normal sentence-case label inline with
  the content where it carries real meaning.
- Practical consequence: uppercase, letter-spaced micro-labels used purely as
  decoration are banned. Uppercase is reserved for true acronyms (UCM) and data,
  never for decorative kickers.
- Known current violations to remove (tracked in Section 12): the sidebar group
  labels and the `Demo` and `DoDont` caption labels still render uppercase
  eyebrows. These must be converted to plain sentence-case labels or removed.

### 1.3 No widows (bind the last line)

A widow is a final line that ends with too few words. The rule is responsive:

- **Mobile** (narrow viewports): the last line of any paragraph or heading must
  carry **at least 3 words**.
- **Desktop** (wider viewports): the last line must carry **at least 5 words**.

Implementation guidance:

- Keep the global `text-wrap: pretty` on body text and `text-wrap: balance` on
  headings. Both are already wired in `apps/docs/src/styles/globals.css`. These
  reduce single-word widows but do not guarantee the 3 and 5 word minimums.
- For headings and important short paragraphs, bind the last N words with
  non-breaking spaces so they cannot drop alone. Use a small authoring helper
  rather than hand-typing `&nbsp;`. Recommended shape:

  ```tsx
  // Bind the final `count` words together so the last line never falls short.
  // count = 3 on mobile, 5 on desktop (resolve from a breakpoint or matchMedia).
  function preventWidow(text: string, count: number): string {
    const words = text.trim().split(/\s+/);
    if (words.length <= count) return text;
    const head = words.slice(0, words.length - count).join(" ");
    const tail = words.slice(words.length - count).join(" ");
    return `${head} ${tail}`;
  }
  ```

- Do not bind so many words that a narrow column overflows. If 5 bound words would
  overflow on the available width, fall back to the largest count that fits, and
  flag the line for a copy edit instead of forcing an overflow.
- Treat this as an authoring and review rule, not only a runtime trick. The
  simplest fix is usually to rewrite the sentence so the natural last line is full.

### 1.4 Color discipline

- One triad only: cream page, navy ink, yellow accent. Do not introduce new hues.
  Status colors and the teal accent sub-palette are accents, never primaries.
- Never use `#000` or `#fff` as ink or surface. Ink is `#001E2B`. Page is
  `#F5F5F3`. Card is `#FFFFFF` is the one allowed pure white, and only as a card
  surface, never as page ink logic.
- Borders are navy with alpha, written `border-[#001E2B]/NN`, never plain gray.

### 1.5 Bilingual by default

- Every user-visible string is a `Label = { de: string; en: string }`, rendered
  through `t(label)` from `useLocale()`. Default locale is `de`, persisted in
  `localStorage` under `ucm-locale`.
- Both languages are authored at once. A string is not done until both `de` and
  `en` are present.

### 1.6 Motion discipline

- Animate only compositor-friendly properties: `transform`, `opacity`,
  `clip-path`. Never animate layout properties (`width`, `height`, `top`, `left`,
  `margin`, `padding`, `font-size`). Never use `transition-all`.
- Ease-out only, no bounce, no elastic. Signature easing
  `cubic-bezier(0.22, 1, 0.36, 1)`. Reveal-on-scroll uses
  `cubic-bezier(0.16, 1, 0.3, 1)`. Simple fades use plain `ease-out`.
- All entrance and ambient motion is disabled under
  `prefers-reduced-motion: reduce`.

### 1.7 Hierarchy through contrast

- Adjacent type steps differ by at least 1.25x in size or weight. Never ship flat
  scales like 14, 14.5, 15.
- Headings are light weight (Figtree 300) with tight tracking
  (`tracking-[-0.02em]`).

### 1.8 No emoji (use the Material Symbols Icon)

- Never use an emoji glyph (✅, ❌, ⚠️, 🚀, and so on) anywhere: not in
  component UI, not in labels, not in docs content, not in code comments. Emoji
  render inconsistently across platforms and sit outside the token system.
- All iconography is the `Icon` component from `@ucm/ui`, which draws vendored
  Material Symbols (Outlined) paths and inherits color from the current text
  token via `currentColor`. If a glyph is missing, add its outlined path to the
  icon registry rather than reaching for an emoji.
- Where an icon is not warranted, use a plain word instead (for example "Do",
  "Don't", "Yes"), never an emoji.
- This is greppable to zero: a maintainer can search the shipped surface for any
  emoji codepoint and find no results.

---

## 2. Tokens

Source of truth: `packages/ui/src/foundation/styles/tokens.css` and
`motion.css`. Tokens are CSS custom properties declared with Tailwind v4
`@theme inline`. There is no `tailwind.config.js`. Colors are hex, not OKLCH.

### 2.1 Color tokens

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#001E2B` | Ink, used everywhere instead of black |
| `--color-page` | `#F5F5F3` | Page background, set on `body` |
| `--color-accent` | `#FCC224` | Yellow accent, Brand primary CTA |
| `--color-accent-hover` | `#FFD84D` | Accent hover |
| `--color-success` | `#0F5E2A` | Success text and tint base |
| `--color-danger` | `#A32D2D` | Danger text and button background |
| `--color-card` | `#FFFFFF` | Card surface (the one allowed pure white) |
| `--color-cream` | `#F8F5EE` | Cream tint, pill chips, soft callouts |
| `--color-light-gray` | `#EDECEA` | Nav pill background, secondary surface |
| `--color-faint-gray` | `#F7F7F7` | Inputs, inactive pill states (brand) |
| `--color-ink-on-dark` | `#F0F0EB` | Text on dark featured cards |
| `--color-hero-dark` | `#0A0F14` | Cinematic dark hero (brand only) |

**Ink opacity ramp** (apply with `/NN` on text and border utilities):

```
text-[#001E2B]      headlines, focused input text
text-[#001E2B]/85   body emphasis
text-[#001E2B]/78   body, list items, paragraphs
text-[#001E2B]/65   secondary body
text-[#001E2B]/55   tertiary labels, fine print
text-[#001E2B]/45   subdued icon stroke
text-[#001E2B]/35   placeholder text

border-[#001E2B]/8   faint hairlines, in-card dividers
border-[#001E2B]/10  default card border
border-[#001E2B]/12  default input border
border-[#001E2B]/15  outlined buttons
border-[#001E2B]/25  hover state on cards and inputs
```

**Accent ramp** (yellow, used sparingly, never more than about 10 percent of a
surface):

```
#FCC224       base
#FCC224/22    soft tinted background
#FCC224/60    strong border (empty or attention field)
#FCC224/25    ring partner to that border
#8A5A00       text on a yellow-tinted background
#A96B00       inline warning text
```

**Status:** success `#0F5E2A` text with `#0F5E2A/22` tint; danger `#A32D2D` text
and button background with `#A32D2D/10` hover tint; warning uses the accent family
above.

**Accent sub-palette** (decorative only, never the CTA): teals `#03677E`,
`#024E60`, `#0E3E4A`, `#114C5A`, `#1A8578`, `#2FB8A8`; light blue `#C2E8FF`; light
cyan `#D9E8E2`; brand orange `#F0A639`; logo accent dot `#FF9932`.

### 2.2 Typography tokens

| Role | Family | Weights | Token |
|---|---|---|---|
| UI and body (default) | Figtree | 300 to 900 | `--font-figtree` |
| Wordmark only | Nunito | 800 | `--font-nunito` |
| Sans stack | Figtree first | n/a | `--font-sans` |

- Figtree is loaded as a variable font through Fontsource, with the latin-ext
  subset so it covers ä ö ü ß. Nunito 800 is loaded for the wordmark only.
- Instrument Serif (the brand-only decorative third family) is intentionally not
  loaded yet. Add it only when a brand surface needs it. Product mode is two
  families maximum.
- The library tokens map `--font-figtree` and `--font-nunito` to whatever the
  consuming app defines. The Astro app sets the real values in
  `apps/docs/src/styles/globals.css`. This keeps the library framework-agnostic.

**Type scale (built and documented):**

| Role | Class string |
|---|---|
| Hero / display | `text-[32px] font-light leading-[1.08] tracking-[-0.02em]` |
| Sub-display | `text-[26px] font-light leading-[1.12] tracking-[-0.02em]` |
| Page title (responsive) | `text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.1] tracking-[-0.02em]` |
| Section heading | `text-[20px] font-medium tracking-[-0.012em]` |
| Subheading | `text-[15px] font-semibold` |
| Standard paragraph | `text-[15px] leading-[1.55] tracking-[-0.01em]` |
| Body in docs prose | `text-[14px] leading-[1.6] text-[#001E2B]/78` |
| Caption / meta | `text-[13px]` or `text-[12.5px]` |

Wordmark: `text-[22px] font-extrabold tracking-[-0.04em]` with the Nunito family.

### 2.3 Spacing, radius, shadow

- **Radius (product):** `rounded-[20px]` cards, `rounded-[12px]` inputs,
  `rounded-full` pills and buttons, `rounded-[16px]` to `rounded-[24px]` modals.
- **Radius (brand):** adds larger steps, `rounded-[24px]` section blocks,
  `rounded-[28px]` feature blocks, plus `6` to `16` for inputs, cards, images.
- **Shadow (product), restrained:**
  - card `shadow-[0_12px_28px_-22px_rgba(23,43,54,0.4)]`
  - primary button `shadow-[0_8px_24px_-14px_rgba(0,30,43,0.7)]`
  - modal `shadow-[0_30px_70px_-20px_rgba(0,30,43,0.5)]`
- **Shadow (brand), expressive:** subtle, medium, large mega-nav, plus the yellow
  CTA glow `shadow-[0_20px_60px_-20px_rgba(255,200,1,0.45)]`. The glow is brand
  only.
- **Container (product):** `mx-auto max-w-[680px] px-4 sm:px-6 md:max-w-[960px] md:px-8`.
- **Container (brand):** `max-w-[1440px]`, section padding `py-16` to `py-32`.
- **Docs container:** `mx-auto max-w-[1280px] px-6 py-10`.

### 2.4 Motion tokens

Source: `packages/ui/src/foundation/styles/motion.css`.

| Keyframe | Utility class | Use |
|---|---|---|
| `rise` | `.animate-rise` | Product micro entrance (opacity + 6px rise, 220ms ease-out) |
| `slide-down` | `.animate-slide-down` | Menu and panel entrance (200ms ease-out) |
| `brand-rise` | `.animate-brand-rise` | Brand entrance (12px rise, 0.9s reveal easing) |
| `marquee` | (compose inline) | Brand logo parade |
| `pulseDot` | (compose inline) | Brand accent dot |

Durations: micro 180 to 220ms, standard 300ms, medium 400ms, brand long 500 to
900ms. All three `.animate-*` classes are switched off under
`prefers-reduced-motion: reduce`.

> Framer Motion status: not installed. All current motion is CSS keyframes and
> Tailwind transitions. If Framer Motion is adopted later, it belongs in the docs
> app or the product app, not in `@ucm/ui` (the library stays dependency-light and
> server-render safe). See Section 12.

---

## 3. Atoms

Atoms are exported from `packages/ui/src/index.ts`. Public surface today:

```ts
export { cx } from "./foundation/utils/cx";
export { LocaleProvider, useLocale } from "./foundation/locale";
export type { Label, Locale } from "./foundation/locale";
export { Icon, ICON_PATHS } from "./foundation/icon";
export type { IconProps, IconName } from "./foundation/icon";
export { Button } from "./product/button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./product/button";
export { GlowButton } from "./brand/button";
export type { GlowButtonProps } from "./brand/button";
export { BrandButton } from "./brand/button";
export type { BrandButtonProps, BrandButtonVariant } from "./brand/button";
```

### 3.1 `cx` (class combiner)

`packages/ui/src/foundation/utils/cx.ts`. Joins truthy class strings with a space.
No dependency on `clsx` or `classnames`.

```ts
cx("base", condition && "active", undefined) // "base active"
```

### 3.2 Locale primitives (i18n)

`packages/ui/src/foundation/locale/*`.

- `type Locale = "de" | "en"`
- `type Label = { de: string; en: string }`
- `LocaleProvider`: holds the active locale, reads and writes `localStorage`
  (`ucm-locale`), exposes `{ locale, setLocale, t }`. Default `de`. When an
  explicit `initialLocale` is passed, the stored value is not auto-applied.
- `useLocale()`: returns the context value, throws if used outside a provider.
- `t(label)`: returns `label[locale]`.

Pattern: declare strings in a `COPY` const at the top of a file and render
`t(COPY.key)`.

### 3.3 `Icon`

`packages/ui/src/foundation/icon/*`. Inline SVG icon, no runtime dependency. Path
data is vendored from Google Material Symbols (Outlined, weight 400) under
Apache-2.0, viewBox `0 -960 960 960`. This is why the library has no MUI: inline
SVG server-renders safely anywhere. This satisfies design spec section 3.9, which
permits inline SVG matching MUI weight.

Props:

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `IconName` | required | Which vendored path to render |
| `size` | `number` | `20` | Pixel width and height |
| `className` | `string` | none | Extra classes, merged with `inline-block shrink-0` |
| `title` | `string` | none | When set, the icon is a labelled image (`role="img"`, `aria-label`). When omitted, the icon is decorative (`aria-hidden`) |

Color comes from `currentColor`, so the icon inherits text color.

**Icon inventory (20 names in `ICON_PATHS`):**

```
add            arrow_back     arrow_forward  check
check_circle   chevron_left   chevron_right  close
content_copy   delete         edit           error
expand_less    expand_more    info           lock
menu           open_in_new    remove         search
```

Add a new icon by dropping its Material Symbols outlined path into `icons.ts`. The
`IconName` type updates automatically.

### 3.4 `Button` (product)

`packages/ui/src/product/button/Button.tsx`. The product primary action. Navy
primary, restrained, no glow. Renders an `<a>` when `href` is passed, otherwise a
`<button type="button">`.

**Variants:**

| Variant | Use | Key classes |
|---|---|---|
| `primary` | Main action, navy | `bg-[#001E2B] text-white` + navy shadow, `disabled:opacity-45` |
| `ghost` | Low emphasis | `text-[#001E2B]/70 hover:bg-[#001E2B]/[0.04]` |
| `outline` | Secondary, bordered | `border-[#001E2B]/15 text-[#001E2B]/85 hover:border-[#001E2B]/30` |
| `danger` | Destructive | `bg-[#a32d2d] text-white` + danger shadow |

**Sizes:** `default` is `h-9 px-4 text-[13.5px]`, `lg` is `h-11 px-5 text-[14.5px]`.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "ghost" \| "outline" \| "danger"` | `"primary"` | Visual priority |
| `size` | `"default" \| "lg"` | `"default"` | Height and padding |
| `hideArrow` | `boolean` | `false` | Hide the trailing arrow on the primary variant |
| `iconLeft` | `ReactNode` | none | Leading element before the label |
| `href` | `string` | none | When present, renders an anchor |
| `children` | `ReactNode` | none | Label |
| `className` | `string` | none | Extra classes |

**Behaviour and states:**

- The primary variant shows a trailing `arrow_forward` `Icon` by default. Set
  `hideArrow` to remove it.
- Focus is visible: `focus-visible:ring-2 focus-visible:ring-[#001E2B]/50
  focus-visible:ring-offset-2`.
- The `<button>` defaults to `type="button"` so it never submits a form by
  accident.
- Disabled applies `disabled:cursor-not-allowed` and reduced opacity. The anchor
  form does not accept `disabled` by type.

**Accessibility:** real semantic element, visible focus ring, tracks color
contrast through the ink ramp. For an icon-only button add an `aria-label`.

### 3.5 `BrandButton`

`packages/ui/src/brand/button/BrandButton.tsx`. The brand CTA family. Renders an
`<a>` when `href` is set, otherwise a `<button type="button">`.

**Variants:**

| Variant | Use | Key classes |
|---|---|---|
| `primary` | Yellow CTA | `bg-[#FCC224] font-semibold text-[#001E2B] hover:bg-[#FFD84D]` |
| `dark` | Secondary emphasis | `bg-[#001E2B] font-medium text-white hover:bg-[#0a2a37]` |
| `outline` | Tertiary | `border-[#001E2B]/15 font-semibold text-[#001E2B] hover:bg-[#001E2B]/5` |

Base sizing `px-6 py-3 text-[14px] rounded-full`, with the visible focus ring.

**Props:** `variant`, `href`, `children`, `className`, `onClick`.

### 3.6 `GlowButton`

`packages/ui/src/brand/button/GlowButton.tsx`. The expressive brand button with a
cursor-tracked radial glow. The glow is the single gradient permitted anywhere in
the system, brand only. Renders an `<a>` when `href` is set, otherwise a `<button>`.

- Tracks pointer position into `--x` and `--y` on mouse move, paints
  `radial-gradient(260px circle at var(--x) var(--y), var(--glow), transparent 60%)`
  on hover.
- Lifts on hover with `hover:-translate-y-[1px]`. The trailing arrow nudges right
  on hover. The arrow is an inline SVG glyph.
- Visible focus ring, same token as the other buttons.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | none | Renders an anchor when present |
| `bg` | `string` | `#FCC224` | Background color |
| `fg` | `string` | `#001E2B` | Foreground color |
| `glow` | `string` | `#F1F6F4` | Glow color |
| `border` | `string` | none | Optional border color |
| `hideArrow` | `boolean` | `false` | Hide the trailing arrow |
| `children` | `ReactNode` | none | Label |
| `className` | `string` | none | Extra classes |
| `onClick` | `() => void` | none | Click handler |

---

## 4. Molecules (docs primitives)

These live in `apps/docs/src/components/docs/` and are Astro components used to
author documentation. They are not in `@ucm/ui` yet, but several are promotion
candidates.

| Molecule | Props | Purpose |
|---|---|---|
| `Demo` | `title?` | A white framed stage that lays out live examples with `flex flex-wrap gap-4 p-8` |
| `DoDont` | `do`, `dont`, slots `do` and `dont` | Side by side correct and incorrect examples, green and red framed |
| `PropsTable` | `rows: { name, type, default?, description }[]` | Renders a component prop table |
| `TokenSwatch` | `name`, `value` | A color swatch with its name and hex |

Note: `Demo` and `DoDont` currently render uppercase eyebrow captions. Per rule
1.2 these must change to sentence-case labels or be removed. See Section 12.

**Docs islands** (`apps/docs/src/islands/`): `LocaleToggle`, `ProductButtonDemo`,
`BrandButtonDemo`, `IconGallery`. These are the interactive React demos hydrated on
the otherwise static Astro pages.

---

## 5. Organisms

### 5.1 Docs header and sidebar (`BrandDocsLayout.astro`)

- **Header:** sticky, blurred cream background, the Nunito `UCM` wordmark on the
  left, the `LocaleToggle` and a yellow Components CTA on the right.
- **Sidebar:** two nav groups, Foundations and Components, generated from the
  content collections.
- The chrome is in brand mode: yellow CTA, cream surface, navy ink.
- The header and sidebar group labels currently use uppercase eyebrow styling.
  Under rule 1.2 these labels must become sentence-case or be removed. The
  wordmark `UCM` stays, it is an acronym, not an eyebrow.

---

## 6. Templates and pages

### 6.1 Templates

- `apps/docs/src/pages/components/[slug].astro` and
  `apps/docs/src/pages/foundations/[slug].astro` render each MDX entry inside
  `BrandDocsLayout`. The layout owns the prose rhythm: `h2` at 20px, `h3` at 15px,
  paragraphs at 14px with 1.6 line height and `/78` ink.
- `apps/docs/src/pages/index.astro` is the landing page: light-weight "Design
  system" heading, a one-line summary, and the Foundations and Components index.

### 6.2 Content collections (`content.config.ts`)

Two Zod-validated collections:

- **components:** front matter `title`, `summary`, `mode` (`brand` or `product`),
  `status` (`draft` or `ready`, default `draft`), `availability`
  (`android`, `ios`, `web`, defaults to web true).
- **foundations:** front matter `title`, `summary`.

### 6.3 Pages that exist today

- Foundations: `color`, `typography`, `motion`.
- Components: `product-button`, `brand-button`, `icon`.

---

## 7. Component documentation template

Every component page follows this structure (trim sections that do not apply):

1. **When to use** (action and input components, with do and do-not contexts)
2. **Anatomy and variants** (Types, Priorities, Sizes, Media and accessories)
3. **Behaviour** (interaction, placement)
4. **Best practice** (paired Do and Don't examples)
5. **Accessibility** (what is announced, touch target, contrast, disabled cue)
6. **Content** (copy rules: start with a verb, keep it short, sentence case, no
   first-person, allow about 2x growth for translation, and obey rule 1.1)
7. **Props** (the `PropsTable`)
8. **Availability** (Android, iOS, Web)

---

## 8. Modes at a glance

| Topic | Brand (external) | Product (internal) |
|---|---|---|
| Primary CTA | Yellow `#FCC224` | Navy `#001E2B` |
| Radius | Large allowed (24, 28) | 20 cards, 12 inputs, full pills |
| Shadow | Expressive, glow allowed | Restrained, no glow |
| Copy voice | Motivational allowed | Informational only |
| Fonts | May add Instrument Serif (not loaded yet) | Two families maximum |
| Icons | Inline SVG | Inline SVG (`Icon` atom), no MUI |
| Expressive effects | Parallax, marquee, scatter, glow | Banned |

Global rules in Section 1 apply to both modes and override nothing below them.

---

## 9. Architecture and tech stack

- **Monorepo:** pnpm workspace. `packages/ui` (`@ucm/ui`, the library) and
  `apps/docs` (the Astro docs site).
- **Library is framework-agnostic React:** zero runtime dependencies, React and
  React DOM as peers only. It references fonts through CSS variables and renders
  plain `<a>` and `<button>`. The same package feeds the Astro docs today and the
  Next.js product app later.
- **No MUI, no emotion in the library.** MUI v6 cannot server-render under Astro's
  dev module runner (a `createTheme` CJS and ESM interop crash). The product Button
  arrow is an inline SVG `Icon`. Do not reintroduce `@mui/*` or `@emotion/*` into
  `@ucm/ui`. Use inline SVG for any product icon.
- **Styling:** Tailwind v4 with `@theme inline` tokens, no `tailwind.config.js`,
  bracket values are normal. The docs app scans the library source through
  `@source "../../../../packages/ui/src"` so utilities used inside the library are
  generated.
- **Fonts:** self-hosted through Fontsource (Figtree Variable, Nunito 800).
- **Docs framework:** Astro 5 with React islands, MDX, Tailwind v4 Vite plugin.
- **Build:** the library builds with Vite library mode and emits ESM plus types.
- **Dev servers:** `.claude/launch.json` defines `docs-dev` (astro dev, HMR) and
  `docs-preview` (static build), both on port 4321.

---

## 10. Bans

**Global (both modes):**

- Em dashes in any shipped text (rule 1.1).
- Eyebrow text anywhere, especially the header (rule 1.2).
- Widowed last lines below the 3 word mobile and 5 word desktop minimums (rule 1.3).
- Emoji anywhere; use the `Icon` component instead (rule 1.8).
- `#000` or `#fff` as ink or surface.
- Gradient text (`background-clip: text`).
- New hues outside the triad and documented accents.
- `@mui/*` or `@emotion/*` inside `@ucm/ui`.

**Product mode only** (brand mode is exempt):

- Nested cards (a card inside a card). Use `border-t border-[#001E2B]/8` dividers.
- Colored side-stripe borders wider than 1px as decoration.
- Gradient backgrounds (the brand `GlowButton` radial is the one exception).
- Decorative glassmorphism (functional scrim blur on modals and nav is allowed).
- The hero-metric template (big number, small label, supporting stat).
- Identical repeated card grids.
- Reaching for a modal first (exhaust inline and progressive disclosure).

---

## 11. Build order and contribution workflow

**Foundation before features:**

1. Tokens and motion (already in `@ucm/ui`).
2. Fonts and the locale layer (already wired).
3. Shared primitives.
4. Components, documented as you build.

**Adding a component:**

1. Create it under `packages/ui/src/{product,brand}/<name>/` following the existing
   button structure: component, test, `index.ts`.
2. Use the `Icon` atom for any icon. Use `cx` for class merging. Use `Label` and
   `t` for any text.
3. Write Vitest plus Testing Library tests (variant to class, anchor versus
   button, disabled, focus).
4. Export from `packages/ui/src/index.ts`.
5. Document it in `apps/docs/src/content/components/<name>.mdx` using the Section 7
   template, with live island demos.
6. Verify: type check clean, no em dashes, no eyebrows, no widows past the
   minimums, both `de` and `en` present, mode bans respected, responsive at 320,
   375, 768, 1024, 1440, touch targets at least 36px.

---

## 12. Known gaps and follow-ups

- **Eyebrow cleanup (rule 1.2):** remove or convert the uppercase labels in the
  docs sidebar groups, the `Demo` caption, the `DoDont` Do and Don't captions, and
  the typography page eyebrow sample.
- **Widow utility (rule 1.3):** add the `preventWidow` helper and apply it to
  headings and key paragraphs, resolving the count from a breakpoint (3 mobile,
  5 desktop).
- **Framer Motion:** requested but not installed. Decide whether to adopt it in the
  docs or product app. Keep it out of `@ucm/ui`.
- **Instrument Serif:** deferred until a brand surface needs it.
- **Promotion candidates:** `PropsTable`, and a future `Card`, `Field`, and
  `StickyActionBar`, should graduate from the docs app into `@ucm/ui`.
- **Visual baselines:** Playwright baselines are macOS (`-darwin`). CI on Linux
  needs Linux baselines.

---

## 13. Component and primitive inventory

| Name | Level | Mode | Location | Status |
|---|---|---|---|---|
| Color tokens | Tokens | Shared | `foundation/styles/tokens.css` | Built |
| Motion primitives | Tokens | Shared | `foundation/styles/motion.css` | Built |
| `cx` | Atom | Shared | `foundation/utils/cx.ts` | Built |
| Locale (`LocaleProvider`, `useLocale`, `Label`) | Atom | Shared | `foundation/locale/*` | Built |
| `Icon` (+ 20 paths) | Atom | Shared | `foundation/icon/*` | Built |
| `Button` | Atom | Product | `product/button/*` | Built |
| `BrandButton` | Atom | Brand | `brand/button/*` | Built |
| `GlowButton` | Atom | Brand | `brand/button/*` | Built |
| `Demo` | Molecule | Docs | `components/docs/Demo.astro` | Built (eyebrow to fix) |
| `DoDont` | Molecule | Docs | `components/docs/DoDont.astro` | Built (eyebrow to fix) |
| `PropsTable` | Molecule | Docs | `components/docs/PropsTable.astro` | Built |
| `TokenSwatch` | Molecule | Docs | `components/docs/TokenSwatch.astro` | Built |
| Docs header and sidebar | Organism | Brand | `layouts/BrandDocsLayout.astro` | Built (eyebrow to fix) |

---

## 14. Changelog

- **v1 (built-state reference).** First slice in `@ucm/ui`: tokens, motion,
  `cx`, locale, `Icon` with 20 vendored Material Symbols paths, product `Button`,
  brand `BrandButton` and `GlowButton`. Astro docs site with three foundation pages
  and three component pages. Library is framework-agnostic with zero runtime deps,
  no MUI. Added the three global authoring rules: em dash ban, eyebrow ban, widow
  control. Recorded current eyebrow violations as follow-ups.
