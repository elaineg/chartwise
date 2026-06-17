# Chartwise — SYNTHESIS Round 3 (SYNASTRY / "Compare two people" feature)

App under test: local `next start` prod server, http://localhost:3099. Round 3 re-tests the
R2 fixes: (1) de-boilerplate the "Show all N aspects" tail + interpolate body names,
(2) collapse toggle both ways, (3) Node/overlay ordinals in blurb bodies,
(4) "Share this comparison" button, (5) Compare entry as a clean clickable card (dead arrow removed).

Audience classification carried unchanged from Rounds 1–2 (per-profile `astrology_stance` +
`audienceFit`, not memory):
- IN-AUDIENCE (GATE — adv>=9 + value-clear): Dana, Jules, Aisha, Sam, Marcus, Wen, Rob, Elena (8).
- CARRIED NON-GATING (hard-skeptic non-fits, report only): Priya, Tomás.

## Per-tester results

| Tester | In-audience? | Adv | Value | Clarity | Dominant note |
|--------|--------------|-----|-------|---------|---------------|
| Dana   | YES (gate)        | 8 | Yes | Partially | All in-feature R2 defects FIXED (tail de-boilerplated 85/88 unique, collapse works, ordinals correct, share works). Held at 8 only by compare being invisible on cold home page (no above-fold entry, no `/compare`). |
| Jules  | YES (gate)        | 8 | Yes | Partially | Her R2 #1 blocker (no Compare share button) FIXED + verified end-to-end on mobile — link reopens full view in fresh browser. Up 7→8. Held by compare-card undiscoverable on cold landing. |
| Aisha  | YES (gate)        | 7 | Yes | Yes       | DOWN 8→7. Two R2 copy issues only PARTIALLY fixed: house ordinals still mixed in ONE list ("8th house" vs "Eighth House"), and tail readings still NOT directional ("his Jupiter conj her Venus" == reverse; bodies say "the Saturn person" not names). A designer notices instantly. |
| Sam    | YES (gate)        | 8 | Yes | Partially | Tail distinct (87/90 unique), collapse works, share works + screenshot-worthy, ordinals+direction read right for him. Held by compare invisible on cold homepage + no one-tap "Person B = my partner". |
| Marcus | YES (gate)        | 8 | Yes | Yes       | BOTH his R2 blockers FIXED (50 distinct pair-keyed readings; zero raw "N house"; share end-to-end with toast/clipboard). Held by no "for fun not prediction" framing + compare hidden until a chart is computed. |
| Wen    | YES (gate)        | 5 | Yes | Yes       | DOWN 8→5. Tail "Show all 50" still verbatim-templated (~44 minor aspects repeat identical harmony line); ordinals now inconsistent a NEW way (numeric "6th House" header vs spelled-out "their Sixth House" body for same placement) — the invisible-transform smell that kills her trust. Share works. |
| Rob    | YES (gate)        | 6 | Yes | Yes       | DOWN 8→6. "Show fewer" FIXED + share + card all good, but house ordinals STILL mixed in one list and aspect BODIES still type-keyed (Jupiter☌Venus blurb verbatim for reversed pair; never uses names). Plus no honest framing. |
| Elena  | YES (gate)        | 8 | Yes | Yes       | BOTH R2 blockers FIXED (50 unique pair-specific directional readings; ordinals correct; collapse works; share copies link that reopens full view). Held by compare invisible from landing + ~2 screens down on 375px. |
| Priya  | carried (non-fit) | 3 | No  | Yes       | Category ceiling. R2 ordinal bug fixed, card clean. BUT surfaced a TRUST REGRESSION: share button POSTs FULL birth PII (name, exact date, hour+min, lat/long, place) to `/api/chart-share` server-side while UI still claims "stays in your browser only." Anonymous token, but the privacy claim now contradicts the endpoint. |
| Tomás  | carried (non-fit) | 4 | No  | Yes       | Category ceiling. BOTH his R2 defects FIXED: dead arrow `<p>` gone (whole card is one `<button>`), counts now have baseline. Share URL uses opaque random ID (no PII in URL). Cosmetic: a few lowercase "house" vs heading "House". |

## In-audience tally at the bar (adv>=9 with value-clear)

In-audience advocacy: Dana 8, Jules 8, Aisha 7, Sam 8, Marcus 8, Wen 5, Rob 6, Elena 8.
**0 of 8 in-audience testers at adv>=9.** All 8 still report value=Yes.

Carried non-fits (non-gating): Priya 3, Tomás 4.

## Movement vs Round 2

Split outcome — the fixes that fully landed lifted testers; the partially-landed copy fix
REGRESSED the craft-strict trio:
- Jules 7→8 (+1): her sole R2 blocker (no Compare share button) is fixed and verified.
- Dana 8→8, Sam 8→8, Marcus 8→8, Elena 8→8 (held): every in-feature R2 defect they cited is
  gone; now held only by compare-discoverability (compare hidden until a natal chart is computed).
