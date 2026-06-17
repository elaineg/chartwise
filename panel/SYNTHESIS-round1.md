# Chartwise — SYNTHESIS Round 1 (SYNASTRY / "Compare two people" feature)

App under test: http://localhost:3099 (local `next start` prod server). Cold run, full 10-persona panel re-spawned (carry-forward is per-arc, does NOT survive across runs — prior 8/8 does not carry).

## Audience classification (audience-weighted bar)

This is a NICHE-CATEGORY astrology app, so we use the same audience-weighted bar as prior chartwise/standupdigest ships.

IN-AUDIENCE (GATE — must advocate adv>=9 with value-clear): the astrology-curious / receptive personas who would plausibly ever open a natal+compatibility tool.
- **Dana** (curious) — knows her big-three, target user.
- **Jules** (curious) — astrology is part of her social identity.
- **Aisha** (curious) — into astrology, explanation-first appeals to her.
- **Sam** (curious) — genuinely curious, loves conversation-starters.
- **Marcus** (casual-curious-skeptic) — engages happily, drops tools in group chat.
- **Wen** (casual-curious-skeptic) — genuinely curious to understand placements.
- **Rob** (casual-curious-skeptic) — idly curious about his big-three; engages.
- **Elena** (casual-curious-skeptic) — half-believes, enjoys it as light fun.

CARRIED NON-GATING (hard astrology-skeptics / category non-fits — report scores, do NOT block ship):
- **Priya** (hard-skeptic, profile audienceFit="non-fit") — considers astrology pseudoscience, would never use it for herself. Consistent with prior ships treating her as a hard non-fit.
- **Tomás** (hard-skeptic, profile audienceFit="non-fit") — thinks astrology is harmless nonsense, won't use it himself. Consistent with prior ships treating him as a hard non-fit.

Classification taken from each profile's `astrology_stance` + `audienceFit`, not from memory. The 8 casual-curious-skeptic / curious personas are in-audience; only the two profile-flagged hard-skeptic non-fits (Priya, Tomás) are carried non-gating.

## Per-tester results

| Tester | In-audience? | Adv | Value | Clarity | Dominant complaint |
|--------|--------------|-----|-------|---------|--------------------|
| Dana   | YES (gate)   | 7   | Yes   | Yes     | Aspect blurbs generic/repetitive — never name what the two planets mean; no share button; mobile Compare doesn't scroll to result |
| Jules  | YES (gate)   | 6   | Yes   | Partially | No share button in compare view; "Einstein × Obama" + identical boilerplate repeated 50×; aspect attribution + "Your/their" pronoun leftover |
| Aisha  | YES (gate)   | 8   | Yes   | Yes     | ~40 aspect rows recycle identical generic blurbs, burying the specific ones; birth form stays mounted in compare view on mobile |
| Sam    | YES (gate)   | 6   | Marginal | Partially | Can't easily compare own partner — Person B only from saved charts, no inline picker/hint; + repetitive filler aspects |
| Marcus | YES (gate)   | 8   | Yes   | Yes     | Sun⚹Sun SEXTILE blurb hardcodes "same Sun sign" but A=Pisces, B=Capricorn — silently-wrong copy; + generic filler |
| Wen    | YES (gate)   | 7   | Yes   | Yes     | KEY ASPECTS never say WHOSE planet is which, yet blurbs use directional language — silent directionality loss |
| Rob    | YES (gate)   | 6   | Marginal | Yes   | ~50 aspect rows, only ~7 unique templates keyed to aspect TYPE not planet pair — reads as wallpaper/dense manual |
| Elena  | YES (gate)   | 6   | Yes   | Yes     | KEY ASPECTS templated by aspect type; "key" aspects are obscure Chiron/Node pairs by orb, not the Sun/Moon/Venus/Mars chemistry users came for |
| Priya  | carried (non-fit) | 3 | No  | Yes     | 50-row aspect list reuses generic per-type blurbs verbatim, never naming planetary themes; minor "1 house" grammar |
| Tomás  | carried (non-fit) | 4 | No  | Partially | Key Aspects is a 50+ row jargon dump, no top-N; harmony/tension counts have no baseline |

