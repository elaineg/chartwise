# Round 2 — Marcus (frontend eng, high-tech, desktop Chrome)

| metric | R1 | R2 |
|--------|----|----|
| clarity | Yes | Yes |
| value | Yes | Yes |
| advocacy | 8 | 9 |

## Round-1 blocker status: RESOLVED (both halves)
- **Share confirmation too quiet** → FIXED. CREATE SHARE LINK mints a real URL (`/chart/<id>`, shown in a readonly field), then the full-width COPY LINK button flips to a solid black **COPIED** state — high-contrast, impossible to miss. Verified clipboard actually held the URL (`navigator.clipboard.readText()` returned the share link; not an env artifact).
- **Result page dense / payoff buried** → FIXED. The new `YOUR BIG THREE — SUN LEO · MOON SCORPIO · RISING GEMINI` strip sits directly under the ESTIMATED CHART badge, above the dense houses table. The plain-English big-three payoff is the first thing you read now.

## Verified the fixes
- BIG 3 toggle (PRECISE | BIG 3) is right there on the left panel; switching exposes Sun/Moon/Rising selects + Birth Year.
- **Round-1 dead-end combo Leo / Scorpio / Gemini, 1988 → now returns a valid chart, NO red error.** ESTIMATED badge present, all three chips honor my picks (0°00' Gemini rising · Sun Leo House 3 · Moon Scorpio 13°41'). The estimate even back-fills a plausible date/time/place ("inferred from your big three — this is an approximation") which is the honest, right call.
- Zero console errors across the whole flow. CSS is tight — house rows align, planet chips don't wrap weird, full-width button states read cleanly. Nothing janky, which is the bar I'd actually share against.

## Three questions
1. **CLARITY — Yes.** Title + h1 "Your birth chart, explained in plain English," "Free, no signup," and the PRECISE|BIG 3 toggle make it legible in well under 30s. I'd tell a friend: "free no-login natal chart that explains every placement in plain English, and you can fake it from just your big three if you don't know your birth time."
2. **VALUE — Yes.** My circle jokes about signs in Discord constantly. Today the "tool" is co-star screenshots or random astro sites that wall the chart behind signup. This is no-signup, instant, client-side, and the BIG 3 estimate means people who don't know their birth time can still play — that's exactly the friction that kills these in a group chat. The shareable `/chart/<id>` link is the thing that actually makes it spread.
3. **ADVOCACY — 9.** Up from 8: my two blockers are gone, the estimate no longer dead-ends, and the copy confirmation is loud. I'd drop this in the team Slack unprompted. Single biggest REMAINING blocker (what keeps it off a 10): the result page is still LONG below the fold — 12 house rows + element bars + a full Today's Sky grid. The BIG THREE strip fixes the *top*, but a first-timer still has to scroll a lot of dense astro tables; a collapsed/"show full chart" affordance under the big-three payoff would make it a 10. Minor: "CREATE SHARE LINK" is a two-step (create, then copy) — a one-click "copy share link" would shave friction.

```json
{"tester": 1, "round": 2, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Result page still long/dense below the BIG THREE strip — wants a collapse/'show full chart' affordance", "Share is two-step (create then copy) instead of one click"], "priorConcernsAddressed": "all"}
```
