import type { SelectHTMLAttributes } from "react";
import { cx } from "../../foundation/utils/cx";
import { Icon } from "../../foundation/icon";
import { useLocale } from "../../foundation/locale";
import type { Label } from "../../foundation/locale";
import { useFieldContext } from "./context";

export type SelectOption = { label: Label; value: string };

export type SelectProps = {
  options: SelectOption[];
  /** Yellow attention ring for empty or attention states. */
  attention?: boolean;
  /** Optional disabled placeholder shown first. */
  placeholder?: Label;
  className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "children">;

const BASE =
  "h-10 w-full appearance-none rounded-[12px] border bg-white pl-3 pr-9 text-[14px] text-[#001E2B] transition focus:outline-none";
const DEFAULT =
  "border-[#001E2B]/12 hover:border-[#001E2B]/25 focus:border-[#001E2B]/40 focus:ring-2 focus:ring-[#001E2B]/15";
const ATTENTION = "border-[#FCC224]/60 ring-2 ring-[#FCC224]/25";

export function Select({
  options,
  attention = false,
  placeholder,
  className,
  id,
  ...rest
}: SelectProps) {
  const { t } = useLocale();
  const field = useFieldContext();
  return (
    <div className="relative">
      <select
        id={id ?? field?.id}
        aria-invalid={field?.invalid || undefined}
        aria-describedby={field?.describedBy}
        aria-required={field?.required || undefined}
        className={cx(BASE, attention ? ATTENTION : DEFAULT, className)}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {t(placeholder)}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
      <Icon
        name="expand_more"
        size={18}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#001E2B]/45"
      />
    </div>
  );
}
