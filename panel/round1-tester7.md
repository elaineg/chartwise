# Round 1 — Tester 7

- **Persona:** Aisha — product designer, judges craft hard (spacing, copy tone, empty states), in-audience (reads her chart for fun)
- **In-audience:** yes

**Clarity: Yes.** "Your birth chart, explained in plain English." + "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" told me exactly what it is in under 10 seconds. The PRECISE / BIG 3 toggle is self-evident. The BIG 3 helper line — "Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest." — names a real tool and frames the use case perfectly. This is copy written by someone who gets the user.

**Value: Yes.** Today I read my chart on Co-Star, which gives vibes-y blurbs but no actual *explanation* of placements/houses. This gives plain-English readouts plus an element distribution and a transparent estimate path when I don't have my birth time — that's genuinely better than what I use. Save + share-an-estimate is clear and honest (it doesn't pretend the estimate is precise), which I respect.

**Advocacy: 9.** I'd bring this up unprompted in a designer Slack — it's the rare astrology tool that feels *designed*, not slapped together. Held back from 10 only because the result page is one very long scroll with no in-page nav/anchors to jump between Big-Three / elements / houses / today's sky.

**What worked**
- BIG 3 form: generous spacing, quiet uppercase tracked labels, no cramping. Empty state ("Your explained chart will appear here / Enter your birth data…") is calm and correct.
- "ESTIMATED CHART" card: even padding, honest muted disclaimer + a "How this works" explanation. The big-three summary line confirms exact inputs.
- Share link round-trips perfectly in a FRESH context: name "Aisha's chart", inferred "1991-08-16", "ESTIMATED CHART" label, "(reference)" tag on the anchor city, and a "Create your own chart →" CTA all reload. Excellent.
- Element distribution bar chart is a lovely restrained data viz, cleanly aligned.
- Diana × Charles compatibility example loads fully — both Big Threes, per-person elements, "40 harmony · 20 tension · 5 conjunction" with a plain-English readout.
- Precise flow legible in ~1s; geocode shows a ✓ and coords. No app console errors (a `<select>` glyph rendering, share copy, all clean; clipboard read blocked in test env only).

**What could be sharper (no blockers)**
- "Today's Sky" (current transit, Cancer Sun) sits right above the natal readout; I briefly mistook it for my Sun. The "Today's Sky · Friday, June 26, 2026" heading does disambiguate, but a hair more visual separation between transit and natal sections would prevent the double-take.
- Long single-scroll result; would love sticky section anchors.

```json
{"tester": 7, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Today's Sky transit panel sits too close to natal readout — momentary 'is that my Sun?' confusion", "Result page is one very long scroll with no in-page section nav/anchors"], "priorConcernsAddressed": "n/a"}
```
