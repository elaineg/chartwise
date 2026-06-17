# chartwise — Panel SYNTHESIS round 3

URL tested: http://localhost:3099 (local production server, no deploy — edge economy).
Audience-weighted bar: **SHIP = ALL 8 in-audience testers at advocacy ≥ 9 AND Value = Yes AND Clarity = Yes.** The 2 non-fits (Priya, Tomás) are hard skeptics, carried from earlier rounds, and do NOT gate.

Round-3 changes tested cold: NEW "Save as image" PNG share card; de-templated daily-transit "Today" copy; per-planet degree-within-sign (e.g. "Sun 23° Pisces"); full-width in-table expanded readings on desktop; OpenGraph/Twitter meta on shared /chart/<token> links.

## Score table (all 10 testers)

| Tester | audienceFit | stance         | R2 adv | R3 adv | Δ    | Value | Clarity | At-bar (≥9)? | retested/carried |
|--------|-------------|----------------|--------|--------|------|-------|---------|--------------|------------------|
| Sam    | in-audience | curious        | 9      | 10     | +1   | Yes   | Yes     | **Yes**      | retested |
| Marcus | in-audience | casual-skeptic | 9      | 9      | 0    | Yes   | Yes     | **Yes**      | retested |
| Dana   | in-audience | curious        | 9      | 9      | 0    | Yes   | Yes     | **Yes**      | retested |
| Wen    | in-audience | casual-skeptic | 8      | 9      | +1   | Yes   | Yes     | **Yes**      | retested |
| Elena  | in-audience | casual-skeptic | 8      | 9      | +1   | Yes   | Yes     | **Yes**      | retested |
| Jules  | in-audience | curious        | 8      | 8      | 0    | Yes   | Yes     | No           | retested |
| Rob    | in-audience | casual-skeptic | 8      | 8      | 0    | Yes   | Yes     | No           | retested |
| Aisha  | in-audience | curious        | 8      | 7      | **-1** ⚠ | Yes | Yes  | No           | retested |
| Priya  | non-fit     | hard-skeptic   | 3      | 3      | —    | No    | Yes     | No           | carried |
| Tomás  | non-fit     | hard-skeptic   | 6      | 6      | —    | Yes (for audience) | Yes | No | carried |

## Tally

- **IN-AUDIENCE at-bar: 5 / 8** (Sam, Marcus, Dana, Wen, Elena — all advocacy ≥9, Value Yes, Clarity Yes). Up from 3/8 in round 2.
- **R2→R3 movement (in-audience):** Sam 9→10 (+1), Wen 8→9 (+1), Elena 8→9 (+1), Marcus 9→9 (held), Dana 9→9 (held), Jules 8→8 (held), Rob 8→8 (held), **Aisha 8→7 (−1, REGRESSION).**
- **Clarity remains universal: 10/10 Yes. Value remains 8/8 in-audience Yes** (Priya the only No, a non-fit).
- The two named round-2 recurring blockers landed and moved testers:
  - **(a) Save-as-image PNG card** — confirmed working by every retested tester; flipped Sam to 10 and is the named delight for Dana, Jules, Sam, Rob.
  - **(b) de-templated transit copy** — confirmed genuinely varied by Marcus, Elena, Sam; flipped Elena 8→9 and held Marcus at 9. Mad-lib smell is gone from the transit block.
  - **Per-planet degrees** flipped Wen 8→9 ("the astrology tool that shows its work").

## Remaining blockers (grouped by cause)

### ⚠ REGRESSION — Aisha 8 → 7 (craft, single-persona but a drop)

**(R) In-table expanded readings are NOT full-width on desktop — the round-2 fix only half-landed.** Aisha (1440px display) reports the expanded reading opens inline below the chip but wraps into a ~280px ribbon while the right ~40% of the table sits empty. This was a named round-2 item promised as a full-width fix; she counted it half-done and dropped a point. FIXABLE (CSS — expanded cell should span the table width / break out of the column). Note: this is the only regression and is craft, not concept; she keeps Value Yes + Clarity Yes and praised the de-templated readings + share card.

