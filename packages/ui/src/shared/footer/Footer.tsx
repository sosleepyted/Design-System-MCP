import { type ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";
import { useLocale } from "../../foundation/locale";
import type { Label } from "../../foundation/locale";

export type FooterMode = "brand" | "product";
export type FooterLink = { label: Label; href: string };
export type FooterGroup = { title: Label; links: FooterLink[] };

export type FooterProps = {
  /** brand = expressive dark footer, product = restrained light footer. */
  mode?: FooterMode;
  /** Wordmark node. Defaults to the UCM acronym wordmark. */
  wordmark?: ReactNode;
  /** Short line under the wordmark. */
  tagline?: Label;
  /** Columns of links. Titles and labels are bilingual via the locale layer. */
  groups?: FooterGroup[];
  /** Legal or copyright line in the bottom bar. */
  legal?: Label;
  /** Right-aligned slot in the bottom bar, e.g. a locale toggle. */
  actions?: ReactNode;
  className?: string;
};

const A11Y = {
  primary: { de: "Fußzeile", en: "Footer" },
  nav: { de: "Fußzeile-Navigation", en: "Footer navigation" },
} satisfies Record<string, Label>;

const SHELL: Record<FooterMode, string> = {
  // Navy as a surface is on-system (the ban is pure black or white, not navy).
  brand: "bg-[#001E2B] text-[#F0F0EB]",
  product: "bg-white text-[#001E2B]",
};

// Link and divider treatments differ by surface: a light border and yellow
// accent on the dark brand footer, navy alpha on the light product footer.
const LINK: Record<FooterMode, string> = {
  brand:
    "inline-flex min-h-9 items-center text-[14px] text-[#F0F0EB]/70 transition hover:text-[#FCC224]",
  product:
    "inline-flex min-h-9 items-center text-[14px] text-[#001E2B]/70 transition hover:text-[#001E2B]",
};

const TITLE: Record<FooterMode, string> = {
  brand: "text-[12px] font-semibold text-[#F0F0EB]/55",
  product: "text-[12px] font-semibold text-[#001E2B]/55",
};

const DIVIDER: Record<FooterMode, string> = {
  brand: "border-[#F0F0EB]/15",
  product: "border-[#001E2B]/8",
};

const MUTED: Record<FooterMode, string> = {
  brand: "text-[13px] text-[#F0F0EB]/55",
  product: "text-[13px] text-[#001E2B]/55",
};

export function Footer({
  mode = "product",
  wordmark = "UCM",
  tagline,
  groups = [],
  legal,
  actions,
  className,
}: FooterProps) {
  const { t } = useLocale();

  return (
    <footer
      aria-label={t(A11Y.primary)}
      className={cx(SHELL[mode], className)}
    >
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-[28ch]">
            <span
              className="text-[22px] font-extrabold tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {wordmark}
            </span>
            {tagline ? (
              <p className={cx("mt-3", MUTED[mode])}>{t(tagline)}</p>
            ) : null}
          </div>

          {groups.length > 0 ? (
            <nav
              aria-label={t(A11Y.nav)}
              className="grid grid-cols-2 gap-8 sm:grid-cols-3"
            >
              {groups.map((group) => (
                <div key={group.title.en}>
                  <p className={TITLE[mode]}>{t(group.title)}</p>
                  <ul className="mt-3 space-y-1">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} className={LINK[mode]}>
                          {t(link.label)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          ) : null}
        </div>

        {legal || actions ? (
          <div
            className={cx(
              "mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between",
              DIVIDER[mode],
            )}
          >
            {legal ? <p className={MUTED[mode]}>{t(legal)}</p> : <span />}
            {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
