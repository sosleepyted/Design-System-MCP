// Widow control (design system rule 1.3). The canonical helper and constants
// live in @ucm/ui (a foundation util, like cx) so the product app reuses them.
// This module re-exports them; @ucm/ui has sideEffects:false for JS, so the
// client script that imports from here tree-shakes the component barrel away.
export {
  preventWidow,
  WIDOW_MOBILE,
  WIDOW_DESKTOP,
  WIDOW_DESKTOP_QUERY,
} from "@ucm/ui";
