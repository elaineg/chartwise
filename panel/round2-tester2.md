# Round 2 — Tester 2 (Marcus, frontend eng, 2 yrs)

- Persona: Marcus — casual-curious-skeptic; drops slick free no-signup tools in the group chat if polish holds. In-audience: yes. Desktop Chrome, devtools open.

**Clarity: Yes.** Same strong cold open — eyebrow "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" + H1 "Your birth chart, explained in plain English." + "Free, no signup". I'd explain it in one sentence.

**Value: Yes.** Beats my today-tool (screenshot Co-Star, argue in Slack): real plain-English readings from birth data, and the share link IS the shareable group-chat artifact. Computed my chart + Madrid/Paris/Berlin charts in ~2s each, share link round-trips to a fresh browser cleanly.

**Advocacy: 9/10.** Both my round-1 nits got addressed and I found zero new blockers — devtools clean (0 console errors) across the natal flow, share flow, copy, and the fresh-context share page. This is the polish level where I share it unprompted. Holding off a 10 only on the deferred density (legit out-of-scope this round).

**Prior concerns resolved?**
- Share-link feels janky/hung (~4-5s, no spinner): **RESOLVED.** Measured the real call: `POST /api/chart-share` returns `201` in ~1.2s. The button is replaced by the populated link box + "COPY LINK" + the honest privacy line, so there's clear visible feedback. Perceived speed is now better than round 1. (My earlier "30s" reading was MY polling artifact — the button goes away once the link lands.)
- `/compatibility` direct URL 404 / compatibility only reachable in-page: **DEFERRED-OUT-OF-SCOPE** (compatibility entry point explicitly deferred this round).
- Compatibility example appends below own chart: **DEFERRED-OUT-OF-SCOPE** (same).
- Bonus checks: FIX C privacy copy — **RESOLVED**, now states "Chart computation happens in your browser. Birth data is only sent to our server if you choose to create a share link… no account or tracking" (appears at form + at share button — honest, exactly right). FIX E capitalization — **RESOLVED**, found "Mars's / Venus's / Saturn's", zero lowercase planet possessives in the transit prose.

**Remaining blockers below 9 → none that are in-scope.**
- Result-page density / big-three burial — **OUT-OF-SCOPE** (deferred this round; would be my one ask for a 10).
- COPY LINK / clipboard verified: copy fired and clipboard returned the URL (worked in my env). No regression.

```json
{"tester": 2, "round": 2, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["result-page density / big-three buried (OUT-OF-SCOPE, deferred)"], "priorConcernsAddressed": "all"}
```
