# Wen — round 6

**1. ADVOCACY: 8/10**
**2. VALUE: Yes**
**3. CLARITY: Yes**

## Prior concerns (round 5) re-checked cold
- **Same-name city disambiguation** — FIXED and excellent. Typing "Springfield" returned 8 options each tagged with state + country (Springfield, MO / MA / IL / OR / OH / VA / PA / TN), and once picked it echoes "✓ Springfield, MO, United States (37.2153, -93.2982)" with the literal lat/long. As a data person this is exactly what I wanted: no invisible geocode, I can see what was resolved.
- **Same-sign readings now distinct per planet** — FIXED. Einstein has Mercury AND Venus AND Saturn in Aries. Aries Mercury = "mind moves fast and talks faster… blunt"; Aries Venus = "in love you're direct and impatient… love the chase." Genuinely different copy per planet, and each adds a second sentence keyed to the house (10th-house career mind vs 11th-house community Venus). Not boilerplate. This is the consistency win I'd been waiting for.

## The degree-in-headline item (my 9→10 ask, 4th round running) — STILL NOT DONE
- The headline chips still read "☉ Pisces Sun · House 10", "☽ Sagittarius Moon", "Cancer rising" — **no degree**. The degree (Sun 23° Pisces) lives only in the house table. It's the single small thing keeping me off a 9. The table HAS it, the share/save image inherits the degree-less headline. One token per chip and I'd round up.

## Other notes
- Chart math credible: Pisces Sun (23°), Sagittarius Moon, Cancer ASC, MC Pisces match the canonical Einstein chart; element distribution 4 Fire / 5 Earth / 1 Air / 1 Water on "11 planetary placements" is internally consistent.
- Cell expand works (aria flips to "tap to hide reading", inline reading renders); single-open accordion.
- Save-as-image downloaded `albert-einstein-chart.png`; share link created `/chart/...`, unfurled at HTTP 200 with proper OG title/description.
- Privacy copy is honest and explicit: "computed on your device — nothing is sent anywhere" vs "creating a share link sends this chart's birth info to our server." A skeptic trusts a tool that says exactly when data leaves the device.
- Zero console/page errors across load, compute, expand, save, and share.

```json
{"tester": 6, "round": 6, "clarity": "Yes", "value": "Yes", "advocacy": 8, "topComplaints": ["Headline chips still omit the degree (Sun 23° Pisces shows as just 'Pisces Sun · House 10') — my 9→10 ask, still open across 4 rounds", "Share/save-image inherit the degree-less headline, so the artifact people see lacks the precise data point"], "priorConcernsAddressed": "all"}
```
