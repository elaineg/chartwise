# chartwise — Panel SYNTHESIS round 7 (final delta-retest)

URL tested: http://localhost:3099 (local production server, no deploy — edge economy).
Audience-weighted bar: **SHIP = ALL 8 in-audience testers at advocacy ≥ 9 AND Value = Yes AND Clarity = Yes.** The 2 non-fits (Priya, Tomás) are hard skeptics, carried forward, and do NOT gate.

## Round-7 scope (legitimate delta-retest)

The round-6 blocker was a single, precisely-named, trivially-fixable item from ONE in-audience tester (Wen): the big-three headline chips omitted the degree-within-sign. The round-7 build added the degree token to each big-three chip and carried it through to the Save-as-image card and the per-chart share/OG image — Wen's exact requested fix, on which she explicitly committed "one token per chip and I'd round up."

Because the change is tiny, additive, and isolated to the headline chips (no surface the other 7 at-bar in-audience testers' named likes/flows depend on), **only Wen was re-spawned**. The 7 at-bar in-audience testers carry their round-6 verdicts; the 2 non-fits carry forward. Per the carry-forward / delta-retest cost rule in user-panel.md.

## Score table (all 10 testers)

| Tester | audienceFit | stance         | R6 adv | R7 adv | Δ      | Value | Clarity | At-bar (≥9)? | retested/carried |
|--------|-------------|----------------|--------|--------|--------|-------|---------|--------------|------------------|
| Sam    | in-audience | curious        | 10     | 10     | 0      | Yes   | Yes     | **Yes**      | carried |
| Marcus | in-audience | casual-skeptic | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | carried |
| Elena  | in-audience | casual-skeptic | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | carried |
| Rob    | in-audience | casual-skeptic | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | carried |
| Aisha  | in-audience | curious        | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | carried |
| Dana   | in-audience | curious        | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | carried |
| Jules  | in-audience | curious        | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | carried |
| Wen    | in-audience | casual-skeptic | 8      | 9      | **+1 ✅** | Yes | Yes     | **Yes**      | **retested** |
| Priya  | non-fit     | hard-skeptic   | 3      | 3      | —      | No    | Yes     | No           | carried |
| Tomás  | non-fit     | hard-skeptic   | 6      | 6      | —      | Yes (for audience) | Yes | No | carried |

## Tally

- **IN-AUDIENCE at-bar: 8 / 8** (Sam, Marcus, Elena, Rob, Aisha, Dana, Jules, Wen). **THE BAR IS MET.**
- Round-by-round at-bar: R2 3/8 → R3 5/8 → R4 4/8 → R5 6/8 → R6 7/8 → **R7 8/8** (converged).
- **Clarity universal: 10/10 Yes. Value: 8/8 in-audience Yes** (Priya the only No, a non-fit).

## The single fix landed and was verified cold by Wen

**Degree-on-chip (Wen's 4-rounds-running ask) — RESOLVED, end-to-end.** Wen retested cold and confirmed:
- On-page big-three chips now read `Cancer 7° rising` · `☉ Sun 23° Pisces · House 10` · `☽ Moon 14° Sagittarius` — degrees present, numeric.
- Cross-checked against the houses table: Sun 23° Pisces matches the House-10 row; Moon 14° Sagittarius matches the House-6 row. Consistent (her data-hygiene gate).
- Save-as-image download card carries the degrees (`Sun 23° Pisces`, `Moon 14° Sagittarius`, `Cancer 7° Rising`).
- Per-chart share/OG image: the generated 1200×630 PNG itself renders `Sun 23° Pisces (H10)`, `Moon 14° Sagittarius`, `Cancer 7° Rising` — degree baked into the social card (not the degree-less headline of prior rounds).
- Not hardcoded: a second chart returned entirely different per-chart values (`Leo 5° rising`, `Sun 28° Cancer`, `Moon 19° Cancer`).

Wen moved **8 → 9 exactly as she committed**, Value Yes, Clarity Yes. The four-round blocker is closed.

## Craft-ceiling nits (non-gating — 9→10 only, do NOT grind)

- **Wen (new, non-gating, 9→10):** the rising/ASC degree (7°) now shows on the chips and cards, but the houses table still lists "ASC: Cancer" with no degree, so the ASC degree is the one figure she can't reconcile against a second surface. A data-hygiene nicety; surfacing the ASC degree in the table would take her to 10. NOT bar-gating.
- Carried 9→10 items from round 6 (all from at-bar testers, none gating): per-chart save-card decorative art/caption sameness (Rob, Dana), on-page save-image preview on phone (Dana), NODES column dead-air + dropdown overflow (Aisha), og:image:alt generic + native/X share (Jules), house-grid "—" cells (Marcus), personalized transit line (Elena, Dana).

## Audience (non-gating)

- Priya (3) and Tomás (6) carried forward unchanged — hard skeptics who will not advocate for any astrology product. Gap is audience, not defect; they do not gate the bar.

## Verdict

**SHIP — 8/8 in-audience at advocacy ≥ 9, Value = Yes, Clarity = Yes.** The bar is met. The panel converged cleanly: at-bar 6/8 → 7/8 → 8/8 across the last three rounds, the final miss was one precisely-named, trivially-fixable item with an explicit tester commitment, the fix landed and was verified cold end-to-end (chip + save-card + OG image, per-chart, not hardcoded), and the tester moved up exactly as promised. No concept doubt, no new craft class, no plateau. Remaining items are all non-gating 9→10 polish.

DEPLOY GATE (carried forward): when shipping to Vercel, confirm the prod deploy serves the per-token `/opengraph-image` route on the real URL (the absolute og:image URL 404s on localhost — a prod-URL artifact; must work post-deploy or unfurls break).
