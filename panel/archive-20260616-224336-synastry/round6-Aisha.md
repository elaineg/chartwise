# Aisha — round 6

**Persona:** Product designer, judges craft hard; curious-about-astrology; desktop 1440px. Prior round 5 = advocacy 9.

## Prior concerns — re-checked first
- **Place search disambiguates same-name cities (round-5 fix #1):** FIXED & lovely. "Springfield" returns 8 distinct rows each with state + country (MO, MA, IL, OR, OH, VA, PA, TN — United States). Zero ambiguity; exactly what I asked for.
- **Same-sign readings distinct per planet (round-5 fix #2):** FIXED, and this is the standout. My own chart has 3 Leo placements and they read genuinely differently — Leo Sun "here to shine, share what's inside you," Leo Mercury "communicate with flair, hold a room," Leo Venus "generous and dramatic, need to be admired." Each is scoped correctly to identity/mind/love. No copy-paste smell. Einstein's Aries Mercury (blunt, fast) vs Aries Venus (impatient in love) confirms it.
- **NODES column dead-air em-dashes (my 9→10 nit):** PARTIALLY addressed. South Node / North Node are now proper filled pills matching the SIGN/PLANETS treatment, so the column has two real anchored elements instead of pure void. But 10/12 rows are still a lone "—". Honest, but the column is ~85% empty on a wide display.
- **Zodiac accent corner-bleed (my 9→10 nit):** resolved on the save-card — the wheel is now an anchored arc bottom-right plus a "chartwise" wordmark; reads intentional, not a bleed.

## Answers
1. **ADVOCACY: 9/10** — I'd bring this up unprompted to astro-curious friends. The per-planet copy distinctness pushed it over; that was the thing that felt cheap before and now feels authored. Held off 10 only by craft nits below.
2. **VALUE: Yes** — Today I read astro-seek / Co-Star; both bury me in a wheel or doled-out daily crumbs. This explains every placement in plain English in one screen, free, no signup, with a share-card I'd actually post. Saves real effort over decoding a wheel.
3. **CLARITY: Yes** — H1 "Your birth chart, explained in plain English" + "Free, no signup" + "Load example (Einstein)" told me what and who within 5 seconds.

## Craft nits (what holds the 10)
- NODES column still mostly em-dashes on 1440px; consider collapsing nodes into the PLANETS column (or a single "Nodes: South H2 · North H8" line) so the table doesn't reserve a near-empty fourth column.
- Place-search dropdown overflows the form card's bottom edge — it bleeds over the "computed on your device" disclaimer and the card's rounded corner peeks through. Clip it to the card or give it an owned surface/shadow.
- Save-as-image card is genuinely share-worthy: big-three pills, element tags, one-line takeaway, wordmark, "free birth chart, instant, no account" — polished. Filename `albert-einstein-chart.png` is a nice touch.
- Share link copies clean, resolves 200, and unfurls with proper OG + per-chart opengraph-image + `summary_large_image` — it'll look right pasted in Slack/iMessage.
- Copy tone throughout is warm, second-person, intelligent, never cringe. The "Today's Sky / For your chart" transit block is a thoughtful extra that earns the scroll.

```json
{"tester": 0, "round": 6, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["NODES column still ~85% empty em-dashes on wide display — collapse or merge it", "place-search dropdown overflows/bleeds past the form card's bottom edge and rounded corner"], "priorConcernsAddressed": "some"}
```
