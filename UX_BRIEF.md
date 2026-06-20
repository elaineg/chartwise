# chartwise — UX Brief

## 1. Problem statement
You know your star sign — this shows you your whole birth chart in plain English, free and with no login.

## 2. Primary user action
Enter birth date, time, and place to get an explained chart. The landing view shows ONE birth-info form, focused on the date field. A prominent "Load example (Einstein)" button sits beside it so a cold visitor sees a fully-explained chart in one click — show, don't tell. The Einstein chart (table + element bar + a sample reading already expanded) IS the demo; the visitor reads a real explanation before typing anything.

## 3. Emotional tone
Calm, clear, and confident — the opposite of a dense professional wheel. Reads like a
knowledgeable friend explaining, not a star-chart printout.

**Visual language (source of truth): SSENSE house design system.** The look is austere
editorial minimalism — see `lib/design-system/ssense.md` (rules) + `lib/design-system/ssense.css`
(tokens/`.ds-*` classes), mapped surface-by-surface in **`DESIGN_REDESIGN.md`** in this app
dir (the authority for all styling). Monochrome only: paper white background, near-black ink
text, a grey ramp — **no indigo/violet/amber/element colors, no gradients, no shadows, no
rounded corners**. Structure is drawn with 1px hairline rules, not filled cards. Type is one
neutral grotesque (Helvetica Neue → free Archivo fallback): sentence-case editorial copy for
readings, tiny UPPERCASE 11px letter-spaced micro-labels for every structural label (section
eyebrows, table heads, form labels, buttons, "saved charts"). Hierarchy comes from size/
weight/case/space and inversion (ink↔paper on active/hover), never color. Generous, calm
whitespace. This is a pure visual reskin: the information hierarchy, flows, and 5-second rule
below are UNCHANGED — only the visual language updates.

## 4. Design decisions
- **Houses-as-rows, reflow to cards on mobile.** Desktop: 12 numbered house rows × Sign / Planets / Nodes columns, scannable top-to-bottom. At ≤640px DO NOT shrink the table or force horizontal scroll — each house becomes a stacked card ("House 10 — Career & public life" header, then its placements as tappable chips). This is the hero surface and the win over astro-seek.
- **Every placement chip is tappable to reveal its reading (no hover-only).** Each planet-in-house / sign-in-house chip carries a visible affordance (chip styled as a button + a small "ⓘ"/chevron); tap/click expands a 1–2 sentence plain-English reading inline beneath it. Discoverable on touch; the Einstein example ships with one reading pre-expanded so the interaction is taught by example.
- **Mode-aware privacy copy.** Computing/saving says "Your chart is computed on your device — nothing is sent anywhere." The Share action explicitly states "Creating a share link sends this chart's birth info to our server so the link works." Never a blanket "nothing leaves your device" claim once share exists.

## 5. 5-second check (above the fold)
- **Headline:** "Your birth chart, explained in plain English."
- **Subtitle:** "Free, no signup — type your birth date, time, and place, or load an example."
- **Primary action:** the birth-info form (date pre-focused) + a clear "Load example (Einstein)" button.
- **Pre-filled example:** clicking Einstein renders the houses table with House 10 → Sun (Pisces) and one reading already open — proof the explanation is real.

## Supporting details
- **Input:** fielded date/time + place type-ahead (all-the-cities, lazy-loaded on first keystroke; pick-from-suggestions disambiguates collisions). "Time unknown" checkbox degrades gracefully — compute Sun/planets/signs, gray out houses + Ascendant with a one-line note "houses and rising need a birth time." "Enter coordinates manually" escape hatch (lat/long + optional UTC offset, marked Advanced) for missing places.
- **Element bar:** compact horizontal Fire/Earth/Air/Water tally with counts + colored segments, directly under the table — obvious at a glance, never blank.
- **Current sky / transit:** a clearly separated "Today" card below the chart — today's planet signs, retrograde flags, and ≥1 concise note keyed to this profile. Visually distinct (dated header) from the static natal chart.
- **Saved charts (recurrence hook):** a persistent, visible people list (localStorage) — partner/friend/coworker. Add-person and switch-person are one obvious tap from the chart view; current profile clearly marked. Delete is secondary-weighted (small, muted, confirm).
- **Share:** optional "Share this chart" → secret URL with the mode-aware copy above; "Copy link" confirms inline.

---
## SYNASTRY / COMPATIBILITY (core flow 3 — added feature)

