# Elena — Round 4

Engineering manager, casual-curious-skeptic, mobile-heavy, 30-second patience. Tested cold on 375px + checked desktop.

## Prior concerns re-checked (my round-3 9→10 item)
- **Same-sign natal readings still repeat verbatim — NOT fixed.** In the top "YOUR CHART, IN PLAIN ENGLISH" cards, *Aries Mercury* and *Aries Venus* both open with the IDENTICAL sentence: "Bold and direct, you lead with instinct and act before you overthink. You thrive on being first." They only diverge on the house tail. Same templating smell I flagged. (Note: the in-TABLE sign readings ARE house-aware and distinct — house 1 Cancer "warm, protective presence" vs house 2 Cancer "money feels better saved" — so the fix landed in the table but not in the headline cards.)

## Round-4 changes verified
- **Desktop full-width expanded reading: works, no regression.** Clicked Moon (house 6) — reading renders as a clean full-width panel under the row, chevron flips to up-arrow, two expansions coexist, table realigns fine. Zero console errors across every table interaction. The structure change did NOT break anything.
- **Share /chart/<token>: page loads (200), renders full chart + reading.** BUT the preview image is a generic static `og-default.png`, not a per-chart image — and it 404s on localhost (likely prod-only, treating as env artifact). For me that's fine; a Slack unfurl with any card is acceptable.
- **Save-as-image card: visually elevated, present** (top-right of result card). Couldn't capture a download event in headless (canvas/blob — env artifact, not reported as a bug).

## 1. Advocacy: 8 (was 9)
Down one. Not because anything broke — the de-templated transit copy ("Mars charges through Taurus where your natal Neptune lives") is still the standout and exactly my hook. The drop is honesty: I went looking at my own placements this round and the FIRST thing I'd show a teammate is the plain-English cards, and two of them are word-for-word identical openers. That's the exact tell that makes a skeptic say "oh, it's just a template" — and it's right at the top, not buried in the table. A 9 needs me to not flinch when I read it cold.

## 2. Value: Yes
My real today is glancing at astro-seek / co-star on my phone between meetings. This is faster, instant, no signup, and the per-placement plain English + "FOR YOUR CHART" transit lines are more legible than astro-seek's wall of glyphs. Saves real time.

## 3. Clarity: Yes
"Your birth chart, explained in plain English" + "Free, no signup" + Load example — I knew what it was and who it's for in under 10 seconds.

## Remaining blocker to a 10
De-template the headline plain-English cards the way you already did the table: two placements in the same sign must not open with an identical sentence. Make the planet (Mercury vs Venus) change the opener, not just the house tail. Fix that and I'm back to 9, and a chart where every card reads bespoke gets me to 10.

```json
{"tester": 1, "round": 4, "clarity": "Yes", "value": "Yes",
 "advocacy": 8, "topComplaints": ["Headline plain-English cards still repeat verbatim for same-sign placements (Aries Mercury & Aries Venus share an identical opening sentence) — visible templating smell at the top of the page", "Share og:image is a generic static og-default.png, not a per-chart preview"], "priorConcernsAddressed": "some"}
```
