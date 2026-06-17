# Round 8 — Aisha (Product designer, in-audience, curious about astrology)

**Value: Yes** — I read my chart for fun in Co–Star/astro-seek; the wheel always makes me squint. The
houses TABLE + plain-English blurbs is the format my design brain actually wants. Beats my habit.
**Clarity: Yes** — H1 "Your birth chart, explained in plain English" + "Free, no signup" + example loader
told me what it is and who it's for inside 10 seconds. Empty state ("Your explained chart will appear here")
is considered, not lazy.

**Advocacy: 9/10**

## Prior concern (R7): NODES dead-air + dropdown overflow
ADDRESSED. North Node 2°07' Virgo (H8) and South Node 2°07' Pisces (H2) now read as full placements with
their own sign+degree and an expandable growth-direction blurb. Empty NODES cells show a tasteful em-dash,
not blank dead-air. The column finally pulls its weight.

## 5 QA items
1. Nodes own sign+degree — YES (N.Node 2°07' Virgo / S.Node 2°07' Pisces, both with blurbs).
2. Lilith as a body — YES, "Black Moon Lilith 26°25' Libra", House 10. Correct.
3. Arcminutes — YES everywhere (15°36' Leo, 23°52' Cancer, 6°21' rising). No floor-truncation.
4. Element basis labeled — YES: "Based on 11 placements: Sun, Moon, Mercury…". Exactly the transparency I wanted.
5. "Save as image" — GONE. No trace.
Core flow (data → houses → readings → element bar → Today's Sky transit) clean. Zero console errors.

## What holds it back from 10 (the one craft nit)
"Black Moon Lilith 26°2…" is TRUNCATED by the dropdown's fixed width in the NODES column. Every other cell
fits; this one clips its own degree. A designer notices the one ragged box immediately. Widen the cell or
let it wrap — then it's a 10 and I bring it up unprompted in my tools channel.

```json
{"tester": 8, "round": 8, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Black Moon Lilith label truncated ('26°2…') in NODES dropdown — only ragged cell in an otherwise crisp table"], "priorConcernsAddressed": "all"}
```
