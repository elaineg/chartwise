# Marcus — Round 1 (synastry)

**Persona:** Frontend eng, 2yr, casual-curious-skeptic. Tests on desktop Chrome + 375px mobile. Judges polish hard, shares slick free tools in team Slack.

## 1. What I tried & what happened
Loaded cold, hit "Load example (Einstein)" → full natal chart in <2s. Hunted for the compare entry: found "Compare two people" sitting directly under the "Albert Einstein" chart header, ABOVE "Today's Sky" (transit). Discovery was instant (~1.6s, it's the first button after the chart title). Clicked it → auto-loaded Einstein × Michelle Obama, two genuinely distinct charts (Pisces/Sag/Cancer vs Capricorn/Pisces/Virgo). Read the whole compatibility view, then "← Back to chart" cleanly restored the natal view.

## 2. What worked / what was confusing or broken
WORKED (a lot):
- Discoverable: yes, obvious, correctly placed above transit.
- Clear in 5s: "Compatibility, explained — How two charts get along, in plain English." Big-three side-by-side (Person A | Person B), element-distribution bars, then KEY ASPECTS + HOUSE OVERLAY (bidirectional, "X's planets in Y's houses"). Every aspect has a plain-English blurb. I could read it with zero astrology literacy.
- HONEST: no fake "87% match" score. Header reads "30 HARMONY · 15 TENSION · 5 CONJUNCTION" and I counted the cards — exactly 30/15/5. Math is real, not invented. Big credibility win for a skeptic like me.
- Mobile (375px): genuinely impressive. No horizontal scroll (scrollWidth==clientWidth==375), Person A/B stay two-column with a divider and nothing truncates ("Sun Capricorn"/"Rising Virgo" all fit), element bars render clean. Zero console/page errors desktop OR mobile.

BROKEN / silently-wrong value (my dominant flag):
- "Sun ⚹ Sun · SEXTILE · 3.6° ORB" shows the blurb **"Sharing the same Sun sign creates a strong sense of recognition... your core energies pull in the same direction."** But Person A is Pisces Sun and Person B is Capricorn Sun — NOT the same sign (they're 60° apart, hence the sextile). The same-planet blurb is keyed off the planet pair only and wrongly hardcodes a "same sign" claim for any Sun-Sun aspect. As a dev this reads like a copy/logic bug I'd flag in review — and a skeptic will catch it and trust the whole thing less.
- Minor: the long KEY ASPECTS list (~50 aspects) is mostly generic "a trine makes these flow together effortlessly" filler; the good specific blurbs (Venus/Saturn, Mercury/Sun) are buried. No top-N highlight.

## 3. Would I use / recommend it?
Yes — this is exactly the slick, free, no-signup thing I'd drop in the group chat ("run you vs your ex"). The honesty (real counts, no fake %) is what makes me actually willing to vouch for it instead of rolling my eyes. The Sun-Sun "same sign" wrong-copy is the one thing keeping me from an unprompted share, because that's precisely the kind of glitch my friends would screenshot and dunk on.

- **ADVOCACY: 8/10** — would share, with a wince at the Sun-Sun copy bug. Fix that and trim the filler aspects → 9.
- **VALUE: Yes** — vs nothing/google "synastry calculator" (ad-walls, paywalls, jargon), this is instant, free, plain-English.
- **CLARITY: Yes** — understood it in 5s; "Compatibility, explained" + side-by-side big-three carried it.
- **DOMINANT COMPLAINT:** "Sun ⚹ Sun" sextile blurb falsely says "sharing the same Sun sign" when the two charts have different Sun signs (Pisces vs Capricorn) — silently-wrong copy a skeptic will catch.

```json
{"tester": 1, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["Sun sextile Sun blurb wrongly claims 'same Sun sign' when signs differ (Pisces vs Capricorn) — silently-wrong copy", "~50-aspect list is mostly generic filler; specific good blurbs buried, no top-N highlight"], "priorConcernsAddressed": "n/a"}
```
