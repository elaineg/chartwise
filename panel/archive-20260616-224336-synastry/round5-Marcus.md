# Marcus — round 5

**Advocacy: 8**  **Value: Yes**  **Clarity: Yes**

Re-tested cold on desktop Chrome, devtools open. Zero console errors on every surface
(load, expand, my own chart, share, save-as-image). The app is genuinely slick and
no-signup — exactly the kind of thing I'd drop in our group chat.

## Round-4 concerns — did they land?
1. **Per-chart unfurl preview** — FIXED, and it's the best change. Created a share link
   (POST /api/chart-share returned a token), fetched /chart/<token>: og:title and
   twitter:title both read "Albert Einstein's birth chart, explained", description names
   Sun/Moon/Rising, and og:image points to a token-scoped /chart/<token>/opengraph-image
   that actually renders the person's name + birth date/place + color-coded Sun/Moon/Rising
   chips + "free · instant · no signup". That's a shareable card, not a generic one. This is
   the thing that makes it group-chat-worthy.
2. **Distinct headlines** — MOSTLY fixed. Each placement now opens with a planet-specific
   lead ("The way your mind works..." for Mercury vs "In love and values..." for Venus). But
   when two planets share a sign the underlying TRAIT sentence still repeats verbatim — my
   Aries Mercury and Aries Venus both end "...bold and direct, you lead with instinct and
   act before you overthink. You thrive on being first." A close reader notices the copy-paste.
3. **Degrees** — present everywhere in the placement table (Sun 23° Pisces, Moon 14°
   Sagittarius, Uranus 1° Virgo℞). Good. NOT in the big-three summary headline (just
   "☉ Pisces Sun") — minor, but that was the literal round-4 ask and it's only half-done.

## NEW / still-broken — the one thing holding back a 10
**Place-search disambiguation is STILL not fixed.** Typing "Berlin" returns 6 identical
"Berlin, United States" rows; "Austin" returns 4 identical "Austin, United States" rows —
no state/region/county to tell them apart. My non-techy friend WILL silently pick the wrong
city from the group chat and get a wrong chart, with no way to know. This was my explicit
round-4 9→10 blocker and it survived untouched. Everything downstream is impressively
polished, which makes this the obvious weak link. Add state/admin-region (and maybe lat/long
or population) to each row and I'm at 9-10 and sharing it unprompted.

No regressions: wide layout uses the screen well, save-as-image downloads cleanly
(albert-einstein-chart.png, zodiac-wheel accent visible), expand/collapse smooth, no CSS jank.

```json
{"tester": 1, "round": 5, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["Place search still returns 5-6 identical 'Berlin/Austin, United States' rows with no state/region — a non-techy friend picks the wrong city silently", "Same-sign placements still repeat the trait sentence verbatim (Aries Mercury & Aries Venus end identically); no degree in the big-three headline summary"], "priorConcernsAddressed": "some"}
```
