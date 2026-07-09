# Color

The whole system is one triad: cream page, navy ink, yellow accent. Every
other value is a ramp, a status color, or a small decorative sub-palette.
New hues are never introduced.

This page is the canonical color reference: every token, every ramp step,
and every pairing lives here. The tables are written one fact per row with
stable ids and explicit hex values so that both people and machines can
scan them; the JSON block at the end mirrors the page one to one.

![UCM color diagram](../assets/color-diagram.svg)

## Token reference

Ids are stable and never change once shipped. All contrast ratios on this
page are measured WCAG contrast; the AA bars are 4.5 to 1 for normal text
and 3 to 1 for large text and UI shapes.

### Core tokens

| Id | Value | Role |
|---|---|---|
| ink | #001E2B | Text and borders everywhere, used instead of black, never #000 |
| page | #F5F5F3 | Page background, never #FFF as a page |
| card | #FFFFFF | Card surface, the one allowed pure white |
| accent | #FCC224 | Yellow accent, the brand primary CTA, never more than about 10 percent of any surface |
| accent-hover | #FFD84D | Accent hover state |
| cream-tint | #F8F5EE | Pill chips, soft callouts |
| light-gray | #EDECEA | Nav pill background, secondary surface |
| faint-gray | #F7F7F7 | Inputs, inactive pill states (brand) |
| ink-on-dark | #F0F0EB | Text on dark surfaces, never pure white for content |
| hero-dark | #0A0F14 | Cinematic dark hero, brand only |

### Status tokens

| Id | Value | Role |
|---|---|---|
| success | #0F5E2A | Success text; tint base at 22 percent |
| danger | #A32D2D | Danger text and button background; 10 percent hover tint |
| warning-text | #8A5A00 | Warning text on a yellow-tinted background or the page |
| warning-inline | #A96B00 | Inline warning text; below AA at its built 12px size, see known gaps |

Warning always uses the accent family above, never a new orange or red.

### Ink opacity ramp (text)

Text steps down in opacity, never into gray hues. Four steps only:
100 / 80 / 60 / 30.

| Id | Value | On page | On card | Use |
|---|---|---|---|---|
| ink-100 | #001E2B | 15.8 | 17.2 | Headlines, focused input text; any text |
| ink-80 | #001E2B at 80 percent | 8.7 | 9.2 | Body, emphasis, list items, paragraphs; any text |
| ink-60 | #001E2B at 60 percent | 4.47 | 4.6 | Secondary body, labels, fine print; on the page it sits a hair under the 4.5 bar, see known gaps |
| ink-30 | #001E2B at 30 percent | 1.9 | 1.9 | Placeholder text, subdued icon strokes, disabled states; never text |

### Border and divider ramp

Borders are navy with alpha, never gray and never black.

| Id | Value | Use |
|---|---|---|
| border-8 | #001E2B at 8 percent | Faint hairlines, in-card dividers |
| border-10 | #001E2B at 10 percent | Default card border |
| border-12 | #001E2B at 12 percent | Default input border |
| border-15 | #001E2B at 15 percent | Outlined buttons |
| border-25 | #001E2B at 25 percent | Hover state on cards and inputs |

### Accent alphas

| Id | Value | Use |
|---|---|---|
| accent-tint-22 | #FCC224 at 22 percent | Soft tinted background; composites to about #F7EAC5 over the page |
| accent-border-60 | #FCC224 at 60 percent | Strong border on an empty or attention field |
| accent-ring-25 | #FCC224 at 25 percent | Ring partner to that border |

### Decorative sub-palette

Decorative only: never the CTA, never a primary, never as text, never
under text.

| Id | Value | Note |
|---|---|---|
| teal-1 | #03677E | |
| teal-2 | #024E60 | |
| teal-3 | #0E3E4A | |
| teal-4 | #114C5A | |
| teal-5 | #1A8578 | |
| teal-6 | #2FB8A8 | |
| light-blue | #C2E8FF | |
| light-cyan | #D9E8E2 | |
| brand-orange | #F0A639 | |
| logo-dot | #FF9932 | Belongs to the "ucm." wordmark and nothing else |

## The rules that keep it honest

- Never pure black, never pure white as ink or surface. Ink is #001E2B, the
  page is #F5F5F3. White #FFFFFF exists only as a card surface and as text
  inside solid action surfaces.
- Yellow stays scarce: never more than about 10 percent of any surface.
- Borders are navy with alpha, never gray and never black.
- Hero dark #0A0F14 with ink-on-dark #F0F0EB is brand only, used sparingly.
- Gradient text is banned. The GlowButton radial is the one gradient in the
  system, brand only.

