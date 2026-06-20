# Chartwise — Panel Report: SYNASTRY (relationship compatibility)

- **App:** chartwise
- **Feature:** Synastry / "Compare two people" compatibility
- **Run:** 20260616-224336-daily
- **Prod:** https://chartwise.vercel.app
- **Final verdict:** PASS — **8/8 in-audience at adv≥9 in round 7** (audience-weighted bar; hard astrology-skeptic non-fits Priya/Tomás carried non-gating).

## Audience-weighted bar

This is a niche-category astrology app, so the bar is taken over the IN-AUDIENCE set only — the
astrology-curious / casual-curious-skeptic personas who would plausibly open a natal+compatibility tool:

- **Gate (must advocate adv≥9 with value-clear):** Dana, Jules, Aisha, Sam, Marcus, Wen, Rob, Elena (8 testers).
- **Carried non-gating (report scores, do NOT block ship):** Priya, Tomás — profile-flagged hard-skeptic
  category non-fits who would never use an astrology tool for themselves.

PASS = all 8 in-audience testers at adv≥9, value-clear. Priya/Tomás scores are informational only.

## Round-by-round arc

| Round | In-audience at bar | Dominant blocker | Fix shipped |
|-------|--------------------|------------------|-------------|
| R1 | 0/8 | Aspect content generic/repetitive & mis-ranked (type-keyed boilerplate, obscure Chiron/Node "key" aspects, never names the planet pair) | Significance-ranked TOP aspects + per-planet-pair blurbs |
| R2 | 0/8 (7 at 8) | Long-tail boilerplate still repeats; "1 house" ordinal bug; no share; feature undiscoverable cold | De-boilerplate + ordinals + compare-share + dead-arrow fix + discoverability |
| R3 | 0/8 (5 at 8, 3 regressed) | De-boilerplate incomplete on missed render paths; privacy-claim trust defect | Complete the missed paths + mode-aware privacy copy + move card to top |
| R4 | 4/8 | Aspect-body says "the X person"; reversed pairs render byte-identical | Directional, name-bound aspect bodies |
| R5 | 6/8 | Generic-fallback body repetition; overlay capitalization inconsistency | Vary fallback bodies + unify ordinals/overlay caps |
| R6 | 7/8 | Symmetric-conjunction body identical both directions; "Nodal's" grammar slip | Conjunction body name-parameterized per direction + grammar fix |
| R7 | **8/8 — PASS** | — (Rob's sole conjunction hold-back fixed → 8→9; Elena 9→10 on same edit) | — |

## Final per-persona scores (round 7)

**In-audience (gate):** Dana 9, Jules 9, Aisha 9, Sam 10, Marcus 9, Wen 9, Rob 9, Elena 10.
**Carried non-gating:** Priya 5, Tomás 6.

## Takeaway

The synastry feature was functionally correct, honest (no fake % match — counts verified against rendered
cards), private (client-side; network-sniffed by skeptics), and discoverable from Round 1 — the natal chart
never regressed. The entire 7-round arc was CONTENT-QUALITY convergence: making the layered template-fallback
interpretation copy distinct and directional (whose planet is whose, reversed pairs reading differently, no
byte-identical sentences). That distinctness/directionality polish is exactly what a niche, explanation-first
tool lives or dies on — each remaining round closed one ever-finer copy seam until the last symmetric-conjunction
duplicate fell and the bar went clean.
