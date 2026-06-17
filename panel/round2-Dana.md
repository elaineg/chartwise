# Dana

Demand-gen marketer, medium-tech, curious-about-astrology, ruthless about time. Round 2 — focus: the rebuilt "Compare two people" / synastry.

## Re-check of my Round 1 complaints
- **Generic/repetitive aspect blurbs** — PARTIALLY fixed. The default top 6 (Sun⚹Sun, Mars☌Sun, Moon△Jupiter, Mercury⚹Sun…) are specific per planet-pair and actually good. But the long tail behind "Show all 50 aspects" is still boilerplate — 40 of 50 reuse 5 canned lines ("A trine here makes these two themes flow together effortlessly", "The square here creates a recurring challenge…"). So they hid the repetition behind a toggle instead of killing it. Improvement, not a cure.
- **No share button** — FIXED. "Create share link" appears after computing; copy is honest about sending birth data to the server. (Clipboard read blocked in my headless env — copy verified visually, label changed on click; not reporting as a bug.)
- **Mobile compare didn't scroll to result** — PARTIALLY fixed. It now auto-scrolls, but lands mid-page on the element-distribution bars, OVERSHOOTING the "Compatibility, explained" header AND stopping short of the Key Aspects I tapped to see. I have to scroll up to see who's compared or down to find the aspects.

## The three questions
1. **First impression** — The compare view is a real glow-up. "Compatibility, explained — How two charts get along, in plain English, free, no signup." Big-three side-by-side (Sun/Moon/Rising for both), element bars per person, and "30 HARMONY · 15 TENSION · 5 CONJUNCTION" with a plain-English summary — NO fake % match. That honesty is exactly what I'd screenshot. Top aspects are correctly the relationship-significant ones, each fully directional with both names: "Albert Einstein's Sun ⚹ Michelle Obama's Sun · 3.6° orb · HARMONY." This is the thing I wanted in R1.
2. **Use it for a real task?** — Yes. I'd pull up me × a coworker/partner and screenshot the top 6 + the harmony/tension count for the friends channel. Natal chart still works fully (placements, ℞, arcminutes, houses).
3. **What stops me recommending higher?** — Two things. (a) Discoverability: "Compare two people" only appears AFTER you compute a natal chart — nothing above the fold says this app even does compatibility. A first-timer who came for synastry sees only a birth-chart form and may bounce in one scroll (that's literally me). (b) The long-tail boilerplate: if a friend taps "Show all 50" they hit a wall of 5 repeated sentences, which cheapens the great top section. Minor: no "Show fewer" to re-collapse, and the mobile scroll lands on the wrong anchor.

## Scores
- **Advocacy: 8/10** (up from 7). The top-aspect quality, honest framing, and the share button earned the bump. Held back from 9 by hidden discoverability of compare + the boilerplate long tail.
- **Value: yes** — clear and real; I'd use it weekly to screenshot charts for the team.
- **Clarity: partially** — the natal chart is instantly clear; the compatibility feature is hidden until you compute, so a synastry-seeker doesn't get clarity in one scroll.

**Dominant note:** The KEY ASPECTS rebuild nailed it — top 6 are specific, directional, fully named, and the framing is honestly non-gimmicky (no fake % match). The remaining drag is that compare is buried behind computing a chart first, so the thing they fixed isn't even visible on arrival.

```json
{"tester": 0, "round": 2, "clarity": "Partially", "value": "Yes", "advocacy": 8, "topComplaints": ["Compare/synastry is hidden until you compute a natal chart first — not discoverable above the fold for someone who came for compatibility", "Long-tail behind 'Show all 50 aspects' is still 40/50 boilerplate (5 canned lines) — repetition hidden behind a toggle, not removed", "Mobile compare auto-scroll overshoots the result header and stops above the Key Aspects, landing mid-page on element bars"], "priorConcernsAddressed": "some"}
```
