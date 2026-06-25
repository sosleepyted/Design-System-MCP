# Step 4: Component coverage (the real critical path)

Assumes the standing context. A landing page needs more than buttons; today only buttons and `Icon` exist. Add the missing pieces into `@ucm/ui`, following the Section 11 workflow exactly (component + Vitest tests + `index.ts` export + MDX doc with island demos, both `de` and `en`, responsive, touch targets at least 36px, mode bans respected).

Build in this order, and **pause after each component for me to review** before the next:

1. **`Nav` and `Footer`.** Graduate the docs header and sidebar into real `@ucm/ui` components (today the header is an Astro organism, not a library component). Include a working mobile menu using the existing `menu` icon, since the current sidebar is `hidden md:block` with no mobile navigation. Provide brand and product variants.
2. **Layout primitives.** `Container` (use the documented product and brand max-widths), `Section`, `Stack` / `Grid`, and `Divider` (product uses `border-t border-[#001E2B]/8`, never nested cards).
3. **`Card`.** Product variant restrained (the documented card shadow and border). No nested cards in product mode.
4. **Form set.** `Field`, `Input`, `Select`, `Checkbox`, using the documented input tokens (radius 12, the input border ramp, the yellow attention ring for empty or attention states).

For each: declare strings as `{ de, en }`, use `Icon` and `cx`, and keep the `className` passthrough for now (we constrain it later on the vibecoding surface, not in the library). After each component, regenerate `catalog.json` so it becomes servable once its MDX `status` is `ready`.

**Stop and verify after each component:** tests pass, type check is clean, both modes are correct, all global rules hold, and the component appears in `catalog.json` with the right mode and props.
