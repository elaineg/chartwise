# Wen — Round 3 (Marketing data analyst, casual-curious-skeptic)

**Clarity: Yes (9/10).** Cold open still legible in 5 seconds: "Your birth chart, explained
in plain English" + "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" + "Free, no signup — type your
birth date, time, and place, or load an example." The PRECISE | BIG 3 toggle is obvious, and
BIG 3 has the perfect hand-hold copy: "Know your Sun, Moon, and Rising (e.g. from Co-Star) but
not your exact birth time? Estimate the rest." I'd tell a friend: "Paste your birth details
(or just your Big Three) and it explains every placement in plain English — free, no login."

**Value: Yes.** Today I'd skim Co-Star or a free chart site and stare at a wheel I can't read.
This explains house placements and rising in words without making me learn the glyphs, in one
session. The BIG 3 estimate path is genuinely useful — I had my Sun/Moon/Rising from an app but
no birth time, and it filled the rest. Saves real effort over piecing it together myself.

**Round-2 methodology blocker: RESOLVED (mostly).** This was my held-at-8 issue: "I want to know
HOW the chart is computed." It's now answered well. Near the ESTIMATED badge:
> "How this works: we searched 1988 for a date and time at a reference location whose chart
> matches your Sun, Moon, and Rising — then computed the rest from that anchor. Your real birth
> date, time, and place will differ."
Better still, the result SHOWS the inferred anchor concretely: `1988-05-28 / 09:26 /
New York, USA (reference)`. As a data-hygiene person, seeing the actual derived date/time/anchor
(not just a vague disclaimer) is exactly what I wanted — it makes the transformation inspectable.
That moves me 8→9.

**Remaining blocker (single biggest):** The *technical* method is still unnamed. I searched the
output: no mention of the house system (Placidus / Whole Sign / Equal — I see "House 11" and an
MC, so some system is being applied), no ephemeris/data source (Swiss Ephemeris?), and no
tropical-vs-sidereal note. For the ESTIMATE that's a footnote; for the PRECISE chart it's the
real credibility question — two house systems give different house numbers, and a careful user
will notice the houses changed and not know why. Naming the house system + ephemeris once
(even in a small "method" line) is what would take me to a 10. Not enough to dock value, but it
caps unprompted advocacy.

**Advocacy: 9/10.** I'd now bring this up unprompted to curious-but-skeptical friends — the
estimate transparency earned the extra point. Held off 10 only because the house-system /
ephemeris source is still undisclosed, which is the last thing my distrust-invisible-transforms
instinct wants pinned down.

```json
{"tester": 1, "round": 3, "clarity": "Yes", "value": "Yes", "advocacy": 9, "topComplaints": ["House system (Placidus/Whole Sign/Equal) is never named, yet houses are assigned — the core credibility gap for the PRECISE chart", "Ephemeris/data source and tropical-vs-sidereal not stated anywhere"], "priorConcernsAddressed": "all"}
```
