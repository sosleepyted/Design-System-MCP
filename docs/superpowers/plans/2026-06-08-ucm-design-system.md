# UCM Design System — Library + Docs Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a pnpm monorepo with a framework-agnostic `@ucm/ui` React component library (shared foundation + Product Button + Brand GlowButton/CTAs) and an Astro docs site that documents them in Brand-mode chrome.

**Architecture:** `@ucm/ui` is pure React 19 + Tailwind v4 utility classes with **zero Next.js dependency** — fonts referenced only via CSS variables, links render plain `<a>`/`<button>`. It builds to ESM + `.d.ts` via Vite library mode and ships its design tokens as importable CSS. The Astro docs app consumes the built package, wires Tailwind v4 to scan the library source (`@source`), loads Figtree + Nunito via Fontsource, and renders live demos as React islands wrapped in `LocaleProvider`.

**Tech Stack:** pnpm workspaces, React 19, TypeScript 5 (strict), Tailwind v4 (no config file), Astro 5 (`@astrojs/react`, `@astrojs/mdx`), Vite library mode + `vite-plugin-dts`, Vitest + Testing Library, `@mui/icons-material`, Fontsource (Figtree/Nunito), Playwright.

**Design source of truth:** `UCM-DESIGN SYSTEM.md` (v1). Spec: `docs/superpowers/specs/2026-06-08-ucm-design-system-design.md`.

---

## File structure

```text
ucm-design/
├── package.json                       # root: workspaces + scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .npmrc
├── packages/ui/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts                 # library build + dts
│   ├── vitest.config.ts
│   ├── vitest.setup.ts
│   └── src/
│       ├── index.ts                   # barrel
│       ├── foundation/
│       │   ├── utils/cx.ts
│       │   ├── utils/cx.test.ts
│       │   ├── locale/types.ts
│       │   ├── locale/LocaleContext.tsx
│       │   ├── locale/LocaleContext.test.tsx
│       │   ├── locale/index.ts
│       │   └── styles/
│       │       ├── tokens.css
│       │       └── motion.css
│       ├── product/button/
│       │   ├── Button.tsx
│       │   ├── Button.test.tsx
│       │   └── index.ts
│       └── brand/button/
│           ├── GlowButton.tsx
│           ├── BrandButton.tsx
│           ├── BrandButton.test.tsx
│           ├── GlowButton.test.tsx
│           └── index.ts
└── apps/docs/
    ├── package.json
    ├── astro.config.mjs
    ├── tsconfig.json
    ├── playwright.config.ts
    └── src/
        ├── styles/globals.css
        ├── content/config.ts
        ├── content/foundations/{color,typography,motion}.mdx
        ├── content/components/{product-button,brand-button}.mdx
        ├── layouts/BrandDocsLayout.astro
        ├── components/docs/{Demo.astro,DoDont.astro,PropsTable.astro,TokenSwatch.astro}
        ├── islands/{LocaleToggle.tsx,ProductButtonDemo.tsx,BrandButtonDemo.tsx}
        ├── pages/index.astro
        ├── pages/foundations/[slug].astro
        └── pages/components/[slug].astro
```

---

## Task 1: Monorepo scaffold

**Files:**
- Create: `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.npmrc`

- [ ] **Step 1: Create the workspace manifest**

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

- [ ] **Step 2: Create `.npmrc`**

```ini
auto-install-peers=true
strict-peer-dependencies=false
```

- [ ] **Step 3: Create the root `package.json`**

