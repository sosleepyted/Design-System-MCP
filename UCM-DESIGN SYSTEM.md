# UCM Unified Design System (v1)

One design language for two surfaces:

- **Brand mode** governs the **external** marketing site (`ucm.jobs`): expressive
  heroes, mega nav, conversion CTAs, SEO content. (Source: UCM B2C reference.)
- **Product mode** governs the **internal** app (the logged-in tool where work
  happens): forms, progressive disclosure, sticky action bars, state styles.
  (Source: Product Design System portable spec.)

Both modes sit on one **shared foundation** (Section 1): the same tokens, fonts,
i18n, motion primitives, and copy mechanics. When a value differs by surface, the
mode sections (2 and 3) override the shared default. When in doubt about which
mode you are in, ask: *does this screen serve a marketing goal (persuade, rank,
convert) or a task goal (complete an action)?* Marketing = Brand, task = Product.

This file is the design language. The external site's full content/IA inventory
(page copy, FAQs, city data, route maps) lives in the companion **Content & IA
Reference** (Section 7 indexes it); it is intentionally not re-inlined here.

---

## 0. THE LAYER MODEL AND RESOLVED CONFLICTS

The two source systems agreed on ~80% (tokens, fonts, i18n, navy-alpha borders,
ease-out motion). The remaining differences were resolved by **scoping to mode**
rather than picking a single global winner. The six decisions:

| # | Topic | Brand (external) | Product (internal) |
|---|---|---|---|
| 1 | Expressive bans (hero-metrics, repeated card grids, glow, decorative blur) | Permitted | **Banned** (Section 13) |
| 2 | Primary CTA color | **Yellow** `#FCC224` | **Navy** `#001E2B` |
| 3 | Success green | brighter ok as decorative checkmark | canonical token `#0f5e2a` |
| 4 | Radius + shadow | large radii (24/28) + glow shadows allowed | radius 20/12/full + restrained shadow |
| 5 | Copy voice | motivational allowed | informational only |
| 6 | Font count | may add Instrument Serif (decorative, 3rd) | two families max |

Copy **mechanics** (no em dashes, bilingual, sentence-case data) and the **no
`#000`/`#fff` as ink/surface** rule are **global**, not per-mode.

One cleanup applied: the external system's orphan teal CSS variables
(`--cta: #03677e`, `--sand`, `--background: #eaf0f3`) contradicted the brand
triad and have been dropped. The teals survive only as an accent sub-palette
(Section 1.3), never as the CTA color.

---

# 1. SHARED FOUNDATION

Applies to **both** modes unless a mode section overrides it.

## 1.1 Philosophy

- **Cream + navy + yellow.** The whole system is one triad. Do not introduce new
  hues; the teal/status colors are accents, not primaries.
- **Hierarchy through contrast, not decoration.** Adjacent type steps differ by
  at least 1.25x in size or weight. Never ship flat scales (14 / 14.5 / 15).
- **Light-weight headings.** Figtree at weight 300 with tight tracking
  (`tracking-[-0.02em]`) is the brand voice across both surfaces.
- **Borders are navy with alpha.** Never plain `#000` or gray. Always
  `border-[#001E2B]/NN`.
- **One signature easing.** `cubic-bezier(0.22, 1, 0.36, 1)` at 220-400ms when in
  doubt. Ease-out only, no bounce or elastic.
- **Precision minimalism.** Minimal is not sloppy. Use exact values, not vibes.

## 1.2 Tech stack

| Tool | Version / rule |
|------|----------------|
| Next.js | 16 (App Router); 15+ minimum |
| React | 19 |
| TypeScript | 5 (strict) |
| Tailwind | v4 (`@import "tailwindcss"`), tokens in `globals.css` via `@theme inline`. **No** `tailwind.config.js`. Arbitrary `[bracket]` values are normal. |
| Icons | **Product:** MUI icons only (`@mui/icons-material/*`), imported individually, no other MUI components. **Brand:** inline SVG (arrow glyph). |
| Smooth scroll | `lenis` (brand mode only) |
| Fonts | `next/font/google`, see 1.5 |

