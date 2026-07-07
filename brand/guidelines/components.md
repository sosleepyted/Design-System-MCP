# Components

The component library is the built vocabulary of the system: 16 components
across four groups. Reach for a component before writing markup; start whole
pages from a blessed template, never from a blank file.

## The inventory

Product (internal app only):

| Component | Purpose |
|---|---|
| Button | The product action: navy primary, ghost, outline, and danger variants, two sizes, no glow |
| Card | The product surface: 20px radius, navy-alpha border, the one restrained shadow |
| Field | Labeled input shell with help text and the yellow empty-state treatment |
| Input | Text input, 14px, transparent background inside Field |
| Select | Native select styled to the input shell |
| Checkbox | Checkbox row with label, navy accent |

Brand (external marketing only):

| Component | Purpose |
|---|---|
| BrandButton | The brand CTA family: yellow primary, dark, and outline variants |
| GlowButton | The hero CTA with the cursor-tracking radial glow, the one gradient in the whole system |

Shared (both modes, mode set by the surface):

| Component | Purpose |
|---|---|
| Nav | Top navigation with mode-aware CTA |
| Footer | Footer with link groups |
| Container | Mode-aware page container |
| Section | Vertical section with mode-aware padding |
| Stack | Vertical rhythm primitive |
| Grid | Responsive grid primitive |
| Divider | The sanctioned divider, a navy-alpha hairline |

Foundation:

| Component | Purpose |
|---|---|
| Icon | Inline SVG Material Symbols (Outlined), 20 vendored paths, inherits currentColor |

Primitives underneath: cx (class combiner) and the locale layer
(LocaleProvider, useLocale, the Label type) that makes every string
bilingual.

## CTA doctrine

- Brand primary is always yellow: BrandButton primary (#FCC224, hover
  #FFD84D, navy text). The dark and outline variants are secondary and
  tertiary emphasis.
- GlowButton is reserved for hero moments. Its radial glow is the one
  gradient permitted anywhere in the system, and it exists in brand mode
  only.
- Product primary is always navy: Button primary (#001E2B, white text,
  restrained shadow). Ghost for low emphasis, outline for secondary, danger
  (#A32D2D) for destructive actions.
- Buttons render a real anchor when given a link and a real button
  otherwise, with a visible focus ring. Primary buttons show a trailing
  forward arrow by default.

## Cards and navigation

- Product cards never nest. Inside a card, separate content with the
  top-border hairline divider.
- Brand may use light cards, dark featured cards (navy surface, off-cream
  #F0F0EB text), and the pill segmented control (active pill yellow,
  inactive faint gray).
- Modals come last: exhaust inline editing and progressive disclosure first.
  When a modal is justified, it uses a navy scrim with functional blur and
  is dismissible by backdrop click and Escape.

## Templates: start whole pages here

Two blessed page templates exist and are the mandatory starting point for
any whole page:

- Landing (brand mode): hero, sections, CTA rhythm.
- Dashboard (product mode): app chrome, cards, form patterns.

Compose and edit from a template; never rebuild a page shape from scratch
that a template already provides.

## Icons

All iconography is the Icon component: Google Material Symbols, Outlined,
weight 400, vendored as inline SVG, colored by the surrounding text color.
Twenty names ship today (add, arrow_back, arrow_forward, check,
check_circle, chevron_left, chevron_right, close, content_copy, delete,
edit, error, expand_less, expand_more, info, lock, menu, open_in_new,
remove, search). A missing glyph is added by vendoring its outlined path,
never by installing an icon package and never by an emoji. Decorative icons
are hidden from screen readers; icon-only buttons carry a label.
