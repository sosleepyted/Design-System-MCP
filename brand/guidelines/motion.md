# Motion

Motion clarifies, it never performs. Everything animates on the compositor,
eases out, and switches off for people who ask for reduced motion.

## The three hard rules

1. Animate only transform, opacity, and clip-path. Never animate layout
   properties: width, height, top, left, margin, padding, font-size.
2. Never use transition-all. Name the property you are transitioning.
3. All entrance and ambient motion is disabled under
   prefers-reduced-motion: reduce.

## Easing

Ease-out only. No bounce, no elastic, no overshoot.

| Curve | Use |
|---|---|
| cubic-bezier(0.22, 1, 0.36, 1) | The signature easing: mega nav, mobile slide, scatter |
| cubic-bezier(0.16, 1, 0.3, 1) | Reveal on scroll, logo letters |
| ease-out | Simple fades |

## Durations

| Tier | Duration | Use |
|---|---|---|
| Micro | 180 to 220ms | Hover, opacity shifts |
| Standard | 300ms | Hover states, accordions |
| Medium | 400ms | Panel slides |
| Brand long | 500 to 900ms | Image transitions, logo reveal, brand only |

## Hover and pressed idioms

Hover affordances stay subtle: a border-color shift plus a minor background
tint (navy at 3 percent), nothing larger than a 1 to 2px transform. The lift
idiom is a minus 1px translate; cards may scale to 1.02. Pressed elements
scale to 0.97.

## The built keyframes

The library ships these in its motion stylesheet; all of them are off under
reduced motion:

| Keyframe | Use |
|---|---|
| rise | Product micro entrance: opacity plus a 6px rise, 220ms ease-out |
| slide-down | Menu and panel entrance, 200ms ease-out |
| brand-rise | Brand entrance: 12px rise, 0.9s reveal easing |
| marquee | Brand logo parade |
| pulseDot | Brand accent dot |

All current motion is CSS keyframes and Tailwind transitions; heavier motion
libraries stay out of the component library and, when ever used, live on
docs or brand surfaces behind a dynamic import.
