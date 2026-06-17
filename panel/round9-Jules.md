# Round 9 — Jules (Content & community marketer, mobile-first, astrology-curious)

**Advocacy: 9/10 (was 8/10, +1) — Yes, I'd recommend it.**

## Prior round-8 concerns — both ADDRESSED
1. **Node/Lilith precision buried behind a click → FIXED.** Anchor chart 1998-08-08 16:30 Jiangmen:
   - Desktop houses table now has a dedicated **NODES** column. I read inline, no click:
     South Node 2°07' Pisces (H2), North Node 2°07' Virgo (H8), Black Moon Lilith 26°25' Libra (H10).
   - Mobile (375px): same data lives as its own row under PLACEMENTS in each house card —
     "South Node 2°07' Pisces", "Black Moon Lilith 26°25' Libra" — full sign + degree,
     single line, **no clipping, no truncation, no click.** Verified by zoom screenshots.
2. **Wanted a real shareable IMAGE/OG card → DELIVERED.** "Share this chart" makes a real link
   (/chart/<id>). That page ships full og: + twitter:summary_large_image meta, and a dynamic
   **1200×630 PNG** (HTTP 200, image/png) showing the big-three (Sun Leo / Moon Aquarius /
   Capricorn Rising) with chartwise branding + "free · instant · no signup". This is exactly
   what I asked for — it'll actually look good pasted into X/LinkedIn/Discord.

## Regression check — NONE
0 console errors desktop AND mobile. Houses, placements, element distribution, Today's Sky,
plain-English readings all intact. Share link round-trips (page loads 200).

## Three standard answers
1. **Advocate?** Yes.
2. **Score:** 9/10. Holds back the 10: the share card defaults the title to "My Chart" when I
   skip the name field (would rather it pull my Sun/Rising or stay blank than a generic
   placeholder), and clipboard "Copy link" I could only verify visually (copy read blocked in
   my test env — not a real bug). Neither blocks sharing.
3. **Single most important remaining fix:** make the share/OG card title use the chart's
   identity (name if given, else "Sun in Leo" style) instead of falling back to "My Chart" —
   that generic label is the one thing that'd make me hesitate to post it as-is.

This is genuinely share-worthy now and reads perfectly on my phone. I'd post my big-three card.

```json
{"tester": 9, "round": 9, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Share/OG card title defaults to generic 'My Chart' when name field skipped", "Copy-link verified visually only (clipboard read blocked in test env, not a regression)"], "priorConcernsAddressed": "all"}
```
