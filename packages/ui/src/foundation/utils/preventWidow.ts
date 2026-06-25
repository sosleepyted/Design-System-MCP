// Widow control (design system rule 1.3). Bind the final `count` words with
// non-breaking spaces so they cannot drop onto a line by themselves, keeping the
// last line at or above the minimum word count. Use count = 3 on mobile and 5 on
// desktop; resolve the breakpoint with matchMedia in the consuming app, or pass a
// fixed count in SSR contexts that cannot measure the viewport.
const NBSP = " ";

/** Minimum words on the last line at narrow widths (design system rule 1.3). */
export const WIDOW_MOBILE = 3;
/** Minimum words on the last line at wide widths (design system rule 1.3). */
export const WIDOW_DESKTOP = 5;
/** Breakpoint at which the desktop minimum applies. */
export const WIDOW_DESKTOP_QUERY = "(min-width: 768px)";

export function preventWidow(text: string, count = WIDOW_MOBILE): string {
  if (count < 2) return text;
  const words = text.trim().split(/\s+/);
  if (words.length <= count) return text;
  const head = words.slice(0, words.length - count).join(" ");
  const tail = words.slice(words.length - count).join(NBSP);
  return `${head} ${tail}`;
}
