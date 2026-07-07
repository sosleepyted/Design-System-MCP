# Brand-first repo refocus, implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the canonical brand/ tree per docs/superpowers/specs/2026-07-06-brand-home-design.md and reposition the repo docs brand-first, with the MCP service parked editorially.

**Architecture:** Pure docs restructuring on branch docs/brand-home (already synced to main). Four history-preserving moves, eight new guideline pages distilled from the two specs, an assets scaffold without logo files, then repositioning edits to README, CLAUDE.md, HANDOFF.md, and the brandbook workflow docs. No changes under packages/ or infra/.

**Tech Stack:** Markdown, one hand-authored SVG, pnpm lint:rules as the gate.

Global rules for every file this plan touches: no em dashes, no emoji, no
eyebrows, every hex, px, and font value copied from DESIGN-SYSTEM.md (DS) or
UCM-DESIGN SYSTEM.md (UCM), Confluence-paste-friendly Markdown (plain
headings, bullets, simple tables, no raw HTML). Verification greps repeat
after every task: `grep -rn "—\|–" brand/` expects zero hits.

---

### Task 1: Move the four existing pages

**Files:**
- Move: `docs/brandbook/updated/01-brand-hub.md` to `brand/guidelines/brand-hub.md`
- Move: `docs/brandbook/updated/02-03-b2b-presentations.md` to `brand/guidelines/b2b-presentations.md`
- Move: `docs/brandbook/updated/04-vibecoding-with-claude.md` to `brand/guidelines/vibecoding.md`
- Move: `docs/brandbook/updated/05-vibecoding-environment.md` to `brand/guidelines/vibecoding-environment.md`
- Delete: `docs/brandbook/updated/.gitkeep` (folder dissolves)

- [ ] **Step 1: git mv all four, pure move, no content edits**

```bash
mkdir -p brand/guidelines
git mv "docs/brandbook/updated/01-brand-hub.md" brand/guidelines/brand-hub.md
git mv "docs/brandbook/updated/02-03-b2b-presentations.md" brand/guidelines/b2b-presentations.md
git mv "docs/brandbook/updated/04-vibecoding-with-claude.md" brand/guidelines/vibecoding.md
git mv "docs/brandbook/updated/05-vibecoding-environment.md" brand/guidelines/vibecoding-environment.md
git rm docs/brandbook/updated/.gitkeep
```

- [ ] **Step 2: verify rename detection**

Run: `git status` and expect four `renamed:` lines. Run `git log --follow --oneline brand/guidelines/brand-hub.md | head -3` after commit and expect pre-move history.

- [ ] **Step 3: Commit**

```bash
git commit -m "docs(brand): move the four brand book pages to brand/guidelines"
```

### Task 2: New guideline pages, foundation set (modes, color, typography, motion)

**Files:**
- Create: `brand/guidelines/modes.md` (sources: UCM S2.1, S2.2, S3.1; DS S8)
- Create: `brand/guidelines/color.md` (sources: DS S2.1; UCM S1.6; migration table from brand-hub.md stays there, color.md links to it)
- Create: `brand/guidelines/typography.md` (sources: DS S2.2, S1.7; UCM S1.5, S2.3, S3.2)
- Create: `brand/guidelines/motion.md` (sources: DS S1.6; UCM S1.8)

