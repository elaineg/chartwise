# Marcus — round 1

**CLARITY: Yes.** In 5s the H1 "Your birth chart, explained in plain English" + the
"NATAL CHART · PLAIN ENGLISH · NO SIGNUP" eyebrow told me exactly what it is and that
it's free/no-login. Sub-line "Free, no signup — type your birth date, time, and place, or
load an example" sealed it. I'd tell a friend: "free chart explainer, no account, paste
your birthday."

**VALUE: Yes.** Today I'd Google "what's a Scorpio moon mean" or open Co-Star (which makes
you sign up + log everyone in). This does it cold, instant, no auth, and gives a real
plain-English read per placement plus a "Today's Sky" transit panel. The share-link is the
actual value for me: I can generate a chart and drop a URL in the group chat.

**ADVOCACY: 8/10.** Genuinely well-made — I'd share this. Monochrome design is clean and
intentional, zero CSS jank, zero console errors across both flows. Not a 9 because the
clipboard/share confirmation is subtle and I want a one-tap "copy link" that's unmistakable
for non-technical friends (see blocker); also the result page is very long/dense to skim on
first drop.

**BIGGEST BLOCKER:** Share/copy feedback is too quiet for the share-it-in-chat use case.
The "Create share link" button works (link generated, copied-state fires, no error) but the
confirmation is understated — for a tool whose whole viral hook is "drop it in the group
chat," the copy moment should be loud and obvious. (Clipboard read came back empty in my
test env — that's headless Chromium blocking navigator.clipboard, not the app; copy verified
visually, click handler fired with no JS error.)

## BIG 3 flow notes
- **Discoverable?** Yes — PRECISE | BIG 3 toggle sits at the very top of the input panel.
  Found it instantly. Banner explains it: "Know your Sun, Moon, and Rising (e.g. from
  Co-Star) but not your exact birth time? Estimate the rest." Smart framing.
- **Estimate labeled?** Yes, clearly — "ESTIMATED CHART" chip badge + "Estimated chart"
  header + banner: inputs "were inferred from your big three — this is approximate. Enter
  full birth details for the precise chart." No risk of mistaking it for exact.
- **Loading ok?** Yes — button showed "Estimating…", ~2.4–3.5s total. Felt deliberate, not
  broken.
- **Signs honored?** Yes — picked Sun Leo / Moon Scorpio / Rising Gemini and all three came
  through correctly in the result (Sun Leo House 2, Moon Scorpio, Rising Gemini).

```json
{"tester": 1, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 8,
 "topComplaints": ["Share/copy confirmation too quiet for the share-in-group-chat hook", "Result page is long/dense to skim on first share"], "priorConcernsAddressed": "n/a"}
```
