# Round 2 — Jules (Content & community marketer, mobile-first ~375px)

| Tester | Round | Clarity | Value | Advocacy | Prior concerns |
|--------|-------|---------|-------|----------|----------------|
| Jules  | 2     | Yes     | Yes   | 8        | some addressed  |

## Round-1 concern re-check
- **BIG 3 estimate dead-end (Leo/Scorpio/Gemini, 1988):** FIXED. Switched Precise→Big 3, picked
  Leo · Scorpio · Gemini, year 1988, hit "Estimate chart" → valid ESTIMATED CHART rendered, zero
  red error. Chart honors all three (Sun Leo, Moon Scorpio, Gemini rising). Clean on mobile.
- **At-a-glance big-three strip:** SHIPPED. Top of the result reads
  "YOUR BIG THREE — SUN LEO · MOON SCORPIO · RISING GEMINI" right under the ESTIMATED CHART badge.
  That IS a screenshot-able line — partial win for shareability.
- **Shareable image/social card (my #1 blocker):** NOT built. Share is still "Create share link" →
  a server-stored URL (http://localhost:3000/chart/...) with copy "sends this chart's birth info to
  our server." Still a 2-step server action, still no image/social card.

## 1. CLARITY — Yes
"NATAL CHART · PLAIN ENGLISH · NO SIGNUP" + "Your birth chart, explained in plain English. Free, no
signup" tells me in 5 seconds exactly what it is and that it's my kind of free, login-free tool. The
Precise | Big 3 toggle is obvious. I'd pitch it to my followers in one line.

## 2. VALUE — Yes
Today I'd screenshot Co–Star or paste a chart from astro.com (login-y, clunky on mobile) to make a
"know your big three" post. This is faster: no signup, mobile-clean, and the big-three strip gives me
a clean line to screenshot. It saves me real time over my current habit.

## 3. ADVOCACY — 8
Still an 8, and I'm holding it there honestly rather than nudging to 9. The dead-end fix and the
big-three strip are genuine improvements — I can now screenshot that strip. But the single biggest
REMAINING blocker is unchanged: there's still **no one-tap "share as image / social card."** As a
marketer my native action is "download a square card I can drop straight into X/IG/Mastodon," not
"Create share link" → a server URL that says it uploads my birth info. The strip is screenshot-able
but it's a plain text row, not a designed card — I'd still have to crop a screenshot by hand. Give me
a "Download share card" button (the big-three strip styled as a 1080×1080 image) and this is a 9–10
I bring up unprompted. The share-card gap still caps me; the strip narrowed it but didn't close it.

(Note: clipboard read returned empty in the headless test env — share link generated visually, copy
not independently verifiable here; not counted against the app.)

```json
{"tester": 8, "round": 2, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["No one-tap share-as-image / social card; share is still a server-link, the big-three strip is screenshot-able text but not a designed downloadable card", "'Create share link' copy says it uploads birth info to your server — friction for a privacy-minded share"], "priorConcernsAddressed": "some"}
```
