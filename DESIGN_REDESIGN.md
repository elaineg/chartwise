# chartwise — SSENSE Redesign Brief

**Reference aesthetic:** SSENSE (ssense.com) — austere editorial minimalism. See
`lib/design-system/ssense.md` (rules) and `lib/design-system/ssense.css` (drop-in tokens +
`.ds-*` classes). This is a **PURE VISUAL RESKIN**: every chart value, the houses-as-rows
table, every reading, the element tally, transit logic, share flow, all `data-testid`s, and
all accuracy stay **byte-for-byte unchanged**. We change only color, type, borders, radius,
shadow, and spacing. The information hierarchy and the 5-second rule in `UX_BRIEF.md` are
preserved exactly.

## How to implement (builder)

1. Copy `lib/design-system/ssense.css` into `apps/chartwise/app/ssense.css` and
   `@import "./ssense.css";` at the top of `app/globals.css` (after the tailwind import).
   Delete the dark-mode `@media (prefers-color-scheme: dark)` block and the slate body
   defaults in `globals.css` — the page is now **paper white (`--paper #FFFFFF`), ink text
   (`--ink #101010`)**, font `--ds-font` (Helvetica Neue → Archivo). No `next/font` change
   required; the stack is system-first and free.
2. Work surface by surface below. Prefer the `.ds-*` classes; where a one-off is needed use
   the CSS vars (`var(--grey-200)`, `var(--sp-6)`, etc.), never raw hex or Tailwind slate/
   indigo/amber/orange/green/sky/blue/violet classes.

## Global find-and-replace (applies to ALL components)

**STRIP everywhere:**
- All `bg-slate-*`, `text-slate-*`, `border-slate-*` → ink/paper/grey ramp.
- All `indigo`, `violet`, `amber`, `orange`, `green`, `sky`, `blue`, `red-400` decorative
  color → monochrome. (The ONLY surviving color is `--red #B00020`, **text-only**, for form
  errors and the destructive delete confirm.)
- All `rounded-*` (`rounded-lg`, `-xl`, `-2xl`, `-full`, `-md`) → **square corners,
  `--radius: 0`**. No pills, no rounded chips, no rounded cards.
- All `shadow-*` / `shadow-xl` → **none**. Flat.
- `bg-gradient-to-b from-indigo-950 ...` (PlainEnglishReading) → no gradient; paper + hairline.
- `animate-pulse` loading text → plain `--grey-600` "Computing…" label, no pulse (or keep a
  single `200ms` opacity — no looping attention animation).
- Decorative glyphs `✦` (hero icon, empty-state, Einstein button, transit header) → **remove**
  the standalone decorative sparkles. KEEP functional astro glyphs that carry data
  (☉☽☿♀♂♃♄♅♆♇, ℞ retrograde, ▾ caret, ↑ rising) — render them in `--ink` or `--grey-600`,
  never colored.

**Type rules:** headlines lowercase/sentence case, regular weight (400–500, never 700).
Every structural micro-label (section eyebrows, table headers, form labels, "SAVED CHARTS",
column heads, button text) → `.ds-label` / `.ds-eyebrow`: UPPERCASE, 11px, weight 500,
`letter-spacing 0.12em`, `--grey-600`. Reading body copy stays sentence case, `--fs-body`
(14px), `line-height 1.55`, `--ink`.

**Focus:** remove all `focus:ring-*` colored glows. Focus = `border-color: var(--ink)` only
(already in `.ds-input`).

---

## Surface 1 — Hero / landing header (`page.tsx` top)

- **Page shell:** `main` → `bg-paper text-ink`. Drop `bg-slate-950 text-white`. Keep
  `max-w-7xl mx-auto`; set side padding to `--ds-page-x` (32px desktop / 16px mobile).
  Increase top breathing room to `--sp-24` (96px) above the headline — whitespace is the hero.
- **De-center the hero.** SSENSE is hard-left, not centered. Drop `text-center`; left-align
  the headline + subtitle in the left column over the form, or span the top with a left-aligned
  block. (If the panel prefers centered for the 5-sec scan, centering is acceptable, but
  left-aligned reads more authentically SSENSE — left-align is the default choice.)
