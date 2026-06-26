# chartwise — Panel SYNTHESIS, round 2 (delta re-test)

Run: 20260626-085836-daily. Tested LIVE at http://localhost:3000 (prod build, rebuilt with round-1 fixes; NOT rebuilt/redeployed this round).
Round 2 re-tested the 6 sub-bar IN-AUDIENCE testers (Marcus, Wen, Dana, Rob, Elena, Sam) by name. Jules/Aisha (already ≥9) and Priya/Tomás (out-of-audience category rejections) CARRY FORWARD unchanged from round 1.

Two targeted fixes under test (the in-scope subset of the four directed fixes):
- **FIX C (privacy copy honesty):** disclosure now states chart computation is in-browser and birth data is sent to the server ONLY when the user chooses to create a share link (no account/tracking).
- **FIX E (planet-name casing):** transit prose capitalizes planet names ("Mars's themes", not "mars's themes").
Deliberately NOT touched this run (deferred, out of scope): (A) compatibility homepage entry point; (B) result-page density / big-three burial.

## Score table (all 10)

| Tester | In-audience? | Astro stance        | Clarity | Value | Advocacy | Δ vs R1 | Status |
|--------|--------------|---------------------|---------|-------|----------|---------|--------|
| Priya  | no (non-fit) | hard-skeptic        | Yes | No  | 3 | — | carried (category rejection) |
| Marcus | yes          | casual-curious-skep | Yes | Yes | 9 | +1 | re-tested ↑ |
| Wen    | yes          | casual-curious-skep | Yes | Yes | 8 | +2 | re-tested ↑ (FIX C+E target) |
| Tomás  | no (non-fit) | hard-skeptic        | Yes | No  | 4 | — | carried (category rejection) |
| Dana   | yes          | curious             | Yes | Yes | 8 | 0 | re-tested = |
| Jules  | yes          | curious             | Yes | Yes | 9 | — | carried |
| Aisha  | yes          | curious             | Yes | Yes | 9 | — | carried |
| Rob    | yes          | casual-curious-skep | Yes | Yes | 7 | 0 | re-tested = |
| Elena  | yes          | casual-curious-skep | Yes | Yes | 8 | 0 | re-tested = |
| Sam    | yes          | curious             | Yes | Yes | 9 | +1 | re-tested ↑ |

Clarity: 10/10 Yes. Value: 8/8 in-audience Yes (the 2 No's are hard-skeptic non-fits, by design).

## Exit-bar check (in-audience-weighted)

Bar: ≥9 of 10 (in-audience-weighted) at advocacy ≥9 AND clarity=Yes AND value=Yes.
In-audience testers: 8 (Marcus, Wen, Dana, Jules, Aisha, Rob, Elena, Sam).
In-audience at advocacy ≥9: **4 of 8** (Marcus 9, Jules 9, Aisha 9, Sam 9) — up from 2/8 in round 1.
In-audience advocacy mean = (9+8+8+9+9+7+8+9)/8 = **8.4** (up from 7.9).
Out-of-audience non-fits (do NOT gate): Priya 3, Tomás 4 — category rejection, not defects.

**EXIT BAR NOT MET.** 4/8 in-audience at ≥9 vs. the ≥9-of-10 requirement. No P0/P1; both directed fixes verified resolved on the wire by every tester who held the related concern. Clarity/value unanimous among in-audience; zero regressions; zero console errors across all 6 re-tests.

## Directed-fix verification (this round's mandate)

- **FIX C — RESOLVED, unanimous.** Wen verified against the network tab: COMPUTE CHART fires zero non-GET requests; only CREATE SHARE LINK POSTs `/api/chart-share` (201) with the birth payload. Copy now matches reality. Marcus/Dana/Rob/Elena/Sam confirm the honest in-browser/server-only-on-share wording (shown on home + BIG 3 form + result page + at the share button). Cleared Wen's primary trust blocker.
- **FIX E — RESOLVED, unanimous.** Transit prose capitalizes every planet ("Mars's themes", "Venus's themes", "Pluto's energy", "Jupiter's themes"); automated lowercase-planet scans returned zero hits for Wen, Marcus, Dana, Rob, Elena, Sam. Cleared Wen's casing blocker.

## Remaining sub-9 in-audience blockers — scope-labeled (gates ship vs. iterate)

- **Wen → 8.** Original blockers (C, E) both RESOLVED. Residual: transit-prose template reads repetitively across its six bullets (minor) → **FIX-SCOPE (transit prose; not one of the four directed fixes — minor/deepen-class)**. Plus density (B) + compatibility teaser (A) → **OUT-OF-SCOPE**.
- **Dana → 8.** (1) compatibility no cold-homepage entry → **OUT-OF-SCOPE (A)**; (2) result page dense, buries screenshottable big-three card → **OUT-OF-SCOPE (B)**. No in-scope blocker remains.
- **Rob → 7.** (1) result page is a firehose burying the big three → **OUT-OF-SCOPE (B)**; (2) compatibility only reachable via in-page card → **OUT-OF-SCOPE (A)**. No in-scope blocker remains.
- **Elena → 8.** (1) compatibility buried until after computing a chart → **OUT-OF-SCOPE (A)**; (2) result-page density → **OUT-OF-SCOPE (B)**; (3) no zero-setup reason to RETURN (recurrence hook) → **FIX-SCOPE (recurrence hook; not one of the four directed fixes — deepen-class)**.

Marcus (9) and Sam (9) cleared the bar; their only off-10 notes are OUT-OF-SCOPE (A/B).

## Verdict

NOT PASSED, but the round's two directed fixes (C, E) FULLY SUCCEEDED and verified clean on the wire, lifting in-audience ≥9 from 2/8 → 4/8 (mean 7.9 → 8.4), zero regressions. **Every remaining sub-9 in-audience blocker is OUT-OF-SCOPE** (A compatibility discoverability + B result-page density) except two minor/deepen-class FIX-SCOPE-adjacent residues (Wen's transit-prose repetition, Elena's recurrence hook) — neither among the four directed fixes, neither alone clears the bar.

Decision implication: this run's directed scope (C + E) is COMPLETE and VERIFIED. The remaining advocacy gap is entirely OUT-OF-SCOPE A/B work not authorized this run. The directed-fix delta is ready to ship; reaching the ≥9-of-10 bar requires the deferred A/B work, which is a separate directive.
