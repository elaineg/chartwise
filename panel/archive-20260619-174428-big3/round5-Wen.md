# Wen — Round 5

Marketing data analyst, desktop two-monitor, casual-curious astro-skeptic, data-hygiene brain.

## Prior concerns (R4) — re-checked first
1. **Silent share button — FIXED.** Clicked "Create share link": label flips to "CREATING LINK…",
   `disabled=true`, `cursor:not-allowed` during creation, then becomes "Copy link". No longer silent —
   exactly my ask. Link `/chart/sXgGoeiNZGKpW6fETb9yjpoW` resolved HTTP 200. "Share this comparison"
   shows the same disabled state.
2. **"the X person" phrasing — GONE.** Across all 50 expanded aspects, readings name BOTH people
   ("Albert Einstein's Mars… Michelle Obama's Sun"). Reversed pairs read correctly differently: Einstein's
   Uranus☍Obama's Moon vs Einstein's Moon□Obama's Uranus swap who destabilizes whom by name; same for the
   Node/Mars opposition pair. This is the credibility win I wanted.
3. **Caps drift — PARTIALLY fixed.** Synastry house-overlay still drifts: headers say "1st House" /
   "8th House" (43 capped) but the bodies under them say "in their 1st house / your 8th house" (7 lowercase).
   Header-vs-body mismatch inside the SAME card is the exact thing I flagged. Natal chart itself is clean.
4. **Generic same-house overlay lines — STILL REPEAT.** "This placement reaches their private,
   foundational world…" appears verbatim for Uranus 4th + Pluto 4th. Fallback aspect line "a harmonious
   flow between these two energies…" repeats 7×; "an easy cooperative link" 4×. Long-tail filler is honest
   but visibly templated.

## Clarity — Yes
"Type your birth date/time/place (or load Einstein) and it explains your astrology chart in plain English,
plus compares two people — free, no login." Header "Your birth chart, explained in plain English" +
"NATAL CHART · PLAIN ENGLISH · NO SIGNUP" nail it in <10s. "Compute on your device" reassured the
hygiene side of me.

## Value — Yes
Today I'd Google "what does 8th house Sun mean" and stitch together blog answers, or squint at AstroSeek's
wheel I can't read. This gives every placement with the orb (e.g. "Sun 23°30' Pisces · House 10"), element
counts "Based on 11 placements", and per-aspect orbs ("sextile · 3.6° orb") — it SHOWS its math, which is
why I trust it over the alternatives. Saves real time and answers the "what does it MEAN" question directly.

## Advocacy — 8
Up from R4's 8, held there (not 9) by two unfixed nits. Share spinner and the directional/name-bound aspect
tail are genuinely fixed and impressive — that alone earns the 8. What blocks 9: (1) header/body caps drift
*inside* the house-overlay cards ("8th House" header, "8th house" body) — small but it's literally the
inconsistency I named last round, and a data person notices; (2) verbatim-repeated overlay/fallback lines
("This placement reaches…" ×2 adjacent, "a harmonious flow between these two energies" ×7) make the long
tail read like a template the moment you scroll it. The honest-framing line "For insight and fun — a lens on
the dynamic, not a prediction" reads well and sits right under the summary — good. Fix the caps + dedupe the
two adjacent identical overlay lines and this is a 9.

## Tech checks
- Desktop + 375px mobile: NO horizontal scroll (sw==cw==375), no clip/overlap/double-render, 0 console errors.
- Natal math coherent: Cancer rising 7°24', Sun Pisces House 10, element dist Earth5/Fire4/Air1/Water1.
- Conjunction reciprocals (Jupiter☌Venus both directions) share identical body — defensible since conj is
  symmetric, but a purist would still swap the named bodies.

```json
{"tester": 0, "round": 5, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["synastry house-overlay caps drift: '8th House' header vs '8th house' body in same card", "verbatim-repeated overlay/fallback lines ('This placement reaches…' x2 adjacent, 'harmonious flow between these two energies' x7) make long tail read templated"], "priorConcernsAddressed": "some"}
```
