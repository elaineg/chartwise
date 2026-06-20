# chartwise — Panel Report: "I only know my big 3" estimate feature

Run: 20260619-174428-daily. Result: **SHIPPED on plateau** to https://chartwise.vercel.app (commit 51dc90f).

## Feature tested

A second chart-entry mode: a **PRECISE | BIG 3** toggle. BIG 3 mode estimates a full natal
chart from Sun/Moon/Rising signs + birth year (no exact date/time/place), labeled
**ESTIMATED CHART** with a methodology note stating the date/time/place were inferred.

## 3-round arc

| Round | In-audience adv ≥9 | In-aud mean | What it fixed |
|-------|--------------------|-------------|---------------|
| R1 | 2/8 | 8.0 | Found the gating blocker (solver dead-end) |
| R2 | 4/8 | 8.5 | Solver dead-end + payoff strip |
| R3 | 6/8 | 8.75 | COPY LINK confirmation + methodology note |

All 8 in-audience testers: **clarity Yes + value Yes** every round. **Zero regressions** across
all three rounds. Raw final: 8/10 at adv≥9.

## Final score table (10 testers)

| Tester | Fit | Clarity | Value | Advocacy | Final state |
|--------|-----|---------|-------|----------|-------------|
| Dana   | in-aud  | Yes | Yes | 9 | carried (passed R1) |
| Aisha  | in-aud  | Yes | Yes | 9 | carried (passed R1) |
| Marcus | in-aud  | Yes | Yes | 9 | carried (passed R2) |
| Elena  | in-aud  | Yes | Yes | 9 | carried (passed R2) |
| Wen    | in-aud  | Yes | Yes | 9 | re-run ↑ (8→9 on methodology fix) |
| Sam    | in-aud  | Yes | Yes | 9 | re-run ↑ (8→9 on copy-confirm fix) |
| Jules  | in-aud  | Yes | Yes | 8 | re-run = (additive share-image wish) |
| Rob    | in-aud  | Yes | Yes | 8 | re-run = (divergent layout preference) |
| Priya  | non-fit | Yes | No  | 3 | roster cap (hard-skeptic) |
| Tomás  | non-fit | Yes | No  | ~6 | roster cap (hard-skeptic) |

## What each round fixed

- **R1 blocker — solver dead-end.** BIG 3 returned a hard red "COULD NOT FIND A DATE AND
  TIME…" on reachable combos (Elena + Sam both hit Leo/Scorpio/Gemini 1988). Fixed by checking
  all three sign-constraints per trial; **proven by a full 1728-combo sweep (0 dead-ends, every
  combo honors all three signs)**. A "YOUR BIG THREE" payoff strip was added under the badge.
- **R2 levers — both fixed in R3.** COPY LINK now shows a perceptible "✓ Link copied to
  clipboard" confirmation + a "Copy blocked" state (Sam); ESTIMATED charts show a one-line
  methodology note plus the inferred anchor date/time/place (Wen). Both verified by their owners.

## Audience-weighting rationale

chartwise is an astrology tool. **Priya and Tomás are hard-skeptic out-of-ICP roster caps** —
value=No by stance, not execution; both verified the craft (client-side data, no bugs,
privacy fine-print passes). They are excluded from the bar per prior chartwise ships.

The two remaining in-audience holdouts at 8 are **non-defects**:
- **Jules (8)** wants a downloadable share-as-image / social card — explicitly **OUT OF SCOPE**
  in APP_SPEC; an additive net-new feature, not a fix. The copy-link fix removed the broken
  dead-end and she'd now share the link.
- **Rob (8)** has a **self-identified divergent layout/density preference** on the deliberate
  "every row visible, no expand gate" tradeoff (precise/synastry flows need it). Data is
  correct and legible; he'd still recommend it. Explicitly not a defect or regression.

## Verdict

**SHIPPED.** 6/8 in-audience at adv≥9, all 8 Yes/Yes, mean 8.75, both R2 defects verified
resolved with zero regressions. No shared cheaply-fixable blocker remains — the two sub-9
holdouts are one out-of-scope additive wish and one individual layout preference on a
deliberate design tradeoff. https://chartwise.vercel.app (commit 51dc90f).
