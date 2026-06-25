import type { ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";

export type GridCols = 1 | 2 | 3 | 4;
export type GridGap = "sm" | "md" | "lg";

export type GridProps = {
  /** Maximum columns at the widest breakpoint; collapses responsively. */
  cols?: GridCols;
  gap?: GridGap;
  children?: ReactNode;
  className?: string;
};

// Fixed class strings (not interpolated) so Tailwind keeps them at build time.
const COLS: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const GAP: Record<GridGap, string> = {
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-8",
};

export function Grid({ cols = 3, gap = "md", children, className }: GridProps) {
  return (
    <div className={cx("grid", COLS[cols], GAP[gap], className)}>{children}</div>
  );
}
