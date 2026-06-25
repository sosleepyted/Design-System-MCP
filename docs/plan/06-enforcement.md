# Step 6: Make the rules enforceable (lint plus review tools)

Assumes the standing context. The MCP is advisory (the agent can skip a tool call); CI is the real backstop, because the end users cannot self-review. Build both layers.

1. **Lint the mechanical rules in CI.** These map cleanly to checks:
   - an em dash in any shipped string fails (grep);
   - `#000` / `#fff` as ink or surface fails;
   - hues outside the triad and documented accents fail;
   - `transition-all`, or animating layout properties (width / height / top / left / margin / padding / font-size), fails;
   - `@mui/*` or `@emotion/*` imported inside `packages/ui` fails;
   - decorative `uppercase tracking-[...]` (an eyebrow) outside an acronym or data allowlist warns.

   Wire these as ESLint / stylelint rules (or a small custom rule set) and run them in CI on every PR.
2. **`review_code(code, mode)` MCP tool** (advisory): runs the same checks plus the semantic ones it can manage (wrong-mode component, a `className` override that fights a component) and returns structured findings. Reuse the lint logic so the two never drift.
3. **Structured guidelines.** Add a `guidelines` field (`do` / `dont`) to the component MDX frontmatter schema in `content.config.ts`, backfill it from the existing `DoDont` blocks, and have the catalog read it so `get_component` returns real per-component rules.
4. **`preflight()` MCP tool.** Checks that `@ucm/ui` is installed in the caller project and that its version matches the catalog `catalogVersion`; on mismatch, tells the agent to update before generating.

**Stop and verify:** introduce one deliberate violation of each mechanical rule in a scratch file and confirm CI and `review_code` flag every one. Remove the scratch file afterward.
