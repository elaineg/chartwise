# Round 1 — Tester 2 (Marcus, frontend eng, 2 yrs)

- Persona: Marcus — casual-curious-skeptic, would drop a slick free no-signup chart explainer in the group chat if the polish holds up.
- In-audience: yes

**Clarity: Yes.** Cold open, 30s: H1 "Your birth chart, explained in plain English." + eyebrow "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" + subline "Free, no signup" told me exactly what it is and that there's no login wall. The PRECISE / BIG 3 toggle is self-explanatory; the BIG 3 helper ("Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest.") nails my exact mental model — that Co-Star reference is a chef's-kiss audience detail.

**Value: Yes.** Today my "tool" is screenshotting Co-Star and arguing in Slack. This actually does something Co-Star doesn't: I have my Big 3 but not my birth time, and it estimated a full chart + plain-English readings from just Sun/Moon/Rising + birth year, and was honest that it's an approximation ("Date, time, and place were inferred... this is an approximation" + a "How this works" explainer). Save-and-share-an-estimate is clear and the share link is the actual shareable artifact for the group chat.

**Advocacy: 8/10.** I'd drop this in the group chat unprompted — it's polished, free, no signup, and the share link works cold. Not a 9 only because the share-link button sits on a ~4-5s server roundtrip with just "CREATING LINK…" (no spinner/progress), which feels slightly janky for an otherwise instant app, and the compatibility example renders stacked *below* my own chart on the same page rather than as a clean standalone.

**What worked**
- BIG 3: named chart, picked Leo/Scorpio/Aquarius + 1996, ESTIMATE CHART → full chart with bold "ESTIMATED CHART" banner. Honest framing.
- Share link round-trips: created `/chart/<id>`, opened it in a fresh browser (no localStorage) → HTTP 200, same name "Marcus's chart", same Big Three, "ESTIMATED CHART" label, and a "Create your own chart →" loop. Solid.
- Spacing: BIG 3 form is comfortably spaced, even label→field gaps, nothing cramped. Cards (two-person compatibility, planet rows) have even padding — no text touching edges.
- Compatibility example loads: Princess Diana (Sun Cancer/Moon Aquarius/Rising Sagittarius) × Prince Charles, "Compatibility, explained", element bars, plain-English readings, clear "← BACK TO CHART".
- PRECISE flow: London geocoded with green ✓ + coords, computed a real chart in seconds, correctly NO estimated label.
- Zero console errors on every screen (devtools open the whole time).

**What broke / nits**
- Share link create = ~4-5s with only a "CREATING LINK…" label, no spinner — reads as janky/hung for a second.
- `/compatibility` direct URL = 404; compatibility is only reachable as an in-page mode after computing a chart (left form stays populated, slightly disorienting).
- Minor: compatibility example appends below your own chart rather than swapping to a focused view.
