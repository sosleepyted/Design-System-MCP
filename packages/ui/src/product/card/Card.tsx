import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";

export type CardProps = {
  children?: ReactNode;
  className?: string;
} & Pick<HTMLAttributes<HTMLDivElement>, "id" | "role" | "aria-label" | "aria-labelledby">;

// Restrained product surface: the documented card shadow and the navy alpha
// border. White is the one sanctioned surface, and only on a card. Do not nest
// a card inside a card in product mode (use a Divider).
const BASE =
  "rounded-[16px] border border-[#001E2B]/10 bg-white p-6 shadow-[0_12px_28px_-22px_rgba(23,43,54,0.4)]";

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div className={cx(BASE, className)} {...rest}>
      {children}
    </div>
  );
}
