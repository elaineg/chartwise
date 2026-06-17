# Round 8 — Sam (PM, mobile-heavy, astrology-curious, in-audience)

**Value: Yes** — Today I'd just google "what's a Leo Sun mean" or paste into ChatGPT and get
generic mush. This computes my real chart AND hands me clean, plain-English paragraphs I can
screenshot straight into a group chat. That's exactly my habit (screenshot interesting tools),
and it's faster than ChatGPT because I don't have to prompt or trust it on the math.

**Clarity: Yes** — Cold, in 10 seconds: "It builds your astrology birth chart and explains it
in normal English, free, no login." Headline "Your birth chart, explained in plain English" +
"Free, no signup" + a Load-example button told me everything. Zero confusion.

**Advocacy: 8/10** — I'd bring this up unprompted to friends who like astrology. Holds it back
from 9: Lilith and the lunar nodes live inside collapsed house accordions, so the most
"interesting" placements I'd want to screenshot aren't visible without tapping around — and I
don't tap around, I screenshot what's on screen. The big-three chips up top are the screenshot
moment; deeper bodies are buried.

## 5 QA items (anchor: 1998-08-08, 16:30, Jiangmen China)
1. North/South Node — PASS. Both render with own sign+degree in houses table.
2. Black Moon Lilith — PASS. Shows "Black Moon Lilith 26°25' Libra" (House 10). Matches spec.
3. Arcminutes — PASS. Everything reads like "6°21' Capricorn", "19°03' Aquarius". No truncation.
4. Element tally basis — PASS. "Based on 11 placements: Sun, Moon, Mercury, Venus, Mars,
   Jupiter, Saturn, Uranus, Neptune, Pluto, Chiron." Clear and honest.
5. Save-as-image — GONE. Confirmed absent; only a "Share link" remains. No regression.

## Other notes
- Mobile (375px) flow is smooth: date/time native pickers, place autocomplete surfaced
  "Jiangmen, China" on first try — nothing fiddly, I wouldn't quit.
- 0 console errors, computes instantly client-side.
- Single most important fix: surface Lilith + the nodes (and ideally a fuller body list)
  ABOVE the collapsed accordions so they're screenshot-able without tapping.

```json
{"tester": "Sam", "round": 8, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["Lilith and lunar nodes hidden inside collapsed house accordions — not screenshot-able at a glance", "Deeper placements require tapping; mobile users screenshot what's on screen"], "priorConcernsAddressed": "n/a"}
```
