# Dana — Round 4

**Persona:** Demand-gen marketer, ruthless about time, screenshots tools she likes to the team channel. Tested cold on desktop (1280) + iPhone 13 (390).

## Prior concerns re-checked (round 3 = advocacy 9)
- Save-as-image PNG (my named delight): re-verified. Now ELEVATED — downloaded `albert-einstein-chart.png` cleanly. Card has big-three pills w/ icons, element pills (Fire/Earth/Air/Water counts), a highlighted callout ("Sun in House 10 — career and legacy are central to this life."), faint zodiac-wheel accent, "chartwise" branding + branded footer. This is now drop-in-the-Slack-channel quality, not just OK. Improved.
- No regressions from the table restructure: expanded reading uses `colspan=4`, spans full 555px table width, reads clean. 0 console errors across every interaction (load example, expand, own chart, share, mobile).

## What I tested
- Load example (Einstein), read plain-English section, expanded placement cells (full-width on desktop — confirmed).
- My own chart: date 1990-07-15, time 09:30, place "Austin" → autocomplete dropdown, computed full chart (Cancer Sun / Leo Moon / Aries Rising), houses, element bar, Today's Sky transit, personalized "For Your Chart" guidance.
- Elevated Save-as-image card (rendered + downloaded, inspected the PNG).
- Create share link → `/chart/G06g9...`; verified the page server-renders the real chart and unfurls with OG + twitter `summary_large_image` (per-chart title/description, 1200x630 image).
- Mobile: stacked house-card layout (desktop table hidden), tap-to-expand works, ZERO horizontal overflow, reading legible on phone.

## 1. Advocacy: 8/10 (was 9)
Honest drop of one. The product is more polished — the share card and mobile both improved — but the changes this round didn't add a NEW reason for me to evangelize; they refined what was already good. Two specific things keep it off a 9–10:
- **The unfurl preview image is generic, not per-chart.** `og:image` = `og-default.png` for every chart. The TITLE is personalized ("Albert Einstein's birth chart, explained") but the IMAGE everyone sees in the link preview is identical. For a share-driven tool, the killer move is the unfurl showing THAT person's big-three card (which I already loved as a download) — that's what would make me paste links unprompted. Right now I'd rather screenshot the PNG card and post the image directly than share the link.
- **Place autocomplete is ambiguous:** typing "Austin" returns five identical "Austin, United States" rows with no state/region. Looking up a coworker's chart I can't tell which one is right.

## 2. Value: Yes
Today I'd use astro-seek or Co-Star, both cluttered or app-only. This gives a clean plain-English reading, no signup, instant, computes on-device, and produces a share card I'd actually post. It saves me real time vs decoding astro-seek's wheel.

## 3. Clarity: Yes
Headline "Your birth chart, explained in plain English" + "Free, no signup" nails it in one glance. I could explain it to a friend in one sentence within 5 seconds.

## What would move me to 10
Make the link-unfurl preview render the actual person's big-three card (you already generate it for the PNG — reuse it for og:image). Disambiguate place results. Do those and I'm pasting Chartwise links into the team channel unprompted.

```json
{"tester": 1, "round": 4, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["Link-unfurl preview image is a generic og-default.png, not the per-chart big-three card — so the share link is less compelling than the downloadable PNG", "Place autocomplete returns multiple identical 'Austin, United States' rows with no state/disambiguation"], "priorConcernsAddressed": "all"}
```
