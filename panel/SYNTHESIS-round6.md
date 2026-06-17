# chartwise — Panel SYNTHESIS round 6

URL tested: http://localhost:3099 (local production server, no deploy — edge economy).
Audience-weighted bar: **SHIP = ALL 8 in-audience testers at advocacy ≥ 9 AND Value = Yes AND Clarity = Yes.** The 2 non-fits (Priya, Tomás) are hard skeptics, carried forward, and do NOT gate.

Round-6 changes tested cold: (1) place/city search now disambiguates same-name cities with a state/region ("Austin, TX" vs "Austin, MN"; "Berlin, Germany" ranked above the US Berlins; "San Francisco, CA" above the Argentina city) and removes duplicate-looking rows — targeted Marcus/Rob/Jules; (2) plain-English readings now genuinely distinct per planet even for two planets in the SAME sign (sign quality expressed through each planet's own domain) — targeted Elena.

## Score table (all 10 testers)

| Tester | audienceFit | stance         | R5 adv | R6 adv | Δ      | Value | Clarity | At-bar (≥9)? | retested/carried |
|--------|-------------|----------------|--------|--------|--------|-------|---------|--------------|------------------|
| Sam    | in-audience | curious        | 10     | 10     | 0      | Yes   | Yes     | **Yes**      | retested |
| Marcus | in-audience | casual-skeptic | 8      | 9      | **+1** | Yes   | Yes     | **Yes**      | retested |
| Elena  | in-audience | casual-skeptic | 8      | 9      | **+1** | Yes   | Yes     | **Yes**      | retested |
| Rob    | in-audience | casual-skeptic | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | retested |
| Aisha  | in-audience | curious        | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | retested |
| Dana   | in-audience | curious        | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | retested |
| Jules  | in-audience | curious        | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | retested |
| Wen    | in-audience | casual-skeptic | 9      | 8      | **−1 ⚠** | Yes | Yes     | No           | retested |
| Priya  | non-fit     | hard-skeptic   | 3      | 3      | —      | No    | Yes     | No           | carried |
| Tomás  | non-fit     | hard-skeptic   | 6      | 6      | —      | Yes (for audience) | Yes | No | carried |

## Tally

- **IN-AUDIENCE at-bar: 7 / 8** (Sam, Marcus, Elena, Rob, Aisha, Dana, Jules). One short: Wen at 8.
- Round-by-round at-bar: R2 3/8 → R3 5/8 → R4 4/8 → R5 6/8 → **R6 7/8** (new high-water mark).
- **R5→R6 movement (in-audience):** Marcus 8→9 (+1, RECOVERED — his place-search regression is fixed), Elena 8→9 (+1, RECOVERED — de-template now substantive), Sam 10→10 (held), Rob 9→9 (held), Aisha 9→9 (held), Dana 9→9 (held), Jules 9→9 (held), **Wen 9→8 (−1 REGRESSION).**
- **Clarity remains universal: 10/10 Yes. Value remains 8/8 in-audience Yes** (Priya the only No, a non-fit).
- **Both round-6 target fixes LANDED and were independently verified:**
  - **(1) Place-search disambiguation** — VERIFIED by all 8 retested testers. Marcus: every row now carries state/region, ranking sane (Berlin/Germany first, Austin/TX first), identical-"X, United States" duplicates gone — his regression item RESOLVED. Rob: confirmed the exact "San Francisco, CA above the Argentina city" ranking bug is fixed. Jules: "Lisbon" → 8 disambiguated rows, no duplicates. Sam/Wen/Dana/Aisha: "Springfield" → 8 state-tagged rows, zero dupes. The 3-tester-corroborated round-5 defect is CLOSED.
  - **(2) Per-planet distinct same-sign readings** — VERIFIED by Elena (compared Einstein's Aries Mercury/Venus and her own Cancer Sun/Cancer Mars full sentences word-for-word: now genuinely distinct, lookup-table tell gone — her exact blocker RESOLVED), Wen (Einstein's Aries Mercury/Venus/Saturn each distinct, keyed to planet + house), Aisha (3 Leo placements read differently — "now feels authored"), Sam (3 Taurus + 2 Pisces all distinct). The round-5 incompletely-executed de-template is now substantive.

## Remaining blocker (the single miss)

### ⚠ Wen 9→8 — degree omitted from the headline/chip summary line (her 4-rounds-running 9→10 ask, now weighted as her gate)

The headline big-three chips read "☉ Pisces Sun · House 10" with NO degree; the degree (e.g. 23°) appears only in the houses table, and the share/save-image inherit the degree-less headline. Wen (data-hygiene analyst) has named this as a 9→10 polish item for FOUR rounds; this round she weights it as the reason she rounds DOWN to 8 rather than up to 9. FIXABLE and trivial: add the degree token to each big-three chip (one token per chip) — she stated explicitly "one token per chip and I'd round up." This is craft/copy, not concept; she holds Value=Yes + Clarity=Yes and credits both round-6 fixes.

Note: this is the SAME long-standing item, now re-weighted as blocking by the one tester for whom precise numeric provenance is a professional value. It is a true −1 from her round-5 score in the table, but NOT a new craft class and NOT a concept doubt — it is the most precisely-specified, lowest-effort fix in the entire panel history.

## Craft-ceiling nits (non-gating, named by at-bar testers — push toward 10, NOT blocking)

- **Per-chart save-card art / caption — Rob, Dana.** Decorative wheel identical on every downloadable PNG; Rob saw the one-line caption literally identical ("Sun in House 11 — career and legacy are central") across two different charts. (Both at-bar; 9→10. The OG unfurl IS per-chart and verified; this is the downloadable PNG only.)
- **Save-as-image on-page preview — Dana.** Phone still fires a direct download with no preview; the OG card endpoint already renders the exact art and could be surfaced in-app. (Dana at-bar; 9→10.)
- **NODES column dead-air — Aisha.** South/North Node are now proper pills, but 10 of 12 table rows are a lone em-dash, so the column reads ~85% empty on a wide display. Also: place-search dropdown overflows the form card's bottom edge over the disclaimer. (Aisha at-bar; 9→10.)
- **og:image:alt still generic "Birth chart card" + no one-tap native/X share on mobile — Jules.** (Jules at-bar; 9→10; a11y-only alt + shareability convenience.)
- **House-grid cells expand to "—" rather than a sentence — Marcus.** Rich copy lives only in the top reading block. (Marcus at-bar; 9→10.)
- **Personalized transit line — Elena, Dana.** Dana saw a "FOR YOUR CHART" transit line (strong recurring hook); Elena wants the loop fully closed with "today's Moon is sitting on your Sun"-style personalization. (Both at-bar; 9→10 recurrence deepener.)

## Audience (non-gating)

- Priya (3) and Tomás (6) carried forward unchanged — hard skeptics who will not advocate for any astrology product. Gap is audience, not defect.

## Plateau / oscillation watch

- At-bar by round: R2 3/8 → R3 5/8 → R4 4/8 → R5 6/8 → **R6 7/8**. The count is still RISING (+1, new high). BUT this round shows the oscillation signature the directive warned about: the two targeted misses (Marcus, Elena) both recovered cleanly, AND a previously-passing tester (Wen) dropped one notch — testers trading places near the ceiling rather than converging cleanly to 8/8.
- HOWEVER, Wen's drop is NOT an escalating new craft nit and NOT a different/novel complaint: it is her OWN 4-round-running, single, precisely-named, trivially-fixable item (degree token on the chip), which she explicitly says is the one thing between 8 and 9. This is distinguishable from "escalating craft-nitpicking at a quality ceiling" — it is one concrete defect with a one-line fix and an explicit tester commitment to round up once fixed. There is clear upward momentum (both targeted fixes landed and verified; no concept doubt; no new craft class). This is the 7/8 + one-clearly-fixable-named-defect + momentum case the directive carves out for a final FIX-AND-RETEST.

## Positives to protect

- Place-search disambiguation + ranking — verified by all 8 testers, the 3-tester round-5 defect is closed.
- Per-planet distinct same-sign readings — verified word-for-word by Elena/Wen/Aisha/Sam; "now feels authored."
- Per-chart dynamic /opengraph-image — re-verified per-chart, distinct per token (Jules' 59KB live PNG, Dana's Einstein-specific card, Sam's 1200×630 render). The viral share mechanic works.
- Zero console/page errors for every tester; fast cold load (~4s) to full reading; clean 375px mobile, no horizontal overflow; share link end-to-end (201 token, /chart/<id> cold-loads 200, unfurls). Chart math credible (Einstein canonical; lat/long echoed honestly).

## Recommendation

**FIX-AND-RETEST (final, single fix).** At-bar rose 6/8 → 7/8 (new high) and BOTH round-6 target fixes landed and were verified, recovering Marcus and Elena. Exactly ONE in-audience tester (Wen) is short, on ONE precisely-named, trivially-fixable defect she has flagged for four rounds and has explicitly committed to round up on once fixed.

Single fix:
- **Add the degree token to each big-three headline/summary chip** (e.g. "☉ Pisces Sun 23° · House 10"), and carry it through to the share/save-image headline. The degree already exists in the houses-table data — this is surfacing it on the chip, ~one token per chip. Recovers **Wen (8→9)** and reaches the **8/8 in-audience bar**.

This is NOT the PARK case: there is upward momentum, no concept doubt, no new craft class, and the single miss is the lowest-effort, most-specified fix in panel history with a stated tester commitment. Ship the secondary 9→10 craft items (per-chart save-card art/caption, on-page save preview, NODES column, og:image:alt, native share, personalized transit line) only if convenient — they are NOT bar-gating; do not grind them.

DEPLOY GATE (carried forward): when finally shipping, confirm the prod deploy serves the per-token /opengraph-image route on Vercel (the absolute og:image URL 404s on localhost — a prod-URL artifact, must work post-deploy or unfurls break). Do NOT redeploy per round — fix on localhost and re-test there.
