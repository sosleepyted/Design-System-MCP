import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";

export type SectionMode = "brand" | "product";

export type SectionProps = {
  /** brand = generous marketing rhythm, product = restrained app rhythm. */
  mode?: SectionMode;
  children?: ReactNode;
  className?: string;
} & Pick<HTMLAttributes<HTMLElement>, "aria-label" | "aria-labelledby" | "id">;

// Vertical rhythm only; horizontal width is the Container's job.
const PAD: Record<SectionMode, string> = {
  brand: "py-16 md:py-24",
  product: "py-10 md:py-14",
};

export function Section({
  mode = "product",
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section className={cx(PAD[mode], className)} {...rest}>
      {children}
    </section>
  );
}
