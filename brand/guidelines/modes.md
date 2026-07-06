# The two modes

Every UCM surface runs in exactly one of two modes. The mode decides the CTA
color, the radii, the shadows, the voice, and what expressive effects are
allowed. Choosing the mode is the first decision of any piece of work, and it
never changes mid-surface.

## When each mode applies

- Brand mode: the public ucm.jobs pages (home, unternehmen, studierende,
  referenzen, kontakt) and every external marketing surface, including B2B
  presentations. This surface persuades, ranks, and converts.
- Product mode: the internal, logged-in app. Restrained palette, functional
  polish, no maximalism. The UI serves a task.
- Shared components (Nav, Footer, Container, Section, Stack, Grid, Divider)
  work in both modes. The mode is set by the surface, not by the component.

## At a glance

| Topic | Brand (external) | Product (internal) |
|---|---|---|
| Primary CTA | Yellow #FCC224 | Navy #001E2B |
| Radius | Large allowed (24, 28) | 20 cards, 12 inputs, full pills |
| Shadow | Expressive, glow allowed | Restrained, no glow |
| Copy voice | Motivational allowed | Informational only |
| Fonts | May add Instrument Serif (not loaded yet) | Two families maximum |
| Icons | Inline SVG | Inline SVG (Icon atom), no MUI |
| Expressive effects | Parallax, marquee, scatter, glow | Banned |

## Brand mode: the expressive license

Allowed in brand mode and banned in product:

- Cinematic large heroes, parallax, scroll-driven scatter cards, marquee logo
  parades, pulsing accent dots.
- Hero metric and stats bars (for example 98 percent placement).
- Repeated card grids when they serve a scannable content index.
- Larger radii: rounded 24px section blocks, rounded 28px feature blocks.
- Dramatic shadows, including the yellow CTA glow.
- The decorative Instrument Serif family (brand only, and only once a brand
  surface actually needs it).

## Product mode: the extra bans

On top of the global rules, product mode bans:

- Nested cards (a card inside a card). Use a top border divider at 8 percent
  navy instead.
- Colored side-stripe borders wider than 1px as decoration.
- Gradient backgrounds. The brand GlowButton radial is the one exception in
  the whole system, and it never appears in product.
- Decorative glassmorphism. Functional scrim blur on modals and nav is
  allowed.
- The hero-metric template (big number, small label, supporting stat).
- Identical repeated card grids.
- Reaching for a modal first. Exhaust inline editing and progressive
  disclosure before a modal.

## The one rule above both

The global rules (triad, copy mechanics, motion discipline, bilingual
strings) apply in both modes and are never overridden by mode license. Brand
mode is expressive within the rules, never outside them.
