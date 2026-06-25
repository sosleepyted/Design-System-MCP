# Step 5: Blessed page templates and `get_pattern`

Assumes the standing context and the components from Step 4. This is the main safety mechanism for non-designers: they should start from a correct page and edit content, not assemble one from scratch.

1. Build at least two **blessed templates**, composed only from `@ucm/ui` components and tokens:
   - a **brand landing page** (ucm.jobs style: hero, nav, sections, cards, a CTA using `GlowButton` / `BrandButton`, footer), and
   - a **product dashboard shell** (navy, restrained, no glow, the product container).

   Each template is content-driven: the structure is fixed and only copy plus a small set of slots vary. All copy is `{ de, en }`.
2. Add a `get_pattern(name, mode?)` tool to the MCP server that returns a whole composed template (imports + full JSX + which slots are editable), not just atoms. Update the tool descriptions and the rules guidance so the agent reaches for `get_pattern` on whole-page requests and `get_component` only for individual pieces.

**Stop and verify:** call `get_pattern("landing", "brand")` in the Inspector and confirm it returns a complete, on-brand page that imports only real components, with editable slots clearly marked.
