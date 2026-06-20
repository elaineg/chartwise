# Chartwise — SYNTHESIS Round 4 (SYNASTRY / "Compare two people" feature)

App under test: local `next start` prod server, http://localhost:3099. Round 4 re-tests the
R3 fixes: (1) surface the Compatibility card as the FIRST block after the chart summary on
both viewports, (2) finish the de-boilerplate + name-interpolation pass on the aspect tail,
(3) one consistent numeric ordinal form everywhere in house-overlay prose, (4) scope/disclose
the share privacy copy (PII-vs-claim contradiction).

Audience classification carried unchanged from Rounds 1–3 (per-profile `astrology_stance` +
`audienceFit`):
- IN-AUDIENCE (GATE — adv>=9 + value-clear): Dana, Jules, Aisha, Sam, Marcus, Wen, Rob, Elena (8).
- CARRIED NON-GATING (hard-skeptic non-fits, report only): Priya, Tomás.

## Per-tester results

| Tester | In-audience? | Adv | Value | Clarity | Dominant note |
|--------|--------------|-----|-------|---------|---------------|
| Dana   | YES (gate)        | 9 | Yes | Yes | R3 blocker (compare buried) FIXED on both viewports; share works, ordinals consistent, names in headers. Off 10 only by reversed mutual pairs (Jupiter☌Venus vs Venus☌Jupiter) printing verbatim-identical body prose — reads as copy-paste when screenshotted. |
| Jules  | YES (gate)        | 9 | Yes | Yes | R3 sole hold-back (compare undiscoverable) FIXED — card now where she'd see it on mobile; share reopens full reading on fresh phone. Off 10 only by templated reversed-pair body ("the Mars person" identical both directions); headers already named. |
| Aisha  | YES (gate)        | 8 | Yes | Yes | +1 (7→8). Ordinals fully FIXED (one numeric form), share end-to-end, responsive clean. Off 9 by inner-planet aspect BODIES still saying "the Sun/Moon/Saturn person" + reversed pairs byte-identical — directional naming fixed in headers only, half-done in bodies. |
| Sam    | YES (gate)        | 9 | Yes | Yes | +1 (8→9). R3 blocker (compare invisible) FIXED — first card after summary; share renders clean forward-able artifact. Off 10 by 2 reversed pairs sharing identical body text. (Person B still manual entry — acceptable, A pre-filled.) |
| Marcus | YES (gate)        | 8 | Yes | Yes | FLAT (8→8). Compare-card placement (his R3 blocker) FIXED; tail/overlays/ordinals/share/responsive all clean. Held at 8 by his explicit, repeated R3 ask still UNADDRESSED: no "for fun, not a prediction" honest-framing line anywhere. |
| Wen    | YES (gate)        | 8 | Yes | Yes | +3 (5→8). Both R3 trust-killers (verbatim tail, mixed ordinals) genuinely FIXED + hand-verified (2x max repeat vs ~44; one numeric form). Off 9 by header/body caps drift, ~1.5–2.5s silent share button (no spinner), generic same-house overlay line repeats. |
| Rob    | YES (gate)        | 7 | No  | Yes | +1 (6→7). Ordinals + share FIXED, card placement right. Held below 8 by two unaddressed R3 items: reversed-pair aspect bodies STILL verbatim/type-keyed (no names in body) + no "for fun, not science" framing. Value=No: a fun toy, nothing he'd reach for twice. |
| Elena  | YES (gate)        | 9 | Yes | Yes | +1 (8→9). R3 placement blocker GONE — compare first thing after chart on phone; share round-trips. Off 10 only by symmetric reversed pairs reusing identical prose verbatim (cosmetic, looks like a glitch). |
| Priya  | carried (non-fit) | 4 | No  | Yes | +1 (3→4). R3 trust regression (privacy lie) FIXED + network-verified: share now honestly discloses server upload; on-device claim correctly scoped. Cap is pure category skepticism — won't advocate an astrology tool regardless of craft. |
| Tomás  | carried (non-fit) | 5 | No  | Yes | +1 (4→5). Share fine-print now genuinely honest — flipped his biggest trust objection. Cap is category (hard astrology ceiling). Nits: 7 lowercase "Nth house" stragglers; wants a data-retention/deletion line. |

## In-audience tally at the bar (adv>=9 with value-clear)

In-audience advocacy: Dana 9, Jules 9, Aisha 8, Sam 9, Marcus 8, Wen 8, Rob 7, Elena 9.
**4 of 8 in-audience testers at adv>=9** (Dana, Jules, Sam, Elena) — all value=Yes.
Sub-bar: Aisha 8, Marcus 8, Wen 8, Rob 7.

