# Rob — Round 1 (synastry)

**Persona:** freelance brand/visual designer, casual-curious-skeptic, skims fast, bounces on dense data. Desktop + 375px mobile.

## 1. What I tried / what happened
Cold load → clean monochrome page, clear tagline "Your birth chart, explained in plain English." Hit LOAD EXAMPLE (EINSTEIN), chart drew instantly (0 console errors). Found "COMPATIBILITY / Compare two people" card sitting right ABOVE the "Today's Sky" transit card — spotted it in ~3 sec. Clicked COMPARE TWO PEOPLE → auto-loaded Einstein × Michelle Obama in ~5s. Two genuinely DISTINCT charts (Einstein Sun Pisces / Obama Sun Capricorn). Sanity-checked natal chart on mobile: not broken, placements consistent (Sun 23°30' Pisces both views).

## 2. What worked / what was broken
WORKED:
- Top of compare view is great: "Compatibility, explained — how two charts get along, in plain English," then a side-by-side big-three (Person A / Person B Sun-Moon-Rising). That's exactly the fun, legible thing a skeptic wants.
- HONEST: no fake "87% match" score. Headline is "30 HARMONY · 15 TENSION · 5 CONJUNCTION" + one plain sentence. I trust counts over a made-up percentage.
- Mobile (375px): no horizontal overflow, Person A/B columns + element bars stack cleanly. Nothing clipped or double-rendered.
- House-overlay blurbs ARE pair-specific ("Your Sun in their Eighth House creates intensity...").

BROKEN-ish (my real gripe):
- The "KEY ASPECTS" list is ~50 rows but only ~7 unique explanation templates. "Saturn ⚹ Mars" and "Chiron ⚹ North Node" get WORD-FOR-WORD identical text: "A sextile between these bodies creates an easy cooperative opportunity — the themes they govern support each other naturally." Every sextile is one boilerplate, every trine another. It explains the aspect TYPE, never what Saturn-vs-Mars actually means between these two people. After 4 rows I stopped reading — it became wallpaper.
- Page is enormously long for what it says. 50 near-identical paragraphs = a dense reference dump, the exact thing that makes me bounce.

## 3. Would I use / recommend?
The big-three side-by-side and honest harmony/tension count I'd actually show a curious friend — that part is fun and legible. But the aspect list is padding. I'd screenshot the top summary and never scroll the rest. To recommend it I'd need the key aspects trimmed to ~5 and written per planet-pair, not per aspect-type.

- ADVOCACY: 6
- VALUE: Marginal — the summary card delivers; the long aspect list does not
- CLARITY: Yes — header + big-three + honest counts land within 5 seconds
- DOMINANT COMPLAINT: 50 aspect rows recycle ~7 identical type-templates — reads like padded wallpaper, not a plain-English read about THESE two people.

```json
{"tester": 0, "round": 1, "clarity": "Yes", "value": "Marginal", "advocacy": 6, "topComplaints": ["Key Aspects list = ~50 rows but only ~7 unique blurb templates; identical text repeats verbatim (Saturn⚹Mars == Chiron⚹NorthNode)", "Compatibility page is far too long/dense for a skimmer — only the top summary card is worth reading"], "priorConcernsAddressed": "n/a"}
```
