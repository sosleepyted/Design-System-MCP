import type { InputHTMLAttributes } from "react";
import { cx } from "../../foundation/utils/cx";
import { useLocale } from "../../foundation/locale";
import type { Label } from "../../foundation/locale";

export type CheckboxProps = {
  /** Inline label, bilingual. */
  label: Label;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className">;

// The whole row is the label, keeping the touch target at least 36px tall. The
// native control is tinted navy via accent-color.
export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  const { t } = useLocale();
  return (
    <label
      className={cx(
        "inline-flex min-h-9 cursor-pointer items-center gap-2.5 text-[14px] text-[#001E2B]/85",
        className,
      )}
    >
      <input
        type="checkbox"
        className="size-[18px] shrink-0 rounded-[6px] accent-[#001E2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001E2B]/50 focus-visible:ring-offset-2"
        {...rest}
      />
      <span>{t(label)}</span>
    </label>
  );
}
