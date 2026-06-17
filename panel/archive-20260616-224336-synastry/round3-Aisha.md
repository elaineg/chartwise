# Aisha — Round 3

ADVOCACY: 7
VALUE: Yes
CLARITY: Yes

## Re-check of my round-2 complaints
1. **Expanded reading rendered into a cramped sliver column** — PARTIALLY fixed, and this is what's holding the score. Clicking a planet chip now opens the reading INLINE below the chip (good — it's anchored to context). But on my 1440px display the card is constrained to the planets-column width, so the copy wraps into a ~280px ribbon — "Your mind crackles with / originality; you / communicate in / surprising ways and your / ideas leap ahead of / convention." Four-to-five words a line while the right ~40% of the table (the empty gutter + Nodes column) sits blank. It's no longer a 50-120px sliver, but the brief promised FULL-WIDTH on desktop and this is not that. A designer notices instantly: the layout ignores the horizontal space it has.
2. **Identical reading text repeated verbatim across same-sign placements** — FIXED, cleanly. I expanded three planets all in Taurus (Neptune/Pluto/Chiron, house 11) and got three distinct readings; the two Cancer signs (house 1 rising vs house 2 money) read "warm, receptive, protective presence" vs "security tied to emotional comfort — money feels better saved than spent." Copy is keyed to planet × house, not pasted. This was my bigger gripe and it's genuinely gone.

## Fresh judgment
- **Clarity (Yes):** H1 "Your birth chart, explained in plain English" + sub "Free, no signup — type your birth date, time, and place, or load an example" tells me exactly what it is and the no-login hook in one read. Empty state ("Your explained chart will appear here") is considered.
- **Value (Yes):** Today I read my chart on astro-seek/Co-Star — astro-seek dumps a wheel + jargon, Co-Star is cryptic one-liners. This is the explanation-first, table-not-wheel approach I want. The houses table (house meanings labeled "Self & identity", ASC/MC in accent color) is the best part. Place search disambiguates Lagos Nigeria vs Portugal vs Mexico — thoughtful. Transit copy ties today's sky to MY natal planets ("Mars charges through Taurus where your natal Neptune lives"), not generic horoscope mush.
- **Save-as-image:** real delight. Clean hierarchy, big-three pills with glyphs, element bar with counts, a teaser line, "Free birth chart at chartwise — no signup, no cost" footer. Genuinely shareable; downloads as `albert-einstein-chart.png`. This is the considered craft I advocate for.

## Why 7 not 9
The share card and copy are 9-level. The in-table expanded reading wrapping into a narrow ribbon on a wide desktop is the one craft flaw that stops me bringing it up unprompted — it's the exact issue I flagged, only half-addressed. Fix it to span the row's available width (or at least the planets+gutter+nodes span) and I'm at 9. Minor nit: place dropdown overlaps the "computed on your device" footer line. No console errors, no regressions.

```json
{"tester": 4, "round": 3, "clarity": "Yes", "value": "Yes", "advocacy": 7, "topComplaints": ["expanded in-table reading still wraps into a ~280px ribbon on desktop instead of full row width — promised full-width fix is only half-done", "place autocomplete dropdown overlaps the device-privacy footer line"], "priorConcernsAddressed": "some"}
```
