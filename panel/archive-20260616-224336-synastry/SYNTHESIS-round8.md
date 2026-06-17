# chartwise — Panel SYNTHESIS round 8 (QA correctness/precision delta-retest)

URL tested: http://localhost:3000 (local production server, no deploy — edge economy).
Audience-weighted bar: **PASS = ALL 8 in-audience testers at advocacy ≥ 9 AND Value = Yes AND Clarity = Yes.** The 2 non-fits (Priya, Tomás) are hard skeptics, carried, and do NOT gate.

## Round-8 scope

A correctness/precision QA fix shipped. This round re-spawned ALL 10 personas to (a) confirm the 5 QA items read well to real users and (b) catch any regression. The 5 items:
1. Lunar North/South Nodes show own sign+degree (Virgo–Pisces axis).
2. Black Moon Lilith appears as a body (~26° Libra, House 10).
3. Degrees show arcminutes (e.g. 23°51').
4. Element tally labels its basis ("Based on N placements…").
5. Broken "Save as image" removed.

## All 5 QA items PASS — unanimously, 10/10

Every tester (including both non-fits) independently verified all five on the Jiangmen anchor (1998-08-08 16:30):
- Nodes: North Node 2°07' Virgo (H8) / South Node 2°07' Pisces (H2) — exact 180° axis, identical arcminute. **Wen (data-hygiene gate) called this "what won my trust."**
- Lilith: Black Moon Lilith 26°25' Libra, House 10 — matches target.
- Arcminutes everywhere (15°36', 6°21', 23°52', 27°20'℞) — no floor-truncation.
- Element basis labeled: "Based on 11 placements: Sun, Moon…Chiron" (+ "excluded" note).
- "Save as image" gone, no DOM trace; only "Create share link" remains.
- Zero console errors across all testers; client-side compute reconfirmed (Priya watched the network tab — no compute API calls). No regression in the core flow.

## Score table (all 10 testers)

| Tester | audienceFit | stance         | R7 adv | R8 adv | Δ   | Value | Clarity | At-bar (≥9)? |
|--------|-------------|----------------|--------|--------|-----|-------|---------|--------------|
| Wen    | in-audience | casual-skeptic | 9      | 9      | 0   | Yes   | Yes     | **Yes** |
| Aisha  | in-audience | curious        | 9      | 9      | 0   | Yes   | Yes     | **Yes** |
| Marcus | in-audience | casual-skeptic | 9      | 8      | −1  | Yes   | Yes     | No |
| Dana   | in-audience | curious        | 9      | 8      | −1  | Yes   | Yes     | No |
| Jules  | in-audience | curious        | 9      | 8      | −1  | Yes   | Yes     | No |
| Rob    | in-audience | casual-skeptic | 9      | 8      | −1  | Yes   | Yes     | No |
| Sam    | in-audience | curious        | 10     | 8      | −2  | Yes   | Yes     | No |
| Elena  | in-audience | casual-skeptic | 9      | 7      | −2  | Yes   | Yes     | No |
| Priya  | non-fit     | hard-skeptic   | 3      | 4      | +1  | No    | Yes     | No (carried) |
| Tomás  | non-fit     | hard-skeptic   | 6      | 6      | 0   | Yes(aud) | Yes  | No (carried) |

## Tally

- **IN-AUDIENCE at-bar: 2 / 8** (Wen, Aisha). **THE BAR IS NOT MET** — regressed from R7 8/8.
- Clarity universal: 10/10 Yes. Value: 8/8 in-audience Yes (Priya the only No, a non-fit).
- Carried non-fits: Priya (4, +1 — noted all her R1 complaints fixed, dragged by category), Tomás (6).

## Why scores dropped: a SINGLE convergent in-audience defect

This is NOT a QA regression — the fixes all landed and read well. The drop is because re-spawning everyone cold re-surfaced one shared friction that the carry-forward rounds (R7 only re-tested Wen) had stopped sampling, and the NEW bodies make it worse:

**The new precision (node/Lilith sign+degree, arcminutes) is hidden behind a per-row click / inside collapsed house accordions.** The new bodies are the most interesting placements, but you can't see their sign+degree until you expand:
- **Marcus, Aisha, Rob:** node/Lilith chips truncate in the houses table — "Black Moon Lilith 26°2…" — so the new precision is visually cut off (the only ragged cells in an otherwise crisp table).
- **Rob, Priya:** "surface full node/Lilith sign+degree without a click — the narrative/precision is the value and it's buried one click deep."
- **Sam:** "Lilith and nodes are buried inside collapsed house accordions — a mobile user screenshots what's on screen, not after tapping around."

That single fix — **make node/Lilith sign+degree+blurb visible without expansion AND stop truncating the long body labels in the houses table** — is what 4 of the 6 below-bar in-audience testers named.

### Secondary, divergent 9→10 asks (NOT the gating cluster)
- Wen (held 9): give Lilith/node blurbs the same sign-specific depth as Sun/Moon (currently generic). Her single most important fix.
- Dana, Elena (mobile): after Compute, the form stays pinned above the result — auto-scroll/collapse to the chart.
- Jules, Dana: real shareable IMAGE/OG card (deleting the broken one was right; the need is unmet).
- Elena: surface the daily "For your chart" transit above the fold as the return hook.
- Tomás (non-fit): place field hard-blocks unless you click an autocomplete suggestion; auto-resolve typed "City, Country" on Compute.

## Verdict

**FAIL the round — 2/8 in-audience at advocacy ≥ 9** (was 8/8 in R7). The QA correctness/precision fix is a clean, unanimous success on its own terms (all 5 items pass, no regression, Clarity 10/10, Value 8/8). The bar miss is the well-known cost of re-spawning the full panel cold after several carry-forward rounds: it re-sampled a latent friction the partial rounds had stopped measuring, and the newly-added bodies amplify it.

**The single named, fixable in-audience defect to target:** node/Lilith placements (sign + degree + blurb) are hidden behind a per-row expand and TRUNCATED in the houses table — surface the full sign+degree (and full label, no "26°2…" clipping) without requiring a click. Named by Marcus, Aisha, Rob, Sam (and non-fit Priya). Fix that one cluster and the −1 group (Marcus, Dana, Jules, Rob, Sam) is positioned to return to 9.
