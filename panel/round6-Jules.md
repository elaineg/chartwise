# Jules — round 6

**ADVOCACY: 9/10**
**VALUE: Yes**
**CLARITY: Yes**

## Prior concerns (round 5) — re-checked first
- **Duplicate place-search rows: FIXED.** Typed "Lisbon" → 8 clean rows, each disambiguated
  (Lisbon, Portugal / Lisbon, ME / CT / OH / IA / ND, United States) with ZERO exact-duplicate
  rows. "Springfield" → MO/MA/IL/OR/OH/VA/PA/TN, all distinct. The old undifferentiated
  "Lisbon, United States" repeats are gone. This was my main gripe and it's genuinely solved.
- **Per-chart og:image: FIXED & impressive.** The /chart/<id> unfurl renders a real per-chart
  card showing MY big-three (Cancer Sun H9 · Leo Moon · Scorpio Rising), date, and
  Lisbon, Portugal. That's exactly the shareable artifact I wanted — I'd post that.
- **Same-sign readings now distinct per planet: confirmed** — Cancer Sun vs Jupiter/Venus in
  Cancer all read differently, not copy-pasted.

## What still holds it back (the 9, not a 10)
- **og:image:alt is STILL the generic string "Birth chart card"** — my exact round-5 nit, not
  fixed. The rendered image is per-chart but the alt attribute isn't. Minor/a11y-only, but it's
  the same line item I flagged.
- **No one-tap native / X share on mobile.** Sharing is still "Create share link" → copy to
  clipboard. As a mobile-first poster I want a native share-sheet or an "Share to X" intent
  button so I'm one tap from posting, not copy→switch app→paste. This is THE thing between 9 and 10
  for a shareability persona.
- Unnamed charts unfurl as "My Chart's birth chart" — slightly awkward in a public post; default
  to the big-three or city when no name is entered.

## What's great
- Mobile 375px experience is clean and fast; example loads instantly, readings are warm plain
  English, no signup, computed on-device. Save-as-image downloads a tidy `albert-einstein-chart.png`.
- This is squarely my "ask everyone their big-three" use case — I'd send it to friends and use it
  repeatedly.

```json
{"tester": 0, "round": 6, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["No one-tap native/X share button on mobile — still copy-link only", "og:image:alt still generic 'Birth chart card' (round-5 nit not fixed)", "Unnamed charts unfurl as 'My Chart's birth chart'"], "priorConcernsAddressed": "some"}
```
