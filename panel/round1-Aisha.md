# Aisha — round 1

**CLARITY: Yes.** Eyebrow "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" + the H1 "Your birth chart, explained in plain English." landed the whole proposition in under 5s. I'd tell a friend: "paste your birth details, get your chart written out in readable language — no wheel to decode, no login." The subhead naming "type your birth date, time, and place, or load an example" sealed it.

**VALUE: Yes.** Today I'd skim Co-Star or a free natal-chart site that throws a glyph wheel at me. This is the explanation-first, table-not-wheel approach I actually want — the HOUSE / SIGN / PLANETS / NODES table with plain-English row subtitles ("Self & identity", "Money & values") is the thing I'd screenshot into FigJam. Warm, specific planet blurbs, not generic horoscope filler.

**ADVOCACY: 9.** I'd bring this up unprompted in a design Slack. It feels considered: typographic hierarchy, generous whitespace, em-dash empty cells, honest privacy line ("computed on your device"). Held back from 10 only by the one toggle nit below.

**BIGGEST BLOCKER:** The PRECISE/BIG 3 toggle stacked above the full-width black "LOAD EXAMPLE" button on cold load reads as a clumsy black L-shape — for a beat I couldn't tell which tab was active or whether "LOAD EXAMPLE" was part of the toggle. It resolves once you interact, but it's the one sloppy moment in an otherwise crafted UI. Minor, not a bounce.

## BIG 3 flow notes
- **Toggle craft/discoverable:** Discoverable, top-left of input panel. Active state is clear ONCE selected (black fill on BIG 3). The contextual helper copy "Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest." is genuinely considered — names the exact user mindset and references Co-Star.
- **Estimate badge:** Excellent, triple-layered and unmistakable — black "ESTIMATED CHART" pill (top-right) + bordered banner ("Date, time, and place were inferred from your big three — this is an approximation. Enter your full birth date, time, and place for the precise chart.") + "Estimated chart" card header. No way to mistake it for exact.
- **Loading:** Felt intentional — Estimate button greys/disables during compute, result populates ~2.4s later. Polished, not broken.
- **Signs honored:** Yes. Leo/Scorpio/Aquarius all reflected — chips read "Aquarius rising", "Sun 0°22' Leo · House 7", "Moon 10°55' Scorpio". Zero console/page errors across both flows.

```json
{"tester": 1, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["PRECISE/BIG 3 toggle + full-width LOAD EXAMPLE button form a confusing black L-shape on cold load; active tab not instantly readable"], "priorConcernsAddressed": "n/a"}
```
