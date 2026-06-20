# Tomás — Round 1 (synastry)

Operations analyst, hard-skeptic on astrology (partner is into it). Tested cold on
localhost:3099, desktop (1280) + mobile (375). My job: is data entry private, and could a
layperson read the output.

## 1. What I tried / what happened
Loaded cold. Page does NOT auto-load an example — I had to click "LOAD EXAMPLE (EINSTEIN)"
(fine, one obvious button). Once a chart was up I found "COMPATIBILITY — Compare two people"
in ~2s; it sits ABOVE the "Today's Sky" transit card as promised (y=827 vs y=961). Clicked
it: auto-loaded Einstein × Michelle Obama — two genuinely DISTINCT charts (Pisces/Sag/Cancer
vs Capricorn/Pisces/Virgo). Sections: Compatibility Summary (big-three side by side),
Element Distribution per person, a "30 HARMONY · 15 TENSION · 5 CONJUNCTION" badge, Key
Aspects, House Overlay (each person's planets in the other's houses). Natal chart itself
renders fully and is rich.

## 2. What worked / what confused or broke
WORKED (the stuff a skeptic cares about):
- PRIVACY PASSES MY SNIFF TEST. I typed a name + birth date + "London" and watched the
  network: ZERO POST/PUT requests, no birth data left the page; only external host was
  Google Fonts. City lookup uses a built-in offline list (dropdown), not a 3rd-party
  geocoder. Footer states "Your chart is computed on your device. Saved charts stay in your
  browser only." That matches reality. As someone wary of pasting personal data, good.
- HONEST. No fake "87% match" score — it reports raw counts ("30 harmonious aspects to 15
  tensions"). I respect that; a % match would have killed my trust instantly.
- Mobile 375px: no horizontal overflow, nothing clipped/doubled, two-column big-three fits.
- No console/page errors anywhere.

CONFUSING:
- The Key Aspects list is HUGE — 50+ rows of "SEXTILE · 0.3° ORB / TRINE · 0.4° ORB...". For
  a layperson (the whole point) this is a wall. No top-N, no "show more". My partner would
  scroll forever.
- Language slips out of plain English: "the themes they govern," "karmic direction," "this
  overlay," "fated and developmental." The aspect blurbs are also near-identical boilerplate
  (every sextile = same sentence), so it reads templated, not insightful.
- The summary line "30 harmonious aspects to 15 tensions" is a count with no anchor — is 30
  a lot? Out of how many? No baseline = a skeptic shrugs.

BROKE: nothing.

## 3. Would I use / recommend it?
Personally no — I think the category is nonsense, so that's a category problem, not the
app's fault. But judged on its own terms it is the most TRUSTWORTHY astrology page I've seen:
private, no signup, no manipulative match score. I'd actually point my partner at it BECAUSE
it doesn't try to con her with a fake compatibility percentage. That's the one honest thing
that moves my number off the floor.

- ADVOCACY: 4/10  (held back by: I won't advocate the category; and the aspect wall +
  astro-jargon undercut the "plain English for a layperson" promise)
- VALUE: No (for me personally — category non-fit; marginal-yes only for my partner)
- CLARITY: Partially — I understood WHAT it does in 5s; the comparison OUTPUT is not
  layperson-readable past the big-three (jargon + 50-row aspect dump)
- DOMINANT COMPLAINT: The Key Aspects section is a 50-row jargon dump — no top-N, identical
  boilerplate blurbs, terms like "the themes they govern" — so it fails its own "plain
  English for a non-astrologer" promise.

```json
{"tester": 0, "round": 1, "clarity": "Partially", "value": "No", "advocacy": 4,
 "topComplaints": ["Key Aspects is a 50+ row jargon dump with no top-N and identical boilerplate blurbs", "Output drifts out of plain English ('themes they govern', 'karmic direction'); harmony/tension counts have no baseline so a skeptic can't judge them"],
 "priorConcernsAddressed": "n/a"}
```
