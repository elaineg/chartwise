# Round 1 — Priya (Senior backend engineer; keyboard-first; HARD astrology skeptic)

Tested cold at http://localhost:3099. Watched the network tab the whole time.

## 1) Advocacy: 3/10 — would NOT bring it up
I won't recommend this, and I want to be precise about why: ~2 points of that is the
category (I think astrology is pseudoscience and would never use this for myself, so I'm
not a buyer and won't evangelize the genre). The product itself is *competently built* —
if I separate craft from category, the craft is roughly a 6/10, dragged down by a couple
of real defects below. I might mention it once to a friend who's *into* astrology as "huh,
this one's clean and doesn't make you sign up," but I'd never raise it unprompted. A 9-10
would require me to actually want the output, which I never will.

## 2) Value: No (for me) — but credibly useful for its actual audience
For me, zero — I don't want a natal chart. Judged for its target user it's genuinely
decent: it turns the usual impenetrable wheel/glyph chart into plain-English sentences
("Scorpio rising gives you an intense, penetrating, magnetic presence…"), which is a real
improvement over astro-seek-style raw tables. No signup, no paywall, instant. That's the
honest value, but it's not mine.

## 3) Clarity: Yes
H1 "Your birth chart, explained in plain English." + "Free, no signup — type your birth
date, time, and place, or load an example." told me exactly what it is and who it's for in
under 10 seconds. The "Load example (Einstein)" button is the right zero-friction entry.
I could explain it to a friend immediately.

## What I verified as an engineer (network tab)
- Chart COMPUTE is fully client-side: loading Einstein and computing my own chart fired
  ZERO API calls — only `GET /`. The "computed on your device, nothing is sent" claim is true.
- The ONLY server calls are exactly the two it discloses: `GET /api/cities?q=` (geocode
  autocomplete) and `POST /api/chart-share` (201, returns a token → real `/chart/<token>`
  share URL). The copy explicitly warns the share link sends birth info to the server. That
  honesty earns respect from a skeptic — it didn't pretend to be 100% local.
- Fast: ~1s perceived to render Einstein. Input validation is solid — bad place blocks
  compute with a clear message rather than computing garbage.

## Likes
- Truthful, granular data-handling disclosure; client-side compute confirmed in network tab.
- "City not found? Enter coordinates manually" escape hatch — good for power users / odd places.
- Saved-charts chips + localStorage-only persistence, no account.
- Plain-English placement explanations on expand are actually readable.

## Concrete defects
- GEOCODER IS BRITTLE: typing "Bangalore" (the common English name) returns `{"results":[]}`;
  only "Bengaluru" works. Most users type the name they know and will hit a dead end.
- CRYPTIC SUGGESTION LABELS: dropdown shows "London, 08, CA" / "London, ENG, GB" — raw admin
  region codes (08, ENG, AR, KY) instead of readable country names. A non-engineer can't tell
  which "London" is the UK one. Looks like unprocessed geocoder output leaking to the UI.
- EXPANDED-EXPLANATION LAYOUT BUG: clicking a placement's ▾ renders the explanation as an
  ultra-narrow one-word-per-line vertical sliver crammed into the table cell — looks broken
  on a wide desktop. Should break out of the cell or use a popover/wider panel.

```json
{"tester": 0, "round": 1, "clarity": "Yes", "value": "No", "advocacy": 3, "topComplaints": ["Geocoder misses common city names (Bangalore→empty; only Bengaluru works)", "Place suggestions show cryptic region codes (London, 08, CA / ENG, GB) not readable country names", "Expanded placement explanation renders as a broken one-word-per-line sliver in the table cell"], "priorConcernsAddressed": "n/a"}
```
