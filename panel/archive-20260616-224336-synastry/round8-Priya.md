# Round 8 — Priya (Senior backend engineer; keyboard-first; HARD astrology skeptic)

Re-tested cold at http://localhost:3000, anchor chart 1998-08-08 16:30 Jiangmen China, network tab watched.

## Prior complaints (round 1) — re-checked
1. Geocoder brittle (Bangalore→empty): FIXED. `/api/cities?q=Bangalore` now returns 1 result → "Bengaluru, India".
2. Cryptic region codes (London, 08, CA): FIXED. Suggestion reads "Jiangmen, China" — clean readable country name.
3. Expanded-explanation sliver in table cell: FIXED. Expanded block measures 790px wide, renders as a normal full-width paragraph.

## Round-8 QA items — all verified in rendered DOM
1. NODES own sign+degree: PASS. "North Node 2°07' Virgo" (H8) / "South Node 2°07' Pisces" (H2) — exact 180° opposition, correct.
2. Black Moon Lilith: PASS. "Black Moon Lilith 26°25' Libra" in House 10 — matches spec.
3. Arcminutes: PASS. 15°36' Sun, 19°03' Moon, 23°52' Venus, 26°25' Lilith — no floor-truncation.
4. Element basis label: PASS. "Based on 11 placements: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Chiron".
5. "Save as image": GONE. Not present anywhere in DOM.

## Engineer checks
- Client-side compute CONFIRMED: computing the chart fired ZERO API calls. Only server hits were the two disclosed: `GET /api/cities` (geocode) and the share endpoint on demand. Honesty intact.
- Zero console errors, zero page errors. Fast render (~1-2s). Today's Sky transit + "For your chart" aspects render correctly.

## Verdicts
- Value: No (for ME — I don't want a natal chart; category non-fit). Genuinely solid for its actual audience.
- Clarity: Yes. H1 + subhead tell you what it is and who it's for in <10s.
- Advocacy: 4/10. Craft is now a clean ~7 — all three of my real defects fixed, data is internally consistent, no regressions. But ~3 points are dead category weight: I will never want this output and won't raise it unprompted. The +1 over round 1 is honest craft improvement, not category conversion.

## Single most important fix
Nothing blocking on craft. For the target audience: surface the rich expanded explanations for the node/Lilith/outer placements without requiring a per-row ▾ click — the plain-English narrative is the whole value prop and it's currently buried one click deep in the table.

```json
{"tester": 0, "round": 8, "clarity": "Yes", "value": "No", "advocacy": 4, "topComplaints": ["Category non-fit — I won't advocate for astrology regardless of craft", "Node/Lilith/outer-planet plain-English explanations are buried behind per-row ▾ clicks"], "priorConcernsAddressed": "all"}
```
