# Round 8 — Marcus (frontend eng, casual-curious-skeptic, in-audience)

**Value: Yes** — **Clarity: Yes** — **Advocacy: 8**

I don't believe a word of astrology, but this is exactly the slick, free, no-signup
chart explainer I'd drop in the group chat. Headline "Your birth chart, explained in
plain English" + "Free, no signup" nailed what it is in <10s. Computes client-side,
share link is opt-in with a clear privacy note — I respect that.

## 5 QA items (anchor: 1998-08-08 16:30 Jiangmen)
1. NODES — PASS. Dedicated NODES column. North Node 2°07' Virgo / South Node 2°07'
   Pisces — own sign + degree, and they're correct opposites. Reads clearly.
2. LILITH — PASS. "Black Moon Lilith 26°25' Libra" in House 10. Matches target.
3. ARCMINUTES — PASS. Everywhere: Sun 15°36' Leo, Asc 6°21' Capricorn, MC 18°41' Libra.
   Verified on a 2nd chart too (Sun 1°00' Aries). No floor-truncation.
4. ELEMENT BASIS — PASS. "Based on 11 placements: Sun, Moon, Mercury…Pluto, Chiron"
   right under the bar. Honest and legible.
5. SAVE AS IMAGE — GONE. No trace in DOM. Good riddance, it was the janky part.

## Regression / polish
- Core flow clean: city autocomplete, houses table, plain-English readings, element
  bar, Today's Sky transit w/ retrograde callout. ZERO console errors across 3 computes.
- Share link fires, label flips to copied (clipboard read blocked in test env — copy
  verified visually, not a bug).
- Nit (I notice CSS): planet chips in the houses table truncate, e.g. "Black Moon
  Lilith 26°2…". A tooltip or wider chip would finish the polish.

## Answers
1. Use & advocate? Yes — I'd share it unprompted in our signs-joke Slack.
2. Advocacy: 8
3. Most important fix: stop truncating long body labels (Lilith/nodes) in the houses
   table — it's the one spot that still looks slightly unfinished.

```json
{"tester": 1, "round": 8, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["Long body labels (Black Moon Lilith) truncate in houses-table chips", "No tooltip/expand to read the cut-off degree"], "priorConcernsAddressed": "all"}
```
