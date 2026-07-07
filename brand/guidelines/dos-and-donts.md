# Dos and don'ts

The quick reference. The first twelve rows mirror the machine-checked rules
in the design-rule manifest one to one (the rule id is what the lint and the
code reviewer report), followed by the product-only bans and the rules for
external libraries.

## The twelve system rules

| Rule id | Do | Don't |
|---|---|---|
| modes | Choose brand or product once per surface | Never mix yellow-CTA marketing and restrained app UI on one surface |
| bilingual | Author every visible string as { de, en }, German first | Never ship a string in only one language |
| no-em-dash | Use commas, colons, parentheses; "to" or "bis" for ranges | Never an em dash, anywhere, including comments |
| no-emoji | Use the Material Symbols Icon, or a plain word | Never an emoji, in UI, docs, or code |
| no-eyebrow | Lead with the heading; sentence-case labels | Never an uppercase letter-spaced kicker |
| widow-control | End lines with at least 3 words (mobile), 5 (desktop) | Never let a heading or paragraph end on a stranded word |
| no-pure-black-white | Ink #001E2B, page #F5F5F3, white for cards only | Never #000 or #fff as ink or surface |
| triad-only | Cream, navy, yellow, plus the documented accents | Never introduce a new hue |
| no-transition-all | Transition the named property | Never transition-all |
| no-layout-animation | Animate transform, opacity, clip-path | Never animate width, height, top, left, margin, padding, font-size |
| no-mui-emotion | Keep the component library zero-dependency | Never let @mui or @emotion into @ucm/ui |
| hierarchy | Adjacent type steps differ by at least 1.25x; light headings | Never ship a flat scale like 14, 14.5, 15 |

Also global: no gradient text, ever. And text pairings are dark on light or
light on dark within the palette, never color on color and never a mid-tone
as or under text; the sanctioned pairing tables with measured contrast
ratios are in color.md.

## Product-only bans

Brand mode is exempt from these; product mode never breaks them:

- No nested cards; divide with the navy-alpha top border.
- No colored side-stripe borders wider than 1px as decoration.
- No gradient backgrounds; the brand GlowButton radial is the single
  exception in the system, and it is brand only.
- No decorative glassmorphism; functional scrim blur on modals and nav is
  allowed.
- No hero-metric template (big number, small label, supporting stat).
- No identical repeated card grids.
- No modal as the first idea; exhaust inline and progressive disclosure.

## External libraries and generated UI

- Motion libraries and three.js are allowed on docs and brand surfaces only,
  always behind a dynamic import, and they still obey the motion rules. They
  never enter @ucm/ui or a product surface.
- 21st.dev output is inspiration, not merchandise: rework it to the UCM
  rules (mode, triad, bilingual copy, motion discipline) and run it through
  the review_code check before it ships. Never drop it in raw.
- Design skills inform how UIs are built; nothing from a skill pack ships
  into @ucm/ui.
