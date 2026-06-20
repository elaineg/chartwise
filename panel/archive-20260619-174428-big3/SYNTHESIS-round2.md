# Chartwise — SYNTHESIS Round 2 (SYNASTRY / "Compare two people" feature)

App under test: local `next start` prod server. Round 2 re-tests the R1 fix: the aspect-list
rewrite (top-6 curated, planet-pair-aware, directional + named, honest counts, collapsed tail).

Audience classification carried unchanged from Round 1 (per-profile `astrology_stance` +
`audienceFit`, not memory):
- IN-AUDIENCE (GATE — adv>=9 + value-clear): Dana, Jules, Aisha, Sam, Marcus, Wen, Rob, Elena (8).
- CARRIED NON-GATING (hard-skeptic non-fits, report only): Priya, Tomás.

## Per-tester results

| Tester | In-audience? | Adv | Value | Clarity | Dominant note |
|--------|--------------|-----|-------|---------|---------------|
| Dana   | YES (gate)        | 8 | Yes | Partially | R1 fixes landed; held back by compare buried behind computing a chart first + long-tail boilerplate behind "Show all 50" |
| Jules  | YES (gate)        | 7 | Yes | Yes       | No share/copy button on the Compare page (her core use case) + Show-all reverts to by-type boilerplate (trine line 13x) + body still "your/their" + "1 house" |
| Aisha  | YES (gate)        | 8 | Yes | Yes       | Top-6 rebuild is recommend-worthy; held off 9 by mixed house ordinals ("1 house"/"Eighth House"/"house of 8") + recycled square boilerplate in hidden tail |
| Sam    | YES (gate)        | 8 | Yes | Partially | Content fix is real + screenshot-worthy; held off 9 by buried compare entry + no single labeled "set Person B = my partner" action |
| Marcus | YES (gate)        | 8 | Yes | Yes       | "same Sun sign" bug FIXED; held off 9 by Show-all duplicate boilerplate + Node "1 house" raw cardinal |
| Wen    | YES (gate)        | 8 | Yes | Yes       | Directionality blocker FIXED + verified by name; held off 9 by boilerplate tail + "1st House"/"1 house" ordinal inconsistency + undiscoverable compare |
| Rob    | YES (gate)        | 8 | Yes | Yes       | Wallpaper problem solved; held off 9 by aspect blurb BODY still type-templated + inconsistent house ordinals + no "Show fewer" |
| Elena  | YES (gate)        | 8 | Yes | Yes       | Right aspects now lead; held off 9 by Show-all naked boilerplate + compare entry buried below natal result |
| Priya  | carried (non-fit) | 3 | No  | Yes       | Category ceiling (pseudoscience); craft genuinely better; residual "in their 1 house" ordinal miss + compare hidden cold |
| Tomás  | carried (non-fit) | 4 | No  | Partially | Category ceiling; NEW UX trap: dead "Compare two people →" arrow `<p>` next to real button + counts have no baseline |

## In-audience tally at the bar (adv>=9 with value-clear)

In-audience advocacy: Dana 8, Jules 7, Aisha 8, Sam 8, Marcus 8, Wen 8, Rob 8, Elena 8.
**0 of 8 in-audience testers at adv>=9.** Seven are at 8 (one tick below the bar); Jules is at 7.
All 8 in-audience now report value=Yes (Sam moved Marginal→Yes; Rob Marginal→Yes).

Carried non-fits (non-gating): Priya 3, Tomás 4.

## Movement vs Round 1