Carried non-fits (non-gating): Priya 4, Tomás 5.

## Movement vs Round 3

Across-the-board improvement; every tester moved up or held, none regressed.
- Dana 8→9 (+1), Jules 8→9 (+1), Sam 8→9 (+1), Elena 8→9 (+1): R3 compare-discoverability
  blocker FIXED on both viewports — all four cross the bar. Their ONLY residual is the
  reversed-pair duplicate body prose.
- Aisha 7→8 (+1): ordinals fully fixed; held by inner-planet body naming still half-done.
- Wen 5→8 (+3): both R3 trust-killers resolved and hand-verified — the biggest single recovery.
- Rob 6→7 (+1): ordinals/share/placement fixed; held by reversed-pair bodies + no framing.
- Marcus 8→8 (FLAT): everything landed EXCEPT his repeated honest-framing ask.
- Priya 3→4 (+1), Tomás 4→5 (+1): non-gating; privacy-honesty fix earned the +1, category caps the rest.

Net: 0-of-8 at the bar in R3 → 4-of-8 in R4. The R3 highest-leverage fixes (compare
discoverability + ordinals + share-privacy honesty) all landed cleanly. The remaining gap
concentrates on ONE shared defect plus one independent ask.

## Single dominant blocker

**Reversed-pair aspect BODY prose is still verbatim-identical / type-keyed.** Symmetric
same-planet pairs (e.g. Einstein's Jupiter ☌ Obama's Venus vs Einstein's Venus ☌ Obama's
Jupiter; Moon□Uranus vs Uranus☍Moon) render byte-identical paragraphs back-to-back, and the
inner-planet library bodies still say "the Sun/Moon/Saturn person" instead of the actual
names. The HEADERS were fixed to be named + directional in R3; the BODIES were not. This is
the explicit residual for SIX of the eight in-audience testers — all four at-bar testers
(Dana, Jules, Sam, Elena) name it as their ONLY thing between 9 and 10, and Aisha and Rob
both name it as a sub-9 hold-back. Fixing it almost certainly lifts the four 9s to 10 and
pulls Aisha (8→9) over the bar; it's the single highest-leverage edit, and it is the SAME
edit surface the R3 fix touched (headers) — just extend name-interpolation + directional
distinction into the blurb bodies.

Two independent secondary items (do NOT each block, but they gate specific testers):
- **No "for fun, not a prediction" honest-framing line** (Marcus, Rob). Marcus is FLAT at 8
  solely on this — his explicit R3 ask, twice unaddressed. One honest line near the top
  converts Marcus 8→9 and removes Rob's second hold-back. Cheap, ride it in the same build.
- **Polish nits** (Wen): ~1.5–2.5s silent share button (add a spinner), header/body caps
  drift ("8th House" vs "8th house" — cosmetic), generic same-house overlay line repeats.
  These hold Wen at 8; the caps drift is also flagged by Dana/Priya/Tomás as cosmetic.

## VERDICT: ITERATE

4 of 8 in-audience testers at adv>=9 (Dana 9, Jules 9, Sam 9, Elena 9); four sub-bar
(Aisha 8, Marcus 8, Wen 8, Rob 7). Strong, uniform movement vs R3 (0→4 at bar, no
regressions, +3 recovery on Wen) — the fixes landed, and the remaining gap is a small,
named, fixable defect cluster, NOT category ceiling or audience-fit. This is not a PARK:
the four sub-bar in-audience testers are gated by concrete copy/code defects each explicitly
named, all on the same or adjacent edit surfaces.

Sub-bar in-audience testers: Aisha (8), Marcus (8), Wen (8), Rob (7).

ONE highest-leverage fix: **interpolate the actual person names + directional distinction
into the aspect-tail BODY prose (not just headers) so reversed/symmetric pairs no longer
render byte-identical and inner-planet bodies stop saying "the Saturn/Sun/Moon person."**
This is the sole residual for all four at-bar testers (should lift them toward 10) and a
named hold-back for Aisha (8→9, likely crossing the bar) and Rob. Ride two cheap riders in
the same build: (1) add one "for fun, not a prediction" honest-framing line near the top of
the synastry output (lifts Marcus 8→9, removes Rob's second hold-back); (2) add a share-button
spinner + normalize header/body ordinal capitalization to one form (lifts Wen 8→9). With
those three, all 8 in-audience testers plausibly reach adv>=9 next round.

Non-gating notes (do NOT block ship): Priya (4) and Tomás (5) remain category non-fits at
their ceiling; both confirm the R3 privacy-honesty regression is fully fixed and
network-verified. Tomás's data-retention/deletion line and the 7 lowercase "house"
stragglers are optional cosmetic polish, not gates.
