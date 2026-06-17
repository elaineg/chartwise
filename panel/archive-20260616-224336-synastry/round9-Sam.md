# Round 9 — Sam (PM, mobile-first, IN-AUDIENCE)

## Prior concern (R8): nodes + Lilith buried in collapsed accordions
FIXED. Verified on anchor chart 1998-08-08 16:30 Jiangmen:
- Mobile (375px): house cards show "North Node 2°07' Virgo", "South Node 2°07' Pisces",
  "Black Moon Lilith 26°25' Libra" inline on the collapsed card face — full sign + degree,
  readable with NO tap. None sit inside a closed accordion (`closedDetails:false`).
- Desktop (1280): same data inline in the houses table; Lilith label WRAPS to two lines
  instead of clipping (scrollWidth == clientWidth on all three — zero clipping).
- Screenshot-ready as-is on both viewports. This is exactly what I asked for. No more
  tapping around to grab the spicy stuff for a chat screenshot.

## Regression check
None. Filled my own data (1989-05-22 09:15 San Francisco) on phone: date/time pickers +
8-option city autocomplete, no fiddliness, zero page/console errors. Big-three surfaced at
top, plain-English blurbs below. Clean.

## Answers
1. Clarity — Yes. H1 "Your birth chart, explained in plain English" + "Free, no signup"
   tells me what it is and that I won't hit a wall. I'd say: "type your birthday, get your
   chart broken down in normal words, free, no login — great for screenshotting your
   big-three into a group chat."
2. Value — Yes. Today I'd google my sign or fight Astro-Seek's dense grid; this is one
   screen I can screenshot straight into Slack. The inline nodes/Lilith fix is the
   difference between "usable on phone" and "not."
3. Advocacy — Yes. 9/10. I'd bring this up unprompted as a conversation-starter. Holds it
   back from 10: the share-by-URL note ("sends this chart's birth info to our server")
   gives a beat of pause for a privacy-curious friend, and the placement cards still need a
   tap to read the per-placement explanation (fine, but a hair more than pure screenshot).

## Single most important remaining fix
Make the per-placement explanation text peek (1 line) on the collapsed card so a
screenshot carries a little meaning, not just degrees — but this is polish, not a blocker.

```json
{"tester": 1, "round": 9, "clarity": "Yes", "value": "Yes", "advocacy": 9,
 "topComplaints": ["share-link privacy note gives a beat of pause", "placement explanations still need a tap"],
 "priorConcernsAddressed": "all"}
```
