# Marcus — Round 4

Frontend eng, 2yr, Chrome+devtools, casual-curious-skeptic. Round-3 advocacy was 9.

## Prior concerns (re-checked first)
- **Degree missing from headline reading** — IMPROVED. Degrees are everywhere in the
  placement labels now (Sun 23° Pisces, Mars 26° Capricorn, Chiron 12° Libra). My probe
  confirms degree info is present alongside the planet. Resolved enough for me.
- **Place-search disambiguation (identical "Berlin, United States" rows)** — NOT FIXED.
  Typing "Berlin" still returns `["Berlin, Germany","Berlin, United States","Berlin,
  United States","Berlin, United States","Berlin, United States",...]` — six identical
  "Berlin, United States" rows, no state/region. As a user I genuinely can't tell which
  is the right one. This is the same defect I flagged in round 3.

## What I tested this round
- Cold load: clean, no console errors, h1 reads right. 200 OK.
- Expanded a placement cell on DESKTOP (Mars, then Chiron in my own chart): confirmed it's
  now `colspan=4`, width 555 == full table width 555, flush to table edges. No longer a
  thin sliver — looks polished, proper padding, no CSS jank. The structure change did NOT
  regress my normal table use: signs, planet dropdowns, nodes column, retrograde (R)
  markers, ASC/MC labels, element-distribution bar all render correctly.
- My own chart via manual compute: rendered fine, plain-English per-placement readings.
- Save as image: "⬇ Save as image" control present and elevated.
- Share: generated `http://localhost:3099/chart/<token>`. Page serves OG tags —
  `twitter:card=summary_large_image`, og:image 1200x630 (200, image/png), per-chart
  title/description. It WILL unfurl with a large preview. (Minor: og:image is a static
  og-default.png, not a per-chart generated card — fine for now.)
- Today/transits section present with de-templated copy (Pluto retrograde note etc.).

## Answers
1. **Advocacy: 9/10.** Same as round 3. The full-width expanded reading and the
   unfurling share link are real polish wins — exactly the things that make me drop a tool
   in the group chat. But the unresolved place-search dupes are the one thing standing
   between 9 and 10.
2. **Value: Yes.** It's a genuinely fun, well-built, free, no-signup chart explainer. I'd
   share my chart and a friend's in Discord. Today I'd just google a sign meaning; this is
   nicer and shareable.
3. **Clarity: Yes.** Headline "Your birth chart, explained in plain English" + "Free, no
   signup" + Load-example button = I got it in under 10 seconds.

## Remaining blocker to a 10
Place search returns multiple identical "Berlin, United States" rows with no
state/region to disambiguate. When I share this in my group chat, a non-techy friend
picks a random Berlin and silently gets the wrong chart — that's a trust-killer for a
share-driven app. Add state/admin region (and maybe population) to disambiguate. Fix
that and it's a 10 from me.

```json
{"tester": 1, "round": 4, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["place search still returns many identical 'Berlin, United States' rows with no state/region to disambiguate", "shared link og:image is a static default card, not a per-chart preview"], "priorConcernsAddressed": "some"}
```