## 1.3 Tokens (canonical `@theme inline`)

```css
@theme inline {
  /* Brand triad (no #000, no #fff as ink/surface) */
  --color-ink: #001e2b;        /* deep navy/teal, use everywhere instead of black */
  --color-page: #f5f5f3;       /* warm off-white page background */
  --color-accent: #fcc224;     /* bright yellow */
  --color-accent-hover: #ffd84d;

  /* Status */
  --color-success: #0f5e2a;
  --color-danger:  #a32d2d;
  /* warning uses the accent family (see 1.6) */

  /* Fonts */
  --font-figtree: var(--font-figtree);
  --font-nunito:  var(--font-nunito);   /* wordmark only */
  --font-sans: var(--font-figtree), ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
```

**Named surfaces** (use these instead of ad hoc whites/grays):

| Token | Hex | Use |
|-------|-----|-----|
| Page | `#F5F5F3` | primary page background (on `body`) |
| Card | `#FFFFFF` | card surface |
| Cream tint | `#F8F5EE` (often `/40`) | pill chips, soft callouts; brand mobile nav panel |
| Light gray | `#EDECEA` | nav pill background, secondary surfaces |
| Faint gray | `#F7F7F7` | inputs/inactive pill states (brand) |
| Card ink-on-dark | `#F0F0EB` | text on dark featured cards (brand) |
| Hero dark | `#0a0f14` | cinematic dark hero section (brand only) |
| Overlay scrim | `#001E2B/45` + `backdrop-blur-[3px]` | modal/nav backdrops |

**Accent sub-palette** (decorative accents only, never the CTA):
teals `#03677E #024E60 #0E3E4A #114C5A #1A8578 #2FB8A8`, light blue `#C2E8FF`,
light cyan `#D9E8E2`, brand orange `#F0A639`, logo accent dot `#FF9932`.

To re-skin for a new product: change `--color-ink`, `--color-page`,
`--color-accent`, keep the opacity-ramp discipline (1.6), keep accent under ~10%
of any product surface.

## 1.4 `globals.css` foundation

```css
@import "tailwindcss";

@theme inline { /* tokens from 1.3 */ }

:root { color-scheme: light; }

body {
  background-color: #f5f5f3;
  color: #001e2b;
  font-family: var(--font-figtree), ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Prevent widows site-wide */
p, h1, h2, h3, h4, h5, h6, li, dt, dd, blockquote { text-wrap: pretty; }

/* Product micro-motion (ease-out only) */
@keyframes rise {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slide-down {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-rise       { animation: rise 220ms ease-out both; }
.animate-slide-down { animation: slide-down 200ms ease-out both; }

/* Brand entrance + ambient motion (signature easing) */
@keyframes marquee  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1);} 50% { opacity:.5; transform:scale(1.4);} }
@keyframes brand-rise {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* usage: animation: brand-rise .9s cubic-bezier(0.16,1,0.3,1) both; */

@media (prefers-reduced-motion: reduce) {
  .animate-rise, .animate-slide-down { animation: none; }
  /* gate brand parallax/scatter/marquee off here too */
}
```

## 1.5 Fonts

| Role | Family | Weights | CSS var | Notes |
|------|--------|---------|---------|-------|
| UI / body (default) | **Figtree** | 300-900 | `--font-figtree` | `display:"swap"`, `subsets:["latin","latin-ext"]` (covers ä ö ü ß). Default sans. |
| Wordmark / logo | **Nunito 800** | 800 | `--font-nunito` | Logo only. Never UI text. |
| Decorative | **Instrument Serif** | 400 (italic + normal) | `--font-instrument-serif` | **Brand mode only.** Product mode = two families max. |

Use via `font-[family-name:var(--font-figtree)]`, or in headings via inline
`style={{ fontFamily: "var(--font-figtree)" }}`. Preload only the critical weight.

## 1.6 Color ramps (ink opacity)

Apply via `/NN` on text/border utilities. Lead with this fuller ramp (product
grade); brand's coarser stops `/55 /65 /80` and `/8 /10 /15` map onto it.