- **Eyebrow (new, optional but on-brand):** a `.ds-eyebrow` micro-label above the headline:
  `NATAL CHART · PLAIN ENGLISH · NO SIGNUP`.
- **Headline:** "Your birth chart, explained in plain English." → `.ds-display` (40px,
  weight 400, `letter-spacing -0.02em`, line-height 1.05), `--ink`, **lowercase/sentence case
  as written** (do NOT uppercase the headline). Drop `font-bold`.
- **Subtitle:** `--fs-body` (14px) / `--grey-600`, sentence case. Keep the free/no-signup copy
  verbatim (5-sec rule).
- **Full-bleed hairline** (`1px solid --grey-200`) below the hero zone separating it from the
  form/chart grid.

## Surface 2 — Birth-input form (`BirthForm` + `PlaceSearch` + buttons, `page.tsx` aside)

- **Input panel wrapper** (`page.tsx` `div.p-5.bg-slate-800/50.rounded-2xl.border`): strip the
  filled card. Use `.ds-panel` (top+bottom `1px --grey-200` hairline, 32px vertical padding, no
  box, no radius, no shadow) OR a plain `.ds-card` (4-side `1px --grey-200`, square, no shadow,
  `--sp-8` padding) if a bordered container reads better beside the chart. Prefer `.ds-panel`.
- **"Load example (Einstein)" button:** keep `data-testid="load-einstein-btn"` and the
  one-click behavior (this IS the 5-sec wedge — stays prominent). Restyle to **primary
  `.ds-btn .ds-btn--block`**: ink fill, paper text, square, uppercase 11px tracked label
  `LOAD EXAMPLE (EINSTEIN)`, hover inverts to paper/ink. Remove the `✦` sparkle and the violet.
  This is the page's one filled ink button — it earns primary emphasis as the demo trigger.
- **"Or enter your own birth data:" divider:** the `border-t` + helper text → a `.ds-rule`
  hairline with a `.ds-label--secondary` "OR ENTER YOUR OWN".
- **Form fields (name / date / time / place / manual lat-lng):** wrap each in `.ds-field`;
  labels → the `.ds-field > label` treatment (uppercase 11px tracked `--grey-600`). All
  `<input>` (text/date/time) → `.ds-input` (1px `--grey-200`, square, 12px pad, focus → ink
  border, no glow). The required-field `*` → keep, color `--red` text-only.
