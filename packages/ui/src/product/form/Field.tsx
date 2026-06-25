import { useId, type ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";
import { useLocale } from "../../foundation/locale";
import type { Label } from "../../foundation/locale";
import { FieldContext } from "./context";

export type FieldProps = {
  /** Visible label, bilingual. */
  label: Label;
  /** Optional helper text shown below the control. */
  hint?: Label;
  /** Error text; when set, the control is marked invalid and the hint is hidden. */
  error?: Label;
  required?: boolean;
  /** Override the generated control id. */
  id?: string;
  /** The control: Input, Select, or another field-aware element. */
  children: ReactNode;
  className?: string;
};

// Field owns the label and the id / aria wiring; the control reads it from
// context, so an Input inside a Field is labelled and described automatically.
export function Field({
  label,
  hint,
  error,
  required = false,
  id,
  children,
  className,
}: FieldProps) {
  const { t } = useLocale();
  const generated = useId();
  const fieldId = id ?? generated;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = errorId ?? hintId;

  return (
    <FieldContext.Provider
      value={{ id: fieldId, describedBy, invalid: Boolean(error), required }}
    >
      <div className={cx("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={fieldId}
          className="text-[13px] font-medium text-[#001E2B]/85"
        >
          {t(label)}
          {required ? <span className="text-[#a32d2d]"> *</span> : null}
        </label>
        {children}
        {error ? (
          <p id={errorId} className="text-[12px] text-[#a32d2d]">
            {t(error)}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-[12px] text-[#001E2B]/55">
            {t(hint)}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}
