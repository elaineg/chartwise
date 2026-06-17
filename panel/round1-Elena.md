# Round 1 — Elena (Engineering manager, 8 reports; casual-curious skeptic; phone-between-meetings)

Tested on 375px mobile viewport, ~30s patience budget.

## 1) Advocacy: 6/10 — would mention it, but with a caveat
I'd probably drop the link in our team Slack ("we joke about signs all day") because it's free,
no-signup, and the Einstein example sells it in two seconds. That's genuinely shareable. But I'm
not at 8+ because the ONE thing a casual user does — type their city — was fiddly enough that I'd
hesitate before telling a non-technical friend "just type your stuff, it's instant." I picked the
WRONG San Francisco without realizing it (see defects). If a friend got a quietly-wrong chart from
a bad city match, that's the kind of thing that makes me look like I recommended something janky.
A 6 is honest: good enough to forward casually, not good enough to evangelize.

## 2) Value: Yes
Today I do nothing structured — I half-glance at a horoscope app or google "what's my rising sign"
and give up. This actually computes a real chart and, more importantly, the **"Today's Sky" daily
transit** is dated today (Tuesday June 16 2026) and personalized to my chart ("Mars in Taurus is
visiting your natal Neptune's sign"). THAT is the return hook for me — a fresh 10-second hit between
meetings. Saved charts persist in-browser so I can re-open mine + a coworker's instantly. That's
more than my current "nothing," so yes.

## 3) Clarity: Yes
H1 "Your birth chart, explained in plain English" + "Free, no signup" + a big "Load example
(Einstein)" button told me exactly what it is and what to do inside ~5 seconds. Plain-English house
labels ("Self & identity", "Money & values") instead of jargon are a real win for a skeptic like me.
Zero confusion on purpose or usage.

## Concrete likes
- INSTANT. Einstein example rendered in ~0.45s; my own chart computed in ~2.7s total including typing. No spinners, no setup, no login. This is the whole reason I'd come back.
- Daily "Today's Sky" transit is real, dated to today, and tied to MY placements — that's the pull-back hook, and it works.
- Plain-English labels + clean dark mobile layout that fits 375px with no horizontal scroll.
- Saved charts (me + a coworker) persist locally — exactly my "glance at two charts in a spare 30s" use case.

## Concrete defects (speed / setup / mobile)
- **City picker ranks junk first (real friction).** Typing "San Francisco" surfaced "San Francisco, 05, AR" (Argentina), "...02, CO" (Colombia), "...04, CR" — the famous US city wasn't on screen. I tapped the top result and silently got the WRONG city's coordinates. "London" gives "London, 08, CA" (Canada) before London UK. The most-famous city for a query MUST rank first.
- **Region codes are cryptic.** "05", "02", "ENG" mean nothing to a normal phone user; show "California, USA" / "England, UK", not numeric codes.
- **Adding the country breaks search entirely.** Typing "San Francisco, USA" returned ZERO results — a fast user will naturally type the country and hit a dead end.
- Minor: the form sits above the result, so on mobile I scroll past the whole input form every time to re-see my chart; "Today's Sky" is far down the page.

```json
{"tester": 7, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 6, "topComplaints": ["City typeahead ranks obscure foreign matches first and uses cryptic region codes — I silently picked the wrong San Francisco", "Typing the country (e.g. 'San Francisco, USA') breaks search and returns nothing", "Result/transit sits far below the form on mobile — lots of scrolling to re-glance at my chart"], "priorConcernsAddressed": "n/a"}
```
