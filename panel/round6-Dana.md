# Dana — round 6

**1. ADVOCACY: 9/10**
**2. VALUE: Yes**
**3. CLARITY: Yes**

## Prior concerns re-checked (cold)
- **#1 Place search disambiguates same-name cities — FIXED.** Typed "Springfield": got MO, MA, IL, OR, OH, VA, PA, TN — each with state code, no dupes. "Paris" → Paris France / Paris TX / Paris Canada / Paris TN / Paris KY. This is exactly what I wanted; I can now confidently pull a coworker's chart without picking the wrong city.
- **#2 Per-chart save-card art now distinct — FIXED for the SHARE card.** The unfurl/OG card renders the person's name, birth date+place, and their specific Sun/Moon/Rising (Einstein: Pisces Sun H10, Sagittarius Moon, Cancer Rising). OG meta + image URL carry a per-chart hash, so two charts won't unfurl identically. This is the screenshottable thing.
- **The original 9→10 nit — Save-as-image still downloads with NO on-page preview. NOT addressed.** On my phone, tapping "Save as image" drops `albert-einstein-chart.png` straight into Downloads — no preview, no "here's your card, looks good?" step. Still mildly clunky on mobile.

## Other notes
- Mobile 375px: full value lands in one scroll — headline "Your birth chart, explained in plain English", "Free, no signup", "Load example (Einstein)" all above the fold. Zero console/page errors throughout.
- Plain-English readings are genuinely distinct per planet (Sun=identity, Moon=restraint/home, Mercury=fast mind, Venus=nurture) — not copy-paste. My own Cancer-Sun chart read accurately and differently from Einstein's Pisces Sun.
- Transit "Today's Sky" shows live date (Jun 16 2026), all 10 bodies, retrograde flag, AND a personalized "FOR YOUR CHART" line. Nice recurring hook.
- Expand-a-cell works (content opens on tap).

## Why 9 not 10
Share card + city search are now exactly what a screenshot-to-the-team-channel marketer wants. The one thing still keeping it off a 10: **no in-app preview of the saved image on phone** — I tap Save and just have to trust what landed in Downloads. Show me the card before/after I save (the OG endpoint already renders a beautiful 1200x630 — surface THAT in-app as the save) and I'd hit 10 and screenshot it unprompted.

```json
{"tester": 1, "round": 6, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Save-as-image still downloads with no on-page preview on mobile — must trust what landed in Downloads", "The polished per-chart OG card (1200x630) is only used for share unfurls, not surfaced as the in-app save preview"], "priorConcernsAddressed": "some"}
```
