# Round 2 — Sam (PM, mobile-first, curious-about-astrology sharer)

| tester | round | clarity | value | advocacy | prior bug resolved |
|--------|-------|---------|-------|----------|--------------------|
| Sam    | 2     | Yes     | Yes   | 8        | dead-end: YES / copy-confirm: NO |

## Round-1 concerns re-checked first
- **BIG 3 dead-end (Leo/Scorpio/Gemini, 1988):** RESOLVED. Re-ran my exact combo on a
  375px viewport — no red error, ESTIMATED CHART badge shows, full chart renders. Spot-checked
  3 more combos (Aries/Aries/Aries, Pisces/Virgo/Sagittarius, Cancer/Capricorn/Libra) — all
  valid, all echo the right three signs. The rewrite holds; I trust BIG 3 now.
- **"YOUR BIG THREE" screenshot strip:** SHIPPED and it's exactly what I asked for —
  "YOUR BIG THREE — SUN LEO · MOON SCORPIO · RISING GEMINI" sits right under the badge with a
  one-line "inferred from your big three / approximation" caveat. Clean, instantly screenshot-able,
  drops straight into a Slack thread. This is the payoff.
- **Copy-link confirmation:** NOT FIXED. Tapping "COPY LINK" genuinely copies the real URL
  (clipboard verified: http://localhost:3000/chart/...), but the button label never changes,
  no "Copied!" toast, no checkmark — zero feedback. On my phone I'd tap it 2–3 times unsure it
  worked, then paste into Slack just to check. (Copy itself works — this is a feedback gap, not
  a broken button.)

## 1. CLARITY — Yes
Hero says "Your birth chart, explained in plain English" + "NATAL CHART · PLAIN ENGLISH · NO SIGNUP."
I'd tell a friend: "Type your birthday (or just your sun/moon/rising) and it gives you your whole
chart in normal words, free, no login — and a clean card you can screenshot." The PRECISE | BIG 3
toggle makes the two on-ramps obvious.

## 2. VALUE — Yes
Today I look up big-three on Cafe Astrology / random sites and copy-paste ugly tables into chats.
This beats that: BIG 3 mode means I don't need exact birth time, and the BIG THREE strip is a
ready-made screenshot. Real time-saver for the "what's your rising?" group-chat moment.

## 3. ADVOCACY — 8
The thing I flagged last round (dead-end) is fixed and the screenshot strip is great, so I'd share
this. Why not 9: the **single biggest remaining blocker is the silent COPY LINK button** — for a
share-first tool, no copy confirmation on mobile is the one rough edge between me and an unprompted
recommend. Add a "Copied!" state and I'm at 9.

```json
{"tester": 8, "round": 2, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["COPY LINK gives no visible 'Copied!' confirmation on mobile — silent, makes me re-tap unsure", "Share link is a two-step (create link, then copy) — extra tap before the payoff"], "priorConcernsAddressed": "some"}
```
