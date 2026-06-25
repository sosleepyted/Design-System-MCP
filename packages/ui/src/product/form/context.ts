import { createContext, useContext } from "react";

// Lowercase filename so the catalog's component discovery (PascalCase *.tsx)
// skips it: this is wiring, not a catalog component.
export type FieldContextValue = {
  id: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
};

export const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}
