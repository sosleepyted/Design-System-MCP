import { cx } from "../../foundation/utils/cx";

export type DividerProps = {
  className?: string;
};

// A horizontal rule on the navy alpha border ramp (never plain gray, never a
// nested card). Renders an <hr>, which is a separator landmark by default.
export function Divider({ className }: DividerProps) {
  return <hr className={cx("border-0 border-t border-[#001E2B]/8", className)} />;
}
