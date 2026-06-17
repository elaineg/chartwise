# Aisha — Round 3

Re-test of SYNASTRY after fix. Tested desktop (1280) + 375px. Cold open clean: 0 console errors anywhere.

## Prior round-2 concerns — addressed?
- **(d) Compare entry as a considered card** — FIXED. Bordered `ds-card` with "COMPATIBILITY" eyebrow + "Compare two people" + subline "Plain-English compatibility between two charts — free, no signup". Reads as a real card, cursor:pointer. Nit: the clickable target is a bare `<p>` (no button role) — works, but not a11y-tidy.
- **(a) Hidden tail boilerplate** — MOSTLY FIXED. "Show all 50 aspects" expands; tail readings are now textually distinct per planet-pair (43 unique of 45). Real `<button data-testid>`, collapses cleanly back to "Show top aspects only" → exact original length. BUT still not *directional*: "his Jupiter conj her Venus" and "his Venus conj her Jupiter" get the IDENTICAL non-directional sentence (2 dup pairs), and bodies say "the Saturn person" not the actual names.
- **(b) House-overlay ordinals** — PARTIALLY fixed. The labels/headers are now consistent ("North Node in the 1st House", "Uranus in the 4th House"). But the reading PROSE still mixes registers: "in their 6th house" (good) vs "in their Eighth House" / "in your Ninth House" (spelled-out Title Case). Inconsistent within the same scrollable list.
- **(c) Share this comparison** — FIXED + works. Produces `/chart/<id>` link; opened fresh it restores the FULL comparison (both names, key aspects, harmony/tension, house overlay), HTTP 200.

## 1. What worked / value
Synastry is the headline and it lands. Harmony/tension/conjunction tally + a plain-English summary naming both people, Key Aspects with both NAMES in every header and symbols+orb, two-column Person A/B big-three on mobile. Craft on mobile is genuinely considered — no overflow at 375px in any state, clean eyebrows, good spacing. Natal sanity-checks out (big-three chips, element bars, house table, today's sky). Share link round-trips correctly.

## 2. What frustrated / felt broken
- Readings name both people in the HEADER but the body is generic role-language ("the Mars person") — for a tool selling "directional, pair-specific" this is the gap. Two aspect pairs render literally identical text.
- House-overlay prose mixes "8th house" and "Eighth House" in one list — exactly the kind of inconsistency I notice immediately and it cheapens the whole thing.
- No prominent honest-framing/"for reflection not prediction" disclaimer surfaced — the framing is implicit in "plain English" only.
- Compare card click target is a `<p>`, not a button.

## 3. Use again / recommend
I'd use it for fun and the synastry is the most fun part of any free astrology tool I've tried (vs Astro-Seek's wall-of-jargon). I'd recommend it — but with the caveat that the copy isn't quite as considered as the layout. The "Eighth House"/"8th house" mix and non-directional readings keep it from feeling fully polished. Fix those two copy issues and it's an unprompted share.

ADVOCACY: 7
VALUE: yes
CLARITY: yes

```json
{"tester": 0, "round": 3, "clarity": "Yes", "value": "Yes", "advocacy": 7, "topComplaints": ["Aspect readings name both people in header but bodies are generic 'the Mars person' role-language, not directional with names; 2 pairs render identical text", "House-overlay prose still mixes '8th house' and 'Eighth House' in one list"], "priorConcernsAddressed": "some"}
```
