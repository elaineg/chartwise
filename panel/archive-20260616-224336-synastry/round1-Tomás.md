# Round 1 — Tomás (Operations analyst; Excel/Tableau/Jira; HARD astrology skeptic, partner is into it)

Tested cold on a desktop viewport (corporate-laptop equivalent), Edge-like. I do not believe in
astrology, so I judged this on two things my profile actually cares about: **is the birth/place
data private**, and **could my partner (a layperson believer) understand the output** — not on
whether the category appeals to me.

## 1) Advocacy: 6/10 — I would actually mention it to my partner, but not unprompted to colleagues
Honest split. As a product for its audience it's clearly competent, and I'd send the link to my
partner with "no signup, runs in your browser, try it" — that's a real send. But *I* won't bring
it up to anyone else, and even for my partner there are two things that knock it below an
enthusiastic score: (a) the city picker labels are cryptic — I typed "Madrid" and got
"Madrid, 33, CO", "Madrid, 29, ES", "Madrid, 08, MX"... the bare numbers (region codes?) are
unexplained, and it silently let me compute against **Madrid, Colombia** when I meant Spain. A
layperson will pick the wrong one and not notice. (b) The share-link disclosure literally says it
sends birth info to a server — fine that it's honest and opt-in, but a privacy-cautious person
reads that and hesitates. Neither is fatal; both keep it off a 9.

## 2) Value: Yes (for the target user, not for me)
For its audience this genuinely beats the alternative. My partner currently uses astro-seek /
Co–Star-type apps; the differentiators here are real: no signup, computed on-device, a clean
house table with **plain-English labels** ("Self & identity", "Career & reputation", "Money &
values") instead of pure jargon, expandable per-placement explanations, and a "Today's Sky"
transits panel with readings like "Moon in Cancer is visiting your natal Sun's sign." That's
more legible than the wall-of-symbols charts I've seen my partner squint at. Not value *for me*
— I'd never use it — but the question is whether it saves the target effort, and it does.

## 3) Clarity: Yes
Within 30s the H1 "Your birth chart, explained in plain English" + subhead "Free, no signup —
type your birth date, time, and place, or load an example" told me exactly what it is and what to
do. The "Load example (Einstein)" button is an obvious zero-risk first click and it populated a
full chart instantly. The footer line "Your chart is computed on your device. Saved charts stay
in your browser only." answered my #1 question before I had to dig for it.

## Concrete likes
- Verified privacy: typing a city triggered **zero external network requests** (offline bundled
  city dataset), and computing a chart sent nothing off-device. As the skeptic-with-fine-print,
  this is the single biggest trust win.
- No signup, no email, no paywall — nothing nags you.
- Plain-English house labels + expandable explanations + element distribution; a non-astrologer
  can follow it. "Today's Sky" transit blurbs are readable English, not jargon.
- Share link is **opt-in** and the data-leaves-browser behavior is disclosed in plain language
  right next to the button. Honest. (My capture showed no external call on share-create either —
  appears to encode into the URL token; behavior matches the on-device promise.)
- Clean, no console errors, instant compute.

## Concrete defects
- City picker labels are cryptic ("Madrid, 33, CO") — the numeric code is unexplained and it let
  me compute against the wrong country silently. A layperson will mis-pick. Spell out the
  region/country.
- "Birth time" has an "Unknown" checkbox but no explanation of how much the chart changes without
  it — a believer partner won't know whether their guess matters (rising sign / houses depend on it).
- The skeptic in me wants one line of honesty up top that this is for entertainment/interpretation,
  not science — its absence isn't a bug but it's why I personally stay detached.
- Category just isn't for me; that caps my own enthusiasm regardless of build quality.

```json
{"tester": 1, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 6, "topComplaints": ["City picker labels cryptic ('Madrid, 33, CO') — silently let me compute against wrong country", "No guidance on how much an unknown birth time changes the chart"], "priorConcernsAddressed": "n/a"}
```