**Text:**

    text-[#001E2B]      headlines, focused input text
    text-[#001E2B]/85   body emphasis (checkbox labels)
    text-[#001E2B]/78   body (list items, paragraphs, dd values)
    text-[#001E2B]/65   secondary body, help intros
    text-[#001E2B]/55   tertiary: field labels, eyebrows, fine print
    text-[#001E2B]/45   subdued icon stroke
    text-[#001E2B]/35   placeholder text

**Borders / dividers:**

    border-[#001E2B]/8    in-card dividers, faint hairlines
    border-[#001E2B]/10   default card border (subtler)
    border-[#001E2B]/12   default card / input border
    border-[#001E2B]/15   outlined buttons (brand)
    border-[#001E2B]/25   hover state on cards / inputs

**Accent (yellow), used sparingly:**

    #FCC224         base
    #FCC224/22      soft tinted background
    #FCC224/60      strong border (empty/attention field)
    #FCC224/25      ring partner to that border
    #8a5a00         text on yellow-tinted background
    #a96b00         inline warning text

**Status:** success `#0f5e2a` (text) / `#0f5e2a/22` (tint); danger `#a32d2d`
(text + button bg) / `#a32d2d/10` (hover tint); warning = the yellow family above.

## 1.7 i18n (bilingual by default)

`LocaleContext` exposes `useLocale()` returning `{ locale, setLocale, t }`.
Default locale `"de"`, persisted in `localStorage` as `ucm-locale`. Every
user-visible string is a `Label = { de: string; en: string }`, rendered via
`t(label)`. In product mode, declare strings in a `COPY` const at the top of the
file and render `t(COPY.someKey)`; keep the COPY-at-top discipline even if a
project is ever single-locale.

```ts
type Label = { de: string; en: string };
const COPY = { submit: { de: "Anfrage senden", en: "Send request" } };
// <button>{t(COPY.submit)}</button>
```

## 1.8 Motion foundation

- **Signature easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (snappy reveal: mega
  nav, mobile slide, scatter). Simple fades use plain `ease-out`. Reveal-on-
  scroll / logo letters use `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Never** animate layout props (`width/height/top/left`); animate `transform`,
  `opacity`, `clip-path` only. No `transition-all`.
- **Durations:** micro 180-220ms (hover, opacity), standard 300ms (hover state,
  accordion), medium 400ms (panel slide); **brand only:** long 500-900ms (image
  transitions, logo reveal).
- Hover affordances are subtle: border-color shift + minor bg-tint
  (`hover:bg-[#001E2B]/[0.03]`), nothing larger than a 1-2px transform. Lift
  idiom `hover:-translate-y-[1px]` or card scale `hover:scale-[1.02]`.
- Pressed feel `active:scale-[0.97]`. All entrance/ambient motion disabled under
  `prefers-reduced-motion: reduce`.

## 1.9 Copy mechanics (global, non-negotiable)

- **No em dashes** in user-visible text. Use commas, colons, semicolons,
  parentheses, periods. En dashes for numeric ranges (4-13) are fine; prefer
  "bis" in German.
- Every user-visible string is bilingual (DE + EN), both present at once.
- No restated headings; no intro that repeats the title.
- For lists/categories from data, display sentence case as a display-only
  transform; never mutate the stored value.
- (Voice differs by mode: see 2.7 and 3.7.)

---

# 2. BRAND MODE (external website)

Overrides the shared foundation for the public marketing site. Expressive
license is the point: this surface persuades, ranks, and converts.

## 2.1 When it applies
Public `ucm.jobs` pages: `/`, `/unternehmen/*`, `/studierende/*`, `/referenzen`,
`/kontakt`, etc. Marketing heroes, navigation, SEO content.

## 2.2 Expressive license (allowed here, banned in product)
- Cinematic/large heroes, parallax (`translateY(scrollY * 0.2)`), scroll-driven
  scatter cards, marquee logo parades, `pulseDot` accents.
- Hero metric / stats bars (e.g. 98% / <1% / 90%).
- Repeated card grids (the 8-card branchen grids, city cards) when they serve a
  scannable content index.
- Larger radii: `rounded-[24px]` section blocks, `rounded-[28px]` feature blocks.
- Dramatic shadows, including the yellow CTA glow.
- Decorative Instrument Serif.

## 2.3 Typography (brand scale)

| Role | Class string |
|------|--------------|
| Hero / display | `text-[32px] font-light leading-[1.08] tracking-[-0.02em] [text-wrap:balance]` |
| Sub-display | `text-[26px] font-light leading-[1.12] tracking-[-0.02em]` |
| Logo (Nunito) | `text-[22px] font-extrabold tracking-[-0.04em]` |
| Responsive hero | `text-[clamp(1rem,2.5vw,2.4rem)]` |
| Eyebrow caps | `text-[12px] font-medium uppercase tracking-[0.08em] text-[#001E2B]/55` |
| Standard paragraph | `text-[15px] leading-[1.55] tracking-[-0.01em]` |
| Caption / meta | `text-[13px]` or `text-[12.5px] tracking-[0.01em]` |

## 2.4 Radius + shadow (brand)

Radii in use: `rounded-full` (CTAs/pills), `6/8` (inputs, hover slots), `10`
(featured cards), `12` (mega nav panel, mid cards), `14/16` (cards, images), `20`
(card groups), `24` (section blocks), `28` (large feature blocks).

```
/* subtle card */   shadow-[0_4px_8px_-2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)]
/* medium */        shadow-[0_12px_28px_-18px_rgba(23,43,54,0.35)]
/* large (mega nav)*/shadow-[0_24px_60px_-20px_rgba(23,43,54,0.25)]
/* yellow CTA glow */shadow-[0_20px_60px_-20px_rgba(255,200,1,0.45)]
/* inner highlight */shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]
```

## 2.5 CTAs (primary = yellow)

```html
<!-- Primary CTA (yellow) -->
<a class="flex w-full items-center justify-center gap-2 rounded-full bg-[#FCC224]
          px-5 py-3.5 text-[14px] font-semibold text-[#001E2B] transition
          hover:bg-[#FFD84D]">

<!-- Dark button (secondary emphasis) -->
<a class="inline-flex items-center gap-2 rounded-full bg-[#001E2B] px-6 py-3
          text-[14px] font-medium text-white transition hover:bg-[#0a2a37]">

<!-- Outlined -->
<a class="flex w-full items-center justify-center gap-2 rounded-full
          border border-[#001E2B]/15 px-5 py-3.5 text-[14px] font-semibold
          text-[#001E2B] transition hover:bg-[#001E2B]/5">
```

Inline arrow glyph (paired with the above):
```html
<svg viewBox="0 0 12 12" class="size-3" fill="none">
  <path d="M4.16 4.4V3.5h4.34v4.34h-.9V5.03l-3.47 3.47L3.5 7.87 6.97 4.4H4.16Z" fill="currentColor"/>
</svg>
```

**GlowButton** (`href`, `bg=#FCC224`, `fg=#001E2B`, `glow=#F1F6F4`, `border?`,
`hideArrow?`): tracks `--x`/`--y` from the cursor; on hover paints
`radial-gradient(260px circle at var(--x) var(--y), var(--glow), transparent 60%)`;
`hover:-translate-y-[1px]`; arrow `group-hover:translate-x-1`. The radial glow is
the one gradient permitted anywhere in the system, brand only.

## 2.6 Cards & navigation (brand)

**Light card:** `rounded-[16px] bg-white p-6 text-[#001E2B] shadow-[0_12px_28px_-18px_rgba(23,43,54,0.35)]`

**Dark featured card** (mega nav / featured blocks):
```html
<a class="group flex flex-col overflow-hidden rounded-[10px] bg-[#001E2B] p-2 transition hover:bg-[#0a2a37]">
  <div class="overflow-hidden rounded-[8px]">
    <img class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"/>
  </div>
  <div class="px-2 pb-2 pt-3">
    <div class="text-[13.5px] font-semibold text-[#F0F0EB]">Title</div>
    <div class="mt-1 text-[12.5px] leading-[1.45] text-[#F0F0EB]/70">Body</div>
  </div>
</a>
```

**Pill / segmented control:**
```html
<ul class="flex items-center gap-1 list-none m-0 rounded-full bg-[#EDECEA] p-[5px]">
  <li><a class="block rounded-full px-6 pb-[11px] pt-[13px] text-[13px] font-medium
                tracking-[0.01em] text-[#001E2B] transition hover:bg-white/60">Item</a></li>
</ul>
<!-- active: bg-[#FCC224]; inactive: bg-[#F7F7F7] text-[#001E2B]/40 -->
```

**Desktop mega nav** (`Home3MegaNav`): backdrop
`backdrop-filter:blur(8px); background:rgba(0,30,43,0.28)` with 320ms signature
easing. Panel `fixed inset-x-0 top-[92px] ... rounded-[12px] border-[#001E2B]/8
bg-white p-4 shadow-[0_24px_60px_-20px_rgba(23,43,54,0.25)]`. Reveal
`opacity 220ms ease, transform 260ms cubic-bezier(0.22,1,0.36,1)`; off-state
`opacity-0 translateY(-6px)`. Dynamic grid columns by content presence
(`1fr 2fr 1fr` / `1fr 2fr` / `2fr 1fr` / `1fr`).

**Mobile slide-out:** outer `fixed inset-0 z-[106] flex flex-col bg-[#F8F5EE]
transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]`
(closed `translateX(100%)`, open `translateX(0)`); overlay `z-[105]
bg-[#001E2B]/30 backdrop-blur-sm`. Two-pane sub-panel slides a `w-[200%]` track by
`translateX(-50%)`. **Always apply the body scroll lock** when opening any
fullscreen mobile sheet:
```ts
const scrollY = window.scrollY;
body.style.position = "fixed"; body.style.top = `-${scrollY}px`;
body.style.left = "0"; body.style.right = "0"; body.style.width = "100%";
body.style.overflow = "hidden";
// on close: restore styles, then window.scrollTo(0, scrollY)
```

## 2.7 Voice (brand)
Motivational is allowed ("Sei stolz auf deinen Nebenjob", "Semesterferien?
Vollgas."). Still obeys the global copy mechanics (1.9): no em dashes, bilingual.

## 2.8 Layout (brand)
Container `max-w-[1440px]`. Section padding `py-16` to `py-32`. Buttons
`px-6 py-3` to `px-7 py-3.5`. List gaps `gap-2`-`gap-3`; block gaps `gap-6`-`gap-8`.

---

# 3. PRODUCT MODE (internal app)

Overrides the shared foundation for the logged-in tool. Restrained palette,
functional polish, no maximalism. The UI serves a task.

## 3.1 When it applies
Authenticated app surfaces: forms, wizards, dashboards, booking/shift flows,
settings. Anything where the user is completing an action, not being marketed to.

## 3.2 Typography (product scale)

| Role | Class string |
|------|--------------|
| Hero / page title | `text-[clamp(24px,3.6vw,30px)] font-light leading-[1.12] tracking-[-0.022em] [text-wrap:balance]` (larger: `clamp(26px,4vw,34px)` / `leading-[1.1]`) |
| Section heading (in cards) | `text-[14.5px] font-medium tracking-[-0.012em]` |
| Eyebrow | `text-[11px] font-medium uppercase tracking-[0.04em] text-[#001E2B]/55` |
| Field label | `text-[12px] font-medium tracking-[0.01em] text-[#001E2B]/55` |
| Body paragraph | `text-[13.5px] leading-[1.55] text-[#001E2B]/65` (to `/78`) |
| Bullet item | `text-[13px] leading-[1.55] text-[#001E2B]/78` |
| Help / micro-copy | `text-[12px] leading-[1.55] text-[#001E2B]/55` |
| Total | `text-[22px] font-medium leading-tight tracking-[-0.018em] tabular-nums` |

Numbers (prices, times, counts) always `tabular-nums`. Headings set font via
inline `style={{ fontFamily: "var(--font-figtree)" }}`.

## 3.3 Radius + shadow (product)
`rounded-[20px]` cards, `rounded-[12px]` inputs, `rounded-full` pills/buttons,
`rounded-[16-24px]` modals. One restrained card shadow:
`shadow-[0_12px_28px_-22px_rgba(23,43,54,0.4)]`. Primary button shadow
`shadow-[0_8px_24px_-14px_rgba(0,30,43,0.7)]`; modal
`shadow-[0_30px_70px_-20px_rgba(0,30,43,0.5)]`. **No glow shadows here.**

## 3.4 Spacing (product)
Container: `mx-auto max-w-[680px] px-4 sm:px-6 md:max-w-[960px] md:px-8`. Screen
body `pt-6` + bottom clearance for the sticky bar
(`pb-[calc(7rem_+_env(safe-area-inset-bottom))]`). In-card divider is **never** a
nested card: `border-t border-[#001E2B]/8 pt-4 sm:pt-5`. Rhythm descends
`mt-5` (major) -> `mt-4` (subsection) -> `mt-3` (within) -> `mt-2.5` (help).

## 3.5 Component primitives

**Card:** `rounded-[20px] border border-[#001E2B]/10 bg-white p-5 sm:p-6
shadow-[0_12px_28px_-22px_rgba(23,43,54,0.4)]`. Skeleton:
`animate-pulse rounded-[10px] bg-[#001E2B]/[0.06]`.

**Button** (primary = navy): base `inline-flex items-center justify-center gap-2
rounded-full font-medium tracking-[-0.005em] transition disabled:cursor-not-allowed`.
```
primary  bg-[#001E2B] text-white shadow-[0_8px_24px_-14px_rgba(0,30,43,0.7)]
         hover:bg-[#0a2d3c] disabled:opacity-45 disabled:shadow-none
ghost    text-[#001E2B]/70 hover:bg-[#001E2B]/[0.04] hover:text-[#001E2B]
outline  border border-[#001E2B]/15 text-[#001E2B]/85
         hover:border-[#001E2B]/30 hover:bg-[#001E2B]/[0.02]
danger   bg-[#a32d2d] text-white shadow-[0_8px_24px_-12px_rgba(163,45,45,0.6)]
         hover:bg-[#8c2424] disabled:opacity-45
```
Sizes: `default = h-9 px-4 text-[13.5px]`, `lg = h-11 px-5 text-[14.5px]`. Props:
`variant`, `size`, `hideArrow` (primary shows forward arrow by default),
`iconLeft`. Renders `<a>` when `href` is passed, else `<button>`.

**StickyActionBar:** fixed bottom on mobile, static on desktop, with iOS safe
area:
```tsx
<div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 sm:static sm:z-auto">
  <div className="pointer-events-auto border-t border-[#001E2B]/8 bg-[#F5F5F3]/92
    backdrop-blur-[6px] sm:border-0 sm:bg-transparent sm:backdrop-blur-0">
    <div className="mx-auto max-w-[680px] px-4 py-3 sm:max-w-[960px] sm:px-8 sm:py-0"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
      {children}
    </div>
  </div>
</div>
```

**Field** (labeled input). Label row + bordered wrapper + optional help. Input
`text-[14px]` (see 3.6 iOS note).
```
default  border-[#001E2B]/12 not-focus-within:hover:border-[#001E2B]/25
         focus-within:border-[#001E2B] focus-within:ring-2 focus-within:ring-[#001E2B]/15
empty    border-[#FCC224]/60 ring-2 ring-[#FCC224]/25 focus-within:border-[#FCC224]
input    w-full rounded-[12px] bg-transparent px-3.5 py-2.5 text-[14px]
         text-[#001E2B] outline-none placeholder:text-[#001E2B]/35 disabled:opacity-60
```
Optional `labelRight` slot puts a secondary control on the field-name row
(`flex items-center justify-between gap-2`, label `min-w-0 truncate`).

**Textarea:** same shell, `text-[14px] leading-[1.5]`, `resize-none`, auto-grow
(start `rows={1}`; on change set `el.style.height="auto"` then
`el.style.height = el.scrollHeight + "px"` in a `useLayoutEffect`).

**CheckboxRow:**
```tsx
<label className="flex cursor-pointer items-start gap-3">
  <input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-[#001E2B]" />
  <span className="min-w-0 flex-1 text-[13.5px] leading-[1.5] text-[#001E2B]/85">{label}</span>
</label>
```

**Toggle chip** (`<button role="switch" aria-checked>`): off = soft neutral, on =
solid success green with a check.
```
base  inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full
      px-2.5 py-1 text-[12px] font-medium transition active:scale-[0.97]
on    bg-[#0f5e2a] text-white hover:bg-[#0f5e2a]/90  + <CheckIcon sx={{fontSize:14}}>
off   bg-[#001E2B]/[0.05] text-[#001E2B]/55 hover:bg-[#001E2B]/[0.09] hover:text-[#001E2B]
```

**Modal:** centered, `max-w-[420-560px]`, `rounded-[16-24px]`,
`border-[#001E2B]/12`, `shadow-[0_30px_70px_-20px_rgba(0,30,43,0.5)]`. Backdrop is
a click-to-dismiss `<button class="absolute inset-0 bg-[#001E2B]/45 backdrop-blur-[3px]">`;
wire Esc too. Animate in with `animate-rise`. Exhaust inline / progressive
disclosure first.

## 3.6 Form patterns
- **iOS input zoom:** `text-[14px]` triggers iOS Safari zoom on focus. If
  unacceptable, use 16px on coarse pointers (3.8) and 14px elsewhere.
- **Secondary control on the label row**, not floating below the input.
- **Disclosure (the 95% case):** do NOT lead with a boxed Yes/No. Instead:
  (1) a quiet one-line default note (`12.5px`, `/65`); (2) a `CheckboxRow`
  "Adjust X / X anpassen"; (3) conditional inputs revealed only when ticked, in
  the **same card** behind a `border-t border-[#001E2B]/8 pt-4` divider, never a
  nested card; (4) help text (`12px`, `/55`) for downstream rules.

## 3.7 Voice (product)
Informational, never opinionated. "3 days remaining" not "Hurry, only 3 days
left!". Help text states what is true, not what is forbidden ("Minimum 50%; lower
inputs are raised automatically").

## 3.8 State styles
- Empty/attention input: `border-[#FCC224]/60 ring-2 ring-[#FCC224]/25 focus-within:border-[#FCC224]`.
- Inline warning: `text-[12px] leading-snug text-[#a96b00] [text-wrap:pretty]`.
- Success: `text-[#0f5e2a]` + `CheckCircleOutlineIcon` (`sx={{fontSize:14}}`), or
  the solid-green toggle chip.
- Fill/progress: fold into the relevant stat (`2 (all filled)`, `3 (2 filled)`),
  suffix muted.
- Destructive confirm modal: danger primary + ghost cancel; show exactly what is
  being deleted (name/filename inline) first.

## 3.9 Icons (product)
MUI only, individual imports, sized via `sx={{fontSize:14-18}}` not className.
Default stroke inherits color (typically `/55`). `aria-hidden` on decorative,
`aria-label` on icon-only buttons. Custom inline SVG: `stroke-width="1.75"`,
round caps/joins to match MUI weight.

---

# 4. RESPONSIVE & MOBILE (both modes)

- Verify at 320, 375, 768, 1024, 1440. No horizontal overflow.
- Touch targets minimum 36px (`size-9` / `h-9`); primary mobile CTAs 44px (`h-11`).
- `viewportFit:"cover"` + `env(safe-area-inset-bottom)` so fixed bars clear the
  iOS home indicator.
- Adapt copy to **capability**, not just width. Drag-and-drop does not exist on
  touch: `pointer-coarse:hidden` to hide "Drop a file here", `hidden
  pointer-coarse:block` to show the tap-only title. Keys off `@media (pointer:
  coarse)`, no JS device sniffing.
- Client state that must survive reload (toggles, wizard step, draft) belongs in
  a persistence layer (localStorage / server), not component memory. Serialize
  `Set`s as arrays.

---

# 5. ABSOLUTE BANS

**Global (both modes):**
- Em dashes in user-visible copy.
- `#000` / `#fff` as ink or surface (use the ink ramp + warm off-white).
- Gradient **text** (`background-clip:text`).
- New hues outside the triad + documented accents.

**Product mode only** (Brand mode is explicitly exempt, see Section 2):
- Nested cards (a card inside a card). Use `border-t border-[#001E2B]/8` dividers.
- Side-stripe borders (colored `border-left`/`border-right` > 1px as accent).
- Gradient backgrounds (the brand GlowButton radial is the lone exception, brand
  only).
- Glassmorphism as decorative default (functional scrim blur on
  modals/nav backdrops is allowed everywhere).
- The hero-metric template (big number + small label + supporting stat).
- Identical card grids (repeated same-size icon-headline-text cards).
- Modal as first thought (exhaust inline / progressive disclosure first).

---

# 6. BUILD ORDER & WORKFLOW

## 6.1 Build order for a fresh project (foundation before features)
1. `globals.css` (Section 1.4): body bg, `text-wrap:pretty`, `@theme inline`
   tokens, motion keyframes.
2. Font loading via `next/font` + the locale layer (`LocaleContext`, `Label`,
   `useLocale`).
3. Shared primitives: `PageContainer`, `StickyActionBar` (product);
   nav shell + `GlowButton` (brand).
4. `Button`, `Field`, `Textarea`, `CheckboxRow`.
5. MUI icon imports as needed (product).

Only then build feature/marketing screens.

## 6.2 Checklist for any UI change
1. Register the mode: Brand (persuade) or Product (task)?
2. Pick color strategy (restrained for product), light warm-off-white theme,
   varied spacing rhythm. Run the category-reflex check (could someone guess the
   palette from the domain alone? if yes, rework).
3. Match implementation complexity to the vision.
4. Verify: type checker clean; no em dashes in new copy; both DE and EN present
   for every new `Label`; mode-appropriate bans respected; responsive at all
   breakpoints; touch targets >= 36px.

---

# 7. CONTENT & IA REFERENCE (external site)

The brand site's full content inventory is maintained as a companion reference
(the UCM B2C document, Sections 10-13). It is not re-inlined here. It contains:

- **`/unternehmen/` (26 pages):** main index, 10 city pages (pool sizes, SEO
  titles, H1s, referenzkunden, branchen/job-type cards, Berlin Büro block), the
  branchen index + 8 subpages, the personal index + 6 subpages, with per-page
  FAQs and CTA bands.
- **`/studierende/` (29 pages):** hub, so-funktionierts, 8 job-role pages, the
  vertragsarten index + 4 contract subpages, 10 city pages, 4 jobs/application
  pages, plus the spec-route -> live-route map.
- **Shared boilerplate:** header/megamenu structure, footer + SEO city band,
  universal CTAs ("Personal anfragen" / "Jetzt bewerben"), universal stats
  (60.000+ Studierende, ab 16 EUR/h, ZÜP 4-6 Wochen), JSON-LD guidance.
- **CMS porting guidance** and the list of source inconsistencies to fix
  (footer badge/tagline drift, copyright string variance, missing city pool
  sizes, ZÜP-wording duplication).

When building marketing pages, pull copy and page templates from that reference;
apply Brand-mode styling (Section 2) on top.

---

# 8. CHANGELOG

- **v1** — Merged the external (brand) and internal (product) systems into one.
  Established the shared foundation; scoped the six conflicts by mode (Section 0);
  dropped the orphan teal CSS variables; demoted teals to an accent sub-palette;
  set primary CTA per mode (yellow brand / navy product); scoped the product bans
  so Brand mode retains expressive license.
