---
name: ucm-page
description: Build a page, screen, or UI feature with the UCM design system guardrails. Use whenever the user asks for new UI in this app, whether a page, view, section, form, or component.
---

# Build UI the UCM way

Follow every step in order. Do not skip the checks, even for small changes.

## 1. Mode first

Decide the mode before writing anything: brand (external marketing surfaces,
yellow CTAs, expressive) or product (internal app, navy, restrained, no
glow). If the request does not make the mode obvious, ask the user. One
surface never mixes modes.

## 2. Load the system

- Call `get_rules` and obey every rule it returns.
- Call `preflight`. If it fails, stop and run `/ucm-setup` first.

## 3. Source from the system, never from memory

- Whole page: call `get_pattern` (landing for brand, dashboard for product)
  and edit only the marked slots. Do not assemble a page from scratch.
- Individual pieces: `search_components`, then `get_component` for the
  import and usage example. Never hand-write a component the library
  already ships.
- Values: `get_tokens` for every color, font, radius, shadow, and motion
  value. Invent nothing.

## 4. Build

- Every visible string is bilingual `{ de, en }` through the locale helper,
  German default.
- No em dashes, no emoji, no eyebrows. Iconography is the `Icon` component;
  where no icon fits, use a plain word.
- Animate only transform, opacity, and clip-path, ease-out, and respect
  `prefers-reduced-motion`.

## 5. Verify before finishing

- Run `review_code` on every file you wrote or changed. Fix every error and
  rerun until it reports none.
- Confirm the page renders (dev server or a build).

## 6. Report

Tell the user what was built, in which mode, which library components were
used, and the final `review_code` result.
