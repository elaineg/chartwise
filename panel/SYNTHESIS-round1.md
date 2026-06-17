# chartwise — Panel SYNTHESIS round 1

URL tested: http://localhost:3099 (local production server, no deploy)
Bar: advocacy ≥ 9 AND Value = Yes AND Clarity = Yes, for ≥ 9 of 10 testers.

## Score table

| Tester | audienceFit | stance | Advocacy | Value | Clarity | At-bar? |
|--------|-------------|--------|----------|-------|---------|---------|
| Dana   | in-audience | curious             | 7 | Yes | Yes | No |
| Jules  | in-audience | curious             | 8 | Yes | Yes | No |
| Aisha  | in-audience | curious             | 7 | Yes | Yes | No |
| Sam    | in-audience | curious             | 7 | Yes | Yes | No |
| Marcus | in-audience | casual-skeptic      | 8 | Yes | Yes | No |
| Wen    | in-audience | casual-skeptic      | 6 | Yes | Yes | No |
| Rob    | in-audience | casual-skeptic      | 6 | **No** | Yes | No |
| Elena  | in-audience | casual-skeptic      | 6 | Yes | Yes | No |
| Priya  | non-fit     | hard-skeptic        | 3 | **No** | Yes | No |
| Tomás  | non-fit     | hard-skeptic        | 6 | Yes(for audience) | Yes | No |

## Tally

- **At-bar (adv≥9 ∧ Value ∧ Clarity): 0 / 10.**
- In-audience only (8 testers): 0 / 8 at-bar. Advocacy range 6–8; Value 7/8 Yes (Rob = No); Clarity 8/8 Yes.
- Non-fit (2 testers): Priya 3, Tomás 6 — both well below bar, as expected for hard skeptics.
- **Clarity is universal: 10/10 Yes.** Nobody was confused about what the app is or how to start. The H1 "Your birth chart, explained in plain English" + "Free, no signup" + "Load example (Einstein)" is landing perfectly.
- **Value is strong for the audience: Yes from 7/8 in-audience** (only Rob, a casual-skeptic who wanted just his big-three, said No).
- No tester hit the advocacy bar — the ceiling so far is 8 (Marcus, Jules). This is a FIXABLE-defect plateau, not an audience wall: even the most enthusiastic curious/early-adopter testers were dragged down by the same handful of concrete defects, NOT by the concept.

## Dominant blockers (ranked by # of testers raising them)

### 1. Broken / cryptic city geocoder — 7 testers (Priya, Marcus, Wen, Tomás, Aisha, Elena, Dana) — FIXABLE, highest priority
The single most-cited defect, and the most dangerous because it produces a SILENTLY WRONG chart.
- **Bad ranking**: famous big cities lose to obscure namesakes. "San Francisco" surfaces "San Francisco, 05, AR" (Argentina) / "...CO" before the US city (Elena); "New York" ranks "New York Mills, MN" above NYC (Marcus); "Austin, AR" above "Austin, TX" (Jules); "London, 08, CA" before London UK (Priya, Elena).
- **Cryptic labels**: suggestions show raw admin-region + 2-letter country codes — "Lagos, 05, NG", "Madrid, 33, CO", "Shanghai, 23, CN" — instead of readable country names (Priya, Wen, Tomás, Aisha). At the most consequential input, it reads like unpolished dev data and invites a wrong pick (Tomás picked Madrid, Colombia by accident).
- **Coverage gaps**: "Bangalore" returns empty (only "Bengaluru" works) — Priya; "Portland, OR" returns zero — Marcus.
- **Paste / country-suffix breaks search**: pasted city silently fails (Wen); typing "San Francisco, USA" returns zero (Elena); hitting Compute before tapping a suggestion keeps raw text and errors confusingly (Wen, Dana).
- Defect: city search must rank by population/prominence, label suggestions with readable country names (and disambiguate state for US), accept common aliases, and not silently compute against a mis-picked place.

### 2. Plain-English explanations are buried behind per-row carets — 4 testers (Rob, Sam, Aisha, Dana-ish) — FIXABLE, high priority
The app's core differentiator (the inline plain-English readings) is hidden. Default view after compute is a dense 12-row HOUSE/SIGN/PLANETS/NODES reference grid with every explanation collapsed behind a "▾" caret tapped one at a time.
- Rob (Value=No) and Sam: "the moment I scroll, the fun stops and a dense data grid takes over"; "the screenshot-worthy copy is buried." Rob never read the good explanations and so saw no value.
- Aisha: the caret affordances read like editable selects, not "tap to read"; she only found explanations because the example pre-expanded one.
- Defect: this directly undercuts the "explained in plain English" headline promise. Wants an expand-all / explanations-open-by-default, or a readable summary/narrative, so the value is visible without hunting.

