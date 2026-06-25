import type { Structure } from "./types";

// Reserved slot for the backend-structure skill (@ucm/be-structure). Returns an
// empty list until that skill is implemented; the slot exists now so the schema
// and the MCP can rely on it without a later breaking change.
export function buildStructures(): Structure[] {
  return [];
}
