# Wen — Round 3

Marketing data analyst, casual-curious-skeptic. Lives in data hygiene; distrusts tools that transform numbers invisibly. Re-tested cold; my round-2 score was 8, held back only by missing per-planet degrees.

## Round-2 blocker — fixed?
**No per-planet degrees → couldn't reconcile the ephemeris math.** FIXED. Every planet in the houses table now shows degree-within-sign: `Sun 23° Pisces`, `Moon 14° Sagittarius`, `Mars 26° Capricorn`, `Jupiter 27° Aquarius`, `Venus 16° Aries`, `Neptune 7° Taurus`, `Pluto 24° Taurus`, `Chiron 9° Taurus`, plus retrograde markers (`Uranus 1° Virgo℞`). That's the exact thing I asked for.

I sanity-checked the math as a data person, not on faith this time:
- Einstein (1879-03-14, 11:30, Ulm): `Sun 23° Pisces` lines up with the widely-documented ~23-24° Pisces; Sagittarius Moon and Cancer rising also match. Credible.
- My own chart (July 22, late-Cancer-cusp): app returned `Sun 28° Cancer` — late Cancer, just shy of the Leo cusp, which is right for a July-22 birth. The degree resolves the cusp ambiguity I couldn't check before. This is what flips me from "partly on faith" to "I trust it."

## 1. ADVOCACY: 9/10 (up from 8)
The degrees close the trust gap that was capping me. I can now reconcile asserted signs against actual longitudes, the retrograde flags are there, the element distribution (4 Fire / 5 Earth / 1 Air / 1 Water, "Based on 11 placements") is transparent about what it counted. Geocoder ("Taipei, Taiwan" → resolved), own-chart compute, and Save-as-image (downloads `albert-einstein-chart.png` cleanly) all worked with ZERO console/page errors. It's a 9, not a 10, because of one small inconsistency I'd want tightened: the headline plain-English reading still says "Pisces Sun · House 10" with NO degree — degrees live only in the houses table below. A data person's eye wants the degree where the assertion is first made. And the transit "FOR YOUR CHART" lines are nice but read slightly generic. But the core math is now legible enough that I'd actually bring this up to a curious-skeptic friend unprompted as "the astrology tool that shows its work."

## 2. VALUE: Yes
Still exactly my use case: I understand what rising sign + house placements MEAN without learning a wheel — and now the degree column means I can audit the numbers instead of trusting them. That's the difference between a toy and a tool, for me. Beats squinting at astro-seek's cryptic wheel.

## 3. CLARITY: Yes
H1 "Your birth chart, explained in plain English" + "Free, no signup — type your birth date, time, and place, or load an example" told me what/who/how in well under 30 seconds. Einstein example shows the payoff before I enter data.

## Movement: round 1 → 2 → 3 = 6 → 8 → 9. All prior blockers resolved; only nit is degree absent from the headline reading.

```json
{"tester": 0, "round": 3, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Headline plain-English reading shows sign+house but NOT degree (degrees only in the houses table) — small consistency gap", "Transit 'For your chart' lines read slightly generic"], "priorConcernsAddressed": "all"}
```
