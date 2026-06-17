# Round 9 — Priya (senior backend eng, hard-skeptic, NON-FIT)

**Advocacy: 4/10 · Recommend: No · Prior concern (node/Lilith clipping): FIXED**

## Round-8 defect recheck — node/Lilith inline + no clipping
PASS, verified on the anchor chart (1998-08-08 16:30 Jiangmen).
- Desktop 1280px: houses table has a NODES column; reads **South Node 2°07' Pisces**,
  **North Node 2°07' Virgo**, **Black Moon Lilith 26°25' Libra** — full sign+degree, no click,
  measured scrollWidth==clientWidth (157/157), NOT clipped.
- Mobile 375px: per-house cards show **North Node 2°07' Virgo** and
  **Black Moon Lilith 26°25' Libra** as full inline rows (sw==cw 279/279), no click, no clipping.
The exact thing I flagged last round is resolved on both viewports.

## Regression check — none found
Own data (1989-03-15 08:45 Bangalore) computed clean: Pisces Sun H11, Cancer Moon, Taurus
rising. Zero console/pageerrors on both charts. Share button present.

## Data-stays-client-side (my skeptic test)
Watched the network tab. ONLY non-static call is `GET /api/cities?q=...` — a city→lat/long
lookup that sends the city string only, NOT birth time or any chart math. Chart is computed
in-browser as claimed. Copy on screen is honest: "computed on your device — nothing is sent
anywhere. Creating a share link sends this chart's birth info to our server so the link works."
That specificity is the right way to talk to a skeptic. Credit for it.

## Clarity — Yes
"Your birth chart, explained in plain English. Free, no signup." I know exactly what it is
and who it's for in <10s. Craft is clean: typed input, instant compute, plain-English blurbs,
houses table is well-organized.

## Value — No (for ME)
I do nothing today to solve this — I consider astrology pseudoscience and would never run my
own chart. The tool is well-built but the category isn't a job I have. NON-FIT, as expected.

## The 3 answers
1. Advocate / share it? **No** — not because of defects, but I won't put my name behind an
   astrology tool. I'd privately tell an astrology-into friend "this one is well-made and
   actually keeps your data local," which is the most I'd do.
2. Score: **4/10** — same as R8. The defect that capped me last round is genuinely fixed and
   the engineering is solid (real client-side compute, honest copy, no clipping, clean a11y-ish
   dropdowns). 4 is purely category non-fit; craft would otherwise earn a 7–8.
3. Single most important remaining fix: **none on craft.** If anything, surface the
   client-side/share-link data distinction even more prominently (e.g. a one-line "what leaves
   your device" near the Share button) — it's the one thing that converts a skeptic from "no"
   to "fine, it's clean." Otherwise this is shippable.

```json
{"tester": 0, "round": 9, "clarity": "Yes", "value": "No", "advocacy": 4, "topComplaints": ["category non-fit: I won't advocate for an astrology app regardless of craft", "make the client-side-vs-share-link data distinction more prominent near Share"], "priorConcernsAddressed": "all"}
```
