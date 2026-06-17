# Round 7 — Wen

I am NOT cold to this product. For four rounds I sat at 8-9 with exactly ONE blocker: the
big-three headline chips showed the SIGN but omitted the DEGREE within sign, and that
degree-less headline propagated to the Save-as-image card and the per-chart share/OG image.
I said "one token per chip and I'd round up." This build claims that fix. I checked it hard.

## 1. Advocacy: 9/10  (round-6 was 8 → moving UP +1)
The fix is genuinely in, and it is correct and consistent across all three surfaces — not
the half-fix I was bracing for (degree on chip but not on the share card). They earned the
bump I committed to. Why not a 10: the degree precision is now perfect, but the rising
degree is the one number I can't independently audit on-screen — the houses table shows
"ASC: Cancer" with no degree, so "Cancer 7° rising" is asserted but not cross-checkable
against a second surface the way Sun (23° Pisces = House-10 row) and Moon (14° Sagittarius =
House-6 row) are. As the data-hygiene person, a number I can't reconcile against another cell
is the last thing between me and a 10. Surface the ASC degree in the table and I'm at 10.

## 2. Value: Yes
I finally understand rising/houses in plain English without learning the wheel, and now the
summary carries the most precise figure instead of burying it. The reading is coherent and
the math reads as per-chart and credible.

## 3. Clarity: Yes
H1 "Your birth chart, explained in plain English" + "Free, no signup" + "Load example
(Einstein)" — I knew what it was and was producing a chart in seconds. Output is legible.

## What I checked (concrete evidence)
- On-page chips after Load example (Einstein): `Cancer 7° rising` · `☉ Sun 23° Pisces · House 10`
  · `☽ Moon 14° Sagittarius`. Degrees PRESENT, numeric. (screenshot 03-chips-zoom.png)
- Cross-check vs houses table: House 10 row → `Sun 23° Pisces` ✓ matches chip; House 6 row →
  `Moon 14° Sagittarius` ✓ matches chip. Consistent, not approximated.
- Save-as-image download (albert-einstein-chart.png): card header shows `Sun 23° Pisces`,
  `Moon 14° Sagittarius`, `Cancer 7° Rising`. Degree CARRIED to the save card. (save-card.png)
- Per-chart share link: "Create share link" → /chart/zh9GpXtsazesMaOWNwbipvQT. og:title is
  per-person ("Albert Einstein's birth chart..."), og:image is a per-chart opengraph-image
  route (200, image/png, 1200x630). The rendered OG PNG shows `Sun 23° Pisces (H10)`,
  `Moon 14° Sagittarius`, `Cancer 7° Rising` — degree is baked into the social image. (08-og-image.png)
- Not hardcoded: a second chart (1990-07-21, London) returned totally different per-chart
  degrees — `Leo 5° rising`, `☉ Sun 28° Cancer · House 12`, `☽ Moon 19° Cancer`, and the
  Sun chip degree matched its houses-table row. Real computed values.
- Minor: rising degree (7°) appears on chip + cards but the houses table lists ASC without a
  degree, so it's the one figure I can't reconcile against a second surface.

```json
{"tester": 7, "round": 7, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["Rising/ASC degree shown on chips+cards but not in the houses table, so it's the one number I can't cross-check against a second surface"], "priorConcernsAddressed": "all"}
```
