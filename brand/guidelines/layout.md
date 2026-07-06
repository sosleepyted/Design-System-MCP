# Layout, spacing, and states

The two modes share one discipline: rhythm from a small set of steps, radius
and shadow from a fixed menu, and responsive behavior verified at the same
five widths.

## Containers

- Product: centered, max width 680px on small screens and 960px from medium
  up, with 16 to 32px side padding.
- Brand: max width 1440px, section padding from py-16 up to py-32. Wide
  stages, overlap, and large feature blocks are brand license.
- Docs: centered, max width 1280px.

## Radius

| Surface | Product | Brand |
|---|---|---|
| Cards | 20px | 10 to 20px by prominence |
| Inputs | 12px | 6 to 8px |
| Pills and buttons | full | full |
| Modals | 16 to 24px | n/a |
| Section blocks | n/a | 24px |
| Feature blocks | n/a | 28px |

## Shadow

Product is restrained, one card shadow, no glow:

- Card: 0 12px 28px -22px rgba(23,43,54,0.4)
- Primary button: 0 8px 24px -14px rgba(0,30,43,0.7)
- Modal: 0 30px 70px -20px rgba(0,30,43,0.5)

Brand adds the expressive tiers: subtle, medium, large (mega nav), and the
yellow CTA glow 0 20px 60px -20px rgba(255,200,1,0.45). The glow never
appears in product.

## Spacing rhythm (product)

Vertical rhythm descends in fixed steps: mt-5 for a major block, mt-4 for a
subsection, mt-3 within a subsection, mt-2.5 for help text. The in-card
divider is a top border at 8 percent navy, never a nested card. Screen
bodies keep bottom clearance for the sticky action bar plus the iOS safe
area inset.

## Forms (product)

- Field labels sit above the input; a secondary control belongs on the label
  row, never floating below the input.
- Input text is 14px; if iOS focus zoom is unacceptable, use 16px on coarse
  pointers and 14px elsewhere.
- Disclosure is the default pattern: a quiet one-line default note, a
  checkbox row to adjust, conditional inputs revealed in the same card
  behind a top-border divider, help text below. Do not lead with a boxed
  yes-or-no.
- Empty or attention fields use the yellow treatment: border at 60 percent
  accent with a 25 percent ring.

## State styles

- Inline warning: 12px text in #A96B00.
- Success: text in #0F5E2A with a check icon, or the solid green toggle
  state.
- Destructive confirmation: danger primary plus ghost cancel, and the modal
  names exactly what is being deleted before asking.
- Progress folds into the stat it describes ("3 (2 filled)"), suffix muted.

## Responsive and mobile (both modes)

- Verify at 320, 375, 768, 1024, and 1440. No horizontal overflow at any of
  them.
- Touch targets are at least 36px; primary mobile CTAs 44px.
- Fixed bottom bars clear the iOS home indicator via the safe-area inset.
- Adapt copy to capability, not width: drag-and-drop hints hide on touch
  devices via the coarse-pointer media query, never JS device sniffing.
- Client state that must survive reload (toggles, wizard step, drafts) lives
  in a persistence layer, not component memory.
