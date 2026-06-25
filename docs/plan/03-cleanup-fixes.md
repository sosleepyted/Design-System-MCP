# Step 3: Clear the known rule violations (Section 12 quick wins)

Assumes the standing context. These are pre-existing, independent, and fast. Do them before expanding components so the docs app is clean.

1. **Eyebrows (rule 1.2).** Convert these uppercase letter-spaced labels to sentence case, or remove them: the docs sidebar group labels in `BrandDocsLayout.astro` ("Foundations", "Components"), the `Demo` caption, and the `DoDont` Do and Don't captions. Keep the `UCM` wordmark (acronym, not an eyebrow). After this, grep for `uppercase tracking-[` in `apps/docs` and confirm only intentional data or acronym uses remain.
2. **Widow helper (rule 1.3).** Add the `preventWidow(text, count)` helper from the built-state doc, resolve `count` from a breakpoint (3 mobile, 5 desktop, via matchMedia or a small hook), and apply it to the page `h1` and key lead paragraphs in `BrandDocsLayout.astro`. Fall back to fewer bound words rather than overflow a narrow column.
3. **`<html lang>` (rule 1.5).** Drive the `lang` attribute from the active locale instead of the hardcoded `en`, and update it when `LocaleToggle` switches locale (default `de`). The current value is wrong on first paint and never updates, which also misreports the language to screen readers.

**Stop and verify:** show me the diffs. Confirm the em dash grep is still zero, no decorative uppercase remains, `lang` follows the toggle, and headings no longer drop a short last line at mobile and desktop widths.
