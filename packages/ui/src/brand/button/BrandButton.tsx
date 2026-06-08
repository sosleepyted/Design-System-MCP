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
