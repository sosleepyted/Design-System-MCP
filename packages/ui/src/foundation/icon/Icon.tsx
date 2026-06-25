import { cx } from "../utils/cx";
import { ICON_PATHS, type IconName } from "./icons";

export type IconProps = {
  name: IconName;
  /** Rendered px size (width = height). Defaults to 20. */
  size?: number;
  className?: string;
  /**
   * Accessible label. When set, the icon is exposed as a labelled image
   * (`role="img"`). When omitted, the icon is decorative (`aria-hidden`).
   */
  title?: string;
};

export function Icon({ name, size = 20, className, title }: IconProps) {
  const labelled = title !== undefined;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      className={cx("inline-block shrink-0", className)}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
    >
      {labelled ? <title>{title}</title> : null}
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
