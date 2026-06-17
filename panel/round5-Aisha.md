# Aisha — Round 5

Product designer, desktop + 375px mobile. Judges craft hard. Astrology-curious.

## Prior concerns (R4 held me at adv=8) — re-checked first
1. **"the Sun/Moon/Saturn person" phrasing — FIXED.** Expanded the full 50-aspect tail and
   grepped: ZERO occurrences of "the X person". Every aspect names BOTH actual people
   ("Albert Einstein's Mars is energized by Michelle Obama's Sun's identity"). Einstein
   mentioned 103×, Obama 102× across readings — balanced, both genuinely named.
2. **Reversed/symmetric pairs read DIFFERENTLY — FIXED.** Uranus–Moon both directions:
   "Einstein's Uranus … destabilizing to Obama's Moon" vs "Obama's Uranus … to Einstein's
   Moon" — directional in the BODY now, not just headers. No byte-identical full lines
   (`uniq -d` empty across 100 named lines; 87 unique body texts).
   This was my exact blocker and it's resolved at the source. → crosses to 9.

## Clarity — Yes
"Type your birth date/place, get your chart explained in plain English — no signup — and
you can compare two people's compatibility." Eyebrow "NATAL CHART · PLAIN ENGLISH · NO
SIGNUP" + H1 nail it in <10s. The "Compatibility — Compare two people" card is clearly
labeled. For computer-workers who like astrology, instantly legible.

## Value — Yes
Today I read my chart on Co–Star / Astro-Seek's wheel and squint at jargon. This is
explanation-first, table-not-wheel, and the synastry readings are named + directional —
genuinely more readable than what I use. Saves real effort over decoding a glyph wheel.

## Advocacy — 9/10
The craft is considered: clean typographic hierarchy, generous rhythm, glyph aspect headers
(✶ ☌ △) with ORB/type metadata in small caps, two-column Person A/B that survives 375px,
zero horizontal overflow on either view, share button transitions cleanly to "COPIED"
(clipboard verified: real /chart/<token> URL; no jank — resolved sub-120ms locally).
Honest-framing line reads well and considered, set apart with spacing, not preachy:
"For insight and fun — a lens on the dynamic, not a prediction."
Held off 10 by small craft nits, not bugs: (a) ~16 of 50 minor aspects (nodes/Chiron/Lilith
outer contacts) fall back to 4 generic templates ("a harmonious flow between these two
energies", "an easy cooperative link") — headers are uniquely named but the body prose
repeats on the long tail. (b) Doubled possessive "Michelle Obama's Sun's identity" /
"Mars's presence" reads slightly clunky. (c) "11th House" vs "11th house" casing flips in
overlay copy. All cosmetic.

## Sanity checks
Natal layout, element bars, Today's Sky, houses overlay all clean. Ordinals single-form
(1st/3rd/11th — no doubling). Mobile: no clip/truncation/overlap/double-render. The "Please
fill out this field" tooltip is the empty form above the result — benign browser artifact.

```json
{"tester": 0, "round": 5, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["~16/50 minor aspects reuse 4 generic body templates (headers named, prose repeats on long tail)", "doubled possessive 'Sun's identity'/'Mars's presence' clunky; 'House' vs 'house' casing flips"], "priorConcernsAddressed": "all"}
```
