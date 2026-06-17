# Priya — Round 3

Senior backend engineer, hard-skeptic on astrology (pseudoscience, I'd never open this for myself). NON-FIT tester: I judge craft, clarity, and whether data actually stays client-side — I watched the network tab the whole time. Tested desktop (1440) + 375px.

## Re-check of my R2 complaints
- **"in their 1 house" bare-cardinal North Node bug — FIXED.** Both paths now read ordinals: "Your North Node in their **1st house**" and "Their North Node in your **5th house**". The ordinal sweep is now complete (headers + all blurbs). Good — that was the exact sloppiness I called out.
- **"Compare entry point not discoverable cold" — still gated behind a natal chart**, but once you load Einstein it's a clear labeled link ("Compare two people"), and the Compare page itself is a proper card with header "Compatibility, explained / How two charts get along — in plain English, free, no signup". Not a dead affordance.

## R3 focus findings
- **(a) Key Aspects — genuinely pair-specific, NOT boilerplate.** Sun⚹Sun, Mars☌Sun, Moon△Jupiter each get distinct directional text with correct glyph + orb (e.g. "CONJUNCTION · 0.2° ORB"). Collapsed default shows 6 visible aspects; "SHOW ALL 50 ASPECTS" expands to 50 visible; "SHOW TOP ASPECTS ONLY" collapses back to 6. Toggle verified 6→50→6, desktop and 375px. Minor: two 4th-house overlay blurbs (Uranus, Pluto) emit IDENTICAL text — theme-keyed, not per-planet, so a touch of recycling remains.
- **(b) House-overlay ordinals — clean** (1st/3rd/4th…11th), including the previously-broken North Node path.
- **(c) "SHARE THIS COMPARISON" — WORKS, but it BREAKS the privacy promise.** It produces a copy-link (`/chart/<token>`, copied to clipboard, label flips). BUT it fires `POST /api/chart-share` and the body is FULL BIRTH PII for BOTH people: name, exact date, **birth hour+minute, latitude/longitude, place name** → server returns a token and stores it. Anyone with the opaque URL retrieves it. The homepage still says **"Your chart is computed on your device. Saved charts stay in your browser only"** and the share blurb ("Creates a link anyone can open... free, no signup") gives NO warning that data leaves the device. For me that contradiction is the whole ballgame: in R2 I confirmed ZERO PII left the browser; in R3 sharing silently uploads it. No anonymization, no consent copy. (Clipboard read worked in my env — verified the URL.)
- **(d)** Compare entry = clear card, no dead affordance. Confirmed.
- **(e) Framing honest on the reading itself** — "30 HARMONY · 15 TENSION · 5 CONJUNCTION", no fake % match, no predictive overclaim. Einstein natal sane (Cancer rising, Pisces Sun, 11 placements). The dishonesty is NOT in the astrology copy — it's in the privacy claim vs. the share endpoint.

No console errors anywhere. No horizontal overflow at 375px (scrollWidth 375). Layout clean both viewports.

## Three answers
1. **Value: No.** Astrology is pseudoscience to me; I solve nothing here. Category, not craft.
2. **Frustrated/broken?** Nothing visually broken — craft is strong. But as the engineer who watched the network: the new Share feature POSTs birth PII while the UI promises "stays in your browser only." That's a trust regression I'd flag in any review.
3. **Use/recommend?** No — category. And I'd now actively caution a privacy-conscious friend about the share button.

ADVOCACY: 3/10 — unchanged from R2. Build quality is high and the R2 ordinal bug is fixed, but my ceiling is the category, and the new share-PII-vs-"stays-in-your-browser" contradiction would have pulled a fit-user's score DOWN, not up. The honest number is 3, held there by category + the privacy-copy contradiction.

VALUE: No
CLARITY: Yes — title + "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" + Compare subhead told me exactly what it is and who it's for in under 30s.

```json
{"tester": 8, "round": 3, "clarity": "Yes", "value": "No", "advocacy": 3, "topComplaints": ["Share button POSTs full birth PII (name/date/exact time/lat-long/place for both people) to /api/chart-share while UI still claims 'computed on your device, stays in your browser only' — no consent/anonymization, no warning data leaves device", "Compare entry still gated behind computing a natal chart (not discoverable cold); two 4th-house overlay blurbs are identical (theme-keyed, mild recycling)"], "priorConcernsAddressed": "all"}
```