```json
{
  "name": "ucm-design",
  "private": true,
  "type": "module",
  "engines": { "node": ">=20" },
  "scripts": {
    "build:ui": "pnpm --filter @ucm/ui build",
    "dev:docs": "pnpm build:ui && pnpm --filter @ucm/docs dev",
    "build": "pnpm build:ui && pnpm --filter @ucm/docs build",
    "test": "pnpm --filter @ucm/ui test",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint"
  },
  "devDependencies": {
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 4: Create `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-workspace.yaml tsconfig.base.json .npmrc
git commit -m "chore: scaffold pnpm monorepo root"
```

---

## Task 2: `@ucm/ui` package init + `cx` utility (TDD)

**Files:**
- Create: `packages/ui/package.json`, `packages/ui/tsconfig.json`, `packages/ui/vite.config.ts`, `packages/ui/vitest.config.ts`, `packages/ui/vitest.setup.ts`, `packages/ui/src/index.ts`
- Create: `packages/ui/src/foundation/utils/cx.ts`
- Test: `packages/ui/src/foundation/utils/cx.test.ts`

- [ ] **Step 1: Create `packages/ui/package.json`**

```json
{
  "name": "@ucm/ui",
  "version": "0.0.0",
  "type": "module",
  "sideEffects": ["*.css"],
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./styles/tokens.css": "./src/foundation/styles/tokens.css",
    "./styles/motion.css": "./src/foundation/styles/motion.css"
  },
  "files": ["dist", "src/foundation/styles"],
  "scripts": {
    "build": "vite build",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^6.1.0",
    "@mui/material": "^6.1.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "jsdom": "^25.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "vite": "^6.0.0",
    "vite-plugin-dts": "^4.2.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create `packages/ui/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `packages/ui/vite.config.ts`** (library build)

```ts
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ include: ["src"], exclude: ["**/*.test.*"] })],
  build: {
    lib: { entry: resolve(__dirname, "src/index.ts"), formats: ["es"], fileName: "index" },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@mui\//,
        /^@emotion\//,
      ],
    },
  },
});
```

- [ ] **Step 4: Create `packages/ui/vitest.config.ts` and `vitest.setup.ts`**

`packages/ui/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

`packages/ui/vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Write the failing test** — `packages/ui/src/foundation/utils/cx.test.ts`

```ts
import { cx } from "./cx";

test("joins truthy class strings with a space", () => {
  expect(cx("a", "b", "c")).toBe("a b c");
});

test("drops falsey values", () => {
  expect(cx("a", false, undefined, "b", null as unknown as string)).toBe("a b");
});

test("returns an empty string when nothing is passed", () => {
  expect(cx()).toBe("");
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `pnpm --filter @ucm/ui exec vitest run src/foundation/utils/cx.test.ts`
Expected: FAIL — cannot find module `./cx`.

- [ ] **Step 7: Create `packages/ui/src/foundation/utils/cx.ts`**

```ts
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
```

- [ ] **Step 8: Create a minimal barrel `packages/ui/src/index.ts`**

```ts
export { cx } from "./foundation/utils/cx";
```

- [ ] **Step 9: Install dependencies and run the test**

Run: `pnpm install`
Then: `pnpm --filter @ucm/ui exec vitest run src/foundation/utils/cx.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 10: Commit**

```bash
git add packages/ui pnpm-lock.yaml
git commit -m "feat(ui): init @ucm/ui package with cx utility"
```

---

## Task 3: Foundation styles (tokens + motion)

**Files:**
- Create: `packages/ui/src/foundation/styles/tokens.css`
- Create: `packages/ui/src/foundation/styles/motion.css`

These are verbatim from `UCM-DESIGN SYSTEM.md` §1.3/§1.4/§1.6. No unit test (validated visually in Task 8's smoke test and later breakpoints).

- [ ] **Step 1: Create `tokens.css`**

```css
/* UCM design tokens — design system §1.3 / §1.6. Hex, not OKLCH.
   No #000 / #fff as ink or surface. */
@theme inline {
  /* Brand triad */
  --color-ink: #001e2b;
  --color-page: #f5f5f3;
  --color-accent: #fcc224;
  --color-accent-hover: #ffd84d;

  /* Status */
  --color-success: #0f5e2a;
  --color-danger: #a32d2d;

  /* Named surfaces */
  --color-card: #ffffff;
  --color-cream: #f8f5ee;
  --color-light-gray: #edecea;
  --color-faint-gray: #f7f7f7;
  --color-ink-on-dark: #f0f0eb;
  --color-hero-dark: #0a0f14;

  /* Fonts (apps define the actual --font-* values; tokens map them) */
  --font-figtree: var(--font-figtree);
  --font-nunito: var(--font-nunito);
  --font-sans: var(--font-figtree), ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

:root {
  color-scheme: light;
}
```

- [ ] **Step 2: Create `motion.css`**

```css
/* UCM motion primitives — design system §1.4 / §1.8.
   transform / opacity / clip-path only. Ease-out, no bounce. */
@keyframes rise {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slide-down {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes brand-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.4); }
}

.animate-rise { animation: rise 220ms ease-out both; }
.animate-slide-down { animation: slide-down 200ms ease-out both; }
.animate-brand-rise { animation: brand-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }

@media (prefers-reduced-motion: reduce) {
  .animate-rise,
  .animate-slide-down,
  .animate-brand-rise {
    animation: none;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/foundation/styles
git commit -m "feat(ui): add design tokens and motion primitives"
```

---

## Task 4: Locale module (TDD)

**Files:**
- Create: `packages/ui/src/foundation/locale/types.ts`
- Create: `packages/ui/src/foundation/locale/LocaleContext.tsx`
- Create: `packages/ui/src/foundation/locale/index.ts`
- Test: `packages/ui/src/foundation/locale/LocaleContext.test.tsx`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Create `types.ts`**

```ts
export type Locale = "de" | "en";
export type Label = { de: string; en: string };
```

- [ ] **Step 2: Write the failing test** — `LocaleContext.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleProvider, useLocale } from "./LocaleContext";
import type { Label } from "./types";

const GREETING: Label = { de: "Hallo", en: "Hello" };

function Probe() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div>
      <span data-testid="text">{t(GREETING)}</span>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale("en")}>switch</button>
    </div>
  );
}

beforeEach(() => window.localStorage.clear());

test("defaults to German", () => {
  render(<LocaleProvider><Probe /></LocaleProvider>);
  expect(screen.getByTestId("text")).toHaveTextContent("Hallo");
  expect(screen.getByTestId("locale")).toHaveTextContent("de");
});

test("setLocale switches the rendered label and persists it", async () => {
  render(<LocaleProvider><Probe /></LocaleProvider>);
  await userEvent.click(screen.getByRole("button", { name: "switch" }));
  expect(screen.getByTestId("text")).toHaveTextContent("Hello");
  expect(window.localStorage.getItem("ucm-locale")).toBe("en");
});

test("useLocale throws outside a provider", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Probe />)).toThrow(/LocaleProvider/);
  spy.mockRestore();
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `pnpm --filter @ucm/ui exec vitest run src/foundation/locale`
Expected: FAIL — cannot find `./LocaleContext`.

- [ ] **Step 4: Create `LocaleContext.tsx`**

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Label, Locale } from "./types";

const STORAGE_KEY = "ucm-locale";
const DEFAULT_LOCALE: Locale = "de";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (label: Label) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "de" || stored === "en") setLocaleState(stored);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback((label: Label) => label[locale], [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
```

- [ ] **Step 5: Create `index.ts` barrel for locale**

```ts
export { LocaleProvider, useLocale } from "./LocaleContext";
export type { Label, Locale } from "./types";
```

- [ ] **Step 6: Run test to verify it passes**

Run: `pnpm --filter @ucm/ui exec vitest run src/foundation/locale`
Expected: PASS (3 tests).

- [ ] **Step 7: Re-export from the package barrel** — `packages/ui/src/index.ts`

```ts
export { cx } from "./foundation/utils/cx";
export { LocaleProvider, useLocale } from "./foundation/locale";
export type { Label, Locale } from "./foundation/locale";
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/foundation/locale packages/ui/src/index.ts
git commit -m "feat(ui): add bilingual LocaleContext"
```

---

## Task 5: Product Button (TDD)

**Files:**
- Create: `packages/ui/src/product/button/Button.tsx`
- Create: `packages/ui/src/product/button/index.ts`
- Test: `packages/ui/src/product/button/Button.test.tsx`
- Modify: `packages/ui/src/index.ts`

Spec reference: design system §3.5.

- [ ] **Step 1: Write the failing test** — `Button.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

test("renders a <button> by default with the primary variant class", () => {
  render(<Button>Senden</Button>);
  const el = screen.getByRole("button", { name: /senden/i });
  expect(el.tagName).toBe("BUTTON");
  expect(el).toHaveClass("bg-[#001E2B]");
});

test("renders an <a> with href when href is passed", () => {
  render(<Button href="/next">Weiter</Button>);
  const el = screen.getByRole("link", { name: /weiter/i });
  expect(el.tagName).toBe("A");
  expect(el).toHaveAttribute("href", "/next");
});

test("applies the lg size class", () => {
  render(<Button size="lg">Go</Button>);
  expect(screen.getByRole("button")).toHaveClass("h-11");
});

test("primary shows a forward arrow by default and hides it with hideArrow", () => {
  const { rerender, container } = render(<Button>Go</Button>);
  expect(container.querySelector("svg")).not.toBeNull();
  rerender(<Button hideArrow>Go</Button>);
  expect(container.querySelector("svg")).toBeNull();
});

test("ghost variant does not render an arrow", () => {
  const { container } = render(<Button variant="ghost">Go</Button>);
  expect(container.querySelector("svg")).toBeNull();
});

test("disabled button does not fire onClick", async () => {
  const onClick = vi.fn();
  render(<Button disabled onClick={onClick}>Go</Button>);
  await userEvent.click(screen.getByRole("button"));
  expect(onClick).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @ucm/ui exec vitest run src/product/button`
Expected: FAIL — cannot find `./Button`.

- [ ] **Step 3: Create `Button.tsx`**

```tsx
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { cx } from "../../foundation/utils/cx";

export type ButtonVariant = "primary" | "ghost" | "outline" | "danger";
export type ButtonSize = "default" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.005em] transition disabled:cursor-not-allowed";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-[#001E2B] text-white shadow-[0_8px_24px_-14px_rgba(0,30,43,0.7)] hover:bg-[#0a2d3c] disabled:opacity-45 disabled:shadow-none",
  ghost:
    "text-[#001E2B]/70 hover:bg-[#001E2B]/[0.04] hover:text-[#001E2B]",
  outline:
    "border border-[#001E2B]/15 text-[#001E2B]/85 hover:border-[#001E2B]/30 hover:bg-[#001E2B]/[0.02]",
  danger:
    "bg-[#a32d2d] text-white shadow-[0_8px_24px_-12px_rgba(163,45,45,0.6)] hover:bg-[#8c2424] disabled:opacity-45",
};

const SIZES: Record<ButtonSize, string> = {
  default: "h-9 px-4 text-[13.5px]",
  lg: "h-11 px-5 text-[14.5px]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  hideArrow?: boolean;
  iconLeft?: ReactNode;
  children?: ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | "href"> & {
    href?: undefined;
  };
type AsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = AsButton | AsAnchor;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "default",
    hideArrow = false,
    iconLeft,
    children,
    className,
    ...rest
  } = props;

  const classes = cx(BASE, VARIANTS[variant], SIZES[size], className);
  const showArrow = variant === "primary" && !hideArrow;

  const content = (
    <>
      {iconLeft}
      {children}
      {showArrow ? <ArrowForward aria-hidden sx={{ fontSize: 16 }} /> : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={props.href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
```

- [ ] **Step 4: Create `index.ts`**

```ts
export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm --filter @ucm/ui exec vitest run src/product/button`
Expected: PASS (6 tests).

- [ ] **Step 6: Re-export from the package barrel** — append to `packages/ui/src/index.ts`

```ts
export { Button } from "./product/button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./product/button";
```

- [ ] **Step 7: Commit**

```bash
git add packages/ui/src/product packages/ui/src/index.ts
git commit -m "feat(ui): add product Button (navy)"
```

---

## Task 6: Brand GlowButton + BrandButton (TDD)

**Files:**
- Create: `packages/ui/src/brand/button/GlowButton.tsx`
- Create: `packages/ui/src/brand/button/BrandButton.tsx`
- Create: `packages/ui/src/brand/button/index.ts`
- Test: `packages/ui/src/brand/button/GlowButton.test.tsx`, `packages/ui/src/brand/button/BrandButton.test.tsx`
- Modify: `packages/ui/src/index.ts`

Spec reference: design system §2.5.

- [ ] **Step 1: Write the failing tests**

`BrandButton.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { BrandButton } from "./BrandButton";

test("primary brand button is yellow and renders a <button>", () => {
  render(<BrandButton>Anfragen</BrandButton>);
  const el = screen.getByRole("button", { name: /anfragen/i });
  expect(el).toHaveClass("bg-[#FCC224]");
});

test("renders an <a> when href is passed", () => {
  render(<BrandButton href="/x">Mehr</BrandButton>);
  expect(screen.getByRole("link", { name: /mehr/i }).tagName).toBe("A");
});

test("outline variant uses the navy alpha border", () => {
  render(<BrandButton variant="outline">Mehr</BrandButton>);
  expect(screen.getByRole("button")).toHaveClass("border-[#001E2B]/15");
});
```

`GlowButton.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { GlowButton } from "./GlowButton";

test("renders children and a default arrow glyph", () => {
  const { container } = render(<GlowButton>Los</GlowButton>);
  expect(screen.getByRole("button", { name: /los/i })).toBeInTheDocument();
  expect(container.querySelectorAll("svg").length).toBe(1);
});

test("hideArrow removes the glyph", () => {
  const { container } = render(<GlowButton hideArrow>Los</GlowButton>);
  expect(container.querySelector("svg")).toBeNull();
});

test("mouse move sets the --x and --y custom properties", () => {
  render(<GlowButton>Los</GlowButton>);
  const el = screen.getByRole("button");
  fireEvent.mouseMove(el, { clientX: 10, clientY: 20 });
  expect(el.style.getPropertyValue("--x")).not.toBe("");
  expect(el.style.getPropertyValue("--y")).not.toBe("");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm --filter @ucm/ui exec vitest run src/brand/button`
Expected: FAIL — cannot find modules.

- [ ] **Step 3: Create `GlowButton.tsx`**

```tsx
import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";

const ARROW = (
  <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
    <path
      d="M4.16 4.4V3.5h4.34v4.34h-.9V5.03l-3.47 3.47L3.5 7.87 6.97 4.4H4.16Z"
      fill="currentColor"
    />
  </svg>
);

export type GlowButtonProps = {
  href?: string;
  bg?: string;
  fg?: string;
  glow?: string;
  border?: string;
  hideArrow?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function GlowButton({
  href,
  bg = "#FCC224",
  fg = "#001E2B",
  glow = "#F1F6F4",
  border,
  hideArrow = false,
  children,
  className,
  onClick,
}: GlowButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  function handleMove(event: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  const style = {
    backgroundColor: bg,
    color: fg,
    border: border ? `1px solid ${border}` : undefined,
    "--glow": glow,
  } as CSSProperties;

  const classes = cx(
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[14px] font-semibold transition hover:-translate-y-[1px]",
    className,
  );

  const content = (
    <>
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--x) var(--y), var(--glow), transparent 60%)",
        }}
      />
      <span className="relative z-10">{children}</span>
      {hideArrow ? null : (
        <span className="relative z-10 transition-transform group-hover:translate-x-1">
          {ARROW}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} style={style} onMouseMove={handleMove}>
        {content}
      </a>
    );
  }
  return (
    <button ref={ref} className={classes} style={style} onMouseMove={handleMove} onClick={onClick}>
      {content}
    </button>
  );
}
```

- [ ] **Step 4: Create `BrandButton.tsx`** (the three CTA variants from §2.5)

```tsx
import type { ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";

export type BrandButtonVariant = "primary" | "dark" | "outline";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] transition";

const VARIANTS: Record<BrandButtonVariant, string> = {
  primary: "bg-[#FCC224] font-semibold text-[#001E2B] hover:bg-[#FFD84D]",
  dark: "bg-[#001E2B] font-medium text-white hover:bg-[#0a2a37]",
  outline:
    "border border-[#001E2B]/15 font-semibold text-[#001E2B] hover:bg-[#001E2B]/5",
};

export type BrandButtonProps = {
  variant?: BrandButtonVariant;
  href?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function BrandButton({
  variant = "primary",
  href,
  children,
  className,
  onClick,
}: BrandButtonProps) {
  const classes = cx(BASE, VARIANTS[variant], className);
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
```

- [ ] **Step 5: Create `index.ts`**

```ts
export { GlowButton } from "./GlowButton";
export type { GlowButtonProps } from "./GlowButton";
export { BrandButton } from "./BrandButton";
export type { BrandButtonProps, BrandButtonVariant } from "./BrandButton";
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm --filter @ucm/ui exec vitest run src/brand/button`
Expected: PASS (6 tests total).

- [ ] **Step 7: Re-export from the package barrel** — append to `packages/ui/src/index.ts`

```ts
export { GlowButton } from "./brand/button";
export type { GlowButtonProps } from "./brand/button";
export { BrandButton } from "./brand/button";
export type { BrandButtonProps, BrandButtonVariant } from "./brand/button";
```

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/brand packages/ui/src/index.ts
git commit -m "feat(ui): add brand GlowButton and CTA variants"
```

---

## Task 7: Build the library + full test/typecheck gate

**Files:** none new — verifies Tasks 2-6 produce a clean build.

- [ ] **Step 1: Add a `typecheck` script reference**

Confirm `packages/ui/package.json` has `"typecheck": "tsc --noEmit"` (added in Task 2). No change needed if present.

- [ ] **Step 2: Run the full unit suite**

Run: `pnpm --filter @ucm/ui test`
Expected: PASS — all suites (cx, locale, product Button, brand buttons), 18 tests.

- [ ] **Step 3: Typecheck the library**

Run: `pnpm --filter @ucm/ui typecheck`
Expected: no errors.

- [ ] **Step 4: Build the library**

Run: `pnpm --filter @ucm/ui build`
Expected: `packages/ui/dist/index.js` and `packages/ui/dist/index.d.ts` exist.
Verify: `ls packages/ui/dist` shows `index.js` and `index.d.ts`.

- [ ] **Step 5: Commit** (lockfile / any incidental config)

```bash
git add -A
git commit -m "chore(ui): verify library build and types" --allow-empty
```

---

## Task 8: Astro docs app scaffold + Tailwind v4 + fonts + smoke test

**Files:**
- Create: `apps/docs/package.json`, `apps/docs/astro.config.mjs`, `apps/docs/tsconfig.json`
- Create: `apps/docs/src/styles/globals.css`
- Create: `apps/docs/src/pages/index.astro`
- Create: `apps/docs/src/islands/SmokeButton.tsx`

- [ ] **Step 1: Create `apps/docs/package.json`**

```json
{
  "name": "@ucm/docs",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "astro check",
    "lint": "echo \"(lint configured in Task 12)\""
  },
  "dependencies": {
    "@ucm/ui": "workspace:*",
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^6.1.0",
    "@mui/material": "^6.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "@astrojs/mdx": "^4.0.0",
    "@astrojs/react": "^4.0.0",
    "@fontsource-variable/figtree": "^5.1.0",
    "@fontsource/nunito": "^5.1.0",
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "astro": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 2: Create `apps/docs/astro.config.mjs`**

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react(), mdx()],
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 3: Create `apps/docs/tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  },
  "include": [".astro/types.d.ts", "src"]
}
```

- [ ] **Step 4: Create `apps/docs/src/styles/globals.css`**

```css
@import "tailwindcss";
@import "@ucm/ui/styles/tokens.css";
@import "@ucm/ui/styles/motion.css";

/* Self-hosted fonts (Fontsource). Figtree variable + Nunito 800.
   No Instrument Serif this slice. */
@import "@fontsource-variable/figtree";
@import "@fontsource/nunito/800.css";

/* Generate utilities for classes used inside the library source. */
@source "../../../../packages/ui/src";

/* Bind the font CSS variables the library components consume. */
:root {
  --font-figtree: "Figtree Variable", ui-sans-serif, system-ui, sans-serif;
  --font-nunito: "Nunito", ui-sans-serif, system-ui, sans-serif;
}

body {
  background-color: #f5f5f3;
  color: #001e2b;
  font-family: var(--font-figtree);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

p, h1, h2, h3, h4, h5, h6, li, dt, dd, blockquote {
  text-wrap: pretty;
}
```

> Note: the `@source` path is relative to this CSS file
> (`apps/docs/src/styles/`). From there, the library source is
> `../../../../packages/ui/src`. Verify the resolved path in Step 7; adjust the
> number of `../` only if the smoke test shows unstyled output.

- [ ] **Step 5: Create the smoke island** — `apps/docs/src/islands/SmokeButton.tsx`

```tsx
import { Button } from "@ucm/ui";

export function SmokeButton() {
  return <Button>Smoke test</Button>;
}
```

- [ ] **Step 6: Create `apps/docs/src/pages/index.astro`**

```astro
---
import "../styles/globals.css";
import { SmokeButton } from "../islands/SmokeButton";
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UCM Design System</title>
  </head>
  <body>
    <main class="mx-auto max-w-[960px] px-8 py-16">
      <h1 class="text-[clamp(2rem,5vw,3rem)] font-light tracking-[-0.02em]">
        UCM Design System
      </h1>
      <div class="mt-8" data-testid="smoke">
        <SmokeButton client:load />
      </div>
    </main>
  </body>
</html>
```

- [ ] **Step 7: Install and smoke-test the dev server manually**

Run: `pnpm install`
Then: `pnpm build:ui`
Then: `pnpm --filter @ucm/docs dev`
Open `http://localhost:4321`. Expected: the heading renders in Figtree light, and the "Smoke test" button is a navy pill with white text and a forward arrow (proves tokens + `@source` scanning + fonts + island all work). Stop the server.

If the button is unstyled (plain text), the `@source` path is wrong — fix the relative path in `globals.css` Step 4 and reload.

- [ ] **Step 8: Commit**

```bash
git add apps/docs pnpm-lock.yaml
git commit -m "feat(docs): scaffold Astro docs app with Tailwind v4 and fonts"
```

---

## Task 9: Docs primitives + content collections + layout + dynamic pages

**Files:**
- Create: `apps/docs/src/content/config.ts`
- Create: `apps/docs/src/layouts/BrandDocsLayout.astro`
- Create: `apps/docs/src/components/docs/Demo.astro`, `DoDont.astro`, `PropsTable.astro`, `TokenSwatch.astro`
- Create: `apps/docs/src/islands/LocaleToggle.tsx`
- Create: `apps/docs/src/pages/foundations/[slug].astro`, `apps/docs/src/pages/components/[slug].astro`

- [ ] **Step 1: Define content collections** — `apps/docs/src/content/config.ts`

```ts
import { defineCollection, z } from "astro:content";

const availability = z.object({
  android: z.boolean().default(false),
  ios: z.boolean().default(false),
  web: z.boolean().default(false),
});

const components = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    mode: z.enum(["brand", "product"]),
    status: z.enum(["draft", "ready"]).default("draft"),
    availability: availability.default({ web: true }),
  }),
});

const foundations = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
});

export const collections = { components, foundations };
```

- [ ] **Step 2: Create the brand-mode layout** — `apps/docs/src/layouts/BrandDocsLayout.astro`

```astro
---
import "../styles/globals.css";
import { LocaleToggle } from "../islands/LocaleToggle";
import { getCollection } from "astro:content";

interface Props {
  title: string;
  summary?: string;
}
const { title, summary } = Astro.props;

const components = await getCollection("components");
const foundations = await getCollection("foundations");
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} · UCM Design System</title>
  </head>
  <body>
    <header
      class="sticky top-0 z-20 flex items-center justify-between border-b border-[#001E2B]/8 bg-[#F5F5F3]/92 px-6 py-4 backdrop-blur-[6px]"
    >
      <a href="/" class="text-[22px] font-extrabold tracking-[-0.04em]" style="font-family: var(--font-nunito)">
        UCM
      </a>
      <div class="flex items-center gap-4">
        <LocaleToggle client:load />
        <a
          href="/components/product-button"
          class="rounded-full bg-[#FCC224] px-5 py-2.5 text-[13px] font-semibold text-[#001E2B] transition hover:bg-[#FFD84D]"
        >
          Components
        </a>
      </div>
    </header>

    <div class="mx-auto flex max-w-[1280px] gap-10 px-6 py-10">
      <aside class="hidden w-[220px] shrink-0 md:block">
        <nav aria-label="Docs navigation" class="sticky top-[88px] space-y-6 text-[13.5px]">
          <div>
            <p class="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#001E2B]/55">
              Foundations
            </p>
            <ul class="space-y-1">
              {foundations.map((entry) => (
                <li>
                  <a class="block rounded-[8px] px-2 py-1 text-[#001E2B]/78 transition hover:bg-[#001E2B]/[0.04]" href={`/foundations/${entry.slug}`}>
                    {entry.data.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p class="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#001E2B]/55">
              Components
            </p>
            <ul class="space-y-1">
              {components.map((entry) => (
                <li>
                  <a class="block rounded-[8px] px-2 py-1 text-[#001E2B]/78 transition hover:bg-[#001E2B]/[0.04]" href={`/components/${entry.slug}`}>
                    {entry.data.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      <main class="min-w-0 flex-1">
        <h1 class="text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.1] tracking-[-0.02em]">
          {title}
        </h1>
        {summary && <p class="mt-3 max-w-[60ch] text-[15px] leading-[1.55] text-[#001E2B]/65">{summary}</p>}
        <div class="mt-10 space-y-12 [&_h2]:mt-10 [&_h2]:text-[20px] [&_h2]:font-medium [&_h2]:tracking-[-0.012em] [&_h3]:mt-6 [&_h3]:text-[15px] [&_h3]:font-semibold [&_p]:mt-3 [&_p]:text-[14px] [&_p]:leading-[1.6] [&_p]:text-[#001E2B]/78 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-[14px] [&_li]:text-[#001E2B]/78">
          <slot />
        </div>
      </main>
    </div>
  </body>
</html>
```

- [ ] **Step 3: Create the locale toggle island** — `apps/docs/src/islands/LocaleToggle.tsx`

This is a React `.tsx` island, so it uses `className` (not Astro's `class`).

```tsx
import { LocaleProvider, useLocale } from "@ucm/ui";

function Toggle() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#EDECEA] p-[3px] text-[12px] font-medium">
      {(["de", "en"] as const).map((value) => (
        <button
          key={value}
          onClick={() => setLocale(value)}
          aria-pressed={locale === value}
          className={
            "rounded-full px-3 py-1 uppercase transition " +
            (locale === value
              ? "bg-[#FCC224] text-[#001E2B]"
              : "text-[#001E2B]/45 hover:text-[#001E2B]")
          }
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export function LocaleToggle() {
  return (
    <LocaleProvider>
      <Toggle />
    </LocaleProvider>
  );
}
```

- [ ] **Step 4: Create `Demo.astro`** (live-example frame)

```astro
---
interface Props {
  title?: string;
}
const { title } = Astro.props;
---

<figure class="overflow-hidden rounded-[16px] border border-[#001E2B]/10 bg-white">
  {title && (
    <figcaption class="border-b border-[#001E2B]/8 px-5 py-2 text-[12px] font-medium uppercase tracking-[0.04em] text-[#001E2B]/55">
      {title}
    </figcaption>
  )}
  <div class="flex flex-wrap items-center gap-4 p-8">
    <slot />
  </div>
</figure>
```

- [ ] **Step 5: Create `DoDont.astro`** (paired guidance)

```astro
---
interface Props {
  do: string;
  dont: string;
}
const { do: doText, dont: dontText } = Astro.props;
---

<div class="grid gap-4 sm:grid-cols-2">
  <div class="rounded-[16px] border border-[#0f5e2a]/20 bg-[#0f5e2a]/[0.04] p-5">
    <p class="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#0f5e2a]">Do</p>
    <div class="mt-3"><slot name="do" /></div>
    <p class="mt-3 text-[13px] leading-[1.5] text-[#001E2B]/78">{doText}</p>
  </div>
  <div class="rounded-[16px] border border-[#a32d2d]/20 bg-[#a32d2d]/[0.04] p-5">
    <p class="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#a32d2d]">Don't</p>
    <div class="mt-3"><slot name="dont" /></div>
    <p class="mt-3 text-[13px] leading-[1.5] text-[#001E2B]/78">{dontText}</p>
  </div>
</div>
```

- [ ] **Step 6: Create `PropsTable.astro`**

```astro
---
interface Row {
  name: string;
  type: string;
  default?: string;
  description: string;
}
interface Props {
  rows: Row[];
}
const { rows } = Astro.props;
---

<div class="overflow-hidden rounded-[16px] border border-[#001E2B]/10">
  <table class="w-full border-collapse text-left text-[13px]">
    <thead>
      <tr class="bg-[#F8F5EE]/40 text-[#001E2B]/55">
        <th class="px-4 py-2 font-medium">Prop</th>
        <th class="px-4 py-2 font-medium">Type</th>
        <th class="px-4 py-2 font-medium">Default</th>
        <th class="px-4 py-2 font-medium">Description</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr class="border-t border-[#001E2B]/8 align-top">
          <td class="px-4 py-2 font-medium text-[#001E2B]">{row.name}</td>
          <td class="px-4 py-2 font-mono text-[12px] text-[#001E2B]/78">{row.type}</td>
          <td class="px-4 py-2 font-mono text-[12px] text-[#001E2B]/55">{row.default ?? "—"}</td>
          <td class="px-4 py-2 text-[#001E2B]/78">{row.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

> The `—` in the default cell is an em dash used as a structural "not
> applicable" marker in a table, not user-facing prose copy. This is consistent
> with the design system, whose own availability tables use it.

- [ ] **Step 7: Create `TokenSwatch.astro`**

```astro
---
interface Props {
  name: string;
  value: string;
}
const { name, value } = Astro.props;
---

<div class="flex items-center gap-3 rounded-[12px] border border-[#001E2B]/10 bg-white p-3">
  <span class="size-10 shrink-0 rounded-[8px] border border-[#001E2B]/10" style={`background:${value}`}></span>
  <span class="min-w-0">
    <span class="block text-[13px] font-medium text-[#001E2B]">{name}</span>
    <span class="block font-mono text-[12px] text-[#001E2B]/55">{value}</span>
  </span>
</div>
```

- [ ] **Step 8: Create the dynamic foundation page** — `apps/docs/src/pages/foundations/[slug].astro`

```astro
---
import { getCollection } from "astro:content";
import BrandDocsLayout from "../../layouts/BrandDocsLayout.astro";

export async function getStaticPaths() {
  const entries = await getCollection("foundations");
  return entries.map((entry) => ({ params: { slug: entry.slug }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<BrandDocsLayout title={entry.data.title} summary={entry.data.summary}>
  <Content />
</BrandDocsLayout>
```

- [ ] **Step 9: Create the dynamic component page** — `apps/docs/src/pages/components/[slug].astro`

```astro
---
import { getCollection } from "astro:content";
import BrandDocsLayout from "../../layouts/BrandDocsLayout.astro";

export async function getStaticPaths() {
  const entries = await getCollection("components");
  return entries.map((entry) => ({ params: { slug: entry.slug }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<BrandDocsLayout title={entry.data.title} summary={entry.data.summary}>
  <Content />
</BrandDocsLayout>
```

- [ ] **Step 10: Add a placeholder foundation entry so the build has a route**

Create `apps/docs/src/content/foundations/color.mdx` (expanded in Task 10):

```mdx
---
title: Color
summary: The cream, navy, and yellow triad and the ink opacity ramp.
---

## Triad

Placeholder — completed in Task 10.
```

- [ ] **Step 11: Verify the app builds**

Run: `pnpm build:ui && pnpm --filter @ucm/docs build`
Expected: build succeeds; output lists `/foundations/color` among built pages.

- [ ] **Step 12: Commit**

```bash
git add apps/docs
git commit -m "feat(docs): add content collections, brand layout, and docs primitives"
```

---

## Task 10: Foundations MDX (color, typography, motion)

**Files:**
- Modify: `apps/docs/src/content/foundations/color.mdx`
- Create: `apps/docs/src/content/foundations/typography.mdx`, `apps/docs/src/content/foundations/motion.mdx`

- [ ] **Step 1: Complete `color.mdx`**

```mdx
---
title: Color
summary: The cream, navy, and yellow triad, named surfaces, and the ink opacity ramp.
---

import TokenSwatch from "../../components/docs/TokenSwatch.astro";

## Triad

The whole system is one triad. Do not introduce new hues; teal and status colors
are accents, never primaries. Never use pure black or white as ink or surface.

<div class="mt-4 grid gap-3 sm:grid-cols-3">
  <TokenSwatch name="Ink (navy)" value="#001E2B" />
  <TokenSwatch name="Page (cream)" value="#F5F5F3" />
  <TokenSwatch name="Accent (yellow)" value="#FCC224" />
</div>

## Status

<div class="mt-4 grid gap-3 sm:grid-cols-2">
  <TokenSwatch name="Success" value="#0F5E2A" />
  <TokenSwatch name="Danger" value="#A32D2D" />
</div>

## Ink opacity ramp

Text and borders are navy with an alpha step, never gray. Lead with the product
ramp; brand uses a coarser subset.

<div class="mt-4 grid gap-3 sm:grid-cols-3">
  <TokenSwatch name="text /85 body emphasis" value="#001E2B" />
  <TokenSwatch name="text /65 secondary" value="#001E2B" />
  <TokenSwatch name="text /55 labels" value="#001E2B" />
</div>
```

- [ ] **Step 2: Create `typography.mdx`**

```mdx
---
title: Typography
summary: Figtree for UI and body, Nunito for the wordmark. Light-weight headings with tight tracking.
---

## Families

Figtree (300 to 900) is the default UI and body family, covering ä ö ü ß through
the latin-ext subset. Nunito 800 is reserved for the wordmark and never used for
UI text. Instrument Serif is brand-only and not loaded here.

## Scale

<div class="mt-4 space-y-3">
  <p class="text-[32px] font-light leading-[1.08] tracking-[-0.02em]">Hero / display</p>
  <p class="text-[26px] font-light leading-[1.12] tracking-[-0.02em]">Sub-display</p>
  <p class="text-[15px] leading-[1.55] tracking-[-0.01em]">Standard paragraph</p>
  <p class="text-[12px] font-medium uppercase tracking-[0.08em] text-[#001E2B]/55">Eyebrow caps</p>
</div>

Adjacent type steps differ by at least 1.25x in size or weight. Never ship flat
scales.
```

- [ ] **Step 3: Create `motion.mdx`**

```mdx
---
title: Motion
summary: One signature easing, ease-out only, compositor-friendly properties.
---

## Principles

Animate transform, opacity, and clip-path only, never layout properties, and
never `transition-all`. The signature easing is `cubic-bezier(0.22, 1, 0.36, 1)`
at 220 to 400ms. All entrance and ambient motion is disabled under
`prefers-reduced-motion: reduce`.

## Durations

- Micro (hover, opacity): 180 to 220ms
- Standard (hover state, accordion): 300ms
- Medium (panel slide): 400ms
- Brand only (image transitions, logo reveal): 500 to 900ms
```

- [ ] **Step 4: Verify the build**

Run: `pnpm --filter @ucm/docs build`
Expected: routes `/foundations/color`, `/foundations/typography`, `/foundations/motion` all build.

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src/content/foundations
git commit -m "docs: add foundations pages (color, typography, motion)"
```

---

## Task 11: Component MDX pages (Product Button, Brand Button)

**Files:**
- Create: `apps/docs/src/islands/ProductButtonDemo.tsx`, `apps/docs/src/islands/BrandButtonDemo.tsx`
- Create: `apps/docs/src/content/components/product-button.mdx`, `apps/docs/src/content/components/brand-button.mdx`

These follow the provided component documentation template exactly: When to use →
Anatomy/Variants → Behaviour → Best practice → Accessibility → Content →
Availability.

- [ ] **Step 1: Create `ProductButtonDemo.tsx`**

```tsx
import { Button } from "@ucm/ui";

export function ProductButtonDemo() {
  return (
    <>
      <Button>Anfrage senden</Button>
      <Button variant="outline">Abbrechen</Button>
      <Button variant="ghost">Mehr</Button>
      <Button variant="danger" hideArrow>
        Löschen
      </Button>
    </>
  );
}

export function ProductButtonSizes() {
  return (
    <>
      <Button size="default">Standard</Button>
      <Button size="lg">Groß</Button>
    </>
  );
}
```

- [ ] **Step 2: Create `BrandButtonDemo.tsx`**

```tsx
import { BrandButton, GlowButton } from "@ucm/ui";

export function BrandButtonDemo() {
  return (
    <>
      <BrandButton>Personal anfragen</BrandButton>
      <BrandButton variant="dark">Jetzt bewerben</BrandButton>
      <BrandButton variant="outline">Mehr erfahren</BrandButton>
    </>
  );
}

export function GlowButtonDemo() {
  return <GlowButton href="#">Jetzt starten</GlowButton>;
}
```

- [ ] **Step 3: Create `product-button.mdx`**

```mdx
---
title: Button (Product)
summary: The navy action button for the internal app, where the user completes a task.
mode: product
status: ready
availability:
  web: true
---

import Demo from "../../components/docs/Demo.astro";
import DoDont from "../../components/docs/DoDont.astro";
import PropsTable from "../../components/docs/PropsTable.astro";
import { ProductButtonDemo, ProductButtonSizes } from "../../islands/ProductButtonDemo";
import { Button } from "@ucm/ui";

A button lets the user perform an action with a tap or a click. In product mode
the primary button is navy and restrained, with no glow.

## When to use

**Use a button:**
- to trigger an action on the current screen (submit, confirm, save)
- to advance a flow (continue, next step)

**Don't use a button:**
- to navigate between pages where a link is clearer (use a text link)
- for many low-priority actions at once (demote to ghost or a menu)

## Anatomy / Variants

### Priorities

One primary per screen. Everything else is secondary or quieter.

<Demo title="Variants">
  <ProductButtonDemo client:visible />
</Demo>

| Variant | When to use |
|---|---|
| Primary (navy) | The single most important action on the screen. |
| Outline | A secondary action that still needs a clear hit area. |
| Ghost | Low-emphasis actions; quiet until hovered. |
| Danger | Destructive confirmation, paired with a ghost cancel. |

### Sizes

`default` everywhere; `lg` for primary mobile CTAs that need a 44px target.

<Demo title="Sizes">
  <ProductButtonSizes client:visible />
</Demo>

### Accessories

The primary button shows a forward arrow by default; pass `hideArrow` to remove
it. `iconLeft` places a leading MUI icon.

## Behaviour

### Interaction

Hover shifts the background a step darker; the press state is subtle. A disabled
button drops to 45% opacity, removes its shadow, and does not fire its handler.

### Placement

In the app, the primary action is typically pinned to a sticky action bar on
mobile and sits inline on desktop.

## Best practice

<DoDont
  do="Use a single navy primary as the clear next step."
  dont="Stack several primaries so nothing stands out."
>
  <div slot="do"><Button>Anfrage senden</Button></div>
  <div slot="dont" class="flex gap-2">
    <Button>Senden</Button>
    <Button>Speichern</Button>
  </div>
</DoDont>

## Accessibility

- Renders a real `<button>` (or `<a>` with `href`), so it is keyboard focusable
  and announced with its role.
- The decorative arrow is `aria-hidden`; icon-only usage requires an
  `aria-label`.
- Touch target is at least 36px (`h-9`); use `lg` (44px) for primary mobile CTAs.
- Disabled buttons must have a visible reason nearby, since disabled controls do
  not explain themselves.

## Content

- Start with a verb ("Senden", "Speichern").
- Keep it to one or two words; allow about 2x growth when translated.
- Sentence case, no full stop, no first-person pronouns.
- Every label is bilingual (DE + EN) via the locale layer.

| ✅ Do | ❌ Don't |
|---|---|
| "Anfrage senden" | "Ich möchte eine Anfrage senden" |
| "Karte sperren" | "Meine Karte sperren" |

## Props

<PropsTable
  rows={[
    { name: "variant", type: "\"primary\" | \"ghost\" | \"outline\" | \"danger\"", default: "\"primary\"", description: "Visual priority." },
    { name: "size", type: "\"default\" | \"lg\"", default: "\"default\"", description: "Control height; lg is 44px." },
    { name: "hideArrow", type: "boolean", default: "false", description: "Hide the primary forward arrow." },
    { name: "iconLeft", type: "ReactNode", description: "Leading icon node." },
    { name: "href", type: "string", description: "Render as an anchor instead of a button." },
  ]}
/>

## Availability

| Platform | Available | Developer documentation |
|----------|:---------:|-------------------------|
| Android  | —         | —                       |
| iOS      | —         | —                       |
| Web      | ✅        | `@ucm/ui` → `Button`    |
```

- [ ] **Step 4: Create `brand-button.mdx`**

```mdx
---
title: Button (Brand)
summary: Expressive marketing CTAs for the public site, including the yellow primary and the GlowButton.
mode: brand
status: ready
availability:
  web: true
---

import Demo from "../../components/docs/Demo.astro";
import DoDont from "../../components/docs/DoDont.astro";
import PropsTable from "../../components/docs/PropsTable.astro";
import { BrandButtonDemo, GlowButtonDemo } from "../../islands/BrandButtonDemo";
import { BrandButton } from "@ucm/ui";

On the marketing site the call to action persuades and converts. The primary CTA
is yellow; the GlowButton adds a cursor-tracked radial glow, the one gradient
permitted anywhere in the system.

## When to use

**Use a brand CTA:**
- as the conversion action on a marketing page (request staff, apply now)
- in heroes, feature blocks, and CTA bands

**Don't use a brand CTA:**
- inside the internal app (use the product Button instead)
- for minor in-page navigation (use a text link)

## Anatomy / Variants

### Priorities

<Demo title="CTA variants">
  <BrandButtonDemo client:visible />
</Demo>

| Variant | When to use |
|---|---|
| Primary (yellow) | The main conversion action. |
| Dark | Secondary emphasis on a light section. |
| Outline | Tertiary action with a clear boundary. |

### GlowButton

The signature CTA: a radial glow follows the cursor and the button lifts 1px on
hover.

<Demo title="GlowButton">
  <GlowButtonDemo client:visible />
</Demo>

## Behaviour

### Interaction

Hover brightens the yellow, lifts the button 1px, and slides the arrow right. The
GlowButton additionally paints a radial gradient at the cursor position. All
motion is compositor-friendly and disabled under reduced-motion.

### Placement

Pinned in heroes and CTA bands; often full-width on mobile.

## Best practice

<DoDont
  do="Lead a section with one yellow primary CTA."
  dont="Place two competing yellow CTAs side by side."
>
  <div slot="do"><BrandButton>Personal anfragen</BrandButton></div>
  <div slot="dont" class="flex gap-2">
    <BrandButton>Anfragen</BrandButton>
    <BrandButton>Bewerben</BrandButton>
  </div>
</DoDont>

## Accessibility

- Renders a real `<button>` or `<a>`; keyboard focusable and announced.
- The arrow glyph is `aria-hidden`.
- The glow is decorative and does not convey state.
- Maintain contrast: navy text on yellow meets contrast requirements.

## Content

- Start with a verb; motivational voice is allowed in brand mode.
- Bilingual (DE + EN); no em dashes.
- Sentence case, no full stop.

| ✅ Do | ❌ Don't |
|---|---|
| "Personal anfragen" | "Jetzt hier dein Personal anfragen!" |
| "Jetzt bewerben" | "Bewirb dich bei uns für einen Job" |

## Props

<PropsTable
  rows={[
    { name: "variant", type: "\"primary\" | \"dark\" | \"outline\"", default: "\"primary\"", description: "BrandButton CTA priority." },
    { name: "href", type: "string", description: "Render as an anchor." },
    { name: "bg", type: "string", default: "\"#FCC224\"", description: "GlowButton background." },
    { name: "glow", type: "string", default: "\"#F1F6F4\"", description: "GlowButton radial glow color." },
    { name: "hideArrow", type: "boolean", default: "false", description: "Hide the arrow glyph." },
  ]}
/>

## Availability

| Platform | Available | Developer documentation        |
|----------|:---------:|--------------------------------|
| Android  | —         | —                              |
| iOS      | —         | —                              |
| Web      | ✅        | `@ucm/ui` → `BrandButton`, `GlowButton` |
```

- [ ] **Step 5: Verify the build and view both pages**

Run: `pnpm build:ui && pnpm --filter @ucm/docs dev`
Open `http://localhost:4321/components/product-button` and `/components/brand-button`.
Expected: both pages render the template sections, live demos are interactive
(the GlowButton glow follows the cursor; the locale toggle in the header switches
DE/EN). Stop the server.

- [ ] **Step 6: Commit**

```bash
git add apps/docs/src/islands apps/docs/src/content/components
git commit -m "docs: add Product Button and Brand Button component pages"
```

---

## Task 12: Visual regression + lint/format + final verification

**Files:**
- Create: `apps/docs/playwright.config.ts`
- Create: `apps/docs/tests/visual.spec.ts`
- Create: `.prettierrc.json`, `eslint.config.js`, `.stylelintrc.json` at the root
- Modify: root `package.json` (lint script)

- [ ] **Step 1: Add Playwright config** — `apps/docs/playwright.config.ts`

```ts
import { defineConfig } from "@playwright/test";

const BREAKPOINTS = [320, 768, 1024, 1440];

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "pnpm --filter @ucm/docs preview --port 4321",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: { baseURL: "http://localhost:4321" },
  projects: BREAKPOINTS.map((width) => ({
    name: `w${width}`,
    use: { viewport: { width, height: 900 } },
  })),
});
```

- [ ] **Step 2: Add the visual spec** — `apps/docs/tests/visual.spec.ts`

```ts
import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/components/product-button", id: "product-button" },
  { path: "/components/brand-button", id: "brand-button" },
];

for (const page of PAGES) {
  test(`${page.id} renders without horizontal overflow`, async ({ page: p }) => {
    await p.goto(page.path);
    await expect(p.locator("h1")).toBeVisible();
    const overflow = await p.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test(`${page.id} visual snapshot`, async ({ page: p }, testInfo) => {
    await p.goto(page.path);
    await expect(p.locator("h1")).toBeVisible();
    await expect(p).toHaveScreenshot(`${page.id}-${testInfo.project.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}
```

- [ ] **Step 3: Add Playwright to the docs package and a script**

Add to `apps/docs/package.json` devDependencies: `"@playwright/test": "^1.48.0"`.
Add to `apps/docs/package.json` scripts: `"test:visual": "playwright test"`.
Run: `pnpm install && pnpm --filter @ucm/docs exec playwright install chromium`

- [ ] **Step 4: Add root tooling configs**

`.prettierrc.json`:

```json
{ "semi": true, "singleQuote": false, "trailingComma": "all", "printWidth": 100 }
```

`.stylelintrc.json`:

```json
{
  "rules": {
    "color-no-invalid-hex": true,
    "no-duplicate-selectors": true
  },
  "ignoreFiles": ["**/dist/**", "**/.astro/**"]
}
```

`eslint.config.js`:

```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/dist/**", "**/.astro/**", "**/node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
```

Add to root `package.json` devDependencies: `"@eslint/js": "^9.13.0"`,
`"eslint": "^9.13.0"`, `"typescript-eslint": "^8.10.0"`, `"prettier": "^3.3.0"`,
`"stylelint": "^16.10.0"`, `"stylelint-config-standard": "^36.0.0"`.
Set root `package.json` lint script to:
`"lint": "eslint packages apps --max-warnings 0"`.

- [ ] **Step 5: Generate the baseline snapshots**

Run: `pnpm build:ui && pnpm --filter @ucm/docs build`
Then: `pnpm --filter @ucm/docs test:visual --update-snapshots`
Expected: snapshots created under `apps/docs/tests/visual.spec.ts-snapshots/` for
each breakpoint (8 images: 2 pages × 4 widths). The overflow tests pass at all
breakpoints.

- [ ] **Step 6: Run the full verification gate (design system §6.2)**

Run each and confirm:
- `pnpm test` → all unit tests pass.
- `pnpm typecheck` → no errors in `@ucm/ui` or `@ucm/docs`.
- `pnpm lint` → no errors.
- `pnpm --filter @ucm/docs test:visual` → green at 320/768/1024/1440, no overflow.

Manual checklist:
- No em dashes in new user-visible copy (table "—" markers are structural, allowed).
- Both DE and EN present for every `Label` used in demos.
- Product-mode bans respected on the Product Button page (no glow, no nested cards).
- Touch targets ≥36px; primary mobile CTA path uses `lg` (44px).

- [ ] **Step 7: Commit**

```bash
git add apps/docs/playwright.config.ts apps/docs/tests apps/docs/package.json \
  .prettierrc.json .stylelintrc.json eslint.config.js package.json pnpm-lock.yaml
git commit -m "test: add visual regression and lint/format tooling"
```

- [ ] **Step 8: Tag the slice complete**

```bash
git commit --allow-empty -m "chore: foundation + Button slice complete"
```

---

## Self-review notes (author)

- **Spec coverage:** monorepo (Task 1), framework-agnostic library + Tailwind v4 `@source` wiring (Tasks 2, 8), tokens/motion (Task 3), locale (Task 4), Product Button §3.5 (Task 5), Brand GlowButton/CTAs §2.5 (Task 6), Astro Brand-mode docs (Tasks 8-9), foundations + template-shaped component pages (Tasks 10-11), Vitest + Playwright at the four breakpoints + §6.2 verification (Task 12). Instrument Serif deliberately excluded.
- **Type consistency:** `cx`, `Label`/`Locale`, `LocaleProvider`/`useLocale`, `Button`/`ButtonProps`, `BrandButton`/`GlowButton` names are used identically across tasks and the barrel exports.
- **Known watch-points called out inline:** the `@source` relative path (Task 8 Step 7), `class` vs `className` in the React island (Task 9 Step 3 has a corrected version), and the structural-only use of `—` in tables.
```