- Aisha 8→7 (−1): house ordinals still mixed in one list + tail readings still non-directional.
- Rob 8→6 (−2): aspect BODIES still type-keyed (verbatim for reversed pairs, no names) + mixed
  ordinals; "Show fewer" itself is fixed.
- Wen 8→5 (−3): "Show all 50" tail still verbatim-templated AND a NEW numeric-vs-spelled-out
  ordinal inconsistency for the same placement — exactly her data-hygiene tripwire.
- Priya 3→3, Tomás 4→4 (non-gating, category ceiling).

Net: 5 of 8 in-audience at 8, 3 regressed (7/6/5). The de-boilerplate + ordinal fix was applied
UNEVENLY — it fixed the TOP-6/headers and one Node code path (Dana/Marcus/Elena/Sam see clean
output) but MISSED the long-tail minor-aspect template and a second house-prose code path
(Aisha/Wen/Rob still see boilerplate + mixed ordinals in the same view). Discrepancy is real,
not perception: different testers loaded different example pairs and hit different code paths.

## Single dominant blocker

Two surfaces still block the cohort, plus one new trust defect:

1. **The "de-boilerplate + ordinal" fix is INCOMPLETE on two code paths** (Aisha, Wen, Rob — 3
   in-audience, the entire regression). (a) The long-tail MINOR aspects behind "Show all 50" are
   still verbatim-templated (one harmony line repeats ~44x) and the aspect BODIES are still
   type-keyed — reversed pairs render byte-identical and the body uses "the Saturn person", never
   the names, even though headers do. (b) House-overlay PROSE mixes numeric and spelled-out
   ordinals for the SAME placement in one list ("6th House" header over "their Sixth House" body).
   The R2 fix touched the top-6 + headers + the Node path; it did NOT reach the minor-aspect tail
   template or the house-prose path. This is the single highest-leverage fix and is the whole
   reason three craft-strict testers moved DOWN.

2. **NEW — Share endpoint contradicts the privacy claim** (Priya, non-gating but in-audience-relevant).
   The new "Share this comparison" button POSTs full birth PII (name, exact date, birth hour+minute,
   lat/long, place) to `/api/chart-share` and stores it server-side under a token, while the UI still
   says "Your chart is computed on your device. Saved charts stay in your browser only." The token/URL
   is anonymous (Tomás confirmed no PII in the URL), so it's not a leak — but the on-device-only CLAIM
   is now false for shared comparisons. Fix: scope the "stays in your browser only" copy to non-shared
   charts, OR add one line of consent at the share button ("Sharing uploads this chart to a private
   link"), OR encode the chart in the URL fragment client-side (no server store). Cheap, and removes a
   credibility crack a fit-user reviewer would also catch.

Secondary (do NOT block this round, recurring across testers): the polished compare/share feature is
invisible on the cold home page — it only appears after you compute a natal chart (Dana, Jules, Sam,
Marcus, Elena, Wen — 6 in-audience). It holds the five steady 8s off 9 just as much as #1 holds the
regressors. Surfacing the Compare card above the fold (or a `/compare` route) is the lever for the 8s.
Also recurring: no "for fun, not a prediction" honest-framing line in the synastry output (Marcus, Rob).

## VERDICT: ITERATE

0 of 8 in-audience testers at adv>=9 (five at 8, Aisha 7, Rob 6, Wen 5). The feature is trusted and
all 8 report value=Yes, but the round-2 copy fix landed UNEVENLY — it regressed the three craft-strict
testers (Aisha/Wen/Rob) by missing the minor-aspect tail template and a second house-prose ordinal
path, while leaving the five steady 8s held by compare-discoverability.

Sub-bar in-audience testers: ALL 8 (Wen 5, Rob 6, Aisha 7; Dana/Jules/Sam/Marcus/Elena at 8).

ONE highest-leverage fix: **finish the de-boilerplate + ordinal pass on the two code paths it missed —
(a) give the long-tail MINOR aspects pair-specific, name-interpolated, directional bodies (reversed
pairs must differ; bodies use the actual names, not "the Saturn person"), and (b) make ALL house-overlay
prose use a single consistent ordinal form ("1st/7th/8th House") so the same placement never reads two
ways in one list.** This reverses the three regressions (Aisha/Wen/Rob, −6 advocacy combined) and is
the same edit surface as R2. Ride two cheap riders in the same build: surface the Compare card above the
fold on the home page (lifts the five steady 8s toward 9), and fix the share privacy-copy contradiction
(scope "stays in your browser only" / add consent line — Priya's trust regression, also a fit-user risk).

Non-gating notes (do NOT block ship): Priya (3) and Tomás (4) remain category non-fits at their ceiling.
Tomás confirms his two R2 defects (dead arrow, baseline-less counts) are fully fixed. Priya's PII-vs-claim
finding is the one non-fit note that IS in-audience-relevant — fold it into the fix edit.
