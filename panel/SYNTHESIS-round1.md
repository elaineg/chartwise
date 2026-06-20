# chartwise — Panel SYNTHESIS, round 1

Feature under test: PRECISE | BIG 3 toggle. BIG 3 mode estimates a full chart from Sun/Moon/Rising signs + birth year, with an "ESTIMATED CHART" badge stating date/time/place were inferred.
Tested LIVE at http://localhost:3000 (prod build). All 10 personas spawned by name, exactly once each.

## Score table

| Tester | Fit | Astro stance | Clarity | Value | Advocacy | Biggest blocker |
|--------|-----|--------------|---------|-------|----------|-----------------|
| Priya  | non-fit  | hard-skeptic        | Yes | No  | 3  | Category itself — won't advocate for astrology (craft is good) |
| Tomás  | non-fit  | hard-skeptic        | Yes | No  | 5  | Plain-English prose below the fold; result opens with jargon/glyphs |
| Marcus | in-aud   | casual-curious-skep | Yes | Yes | 8  | Share/copy confirmation too quiet; result page long/dense |
| Wen    | in-aud   | casual-curious-skep | Yes | Yes | 8  | No methodology transparency (house system/ephemeris source) |
| Dana   | in-aud   | curious             | Yes | Yes | 9  | No one-tap save/share-as-image card |
| Jules  | in-aud   | curious             | Yes | Yes | 8  | No shareable image/social card; share is 2-step server action |
| Aisha  | in-aud   | curious             | Yes | Yes | 9  | Cold-load toggle + black "LOAD EXAMPLE" form an awkward L-shape |
| Rob    | in-aud   | casual-curious-skep | Yes | Yes | 6  | Result page too dense — buries the 3 signs a casual user wants |
| Elena  | in-aud   | casual-curious-skep | Yes | Yes | 8  | BIG 3 solver can dead-end on an unlucky sign combo |
| Sam    | in-aud   | curious             | Yes | Yes | 8  | BIG 3 solver dead-end + no visible copy-link confirmation |

Clarity: 10/10 Yes. Value: 8/10 Yes (the 2 No's are both hard-skeptic non-fits, by design).

## Tally

- **Raw: 2/10** at advocacy ≥ 9 (Dana 9, Aisha 9).
- **In-audience (8 testers): 2/8** at advocacy ≥ 9 with clarity+value Yes.
- In-audience advocacy mean: (8+8+9+8+9+6+8+8)/8 = **8.0**. Six of eight are at exactly 8 — one polished blocker fix likely lifts several to 9.

## Out-of-ICP roster caps (advocacy not counted against the bar)

- **Priya (3)** — hard-skeptic backend engineer; considers astrology pseudoscience, won't advocate for the category regardless of craft. She VERIFIED data stays client-side (network tab) and found no bugs. Roster non-fit, not a defect.
- **Tomás (5)** — hard-skeptic ops analyst; astrology is "harmless nonsense" to him. Tested for privacy/clarity on his partner's behalf; passed the privacy fine-print test. Roster non-fit.

Both are the spec's named hard-skeptics; their low scores are category stance, not product failure.

## BIG 3 feature-specific findings (the round's focus)

- (a) **Discoverable?** YES — unanimous. Every tester (incl. both skeptics, incl. all mobile testers at 375px) found the PRECISE | BIG 3 toggle at the top of the input panel without help. It's a real `role=tab` control. No one missed it.
- (b) **Mistaken for exact?** NO — unanimous. The triple-layer signal (ESTIMATED CHART pill + bordered disclaimer banner + card header, plus the reference location tagged "(reference)" and "this is an approximation, enter full details for the precise chart") is praised by Wen and Aisha as the most honest move in the app. Impossible to mistake.
- (c) **Loading state slow/broken?** NO. Observed times ranged ~0.7s–3.2s; the "Estimating…" state with a disabled button read as intentional, within Elena's 30s budget. Several testers saw sub-second completion. Not a blocker.
- (d) **Signs honored?** YES — unanimous on every solvable combo. Verified pairs across testers (e.g. Leo/Scorpio/Aquarius, Aries/Pisces/Capricorn, Cancer/Sag/Leo, Taurus×3) all returned matching Sun/Moon/Rising.

The new feature itself passed cleanly. The blockers below are mostly pre-existing whole-app issues surfaced by holistic judgment, plus one NEW BIG-3-specific defect (the solver dead-end).

## #1 in-audience blocker (what a fix round should address)

**The BIG 3 solver can dead-end with a hard red "COULD NOT FIND A DATE AND TIME…" failure on plausible sign combinations.** Hit independently by **Elena and Sam** (both: Leo/Scorpio/Gemini 1988), the only NEW, BIG-3-specific, reproducible defect this round. It is a genuine first-impression bounce for a no-debug, share-for-fun user who picks an unusual-but-valid combo. Fix: auto-retry nearby years or fall back to a closest-match estimate rather than a dead-end error. This is the single highest-leverage fix — it directly threatens the feature under test for the exact target personas.

### Secondary recurring theme (genuine, but wishlist — addresses the 6-8 cluster, not a defect)

**Result-page density / "buries the payoff."** Rob (6), Tomás (5/non-fit), and partly Marcus name the result page as a dense reference dump that buries the plain-English big-three payoff below jargon/glyphs. A "lead with one plain sentence per Big 3, full detail collapsible" treatment would lift Rob and likely Marcus toward 9. Recurs across 3 testers → real, but it's a presentation-priority wish, not a broken flow.

### Divergent wishlist items (single-persona, deprioritize for this round)

- Shareable image / social card (Dana, Jules, Sam touch on it) — recurs but is an additive feature, not a fix to the tested flow; would lift the share-focused personas.
- Methodology transparency / "how this is calculated" (Wen only) — single-persona, data-hygiene wish.
- Copy-link confirmation too quiet (Marcus, Sam, Jules note it; partly a headless-clipboard test artifact each flagged as env, not defect).
- Cold-load toggle/LOAD-EXAMPLE L-shape (Aisha only) — single-persona craft nit; cheap to fix and would clear her 9→10.

## Verdict

NOT PASSED. In-audience bar (≥9 of in-audience at advocacy ≥9, clarity+value Yes) met by only 2/8. The new BIG 3 feature itself is solid (discoverable, clearly-an-estimate, fast, signs honored). The gating in-audience blocker is the **BIG 3 solver dead-end on valid combos** (Elena + Sam), with result-page density as the secondary lever to move the 6-8 cluster.
