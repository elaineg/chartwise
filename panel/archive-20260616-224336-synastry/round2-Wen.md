# Wen — round 2

Marketing data analyst, casual-curious-skeptic. Re-tested the three things that held me back at advocacy 6.

## Round-1 blockers — fixed?
1. **Broken/cryptic city geocoder** — FIXED. Typed "Tokyo, Japan" → got "Tokyo, Japan" and "Nishi-Tokyo-shi, Japan" with readable country names (no raw region codes). The "City, Country" format works; "Taipei, Taiwan" resolved and computed my chart. The geocoder is now trustworthy.
2. **Placements expanding to EMPTY explanations (Jupiter, House-11 stack)** — FIXED. Expanded every ▾ toggle. Jupiter → "Jupiter's home territory — wisdom, travel..."; House-11 stack Neptune/Pluto/Chiron each gave a distinct, coherent sentence; Saturn, Uranus too. No empties found.
3. **No per-planet sign/degree to reconcile placements** — PARTIALLY fixed. Every planet now shows SIGN + HOUSE both in the headline reading and the house table, and they're internally consistent (Sun "Pisces · House 10" matches the table's House 10). But there are STILL no degrees (`HAS_DEGREE` = false). As a data person I can sanity-check sign placement, not the actual ephemeris math.

## 1. ADVOCACY: 8/10 (up from 6)
The reading is genuinely the thing I wanted: it surfaces by default, reads in natural plain English, every placement is explained, and sign+house line up consistently across the headline and the houses table. The "Today's Sky" transit with a "For your chart" cross-reference (e.g. "Mars in Taurus = your natal Neptune") is a nice, legible touch. Held back from 9 by the missing degrees — I can't reconcile the asserted signs against the actual longitudes, so I take the math partly on faith. My July-22 Cancer Sun (right on the cusp) checked out against what I half-remember, which earned trust. Not a 9 because nothing here makes me share it *unprompted* — it's a satisfying one-time "huh, neat," and the no-degree gap keeps the data hygienist in me at arm's length.

## 2. VALUE: Yes
This is exactly what I wanted as a curious skeptic: I finally understand what my rising sign and house placements MEAN without learning to read a wheel. The per-planet "sign + house + what it means" format replaces the cryptic wheels on astro-seek. Real value in one session.

## 3. CLARITY: Yes
H1 "Your birth chart, explained in plain English" + "Free, no signup — type your birth date, time, and place, or load an example" told me what it does and how in well under 30 seconds. The Einstein example let me see the payoff before entering my own data.

## Round-1 → Round-2 movement: 6 → 8 (+2). All three blockers addressed; only the degree-level math transparency remains.

```json
{"tester": 0, "round": 2, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["No per-planet degrees/longitudes — can't reconcile the ephemeris math, only sign placement", "Nothing yet compels an unprompted share; it reads as a satisfying one-time tool"], "priorConcernsAddressed": "all"}
```
