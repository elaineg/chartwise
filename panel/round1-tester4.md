- Persona: Tomás (ops analyst, Excel/Tableau; hard-skeptic on astrology, tests for privacy/clarity)

- Clarity: Yes. Within 30s the header "Your birth chart, explained in plain English. / Free, no signup — type your birth date, time, and place." plus the PRECISE | BIG 3 toggle told me exactly what it is and who it's for. BIG 3's sub-line ("Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest.") is genuinely well-written for a layperson — my partner would get it instantly. Output uses normal sentences, not jargon.

- Value: No (for me) — I think astrology is nonsense, so I'd never use it. But judged on its own terms it's competent: the estimate, the "ESTIMATED CHART" badge, and the disclaimer ("your sun/moon/rising are what you told us; everything else is estimated") are honest, which I respect. Beats my partner's Co-Star screenshots for a shareable, readable writeup.

- Advocacy (0-10): 4 — solid and trustworthy for what it is, but it's astrology, so I wouldn't bring it up unprompted; might forward to my partner if it came up.

- In-audience: no (hard-skeptic non-fit)

What worked:
  - Strong privacy posture: "NO SIGNUP", "Free", and "Your chart is computed on your device. Saved charts stay in your browser only." — the kind of line I read the fine print for, and it reassured me. No data-entry of an address; just a city autocomplete (resolved "London, ENG, United Kingdom" cleanly).
  - BIG 3 full flow worked: named chart, picked Sun/Moon/Rising + birth year, "Estimate chart" rendered a labeled "ESTIMATED CHART" with name and plain-English readout.
  - Share link worked end-to-end: "Create share link" -> visible URL (/chart/<id>); reloaded fresh in a clean browser and it restored the name, the ESTIMATED CHART badge, and all three signs. No console errors anywhere.
  - BIG 3 form is comfortably spaced, even padding on inputs/selects; not cramped.
  - Compatibility "Compare two people" example loaded the Diana × Charles pair with a readable writeup + element chart.

What broke / concerns:
  - TRUST INCONSISTENCY: copy says "Saved charts stay in your browser only," but the SHARE link is clearly a SERVER-stored URL (/chart/5anItxPVsaHfar5X6sW7GUpp) that opens in a totally separate browser. So shared charts DO leave my device. The reassuring fine print is technically contradicted once you share — I'd want one line clarifying that sharing uploads the chart.
  - Compatibility card only appears AFTER you compute a chart (no nav/route to it cold) — mild discoverability nit.
  - Note: clipboard read was blocked in my test env, but the "Copy link" handler fired and the URL is shown on-page — copy verified visually, not a real bug.
