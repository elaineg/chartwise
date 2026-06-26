# Round 1 — Tester 6 (Jules, content & community marketer, mobile-first, in-audience)

**Persona:** Jules — posts about Mercury retrograde, asks people their big-three, judges on mobile + shareability.

**Clarity: Yes.** Cold on a 375px phone I got it in seconds: "type your birth date, time, place → your natal chart explained in plain English, free, no signup." The kicker "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" and the PRECISE / BIG 3 toggle made the two modes obvious. "Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time?" is exactly how my audience talks — instant trust.

**Value: Yes.** Today I screenshot Co-Star/cafeastrology and retype signs into a Notion doc or just wing it in a caption. Here I picked Sun Gemini / Moon Scorpio / Rising Leo + year, hit ESTIMATE CHART, and got a real explained chart plus an honest "this is an approximation" disclaimer — then a clean `/chart/...` share link I can drop in a Story. That's a genuine time-saver and, more importantly, a *postable* artifact.

**Advocacy: 9.** I'd bring this up unprompted in my group chat and probably post it — free, no login, mobile-perfect, shareable, and it doesn't pretend an estimate is gospel.

**In-audience: yes.**

What worked:
- BIG 3 flow flawless: named it, picked 3 signs + year, ESTIMATE CHART → full chart with prominent "ESTIMATED CHART" + "YOUR BIG THREE — SUN GEMINI · MOON SCORPIO · RISING LEO" + approximation note.
- Share link nailed it: opened `/chart/ma417...` in a FRESH browser (no localStorage) → HTTP 200, restored "Jules's chart", all 3 signs, AND the ESTIMATED label. This is the whole game for me and it works.
- Share URL shown in a copyable readonly field, so it survives even when the clipboard misbehaves (copy verified visually; clipboard read blocked in test env — not a bug).
- Compatibility / Diana × Charles example loads pre-filled and reads beautifully: Person A/Person B columns, element bars, "40 HARMONY · 20 TENSION · 5 CONJUNCTION ... easy-flowing dynamic" + "For insight and fun — not a prediction." Honest framing I'd happily share.
- Spacing is comfortable, not cramped; bordered sign boxes have even padding; element-distribution bars are a nice visual.
- Precise flow works fast: city autocomplete, computes in ~1s, correctly NO estimated label.

What broke / nits:
- Minor: the "Compare two people" entry point and compatibility section only appear AFTER you compute/estimate a chart — not discoverable from the bare homepage. I almost missed the feature; surfacing a hint up top would help.
- Minor: clicking the COMPATIBILITY link scrolled me back near the form top rather than smoothly to the compat panel on mobile — felt slightly disorienting, not broken.
- No native "Share" sheet / X / story button — I get a copyable URL but a one-tap mobile share would make me a 10.

```json
{"tester": 6, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Compatibility/Compare-two-people not discoverable from bare homepage — only appears after a chart is computed", "No native one-tap mobile share sheet (only a copyable URL)"], "priorConcernsAddressed": "n/a"}
```
