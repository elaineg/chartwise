# chartwise — Panel SYNTHESIS round 4

URL tested: http://localhost:3099 (local production server, no deploy — edge economy).
Audience-weighted bar: **SHIP = ALL 8 in-audience testers at advocacy ≥ 9 AND Value = Yes AND Clarity = Yes.** The 2 non-fits (Priya, Tomás) are hard skeptics, carried forward, and do NOT gate.

Round-4 changes tested cold: (R) desktop in-table expanded placement reading now spans FULL table width (was a ~280px sliver); (c) shared /chart/<token> links unfurl with a large preview image (og:image + summary_large_image); (d) Save-as-image card visually elevated (refined bg, zodiac-wheel accent filling old dead space, element pills, highlight box, branded footer).

## Score table (all 10 testers)

| Tester | audienceFit | stance         | R3 adv | R4 adv | Δ      | Value | Clarity | At-bar (≥9)? | retested/carried |
|--------|-------------|----------------|--------|--------|--------|-------|---------|--------------|------------------|
| Sam    | in-audience | curious        | 10     | 10     | 0      | Yes   | Yes     | **Yes**      | retested |
| Marcus | in-audience | casual-skeptic | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | retested |
| Wen    | in-audience | casual-skeptic | 9      | 9      | 0      | Yes   | Yes     | **Yes**      | retested |
| Rob    | in-audience | casual-skeptic | 8      | 9      | **+1** | Yes   | Yes     | **Yes**      | retested |
| Aisha  | in-audience | curious        | 7      | 8      | +1     | Yes   | Yes     | No           | retested |
| Dana   | in-audience | curious        | 9      | 8      | **−1 ⚠** | Yes | Yes    | No           | retested |
| Jules  | in-audience | curious        | 8      | 8      | 0      | Yes   | Yes     | No           | retested |
| Elena  | in-audience | casual-skeptic | 9      | 8      | **−1 ⚠** | Yes | Yes    | No           | retested |
| Priya  | non-fit     | hard-skeptic   | 3      | 3      | —      | No    | Yes     | No           | carried |
| Tomás  | non-fit     | hard-skeptic   | 6      | 6      | —      | Yes (for audience) | Yes | No | carried |

## Tally

- **IN-AUDIENCE at-bar: 4 / 8** (Sam, Marcus, Wen, Rob). Down from 5/8 in round 3.
- **R3→R4 movement (in-audience):** Rob 8→9 (+1, NEW at-bar), Aisha 7→8 (+1, recovered the regression but still short), Sam 10→10 (held), Marcus 9→9 (held), Wen 9→9 (held), Jules 8→8 (held), **Dana 9→8 (−1 REGRESSION), Elena 9→8 (−1 REGRESSION).**
- **Clarity remains universal: 10/10 Yes. Value remains 8/8 in-audience Yes** (Priya the only No, a non-fit).
- The three round-4 craft fixes landed where verified:
  - **(R) full-width desktop expanded reading** — confirmed measured at colSpan=4 / full table width by Marcus, Wen, Dana, Aisha, Sam; recovered Aisha 7→8 and caused NO functional regression to the houses-table structure (all degrees, retrograde marks, ASC/MC, nodes still render; zero console errors across all testers). NOTE: Rob could not get the inline expand to fire on desktop and did not credit it — single-persona, contradicted by 5 testers who measured it; likely interaction/discovery, not a defect.
  - **(d) elevated Save-as-image card** — confirmed genuinely elevated by Rob (his gate — flipped 8→9), Dana, Aisha, Sam; the zodiac-wheel accent fills the old dead space and the card reads as one designed object.
  - **(c) large-preview unfurl** — the meta upgrade landed (og:image 1200x630, twitter summary_large_image, personalized title) — but the IMAGE is generic (see blocker below), so it did NOT clear Jules and actively cost Dana a point.

## Remaining blockers (grouped by cause)

### ⚠ DOMINANT RECURRING — generic og:image (gates Jules; caused Dana regression; named by Wen + Sam)

**The shared-link unfurl image is a single static `og-default.png`, identical for every chart.** The meta upgrade (summary_large_image + per-chart TITLE/description) shipped, but the picture — the thing that stops a thumb in a feed — is the same generic branded card for Dana, her friend, and Einstein. Four testers independently flagged this:
- **Jules (held 8):** "Only the og text is personalized; the image is the same for me, my friend, and Einstein. A per-chart image (name · Sun/Moon/Rising) is the actual share-bait and my 8→9 gate."
- **Dana (9→8 REGRESSION):** she'd screenshot the PNG and post the image rather than share the link, because the link preview is generic. Explicitly: "reusing the per-chart card for og:image is the move that would make me paste links unprompted."
- **Wen, Sam** (both at-bar) named it as the 9→10 item.
FIXABLE and high-leverage: the app ALREADY renders a beautiful per-chart card for the Save-as-image download — generate that same composition as the og:image for /chart/<token> (dynamic OG image per token). One fix clears Jules and recovers Dana; rides Wen/Sam toward 10.
DEPLOY CAVEAT (not a localhost defect): the meta points to the absolute prod URL `chartwise.vercel.app/og-default.png`, which 404s today (pre-deploy). Correct on localhost; the prod deploy MUST serve the OG asset or every unfurl breaks. Flag for the final ship.

