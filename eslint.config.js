import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/.astro/**", "**/node_modules/**", "**/tests/**/*-snapshots/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // TypeScript's compiler already enforces this; the ESLint core rule
      // mis-fires on TS types and ambient globals, so defer to tsc.
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.vitest },
    },
  },
);
