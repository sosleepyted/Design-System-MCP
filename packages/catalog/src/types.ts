// Catalog data model. The MCP server (Step 2) consumes catalog.json against
// these shapes, so keep them stable.
import type { Rule } from "@ucm/rules";

export type { Rule };

export type Mode = "brand" | "product" | "shared";
export type Status = "ready" | "draft";

export type PropEntry = {
  name: string;
  type: string;
  required: boolean;
  default: string | null;
  description: string;
};

export type Guidelines = {
  do: string[];
  dont: string[];
};

export type ComponentEntry = {
  name: string;
  mode: Mode;
  status: Status;
  /** Only `ready` entries are servable by the MCP. */
  servable: boolean;
  summary: string;
  props: PropEntry[];
  import: string;
  example: string;
  guidelines: Guidelines;
};

export type TokenEntry = {
  name: string;
  value: string;
};

export type MotionEntry = {
  /** Utility class or keyframes name. */
  name: string;
  /** The animation shorthand or keyframes intent. */
  value: string;
};

export type TokenSet = {
  color: TokenEntry[];
  type: TokenEntry[];
  spacing: TokenEntry[];
  radius: TokenEntry[];
  shadow: TokenEntry[];
  other: TokenEntry[];
  motion: MotionEntry[];
};

export type PatternSlot = {
  name: string;
  description: string;
};

export type Pattern = {
  name: string;
  mode: "brand" | "product";
  summary: string;
  /** Exported component name in the template source. */
  component: string;
  /** Component names this pattern imports from @ucm/ui. */
  imports: string[];
  /** Editable content slots; the structure around them is fixed. */
  slots: PatternSlot[];
  /** The full, real template source. */
  code: string;
};

// Reserved: the backend-structure skill (see packages/be-structure). The slot
// exists in the schema so consumers can rely on it; it is emitted empty until
// the skill is implemented.
export type Structure = {
  name: string;
  summary: string;
};

export type Catalog = {
  catalogVersion: string;
  generatedFrom: string;
  components: ComponentEntry[];
  tokens: TokenSet;
  patterns: Pattern[];
  /** The global rules, a co-equal deliverable with the components. */
  rules: Rule[];
  /** Reserved, currently empty. See packages/be-structure. */
  structures: Structure[];
};
