# Voice and copy

Copy has mechanical rules and a voice per mode. The mechanical rules are
enforced by tooling and greppable to zero; the voice rules are judgment
guided by the mode.

## The four mechanical rules

1. No em dashes, anywhere. Replace each with a comma by default; when a
   comma reads poorly, use a colon, a semicolon, parentheses, or two
   sentences. Numeric ranges use "to" or a hyphen (300 to 900, 4-13); in
   German prefer "bis". A reviewer can grep for the character and find zero
   results.
2. No eyebrows. An eyebrow is the small uppercase letter-spaced kicker above
   a heading. Lead with the heading, fold the context into it, or use a
   sentence-case label inline. Uppercase is reserved for true acronyms (UCM)
   and for data.
3. No widows. The last line of any paragraph or heading carries at least 3
   words on mobile and at least 5 on desktop. Rewrite the sentence first;
   bind the final words with non-breaking spaces as the fallback.
4. No emoji. All iconography is the Material Symbols Icon component; where
   no icon fits, use a plain word ("Do", "Don't", "Yes").

## Bilingual by default

Every user-visible string is a pair, { de, en }, rendered through the locale
layer. The default locale is German. Both languages are authored at once; a
string is not done until both exist. In product code, strings live in a COPY
constant at the top of the file. For German register and phrasing, use the
ucm-german-ux-copy skill; do not improvise formal or informal address.

## Two voices

- Brand voice: motivational is allowed ("Sei stolz auf deinen Nebenjob",
  "Semesterferien? Vollgas."). It still obeys every mechanical rule.
- Product voice: informational, never opinionated. "3 days remaining", never
  "Hurry, only 3 days left!". Help text states what is true, not what is
  forbidden ("Minimum 50 percent; lower inputs are raised automatically").

## Small print

- No restated headings; no intro sentence that repeats the title.
- Lists and categories from data render in sentence case as a display-only
  transform; the stored value is never mutated.
- Button labels start with a verb, stay short, and leave room for about two
  times growth in translation.

## The name and the logo

In running text the company is UCM, uppercase, an acronym. The lowercase
"ucm." with the accent dot in #FF9932 is the logo and appears only as the
delivered wordmark asset, never as typed text. Domain-style names
(ucm.jobs, ucm.agency) stay lowercase.
