# Wen — round 1

**CLARITY: Yes.** In 5s I'd tell a friend: "Type your birth date/time/place (no signup), it computes your real natal chart and explains every placement in plain English." The H1 "Your birth chart, explained in plain English" + "NATAL CHART · PLAIN ENGLISH · NO SIGNUP" nailed it. As a curious skeptic I finally got plain-language definitions of "rising," houses, and retrogrades without reading a wheel.

**VALUE: Yes.** Today I'd half-understand Co-Star's cryptic blurbs or fall down a Wikipedia rabbit hole. This actually decodes MY chart: 11 placements with degrees + houses, an element-distribution count ("Based on 11 placements"), a retrograde (℞) flag, and per-placement plain-English. The privacy line — "Your chart is computed on your device — nothing is sent anywhere" — is exactly what wins my trust; it survives my data-hygiene sniff test.

**ADVOCACY: 8/10.** I'd bring it up to friends who quote their Big 3. Not a 9 because it shows me the WHAT but never the HOW — no "we use Placidus houses / tropical zodiac," no source for the city's lat/long or the ephemeris, and the city autocomplete rounds coords to 0.01° (41.8500, -87.6500) with no precision note. A "how this is calculated" line would move me to 9.

**BIGGEST BLOCKER:** No methodology transparency. It asserts placements confidently but never names the house system, zodiac, or data source — so a skeptic can't audit whether the math is credible vs invented. Quote that bugs me: confident plain-English on BIG-3-estimated houses reads identical to a precise chart's, despite being back-solved.

**BIG 3 flow:** Toggle (PRECISE | BIG 3) is fully discoverable — top-left, both labels visible cold. Form copy is great: "Know your Sun, Moon, and Rising (e.g. from Co-Star) but not your exact birth time? Estimate the rest." Loading: ~3s, real "Estimating…" spinner — felt intentional, not broken. **Estimate labeled honestly: YES** — "ESTIMATED CHART" banner: "Date, time, and place were inferred from your big three — this is an approximation," and it openly shows the fabricated inputs "1990-03-25 01:14 New York, USA (reference)." That candor is the single best honesty move in the app. **Signs honored: YES** — I picked Aries/Pisces/Capricorn and got exactly Aries Sun, Pisces Moon, Capricorn Rising. One gap: the inferred Mercury/Venus/Mars/houses get the same confident voice with no per-placement "approximate" tag.

```json
{"tester": 1, "round": 1, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["No methodology transparency — house system / zodiac / ephemeris / coord source never named, so chart math can't be audited", "BIG-3-estimated placements (Mercury/Venus/Mars/houses) read as confidently as precise ones with no per-placement approximate tag"], "priorConcernsAddressed": "n/a"}
```
