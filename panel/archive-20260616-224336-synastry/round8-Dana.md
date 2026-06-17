# Round 8 — Dana (demand-gen marketer, in-audience, mobile-first)

**Value: Yes** — I look up my own/partners'/coworkers' charts; today I'd Google a sign or
open Co–Star. This explains a *full* natal chart in plain English, free, no signup, on my
phone in one tap. That's screenshot-to-the-team-channel material.

**Clarity: Yes** — H1 "Your birth chart, explained in plain English" + "Free, no signup"
nails it in the first scroll. "Load example (Einstein)" tells me exactly what I'll get.

**Advocacy: 8**

## 5 QA items (anchor: 1998-08-08, 16:30, Jiangmen China)
1. Nodes w/ own sign+degree: PASS — "North Node 2°07' Virgo", "South Node 2°07' Pisces".
2. Black Moon Lilith as a body: PASS — "Black Moon Lilith 26°25' Libra" (House 10 area).
3. Arcminutes: PASS — 6°21', 15°36', 19°03', etc. No floor-truncation seen.
4. Element basis labeled: PASS — "Based on 11 placements: Sun, Moon, Mercury…" + a
   "1 point excluded" footnote. Clear and trustworthy.
5. "Save as image" gone: PASS — no trace anywhere.
No console errors. Core flow (autocomplete → houses table → readings → element bar →
"Today's Sky" transit w/ retrograde + "FOR YOUR CHART") all worked first try on 375px.

## What holds it back from a 9
- On mobile the input form stays pinned ABOVE the result — after computing I had to scroll
  past the whole form to see my chart. Auto-scroll/collapse the form so the result is the
  first thing I see post-compute.
- No obvious one-tap "share this chart as an image" — the thing that makes me actually post
  it. There's a "Share link" but I screenshot, and a tall result screenshots badly. (Note:
  the *broken* save-as-image was correctly removed; I just still want a clean shareable.)

**Single most important fix:** after Compute, jump the viewport to the result (don't leave
me staring at the form again on phone).

```json
{"tester": 1, "round": 8, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["Mobile: form stays above result after compute; have to scroll past it to see my chart", "No clean one-tap shareable image for the team channel (screenshot of tall result is poor)"], "priorConcernsAddressed": "n/a"}
```
