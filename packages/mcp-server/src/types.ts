// The catalog.json contract, mirrored from @ucm/catalog. We deliberately
// redeclare it here rather than importing @ucm/catalog: the server treats the
// catalog as data with a stable schema and must stay free of build-tooling
// (and, transitively, @ucm/ui) dependencies.

export type Mode = "brand" | "product" | "shared";
export type Status = "ready" | "draft";
export type TokenCategory =
  | "color"
  | "type"
  | "spacing"
  | "radius"
  | "shadow"
  | "other"
  | "motion";

export type PropEntry = {
  name: string;
  type: string;
  required: boolean;
  default: string | null;
  description: string;
};

export type Guidelines = { do: string[]; dont: string[] };

export type ComponentEntry = {
  name: string;
  mode: Mode;
  status: Status;
  servable: boolean;
  summary: string;
  props: PropEntry[];
  import: string;
  example: string;
  guidelines: Guidelines;
};

export type TokenEntry = { name: string; value: string };
export type MotionEntry = { name: string; value: string };

export type TokenSet = {
  color: TokenEntry[];
  type: TokenEntry[];
  spacing: TokenEntry[];
  radius: TokenEntry[];
  shadow: TokenEntry[];
  other: TokenEntry[];
  motion: MotionEntry[];
};

export type RuleSeverity = "error" | "warn" | "advisory";
export type RuleEnforcement = "lint" | "review" | "authoring";
export type Rule = {
  id: string;
  title: string;
  statement: string;
  severity: RuleSeverity;
  enforcedBy: RuleEnforcement[];
  reference: string;
};

export type PatternSlot = { name: string; description: string };

export type Pattern = {
  name: string;
  mode: "brand" | "product";
  summary: string;
  component: string;
  imports: string[];
  slots: PatternSlot[];
  code: string;
};

// Reserved: backend-structure skill (see packages/be-structure). Mirrored here
// so the slot is part of the served schema; currently always empty.
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
  rules?: Rule[];
  /** Reserved, currently empty. See packages/be-structure. */
  structures?: Structure[];
};
