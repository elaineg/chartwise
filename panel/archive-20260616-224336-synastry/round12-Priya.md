# Round 12 — Priya (Senior backend SWE, hard astrology-skeptic)

Tested cold at localhost:3099 on a 390px mobile viewport (this round's fix is mobile),
plus desktop sanity. Loaded Einstein example, measured DOM y-order of every section,
read placements + houses table + transit card, created & opened a share link, watched
the network tab.

## Re-judged items

**(a) Mobile: is the at-a-glance summary FIRST, before house cards? YES — fixed.**
Measured top-to-bottom on the 390px viewport: big-three chips (↑ Cancer rising / ☉ Pisces
Sun · H10 / ☽ Sagittarius Moon, y≈1239–1323) → ELEMENT DISTRIBUTION grid (y=1447, EARTH 5 /
FIRE 4 / AIR 1 / WATER 1, bars + grey ramp intact) → "Today's Sky" transit card (y=1735) →
THEN the placement readings (CORE IDENTITY, y=2695) → THEN the houses table (House 1,
y=3863). So the entire summary lands above the readings AND above the house stack, exactly
as claimed. I see the whole at-a-glance block without scrolling past a single house card.
The pure-reorder didn't break anything — element grid's double-encoding survived.

The Today's-Sky hook is genuinely PERSONALIZED, not a generic ephemeris dump: "FOR YOUR
CHART ▸ Mars charges through Taurus where your natal Neptune lives… ▸ Saturn works through
Aries, alongside your natal Mercury." It cross-references live transits against this chart's
own placements. That's the one piece with a recurrence hook, and putting it up top is the
right call.

**(b) Would I advocate for the monochrome SSENSE chart at 9+? NO — and craft can't fix that.**
The reskin is still the best-looking astrology tool I've seen: restrained, editorial,
Archivo, high-contrast, no glitter-wheel. The reorder makes it scan even better. But I'm a
hard category non-fit; 9+ means I'd bring it up unprompted, and I will never volunteer an
astrology app. The order fix is real polish, not a reason for a skeptic to advocate.

## Craft / privacy (re-confirmed)
- Network: computing a chart fires ZERO off-origin requests for birth data — only a Google
  Fonts CSS call. Client-side claim holds.
- Share link is opt-in and honestly labeled ("sends this chart's birth info to our server");
  /chart/<id> returns 200 and re-renders the shared chart. (Copy-to-clipboard read was
  blocked in my headless test env — the button fired and the /chart/ link rendered on the
  page, so copy is verified visually, not a regression.)
- Placement readings are coherent plain-English paragraphs; houses table clean and scannable.

## Verdict
**Value: No** — hard non-fit. Astrology is pseudoscience to me; I'd never open this for
myself. Category problem, not an app problem.
**Clarity: Yes** — H1 + "explained in plain English" + "no signup" tell me what it is and who
it's for in under 10s; the summary-first order now makes the payload legible immediately too.
**Advocacy: 4/10** — Unchanged from R11. Craft and the new summary-first order are excellent and
I'd send an asking friend here over astro-seek (free, no-signup, client-side, legible), but I
won't recommend an astrology app unprompted. The mobile fix earned no extra point only because
my ceiling is the category floor, not the build quality.

```json
{"tester": 1, "round": 12, "clarity": "Yes", "value": "No", "advocacy": 4, "topComplaints": ["astrology is a hard category non-fit for me — no craft fix changes that", "value to me personally is zero regardless of polish"], "priorConcernsAddressed": "all"}
```
