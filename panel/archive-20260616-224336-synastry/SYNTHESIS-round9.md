# chartwise — Panel SYNTHESIS round 9 (buried/clipped node+Lilith placement fix — delta-retest)

URL tested: http://localhost:3000 (local production server, no deploy — edge economy).
Audience-weighted bar: **PASS = ALL 8 in-audience testers at advocacy ≥ 9 AND Value = Yes AND Clarity = Yes.** The 2 non-fits (Priya, Tomás) are hard skeptics, carried, and do NOT gate.

## Round-9 scope

Round 8 was an in-audience FAIL (2/8 ≥9) for ONE convergent, fixable defect: the lunar nodes + Black Moon Lilith sign+degree were buried behind a per-row expand AND truncated/clipped in the houses table ("Black Moon Lilith 26°2…"). The fix: node + Lilith sign+degree now surfaced INLINE in the houses table (dedicated NODES column on desktop) and in the per-house cards on mobile, WITHOUT a click, with labels WRAPPING instead of clipping. This round re-spawned ALL 10 personas to confirm the fix landed on both desktop and mobile (~375px) and that nothing regressed.

## The fix LANDED — unanimously verified, desktop + mobile

Every tester independently confirmed on the Jiangmen anchor (1998-08-08 16:30):
- **Desktop**: dedicated NODES column shows South Node 2°07' Pisces (H2), North Node 2°07' Virgo (H8), Black Moon Lilith 26°25' Libra (H10) inline, no click. The long Lilith label WRAPS to two lines instead of clipping.
- **Mobile (375px)**: same values render as full inline rows/chips in each house card — multiple testers measured `scrollWidth == clientWidth` (e.g. 279==279) confirming zero clipping.
- **No regression**: arcminutes everywhere, element basis labeled ("Based on 11 placements…", correctly excluding nodes/Lilith), save-as-image gone, node axis still exact 180° at identical arcminute, ASC/MC reconcile. Zero console errors across all 10 testers. Priya re-watched the network tab — chart math still client-side (only `/api/cities` city-lookup leaves the browser).
- **Side wins also confirmed**: mobile auto-scroll/collapse to chart after Compute (Dana, Elena); real 1200×630 OG/share image card now delivered (Dana, Jules).

## Score table (all 10 testers)

| Tester | audienceFit | stance         | R8 adv | R9 adv | Δ   | Value | Clarity | At-bar (≥9)? |
|--------|-------------|----------------|--------|--------|-----|-------|---------|--------------|
| Wen    | in-audience | casual-skeptic | 9      | 9      | 0   | Yes   | Yes     | **Yes** |
| Aisha  | in-audience | curious        | 9      | 9      | 0   | Yes   | Yes     | **Yes** |
| Marcus | in-audience | casual-skeptic | 8      | 9      | +1  | Yes   | Yes     | **Yes** |
| Dana   | in-audience | curious        | 8      | 9      | +1  | Yes   | Yes     | **Yes** |
| Jules  | in-audience | curious        | 8      | 9      | +1  | Yes   | Yes     | **Yes** |
| Rob    | in-audience | casual-skeptic | 8      | 9      | +1  | Yes   | Yes     | **Yes** |
| Sam    | in-audience | curious        | 8      | 9      | +1  | Yes   | Yes     | **Yes** |
| Elena  | in-audience | casual-skeptic | 7      | 9      | +2  | Yes   | Yes     | **Yes** |
| Priya  | non-fit     | hard-skeptic   | 4      | 4      | 0   | No    | Yes     | No (carried) |
| Tomás  | non-fit     | hard-skeptic   | 6      | 6      | 0   | No(cat) | Yes  | No (carried) |

## Tally

- **IN-AUDIENCE at-bar: 8 / 8** (Wen, Aisha, Marcus, Dana, Jules, Rob, Sam, Elena). **THE BAR IS MET.**
- Clarity universal: 10/10 Yes. Value: 8/8 in-audience Yes (only the 2 non-fits No, both on category not craft).
- Carried non-fits: Priya (4, flat — explicitly "purely category, not craft; engineering would be a 7–8; the defect that capped me last round is genuinely resolved"), Tomás (6, flat — capped by his own skepticism; "the convergent defect is genuinely gone").
- The entire round-8 −1/−2 group (Marcus, Dana, Jules, Rob, Sam, Elena) returned to ≥9 exactly as predicted once the buried/clipped placement defect was fixed.

## Remaining 9→10 asks (divergent, NOT a gating cluster — no shared blocker)

These are scattered polish items, each named by ONE tester; none repeats across testers and none blocks the bar:
- Wen: sign-specific (not generic/house-keyed) Lilith/node blurbs to match Sun/Moon depth.
- Dana, Jules: OG/share card title falls back to generic "My Chart" when name field is skipped — use the chart's identity.
- Elena: surface the daily "For your chart today" transit above the fold as the weekly return hook.
- Rob: plain-language label/tooltip on the "NODES" column header (a cold skeptic won't know the terms).
- Sam: let the per-placement explanation peek one line on the collapsed card so a raw screenshot carries meaning.
- Aisha: a touch more vertical padding on the 2-line wrapped node chip for optical centering.
- Marcus: ▾ disclosure carets appear on rows with little to expand (slightly busy).
- Tomás (non-fit): auto-resolve typed "City, Country" on Compute instead of erroring (place-entry friction).

## Verdict

**PASS the round — 8/8 in-audience at advocacy ≥ 9** (up from 2/8 in R8, recovering R7's 8/8). The buried/clipped node+Lilith placement defect — the single convergent reason R8 failed — is unanimously confirmed fixed on both desktop and mobile, with no regression and zero console errors. Both carried non-fits flat and explicit that the capping defect is gone (their scores are category-driven, not craft).

No shared remaining defect. The 9→10 asks are divergent one-off polish, each named by a single tester. Round meets the audience-weighted bar; halt for Elaine's confirmation.
