# chartwise — Panel SYNTHESIS round 5

URL tested: http://localhost:3099 (local production server, no deploy — edge economy).
Audience-weighted bar: **SHIP = ALL 8 in-audience testers at advocacy ≥ 9 AND Value = Yes AND Clarity = Yes.** The 2 non-fits (Priya, Tomás) are hard skeptics, carried forward, and do NOT gate.

Round-5 changes tested cold: (1) shared /chart/<token> links now unfurl with a PER-CHART preview image (name + Sun/Moon/Rising) via a per-token dynamic /opengraph-image route, not a generic default; (2) plain-English headlines no longer repeat verbatim for same-sign placements (planet-specific opener); (3) result area uses more screen width on wide desktops; Save-as-image card's zodiac accent more visible.

## Score table (all 10 testers)

| Tester | audienceFit | stance         | R4 adv | R5 adv | Δ      | Value | Clarity | At-bar (≥9)? | retested/carried |
|--------|-------------|----------------|--------|--------|--------|-------|---------|--------------|------------------|
| Sam    | in-audience | curious        | 10     | 10     | 0      | Yes   | Yes     | **Yes**      | retested |
| Wen    | in-audience | casual-skeptic | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | retested |
| Rob    | in-audience | casual-skeptic | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | retested |
| Aisha  | in-audience | curious        | 8      | 9      | **+1** | Yes   | Yes     | **Yes**      | retested |
| Dana   | in-audience | curious        | 8      | 9      | **+1** | Yes   | Yes     | **Yes**      | retested |
| Jules  | in-audience | curious        | 8      | 9      | **+1** | Yes   | Yes     | **Yes**      | retested |
| Marcus | in-audience | casual-skeptic | 9      | 8      | **−1 ⚠** | Yes | Yes    | No           | retested |
| Elena  | in-audience | casual-skeptic | 8      | 8      | 0      | Yes   | Yes     | No           | retested |
| Priya  | non-fit     | hard-skeptic   | 3      | 3      | —      | No    | Yes     | No           | carried |
| Tomás  | non-fit     | hard-skeptic   | 6      | 6      | —      | Yes (for audience) | Yes | No | carried |

## Tally