- **"Time unknown" checkbox:** native checkbox, accent → ink (`accent-color: var(--ink)`);
  label `--fs-sm` `--grey-600`. The degraded-state note (`text-amber-400`) → `--grey-600`
  sentence-case helper text (NOT colored; it's informational, not an error).
- **Place "✓ selected" confirmation** (`text-green-400`): → `--ink` text, drop green, drop ✓ or
  render ✓ in ink. Format unchanged.
- **"City not found? / Back to city search" links:** → `.ds-btn--text` (ink, uppercase 11px
  tracked, hover underline) OR a sentence-case underlined `--grey-600` text link. Keep small.
- **Compute button:** keep `data-testid="compute-btn"`. → **secondary `.ds-btn--secondary
  .ds-btn--block`** (outline: transparent bg, ink border + text, hover fills ink/paper). Using
  secondary here vs. the primary-filled Einstein button gives a clean SSENSE two-tier hierarchy:
  filled = the demo, outline = your own. Label `COMPUTE CHART` / `COMPUTING…`.
- **Form error** (`text-red-400`): → `.ds-error-text` (`--red`, 11px uppercase tracked) OR
  `--red` sentence-case 13px. Text only, no fill, no icon. Keep `data-testid="form-error"`.
- **Privacy note:** `--grey-600`, `--fs-sm`. Copy verbatim (mode-aware copy is load-bearing).

### PlaceSearch autocomplete dropdown
- Input → `.ds-input` (same as above). "searching…" → `--grey-400` `--fs-micro`.
- Suggestions `<ul>`: drop `rounded-lg shadow-xl bg-slate-800`. → `background: --paper`,
  `border: 1px solid --grey-200`, **square, no shadow**. Each `<li>`: `--fs-sm`, `--ink`,
  `padding 12px`, separated by `1px --grey-200` hairline. **Active/highlighted option** (was
  `bg-indigo-700`) → **inverted: `background: --ink; color: --paper`** (the SSENSE "accent").
  Hover (was `bg-slate-700`) → `background: --grey-50`. Keep `data-testid="place-suggestions"`
  and keyboard nav.

## Surface 3 — Saved profiles (`PeopleList`)

- "Saved charts" heading → `.ds-eyebrow` (it already approximates this — make it exactly 11px,
  weight 500, `0.12em` tracking, `--grey-600`, uppercase). Add `--sp-2` bottom margin.
- **Person tabs:** drop `rounded-full`, all indigo/slate. → `.ds-tag` treatment: square,
  `1px --grey-200` border, transparent bg, uppercase-ish label. NOTE: person NAMES are
  proper nouns — render them **sentence case** at `--fs-sm` (not forced uppercase, names look
  wrong uppercased), but keep the tag chrome (square, hairline border, 6–10px padding).
  **Active person** (was `bg-indigo-700`) → **`.ds-tag--selected`: ink fill, paper text**
  (inversion = active). Inactive → ink text on paper, `--grey-200` border, hover → border `--ink`.
- **Delete "×":** keep muted + the `confirm()` dialog (UX_BRIEF: delete is secondary-weighted).
  `--grey-400`, hover → `--red` (the one allowed red, for destructive). Keep `data-testid`s.

## Surface 4 — THE HOUSES TABLE (`HousesTable` — centerpiece)

This is the hero surface and the win over astro-seek. Keep it **dense and legible**; SSENSE
tables are exactly this (hairline rows, no vertical borders, tiny uppercase heads).

### Desktop table
- Apply `.ds-table` to `<table>`. Keep `table-fixed` + the `<colgroup>` widths (18/20/38/24) —
  density and column structure are unchanged.
- **`<thead>` (House / Sign / Planets / Nodes):** → `.ds-table thead th`: uppercase 11px
  tracked weight-500 `--grey-600`, `border-bottom: 1px solid --ink` (the one heavier rule
  anchoring the head). Replaces the slate header.
- **Rows:** `border-b border-slate-800/60` → `1px solid --grey-200` horizontal hairline only
  (no vertical borders — `.ds-table` enforces this). Row hover `hover:bg-slate-800/20` →
  `background: --grey-50`. Keep `align-top` and `data-testid="house-row-N"`.
- **House-number cell:** number → `--ink` `--fs-sm` weight 500. Theme label
  ("Career & reputation") → `--grey-600` `--fs-micro` or `--fs-sm`. **ASC/MC tags** (were
  `text-indigo-400`): render as a `.ds-label--micro` in `--ink` weight 500 — `ASC: CANCER` /
  `MC: ARIES` (uppercase, tracked). No color, no fill; weight + tracking distinguishes them.
- **Empty "—" cells:** `--grey-400`, not slate.
- **Injected colSpan reading row** (`bg-slate-800/60 rounded-md border-slate-700/40`): →
  `background: --grey-50` (faint inset wash, the one place a fill is allowed for the open
  reading), **square**, `1px --grey-200` border or just top hairline, `--ink` body text,
  `--fs-body`, `line-height 1.55`, `--sp-3/--sp-4` padding. Keep `data-testid`s and the
  one-open-at-a-time logic.

### Mobile cards (≤640px — must NOT shrink to a scroll-table per UX_BRIEF)
- Per-house card (`bg-slate-800/40 rounded-xl border-slate-700/40`): → **square,
  `1px --grey-200` border (or `.ds-panel` stacked), no shadow, `--paper` bg**, `--sp-4`
  padding. Keep one card per house, the `data-testid="house-row-N"`, and the stacked layout.
- "House 10" header → `--ink` weight 500 (drop `text-lg font-bold` to `--fs-h3`); theme label
  `--grey-600`. ASC/MC badges (`bg-indigo-700/40` / `bg-violet-700/40`) → `.ds-label--micro`
  ink text, no fill, no color. "Sign" / "Placements" eyebrows → `.ds-label--secondary`.

### Ascendant / Midheaven summary (below table)
- The two pills (`bg-indigo-900/30` / `bg-violet-900/30`): → `.ds-tag` square, hairline,
  ink text. `ASCENDANT: 23°52' CANCER` style — micro-label key uppercase, the degree value
  in ink. Drop indigo/violet entirely; the two are distinguished by their **labels**, not color.

## Surface 5 — PlacementChip (the tap-to-expand cells, both `PlacementChip.tsx` + the inline `DesktopChip` in HousesTable)

These appear inside table cells AND mobile cards. They must go monochrome + square but stay
obviously **tappable** (UX_BRIEF: every chip is a visible button with a caret affordance).

- Chip button (`bg-indigo-900/40 border-indigo-700/40 hover:bg-indigo-800/50 text-indigo-200
  rounded-md`): → **square, `1px solid --grey-200` border, `--paper` (or transparent) bg,
  `--ink` text, `--fs-sm`**. Hover → `background: --grey-50` and/or `border-color: --ink`
  (the affordance). Keep `px-2 py-1`, `w-full text-left`, the `aria-expanded`/`aria-label`,
  and ALL `data-testid`s.
- **Caret `▾`** (was `text-indigo-400`): → `--grey-600`, keep the 150ms rotate-on-expand. This
  is the primary "tappable" signal — keep it visible on every chip.
- **Retrograde `℞`** (was `text-amber-400`): → `--ink` weight 500 (bold-ish via weight, not
  color), keep the `title="Retrograde"`. The glyph + tooltip carries the meaning, not color.
- Planet/sign/node labels (e.g. `Sun 23°52' Pisces`) stay sentence/proper case, `--ink`,
  `--fs-sm` — these are data, not micro-labels; do NOT uppercase them.
- Expanded reading panel (`bg-slate-800/60 rounded-md border-slate-700/40`): → `--grey-50`
  bg, square, `1px --grey-200` border or top hairline, `--ink` `--fs-body` `line-height 1.55`.

## Surface 6 — ElementBar (Fire / Earth / Air / Water) — **HARDEST CALL**

Currently four colored segments (orange/green/sky/blue) + colored count numbers. SSENSE bans
decorative + color-coded UI, so the element colors MUST go. **The distinction cannot rely on
color — it must come from explicit labels, position, and bar length.** Treatment:

- Wrapper: drop `bg-slate-800/40 rounded-xl`. Use `.ds-panel` (top+bottom hairline) or a
  plain `1px --grey-200` square card. Heading "Element Distribution" → `.ds-eyebrow`
  (uppercase 11px tracked `--grey-600`).
- **Replace the single stacked rainbow bar with a labeled 4-row count grid (monochrome).**
  Each element is one row: a left `.ds-label` (`FIRE` / `EARTH` / `AIR` / `WATER`, uppercase
  11px tracked `--ink`), the count as a large ink number (`--fs-h2`, tabular figures), and a
  **single horizontal hairline/ink proportion bar**:
  - Bar track: `background: --grey-100`, height `4–6px`, square (no radius).
  - Bar fill: `background: --ink`, width = `count/total %`. Length encodes the proportion;
    the always-visible label + number encode WHICH element. No color needed — every element
    is named in full beside its own bar, so a strict-monochrome reader still distinguishes all
    four (the original colored bar actually relied on a `title` tooltip to name segments;
    named rows are MORE legible, not less). Order Fire→Earth→Air→Water is fixed and labeled.
- **Count numbers** (were `text-orange/green/sky/blue-300`): → `--ink`, weight 500, tabular.
- **Basis label** ("Based on N placements: Sun, Moon…") → `--grey-600` `--fs-sm`. Keep
  verbatim with `data-testid="element-basis-label"` (it's a Success-check assertion).
- Keep `data-testid="element-bar"` and all four counts + total. Values unchanged.

> Why this is the right SSENSE-correct preservation: color was doing redundant work the labels
> already do. Moving to named rows + ink proportion bars keeps the at-a-glance four-way
> breakdown (UX_BRIEF "obvious at a glance, never blank") with zero decorative color.

## Surface 7 — PlainEnglishReading (the interpretation blocks)

- Wrapper (`rounded-2xl border-indigo-900/40 bg-gradient-to-b from-indigo-950/40 ...`): **strip
  the gradient and indigo entirely.** → `.ds-panel` (top+bottom `1px --grey-200` hairline, no
  box, no fill) or a plain `1px --grey-200` square card, `--paper` bg.
- Heading "Your chart, in plain English" → `.ds-eyebrow` (uppercase 11px tracked `--grey-600`).
- **Icon disc** (`rounded-full bg-indigo-900/50 border-indigo-700/40 text-indigo-200`): drop
  the colored filled circle. → either a **square `1px --grey-200` swatch** (24–32px) with the
  ☉☽↑☿♀♂ glyph in `--ink`, or just the glyph inline in `--ink` with no container. Square if a
  container is kept — no rounded discs.
- Reading title (e.g. "Pisces Sun · House 10") → `--ink` `--fs-h3`/weight 500, sentence case.
  Subtitle ("Core identity") → `.ds-label--secondary` (uppercase 11px tracked `--grey-600`) or
  `--grey-600` `--fs-sm`. Blurb body → `--ink`/`--grey-800` `--fs-body` `line-height 1.55`.
- Separate the readings with `--sp-4` whitespace (or thin `--grey-200` hairlines between),
  not filled cards.

## Surface 8 — TransitCard ("Today's Sky")

- Wrapper (`bg-slate-800/30 border-indigo-900/40 rounded-2xl`): → square, `1px --grey-200`
  border or `.ds-panel`, no shadow, `--paper` bg. Remove the `✦` sparkle in the header.
- Header "Today's Sky" → `--fs-h3`/`--fs-h2` `--ink` sentence case; date string → `--grey-600`
  `--fs-sm`. (This is the dated header that distinguishes the live transit block from the
  static natal chart — keep that contrast via the **date + heading**, now in mono.)
- **Planet grid tiles** (`rounded-lg`, retrograde tiles `bg-amber-900/20 border-amber-700/30`,
  normal `bg-slate-800/50`): → square `1px --grey-200` tiles, `--paper` bg, `--ink` glyph +
  label. **Retrograde tiles cannot use amber** → mark retrograde by the `℞` glyph (already
  present, render `--ink` weight 500) + the planet name; optionally a heavier
  `border-color: --ink` on retrograde tiles to distinguish by border weight, not color. Sign
  label (was `text-indigo-300`) → `--grey-600`.
- **Retrograde summary box** (`bg-amber-900/10 border-amber-700/20`): → `--grey-50` inset or
  hairline-bordered square block; "N planets retrograde" heading → `.ds-label` `--ink`; body
  `--grey-600`. No amber.
- "For your chart" eyebrow → `.ds-label--secondary`. Note bullets `▸` (was `text-indigo-400`)
  → `--ink` or `--grey-600`; note body `--ink`/`--grey-800` `--fs-body`. Keep all logic +
  `data-testid="transit-card"`.

## Surface 9 — Buttons / inputs / links (global, cross-component)

Single source of truth for all interactive chrome:
- **Primary action (ink-filled):** `.ds-btn` — reserved for the ONE hero CTA (Load Einstein)
  and "Copy link". Ink fill, paper text, square, uppercase 11px tracked, hover inverts.
- **Secondary (outline):** `.ds-btn--secondary` — Compute chart, Create share link. Ink
  border + text, transparent, hover fills ink.
- **Text link:** `.ds-btn--text` or underlined `--grey-600` — "City not found?", "Create your
  own chart →", "Back to city search".
- **Inputs/selects/textarea:** `.ds-input` / `.ds-select`. Square, `--grey-200` border, ink
  focus border, no ring.
- No button keeps `rounded-*`, gradient, or a color other than ink/paper (+ `--red` text for
  destructive/error only).

## Surface 10 — Shared-chart view (`chart/[token]/SharedChartClient.tsx`)

Same system as the main app; it renders the same `ChartView`, so most styling flows through
the surfaces above once they're converted.

- `main` (`bg-slate-950`) → `--paper`, ink text. Keep `max-w-4xl mx-auto`, set padding to
  `--ds-page-x`.
- **Loading / error states:** "Loading chart…" `animate-pulse text-indigo-300` → `--grey-600`
  no pulse. Error (`text-red-400`) → `--red` text-only, sentence case. "Create your own
  chart →" link (`text-indigo-400 underline`) → `.ds-btn--text` / underlined `--grey-600`.
- **Shared-chart header:** drop `text-center` (left-align, SSENSE) or keep centered if cleaner.
  "Shared chart" eyebrow (`text-slate-400`) → `.ds-eyebrow` `SHARED CHART` (uppercase 11px
  tracked `--grey-600`). Name `--fs-h1` `--ink` weight 400, sentence case. Place/date meta →
  `--grey-600` `--fs-sm`.
- **Profile summary block in `ChartView`** (`bg-slate-800/40 rounded-xl border-slate-700/40`):
  → square `1px --grey-200` card or `.ds-panel`, `--paper`. Name → `--fs-h2` `--ink`. Birth
  meta → `--grey-600` `--fs-sm`. **Big-three chips** (`bg-indigo-900/30`, `bg-amber-900/30`,
  `bg-slate-700/50`, all `rounded-full`): → `.ds-tag` square hairline chips, `--ink` text,
  sentence-case data labels (`☉ Sun 23°52' Pisces · House 10`), glyphs in ink. The
  rising/sun/moon distinction comes from the **labels** (Sun/Moon/rising), not color. Keep
  `data-testid="big-three-chips"`. "Rising unknown" strikethrough → keep `line-through`,
  `--grey-400`. The time-unknown amber notes → `--grey-600` informational text.
- **Share section** (`bg-slate-800/30 rounded-xl`): → square `1px --grey-200` card / `.ds-panel`.
  "Share this chart" → `--fs-h3` or `.ds-eyebrow`. Mode-aware privacy copy verbatim
  (`--grey-600`). The readonly share-URL `<input>` → `.ds-input` (square, `--grey-200`, ink
  text, `--grey-50` or paper bg). **"Copy link" / "Create share link"** → `.ds-btn`
  (primary ink) / `.ds-btn--secondary`. "Copied!" inline confirm → swap label to `COPIED`,
  `--ink` (no green). Keep `data-testid="copy-share-link"` / `share-btn` and the flow.

---

## Legibility guardrails (where strict monochrome must NOT lose meaning)

1. **Element Fire/Earth/Air/Water** — solved by named rows + ink proportion bars (Surface 6).
   Never reintroduce element colors; the full word beside each bar carries identity.
2. **Retrograde** — carried by the `℞` glyph + `title="Retrograde"` + (optional) heavier ink
   border on the tile, NOT amber. Weight/glyph, not hue.
3. **ASC / MC and Sun/Moon/Rising** — carried by their explicit text labels (`ASC:`, `MC:`,
   `☉ Sun`, `↑ Rising`) in uppercase micro-labels or ink glyphs, NOT indigo/violet/amber fills.
4. **Active/selected** (person tab, autocomplete option) — carried by **inversion** (ink fill /
   paper text), the SSENSE accent, NOT a colored highlight.
5. **Tappable chips** — carried by the persistent `▾` caret + `1px --grey-200` border +
   hover border-darken/`--grey-50` wash, NOT a colored fill. Keep the caret on every chip.
6. **Error / destructive only** — `--red #B00020`, text-only, no fills. Informational/degraded
   notes (time-unknown) are `--grey-600`, NOT red/amber — they aren't errors.

## What stays exactly the same
All `data-testid`s, all chart values, all readings/blurbs, the houses-as-rows structure and
column order, the mobile-card reflow at ≤640px, the one-open-reading-at-a-time logic, the
Einstein pre-expanded Sun reading, the element basis label text, the share flow + mode-aware
privacy copy, accuracy (nodes, Lilith, arcminutes), and every Success-check assertion in
`APP_SPEC.md`.
