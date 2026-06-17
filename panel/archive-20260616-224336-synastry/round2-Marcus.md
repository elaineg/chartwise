# Marcus — round 2

**Round-1 → round-2 advocacy movement: 8 → 9.** Both things that held me off last round are fixed for me.

- **Blocker (a) broken city geocoder — FIXED.** I searched the cities I'd actually use: "Austin" → "Austin, United States" ranks first; "Paris" → "Paris, France" before Paris TX; "London, UK" → "London, United Kingdom" resolves first and the alias works. Readable country names, famous cities on top. No more obscure namesakes or raw region codes. This is the single biggest win.
- **Blocker (b) templated/lowercase transit copy — FIXED.** The transit feature is "Today's Sky" (dated Tuesday, June 16, 2026) with properly capitalized planet names (Sun, Moon, Mercury) and natural sentences: "Saturn is currently in Aries, the same sign as your natal Mercury. The qualities of Saturn and Mercury are activating the same area of your chart right now." Reads like a human wrote it, not a mad-lib.

## 1. ADVOCACY: 9/10
This is now drop-in-the-group-chat ready. Cold load is clean — bold H1 "Your birth chart, explained in plain English," "Free, no signup," one obvious "Load example (Einstein)" button. Computed my own Austin chart in seconds; the "YOUR CHART, IN PLAIN ENGLISH" section sits right above the houses table with real prose per placement (Sun = core identity, Moon = emotional world, Rising = how others see you). No console errors, no janky CSS, fast. I'd post this unprompted. Not a 10 only because the three "FOR YOUR CHART" transit bullets reuse the exact same sentence frame ("X is currently in Y, the same sign as your natal Z... activating the same area of your chart right now"), which reads slightly robotic on a second look — the one spot that still smells templated.

## 2. VALUE: Yes
I don't believe astrology predicts anything, but the value here is a polished, free, no-signup explainer I can share. It does the job: enter or load a chart, get plain-English meaning instantly, see today's sky tied to your chart, copy a share link. That's genuinely more useful and far less intimidating than astro-seek's wall of glyphs.

## 3. CLARITY: Yes
Within 30 seconds the H1 + subhead + example button told me exactly what it does and who it's for. Loaded the example and immediately understood the plain-English readout.

Share: "Create share link" button fired with no JS error (copy verified visually; clipboard read blocked in test env).

```json
{"tester": 0, "round": 2, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["The three 'FOR YOUR CHART' transit bullets reuse the identical sentence frame, reading slightly templated"], "priorConcernsAddressed": "all"}
```
