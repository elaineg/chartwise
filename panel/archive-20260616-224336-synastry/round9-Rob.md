# Round 9 — Rob (Brand/visual designer, freelance, IN-AUDIENCE)

## Prior concern (round 8): FIXED — fully
R8 ask: "surface full node/Lilith sign+degree without a click, no clipping" (chips read "Black Moon Lilith 26°2…").
- Anchor 1998-08-08 16:30 Jiangmen: houses table now has a dedicated **NODES** column.
  Reads inline, zero clicks, zero clipping: "South Node 2°07' Pisces", "North Node 2°07' Virgo",
  "Black Moon Lilith 26°25' Libra" (last one cleanly WRAPS to 2 lines inside its chip — no clip).
- Desktop (1280) + mobile (375): programmatic check `clipped:false` on all three, both viewports.
  Mobile uses a card-per-house layout; "Black Moon Lilith 26°25' Libra" shows full on one line in House 10.
- My own data (1986-03-14 Toronto): same — full node/Lilith inline, 0 console errors.

## Regression check: none
Big-three summary chips intact, explanation-first blurbs lead before the table, element bar present,
0 console errors on both charts. Adding a 4th NODES column did NOT make it dense — it's mostly em-dashes
with the 3 node/Lilith entries standing out; still skims fast, doesn't read like a reference manual.

## The 3 questions
1. **Advocate?** Yes.
2. **Score: 9/10** (up from 8). The one thing I griped about for two rounds is finally on the surface,
   readable, and responsive. Bumping to 9 because it now does the one thing casual-curious me actually
   came for (my big three + the "what's my Lilith" curiosity) with no spelunking. Not a 10 only because
   the NODES column header reads a touch jargon-y for a true skeptic walking in cold — but that's polish.
3. **Single most important remaining fix:** Label/tooltip the "NODES" column header in plainer language
   (e.g. "Karmic points" or a hover defining North/South Node + Black Moon Lilith) so a cold skeptic
   knows what they're looking at — the data is now visible but the column name still assumes you know.

## Clarity: Yes
"Your birth chart, explained in plain English" + "Free, no signup" — I'd tell a friend: it turns your
birth date/time/place into readable paragraphs about you, free, no login. The plain-English blurbs
above the data table are what sells it vs a dense astro table.

## Value vs my workflow: Marginal-to-Yes
Today I'd google astro-seek when a client wants chart vibes; this is faster and actually readable,
and no signup. For a casual-curious-skeptic it saves real friction — I'd open it again idly.

```json
{"tester": 1, "round": 9, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["NODES column header is jargon for a cold skeptic — no plain-language label/tooltip explaining North/South Node + Black Moon Lilith"], "priorConcernsAddressed": "all"}
```
