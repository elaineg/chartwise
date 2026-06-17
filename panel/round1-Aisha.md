# Aisha — Round 1 (synastry)

**Persona:** Product designer, judges craft hard, astrology-curious. Desktop + 375px mobile.

## 1. What I tried / what happened
Cold open auto-shows a clean editorial form. Loaded the Einstein example, scrolled, and
found the **Compatibility / "Compare two people →"** card in ~3 seconds — it sits directly
above the "Today's Sky" transit card, exactly where I'd hope. Clicked COMPARE TWO PEOPLE
and got the auto-loaded Einstein × Michelle Obama pair (two genuinely distinct charts).
Read the whole compatibility view, sanity-checked the natal chart, tested both widths.

## 2. What worked / what confused me
WORKED (and won me over):
- **Honest framing, no fake % score.** "30 HARMONY · 15 TENSION · 5 CONJUNCTION" + a plain
  sentence ("...tend to outweigh friction"). I checked for a "%match" — there is none. That
  earns trust; cheesy compatibility apps slap a 87% heart on it and I bounce.
- **Big-three comparison** is a tidy two-column Person A / Person B table with labeled
  glyphs + sign names. Holds two columns even at 375px — considered responsive work.
- **Plain English** throughout. Aspects carry orb + HARMONY/TENSION tag; house overlay reads
  like sentences a non-astrologer follows ("Their Venus in your Seventh House... the most
  classic partnership overlay"). Spacing, mono type, restraint = my taste.
- Natal chart intact: Sun 23°30' Pisces·H10, Moon Sgr, Cancer rising — values look right.
- No horizontal overflow at 375px, zero console/page errors anywhere.

CONFUSED / CRAFT NITS:
- **Every one of ~40 aspect rows repeats "Albert Einstein × Michelle Obama".** Redundant
  label noise on a page that's already entirely about this pair. Drop it or show it once.
- **Generic blurbs repeat verbatim.** ~15 sextiles all say the identical "easy cooperative
  opportunity" sentence; ~15 squares identical too. The named pairs (Venus×Saturn,
  Mercury×Sun) are lovely and specific — the boilerplate ones feel like filler padding a
  9500px page. I'd trim the orb cutoff so I'm not scrolling through 7° filler aspects.
- **Stale left form during compare.** The full "enter your own / BIRTH PLACE / COMPUTE CHART"
  sidebar stays mounted; on mobile it stacks ABOVE the compatibility content, so I scroll
  past an irrelevant entry form to reach the comparison. Breaks the focus of the view.
- No empty state seen for "compare with a saved chart of my own" — auto-example is fine but
  I never saw how I'd swap Person B to my partner. (Couldn't find an obvious picker.)

## 3. Would I use / recommend it?
Yes — I'd genuinely open this for fun with friends, and I'd recommend it to my
astrology-curious group chat precisely because it's honest and readable, not a casino of
heart-percentages. The craft is real. What holds back a 9 is the repetition (label + blurb
boilerplate) and the stale entry form bleeding into the compare view — fixable polish, but
a designer notices instantly.

- **ADVOCACY: 8/10**
- **VALUE: Yes** — replaces squinting at astro-seek's dense synastry grid; this is the
  plain-English version I actually want.
- **CLARITY: Yes** — "Compatibility, explained / How two charts get along — in plain English"
  told me what it is in under 5 seconds.
- **DOMINANT COMPLAINT:** ~40 aspect rows repeat the same pair label + recycled boilerplate
  blurbs, padding a very long page that buries the few specific, valuable interpretations.

```json
{"tester": 0, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["~40 aspect rows repeat 'A × B' label + recycled generic blurbs, padding a 9500px page", "stale birth-data entry form stays mounted in compare view (stacks above content on mobile)", "no obvious way to swap Person B to my own/partner's chart"], "priorConcernsAddressed": "n/a"}
```
