# Round 1 — Tester 9 (Elena)

**Persona:** Elena — engineering manager, 8 reports, half her day in meetings, 30-sec
patience, casual-curious astrology skeptic, would glance at her chart + a coworker's on her
phone between meetings. Tested at 375px (phone).

**Clarity: Yes.** Cold open landed in <5s: "Your birth chart, explained in plain English"
+ "Free, no signup". The PRECISE / BIG 3 toggle is obvious. BIG 3 helper "Know your Sun,
Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest" maps
exactly to how my team talks about signs in Slack — I knew instantly it was for me.

**Value: Yes.** Today I'd half-remember my Co-Star signs and have nothing to do with them.
BIG 3 let me name a chart ("Elena"), pick Sun/Moon/Rising + birth year, and get a real
plain-English readout in seconds with zero setup. The estimate is honestly labeled
("ESTIMATED CHART", "this is an approximation", "How this works" explainer) so I trust it.
Share link round-trips perfectly: a fresh open reloaded the name, the Big Three, AND the
ESTIMATED label — I'd drop that link in our team channel without a second thought.

**Advocacy: 8.** I'd genuinely bring this up in Slack ("no signup, instant, share your Big 3")
— exactly our kind of between-meeting fun. Not a 9 because it's a delightful toy, not a
recurring work need; the share link being localhost-shaped is fine, but discovery of the
Compatibility/Compare feature only appears AFTER you compute a chart, so a first-timer
might miss the best party trick.

**In-audience:** yes

**What worked:**
- BIG 3: name + 3 dropdowns + year + Estimate = a complete chart, fully client-side, no setup.
- Form comfortably spaced; cards (result chips, "How this works", share box) have even padding.
- Share link /chart/<id> reloads name + Big 3 inputs + "ESTIMATED CHART" label on a fresh load.
- Precise flow: date + autocompleted "New York City" + Compute = Sun/Moon/houses in ~3.5s.
- Compatibility: Diana × Charles loads as a clean 2-column Person A/B summary, plain English.
- Zero console/page errors across every flow.

**What broke / friction:**
- Compatibility entry point is hidden until you compute a chart — bury-the-lede on the
  most shareable feature; surface it from the landing page.
- "Copy link" — clipboard read blocked in test env; copy verified visually (button + link
  field present), NOT a product bug.
- Nit: estimated charts always anchor to "New York, USA (reference)" — fine, but a curious
  user might wonder why their location shows NY.

```json
{"tester": 9, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["Compatibility/Compare feature is hidden until after you compute a chart — the most shareable feature is buried", "Estimated charts always show 'New York, USA (reference)' which may confuse a curious user"], "priorConcernsAddressed": "n/a"}
```
