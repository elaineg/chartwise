# chartwise — UX Brief (ADD-FEATURE delta, 2026-06-26)

This is a focused DELTA on the shipped app, covering four bundled fixes from Elaine's
2026-06-26 PRIORITY directive. The full app's hero, flows, 5-second rule, and SSENSE
visual language are UNCHANGED — see `DESIGN_REDESIGN.md` and `lib/design-system/ssense.md`
(the authority). Everything below stays monochrome (ink/paper/grey ramp), square corners,
1px hairline rules, no shadows/color/gradients, tiny uppercase `.ds-label` micro-labels.
Spacing tokens live in `app/ssense.css` (`--sp-1`=4, `--sp-2`=8, `--sp-3`=12, `--sp-4`=16,
`--sp-6`=24, `--sp-8`=32). NOTE: there is NO `--sp-5` token — any inline `var(--sp-5)`
resolves to 0 and is a latent bug (it is the cause of fix #2).

---
## FIX 1 — Big-3 form breathing room (`BigThreeForm.tsx`)

The BIG 3 tab feels cramped: explainer, three selects, the year input, and the button are
packed with no consistent rhythm. Open up the vertical spacing to match the calm SSENSE
density of the precise form.

- **One consistent group rhythm.** Each field group (label + control) is separated from the
  next by **`--sp-6` (24px)** of vertical space — reuse the `.ds-field` class, which already
  gives `margin-bottom: --sp-6` and `gap: --sp-2` (8px) between label and control, instead
  of bespoke inline spacing. Apply `.ds-field` consistently to all three selects AND the
  year input so every row has identical label→control and row→row spacing.
- **Explainer separation.** The intro explainer line sits **`--sp-6`** above the first field
  group (not the current `--sp-5`/tight gap).
- **Submit button.** The "Estimate chart" button gets **`--sp-2` (8px)** clear above it
  beyond the last field's `--sp-6` margin — it should read as the end of a calm stack, not
  crammed under the year input. Keep it `ds-btn ds-btn--secondary ds-btn--block`.
- **Inline error** keeps `.ds-error-text`, sitting `--sp-2` below the year field and `--sp-4`
  above the button (unchanged copy: "Pick all three signs and a birth year to estimate.").
- The result must read as MORE generous whitespace, consistent rhythm, nothing touching —
  no two rows with different gaps.

---
## FIX 2 — Consistent box padding across ALL result cards

In the estimated-chart result view, bordered boxes have INCONSISTENT internal padding. The
`.ds-card` boxes (profile summary, Share) are inset with `--sp-8`, the ESTIMATED-CHART badge
uses `--sp-3 --sp-4`, and the "COMPATIBILITY / Compare two people" box uses `padding:
var(--sp-5)` — `--sp-5` is undefined → **0**, so its text sits flush against the left/top
border. That is the odd-one-out the friction lesson warns about.

- **Audit EVERY bordered box/card on the chart page in one pass** (profile summary, the
  ESTIMATED CHART badge, the "Compare two people" entry, the element/transit cards if boxed,
  the Share card, and any shared-view wrapper) and normalize ALL of them to **one shared
  interior padding value on ALL FOUR SIDES**.
- **Shared value: `--sp-6` (24px) on all sides** for the bordered content boxes (the
  "Compare two people" entry, the ESTIMATED CHART badge). Keep `.ds-card`'s `--sp-8` where it
  already reads well, but the rule is binding: **no box may have a smaller or zero pad on any
  one side than the others** — symmetric on all four sides, nothing touching any edge.
  Whichever single value you pick, apply it to every peer so they match; do not leave one box
  inset and a sibling flush.
- Delete every `var(--sp-5)` occurrence — it is always a 0-pad bug.
- Verifiable: at desktop and 375px, no text in any bordered box touches its border; left,
  right, top, and bottom interior padding are visually equal within each box.

---
## FIX 3 — Save + NAME estimated (Big-3) charts (reuse the existing share pattern)

Today only precise charts feel "save-able with a name"; estimated charts default to the
generic name "Estimated chart" and offer no naming step. Extend save/share to estimated
charts AND let the user name them — REUSING the existing `chart-share` Turso secret-link
flow and the existing `BirthData.name` field. Do NOT add a second parallel identity/name
field; the one `name` already threaded through compute → save API → reload is the field.

- **Where the name lives.** Add an optional **`NAME THIS CHART`** text input (`.ds-field` +
  `.ds-input`, `.ds-label`) to the **BIG 3 form**, between the explainer and the SUN SIGN
  field. Placeholder: e.g. "Me" or "Sam". When filled, the estimate's `BirthData.name`
  becomes that value (instead of the generic "Estimated chart"); when blank, fall back to
  "Estimated chart" so nothing breaks.
- **Save/Share control on the estimated result.** The existing ChartView Share card ("Share
  this chart" → "Create share link" → copy) MUST render for estimated charts too (it is
  already gated only by `!isSharedView` — keep it shown). The user can also rename here if no
  name was set: if you surface a rename affordance, it writes the SAME `birthData.name`, not a
  new field. The saved-people list (localStorage) already keys on `name`, so a named estimate
  shows in the switcher by its name.
- **Persist the estimate identity end to end.** The Big-3 inputs + inferred anchor are
  already captured in the returned `BirthData` (year/month/day/hour/minute/lat/long +
  `isEstimate: true`). Confirm `isEstimate` survives the `chart-share` POST (the API's
  `sanitizeBirth` spreads `...raw`, so it does — keep it) and the reload (`computeChart`
  already threads `isEstimate` onto `ComputedChart`). The shared link must reload the SAME
  Big-3 result.
- **Clearly labeled "estimated" on reload.** A saved/shared estimated chart MUST show the
  existing ESTIMATED CHART badge (date/time/place inferred) on the shared `/chart/[token]`
  page, distinguishing it from a precise chart — driven by the persisted `isEstimate` flag,
  no new code path. The shared-view header should not imply it is a precise birth chart.
- 5-second-rule note: naming is optional and never blocks estimating — the "Estimate chart"
  button still works with the name blank; the name input is a quiet convenience, not a gate.

---
## FIX 4 — Remove the Einstein example from the UI entirely

The user-facing "Load example (Einstein)" affordance is removed from the live UI. Internal
test/regression anchors that reference Einstein in `*.test.ts` / `*.spec.ts` files may stay;
NOTHING Einstein-labeled may surface in the product.

- Remove the **"Load example (Einstein)" button** and its `loadEinstein` handler from
  `page.tsx`, and the now-orphaned `OR / Or enter your own` divider that only existed to
  separate that button from the birth form. The PRECISE mode then leads directly with the
  `BirthForm`.
- Remove every other user-visible Einstein reference: the empty-state copy "...or load the
  Einstein example" (replace with neutral copy, e.g. "Enter your birth data to see your
  explained chart"), and any Einstein mention in hero/subtitle/placeholder/help text.
- **Remove now-dead code, not just the import** (friction lesson: a half-removed feature is
  one where only the import is deleted). If `EINSTEIN_BIRTH` (and any helper/data that ONLY
  the UI example used) is no longer referenced by any runtime path, delete it from
  `lib/chartCompute.ts` exports too — UNLESS a test still imports it, in which case leave the
  export but ensure no UI surface renders it. The builder must grep for `Einstein` /
  `EINSTEIN_BIRTH` across `app/**` and confirm zero UI references remain.
- The Synastry "Load example pair" affordance is OUT OF SCOPE of this fix — do not touch the
  compatibility example unless it surfaces the word "Einstein" in a user-facing button label
  that this directive intends to remove. (If Elaine's intent is only the natal landing
  example, leave the synastry seed; see OPEN QUESTION.)

---
## 5-second check (landing, post-change)

- **Headline** (unchanged): "Your birth chart, explained in plain English."
- **Subtitle** (drop the "or load an example" clause): "Free, no signup — type your birth
  date, time, and place." Or, if PRECISE/BIG 3 are equally first-class now, name both modes.
- **Primary action:** PRECISE mode shows the birth-info form directly (date pre-focused), no
  Einstein button above it; BIG 3 is the quiet second tab.
- The cold-visitor "see the payoff before typing" guarantee previously rested on Einstein —
  with it removed, the empty state must still tell the user exactly what to do (neutral
  prompt) and the BIG 3 mode (sign dropdowns) is the lowest-effort first chart.

---
## SSENSE conformance (all four fixes)

Every changed surface stays austere editorial monochrome: uppercase 11px tracked `.ds-label`
micro-labels, 1px `--grey-200` hairline borders, square corners, no shadow/color/gradient,
existing `.ds-field`/`.ds-input`/`.ds-card`/`.ds-btn` classes. The new NAME field and any
padding normalization must match the precise form's controls exactly.
