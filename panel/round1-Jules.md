# Jules — Round 1 (synastry)

Persona: content/community marketer, mobile-first, curious about astrology, posts her big-three, allergic to logins. Tested at 375px mobile (primary) + 1280px desktop. Cold load, no source read.

## 1. What I tried & what happened
Landed cold. Header "Your birth chart, explained in plain English. Free, no signup" — instantly my thing. Tapped LOAD EXAMPLE (EINSTEIN), full natal chart appeared (Pisces Sun, Sag Moon, Cancer Rising — correct). Scrolled and found a **COMPARE TWO PEOPLE** button — discovery took ~8 seconds and yes, it sits ABOVE the "Today's Sky" transit card (compareY 1794 < transitY 1913). Tapped it: auto-loaded Einstein × Michelle Obama, two distinct charts. Zero console/page errors anywhere (natal, compare, desktop). Natal chart not broken.

## 2. What worked / what was confusing or broken
WORKED:
- The COMPATIBILITY SUMMARY is genuinely lovely: Person A vs Person B big-three side by side, element-distribution bars each. Plain English, screenshot-worthy. This is the part I'd post.
- HONEST: no fake "87% match" — it says "30 HARMONY · 15 TENSION · 5 CONJUNCTION" with a plain sentence. I trust it more for that.
- House overlay reads in plain English ("Your Mercury in their Sixth House: communication helps organize their daily life").

BROKEN / CONFUSING:
- **"Albert Einstein × Michelle Obama" is printed 50 times** — once on EVERY aspect card. I already know who I'm comparing. On mobile the page is 15,000+px tall and I'm thumb-scrolling past identical labels forever.
- **Every aspect of the same type is word-for-word identical.** Every sextile = "an easy cooperative opportunity…"; every trine = "flow together effortlessly…". ~50 cards, ~3 unique sentences. After 4 cards there's nothing new to read — feels padded, not insightful.
- **Aspect attribution is ambiguous.** "Saturn ⚹ Mars" — whose Saturn? Whose Mars? No A/B color or label. In synastry that direction matters and I can't tell.
- **Pronoun voice is wrong for a 3-person comparison.** Header "MICHELLE OBAMA'S PLANETS IN ALBERT EINSTEIN'S HOUSES" then body "Your North Node in their 1 house." Whose is "Your"? It's leftover single-chart voice; confusing when comparing two other people.
- **NO SHARE in the compare view.** Natal has "Share this chart"; synastry only has "← BACK TO CHART". The entire reason I'd open this is to share "look at me + my friend" — and I can't. Dealbreaker for me.
- Desktop nit: input form stays pinned left, element charts stack vertically not side-by-side; lots of scroll even on a wide screen.

## 3. Would I use / recommend it?
The natal explainer: yes, I'd use and share it tomorrow. The synastry feature: the summary card is share-gold but it's buried under a giant repetitive aspect dump with no share button and confusing pronouns. I'd open it once, screenshot only the top, and not come back to the aspect list. Close, not there.

- ADVOCACY: 6 — I'd recommend the natal app unprompted, but the synastry can't be shared and the aspect list is a repetitive wall, which is exactly what I'd judge hardest.
- VALUE: Yes (vs Co–Star/CafeAstrology synastry which need accounts or are jargon-dense) — but value is concentrated in the top card only.
- CLARITY: Partially — summary clear in 5s; aspect list + "Your/their" pronouns muddy who's who.
- DOMINANT COMPLAINT: No share button on the compatibility view, and "Einstein × Obama" + identical boilerplate repeated 50× makes the aspect list an unreadable mobile scroll.

```json
{"tester": 0, "round": 1, "clarity": "Partially", "value": "Yes", "advocacy": 6, "topComplaints": ["No share button in compare view — can't share a synastry, which is the whole point for a sharer", "Pair label 'Albert Einstein × Michelle Obama' + identical per-type boilerplate repeated on all 50 aspect cards = unreadable 15000px mobile scroll", "Aspect attribution ambiguous (whose Saturn vs whose Mars?) and 'Your/their' pronouns wrong for comparing two other people"], "priorConcernsAddressed": "n/a"}
```
