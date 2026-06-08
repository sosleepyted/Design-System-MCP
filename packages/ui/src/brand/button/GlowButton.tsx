import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { cx } from "../../foundation/utils/cx";

const ARROW = (
  <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
    <path
      d="M4.16 4.4V3.5h4.34v4.34h-.9V5.03l-3.47 3.47L3.5 7.87 6.97 4.4H4.16Z"
      fill="currentColor"
    />
  </svg>
);

export type GlowButtonProps = {
  href?: string;
  bg?: string;
  fg?: string;
  glow?: string;
  border?: string;
  hideArrow?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function GlowButton({
  href,
  bg = "#FCC224",
  fg = "#001E2B",
  glow = "#F1F6F4",
  border,
  hideArrow = false,
  children,
  className,
  onClick,
}: GlowButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  function handleMove(event: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  const style = {
    backgroundColor: bg,
    color: fg,
    border: border ? `1px solid ${border}` : undefined,
    "--glow": glow,
  } as CSSProperties;

  const classes = cx(
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[14px] font-semibold transition hover:-translate-y-[1px]",
    className,
  );

  const content = (
    <>
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--x) var(--y), var(--glow), transparent 60%)",
        }}
      />
      <span className="relative z-10">{children}</span>
      {hideArrow ? null : (
        <span className="relative z-10 transition-transform group-hover:translate-x-1">
          {ARROW}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} style={style} onMouseMove={handleMove}>
        {content}
      </a>
    );
  }
  return (
    <button ref={ref} className={classes} style={style} onMouseMove={handleMove} onClick={onClick}>
      {content}
    </button>
  );
}
