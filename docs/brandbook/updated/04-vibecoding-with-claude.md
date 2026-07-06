# Vibecoding with the UCM Design System

This page explains how to build on-brand work with Claude: product and
project UIs (with or without a terminal) and B2B presentations. The design
system is enforced structurally. Claude gets the rules, the components, and
the templates through our design system service, and the tooling checks the
result, so the output is on-brand by default rather than by taste.

## What you need

- Access to the UCM design system MCP server: the server URL and your access
  token (ask the design system team; add the request link here).
- The asset folders:
  - Photo gallery:
    https://drive.google.com/drive/folders/12iQZW7Q7YHNGDWbahoJJYqBd2to2J6pW
  - Branding elements (logos):
    https://drive.google.com/drive/folders/1I6p89HNb2kteBE6LIKWr4fAlxixvjdFb
- For presentations: the B2B Presentation Guide (link the Confluence page
  here).

## Track A: Building product or project UI with Claude Code (developers)

The MCP server gives Claude direct access to the design system: rules,
tokens, components, page templates, and a code reviewer. Scaffolded apps
ship with two commands that run that loop for you.

1. Scaffold the app: `npx @ucm/create-app my-app --url [server URL]
   --token [your token]`. One command wires everything: the private
   package registry, `@ucm/ui`, the server connection, and the two
   commands below.
2. Open the folder in Claude Code and run `/ucm-setup`. It verifies the
   server connection and the library install, and repairs whatever is
   missing, for example placeholder values when the app was scaffolded
   without the flags.
3. Build with `/ucm-page` plus a plain description of what you need. The
   command enforces the whole loop in order: declare the mode (brand or
   product, never mixed), obey `get_rules`, start whole pages from a
   blessed `get_pattern` template, use `search_components` and
   `get_component` instead of hand-rolling, take every value from
   `get_tokens`, and finish only when `review_code` reports zero errors.
   The same rules gate CI, so skipping a fix just moves the failure.

Until the hosted server is live, run the whole environment locally from
the design system repo. The setup is its own page: Setting up the
vibecoding environment (link the Confluence page here). The commands work
the same.

To connect a repo that was not scaffolded by create-app:
`claude mcp add --transport http ucm [server URL] --header
"Authorization: Bearer [your token]"`.

Never break these, even when a prompt seems to want it: no `@mui/*` or
`@emotion/*` in UI code, every visible string in German and English, and
the mode you declared stays fixed for that surface.

## Track B: Vibecoding without a terminal (claude.ai)

This track is for prototypes, briefs, and idea work in claude.ai chat. Its
output is a mockup or a spec, not shipped code; a developer rebuilds the
result through Track A before it goes anywhere near production.

1. Start a claude.ai Project for UCM work and put the design rules in the
   project instructions (the starter block below is enough).
2. Describe the screen in plain words: who uses it, what they need to do,
   what data it shows, and whether it is brand or product.
3. Iterate until the mockup says what you mean, then hand the conversation
   link and the final mockup to a developer.

Starter block for the project instructions:

```
You are designing a screen for UCM. Mode: [brand = external marketing,
product = internal app].

Non-negotiable design rules:
- Colors: cream page #F5F5F3, navy ink #001E2B, yellow accent #FCC224,
  and the yellow never covers more than about 10 percent of the surface.
  Never pure black or pure white backgrounds.
- Type: Figtree everywhere; headings light (weight 300) with tight
  tracking.
- No emoji, no em dashes, no uppercase kicker labels above headings.
- Product mode: navy buttons, restrained, no glow effects. Brand mode:
  yellow call-to-action buttons.
- Every visible string in German and English.

Task: [describe the screen]
```

## Track C: Creating a presentation with Claude

Claude writes the deck as slide-by-slide text; you build the slides in
PowerPoint or Google Slides using the design rules and the asset folders
above. The B2B Presentation Guide is the contract; the prompt below encodes
it.

1. Copy the prompt template and fill in the brackets.
2. Paste it into Claude with everything you know about the client.
3. Review the output against the checklist, then build the slides.

Prompt template:

```
You are writing a B2B presentation for ucm.agency, a staffing agency for
events, airports, trade fairs, and luxury retail.

Deck size: [small one-pager / medium pitch deck / large project deck]
Client: [name, industry, what they do]
Their problem: [one or two sentences]
Language: [German for German-speaking clients, otherwise English]

Follow these rules without exception:
1. Structure: Problem, Solution, Benefit, Proof, Call to action, in that
   order. The company introduction belongs under Proof, never at the start.
2. One statement per slide. The slide line itself has six words maximum.
3. For each slide give three things: the slide line (six words maximum), a
   visual suggestion (a photo idea or a simple graphic), and speaker notes
   of two to three sentences.
4. Copy rules: no em dashes, no emoji, no buzzwords, no full sentences on
   slides. Focus on the client's benefit, not on self-praise.
5. Tone: professional and factual for large projects, friendly and
   inviting for small ones.

Output the deck as a numbered slide list.
```

Checklist before you build the slides:

- The deck opens with the client's problem, not with ucm.agency.
- No slide line longer than six words; font size at least 30 pt when built.
- Colors and type follow the design rules: cream or dark navy backgrounds,
  navy or off-cream text, yellow used sparingly, Figtree with light
  headings.
- Photos come from the gallery, logos from the branding elements folder.
- References named in the deck are current and approved.
- German deck for German-speaking clients.

## The non-negotiables, whatever the track

- Triad only: cream #F5F5F3, navy #001E2B, yellow #FCC224. Never pure black
  or pure white as ink or background.
- Figtree with light headings; Nunito only inside the logo.
- No emoji, no em dashes, no uppercase kickers.
- Brand and product modes never mix on one surface.
- Everything user-visible is bilingual, German first.