## Logo color usage

The wordmark is "ucm." in Nunito ExtraBold, always lowercase, always
ending in the dot. It is placed from the asset files and never retyped as
styled text;
brand/assets/logos/ holds the README that points at the Drive folder until
the files land.

| Element | Value | Rule |
|---|---|---|
| logo-dot | #FF9932 | The dot is always #FF9932; the color belongs to the wordmark and nothing else |
| Wordmark on light surfaces | ink #001E2B + #FF9932 | Letterforms in ink, the dot unchanged |
| Wordmark on dark surfaces | ink-on-dark #F0F0EB + #FF9932 | Letterforms in ink-on-dark, the dot unchanged; the dot measures 8.1 on ink and 9.0 on hero dark |
| Wordmark on accent | standard mark in its white container | Never directly on yellow; #FF9932 on #FCC224 measures 1.3 and disappears |

- Never retype the wordmark. Place the provided asset, in any medium.
- Never uppercase. The wordmark is "ucm.", not "UCM."; uppercase UCM stays
  reserved for prose.
- Never restyle. The wordmark is always Nunito ExtraBold, never another
  face or weight.
- Never recolor, drop, or resize the dot independently, and never use
  #FF9932 outside the wordmark.
- On the accent the wordmark sits inside its white container, never
  directly on the yellow: the dot measures 1.3 on #FCC224 and disappears.
  The container is always a pill at maximum border radius, kept compact
  around the mark.
- The wordmark sits on the light neutrals, the dark surfaces, or its white
  container on the accent, never on the decorative mid-tones.

The dot alone measures about 2.0 against light surfaces, under the 3.0 UI
bar. Logos are exempt from that requirement, and the dot never appears
without the ink letterforms beside it.

## Pairing reference

One principle: text is always a dark ink-family color on a light surface,
or a light cream-family color on a dark surface, staying inside the same
warm-neutral tone. Mid-tones never sit under text and never act as text.
One concrete pair per row; anything not in these tables is not a
sanctioned pairing.

![UCM sanctioned color pairings reference](../assets/color-pairings.svg)

### Text on light surfaces

| Text | Background | Ratio | Verdict |
|---|---|---|---|
| ink #001E2B | page #F5F5F3 | 15.8 | Pass, any size |
| ink #001E2B | card #FFFFFF | 17.2 | Pass, any size |
| ink #001E2B | cream-tint #F8F5EE | 15.8 | Pass, any size |
| ink #001E2B | light-gray #EDECEA | 14.6 | Pass, any size |
| ink #001E2B | faint-gray #F7F7F7 | 16.1 | Pass, any size |
| ink #001E2B | accent #FCC224 | 10.6 | Pass, the brand CTA pairing |
| ink #001E2B | accent-hover #FFD84D | 12.4 | Pass |
| success #0F5E2A | page #F5F5F3 | 7.3 | Pass |
| success #0F5E2A | card #FFFFFF | 7.9 | Pass |
| danger #A32D2D | page #F5F5F3 | 6.5 | Pass |
| danger #A32D2D | card #FFFFFF | 7.1 | Pass |
| warning-text #8A5A00 | yellow tint, about #F7EAC5 | 4.9 | Pass |
| warning-text #8A5A00 | page #F5F5F3 | 5.4 | Pass |
| warning-inline #A96B00 | page #F5F5F3 | 4.02 | Below AA for small text, see known gaps |
| warning-inline #A96B00 | card #FFFFFF | 4.4 | Below AA for small text, see known gaps |

### Text on dark surfaces

| Text | Background | Ratio | Verdict |
|---|---|---|---|
| white #FFFFFF | ink #001E2B | 17.2 | Pass, button labels on solid navy actions only |
| white #FFFFFF | danger #A32D2D | 7.1 | Pass, danger buttons only |
| ink-on-dark #F0F0EB | hero-dark #0A0F14 | 16.8 | Pass, brand hero |
| ink-on-dark #F0F0EB | ink #001E2B | 15.1 | Pass, dark featured cards |

White appears as text only inside solid action surfaces, the navy and
danger buttons. Content on dark surfaces uses ink-on-dark #F0F0EB, never
pure white. The ink ramp floors live in the ink opacity ramp table above,
which carries measured contrast per step on both light surfaces.

### Banned pairings

| Pairing | Ratio | Why |
|---|---|---|
| accent #FCC224 as text on any light surface | 1.5 | Unreadable. Yellow is a surface and an accent, never a text color on light. On ink it measures 10.6 and may serve small brand accents, never body text |
| any decorative mid-tone as text or under text | not measured | The decorative sub-palette never carries copy |
| color on color, such as teal on accent or success on a danger tint | not measured | Semantic colors sit on light neutral surfaces or carry white |
| light on light or mid on mid | not measured | Every text pairing is dark with light, in that order or reversed, never two tones from the middle of the range |

