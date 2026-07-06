# External references

The repos this project draws on, and the rules for using each. Added
2026-07-06.

## Skills (installed as Claude Code skills in ~/.claude/skills)

These are agent skills, not runtime dependencies. They inform how UIs are built,
they never ship in `@ucm/ui`.

| Repo | What it is | Notes |
|------|------------|-------|
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Design-taste skill pack (taste-skill, minimalist, brutalist, soft, redesign, imagegen, ...) | Already installed; kept as-is |
| [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | `karpathy-guidelines` engineering-judgment skill | Already installed |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `ui-ux-pro-max` plus design, brand, ui-styling, design-system | Already installed |
| [affaan-m/ecc](https://github.com/affaan-m/ecc) | Everything Claude Code: a broad multi-domain framework (277 skills) | Only the design and frontend subset was installed (see below). The rules half lives in `~/.claude/rules/ecc`. |

ecc is huge and mostly unrelated to a frontend design system (Laravel, PyTorch,
homelab, healthcare, logistics, ...). Only these design and frontend skills were
kept from it: `frontend-design-direction`, `frontend-a11y`, `frontend-patterns`,
`frontend-slides`, `accessibility`, `brand-voice`, `brand-discovery`,
`liquid-glass-design`, `make-interfaces-feel-better`, `motion-foundations`,
`motion-patterns`, `motion-advanced`, `motion-ui`, `react-patterns`,
`react-performance`, `react-testing`, `ui-to-vue`, `ui-demo`, `vue-patterns`,
`vite-patterns`. The full set can be reinstalled from the repo if ever needed.

## Libraries

### google/material-design-icons (Apache-2.0)

Source: <https://github.com/google/material-design-icons>

This is the vetted source for the `@ucm/ui` `Icon` component. Icon paths are
vendored as inline SVG into `packages/ui/src/foundation/icon/icons.ts` so the
library keeps zero runtime dependencies and stays server-render safe.

To add an icon: copy its Outlined (weight 400, 24px, viewBox `0 -960 960 960`)
path from the repo into the `ICON_PATHS` registry, then use it by name. Never add
`@material-design-icons` or any icon package as a dependency of `@ucm/ui`.

### motiondivision/motion

Source: <https://github.com/motiondivision/motion>

Allowed in `apps/docs` (or a future brand marketing surface) ONLY. It must NEVER
enter `@ucm/ui`, which stays zero-runtime and server-render safe. When used, it
must obey the motion rule: animate only transform, opacity, and clip-path,
ease-out only, and disabled under `prefers-reduced-motion`. Import it dynamically
so it does not weigh on first load.

### mrdoob/three.js

Source: <https://github.com/mrdoob/three.js>

For 3D on expressive brand surfaces. Allowed in `apps/docs` (or a future brand
marketing app) ONLY, never in `@ucm/ui` or any product surface. Load it
dynamically and keep it off the product app entirely.

### 21st.dev (animations and components, via MCP)

Source: <https://21st.dev> · MCP: `https://21st.dev/api/mcp`

An MCP server for UI animations and components. Use it as an inspiration and
animation source for `apps/docs` and brand surfaces ONLY. Generated output is
never dropped in raw: it must be reworked to obey the UCM rules (modes, triad,
bilingual copy, and the motion rule of transform / opacity / clip-path only),
and run through `review_code` before it ships. Never place 21st components in
`@ucm/ui` or a product surface.

Set up the MCP server in Claude Code (run these yourself; they need your API
key and are client config, so they are not run from the repo):

```bash
# 1. Register the server (needs API_KEY_21ST in your environment)
claude mcp add --transport http 21st https://21st.dev/api/mcp \
  --header "x-api-key: $API_KEY_21ST"

# 2. Or write the project config (.mcp.json)
npx @21st-dev/cli init --client claude --write

# 3. Verify
claude mcp list   # confirm 21st shows as connected

# 4. Or install everything as a plugin (MCP server + 21st.dev skills)
#   /plugin marketplace add 21st-dev/claude-code-plugin
#   /plugin install 21st@21st
```

Keep `API_KEY_21ST` in your environment or a secret manager, never committed.

## The rule that governs these libraries and sources

`@ucm/ui` never takes a runtime dependency and never imports a heavy library.
Anything expressive (motion, 3D, 21st.dev animations) lives on the brand and docs
surfaces, behind a dynamic import, and still respects the global motion and mode
rules. Third-party components are reworked to the UCM rules and pass `review_code`
before shipping, never dropped in raw.
