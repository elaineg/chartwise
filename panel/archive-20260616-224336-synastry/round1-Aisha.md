# Round 1 — Aisha (Product designer; Figma/FigJam/Notion/Loom/Maze; astrology-curious)

## 1) Advocacy: 7/10 — and yes, I'd actually mention it, but with a caveat
This is genuinely up my alley and the core concept is executed with taste, so I'd send it to
the two friends who screenshot their charts. But a 7 is a 7, not a polite stand-in for higher:
the place-autocomplete craft slip and a couple of layout rough edges keep it out of "9, I bring
it up unprompted" territory. The houses-as-rows table and plain-English explanations are the
thing I'd actually rave about; the input form is where it loses me.

## 2) Value: Yes
Today I either eyeball a chart wheel on astro-seek (dense, glyph-soup, I can't read it) or
google "what does Sun in 10th house mean" one placement at a time. This collapses both into one
legible, scannable page — the house labels ("Career & reputation", "Inner life") plus the
inline explanation ("Your life force goes into career and public standing... not optional")
are exactly the translation layer astro-seek refuses to give me. Real time saved, single session.

## 3) Clarity: Yes
H1 "Your birth chart, explained in plain English." + subcopy "Free, no signup — type your birth
date, time, and place, or load an example" told me what it is and how to start inside 10 seconds.
The empty state ("Your explained chart will appear here / Enter your birth data or load the
Einstein example") with the sparkle icon is a considered empty state — no dead grey box. Load
example let me evaluate before committing my own data, which is the right call.

## Likes (craft)
- Houses-as-rows table is the star: numbered house + plain-English domain label + sign chip +
  planet chips + Nodes column. Reads top-to-bottom like a Notion table, not a wheel I have to decode.
- Inline placement explanations have the right tone — confident, plain, not horoscope-fluffy.
- Element Distribution bar: color-coded Fire/Earth/Air/Water, counts, "Based on 11 planetary
  placements" — honest footnote, good information design.
- "Today's Sky" transit section connects current planets to MY natal placements in plain English
  and flags "1 planet retrograde" with a one-line so-what. Retrograde glyph styling is tasteful.
- Honest share copy: "Creating a share link sends this chart's birth info to our server..." —
  respects the user; matches the no-signup promise. Saved Charts rail is a nice touch.
- Empty/initial state is considered (icon + guiding copy), not a barren form.

## Defects (craft, ranked)
1. **Place autocomplete shows raw codes, not human names.** "Lagos, 05, NG", "Lagos, 09, PT",
   "Lagosanto, 05, IT". "05" and "09" are region codes that mean nothing to a user; "NG"/"PT"
   should be "Nigeria"/"Portugal". This is the single most important decision point (which Lagos?)
   and it reads like unpolished dev data. Biggest thing holding the score down.
2. **House 10/11 rows balloon vertically** when a placement is expanded (Sun explanation) and
   multiple planets stack (Mercury/Saturn, then Venus/Neptune/Pluto/Chiron) — the row rhythm
   breaks and the Sign/Nodes columns float against a lot of empty space. The table loses its
   tidy grid exactly where it's busiest. Wants the expansion in a side panel or a contained
   accordion so the column alignment survives.
3. **No "explain" affordance is obvious.** I only discovered the inline explanation because one
   row was pre-expanded on the example. The dropdown carets look like editable selects, not
   "tap to learn" — I wasn't sure if clicking a sign would let me read about it or change it.
4. Minor: the empty-state sparkle and the "Load example" sparkle are the same motif but the
   form-card border/spacing feels slightly tight vs. the generous result side — left rail reads
   a touch cramped next to the airy results.

```json
{"tester": "Aisha", "round": 1, "clarity": "Yes", "value": "Yes",
 "advocacy": 7, "topComplaints": ["Place autocomplete shows region codes (05/09) and 2-letter country codes instead of readable names like 'Lagos, Nigeria'", "House rows break their grid rhythm when explanations expand / many planets stack — alignment falls apart in the busiest rows", "Sign/planet dropdown carets read as editable selects, not as 'tap to read explanation' affordances"], "priorConcernsAddressed": "n/a"}
```
