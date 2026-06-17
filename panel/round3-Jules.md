# Jules — Round 3

ADVOCACY: 8
VALUE: Yes
CLARITY: Yes

Tested mobile-first (375px), cold, no login. Re-checked my two round-2 complaints first.

PRIOR COMPLAINTS:
1. "Want a one-tap shareable image card" — FIXED. The new "⬇ Save as image" button downloaded
   `albert-einstein-chart.png` (1MB), and it's genuinely postable: big-three badges (Pisces Sun /
   Sagittarius Moon / Cancer Rising), an element bar, a one-line takeaway, and a
   "chartwise.vercel.app — no signup, no cost" footer. This is exactly the artifact I'd drop in a
   tweet or story. Real delight.
2. "Shared /chart/ links unfurled as a bare URL, no preview" — PARTIALLY fixed. The page now has
   og:title + og:description ("Albert Einstein's birth chart, explained… Free, no signup") and
   twitter:title/description, so it's no longer a naked URL — good. BUT there is NO og:image /
   twitter:image at all, and twitter:card is "summary" (small), not "summary_large_image". So when
   I paste a link it'll unfurl as a tiny text card with no visual. For a mobile marketer the IMAGE
   is the unfurl. Half a win. (priorConcernsAddressed: some)

WHAT WORKS: Cold open is crystal — H1 "Your birth chart, explained in plain English" + "Free, no
signup" under it = instant yes for me. Load example → rich, well-written plain-English reading with
real degrees (Sun 23° Pisces, Moon 14° Sagittarius, Mars 26° Capricorn), houses, element split. The
"Today's Sky" transit block is a nice recurring hook (per-planet signs, "1 planet retrograde — Pluto",
plus FOR YOUR CHART transit-to-natal notes) — that's the thing I'd reopen weekly. Place autocomplete
("Berlin, Germany") works on mobile; my own chart computed clean, zero console errors anywhere. Share
link copies to clipboard and renders fully for a logged-out recipient with a "Create your own chart →"
CTA — smart growth loop.

WHY NOT HIGHER (holds at 8, not 9): The share card lives behind the "Save as image" button on the
SAVED-chart card, not as a prominent one-tap share row in the reading itself — slightly buried. And the
missing og:image means the link-share path still doesn't carry the visual. Fix twitter:card to
summary_large_image + add an og:image (render the same PNG card) and I'm a 9-10 who posts it unprompted.
Copy/share otherwise verified.

```json
{"tester": 1, "round": 3, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["no og:image/twitter:image on share links — link unfurls as small text-only card, no visual; twitter:card is 'summary' not 'summary_large_image'", "Save-as-image lives on the saved-chart card, not a prominent one-tap share row in the reading"], "priorConcernsAddressed": "some"}
```