- [ ] **Step 1: read the source sections in full before writing** (DS lines 171-303 for tokens, UCM S2 and S3 typography and mode sections)
- [ ] **Step 2: write the four pages.** Required content per page, all values verbatim from the sources:
  - modes.md: when brand applies (external ucm.jobs surfaces), when product applies (internal app), the expressive license list (glow, larger radii, dark hero) vs product restraint, the product-only bans (no nested cards, no gradient backgrounds except the GlowButton radial, no hero-metric template, no identical repeated card grids, modal last), never mixed on one surface.
  - color.md: triad values, ink opacity ramps, yellow under about 10 percent, pairings (cream #F5F5F3 with ink #001E2B; dark hero #0A0F14 with #F0F0EB), semantic colors (success #0F5E2A, danger #A32D2D, warning #8A5A00 and #A96B00), card #FFFFFF rule, cream tint #F8F5EE, sub-palette incl. logo dot #FF9932, black and white ban, embed assets/color-diagram.svg, link the migration table in brand-hub.md.
  - typography.md: Figtree variable 300 to 900 latin-ext, Light 300 headings with tracking-[-0.02em], weight ladder (400 body, 500 section, 600 subheading), the 1.25x adjacent-step rule, brand and product type scales from UCM S2.3 and S3.2, Nunito 800 wordmark only, wordmark spec text-[22px] font-extrabold tracking-[-0.04em].
  - motion.md: transform, opacity, clip-path only; banned properties list; never transition-all; ease-out only with the three curves (signature cubic-bezier(0.22, 1, 0.36, 1), reveal cubic-bezier(0.16, 1, 0.3, 1), plain ease-out for fades); everything off under prefers-reduced-motion.
- [ ] **Step 3: verify** `grep -rn "—\|–" brand/guidelines/` returns zero; spot-check every hex against the sources.
- [ ] **Step 4: Commit** `git commit -m "docs(brand): foundation guidelines, modes, color, typography, motion"`

### Task 3: New guideline pages, application set (voice-and-copy, layout, components, dos-and-donts)

**Files:**
- Create: `brand/guidelines/voice-and-copy.md` (sources: DS S1.1 to 1.3, S1.5, S1.8; UCM S1.7, S1.9, S2.7, S3.7)
- Create: `brand/guidelines/layout.md` (sources: UCM S2.4, S2.8, S3.3 to 3.6, S3.8, S4)
- Create: `brand/guidelines/components.md` (sources: DS S3, S5, S6, S13; UCM S2.5, S2.6, S3.5, S3.9)
- Create: `brand/guidelines/dos-and-donts.md` (sources: DS S10; UCM S5; packages/rules/src/manifest.ts; docs/references.md)

- [ ] **Step 1: read DS S3, S5, S6, S10, S13, UCM S2.4 to 2.8, S3.3 to 3.9, S4, S5 and the rules manifest in full**
- [ ] **Step 2: write the four pages.** Required content:
  - voice-and-copy.md: the four mechanical rules with their tests (em dash zero-grep, eyebrow definition and replacements, widow minimums 3 mobile and 5 desktop, emoji zero-grep with Icon fallback), bilingual Label = { de, en } via t(), default de, both authored at once, brand voice vs product voice, UCM in prose vs "ucm." logo-only lowercase, German register via the ucm-german-ux-copy skill.
  - layout.md: product spacing scale, radius and shadow per mode (brand vs product values), forms patterns, state styles, responsive checkpoints 320, 375, 768, 1024, 1440, touch targets at least 36px, brand layout license (wide stages, overlap) vs product grid discipline.
  - components.md: the 16 components grouped brand, product, shared, foundation with one-line purpose each (inventory from DS S13), CTA doctrine (brand primary is yellow BrandButton, GlowButton radial is the one sanctioned gradient, product Button navy, glow never in product), cards and navigation rules, the two blessed templates (landing brand, dashboard product) as mandatory starting points for whole pages, icon doctrine (Material Symbols Outlined via Icon, currentColor, plain word fallback, no icon packages).
  - dos-and-donts.md: one row or bullet per rule ID from packages/rules/src/manifest.ts (modes, bilingual, emDash, emoji, eyebrow, widow, pureBlackWhite, triad, transitionAll, layoutAnimation, muiEmotion, hierarchy), each with rule ID, do, and don't, then the product-only bans, then external-library guardrails (motion and three.js on docs and brand surfaces only, dynamic import, never @ucm/ui; 21st.dev output reworked to UCM rules and passed through review_code).
- [ ] **Step 3: edit the two moved vibecoding pages per the spec:**
  - vibecoding.md gains a short "External libraries" note (motion and three.js on docs and brand surfaces only, dynamic import, never in @ucm/ui; 21st.dev output reworked to the UCM rules and passed through review_code before shipping).
  - vibecoding-environment.md gains a "Install the design skills" step pointing at the tooling and skills section of brand/README.md.
- [ ] **Step 4: verify greps as in Task 2, plus rule-ID completeness:** every ID in RULE_IDS appears in dos-and-donts.md.
- [ ] **Step 5: Commit** `git commit -m "docs(brand): application guidelines, voice, layout, components, dos and don'ts"`

### Task 4: Brand index and assets scaffold

**Files:**
- Create: `brand/README.md`
- Create: `brand/assets/logos/README.md`
- Create: `brand/assets/color-diagram.svg`

- [ ] **Step 1: write brand/README.md**: what this tree is (canonical brand book), reading order (the 12 guideline pages listed with one-liners), the Confluence-paste rules (moved here from docs/brandbook/README.md), the tooling and skills section (install instructions for taste-skill, karpathy-guidelines, ui-ux-pro-max, the 20 ecc design skills, the 21st.dev plugin, each with repo URL, per docs/references.md; guardrail: skills inform building, nothing ships into @ucm/ui), pointers to DESIGN-SYSTEM.md and UCM-DESIGN SYSTEM.md as the technical sources of truth.
- [ ] **Step 2: write brand/assets/logos/README.md**: the logo rule ("ucm." lowercase, dot #FF9932, Nunito Extra-Bold 800, never retype), the gate (no files in the repo until the user gives the explicit go, decision 2026-07-06), the Drive folder as the current file source.
- [ ] **Step 3: draw brand/assets/color-diagram.svg**: swatch grid with hex labels for triad, dark hero pair, semantic colors, card and cream tint, sub-palette and logo dot; Figtree font-family, ink #001E2B text on cream #F5F5F3 background, no banned characters.
- [ ] **Step 4: verify** the SVG parses (open with `python3 -c "import xml.dom.minidom,sys;xml.dom.minidom.parse('brand/assets/color-diagram.svg')"`), greps clean.
- [ ] **Step 5: Commit** `git commit -m "docs(brand): brand index, assets scaffold, color diagram"`

### Task 5: Workflow inversion (brandbook sync docs)

**Files:**
- Modify: `docs/brandbook/README.md` (rewrite the lifecycle for the inverted flow)
- Modify: `docs/brandbook/TRACKER.md` (add canonical-file mapping and refocus note)

- [ ] **Step 1: rewrite docs/brandbook/README.md**: canonical lives in brand/guidelines/; incoming/ stays the verbatim record of dropped Confluence pages; the lifecycle becomes dropped, reconciled into brand/, pasted back; updated/ is gone; copy rules now live in brand/README.md and are referenced, not repeated.
- [ ] **Step 2: add a "Refocus 2026-07-06" section to TRACKER.md** mapping page numbers to canonical files (01 brand-hub.md, 02-03 b2b-presentations.md, 04 vibecoding.md, 05 vibecoding-environment.md) and noting that new net-new guideline pages (modes, color, typography, motion, voice-and-copy, layout, components, dos-and-donts) are canonical-first and get tracker rows only when they go to Confluence.
- [ ] **Step 3: fix stale updated/ references** in TRACKER.md rows (point to the new paths).
- [ ] **Step 4: Commit** `git commit -m "docs(brandbook): invert the workflow, repo is canonical"`

### Task 6: Repositioning (README, CLAUDE.md, HANDOFF.md)

**Files:**
- Modify: `README.md` (rewrite, brand-first)
- Modify: `CLAUDE.md` (reframe "What we are building", keep all global rules)
- Modify: `HANDOFF.md` (pivot note at top, launch checklist marked parked)

- [ ] **Step 1: rewrite README.md**: lead "the home of the UCM brand: identity, rules, guidelines, assets, and the design system that enforces them"; sections in order: brand/ (start here), the rules (packages/rules, DESIGN-SYSTEM.md, UCM-DESIGN SYSTEM.md), the components (@ucm/ui, apps/docs), then one short "Design system service (parked)" section listing mcp-server, catalog, create-app, claude-plugin, infra with a pointer to HANDOFF.md; quick commands kept.
- [ ] **Step 2: edit CLAUDE.md**: "What we are building" reframed to the brand home with the MCP parked sentence; add brand/ to the source-of-truth reading list; global rules unchanged.
- [ ] **Step 3: edit HANDOFF.md**: insert a dated pivot section after the title (decision, spec path, what parked means); mark the launch verdict section as parked, not deleted.
- [ ] **Step 4: Commit** `git commit -m "docs: reposition the repo brand-first, MCP service parked"`

### Task 7: Verification and PR

- [ ] **Step 1: run the acceptance checks**

```bash
pnpm lint:rules                            # expect 0 errors, 0 warnings
grep -rn "—\|–" brand/ README.md CLAUDE.md HANDOFF.md docs/brandbook/README.md   # expect no output
git log --follow --oneline brand/guidelines/brand-hub.md | head -3               # expect pre-move history
git diff origin/main --stat -- packages infra                                    # expect empty
pnpm -r typecheck                          # unchanged, expect green
```

- [ ] **Step 2: check every internal link** in brand/README.md, brand/guidelines/*.md, README.md, docs/brandbook/README.md resolves to an existing file.
- [ ] **Step 3: push and open the implementation PR**

```bash
git push -u origin docs/brand-home
gh pr create --base main --title "docs: brand-first repo, canonical brand/ tree (MCP parked)" --body "<summary per session>"
```