### 3. Templated / low-craft transit + reading copy — 4 testers (Marcus, Wen, Rob, Sam) — FIXABLE, medium priority
- "Today's Sky / FOR YOUR CHART" lines read like a mad-lib: "themes of mars and neptune blend right now" — vague, lowercase planet names (Rob, Sam, Marcus). Readings feel formulaic/templated to skeptics who notice fast.
- Some placements show EMPTY explanations when expanded — Jupiter, the House-11 stack (Wen) — feels half-finished.
- Defect: capitalize planet names, make transit blurbs specific, and ensure no placement expands to an empty body (the _generic fallback should always fire).

## Secondary / single-persona items (lower priority)

- **Mobile result not auto-scrolled / value not above the fold** — Dana, Sam (mobile). After "Load example"/"Compute", mobile users land back on the empty form and must scroll ~1.5 screens; big-three never lands in one scroll on a 375px phone. Fixable (auto-scroll to result; consider moving big-three card to top). Raised by 2 mobile-first curious testers — real, not a quirk.
- **Layout: table loses grid rhythm when an explanation expands / many planets stack** (houses 10/11) — Priya, Aisha. On wide desktop the expanded explanation renders as a narrow one-word-per-line sliver (Priya); column alignment floats against empty space (Aisha). Fixable CSS.
- **No degrees / per-planet signs to reconcile asserted placements** — Wen only. Summary says "Sagittarius Moon" but the table shows only house-cusp signs, so a data-hygiene user can't verify. Single-persona (the most rigorous one); judgment call — worth a lightweight fix (show planet sign + degree) but not a bar-blocker on its own.
- **No image/social share or chart wheel** — Jules, Sam. Share is a URL; they post graphics. Nice-to-have, out of MVP scope per spec; note for backlog, not a round-2 fix.

## Trust / functional positives (no action needed — protect these)

- Chart compute is genuinely client-side: Priya and Tomás instrumented the network tab — zero external calls on compute; only the openly-disclosed GET /api/cities and opt-in POST /api/chart-share. The "computed on your device" + honest share-link warning earned explicit skeptic respect. **Do not regress this.**
- Share-link loop works end-to-end: /chart/<token> opens the same named chart in a fresh session with a "Create your own chart" CTA (Marcus, Jules, Dana, Sam) — the real viral hook.
- Zero console/page errors across cold load, example, own-chart, and share for every tester. Fast (~0.5–2.7s).
- Element-count bar math is internally consistent (Wen verified 4+5+1+1=11 etc.).
- localStorage multi-profile saving works and persists on reload (Dana, Sam).

## Fixable vs audience-non-fit, per sub-bar tester

- **In-audience sub-bar (8): all gaps are FIXABLE defects, none are audience non-fit.** Marcus(8)/Jules(8) explicitly said the geocoder + templated copy held them off 9. Dana(7)/Aisha(7)/Sam(7) held off by buried explanations + mobile scroll + craft. Wen(6) by missing degrees + geocoder + empty explanations. Elena(6) entirely by the geocoder. Rob(6, Value=No) by buried explanations turning it into a dense grid. Fix blockers 1+2+3 and these scores have clear room to rise.
- **Non-fit sub-bar (2):** Priya(3) and Tomás(6) are hard skeptics who would not advocate for an astrology product regardless of quality — their advocacy gap is largely AUDIENCE, not defect (both nonetheless rated clarity Yes and flagged the same fixable geocoder/label defects). Per the niche-tool-panel lesson, do NOT count their advocacy against the bar; but their craft feedback (cryptic labels, mis-pick risk) is real and folds into blocker #1.

## Recommendation

**FIX-AND-RETEST.** This is a fixable-defect plateau, not an audience wall — 10/10 clarity and 7/8 in-audience value prove the concept lands; the same concrete defects are capping every enthusiast at 6–8. Targeted fixes for round 2:

1. **(P0) Rebuild city geocoder ranking + labels** — rank by population/prominence so famous cities win; show readable country names (and US state) instead of numeric region codes; accept common aliases (Bangalore→Bengaluru); handle paste / "City, Country" input; never compute against a mis-picked/unselected place. (7 testers)
2. **(P0) Surface the plain-English explanations** — expand-all or open-by-default (or a readable narrative summary) so the differentiator is visible without hunting; make caret affordances obviously "tap to read." (4 testers, incl. the only in-audience Value=No)
3. **(P1) Clean up reading/transit copy** — capitalize planet names, make transit blurbs specific not mad-lib, and guarantee no placement expands to an empty body. (4 testers)
4. **(P1) Mobile: auto-scroll to result after compute; get the big-three above the fold on 375px.** (2 mobile-first testers)
5. **(P2) Fix expanded-cell desktop layout (no narrow sliver / broken grid rhythm); optionally add per-planet sign+degree for verifiability.** (2 testers / 1 tester)

Then re-test: re-spawn all 8 in-audience testers (every one was sub-bar and all are touched by the fixes); carry the 2 non-fits' verdicts forward (their advocacy is audience, not defect) but note their geocoder feedback is addressed. If after fixes the in-audience tally still can't reach the bar and only hard non-fits hold out, PARK on the audience-weighted bar — but we are NOT there yet; there is clear fixable headroom.