### FIXABLE — share-card / unfurl polish (gates Jules, Rob; rides Aisha)

**(c) No og:image on shared /chart/ links — Jules (held at 8).** Round-2 OG complaint only partially fixed: share pages now have og/twitter *title + description* but NO og:image/twitter:image, and twitter:card is "summary" not "summary_large_image", so a pasted link still unfurls text-only with no visual. For a constant-poster this is the 8→9 gate. FIXABLE (add og:image = the share-card PNG + summary_large_image). Jules also wants the Save-as-image button surfaced inside the reading, not only on the saved-chart card.

**(d) Share card visual craft — Rob (held at 8).** The card works one-tap but the brand designer reads the navy→purple gradient as flat/template-y, sees dead space in the bottom third, and finds the element bar too data-ish for a glanceable card — "DM-able to a believer, not public-story-worthy." FIXABLE (gradient grain/glow, tighten composition, lighten the data on the card). This is the same export surface as (c)/(a), so a single share-card polish pass addresses (c) image + (d) craft together.

### FIXABLE — minor, non-gating (named by at-bar testers, would push toward 10)

- **Degree in the headline reading — Wen, Marcus.** Headline shows "Pisces Sun · House 10" with no degree; degrees live only in the houses table. Wen wants the degree where the claim is first made. (Both already at-bar.)
- **Same-sign natal readings still repeat verbatim — Elena.** Transit copy is de-templated, but two same-sign natal placements (e.g. Einstein's Aries Mercury & Aries Venus) still open with an identical sentence — a smaller version of the templating smell. (Elena at-bar; this is her 9→10 item, and overlaps Aisha's broader craft scrutiny.)
- **Save-as-image discoverability — Sam, Jules.** Button lives in the saved-charts row, not beside the reading; took a beat to find. (Sam at 10 already; non-blocking.)
- **Place search disambiguation — Marcus.** Many identical "Berlin, United States" rows with no state to disambiguate (geocoder edge, residual from round 2).

### Audience (non-gating)

- Priya (3) and Tomás (6) carried forward unchanged — hard skeptics who will not advocate for any astrology product regardless of quality. Gap is audience, not defect.

## Positives to protect

- Save-as-image PNG card (big-three chips, element bar, plain-English takeaway, "no signup" footer, sensible filename) — confirmed by all 8; the viral trigger now exists.
- De-templated transit copy with real natal cross-references and today's date — confirmed varied (Marcus, Elena, Sam).
- Per-planet degrees + retrograde markers everywhere (Sun 23° Pisces, Uranus 1° Virgo℞) — flipped Wen to trust; verified ephemeris against known charts.
- Plain-English reading still default-surfaced; share link works end-to-end (POST→201, /chart/<token> renders cold for a recipient); zero console errors for every tester; fast on mobile.

## Recommendation

**FIX-AND-RETEST.** Not a plateau: at-bar rose 3/8 → 5/8 and three testers gained a point (Sam, Wen, Elena), with both round-2 recurring blockers cleared. Three in-audience testers remain short, all on FIXABLE craft/polish of surfaces we just shipped — none cite the concept.

Highest-leverage fix is a **single share-card / unfurl polish pass** that knocks out two of the three short testers at once:
- **(c) add og:image (the share-card PNG) + twitter summary_large_image** → unblocks Jules (8→9).
- **(d) elevate the card's visual craft** (gradient grain/glow, tighter composition, less data) → unblocks Rob (8→9).

Plus the one **regression fix: (R) make the in-table expanded reading truly full-width on desktop** → recovers Aisha (7→back toward 9).

Shipping (c)+(d)+(R) plausibly moves Jules, Rob, and Aisha to ≥9 and reaches the 8/8 in-audience bar. Secondary 9→10 items (headline degrees, last same-sign verbatim line, save-button placement) can ride along but are not bar-gating. Do NOT redeploy per round — fix on localhost and re-test there.
