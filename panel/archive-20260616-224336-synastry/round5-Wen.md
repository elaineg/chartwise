# Wen — round 5

**1. ADVOCACY: 9**
**2. VALUE: Yes**
**3. CLARITY: Yes**

## Re-check of my prior 9→10 asks
- **Per-chart unfurl image** — ADDRESSED, and done well. Fetched `/chart/<token>`: `og:image`/`twitter:image` now point at `/chart/<token>/opengraph-image` (per-token, 200, 1200×630 PNG). `og:title` = "Wen Test's birth chart, explained — chartwise"; image renders MY name, birth date, "Singapore, Singapore", and Sun/Moon/Rising chips (Cancer Sun H9 · Aries Moon · Scorpio Rising). No longer generic. This is the change I most wanted; it makes a shared link actually worth sharing.
- **Degree in the headline reading line** — NOT addressed (third round now). The reading still leads with "Pisces Sun · House 10", "Cancer Sun · House 9", etc. The degree (Sun 23° Pisces, Moon 14° Sagittarius) lives ONLY in the house table. As a data person, the headline is where I read the chart; making me hunt the table for the precise figure is exactly the kind of split-source-of-truth I distrust. It's one token of text. Still not there.

## Fresh judgment
- **Math credibility: solid.** Einstein example matches the canonical documented chart (Pisces Sun, Sagittarius Moon, Cancer Rising). My own chart (1990-07-15, Singapore) computed sensibly; place search returned Singapore and resolved coordinates; degrees + retrograde marks (Uranus 1° Virgo℞, Pluto ℞ in transit) all render. Element-distribution bar and house grid are internally consistent.
- **Explanation coherence: improved.** Same-sign placements no longer read 100% verbatim — Aries Mercury and Aries Venus share the sign-trait opener ("bold and direct…") but the second sentence now diverges by domain (mind/career vs love/friends). Expanding a table cell gives a coherent house-specific gloss ("Cancer rising gives you a warm, receptive presence"). No contradictions spotted.
- **Save-as-image:** works — downloaded `wen-test-chart.png`. Share link + "Copy link" present.
- **Transit "Today's Sky":** good touch, names which natal planets current transits hit. Coherent.
- **Zero console errors** across cold load, example, my chart, share, save.

## What keeps it from a 10
The single remaining gap is the degree in the headline reading line — my explicit ask three rounds running. The sign-trait opener still being identical for same-sign placements is a minor secondary nit (I'd vary the adjective per planet too). Everything ELSE I asked for landed cleanly, and nothing regressed. Fix the degree-in-headline and this is a 10 from me.

```json
{"tester": 1, "round": 5, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Headline reading line still omits the degree (e.g. 'Pisces Sun · House 10') — degrees only in the table; unaddressed 3 rounds running", "Same-sign placements still share an identical sign-trait opener sentence (only the second/domain sentence varies)"], "priorConcernsAddressed": "some"}
```