- **IN-AUDIENCE at-bar: 6 / 8** (Sam, Wen, Rob, Aisha, Dana, Jules). Up from 4/8 in round 4 — the high-water mark across all rounds (R2 3/8 → R3 5/8 → R4 4/8 → **R5 6/8**).
- **R4→R5 movement (in-audience):** Aisha 8→9 (+1, NEW at-bar), Dana 8→9 (+1, recovered the regression, NEW at-bar), Jules 8→9 (+1, NEW at-bar), Sam 10→10 (held), Wen 9→9 (held), Rob 9→9 (held), **Marcus 9→8 (−1 REGRESSION), Elena 8→8 (held short).**
- **Clarity remains universal: 10/10 Yes. Value remains 8/8 in-audience Yes** (Priya the only No, a non-fit).
- The three round-5 fixes landed where verified:
  - **(1) PER-CHART dynamic og:image** — VERIFIED by Jules, Dana, Sam, Marcus, Rob, Aisha, Wen: /chart/<token> now serves a per-token /opengraph-image (1200×630, 200) rendering the person's name + date/place + color-coded Sun/Moon/Rising chips + "free·instant·no signup" footer. Dana fetched two charts and confirmed distinct tokens / distinct titles / different image hashes (provably not a shared default). This single fix recovered Dana (8→9), cleared Jules' explicit 8→9 gate (8→9), and contributed to Aisha (8→9). The dominant round-4 blocker is RESOLVED.
  - **(3) wider desktop layout + brighter save-card accent** — Aisha (her exact 8→9 blocker) verified the reading column now runs ~876px wide on a 1440px viewport, the narrow centered lane is gone, and the zodiac accent is no longer faint. Flipped her to at-bar.
  - **(2) de-templated headlines** — PARTIAL. Most testers credit distinct planet-specific openers, but Elena (the tester whose regression this targeted) verified directly that the fix only added a planet-specific FRAME prefix; the sign-trait sentence behind it is still VERBATIM across same-sign placements (Einstein's Aries Mercury and Aries Venus both end "...you lead with instinct and act before you overthink. You thrive on being first."; her own Cancer Sun/Cancer Mars, Virgo Moon/Virgo Rising identical). Marcus independently corroborates the same-sign trait body still repeats.

## Remaining blockers (grouped by cause)

### ⚠ REGRESSION — Marcus 9→8 (place-search disambiguation, his unaddressed 2-round 9→10 item)

**Typing "Berlin"/"Austin" returns 5-6 identical "X, United States" rows with no state/region.** Marcus named this in round 4 as a 9→10 item; it was not addressed, and this round he dropped it from a "minor" to his explicit gate: "my non-techy friend will silently pick the wrong city and get the wrong chart." This is a true regression in his score but the SAME unaddressed complaint, now weighted as blocking. FIXABLE: add state/region (and country qualifier) to autocomplete rows. Corroborated independently: Rob saw "San Francisco, Argentina" ranked above the US city; Jules saw undifferentiated "Lisbon, United States" duplicates. Three testers, one defect — this is real, recurring, and the single highest-leverage remaining fix.

### Elena 8 (held — de-templating fix was cosmetic, not substantive)

**Same-sign placements still share a verbatim trait sentence; only a planet-specific prefix frame was added.** Elena verified the page still carries the "lookup-table" tell that blocked her at 8 last round, so she cannot move to 9. FIXABLE but deeper than round 4's attempt: vary the TRAIT SENTENCE by planet (Mercury-in-Aries ≠ Venus-in-Aries in the body, not just the lead frame), not merely prefix it. She holds Value=Yes + Clarity=Yes; this is craft/copy, not concept.

### Craft-ceiling nits (non-gating, named by at-bar testers — would push toward 10, NOT blocking)

- **Degree in the headline summary line — Wen, Marcus.** "Pisces Sun · House 10" still omits the degree (lives only in the table). Wen's 9→10 ask, three rounds running. (Both at-bar / near.)
- **Houses-table density — Rob.** The always-visible 12-house grid reads as a dense reference manual; he'd hide it behind an "Advanced/full table" toggle. (Rob at-bar; 9→10.)
- **Per-chart save-card visual variation — Rob, Dana.** Every Save-as-image card uses the same wheel motif; a believer's looks identical to a skeptic's. (Rob/Dana at-bar; 9→10. Note the og:image IS now per-chart; this is the downloadable PNG only.)
- **Aisha 9→10 polish:** zodiac accent reads as a corner-bleed rather than an anchored element; the wide houses table leaves the rightmost NODES column as dead-air em-dashes.
- **Jules 9→10:** og:image:alt still generic "Birth chart card"; no one-tap native/X share button on mobile.
- **Dana 9→10:** Save-as-image downloads with no on-page preview (clunky on phone).

### Audience (non-gating)

- Priya (3) and Tomás (6) carried forward unchanged — hard skeptics who will not advocate for any astrology product. Gap is audience, not defect.

## Plateau watch

- Fully-passing in-audience count by round: R2 3/8 → R3 5/8 → R4 4/8 → **R5 6/8**. This round MOVED UP decisively (+2, new high-water mark) and is NOT oscillating — it broke out of the 4-5/8 band. This is genuine CONVERGENCE, not a plateau: the dominant round-4 blocker (generic og:image) was definitively resolved and flipped three testers (Dana, Jules, Aisha) up at once. No tester cites the concept; no NEW craft class appeared — the two remaining misses are BOTH named, specific, fixable defects (one a 3-tester-corroborated place-search bug; one an incompletely-executed de-template), not escalating nitpicking. The plateau guard is NOT in view this round.

## Positives to protect

- Per-chart dynamic /opengraph-image — verified by 7 testers, distinct per token, the round-4 dominant blocker is closed; this is the viral share mechanic working.
- Wider desktop result column + brighter save-card accent — flipped Aisha to at-bar, no regression.
- Inline desktop expand now fires for Rob (his round-4 interaction blocker is resolved).
- Plain-English reading default-surfaced; share link works end-to-end (/chart/<token> renders cold, 200); per-planet degrees + retrograde (℞); zero console errors for every tester; fast (~3s compute); clean 375px mobile layout, no horizontal overflow (Sam, Dana, Jules, Elena confirm). Chart math credible (Einstein matches canonical; place search resolves).

## Recommendation

**FIX-AND-RETEST.** At-bar rose 4/8 → 6/8 (new high), with clear convergence — three testers flipped up on the resolved og:image blocker and the count broke out of its band, so this is NOT the plateau case (no oscillation, no concept doubt, no new craft class). Two specific, fixable defects remain between here and 8/8.

Single highest-leverage fix (clears the regression AND is corroborated by 3 testers):
- **Place-search disambiguation** — add state/region + country qualifier to autocomplete rows (and fix the ranking that put "San Francisco, Argentina" above the US city). This recovers **Marcus (8→9)** — his is a true regression on this exact unaddressed item — and removes a defect Rob and Jules also flagged. After this, only Elena remains short.

Second fix (independent, needed for 8/8):
- **Truly de-template the same-sign trait SENTENCE** (vary the body by planet, not just prefix a frame) → recovers **Elena (8→9)**. Round 5's attempt only prefixed; the verbatim body must change.

Shipping these two plausibly moves Marcus and Elena to ≥9 and reaches the 8/8 in-audience bar. Secondary 9→10 craft items (headline degrees, houses-table toggle, per-chart save-card art, on-page save preview) can ride along but are NOT bar-gating — do not grind them. DEPLOY GATE (carried from round 4): when finally shipping, confirm the prod deploy serves the per-token /opengraph-image route on Vercel (the absolute og:image URL 404s on localhost — a prod-URL artifact, not a regression, but must work post-deploy or every unfurl breaks). Do NOT redeploy per round — fix on localhost and re-test there.