## In-audience tally at the bar (adv>=9 with value-clear)

In-audience advocacy scores: Dana 7, Jules 6, Aisha 8, Sam 6, Marcus 8, Wen 7, Rob 6, Elena 6.
**0 of 8 in-audience testers at adv>=9.** Top scorers are Aisha (8) and Marcus (8). None clears the 9 bar.

Carried non-fits (non-gating): Priya 3, Tomás 4.

## VERDICT: ITERATE

No in-audience tester reached adv>=9. The feature is structurally strong and broadly trusted — every tester confirmed it is DISCOVERABLE (found in ~2-8s), correctly positioned ABOVE the transit card, CLEAR within 5s, HONEST (no fake % match — counts verified 30/15/5 against rendered cards by multiple testers), private/client-side (Priya + Tomás sniffed the network: zero birth data leaves the browser), and the pre-existing natal chart is NOT broken at desktop or 375px mobile (zero console/page errors, no clipping/overflow/double-render anywhere). This is an added-feature that WORKS — the gap is content quality, not function or discoverability.

### Single dominant blocker (named by 9 of 10 testers, all 8 in-audience)

**The "KEY ASPECTS" list is a wall of generic, repeated boilerplate.** ~50 rows are keyed to the aspect TYPE (sextile/trine/square) rather than the planet PAIR, so the same ~3-7 sentences repeat ~8-12× each. Consequences testers cited:
- It never says what the two specific planets mean between these two people (Dana, Wen, Rob, Elena, Priya, Tomás).
- The page becomes 9,500-15,000px of repetition that buries the few specific, valuable interpretations (Aisha, Jules, Rob).
- The surfaced "key" aspects are obscure Chiron/Node pairings (sorted by tightest orb) instead of the Sun/Moon/Venus/Mars chemistry a casual user came for (Elena).

### Precise fix (highest-leverage)

Replace the type-keyed aspect dump with a curated, planet-pair-aware section:
1. **Curate to a TOP ~5-7 aspects**, ranked by relationship significance (prioritize Sun/Moon/Venus/Mars/ASC pairings over Chiron/Node trivia), not merely by tightest orb. Collapse the long tail behind a "show all" toggle.
2. **Write blurbs per PLANET PAIR**, not per aspect type — each card must name what the two bodies' themes mean together (e.g., "His Saturn steadying her Venus → ...") rather than a generic "a sextile here makes these two themes...".
3. **Fix the two silently-wrong copy bugs surfaced:** (a) Marcus — the Sun⚹Sun sextile blurb hardcodes "sharing the same Sun sign" though the two Suns are different signs (it's keyed off planet-pair-same-planet, ignoring sign); (b) Wen/Jules — aspect cards don't state whose planet is whose and reuse single-chart "Your/their" pronouns ("North Node in their 1 house" under an A's-planets-in-B's-houses header), losing synastry directionality. Also fix the "1 house" → "1st house" ordinal grammar (Priya).

### Secondary (cheap wins, would lift several to 9 alongside the fix above)
- **Add a share/copy-link or save-image button to the compare view** (Jules, Dana — the viral hook is missing; only "← Back to chart" exists). Several in-audience testers are sharers and explicitly named this.
- **Make it easy to set Person B to your own partner** — inline picker / hint that you must compute+save a second chart first; currently Person B is only selectable from "Saved charts" with no guidance (Sam, Aisha, Dana — computing a new person silently wipes the loaded pair).
- **Mobile compare view:** scroll to the result after tapping Compare (Dana); don't leave the full birth-data form mounted above the compatibility content (Aisha).

The aspect-list rewrite is the one blocker to fix first — it is the centerpiece of the feature and the unanimous in-audience complaint. The two copy bugs ride along in the same edit. With it fixed (and ideally the share button), Aisha and Marcus (both already at 8) and Wen/Dana (7) are the closest to clearing the 9 bar.
