# Jules — Round 4

Re-checking my Round-3 blockers first:
- **og:image on /chart/<token>: FIXED.** I generated a real share link
  (`/chart/atgwzoSGryH4nsheRYSruRLh`) and curled the page. It now has
  `og:image` (1200x630, width+height set), `twitter:card=summary_large_image`, AND a
  personalized title/desc ("Albert Einstein's birth chart, explained — chartwise"). The
  og-default.png is a real, attractive 1200x630 branded card. Round 3 it was text-only with
  twitter:card=summary. This is the exact thing that gated me. Hit.
- **Save-as-image surfaced inside the reading: FIXED.** "⬇ Save as image" now sits at the
  top-right of the reading card, not buried on a saved-chart card. Desktop expanded rows
  also span full width now. Both my asks landed.

## 1. Advocacy: 8
Up from R3's 8 only on quality, but I'm holding at 8, not bumping to 9 — and here's the
honest reason. The unfurl image is GENERIC. Every shared chart unfurls the SAME
"Your birth chart, explained in plain English" card. The og *title/description* are
personalized ("Albert Einstein's natal chart: Sun, Moon, Rising…") but the IMAGE — the
thing that actually stops a thumb in a feed — is identical for me, my friend, and Einstein.
For a constant-poster, a per-chart image (their name · Sun/Moon/Rising) is the share-bait;
a generic card reads like a stock template after the second post. That's my 8→9 gate now.
(Also noted, not blocking: the live meta points to chartwise.vercel.app/og-default.png,
which 404s right now — fine on localhost since it's pre-deploy and the asset is in the
build, but the deploy MUST land it or every unfurl breaks.)

## 2. Value: Yes
I post about astrology constantly and "find your big three" is a recurring bit. Today I'd
screenshot astro-seek's cluttered chart or paste a co-star line. This gives me a clean
mobile reading, plain-English per-placement text, element counts, today's transits, and a
no-login share link. It genuinely saves me effort and is the first one I'd actually paste
into a thread.

## 3. Clarity: Yes
H1 "Your birth chart, explained in plain English" + "Free, no signup" + the Einstein
example made it legible in under 10 seconds. The big-three card and "plain English" reading
deliver on the promise.

What still blocks 9+: make the share-link unfurl image PER-CHART (name + Sun/Moon/Rising),
not one generic card. That single change turns this from "useful tool" into "thing I bring
up unprompted."

```json
{"tester": 4, "round": 4, "clarity": "Yes", "value": "Yes",
 "advocacy": 8, "topComplaints": ["share-link unfurl uses one GENERIC og:image for every chart — not personalized with the chart's name/Sun-Moon-Rising, which is the actual share-bait for a poster", "og:image points to chartwise.vercel.app/og-default.png which 404s pre-deploy; deploy must serve it or every unfurl breaks"], "priorConcernsAddressed": "all"}
```
