# Jules — round 5

**Persona:** Content/community marketer, mobile-first, posts constantly, judges shareability hard. Tested at 375px mobile viewport, cold.

## Answers
1. **ADVOCACY: 9**
2. **VALUE: Yes**
3. **CLARITY: Yes**

## Re-check of my exact round-4 8→9 gate
> "Only the og text is personalized; the image is the same for me, my friend, and Einstein. A per-chart image (name · Sun/Moon/Rising) is the actual share-bait and my 8→9 gate."

**FIXED — and verified directly.** I created two share links and fetched the og/twitter meta + the actual image bytes for each:
- Einstein token → og:title "Albert Einstein's birth chart…", and `/chart/<token>/opengraph-image` renders a 60KB PNG showing **"Albert Einstein" · 1879-03-14 · Ulm, Germany · Pisces Sun (H10) · Sagittarius Moon · Cancer Rising**.
- MY token (Jules Rivera) → og:title "Jules Rivera's birth chart…", image renders **"Jules Rivera" · 1991-08-23 · Lisbon, Portugal · Leo Sun (H9) · Aquarius Moon · Sagittarius Rising**.

The two cards are completely distinct — different name, date, place, and Sun/Moon/Rising chips, with per-sign accent colors (orange Leo vs purple Pisces, blue Aquarius). The footer reads "free · instant · no signup" + chartwise.vercel.app handle. **This is genuine share-bait I would actually post** — drop a link in a Discord/X thread and it unfurls into the person's own big-three card. Gate cleared.

## Other round-4 deltas (judged honestly)
- Plain-English headlines: no longer feel copy-pasted; each placement reads distinct. Good.
- Wider result area on desktop / more visible save-card accent: minor, didn't block me; mobile already used full width.

## Fresh pass (mobile)
- "Free, no signup" up top = instant clarity, exactly my trigger. Reading is genuinely plain-English, not jargon.
- Own chart: place autocomplete works, computed Leo/Aquarius/Sagittarius correctly. No console/page errors anywhere. No horizontal scroll.

## What keeps it from a 10
- The og:image:**alt** is still the generic "Birth chart card" — accessibility/screen-reader and some unfurl previews use alt text; it should say "Jules Rivera's birth chart: Leo Sun, Aquarius Moon, Sagittarius Rising" to match the visual. Small, but it's the last personalization gap.
- Place search shows 5 identical "Lisbon, United States" rows with no state to disambiguate — minor friction.
- No one-tap "Share to X/native share sheet" button on mobile — I copy the link, but a Web Share API button would make the loop frictionless and push me to 10.

The per-chart unfurl was the whole ballgame and it landed. Comfortable 9, would bring it up unprompted; held off 10 only by the generic image alt + missing native share button.

```json
{"tester": 0, "round": 5, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["og:image:alt still generic 'Birth chart card' instead of per-chart text", "no one-tap native/X share button on mobile", "place search shows undifferentiated duplicate 'Lisbon, United States' rows"], "priorConcernsAddressed": "all"}
```