The R1 aspect-list rewrite worked — every in-audience tester moved UP or held at their R1 top:
- Elena 6→8 (+2): "the right aspects now lead, Chiron/Node banished to the tail."
- Rob 6→8 (+2): wallpaper problem "genuinely solved"; value Marginal→Yes.
- Sam 6→8 (+2): content fix "decisive"; value Marginal→Yes.
- Dana 7→8 (+1), Wen 7→8 (+1): R1 blockers (generic blurbs / silent directionality) fixed.
- Jules 6→7 (+1): top-6 right + directional, but her share-button complaint is STILL unfixed.
- Aisha 8→8, Marcus 8→8 (held): same number, "more deserved" — R1 blockers (wall / "same Sun
  sign" bug) gone; now held only by craft nits.
- Priya 3→3, Tomás 4→4 (non-gating, category ceiling unchanged).

No tester moved down. The feature is now broadly trusted: directional + fully-named aspects,
honest counts (no fake %), collapsed tail, clean at 375px, zero console errors, client-side data.

## Single dominant blocker

No single defect blocks all 8, but TWO recurring craft issues each hold ~6 in-audience testers
one tick below 9, and they are the same edit surface:

1. **Long-tail boilerplate behind "Show all 50"** (Aisha, Dana, Jules, Marcus, Wen, Elena, Rob —
   7 in-audience). The top-6 are specific, but the expanded tail reverts to by-aspect-TYPE
   templates: the same trine line renders 13x, square 10x, sextile 9x; reciprocal pairs
   (Jupiter☌Venus vs Venus☌Jupiter) render byte-identical. The wall was hidden behind a toggle,
   not removed.
2. **House-overlay ordinal inconsistency** (Aisha, Jules, Marcus, Priya, Rob, Wen — 6 in-audience
   + Priya). The North Node / Node synastry blurb bodies still emit BARE cardinals — "in their 1
   house", "your 5 house", "house of 8" — directly under headers that correctly read "1st House".
   The R1 ordinal fix missed this one template/code path. This is the cheapest, most-cited fix.

Precise fix (one builder edit closes most of the gap):
- **(a) De-boilerplate the long tail**: give the post-top-6 aspects planet-pair-aware copy (or at
  minimum vary by the actual bodies so reciprocal pairs differ), AND add a "Show fewer / Show top
  aspects only" re-collapse (Jules, Rob, Marcus noted no way back). Wen confirms the toggle text
  already flips on expand for the top section — extend the same to the tail.
- **(b) Fix the Node ordinal path**: interpolate the ordinal ("1st/5th/8th House") in the North
  Node / house-overlay blurb BODIES, not just the headers. Single template, ~6 testers cite it.
- **(c) Cheap rider that lifts Jules off 7**: add a share/copy-link button to the Compare page
  (natal already has one; compare — the shareable artifact — has none; Jules' explicit blocker).

## VERDICT: ITERATE

0 of 8 in-audience testers at adv>=9 (seven at 8, Jules at 7). The feature works, is trusted, and
every in-audience tester now reports value=Yes — but craft polish keeps the whole cohort one tick
short. Sub-bar in-audience testers: ALL 8 (Jules at 7; Dana/Aisha/Sam/Marcus/Wen/Rob/Elena at 8).

ONE highest-leverage fix: **de-boilerplate the "Show all 50" tail (planet-pair-aware copy +
"Show fewer" re-collapse) AND interpolate the ordinal in the Node house-overlay blurb bodies.**
These two ride in one builder edit, are named by 6-7 of the 8 in-audience testers, and are the
last thing standing between the seven 8s and a 9. Add the Compare-page share button to also lift
Jules (7) — it's her sole blocker and the only fix unique to her.

Non-gating notes (do NOT block ship): Priya (3) and Tomás (4) are category non-fits at their
ceiling — PARK, not iterate. BUT Tomás surfaced one real, in-audience-relevant defect worth
folding into the fix edit: the **"Compare two people →" arrow heading is a dead `<p>`** next to
the actual button — a one-affordance cleanup (make the arrow text the button, or drop the arrow)
that prevents the "feature looks broken" bounce he hit. The compare-discoverability complaint
(compare hidden until you compute a natal chart — Dana, Sam, Wen, Elena, Priya) is a real
in-audience clarity drag worth surfacing the Compare entry above the fold, but it is secondary to
the two craft fixes above.
