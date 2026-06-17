# Wen — Round 1 (synastry)

Persona: marketing data analyst, casual-curious astrology skeptic. Desktop + 375px mobile. Cold open.

## 1. What I tried / what happened
Landed cold, header "Your birth chart, explained in plain English · NATAL CHART · PLAIN ENGLISH · NO SIGNUP" — instantly legible. Clicked LOAD EXAMPLE (EINSTEIN). Chart rendered fine. Found the compatibility entry in ~6 seconds: a "COMPATIBILITY — Compare two people →" block with a "COMPARE TWO PEOPLE" button sitting just ABOVE the "Today's Sky" transit card (button top ~480px, transit ~614px) — correct placement, discoverable. Clicked it; it auto-loaded Einstein × Michelle Obama, two genuinely distinct charts (Pisces/Sag/Cancer vs Capricorn/Pisces/Virgo).

## 2. What worked / what was confusing or broken
WORKED (and earned my trust as a data person):
- NO fake % match score. Summary is honest counts: "30 HARMONY · 15 TENSION · 5 CONJUNCTION" + a hedged sentence. I checked the rendered cards: exactly 30/15/5 — summary matches the detail, internally consistent. Good data hygiene.
- Aspects show ORB in degrees (0.0°–7.9°) and sort by tightness — I can see WHY an aspect "counts." That transparency is exactly what I want.
- HOUSE OVERLAY is bidirectional and explicitly labeled ("MICHELLE OBAMA'S PLANETS IN ALBERT EINSTEIN'S HOUSES" and vice-versa) — directionality is clear here.
- Big-three side-by-side + element distribution bars ("Based on 11 planetary placements") are plain-English readable with zero wheel literacy.
- Natal chart NOT broken: Einstein ASC 7°24' Cancer, MC 7°28' Pisces, Sun Pisces — matches his known chart, arcminutes shown.
- Mobile 375px: zero horizontal overflow, two columns hold, nothing clipped/doubled. Desktop clean. 0 console/page errors anywhere.

CONFUSING / MY REAL GRIPE:
- KEY ASPECTS hide directionality. "Saturn ⚹ Mars" never says WHOSE Saturn and WHOSE Mars — every card just reads "Albert Einstein × Michelle Obama." Worse, the interpretation text uses directional language ("the Saturn person provides grounding the Sun person can use") without telling me which person is the Saturn person. In synastry his-Saturn-on-her-Venus ≠ her-Saturn-on-his-Venus; collapsing that is a silent loss of information. The house section gets this right, so the aspects section feels like a regression by comparison.
- Generic fallback blurbs repeat verbatim ("A trine here makes these two themes flow together effortlessly...") across many cards — fine, but it makes the section feel padded; the specific ones (Venus/Saturn, Mercury/Sun) are far better.

## 3. Would I use / recommend it
For entertainment with a friend's birth data, yes — it's the rare astrology tool that shows its work instead of inventing a compatibility percentage, which is the exact thing that makes me close these apps. The directionality gap is what keeps me from trusting it fully.

ADVOCACY: 7/10 — but read as honest-7-is-failing: I'd recommend it to one curious friend with the caveat "ignore who's-whose in the aspect list." Fix planet directionality in KEY ASPECTS and it jumps to 9.
VALUE: Yes — replaces eyeballing two AstroSeek tabs; the harmony/tension counts + orbs do in one screen what I'd otherwise reconcile by hand.
CLARITY: Clear within 5 seconds — "Compatibility, explained / How two charts get along — in plain English" plus the side-by-side big-three needs no astrology literacy.
DOMINANT COMPLAINT: KEY ASPECTS never says whose planet is whose, yet the blurbs talk about "the Saturn person" — directionally ambiguous data.

```json
{"tester": 0, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 7, "topComplaints": ["KEY ASPECTS omit planet ownership (whose Saturn / whose Mars), but blurbs reference 'the Saturn person' — directionally ambiguous", "Generic trine/sextile/square fallback blurbs repeat verbatim across many cards, feels padded"], "priorConcernsAddressed": "n/a"}
```
