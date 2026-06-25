import type { ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";

export type StackGap = "sm" | "md" | "lg";
export type StackAlign = "start" | "center" | "end" | "stretch";

export type StackProps = {
  /** Vertical gap between children. */
  gap?: StackGap;
  /** Cross-axis alignment. */
  align?: StackAlign;
  children?: ReactNode;
  className?: string;
};

const GAP: Record<StackGap, string> = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-8",
};

const ALIGN: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Stack({
  gap = "md",
  align = "stretch",
  children,
  className,
}: StackProps) {
  return (
    <div className={cx("flex flex-col", GAP[gap], ALIGN[align], className)}>
      {children}
    </div>
  );
}
