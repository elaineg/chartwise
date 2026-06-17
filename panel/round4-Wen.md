# Wen — Round 4

Marketing data analyst, desktop two-monitor, casual-skeptic who needs to see the math.

## Prior concern (R3 9→10): degree in the HEADLINE reading where the claim is first made
NOT addressed. The plain-English reading still says "Pisces Sun · House 10" / "Sagittarius
Moon · House 6" with NO degree. Degrees (Sun 23° Pisces, Moon 14° Sagittarius) still live
ONLY in the placements table. The one thing I asked for is the one thing that didn't move.

## R4 change-checks
- Full-width expanded in-table reading (DESKTOP): WORKS and verified. Clicking the Pisces
  cell in House 10 opens a row with colspan="4"; I measured its width = 555px = exact table
  width. Reading is coherent ("Pisces on the tenth means career is in service... reputation
  built on compassion"). No regression: all 11 degrees, retrograde (Uranus 1° Virgo℞), ASC:
  Cancer / MC: Pisces cusps, North/South Node all still render correctly.
- Share /chart/<token> unfurl: PARTIAL. summary_large_image card + og tags exist, but
  og:image is a STATIC generic logo (og-default.png), the SAME for every chart — not a
  preview of MY chart. And it resolved to the prod URL which 404s (test-env: localhost
  page hard-codes the prod asset path; can't fully judge the live deploy from here, flagging
  not failing). Title defaults to the awkward "My Chart's birth chart, explained" when name
  is blank.
- Save-as-image card (elevated): WORKS, and it's the real win. Downloaded a clean 1.3MB PNG
  with name/date/place, the big-three, element distribution (Fire4/Earth5/Air1/Water1), and
  branding. THIS is the shareable artifact, far more than the link unfurl.

## Math credibility (I scrutinized)
Holds. Einstein: Sun 23° Pisces, Moon 14° Sag, Cancer rising — matches published ephemeris.
My own chart (1990-07-15, Singapore 08:30): Sun 22° Cancer, early-90s outer placements (Pluto
Scorpio, Uranus/Neptune/Saturn Capricorn) all correct. Element counts sum to the 11 bodies
shown. Place search returned "Singapore, Singapore" cleanly. Zero console errors throughout.

## ANSWERS
1. **Advocacy: 9** (unchanged from 9). The tool that shows its work, still solid; nothing
   regressed and the expanded reading is a genuine polish. But my exact 9→10 ask (degree in
   the headline reading) was not done, and the new share-unfurl is a generic logo not a chart
   preview — so I have no new reason to bump it.
2. **Value: Yes.** Today I'd half-skim a free astro-seek wheel and not understand it. This
   gives me plain English AND the degrees to verify against ephemeris in one screen.
3. **Clarity: Yes.** "Your birth chart, explained in plain English" + "Free, no signup" nails
   it in under 10 seconds.

Remaining blocker to a 10: put the degree in the headline reading line itself ("Pisces Sun
23° · House 10"), so the credibility hook lands where I first read the claim — not buried in
the table. Secondary: make the shared-link unfurl image the actual per-chart card (you
already generate that PNG for Save-as-image), and fix the "My Chart's birth chart" default.

```json
{"tester": 4, "round": 4, "clarity": "Yes", "value": "Yes",
 "advocacy": 9, "topComplaints": ["degree still absent from headline reading line (my R3 9->10 ask, not done)", "share unfurl uses a generic static logo, not a per-chart preview image; 'My Chart's birth chart' default title is awkward"], "priorConcernsAddressed": "none"}
```
