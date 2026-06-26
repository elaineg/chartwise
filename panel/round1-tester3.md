# Round 1 — Tester 3 (Wen, marketing data analyst)

- **Persona:** Wen — lives in data hygiene, distrusts tools that transform numbers invisibly, wants to know HOW a placement was derived.
- **In-audience:** yes (casual-curious-skeptic, genuinely wants to understand rising sign / houses).

**Clarity: Yes.** H1 "Your birth chart, explained in plain English" + eyebrow "Natal chart · Plain English · No signup" told me what it is in <10s. The PRECISE / BIG 3 toggle is self-explanatory; the BIG 3 helper "Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest" nails the use case in one line.

**Value: Yes.** Today I'd paste my Co-Star Big 3 into a search or stare at a wheel I can't read. Here I picked Leo/Scorpio/Virgo + 1990, hit ESTIMATE CHART, got a full houses-as-rows table with plain-English readings, AND — critically for me — an honest methodology: "we searched 1990 for a date and time at a reference location whose chart matches your Sun, Moon, and Rising — then computed the rest from that anchor. Your real birth date, time, and place will differ." That's the "show me the math" disclosure I never expected from an astrology toy. Precise mode geocodes (London → 51.5085, -0.1257) and shows arc-minute degrees (Sun 19°35' Leo · House 9) — credible.

**Advocacy: 7 → I'm giving an honest 6.** One real coherence bug holds it back (below); the methodology honesty is the reason it's not lower.

**What worked**
- BIG 3 form is roomy, not cramped — clear labels, full-width inputs, even card padding. Estimate badge box has even padding.
- Share link round-trips perfectly: fresh incognito-style context, status 200, reloaded "Wen" + Leo/Scorpio/Virgo + the **ESTIMATED CHART** label intact.
- Save-and-share-an-estimate is clear: the "ESTIMATED CHART" banner travels with the link so a friend can't mistake it for a precise chart. Genuinely valuable.
- Diana × Charles compatibility example loads pre-populated: both element bars, "40 HARMONY · 20 TENSION · 5 CONJUNCTION", aspect symbols + orbs (Moon □ Sun, 2.6° ORB). The orbs are what sell credibility to me.

**What broke / incoherent**
- **Casing bug in generated prose (P2, credibility-killer for me):** transit text reads "revisit and renew **mars's** themes" and "what **Sun** represents" — lowercase planet names mid-sentence next to capitalized ones. A string-interpolation slip like this is exactly what makes a data person distrust everything else the engine generates.
- **Minor copy contradiction:** sidebar says "computed on your device… stays in your browser only," then the share section says "Creating a share link sends this chart's birth info to our server." Both true, but seeing them seconds apart made me re-read.
- Clipboard read came back empty on CREATE SHARE LINK — copy verified visually (button + URL input populated); clipboard read blocked in test env, not a real bug.

```json
{"tester": 3, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 6, "topComplaints": ["lowercase planet-name casing bug in generated transit prose ('mars's themes', 'Sun represents') undercuts data-credibility", "device-only vs sends-to-server copy lines sit close enough to read as contradictory"], "priorConcernsAddressed": "n/a"}
```