### ⚠ REGRESSION — Elena 9→8 (headline cards still repeat verbatim same-sign)

**The top "PLAIN ENGLISH" headline cards repeat verbatim for same-sign placements.** Elena's round-3 9→10 item was only partially fixed: the in-TABLE sign readings are now house-aware and distinct (good), but the headline cards at the very top still open identically — Aries Mercury and Aries Venus both literally open "Bold and direct, you lead with instinct and act before you overthink. You thrive on being first." That templating tell sits at the top of the page, so she can't honestly hold a 9. FIXABLE: de-template the headline cards the same way the table was fixed — the PLANET should change the opener, not just the house tail. (This is a true regression in her judgment, but a craft/copy fix, not a concept problem; she keeps Value Yes + Clarity Yes.)

### FIXABLE — Aisha 8 (result column too narrow on 1440px — one level up from the table fix)

**The table-internal full-width fix landed (she credited it, +1), but the macro layout still feels narrow.** The entire result column sits in a centered ~620px lane with large empty margins on a 1440px display. "The table-internal fix solved the exact symptom I named, but the 'feels narrow on desktop' sensation persists one level up." FIXABLE: widen the result container on desktop. Secondary: the save-card zodiac-wheel accent is too faint/low-contrast — nudge opacity up. Both push her to 9.

### FIXABLE — minor, non-gating (named by at-bar testers, would push toward 10)

- **Degree in the headline reading — Wen, Marcus.** Still shows "Pisces Sun · House 10" with no degree in the headline line; degrees live only in the table. Wen's explicit 9→10 ask, unaddressed two rounds running. (Both at-bar.)
- **Place-search disambiguation — Marcus, Dana.** Typing "Berlin"/"Austin" returns 5-6 identical "X, United States" rows with no state/region. Marcus: "a non-techy friend will silently pick the wrong city and get the wrong chart." (Both at/near-bar; Marcus's named blocker to a 10.)
- **Houses-table density — Rob.** The 12-house dropdown grid reads as a dense reference manual; he'd hide it behind an "Advanced / full table" toggle so the glanceable readings stay the hero. (Rob at-bar; his 9→10 item.)
- **Per-chart visual variation — Rob.** Every save-card uses the same wheel motif/layout, so a believer's card looks identical to a skeptic's. (Overlaps the dynamic-OG fix above.)

### Audience (non-gating)

- Priya (3) and Tomás (6) carried forward unchanged — hard skeptics who will not advocate for any astrology product regardless of quality. Gap is audience, not defect.

## Plateau watch

- Fully-passing in-audience count by round: R2 = 3/8 → R3 = 5/8 → R4 = 4/8. This round DROPPED. The drop is driven by two regressions (Dana, Elena) that are NOT concept problems: both are de-templating / per-chart-personalization craft on surfaces we just shipped, and both testers held Value=Yes + Clarity=Yes. NOT a 3-round flat plateau yet (R3 rose), but the at-bar count has now stalled around 4-5/8 for three rounds with the SAME class of complaint (templating / generic-not-personalized output) recurring. The next round must move it or the plateau guard is in view.

## Positives to protect

- Full-width desktop expanded reading — measured correct by 5 testers, zero regression to the houses table.
- Elevated Save-as-image card — flipped Rob to at-bar; confirmed designed-object quality by 4 testers.
- summary_large_image meta + per-chart title/description on /chart/<token> — the unfurl is now large and on-brand (the IMAGE just needs to go per-chart).
- Plain-English reading default-surfaced; share link works end-to-end (POST→share, /chart/<token> renders cold, 200); per-planet degrees + retrograde marks; zero console errors for every tester; fast on mobile (Dana, Sam, Jules confirm clean stacked mobile layout, no horizontal overflow).

## Recommendation

**FIX-AND-RETEST.** At-bar dipped 5/8 → 4/8, but every short tester holds Value=Yes + Clarity=Yes and no one cites the concept — the misses are all personalization/de-templating craft, and one fix dominates.

Highest-leverage fix, hitting the most testers at once:
- **DYNAMIC per-chart og:image** (render the existing Save-as-image card composition as the /chart/<token> og:image, per token) → unblocks **Jules (8→9)**, recovers **Dana (8→9)**, and rides Wen + Sam toward 10. This is the single biggest mover this round and was named by four testers.

Plus two independent regression/craft fixes:
- **De-template the headline PLAIN-ENGLISH cards** (planet changes the opener, not just the house tail) → recovers **Elena (8→9)**.
- **Widen the desktop result container** + nudge the save-card zodiac-wheel opacity up → moves **Aisha (8→9)**.

Shipping these three plausibly moves Jules, Dana, Elena, and Aisha to ≥9 and reaches the 8/8 in-audience bar. Secondary 9→10 items (headline degrees, place-search state disambiguation, houses-table toggle) can ride along but are not bar-gating. DEPLOY GATE: when finally shipping, confirm the prod deploy serves the OG image asset (currently 404s at the absolute prod URL pre-deploy). Do NOT redeploy per round — fix on localhost and re-test there.
