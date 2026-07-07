# Typography

One working family, one wordmark family, and a hierarchy built from contrast
rather than decoration.

## The families

| Role | Family | Weights | Notes |
|---|---|---|---|
| UI and body, the default | Figtree | 300 to 900, variable | Loaded with the latin-ext subset so it covers ä ö ü ß |
| Wordmark only | Nunito | 800 | The "ucm." logo and nothing else, never UI text |
| Decorative, brand only | Instrument Serif | 400 | Intentionally not loaded yet; add it only when a brand surface needs it |

Product mode uses two families maximum. Adding a typeface is a system
decision, not a page decision.

## Headings are light

Headings and display text are Figtree Light 300 with tight tracking
(minus 0.02em). Light headings are the brand voice on every surface, brand
and product alike. The working weights below them:

- Regular 400 for body text.
- Medium 500 for section headings.
- Semi-Bold 600 for subheadings.
- Extra-Bold 800 exists only inside the Nunito wordmark.

## Hierarchy through contrast

Adjacent type steps differ by at least 1.25 times in size or weight. Flat
scales like 14, 14.5, 15 never ship. If two levels look almost the same,
they are the same level; merge them or push them apart.

## The built type scale

| Role | Specification |
|---|---|
| Hero and display | 32px, Light 300, line height 1.08, tracking minus 0.02em |
| Sub-display | 26px, Light 300, line height 1.12, tracking minus 0.02em |
| Page title, responsive | clamp from 1.8rem to 2.6rem at 4vw, Light 300, line height 1.1 |
| Section heading | 20px, Medium 500, tracking minus 0.012em |
| Subheading | 15px, Semi-Bold 600 |
| Standard paragraph | 15px, line height 1.55, tracking minus 0.01em |
| Body in docs prose | 14px, line height 1.6, ink at 78 percent |
| Caption and meta | 13px or 12.5px |

Brand heroes may use text-wrap balance and a responsive clamp (1rem to
2.4rem at 2.5vw). The old brand scale also carried an uppercase
letter-spaced "eyebrow caps" style; that style is retired under the
no-eyebrow rule and never ships.

## The wordmark

The "ucm." logo is set in Nunito Extra-Bold 800 at 22px with tracking minus
0.04em, closed by the accent dot in #FF9932. It is used as a delivered asset,
never retyped. In running text the name is written UCM.

## Widow control

The last line of any paragraph or heading carries at least 3 words on mobile
and at least 5 words on desktop. The best fix is rewriting the sentence so
the natural last line is full; binding the final words with non-breaking
spaces is the fallback.
