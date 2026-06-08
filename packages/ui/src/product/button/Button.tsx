import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { cx } from "../../foundation/utils/cx";

export type ButtonVariant = "primary" | "ghost" | "outline" | "danger";
export type ButtonSize = "default" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.005em] transition disabled:cursor-not-allowed";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-[#001E2B] text-white shadow-[0_8px_24px_-14px_rgba(0,30,43,0.7)] hover:bg-[#0a2d3c] disabled:opacity-45 disabled:shadow-none",
  ghost:
    "text-[#001E2B]/70 hover:bg-[#001E2B]/[0.04] hover:text-[#001E2B]",
  outline:
    "border border-[#001E2B]/15 text-[#001E2B]/85 hover:border-[#001E2B]/30 hover:bg-[#001E2B]/[0.02]",
  danger:
    "bg-[#a32d2d] text-white shadow-[0_8px_24px_-12px_rgba(163,45,45,0.6)] hover:bg-[#8c2424] disabled:opacity-45",
};

const SIZES: Record<ButtonSize, string> = {
  default: "h-9 px-4 text-[13.5px]",
  lg: "h-11 px-5 text-[14.5px]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  hideArrow?: boolean;
  iconLeft?: ReactNode;
  children?: ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | "href"> & {
    href?: undefined;
  };
type AsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = AsButton | AsAnchor;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "default",
    hideArrow = false,
    iconLeft,
    children,
    className,
    ...rest
  } = props;

  const classes = cx(BASE, VARIANTS[variant], SIZES[size], className);
  const showArrow = variant === "primary" && !hideArrow;

  const content = (
    <>
      {iconLeft}
      {children}
      {showArrow ? <ArrowForward aria-hidden sx={{ fontSize: 16 }} /> : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={props.href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