**5-second rule.** A stranger landing on the compatibility view understands "this compares two people's charts in plain English" within 5 seconds: a left-aligned title "Compatibility, explained" + sub-label "How two charts get along — in plain English, free, no signup," and the two named people (A and B) shown side by side at the top with their big three already filled in (Einstein vs the example partner if nothing is saved). They see a real harmony/tension reading before doing anything.

**Entry / discoverability (added-feature-buried — DO NOT bury).** A first-class "Compare two people →" action lives in the chart view ABOVE the transit card and reachable without scrolling past the natal table — a labeled primary control (not a footnote, not behind a menu), with the value sub-label below it. The two-person picker is unmistakable: two explicit, labeled selectors, "PERSON A" and "PERSON B," each a dropdown/tag-row of saved charts, BOTH visible at once, view recomputes on either change. With <2 saved charts, show a single bold "Load example pair" button (Einstein + fixed partner) so the payoff is one click on a cold first visit — show, don't tell. This is the new feature's hero; surface it in build #1.

**Layout (explanation-first, payload not behind clicks).** Top→bottom, single column, full-width: (1) COMPATIBILITY SUMMARY — the two-person picker, then the two big-three columns side by side, then the element-balance comparison, then a 1-2 sentence honest harmony-vs-tension framing (NO numeric score). (2) KEY ASPECTS — the inter-aspect rows, each reading inline. (3) HOUSE OVERLAY — A's planets in B's houses and vice-versa, each reading inline. Lead with the summary; never collapse the aspect/overlay payload behind an expand.

**Visibility / clip (8th added-feature-buried recurrence + inline-style-overrides-responsive-class).** Every newly-added value — each aspect reading, each overlay row, both big-three columns — is visible WITHOUT a click (no expand-to-reveal gate) and un-clipped/un-truncated at BOTH desktop AND 375px. Labels and readings WRAP, never truncate to an ellipsis. Any responsive show/hide (e.g. a side-by-side two-column big-three on desktop that stacks at ≤640px) MUST be a CLASS (`sm:hidden` / `sm:grid-cols-2` etc.), NEVER an inline `style={{display:...}}` — inline display beats media queries and resurrects the wrong layout at the wrong width (this exact bug bit the last chartwise run). After build, assert at desktop width that no stacked/duplicate layout shows, and at 375px that nothing is clipped.

**Glanceability in monochrome (color-to-mono).** Harmony vs tension must read at a glance WITHOUT color (color is banned): each aspect row carries an explicit text tag — `HARMONY` or `TENSION` as a `.ds-label` micro-label (plus the aspect word: trine/sextile = harmony, square/opposition = tension, conjunction = blended) — and rows are GROUPED (harmonies together, tensions together) or ordered so the balance is visible without reading every line; optionally a 2-line count summary ("4 harmony · 3 tension"). The two-chart element-balance comparison reuses the existing ElementBar convention exactly: dominant-first ORDER + grey-VALUE ramp + bar LENGTH = proportion — NOT identical mono fills, and NOT a reverted colored bar. Show the two people's element bars adjacently (A above B, or two labeled columns) so the contrast in their balances is glanceable by bar length/order.

**SSENSE conformance.** Every new control and surface uses the house system: uppercase 11px tracked `.ds-label`/`.ds-eyebrow` micro-labels (section eyebrows "COMPATIBILITY SUMMARY" / "KEY ASPECTS" / "HOUSE OVERLAY", the "PERSON A"/"PERSON B" labels, the HARMONY/TENSION tags), 1px `--grey-200` hairline rules between rows (not filled cards), square corners, NO shadow/color/gradient, `.ds-panel`/`.ds-card`/`.ds-tag`/`.ds-btn` for containers and the picker, `.ds-btn` (ink-filled primary) for "Load example pair" and the "Compare two people →" entry. Person names render sentence-case (proper nouns), aspect/sign/degree data sentence-case in `--ink`; only the structural labels uppercase. Aspect glyphs (☌☍△□⚹), if used, render in `--ink`/`--grey-600`, never colored, and never as the SOLE harmony/tension signal (the text tag carries it).

---
## BIG-3 ESTIMATE (core flow 4 — added feature)

