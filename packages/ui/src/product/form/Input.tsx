import type { InputHTMLAttributes } from "react";
import { cx } from "../../foundation/utils/cx";
import { useFieldContext } from "./context";

export type InputProps = {
  /** Yellow attention ring for empty or attention states. */
  attention?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

const BASE =
  "h-10 w-full rounded-[12px] border bg-white px-3 text-[14px] text-[#001E2B] placeholder:text-[#001E2B]/35 transition focus:outline-none";
const DEFAULT =
  "border-[#001E2B]/12 hover:border-[#001E2B]/25 focus:border-[#001E2B]/40 focus:ring-2 focus:ring-[#001E2B]/15";
// Documented attention treatment: strong yellow border with its ring partner.
const ATTENTION = "border-[#FCC224]/60 ring-2 ring-[#FCC224]/25";

export function Input({ attention = false, className, id, ...rest }: InputProps) {
  const field = useFieldContext();
  return (
    <input
      id={id ?? field?.id}
      aria-invalid={field?.invalid || undefined}
      aria-describedby={field?.describedBy}
      aria-required={field?.required || undefined}
      className={cx(BASE, attention ? ATTENTION : DEFAULT, className)}
      {...rest}
    />
  );
}
