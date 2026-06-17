# Dana — round 5

**Persona:** Demand-gen marketer, ruthless about time, tests on phone, screenshots tools she likes to the team channel. Wants to look up partners'/coworkers' charts and post a clean explainer.

## The three answers
1. **ADVOCACY: 9**
2. **VALUE: Yes**
3. **CLARITY: Yes**

## Did my round-4 blocker land? YES — verified directly.
Round 4 my advocacy dropped 9→8 for ONE reason: the shared-link unfurl was a single generic `og-default.png`, identical for every chart, so I'd screenshot the PNG and post the image instead of pasting the link. My explicit ask was "reuse the per-chart card for og:image."

I created MY chart (Dana Reyes, Cancer Sun H9 / Leo Moon / Scorpio Rising) and fetched `/chart/<token>` and inspected the meta:
- `og:title` = "Dana Reyes's birth chart, explained — chartwise" (per-chart, not generic)
- `og:image` = `.../chart/EKXi8.../opengraph-image?...` — a PER-TOKEN dynamic route
- The rendered PNG (1200×630, 200 OK) shows MY name, my date/place, and labeled Sun/Moon/Rising cards with chartwise branding + "free · instant · no signup". This is genuinely paste-worthy.

I created a SECOND chart (Marcus Lee, Tokyo) — different token, different og:title ("Marcus Lee's..."), and the image hash differs (61KB vs 59KB, distinct SHA). So it is provably per-chart, not one shared default. **This is exactly the fix I asked for.** I would now paste the link unprompted into the team channel — the unfurl IS the explainer.

## Other changes, judged honestly
- Headline repetition: section lead-ins now vary ("At your core…", "Emotionally…", "To others…", "The way your mind works…", "When you act…"). Same-sign placements (Aries Mercury + Aries Venus) still share the sign's core phrase but the house framing differs — acceptable, no longer feels copy-pasted. Fixed enough.
- Wider desktop result area + more visible zodiac accent on the card: confirmed, reads cleaner.
- Bonus I noticed: place autocomplete (Austin/Tokyo) and a "Today's Sky" transit block — gives a reason to come back, good for recurrence.

## Value vs. what I do today
Today I'd google "what does Cancer rising mean" across 3 tabs or screenshot from astro-seek's cluttered UI. This gives me a clean, named, plain-English read in one compute and a shareable link in one click. Saves real time and is screenshot-worthy. Yes.

## What keeps me from a 10
- "Save as image" triggers a file download rather than showing the card on-page first — I can't preview before it lands in Downloads, and on phone that's friction. Let me see the card, then download.
- The two same-Moon charts both said "Leo Moon" with near-identical Moon copy; for sharing two friends' charts side by side the overlap is still noticeable.
- Recovered to 9. Not 10 because the in-app save-as-image preview is clunkier than the now-excellent link unfurl.

```json
{"tester": 0, "round": 5, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Save-as-image downloads with no on-page preview, awkward on phone", "Same-sign placement copy still overlaps noticeably (e.g. shared Leo Moon)"], "priorConcernsAddressed": "all"}
```