**Toggle pattern (discoverable, not dominating — DO NOT bury).** A **two-segment toggle** sits at the very TOP of the left input panel, ABOVE the "Load example (Einstein)" button: two equal segments, `PRECISE` (active by default) and `BIG 3`, rendered as uppercase 11px tracked `.ds-label` micro-labels inside a single hairline-bordered control. Active segment = ink fill / paper text (the existing ink↔paper inversion convention); inactive = paper / ink. Square corners, 1px `--grey-200` divider between segments, no color. Chosen over a text link because a labeled segmented control reads as a real mode switch at a glance (the prior friction: an undiscoverable entry mode forced panel rounds purely to surface it) — yet keeping `PRECISE` pre-selected and visually active keeps the full birth-form the obvious default. Switching segments swaps ONLY the form body below (Load-Einstein button, OR-divider, and `BirthForm` are kept byte-identical and shown in PRECISE mode; the privacy note stays in both). Switching modes does NOT clear the rendered chart on the right.

**Big-3 form layout.** Under the toggle, one calm explainer line in `--grey-600` body text: "Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest." Then, stacked top→bottom, four `.ds-field` rows reusing the existing field styling: three `<select>` dropdowns each labeled with a `.ds-label` micro-label — `SUN SIGN`, `MOON SIGN`, `RISING SIGN` — each a 12-option zodiac list (Aries…Pisces), placeholder "Select…", styled to match `.ds-input`; then a `BIRTH YEAR` numeric input (4-digit, e.g. placeholder "1990", same range bound as the precise date field). Submit is a full-width ink-or-secondary button labeled "Estimate chart" (mirror `ds-btn ds-btn--secondary ds-btn--block`, matching the precise "Compute chart"). Inline validation in the existing `.ds-error-text` style: if any of the four is empty, "Pick all three signs and a birth year to estimate."

**Result labeling (ESTIMATE banner — placement is load-bearing).** When the chart was produced by the Big-3 solver, a hairline-bordered **note strip sits directly ABOVE the existing `ChartView`** (between the people switcher and the houses table), spanning the chart column full-width. NOT a colored alert: paper background, 1px `--grey-200` border, square corners. It carries an uppercase `.ds-label` eyebrow `ESTIMATED CHART` followed by one `--grey-600` body line: "Date, time, and place were inferred from your big three — this is an approximation. Enter your full birth date, time, and place for the precise chart." The precise-flow chart shows NO strip. (The solver/inference mechanics live in APP_SPEC — this brief owns only the strip's copy, placement, and restraint.)

**5-second rule + mobile.** The hero headline/subtitle and the `PRECISE`-default left panel are unchanged, so a cold visitor still instantly reads "natal-chart tool"; the `BIG 3` segment is a quiet second option, never the dominant call. At 375px the whole left panel is full-width above the chart as today; the segmented toggle stays a single full-width 2-up control, and the three sign dropdowns + year input + button STACK vertically (one `.ds-field` per row) — no side-by-side, no clipped `<select>`, native dropdowns so the OS picker handles long option lists.

---
LAYOUT SUMMARY
- Landing = one birth-info form (date pre-focused) + bold "Load example (Einstein)"; headline "Your birth chart, explained in plain English," subtitle names free/no-signup.
- Chart view top→bottom: profile switcher (saved people) → houses-as-rows table → element bar → "Today" transit card → Share.
- Houses table: rows on desktop; reflows to one stacked card per house at ≤640px (no tiny scroll-table).
- Each placement chip = a tap-to-expand button (visible ⓘ/chevron) showing a 1–2 sentence reading; one pre-expanded in the Einstein demo.
- Privacy copy is mode-aware: "computed on your device" for compute; Share states birth info is sent to make the link.
- Time-unknown degrades gracefully (signs yes, houses/Asc grayed with a note); manual-coords escape hatch.
- Saved-people list always visible; add/switch easy, delete muted+confirmed.
- Compatibility (synastry): a first-class "Compare two people →" entry ABOVE the transit card (not buried); the view shows an unmistakable PERSON A / PERSON B picker, then summary (both big-threes side by side + two-chart element balance + honest harmony/tension framing, no score), then KEY ASPECTS rows (reading inline), then HOUSE OVERLAY rows (reading inline) — every value visible without a click, un-clipped at desktop AND 375px (labels WRAP), harmony/tension shown by TEXT tag not color, element balance by order+grey-ramp+length. "Load example pair" (Einstein + fixed partner) seeds it in one click for cold visitors.
- MOST IMPORTANT 5-second call: a one-click "Load example (Einstein)" that instantly renders a real EXPLAINED chart (table + open reading) — the cold visitor sees the explanation-first payoff before typing, which is the entire wedge over astro-seek.
