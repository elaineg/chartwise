# Round 1 — Dana (Demand-gen marketer; MacBook in cafes + phone between meetings)

Tested cold on mobile (375px) first, then desktop (1280px). Astrology-curious, knows my big-three, ruthless about time.

## 1) Advocacy: 7/10 — would share, but with a caveat

I genuinely like this and I'd probably drop the desktop link in our team channel ("free birth chart explainer, no signup"). The desktop view is screenshot-gold: big H1, the big-three pills (Cancer rising / Pisces Sun / Sagittarius Moon) right at the top, and a clean House/Sign/Planets table. That's the clean, free explainer I came for.

But it's a 7, not a 9, because I'd share the DESKTOP screenshot, not send a friend to the site on their phone. The thing I do most (look someone up on my phone between meetings) is where it's weakest: after I tap "Load example" or "Compute chart", nothing scrolls — I'm still staring at the empty form and have to manually scroll past it to find the chart. On a phone the whole experience is ~6 screens tall, so value does NOT "land in one scroll." A 9 needs the result to jump to the top on mobile.

## 2) Value: Yes

Today I'd Google someone's sign or paste their birth time into astro-seek/Co-Star, which either dumps a wheel I can't read or wants an app install. This gives me plain English I'd actually screenshot: e.g. Moon in House 6 → "Daily routine and caring for others gives you emotional grounding; when your body is well, you are well." And it nails my exact use case — I entered myself (Dana, Taurus Sun) then a coworker (Scorpio Sun), and both got saved as chips ("SAVED CHARTS: Dana × Coworker Sam ×") that persist on reload. Real geocoding (Austin → Austin, TX, US), a real share link, and a daily-transit "FOR YOUR CHART" section. That's more than my current habit gives me, free, no login.

## 3) Clarity: Yes

Within ~10 seconds I knew exactly what it is: "Your birth chart, explained in plain English" + "Free, no signup — type your birth date, time, and place, or load an example." The Einstein button told me how to try it without typing anything. No jargon wall. Nailed.

## Concrete likes
- H1 + subhead + "Load example (Einstein)" = instant clarity, zero ramp.
- Big-three pills surface immediately; plain-English placement copy is the differentiator.
- Saved-charts chips persist (localStorage) — directly serves my "look up partners + coworkers" need.
- Real city geocoding with disambiguation (Austin AR/IN/TX/MN), real working /chart/<id> share link.
- Desktop two-column layout is clean and screenshot-worthy. Zero console errors.

## Concrete defects (MOBILE first)
- MOBILE: no auto-scroll to the result after "Load example" / "Compute chart" — I land back on the empty form and must scroll ~1.5 screens to even see my chart. This is the #1 thing holding back the phone share.
- MOBILE: value is ~6 screens tall; the big-three never appears above the fold on a phone the way it does on desktop. Consider showing the big-three card directly under the header on mobile.
- Place autocomplete is finicky: if you type "Austin" and hit Compute before tapping a suggestion, the field keeps raw text and the dropdown stays open. Only worked cleanly when I explicitly tapped "Austin, TX, US" first. Easy to fumble on a phone.
- The privacy line about share ("sends this chart's birth info to our server") appears even before I create a link — slightly alarming for a coworker's data; fine once read, but it made me pause.

```json
{"tester": 1, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 7, "topComplaints": ["Mobile: no auto-scroll to chart after Load example/Compute — land back on empty form", "Mobile: value is ~6 screens tall, big-three never above the fold like on desktop", "Place autocomplete fumbles if you Compute before tapping a suggestion"], "priorConcernsAddressed": "n/a"}
```
