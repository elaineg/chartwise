# Jules — round 2

**Round-1 → round-2 movement: 8 → 8** (held flat — two real fixes landed, but the share preview gap and templated transits keep me from going higher.)

## Prior concerns — fixed?
- **Plain-English reading surfaced by default:** FIXED. "YOUR CHART, IN PLAIN ENGLISH" now sits right above the houses table with color-coded planet cards. Reads natural, proper caps, no jargon wall. This is the thing I'd actually screenshot.
- **City geocoder country names / "City, Country" / aliases:** PARTLY FIXED. Country names are readable now ("United States", "Germany"); "Berlin, Germany" resolves with Berlin top. BUT typing "Austin" gives FOUR identical "Austin, United States" rows with no state — I can't tell which is Austin, TX (the exact round-1 pain, just dressed differently). And "NYC" returns garbage Ukrainian/Irish towns — no New York at all. Aliases do NOT resolve.
- **Templated/mad-lib transit copy:** PARTLY FIXED. Capitalization/dates are clean now. But "FOR YOUR CHART" still spits 4 near-identical sentences: "X is currently in Y, the same sign as your natal Z. The qualities of X and Z are activating the same area of your chart right now." Same skeleton four times — still reads like Mad Libs.

## 1. ADVOCACY: 8/10
The core reading is genuinely good and shareable — I'd post the Einstein example and tag friends. The share link generates a real standalone page that renders beautifully on mobile. What holds it at 8, not 9: (1) **no social preview** — I dropped the /chart/ link expecting an OG card and got a bare URL + generic title; for someone who lives in X/LinkedIn/Mastodon, a link with no preview image won't earn clicks. (2) Austin's four undifferentiated rows + "NYC" failing the alias search. (3) the repetitive transit sentences. Fix the OG preview and I'm at 9 — that's the difference between "I'll share this" and "this will spread."

## 2. VALUE: Yes
No-login, mobile-clean, instant plain-English big-three for me and friends. This replaces me eyeballing astro-seek's dense glyph tables. I'd use it on people repeatedly.

## 3. CLARITY: Yes
"Your birth chart, explained in plain English. Free, no signup" — understood in under 10 seconds. Load-example let me see the payoff before typing anything. Auto-scroll to the chart after compute is a nice touch.

```json
{"tester": 0, "round": 2, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["Shared /chart/ link has NO OpenGraph/Twitter card — bare URL in feed, kills shareability for a constant-poster", "City search: four identical 'Austin, United States' rows (no state) + 'NYC' alias returns garbage, not New York", "'FOR YOUR CHART' transits still 4 near-identical mad-lib sentences"], "priorConcernsAddressed": "some"}
```
