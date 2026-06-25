import { useId, useState, type ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";
import { Icon } from "../../foundation/icon";
import { useLocale } from "../../foundation/locale";
import type { Label } from "../../foundation/locale";

export type NavMode = "brand" | "product";
export type NavLink = { label: Label; href: string };
export type NavCta = { label: Label; href: string };

export type NavProps = {
  /** brand = expressive marketing chrome, product = restrained app chrome. */
  mode?: NavMode;
  /** Wordmark node, left aligned. Defaults to the UCM acronym wordmark. */
  wordmark?: ReactNode;
  /** Primary navigation links. Labels are bilingual and resolved via the locale layer. */
  links?: NavLink[];
  /** Optional call to action, yellow in brand mode, navy in product mode. */
  cta?: NavCta;
  /** Extra right-aligned slot, e.g. a locale toggle. */
  actions?: ReactNode;
  className?: string;
};

// Internal strings are bilingual and resolved with t(); the system has no
// hardcoded single-locale copy.
const A11Y = {
  open: { de: "Menü öffnen", en: "Open menu" },
  close: { de: "Menü schließen", en: "Close menu" },
  primary: { de: "Hauptnavigation", en: "Main navigation" },
} satisfies Record<string, Label>;

const SHELL: Record<NavMode, string> = {
  // Functional scrim blur on the brand chrome is allowed (Section 10).
  brand: "bg-[#F5F5F3]/92 backdrop-blur-[6px]",
  product: "bg-white",
};

const CTA: Record<NavMode, string> = {
  brand: "bg-[#FCC224] text-[#001E2B] hover:bg-[#FFD84D]",
  product: "bg-[#001E2B] text-white hover:bg-[#0a2d3c]",
};

const LINK =
  "inline-flex min-h-9 items-center rounded-full px-3 text-[14px] text-[#001E2B]/78 transition hover:bg-[#001E2B]/[0.04] hover:text-[#001E2B]";

export function Nav({
  mode = "product",
  wordmark = "UCM",
  links = [],
  cta,
  actions,
  className,
}: NavProps) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const ctaClass = cx(
    "inline-flex min-h-9 items-center justify-center rounded-full px-5 text-[13px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001E2B]/50 focus-visible:ring-offset-2",
    CTA[mode],
  );

  return (
    <header
      className={cx("sticky top-0 z-20 border-b border-[#001E2B]/8", SHELL[mode], className)}
    >
      <nav
        aria-label={t(A11Y.primary)}
        className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-4"
      >
        <a
          href="/"
          className="text-[22px] font-extrabold tracking-[-0.04em] text-[#001E2B]"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          {wordmark}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={LINK}>
              {t(link.label)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {actions}
          {cta ? (
            <a href={cta.href} className={cx(ctaClass, "hidden md:inline-flex")}>
              {t(cta.label)}
            </a>
          ) : null}
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full text-[#001E2B] transition hover:bg-[#001E2B]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001E2B]/50 md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t(A11Y.close) : t(A11Y.open)}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id={panelId}
          className="animate-slide-down border-t border-[#001E2B]/8 px-6 pb-4 pt-2 md:hidden"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cx(LINK, "w-full")}
                  onClick={() => setOpen(false)}
                >
                  {t(link.label)}
                </a>
              </li>
            ))}
          </ul>
          {cta ? (
            <a
              href={cta.href}
              className={cx(ctaClass, "mt-3 flex w-full")}
              onClick={() => setOpen(false)}
            >
              {t(cta.label)}
            </a>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
