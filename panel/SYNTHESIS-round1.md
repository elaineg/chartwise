# chartwise — Panel SYNTHESIS, round 1

Tested LIVE at http://localhost:3000 (prod build). All 10 personas spawned by name, exactly once each.
Four shipped changes under test: (1) BIG 3 save/share-an-estimate flow; (2) BIG 3 visual polish / even card padding; (3) Compatibility example pair = Princess Diana × Prince Charles; (4) core precise birth-chart flow intact.

## Score table

| Tester | In-audience? | Astro stance | Clarity | Value | Advocacy |
|--------|--------------|--------------|---------|-------|----------|
| Priya  | no (non-fit) | hard-skeptic        | Yes | No  | 3  |
| Marcus | yes          | casual-curious-skep | Yes | Yes | 8  |
| Wen    | yes          | casual-curious-skep | Yes | Yes | 6  |
| Tomás  | no (non-fit) | hard-skeptic        | Yes | No  | 4  |
| Dana   | yes          | curious             | Yes | Yes | 8  |
| Jules  | yes          | curious             | Yes | Yes | 9  |
| Aisha  | yes          | curious             | Yes | Yes | 9  |
| Rob    | yes          | casual-curious-skep | Yes | Yes | 7  |
| Elena  | yes          | casual-curious-skep | Yes | Yes | 8  |
| Sam    | yes          | curious             | Yes | Yes | 8  |

Clarity: 10/10 Yes. Value: 8/10 Yes (both No's are hard-skeptic non-fits, by design).

## Tally & exit-bar check (in-audience-weighted)

Bar: ≥9 of 10 (in-audience-weighted) at advocacy ≥9 AND clarity=Yes AND value=Yes.
In-audience testers: 8 (Marcus, Wen, Dana, Jules, Aisha, Rob, Elena, Sam).
In-audience at advocacy ≥9: **2 of 8** (Jules 9, Aisha 9). In-audience advocacy mean = (8+6+8+9+9+7+8+8)/8 = **7.9**.
Out-of-audience non-fits (do NOT gate): Priya (3), Tomás (4) — both confirm craft/clarity/trust is solid; low advocacy is category rejection, not a defect.

**EXIT BAR NOT MET.** No P0/P1 crash; all four shipped changes function and the share link round-trips in a fresh browser for every tester. Gap is purely advocacy points: 6 of 8 in-audience sit at 6–8.

## Shipped-change verification

- **#1 BIG 3 save/share-an-estimate** — WORKS, unanimous. Name → Sun/Moon/Rising + birth year → ESTIMATE → "Create share link" yields `/chart/<id>`; reopened in a fresh no-localStorage browser, every tester confirmed name + all 3 signs + the honest "ESTIMATED CHART" label/badge reload (HTTP 200). Strong feature.
- **#2 visual polish / padding** — PASS, unanimous incl. exacting Aisha. BIG 3 form comfortably spaced; bordered cards have even padding, no text touching edges.
- **#3 Diana × Charles compatibility example** — loads & is understandable (both Big Threes, element bars, aspect orbs e.g. "2.6° ORB", "40 HARMONY · 20 TENSION"). The example data is correct; the problem is its DISCOVERABILITY (see A).
- **#4 core precise flow** — intact, legible in ~1–5s, correctly omits the estimate label.

## Blocking complaints (grouped by cause) — what holds in-audience advocacy below 9

### A. Core action hard to find — COMPATIBILITY has no homepage entry point (RECURRING, 5 in-audience: Dana, Jules, Elena, Sam, Rob)
The "Compare two people" / Diana × Charles feature only appears AFTER you compute a chart; absent from the cold homepage. On mobile (Sam) tapping it doesn't scroll to the view — you land back at page-top and must hunt. Most-cited advocacy ceiling. → Surface compatibility on the cold homepage + scroll-to-section on tap. (Relates to shipped fix #3 — discoverability, not the example.)

### B. Value buried — result page is a dense firehose that buries the big-three (RECURRING, 2 in-audience: Rob, Aisha; echoed by non-fits)
Full planet table + retrogrades + "Today's Sky" transits + ~65 aspects on one long scroll, no in-page anchors; the fun big-three gets buried. Aisha: "Today's Sky" transit panel sits too close to the natal readout → "is that my Sun?" double-take. → Lead with big-three, progressively disclose dense data; add anchors + separation between natal and transits.

### C. Trust-breaking copy mismatch — "stays in your browser only" vs. server-stored share link (RECURRING, 3 testers: Wen in-audience + Priya/Tomás non-fits; Marcus's devtools confirm)
Copy promises "saved charts stay in your browser only" / "computed on your device," but SAVE/SHARE POSTs full birth data (name, date, time, lat/lon) to /api/chart-share for a server-stored `/chart/{token}`, and city entry hits /api/cities. Reassurance is contradicted the moment you share — held Wen at 6 alongside E1. → Reword privacy copy so the share path's server upload is honest. (Side-effect of shipped fix #1.)

### D. Visual polish — PASS, no blockers (see #2 above).

### E. Single-persona quirks (NOT recurring — do not over-index)
- **Wen (in-audience, held at 6):** transit prose has lowercase planet-name interpolation ("renew mars's themes", "what Sun represents") next to capitalized names — coherence/casing bug that erodes a data-hygiene user's trust. Real bug, single in-audience reporter; cheap fix likely lifts her toward 9.
- Marcus: ~4–5s "CREATING LINK…" share button with no spinner reads as hung.
- `/compatibility` typed as a direct URL 404s (Marcus, Rob, Aisha noted — but only via route-guessing; in-page card works).
- Priya: synastry share page renders wrong SSR `<title>` ("Birth chart's birth chart, explained" instead of the two names).
- Elena/Sam: estimated charts always anchor to "New York, USA (reference)" — a curious user may question it.

## Verdict

NOT PASSED. In-audience bar met by only 2/8 at advocacy ≥9 (Jules, Aisha). All four shipped changes work and clarity/value are unanimous among in-audience. The advocacy ceiling is driven by three recurring, fixable issues — (A) compatibility discoverability, (B) result-page density burying the big-three, (C) privacy-copy/server-upload mismatch — plus one cheap single-persona casing bug (E/Wen). Fixing A+B+C should clear the 7–8 cluster past 9.