### Known gaps, logged in the tracker

- warning-inline #A96B00 measures 4.02 on the page at its built 12px size,
  below the 4.5 bar. Until the token is revisited, keep inline warnings
  short and prefer warning-text #8A5A00 (5.4) where strict AA applies.
- ink-60 measures 4.47 on the page, just under the 4.5 bar; it passes on
  white cards (4.6). Prefer ink-80 for essential small text that sits
  directly on the page.

## Machine-readable block

The JSON below mirrors this page one to one, for AI agents and tooling.
When the page changes, this block changes in the same commit.

```json
{
  "version": "2026-07-07",
  "canonical": "brand/guidelines/color.md",
  "contrastBars": { "normalText": 4.5, "largeTextAndUi": 3.0 },
  "tokens": [
    { "id": "ink", "hex": "#001E2B", "role": "text and borders everywhere, never #000000" },
    { "id": "page", "hex": "#F5F5F3", "role": "page background, never #FFFFFF as a page" },
    { "id": "card", "hex": "#FFFFFF", "role": "card surface, the one allowed pure white" },
    { "id": "accent", "hex": "#FCC224", "role": "brand primary CTA surface", "maxCoverage": "about 10 percent of any surface" },
    { "id": "accent-hover", "hex": "#FFD84D", "role": "accent hover state" },
    { "id": "cream-tint", "hex": "#F8F5EE", "role": "pill chips, soft callouts" },
    { "id": "light-gray", "hex": "#EDECEA", "role": "nav pill background, secondary surface" },
    { "id": "faint-gray", "hex": "#F7F7F7", "role": "inputs, inactive pill states", "modes": ["brand"] },
    { "id": "ink-on-dark", "hex": "#F0F0EB", "role": "text on dark surfaces, never pure white for content" },
    { "id": "hero-dark", "hex": "#0A0F14", "role": "cinematic dark hero", "modes": ["brand"] },
    { "id": "success", "hex": "#0F5E2A", "role": "success text and tint base at 22 percent" },
    { "id": "danger", "hex": "#A32D2D", "role": "danger text and button background, 10 percent hover tint" },
    { "id": "warning-text", "hex": "#8A5A00", "role": "warning text on a yellow tint or the page" },
    { "id": "warning-inline", "hex": "#A96B00", "role": "inline warning text", "knownGap": "4.02 on page at built 12px, below the 4.5 bar" }
  ],
  "inkTextRamp": [
    { "id": "ink-100", "opacity": 1.0, "contrastOnPage": 15.8, "contrastOnCard": 17.2, "use": "headlines, focused input text, any text" },
    { "id": "ink-80", "opacity": 0.8, "contrastOnPage": 8.7, "contrastOnCard": 9.2, "use": "body, emphasis, list items, any text" },
    { "id": "ink-60", "opacity": 0.6, "contrastOnPage": 4.47, "contrastOnCard": 4.6, "use": "secondary body and labels", "knownGap": "a hair under the 4.5 bar on the page, prefer ink-80 there" },
    { "id": "ink-30", "opacity": 0.3, "contrastOnPage": 1.9, "contrastOnCard": 1.9, "use": "placeholders, icon strokes, disabled states, never text" }
  ],
  "borderRamp": [
    { "id": "border-8", "alpha": 0.08, "use": "faint hairlines, in-card dividers" },
    { "id": "border-10", "alpha": 0.10, "use": "default card border" },
    { "id": "border-12", "alpha": 0.12, "use": "default input border" },
    { "id": "border-15", "alpha": 0.15, "use": "outlined buttons" },
    { "id": "border-25", "alpha": 0.25, "use": "hover state on cards and inputs" }
  ],
  "accentAlphas": [
    { "id": "accent-tint-22", "alpha": 0.22, "use": "soft tinted background, composites to about #F7EAC5 over the page" },
    { "id": "accent-border-60", "alpha": 0.60, "use": "strong border on an empty or attention field" },
    { "id": "accent-ring-25", "alpha": 0.25, "use": "ring partner to that border" }
  ],
  "decorative": {
    "hexes": ["#03677E", "#024E60", "#0E3E4A", "#114C5A", "#1A8578", "#2FB8A8", "#C2E8FF", "#D9E8E2", "#F0A639"],
    "logoDot": { "hex": "#FF9932", "rule": "belongs to the ucm. wordmark and nothing else" },
    "rule": "decorative only, never the CTA, never a primary, never as text, never under text"
  },
  "logo": {
    "wordmark": "ucm.",
    "typeface": "Nunito ExtraBold, weight 800",
    "rules": [
      "always Nunito ExtraBold, never another face or weight",
      "always lowercase, never retyped, placed from the asset files in brand/assets/logos/",
      "the dot is always #FF9932 and that color belongs to the wordmark and nothing else",
      "never recolor, drop, or resize the dot independently",
      "the wordmark sits on light neutrals, dark surfaces, or its white container on the accent, never on decorative mid-tones"
    ],
    "onLight": { "letterforms": "ink", "dot": "#FF9932", "dotContrast": 2.0, "note": "logos are exempt from the 3.0 non-text bar; the dot never appears without the ink letterforms" },
    "onDark": { "letterforms": "ink-on-dark", "dot": "#FF9932", "dotContrastOnInk": 8.1, "dotContrastOnHeroDark": 9.0 },
    "onAccent": { "treatment": "white container", "container": "card", "containerShape": "pill, maximum border radius, compact around the mark", "letterforms": "ink", "dot": "#FF9932", "note": "never directly on yellow; #FF9932 on #FCC224 measures 1.3 and disappears" },
    "specimen": "the reference page shows a Nunito ExtraBold stand-in; production always places the asset files"
  },
  "sanctionedPairings": [
    { "fg": "ink", "bg": "page", "contrast": 15.8, "verdict": "pass any size" },
    { "fg": "ink", "bg": "card", "contrast": 17.2, "verdict": "pass any size" },
    { "fg": "ink", "bg": "cream-tint", "contrast": 15.8, "verdict": "pass any size" },
    { "fg": "ink", "bg": "light-gray", "contrast": 14.6, "verdict": "pass any size" },
    { "fg": "ink", "bg": "faint-gray", "contrast": 16.1, "verdict": "pass any size" },
    { "fg": "ink", "bg": "accent", "contrast": 10.6, "verdict": "pass, the brand CTA pairing" },
    { "fg": "ink", "bg": "accent-hover", "contrast": 12.4, "verdict": "pass" },
    { "fg": "success", "bg": "page", "contrast": 7.3, "verdict": "pass" },
    { "fg": "success", "bg": "card", "contrast": 7.9, "verdict": "pass" },
    { "fg": "danger", "bg": "page", "contrast": 6.5, "verdict": "pass" },
    { "fg": "danger", "bg": "card", "contrast": 7.1, "verdict": "pass" },
    { "fg": "warning-text", "bg": "accent-tint-22", "contrast": 4.9, "verdict": "pass" },
    { "fg": "warning-text", "bg": "page", "contrast": 5.4, "verdict": "pass" },
    { "fg": "warning-inline", "bg": "page", "contrast": 4.02, "verdict": "below AA for small text, tracked" },
    { "fg": "warning-inline", "bg": "card", "contrast": 4.4, "verdict": "below AA for small text, tracked" },
    { "fg": "card", "bg": "ink", "contrast": 17.2, "verdict": "pass", "restriction": "button labels on solid navy actions only" },
    { "fg": "card", "bg": "danger", "contrast": 7.1, "verdict": "pass", "restriction": "danger buttons only" },
    { "fg": "ink-on-dark", "bg": "hero-dark", "contrast": 16.8, "verdict": "pass", "restriction": "brand hero, used sparingly" },
    { "fg": "ink-on-dark", "bg": "ink", "contrast": 15.1, "verdict": "pass", "restriction": "dark featured cards" }
  ],
  "bannedPairings": [
    { "fg": "accent", "bg": "any light surface", "contrast": 1.5, "reason": "yellow is never a text color on light" },
    { "fg": "any decorative mid-tone", "bg": "anything", "reason": "the decorative sub-palette never carries copy" },
    { "pattern": "color on color", "reason": "semantic colors sit on light neutral surfaces or carry white" },
    { "pattern": "light on light or mid on mid", "reason": "every text pairing is dark with light, never two mid-range tones" }
  ],
  "rules": [
    "never pure black or pure white as ink or surface, white only as a card surface or button label",
    "yellow stays scarce, never more than about 10 percent of any surface",
    "borders are ink with alpha, never gray and never black",
    "hero-dark with ink-on-dark is brand only, used sparingly",
    "gradient text is banned, the GlowButton radial is the only gradient and it is brand only",
    "warning always uses the accent family, never a new orange or red"
  ]
}
```

## Coming from the old palette

The pre-2026 brand guide listed 22 colors. The mapping from every old value
to its replacement lives in the Brand Hub page, section "Migrating from the
old palette" (guidelines/brand-hub.md).
