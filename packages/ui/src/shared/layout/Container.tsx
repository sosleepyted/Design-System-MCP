import type { ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";

export type ContainerMode = "brand" | "product";

export type ContainerProps = {
  /** brand = wide marketing width, product = the narrower app width. */
  mode?: ContainerMode;
  children?: ReactNode;
  className?: string;
};

// The documented container widths (Section 2.3).
const WIDTH: Record<ContainerMode, string> = {
  product: "max-w-[680px] px-4 sm:px-6 md:max-w-[960px] md:px-8",
  brand: "max-w-[1440px] px-6",
};

export function Container({
  mode = "product",
  children,
  className,
}: ContainerProps) {
  return (
    <div className={cx("mx-auto w-full", WIDTH[mode], className)}>
      {children}
    </div>
  );
}
