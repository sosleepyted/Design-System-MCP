# The UCM brand book

This tree is the canonical UCM brand book: identity, rules, guidelines, and
assets. Everything here is the source of truth; the Confluence pages are
pasted copies of these files, refreshed through the workflow described in
docs/brandbook/README.md.

## Reading order

Foundations:

1. [Brand Hub](guidelines/brand-hub.md): why the brand matters, the
   essentials at a glance, the logo rule, the old-palette migration.
2. [The two modes](guidelines/modes.md): brand vs product, the first
   decision of any piece of work.
3. [Color](guidelines/color.md): the triad, the ramps, and the rules that
   keep them honest.
4. [Typography](guidelines/typography.md): Figtree, light headings,
   hierarchy through contrast.
5. [Motion](guidelines/motion.md): compositor-only animation, ease-out,
   reduced motion.

Application:

6. [Voice and copy](guidelines/voice-and-copy.md): the mechanical copy
   rules, bilingual by default, the two voices.
7. [Layout, spacing, and states](guidelines/layout.md): containers, radius,
   shadow, forms, responsive rules.
8. [Components](guidelines/components.md): the 16-component vocabulary, CTA
   doctrine, templates, icons.
9. [Dos and don'ts](guidelines/dos-and-donts.md): the quick reference,
   mirroring the machine-checked rules.

Working guides:

10. [B2B presentations](guidelines/b2b-presentations.md): decks for
    ucm.agency clients.
11. [Vibecoding with the UCM Design System](guidelines/vibecoding.md): how
    to build on-brand with Claude, three tracks.
12. [Setting up the vibecoding environment](guidelines/vibecoding-environment.md):
    from zero to a working setup.

Assets: [assets/](assets/) holds the color diagram and the logo folder
(see [assets/logos/README.md](assets/logos/README.md) for the current
status of the logo files).

## The technical sources of truth

The guidelines are the human-readable layer. The exact built state lives in:

- `DESIGN-SYSTEM.md` (repo root): tokens, atoms, modes, bans, inventory.
- `UCM-DESIGN SYSTEM.md` (repo root): the intent spec.
- `packages/rules/src/manifest.ts`: the twelve machine-checked rules that
  drive the lint and the code reviewer.

When a guideline and a spec ever disagree, the spec wins and the guideline
gets fixed.

## Copy rules for these files

Every file in this tree follows the global copy rules: no em dashes, no
emoji, no eyebrows, uppercase only for acronyms and data. Keep the Markdown
Confluence-paste-friendly: plain headings, bullets, simple tables, no raw
HTML, no nested tables, no footnotes. Every concrete value (hex, px, font,
weight) is copied from the technical sources, never paraphrased from memory.

## Tooling and skills

Design work with Claude uses external skill packs on top of this repo. They
inform how UIs are built; nothing from a skill pack ever ships into
@ucm/ui. Full catalog and per-source rules: `docs/references.md`.

Install into `~/.claude/skills` (clone each repo, copy the skill folders):

| Pack | Source | What to install |
|---|---|---|
| taste-skill | github.com/Leonxlnx/taste-skill | The design-taste pack as shipped |
| karpathy-guidelines | github.com/multica-ai/andrej-karpathy-skills | The engineering-judgment skill |
| ui-ux-pro-max | github.com/nextlevelbuilder/ui-ux-pro-max-skill | The full pack |
| ecc design subset | github.com/affaan-m/ecc | Only these 20: frontend-design-direction, frontend-a11y, frontend-patterns, frontend-slides, accessibility, brand-voice, brand-discovery, liquid-glass-design, make-interfaces-feel-better, motion-foundations, motion-patterns, motion-advanced, motion-ui, react-patterns, react-performance, react-testing, ui-to-vue, ui-demo, vue-patterns, vite-patterns |
| 21st.dev | 21st-dev/claude-code-plugin | As a Claude Code plugin: add the marketplace, install 21st@21st, then authenticate via /mcp |

The 21st.dev guardrail from the catalog applies always: its output is
reworked to the UCM rules and passes review_code before shipping, docs and
brand surfaces only.
