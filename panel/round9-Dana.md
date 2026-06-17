# Round 9 — Dana (Demand-gen marketer, IN-AUDIENCE)

**Advocacy: 9/10** (round 8 was 8). **Would advocate: Yes.**

## Prior round-8 concerns — re-checked
- **Node/Lilith precision buried/clipped → FIXED (desktop + mobile).** Anchor chart
  1998-08-08 16:30 Jiangmen: dedicated NODES column in the houses table shows
  "South Node 2°07' Pisces" (H2), "North Node 2°07' Virgo" (H8), and
  "Black Moon Lilith 26°25' Libra" (H10) inline, no click. Lilith WRAPS to two
  lines instead of clipping. On mobile (375px) the same values appear in the house
  cards (North Node in H8 placements, Lilith in H10) — measured scrollWidth==clientWidth
  (279==279), right edge 321<375, so NO clipping. This was the convergent defect; it landed.
- **Form pinned above result on mobile → FIXED.** After Compute on 375px, view
  auto-scrolled (scrollY 955) and lands on the chart header + big-three chips + the
  plain-English read. Form no longer blocks the result.
- **Wanted a real shareable image/OG card → DELIVERED.** "Create share link" produces
  /chart/<id> and a clean branded OG card (Sun Leo H8 / Moon Aquarius / Capricorn Rising,
  "free · instant · no signup", chartwise.vercel.app). This is exactly the screenshot I'd
  drop in the team channel. (Copy link verified visually; clipboard read blocked in test env.)

## Regression check
None. Second chart (1990-03-21 Chicago) computed clean on mobile, 0 console errors,
sensible big-three. 0 console errors on the anchor chart too.

## 3 standard questions
1. **Advocate?** Yes.
2. **Score:** 9/10.
3. **Single most important remaining fix:** The OG share card hard-codes the title
   "My Chart" even when a name was entered ("Jiangmen Anchor") — for a marketer sharing a
   coworker's/partner's chart, putting the actual name on the card is the difference between
   a generic and a personal, screenshot-worthy artifact.

## Standard answers
- **Clarity: Yes.** "Your birth chart, explained in plain English. Free, no signup." +
  big-three chips up top — I'd tell a friend "free natal chart that explains itself, no login."
- **Value: Yes.** Today I screenshot from astro-seek (cluttered) or paste into ChatGPT.
  This is one clean explained card I can share, with node+Lilith now readable at a glance.
- **Advocacy: 9** — held off 10 only by the generic "My Chart" share title.

```json
{"tester": 4, "round": 9, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["OG share card title is hard-coded 'My Chart' instead of the entered name", "Share card is generic without the person's name — weakens it as a personal screenshot artifact"], "priorConcernsAddressed": "all"}
```
