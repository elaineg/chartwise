# Rob — round 6

**Persona:** Rob, freelance brand/visual designer. Casual-curious-skeptic about astrology. Skims fast, compares to what he'd do himself, low patience for dense data.

## Answers
1. **ADVOCACY: 9/10**
2. **VALUE: Yes**
3. **CLARITY: Yes**

## Place-search ranking — FIXED (confirmed cold)
My round-5 complaint is resolved. Tested live:
- `San Francisco` → **"San Francisco, CA, United States" ranks #1**, above "San Francisco, Argentina" (exact bug I flagged — now correct).
- `Berlin` → "Berlin, Germany" #1, then state-disambiguated US Berlins ("Berlin, NH/NJ/WI..."). No duplicate rows.
- `Springfield` → clean state labels (MO, MA, IL, OR...), no dupes. Disambiguation works.

## Prior concerns — all checked
- **Ranking/disambiguation:** FIXED (above).
- **Same-sign readings distinct per planet:** FIXED — Einstein's Pisces Sun reads differently from his other placements; my Leo Sun / Scorpio Moon / Libra Rising gave a fully distinct, well-written reading. Copy is fun and legible for a skeptic ("your mind moves fast and talks faster... delivers them bluntly"), not manual-speak.
- **Per-chart save-card art:** PARTIAL. Data differs (name, big-three chips with per-planet color accents, element counts), but it's one fixed frame and the decorative wheel art is identical on every card. The one-line card caption was the SAME on both ("Sun in House 11 — career and legacy are central") despite Einstein being House 10 — that line isn't actually per-chart. Still my one open nit.

## Notes
- The 12-house grid (HOUSE/SIGN/PLANETS/NODES) is STILL always-visible and dense — but it now sits BELOW the plain-English reading + a nice colored element-distribution bar, so a skimmer like me gets the payoff first and the manual is optional scroll. Acceptable; I'd still personally collapse it behind a toggle.
- Big-three (Sun/Moon/Rising) front and center — exactly what an idle-curious non-believer wants.
- Save-as-image works (downloaded clean 1200-ish px PNG card, designer-acceptable). Share link works end-to-end (201 from /api/chart-share, real URL to clipboard, page unfurls with per-chart OG title/description/image). Zero console errors anywhere.
- Holds the 9, not a 10: the save card's decorative wheel + generic caption don't reflect the individual chart's geometry — as a designer that's the difference between "shareable" and "I'd post it unprompted."

```json
{"tester": 6, "round": 6, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["save-card art/caption not truly per-chart (same decorative wheel + identical 'career and legacy' line across different charts)", "12-house grid still always-visible dense table; would prefer a collapse/Advanced toggle"], "priorConcernsAddressed": "some"}
```
