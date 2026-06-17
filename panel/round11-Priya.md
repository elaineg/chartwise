# Round 11 — Priya (Senior backend SWE, hard astrology-skeptic)

Tested cold at localhost:3099, desktop 1440px, keyboard-first. Loaded Einstein example,
read houses table, element grid, placement readings, Today's Sky transit card, created
+ opened a share link. Inspected network.

## Re-judged items

**(a) Element distribution — comparable AT A GLANCE without reading numbers? YES.**
The fix landed and it works. Rows sorted dominant-first (Earth 5 / Fire 4 / Air 1 / Water 1),
proportion bars whose length tracks count, AND a grey-value ramp (Earth black → Water pale).
Double-encoded, so I read "Earth-dominant, Earth+Fire heavy, Air/Water trace" in under a
second without parsing a single digit. Dominant row's larger numeral ("5") is a nice anchor.
Best-designed component in the app. Nit: Earth 5 vs Fire 4 are near-equal in bar length but
the black→dark-grey jump visually overstates that gap; and Air vs Water (both 1) differ in
grey only by sort order, faintly implying Air>Water. Both trivial.

**(b) Monochrome SSENSE look — appealing / legible / trustworthy? YES on all three.**
Restrained, high-contrast, generous whitespace, Archivo type. Reads like a serious editorial
tool, not a glitter-and-zodiac-wheel astrology site — which is the ONLY reason a skeptic like
me would tolerate it. Legibility is strong; the all-caps grey microlabels (HOUSES, ELEMENT
DISTRIBUTION) are tasteful, not shouty. Trustworthy because the craft signals competence.

## Craft / privacy checks
- Client-side claim is real: loading + computing a chart fires ZERO off-origin requests for
  birth data (only a Google Fonts CSS call). Share link is explicitly honest: "Creating a
  share link sends this chart's birth info to our server" — opt-in, clearly stated. I respect
  that copy. Share URL (/chart/<id>) returns 200 and renders the shared chart. No signup
  anywhere. This is the bar I'd want and most tools fail.
- Placement readings are plain-English paragraphs per planet; coherent, no jargon dump.
- Houses table is clean and scannable. Transit card ("Today's Sky") is correct-looking and dated.

## Verdict
**Value: No** — I'm a hard non-fit. Astrology is pseudoscience to me; I'd never open this for
myself, no craft fixes that. This is a category problem, not an app problem.
**Clarity: Yes** — H1 + "explained in plain English" + "no signup" told me exactly what it is
and who it's for inside 10 seconds. Nothing confused me.
**Advocacy: 4/10** — Up a point from the category floor purely on craft: if a friend ASKED for
an astrology chart tool I'd send them this over astro-seek because it's free, no-signup,
client-side, and legible. I'd never bring it up unprompted, because I don't believe in the
underlying thing. The 4 is honest, not polite.

```json
{"tester": 6, "round": 11, "clarity": "Yes", "value": "No", "advocacy": 4, "topComplaints": ["Category non-fit: astrology is pseudoscience to me, no craft fix changes that", "Earth(black)→Fire(dark-grey) grey jump slightly overstates a near-equal 5-vs-4 bar gap"], "priorConcernsAddressed": "all"}
```
