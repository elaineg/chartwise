# Marcus — round 6

Advocacy 9/10
Value Yes
Clarity Yes

PRIOR BLOCKER (round 5 city search): RESOLVED. This was my one hard blocker and it's genuinely fixed.

- City search now disambiguates with state/region on EVERY row, and ranking is sane:
  "Berlin" -> "Berlin, Germany" first, then "Berlin, NH/NJ/WI/MD/MA/PA, United States" — no
  more identical "Berlin, United States" rows. "Austin, TX" first, "Paris, France" first,
  "Springfield, MO/MA/IL/OR…" all state-tagged. My non-techy-friend-picks-wrong-city fear is gone.
- Same-sign plain-English readings read distinctly per planet: Einstein's Pisces Sun ("identity
  fluid and deep") vs Sagittarius Moon ("need freedom and forward movement") are clearly different
  copy, not template fill. My own chart (Leo Sun H9 / Libra Moon H12) read just as distinctly.
- Share flow is the part that'd actually make me drop it in Slack: "Create share link" returns a
  real persistent URL (/chart/<id>), and the unfurl is PER-CHART — og:title "Albert Einstein's
  birth chart, explained" + a dynamic per-chart opengraph-image. Cold-loading the share URL renders
  the full reading with 0 console errors. That's the bit most free tools fumble.
- Save-as-image works: downloads a clean PNG (albert-einstein-chart.png). Degrees + retrograde (℞)
  shown, full house grid, element-distribution bar, and a "Today's Sky" transit panel with a
  plain-English transit summary. No janky CSS, no layout shift, no hydration errors anywhere.
- Only thing keeping it off a 10: the house-grid cells expand to a "—" / minimal detail in several
  rows rather than a sentence, so the rich plain-English copy lives only in the top reading block —
  the grid feels like the "data" half and is less rewarding to click. Minor, not a blocker.

```json
{"tester": 1, "round": 6, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["house-grid cell expansion often shows just a dash instead of plain-English detail", "save-as-image button only on the saved-chart card, easy to miss vs the live reading"], "priorConcernsAddressed": "all"}
```
