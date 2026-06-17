# chartwise — Panel SYNTHESIS round 2

URL tested: http://localhost:3099 (local production server, no deploy).
Audience-weighted bar: **SHIP = ALL 8 in-audience testers at advocacy ≥ 9 AND Value = Yes AND Clarity = Yes.** The 2 non-fits (Priya, Tomás) are hard skeptics, carried from round 1, and do NOT gate.

## Score table (all 10 testers)

| Tester | audienceFit | stance         | R1 adv | R2 adv | Value | Clarity | At-bar (≥9)? | carried/retested |
|--------|-------------|----------------|--------|--------|-------|---------|--------------|------------------|
| Marcus | in-audience | casual-skeptic | 8      | 9      | Yes   | Yes     | **Yes**      | retested |
| Sam    | in-audience | curious        | 7      | 9      | Yes   | Yes     | **Yes**      | retested |
| Dana   | in-audience | curious        | 7      | 9      | Yes   | Yes     | **Yes**      | retested |
| Jules  | in-audience | curious        | 8      | 8      | Yes   | Yes     | No           | retested |
| Aisha  | in-audience | curious        | 7      | 8      | Yes   | Yes     | No           | retested |
| Wen    | in-audience | casual-skeptic | 6      | 8      | Yes   | Yes     | No           | retested |
| Elena  | in-audience | casual-skeptic | 6      | 8      | Yes   | Yes     | No           | retested |
| Rob    | in-audience | casual-skeptic | 6      | 8      | **Yes (flipped from No)** | Yes | No | retested |
| Priya  | non-fit     | hard-skeptic   | 3      | 3      | No    | Yes     | No           | carried |
| Tomás  | non-fit     | hard-skeptic   | 6      | 6      | Yes (for audience) | Yes | No | carried |

## Tally

- **IN-AUDIENCE at-bar: 3 / 8** (Marcus, Sam, Dana — all advocacy 9, Value Yes, Clarity Yes).
- **Every in-audience tester rose or held — nobody dropped:**
  - Marcus 8 → 9 (+1)
  - Sam 7 → 9 (+2)
  - Dana 7 → 9 (+2)
  - Jules 8 → 8 (held)
  - Aisha 7 → 8 (+1)
  - Wen 6 → 8 (+2)
  - Elena 6 → 8 (+2)
  - Rob 6 → 8 (+2)
- **Rob's Value flipped No → Yes** — the round-1 in-audience Value blocker is cleared; in-audience Value is now 8/8 Yes.
- **Clarity remains universal: 10/10 Yes.**
- The five in-audience testers below the bar sit at exactly **8** — a tight cluster one point short, all citing the same one or two polish gaps below, none citing the concept.
- Non-fits unchanged (Priya 3, Tomás 6), as expected; they do not gate.

## Remaining blockers (grouped by cause, ranked by # testers)

### FIXABLE — dominant (these gate the 8-cluster)

**(a) No one-tap shareable image/card — RECURRING, 4 testers (Dana, Jules, Rob, Sam).** Astrology sharing is visual; share is currently a URL/link only, so testers still manually screenshot the big-three / plain-English section to drop into a chat. Sam, Rob, Dana explicitly name a "screenshot-ready" / "save image card" as the thing standing between an 8 and a 9 — the shareable moment exists (big-three chips) but can't be exported in one tap.

**(b) Repetitive / template-y "FOR YOUR CHART" daily-transit copy — RECURRING, 4 testers (Marcus, Elena, Sam, Jules).** The transit lines reuse one sentence frame: "X is currently in Y, the same sign as your natal Z… activating the same area of your chart right now," repeated 3–4 times verbatim. Capitalization/dates are now clean, but the identical skeleton still reads as a mad-lib. Marcus, Elena, Sam each call this their single reason for not being at a 9; Jules lists it third.

### FIXABLE — single-persona (real but not recurring)

- **OpenGraph/Twitter card on shared /chart/ links — Jules only.** Posting a /chart/ link yields a bare URL + generic title, no preview image. For a constant-poster this is the difference between "I'll share" and "this spreads." (Related to (a) but a distinct fix: page meta tags, not an export button.)
- **Per-planet degrees/longitudes — Wen only.** Sign + house now show and are internally consistent, but no degrees, so a data-hygiene user can't reconcile the ephemeris math and takes it "partly on faith." Lightweight, not a bar-blocker on its own.
- **In-table expanded-cell sliver + verbatim same-sign boilerplate — Aisha only.** Table pill-expansions still render into a cramped ~50–120px column (the full-width fix only landed on the new top section, not the table), and identical reading text repeats verbatim across same-sign placements (e.g. "Precise and helpful…" under Virgo Rising / Mercury / Venus). Both craft/polish; the top section makes the table-sliver largely moot for her.

### Audience (non-gating)

- Priya (3) and Tomás (6) will not advocate for an astrology product regardless of quality — their gap is audience, not defect. Their craft feedback was already folded into the round-1 geocoder fix.

## Positives to protect (all round-1 fixes verified landed)

- **Plain-English reading surfaced by default** — "YOUR CHART, IN PLAIN ENGLISH" now sits above the houses table with per-placement prose; confirmed by Marcus, Sam, Dana, Rob, Aisha, Jules, Elena. This is the differentiator and the most-screenshotted moment; do not re-bury it.
- **Geocoder rebuilt** — famous-city-first ranking, readable country names (not region codes), "City, Country" format, aliases. Confirmed by Marcus (Austin/Paris/London), Elena (San Francisco/London, "San Francisco, USA" now returns), Wen (Tokyo/Taipei), Dana, Rob. (Residual: Jules saw 4 undifferentiated "Austin, United States" rows w/ no state + "NYC" alias miss — minor edge, not a blocker.)
- **Auto-scroll after compute** — drops the user straight onto the chart (scrollY ~955) on mobile and desktop; confirmed Dana, Sam, Elena, Jules.
- **No empty placements** — every ▾ expands to a real sentence; Wen re-checked Jupiter + the House-11 Neptune/Pluto/Chiron stack, all distinct, no empties.
- **Share loop works end-to-end** — "Create share link" produces a real /chart/ URL, Copy flips to "Copied!", the link renders the same chart cold for a friend (Sam, Marcus).
- **Zero console errors** across cold load, example, own-chart, and share for every tester; fast.

## Recommendation

**FIX-AND-RETEST.** We are NOT at a plateau or stall: round 1 → round 2 every in-audience tester rose or held, 3 reached the bar, and the round-1 Value blocker (Rob) cleared. There is clear, concrete headroom.

The five in-audience testers stuck at exactly 8 are gated by the two recurring fixable items — **(a) the missing one-tap share-as-image card** and **(b) the template-y transit copy** — and nothing about the concept.

**Single highest-leverage fix:** the **one-tap shareable image/card (a)** unblocks the most testers. It is the named 8→9 gate for Sam, Dana and Rob, and helps Jules; it is also the deepest lever because it converts the existing screenshot-clean big-three / plain-English moment into the viral trigger the product is built around. **(b) the transit-copy rewrite** is the close second and the only thing Marcus and Elena still cite — varying the sentence frame so the 3–4 "FOR YOUR CHART" lines aren't an identical skeleton would move Marcus, Elena, Sam, Jules.

Shipping both (a) and (b) plausibly moves all five remaining 8s to 9 and reaches the 8/8 in-audience bar. Secondary single-persona items (OG meta for Jules, degrees for Wen, table-sliver/boilerplate for Aisha) can ride along but are not bar-gating on their own.
