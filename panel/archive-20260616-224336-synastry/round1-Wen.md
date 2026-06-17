# Round 1 — Wen (Marketing data analyst)

Tech: high-medium, desktop/two monitors. Stack: BigQuery/SQL, Sheets, Looker, dbt, GA4.
Astrology stance: casual curious skeptic — wants to finally understand "rising sign" and houses without learning to read a wheel.

## 1) Advocacy: 6/10 — probably NOT unprompted
I'd send it to one specific friend who keeps asking me "what's my rising sign mean" — but I wouldn't bring it up myself. It does the one thing it promises (plain-English placements, no wheel, no signup) and the explanations are genuinely readable. What holds it back is exactly the thing my brain snags on: it asserts placements but never shows the derivation. The summary card says "☽ Leo Moon" / Einstein "☽ Sagittarius Moon," but the houses table only shows the *house-cusp sign* — there is no per-planet sign and ZERO degrees anywhere. I can't reconcile "Sagittarius Moon" with "Moon sits in House 6 (Scorpio cusp)" without trusting the black box. For a tool aimed at someone who distrusts invisible transforms, "show me the longitudes" is the missing 3 points.

## 2) Value: Yes
Today I'd paste my details into astro-seek or Co-Star and then squint at a wheel I can't read, or google each placement one at a time. This collapses that into one screen of plain-English sentences keyed to MY house+sign+planet combos — that's a real time save over decoding a chart wheel. The per-placement copy is specific, not horoscope-filler (e.g. "Scorpio in the sixth means work is pursued with obsessive focus" vs "Capricorn in the eighth means transformation through hard work" — distinct, not boilerplate across ~12 rows).

## 3) Clarity: Yes
Within 5 seconds the H1 "Your birth chart, explained in plain English" + "Free, no signup" + a "Load example (Einstein)" button told me what it is, who it's for, and how to start. The example button is the right call — I clicked it before entering my own data and immediately got the gist. The houses-as-rows table (House / Sign / Planets / Nodes) reads like a normal table, which I prefer over a wheel.

## Likes
- Plain-English, non-repetitive explanations tied to the specific sign+house+planet (not copy-pasted filler).
- Element distribution bar math is internally consistent: Einstein 4+5+1+1=11, mine 2+4+0+5=11, both labeled "11 placements."
- "For your chart" transits correctly reference MY natal Sun (Cancer) / Moon (Leo) — internally consistent with the summary card. Nice touch.
- Cancer/Leo cusp call (born Jul 22 → Cancer Sun) and Pluto-retrograde-2026 both check out against what I half-remember. Credible enough.
- Genuinely no signup; "computed on your device" stated up front; honest one-liner that share-links DO send data to a server (appreciated the transparency).

## Defects / friction (data-analyst lens)
- NO DEGREES, NO PER-PLANET SIGN. The table shows house-cusp signs only, so I cannot verify a planet's stated sign (Moon Sagittarius/Leo) against the grid. This is THE blocker for a "how was it derived" user. Add planet sign + degree (e.g. "Moon 17° Sagittarius") per row.
- City field needs real keystrokes to trigger suggestions, and `.fill()`-style paste silently fails with "Please select a place from the suggestions" — a paster would think it's broken.
- Suggestion labels are geocoder jargon: "London, 08, CA", "Shanghai, 23, CN" — region codes are opaque; show province/state names.
- Some planets (Jupiter, Venus/Neptune/Pluto/Chiron stacks) had no explanation when expanded — empty rows make it feel half-finished.

```json
{"tester": 1, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 6, "topComplaints": ["No degrees or per-planet sign shown — can't verify placements against the house table (black-box derivation)", "City autocomplete only fires on real keystrokes; pasted city fails with a confusing 'select from suggestions' error", "Suggestion labels use opaque region/country codes (e.g. 'Shanghai, 23, CN')"], "priorConcernsAddressed": "n/a"}
```
