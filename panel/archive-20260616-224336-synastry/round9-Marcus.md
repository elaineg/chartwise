# Round 9 — Marcus (Frontend eng, 2yr; casual-curious-skeptic; IN-AUDIENCE)

**Prior concern (round 8, scored 8/10):** node/Lilith chips TRUNCATED in houses table —
"Black Moon Lilith 26°2…" clipped. **Status: RESOLVED.**

## Did my truncation/buried-placement concern get fixed?
YES, cleanly, on both viewports — verified via DOM, not just eyeballing.
- Desktop houses table (`data-testid="houses-table"`): node + Lilith sit INLINE in their
  house rows, no click needed. House 8 "North Node 2°07' Virgo", House 2 "South Node 2°07'
  Pisces", House 10 "Black Moon Lilith 26°25' Libra" — the Lilith chip WRAPS to two lines
  instead of clipping.
- DOM check on every node/Lilith cell: `scrollWidth === clientWidth`, `white-space: normal`,
  `overflow: visible` → zero clipping, both 1280px and 375px.
- Mobile (375px) cards: same data as full-width chips, full sign+degree visible, no clip.

## Regression sweep (anchor 1998-08-08 16:30 Jiangmen) — all pass
- Nodes show their OWN signs on opposite axis: N Node Virgo / S Node Pisces. Correct.
- Lilith 26°25' Libra, House 10. Matches the ~26° Libra H10 expectation.
- Arcminutes everywhere (19 `dd°mm'` tokens: 2°07', 19°03', 13°36', 5°19'…).
- Element basis labeled: "Based on 11 placements: Sun…Chiron" (correctly excludes
  nodes/Lilith). Good.
- save-as-image: GONE. No JS console errors on compute. CSS is crisp — no ragged cells now.

## Honest take
The one ragged thing in an otherwise crisp table is gone, and it was fixed the RIGHT way
(surface the data inline + wrap), not by shrinking a font. As a skeptic I still don't think
this predicts anything — but the plain-English blurbs ("Transformation is central to your
identity…") + the no-signup, on-device, no-clip table make it a genuinely slick thing to
drop in the group chat. Nothing left holding it back for my use.

## 3 answers
1. Advocate? **Yes.**
2. Score: **9/10.** (Up from 8 — the lone CSS blemish I flagged is fixed and nothing
   regressed; I'd post this unprompted. Not a 10 only because the value is "fun toy," not
   daily-driver, for a skeptic like me.)
3. Single most important remaining fix: nothing blocking. Nice-to-have — the houses table
   chips are visually busy with the ▾ disclosure carets on rows that have no extra content;
   tightening that affordance is the only polish I'd note.

```json
{"tester": 9, "round": 9, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["minor: ▾ disclosure carets appear even where there's little to expand (busy)"], "priorConcernsAddressed": "all"}
```
