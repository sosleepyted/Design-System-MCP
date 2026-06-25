// @ucm/be-structure — RESERVED SLOT, not yet implemented.
//
// This package will hold the UCM backend-structure skill: the backend
// counterpart to @ucm/ui. Scope is intentionally undefined for now (folder and
// architecture conventions, service / API scaffolding, and/or data and schema
// structure). When implemented, it will emit entries into catalog.json under
// `structures`, served by a future get_structure MCP tool.
//
// Nothing imports this yet; it ships no runtime behavior.

export const BE_STRUCTURE_RESERVED = true;

/**
 * Placeholder shape for a future backend-structure entry. Deliberately minimal;
 * the real shape is defined once the skill's scope is decided.
 */
export type BackendStructure = {
  name: string;
  summary: string;
  // TODO: define the real fields (conventions, scaffolding, schema, ...).
};
