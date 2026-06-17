/**
 * Synastry interpretation dataset — compact keyed objects.
 * Structure: bodyPair key → aspect-nature key → blurb string.
 * All text is original, authored in-house.
 *
 * Coverage:
 *  - High-signal pairs (explicit entries): sun-moon, sun-sun, moon-moon,
 *    venus-mars, sun-venus, moon-venus, mars-mars, sun-saturn, venus-saturn,
 *    sun-mars, moon-mars, venus-venus, mercury-mercury, mercury-sun,
 *    mercury-moon, jupiter-sun, saturn-moon, mercury-jupiter, mercury-saturn,
 *    jupiter-moon, jupiter-venus, jupiter-mars, jupiter-jupiter,
 *    saturn-venus (alias), saturn-sun (alias), uranus-sun, uranus-moon,
 *    neptune-sun, neptune-moon, pluto-sun, pluto-moon,
 *    chiron-sun, chiron-moon, chiron-venus, northnode-sun, northnode-moon
 *  - Per-aspect-type _generic fallback for every pair not explicitly listed.
 *  - House overlay: per-body + per-house entries with _generic fallback.
 *
 * Nature values: "harmony" | "tension" | "context"
 */

import type { AspectType, AspectNature } from "./synastry";

// ─── Aspect reading dataset ────────────────────────────────────────────────────

type NatureBlurbs = Partial<Record<AspectNature, string>>;
type PairEntry = NatureBlurbs & { _generic?: string };

// Canonical pair key: always smaller body first alphabetically to normalise lookups.
// But for readability, we key by the more-meaningful pair name.
// The lookup function handles both orders.

const ASPECT_READINGS: Record<string, PairEntry> = {
  "sun-sun": {
    harmony:  "Sun trine or sextile Sun: your core identities resonate across different signs and orientations — each of you recognizes the other's fundamental drives, and your self-expressions tend to support rather than compete with each other.",
    tension:  "Sun square or opposite Sun: your identities have fundamentally different orientations, which can create productive friction — each challenges the other to see themselves more fully, though recurring ego clashes are worth managing consciously.",
    context:  "Sun conjunct Sun: your identities overlap substantially — you mirror each other's core drives, which can feel deeply validating or, at times, a little claustrophobic.",
    _generic: "Your Suns aspect each other, linking the core of who you each are — how you see yourselves shapes how you see each other.",
  },
  "sun-moon": {
    harmony:  "The Sun–Moon trine or sextile is one of the most natural relationship aspects: one person's identity supports the other's emotional needs intuitively, with little effort required.",
    tension:  "Sun square or opposite Moon creates a classic push-pull: one person's sense of self can feel at odds with the other's emotional needs, generating both attraction and recurring friction.",
    context:  "Sun conjunct Moon links identity and emotional instinct closely — one of you may feel instantly at home with the other, though the Sun person can inadvertently overshadow the Moon person's feelings.",
    _generic: "The Sun and Moon linking across your charts means identity and feeling are in conversation — how one of you expresses who you are directly affects the other's emotional sense of security.",
  },
  "moon-moon": {
    harmony:  "Moon trine or sextile Moon: your emotional rhythms naturally synchronize. You tend to feel safe with each other quickly, and domestic life flows without constant negotiation.",
    tension:  "Moon square or opposite Moon: your instinctive emotional responses pull in different directions — one might need closeness exactly when the other needs space, creating cycles of misattunement worth addressing directly.",
    context:  "Moon conjunct Moon creates a profound emotional mirroring — you feel each other's moods acutely, almost as your own, which can be deeply comforting or uncomfortably enmeshed.",
    _generic: "Both Moons aspecting each other means your emotional needs and domestic styles are in dialogue — how safe you feel and how you process feelings are key themes between you.",
  },
  "venus-mars": {
    harmony:  "Venus trine or sextile Mars is the classic attraction signature: one person's warmth and aesthetic sense flows easily into the other's desire and drive, generating chemistry that sustains itself naturally.",
    tension:  "Venus square or opposite Mars creates charged attraction mixed with friction — desire is real but so is the clash between what one person finds beautiful or fair and what the other wants to chase.",
    context:  "Venus conjunct Mars is a potent contact: attraction and desire operate at the same frequency. The connection feels immediately magnetic, though maintaining it requires moving beyond the initial pull.",
    _generic: "Venus and Mars across your charts link love and desire directly — this is one of the classic romantic and creative-chemistry contacts in synastry.",
  },
  "sun-venus": {
    harmony:  "Sun trine or sextile Venus: one person delights in the other naturally. The Sun person feels genuinely appreciated; the Venus person finds the Sun person's energy beautiful. Warmth flows easily.",
    tension:  "Sun square or opposite Venus: there is real affection here, but a recurring mismatch between one person's self-expression and the other's aesthetic values can create low-grade friction.",
    context:  "Sun conjunct Venus is one of the most affectionate contacts in synastry — the Venus person genuinely admires who the Sun person is, and the Sun person feels consistently seen and appreciated.",
    _generic: "Sun and Venus aspecting: identity and appreciation are woven together — one of you tends to find the other genuinely beautiful or worth admiring.",
  },
  "moon-venus": {
    harmony:  "Moon trine or sextile Venus: emotional comfort and affection operate in harmony. You naturally create a home-like warmth together, and small acts of care come easily to both of you.",
    tension:  "Moon square or opposite Venus: what feels emotionally safe and what feels beautiful or fair don't quite line up — one person's need for emotional reassurance may clash with the other's more aesthetic or social values.",
    context:  "Moon conjunct Venus links emotional instinct and affection at the same point — tenderness and comfort merge, creating a nurturing quality to the bond that both people tend to value.",
    _generic: "Moon and Venus in aspect: emotional need and affectionate expression are in conversation — how you care for each other emotionally is a central theme.",
  },
  "venus-venus": {
    harmony:  "Venus trine or sextile Venus: your values, tastes, and social styles align naturally. You tend to agree on what makes life enjoyable and find each other's company aesthetically pleasing.",
    tension:  "Venus square or opposite Venus: your values and aesthetics pull in different directions — what one person finds beautiful or worthwhile, the other may overlook or actively resist.",
    context:  "Venus conjunct Venus in synastry creates a genuine meeting of values — you find pleasure in the same things, which is a strong foundation for both friendship and romance.",
    _generic: "Venus aspecting Venus: your values and aesthetic senses are in dialogue — shared pleasures and tastes, or a friction between them, are a recurring theme.",
  },
  "mars-mars": {
    harmony:  "Mars trine or sextile Mars: your drives and action styles complement each other. You tend to energize rather than exhaust each other, and shared projects or physical activities flow naturally.",
    tension:  "Mars square or opposite Mars: two strong drives in friction — competition, power struggles, or clashing approaches to action can create tension, though the same charge can fuel remarkable collaboration when channeled well.",
    context:  "Mars conjunct Mars intensifies drive between you. When pointed at a shared goal the energy is formidable; when at cross-purposes it can tip into competition or conflict quickly.",
    _generic: "Mars and Mars in aspect: how you each pursue what you want and how you handle drive and conflict are directly in conversation.",
  },
  "sun-mars": {
    harmony:  "Sun trine or sextile Mars: the Sun person inspires and the Mars person acts — a natural division of vision and energy that can make you a productive and mutually energizing pair.",
    tension:  "Sun square or opposite Mars: identity and drive clash — one person's way of being can feel like a challenge or provocation to the other's will. The tension is activating but needs conscious management.",
    context:  "Sun conjunct Mars generates strong mutual activation — the Mars person is energized by the Sun person's identity, and the Sun person feels genuinely driven by the Mars person's presence.",
    _generic: "Sun and Mars aspecting each other: identity and drive are linked between you — inspiration and action, or ego and will, are in play.",
  },
  "sun-saturn": {
    harmony:  "Sun trine or sextile Saturn: the Saturn person provides grounding and structure that the Sun person can actually use. There is a quality of mentorship or quiet reliability to this connection.",
    tension:  "Sun square or opposite Saturn: the Saturn person may inadvertently constrain or critique the Sun person's self-expression, creating a dynamic where one feels judged or limited by the other.",
    context:  "Sun conjunct Saturn is the classic 'serious relationship' aspect — one person senses the weight of commitment around the other from the start. It can be binding in constructive or constricting ways.",
    _generic: "Sun and Saturn in aspect: identity and structure are in dialogue — how one of you expresses yourself freely intersects with the other's sense of responsibility and long-term orientation.",
  },
  "moon-saturn": {
    harmony:  "Moon trine or sextile Saturn: the Saturn person provides stability that the Moon person finds genuinely reassuring. Emotional needs and practical reliability work in concert.",
    tension:  "Moon square or opposite Saturn: emotional needs and structural boundaries conflict — the Moon person may feel emotionally restricted by the Saturn person, who may in turn find the Moon person's feeling-world hard to navigate.",
    context:  "Moon conjunct Saturn: emotional needs meet responsibility. The Saturn person may feel protective or sobering toward the Moon person — a quality that can be deeply steadying or feel emotionally heavy.",
    _generic: "Moon and Saturn in aspect: emotional need and structure are in dialogue — security and responsibility intersect, for better or for challenge.",
  },
  "venus-saturn": {
    harmony:  "Venus trine or sextile Saturn: affection and commitment are in comfortable dialogue. The Saturn person takes the relationship seriously; the Venus person finds that seriousness appealing rather than heavy.",
    tension:  "Venus square or opposite Saturn: love and restriction are in friction — the Venus person may feel emotionally underserved or constrained by the Saturn person's caution or demands.",
    context:  "Venus conjunct Saturn: this contact tends to feel serious from the start. The bond has weight and staying power, though the Venus person may sometimes feel the affection is conditional or withheld.",
    _generic: "Venus and Saturn in aspect: love and duty, warmth and structure are linked — the relationship may carry a quality of long-term commitment or feel testing around matters of affection.",
  },
  "mercury-sun": {
    harmony:  "Mercury trine or sextile Sun: conversation between you flows naturally. The Sun person's identity inspires the Mercury person's thinking, and the Mercury person articulates things the Sun person recognises as true about themselves.",
    tension:  "Mercury square or opposite Sun: how one of you thinks and communicates doesn't quite match who the other is at core — a low-level intellectual friction that can be creative or persistently irritating.",
    context:  "Mercury conjunct Sun: minds and identities overlap closely. You are likely drawn to thinking and talking together; the Sun person feels seen by the Mercury person's way of framing things.",
    _generic: "Mercury and Sun in aspect: how one of you thinks and communicates intersects with the other's core identity — intellectual rapport is a theme.",
  },
  "mercury-moon": {
    harmony:  "Mercury trine or sextile Moon: the way one of you thinks naturally supports the other's emotional world. Conversations feel safe and emotionally attuned rather than purely analytical.",
    tension:  "Mercury square or opposite Moon: intellect and feeling are in friction — what feels logical to the Mercury person can feel emotionally tone-deaf to the Moon person, and vice versa.",
    context:  "Mercury conjunct Moon: thought and feeling merge here. Conversations can feel almost telepathically emotional, with the Mercury person able to articulate what the Moon person feels before they find words.",
    _generic: "Mercury and Moon in aspect: how one of you thinks and speaks intersects with the other's emotional life — intellectual and emotional attunement are in conversation.",
  },
  "mercury-mercury": {
    harmony:  "Mercury trine or sextile Mercury: your minds work in compatible ways. Conversations flow, you finish each other's thoughts, and intellectual exploration together feels enjoyable rather than laborious.",
    tension:  "Mercury square or opposite Mercury: your thinking and communication styles clash — one of you may find the other's way of framing things frustrating or simply hard to track.",
    context:  "Mercury conjunct Mercury: very similar mental styles. You may think so alike that you challenge each other less, but the shared mental frequency also makes communication exceptionally efficient.",
    _generic: "Mercury and Mercury in aspect: your minds and communication styles are directly in dialogue — how you each think and talk shapes the intellectual texture of the relationship.",
  },
  "jupiter-sun": {
    harmony:  "Jupiter trine or sextile Sun: the Jupiter person expands the Sun person's world — bringing optimism, opportunity, and a sense that more is possible. One of the most straightforwardly positive synastry contacts.",
    tension:  "Jupiter square or opposite Sun: expansion and identity are in tension — the Jupiter person's enthusiasm or big-picture orientation can feel overwhelming or misaligned with who the Sun person is.",
    context:  "Jupiter conjunct Sun: the Jupiter person tends to amplify the Sun person's sense of self — generosity and possibility flow in this direction, sometimes to excess.",
    _generic: "Jupiter and Sun in aspect: growth and identity intersect — one person's optimism or worldview expands what the other believes is possible for themselves.",
  },
  "moon-mars": {
    harmony:  "Moon trine or sextile Mars: emotional need and desire flow naturally together — one person's feelings activate the other's will in a supportive rather than reactive way.",
    tension:  "Moon square or opposite Mars: feeling and drive are in friction — the Mars person's assertiveness can feel emotionally aggressive to the Moon person; the Moon person's needs may feel smothering to the Mars person.",
    context:  "Moon conjunct Mars generates raw emotional activation — desire and feeling merge at a point that can produce deep tenderness or rapid emotional flare-ups depending on other chart factors.",
    _generic: "Moon and Mars in aspect: emotional need and drive are in direct contact — how one of you feels and how the other acts are tightly linked.",
  },
  "moon-jupiter": {
    harmony:  "Moon trine or sextile Jupiter: one person's emotional world is genuinely expanded by the other's optimism and generosity — a warm, uplifting contact that makes everyday life feel more abundant.",
    tension:  "Moon square or opposite Jupiter: emotional needs and expansive impulses pull in different directions — the Jupiter person's enthusiasm can feel overwhelming or emotionally tone-deaf to the Moon person's need for containment.",
    context:  "Moon conjunct Jupiter: emotional generosity flows abundantly here — the Jupiter person has a buoyant, amplifying effect on the Moon person's inner life, which can be joyful or occasionally excessive.",
    _generic: "Moon and Jupiter in aspect: emotional life and a sense of possibility are in conversation — one of you tends to expand or enlarge what the other feels.",
  },
  "mercury-jupiter": {
    harmony:  "Mercury trine or sextile Jupiter: ideas flow easily between you, with one person's curiosity met by the other's breadth of vision — conversations feel productive and leave both of you enlarged.",
    tension:  "Mercury square or opposite Jupiter: how one of you thinks in detail clashes with how the other thinks in big pictures — you may talk past each other without meaning to, one zooming in while the other zooms out.",
    context:  "Mercury conjunct Jupiter: the mind and expansive vision operate at the same point — conversations tend to be ambitious in scope, with ideas arriving faster than they can be fully worked through.",
    _generic: "Mercury and Jupiter in aspect: thinking and vision are in dialogue — how one of you processes information is shaped by the other's sense of what is possible.",
  },
  "mercury-saturn": {
    harmony:  "Mercury trine or sextile Saturn: thought and structure work well together — the Saturn person helps the Mercury person think with more precision and staying power, and the Mercury person gives voice to the Saturn person's plans.",
    tension:  "Mercury square or opposite Saturn: how one of you communicates runs into the other's need for structure and caution — the Saturn person may critique the Mercury person's ideas in ways that feel stifling rather than useful.",
    context:  "Mercury conjunct Saturn: communication and responsibility operate at the same point — conversations carry a serious, considered quality, and words are chosen with particular care.",
    _generic: "Mercury and Saturn in aspect: how one of you thinks and speaks is in dialogue with the other's sense of discipline and long-term thinking.",
  },
  "jupiter-venus": {
    harmony:  "Jupiter trine or sextile Venus: warmth and generosity amplify each other naturally — you tend to bring out the best in each other socially and aesthetically, with an easy abundance to the connection.",
    tension:  "Jupiter square or opposite Venus: pleasure and expansion pull in different directions — what one person finds beautiful or valuable, the other may overstate or misread, creating low-level friction around taste and worth.",
    context:  "Jupiter conjunct Venus: affection and optimism meet at a single point — a genuinely warm, expansive overlay that tends to make both people feel good about the relationship.",
    _generic: "Jupiter and Venus in aspect: generosity and affection are in dialogue — how you each approach warmth and value shapes the quality of the bond.",
  },
  "jupiter-mars": {
    harmony:  "Jupiter trine or sextile Mars: enthusiasm and drive complement each other well — the Jupiter person's vision gives the Mars person's energy a worthy direction, and the Mars person helps the Jupiter person actually act.",
    tension:  "Jupiter square or opposite Mars: ambition and drive clash in scale — the Jupiter person's big-picture enthusiasm may feel reckless to the Mars person's focused will, or the Mars person's directness may feel limiting to the Jupiter person.",
    context:  "Jupiter conjunct Mars: expansion and drive converge — shared projects can feel enormously energized, though the combination can also tip into excess when neither person provides the brake.",
    _generic: "Jupiter and Mars in aspect: vision and drive are in conversation — how you each pursue what you want is shaped by the other's sense of possibility.",
  },
  "jupiter-jupiter": {
    harmony:  "Jupiter trine or sextile Jupiter: your philosophies and worldviews resonate naturally — you expand each other's sense of what is possible without friction, and shared optimism reinforces itself.",
    tension:  "Jupiter square or opposite Jupiter: your broader worldviews and beliefs pull in different directions — what one person finds expansive or meaningful, the other may find excessive or misaligned.",
    context:  "Jupiter conjunct Jupiter: a generational echo — you share a broad philosophical orientation, which can feel deeply validating or, occasionally, like too much of the same energy in the room.",
    _generic: "Jupiter and Jupiter in aspect: your worldviews and senses of possibility are directly in dialogue — shared or competing philosophies are a recurring theme.",
  },
  "uranus-sun": {
    harmony:  "Uranus trine or sextile Sun: the Uranus person introduces a quality of freshness and liberation to the Sun person's sense of self — they feel freer and more original around you.",
    tension:  "Uranus square or opposite Sun: the Uranus person's disruptive or erratic energy can destabilize the Sun person's sense of identity — exciting at first, unsettling over time.",
    context:  "Uranus conjunct Sun: a charge of originality and unpredictability runs through this contact — the Sun person is both attracted to and challenged by the Uranus person's refusal to conform.",
    _generic: "Uranus and Sun in aspect: disruption and identity intersect — one person's need for freedom and originality touches directly on the other's sense of self.",
  },
  "uranus-moon": {
    harmony:  "Uranus trine or sextile Moon: the Uranus person introduces emotional freshness — the Moon person feels free to break old patterns around feeling and security in this relationship.",
    tension:  "Uranus square or opposite Moon: emotional need and disruption are in friction — the Uranus person's unpredictability can feel emotionally destabilizing to the Moon person, who needs consistency.",
    context:  "Uranus conjunct Moon: emotional rhythms are interrupted by a quality of the unexpected — the Moon person may feel both liberated and unsettled by the Uranus person's presence in their inner life.",
    _generic: "Uranus and Moon in aspect: emotional life and a need for freedom are in conversation — the relationship may feel both exciting and periodically unstable.",
  },
  "neptune-sun": {
    harmony:  "Neptune trine or sextile Sun: the Neptune person brings inspiration, idealism, and a touch of magic to the Sun person's sense of self — who they are feels elevated or romanticized in a way that can be genuinely beautiful.",
    tension:  "Neptune square or opposite Sun: idealization and identity are in friction — the Neptune person may see the Sun person through a soft-focus lens, and the Sun person may feel subtly undermined or confused by the Neptune person's diffuse quality.",
    context:  "Neptune conjunct Sun: a dreamy, romantic quality permeates how these two see each other — deeply inspiring at best, subtly disorienting at worst, as clarity can be hard to maintain.",
    _generic: "Neptune and Sun in aspect: idealism and identity are in dialogue — one person's imagination or spirituality touches the other's sense of self.",
  },
  "neptune-moon": {
    harmony:  "Neptune trine or sextile Moon: emotional sensitivity and imagination flow together — the relationship carries a quality of deep empathy, shared feeling, and mutual inspiration.",
    tension:  "Neptune square or opposite Moon: emotional clarity is hard to maintain — the Neptune person's diffuse or idealistic quality can confuse the Moon person's need for clear, reliable emotional connection.",
    context:  "Neptune conjunct Moon: a profound emotional attunement exists here, though it is tinged with the possibility of projection — each may feel the other as they wish them to be, not entirely as they are.",
    _generic: "Neptune and Moon in aspect: emotional world and imagination are in dialogue — the relationship has a subtle, sometimes otherworldly quality.",
  },
  "pluto-sun": {
    harmony:  "Pluto trine or sextile Sun: the Pluto person brings depth and transformative power to the Sun person's identity — a profound influence that may feel fated or deeply significant.",
    tension:  "Pluto square or opposite Sun: power and identity are in tension — the Pluto person may challenge or seek to transform the Sun person's sense of self, creating a dynamic of power, will, and periodic confrontation.",
    context:  "Pluto conjunct Sun: one of the most intense synastry contacts — identity and transformation occupy the same space; the relationship can feel fated, compulsive, and profoundly altering for both people.",
    _generic: "Pluto and Sun in aspect: power and identity are in conversation — one person's transformative intensity touches directly on the other's core sense of self.",
  },
  "pluto-moon": {
    harmony:  "Pluto trine or sextile Moon: the Pluto person touches the Moon person's emotional world at a deep level — this can feel like profound understanding, even healing of old emotional patterns.",
    tension:  "Pluto square or opposite Moon: emotional depth and power are in friction — the Pluto person's intensity may feel overwhelming to the Moon person, and the Moon person's feelings may trigger the Pluto person's control impulses.",
    context:  "Pluto conjunct Moon: emotional life and transformation are merged — the relationship reaches into the deepest layers of both people's feeling-worlds, with a quality of irreversibility.",
    _generic: "Pluto and Moon in aspect: emotional life and transformative depth are in dialogue — the relationship is unlikely to leave either person unchanged.",
  },
  "chiron-sun": {
    harmony:  "Chiron trine or sextile Sun: the Chiron person holds space for the Sun person's old wounds around identity — a gently healing contact where who you are can be seen and accepted, not just admired.",
    tension:  "Chiron square or opposite Sun: old wounds around identity are activated — the Chiron person, even without intending to, touches places in the Sun person where old self-doubt lives.",
    context:  "Chiron conjunct Sun: healing and identity are at the same point — the relationship has a quality of bringing old self-wounds to the surface, which is uncomfortable and ultimately valuable.",
    _generic: "Chiron and Sun in aspect: old wounds and identity are in dialogue — the relationship carries a healing dimension around how each of you sees yourself.",
  },
  "chiron-moon": {
    harmony:  "Chiron trine or sextile Moon: the Chiron person holds space for the Moon person's emotional wounds — old hurts around safety and feeling can gradually soften in the relationship.",
    tension:  "Chiron square or opposite Moon: emotional wounds are activated — the Chiron person may, even inadvertently, touch places where the Moon person carries old pain around feeling safe.",
    context:  "Chiron conjunct Moon: healing and emotional need are at the same point — a relationship that can feel both deeply intimate and, at times, uncomfortably exposing.",
    _generic: "Chiron and Moon in aspect: emotional life and old wounds are in dialogue — the relationship has a gentle healing quality around how each of you handles feeling and vulnerability.",
  },
  "chiron-venus": {
    harmony:  "Chiron trine or sextile Venus: the Chiron person brings a healing quality to how the Venus person relates and loves — old wounds around being valued or desired can gradually ease.",
    tension:  "Chiron square or opposite Venus: old wounds around love and worthiness are activated — what one of you finds beautiful or fair touches the other's tender places around affection.",
    context:  "Chiron conjunct Venus: love and woundedness meet directly — the relationship may feel both deeply tender and occasionally bruising in matters of affection and self-worth.",
    _generic: "Chiron and Venus in aspect: love and old wounds are in dialogue — the relationship has a quality of healing (or re-opening) how each of you experiences affection.",
  },
  "northnode-sun": {
    harmony:  "North Node trine or sextile Sun: the relationship supports the nodal person's growth direction — the Sun person's identity aligns with where the North Node person is meant to be heading.",
    tension:  "North Node square or opposite Sun: there is a fated quality to the friction — the Sun person's identity challenges the nodal person's direction, activating growth through resistance.",
    context:  "North Node conjunct Sun: a feeling of destiny runs through this contact — the Sun person plays a significant role in the nodal person's sense of purpose and direction.",
    _generic: "North Node and Sun in aspect: soul direction and identity are in dialogue — the relationship carries a quality of purpose or fate.",
  },
  "northnode-moon": {
    harmony:  "North Node trine or sextile Moon: emotional attunement flows in the direction of soul growth — the Moon person's way of feeling supports the nodal person's evolving direction.",
    tension:  "North Node square or opposite Moon: a pull between emotional comfort and growth — the Moon person may represent familiar territory the nodal person must leave, or their emotional needs create productive tension.",
    context:  "North Node conjunct Moon: one of the most karmic contacts in synastry — emotional memory and soul direction converge; the relationship often feels fated or deeply significant in both people's inner lives.",
    _generic: "North Node and Moon in aspect: emotional life and soul direction are in conversation — the bond often carries a sense of significance or inevitability.",
  },
  "sun-jupiter": {
    harmony:  "Sun trine or sextile Jupiter: one person's sense of self is genuinely expanded by the other's optimism and vision — an easy, generous contact that tends to make both people feel more capable and hopeful.",
    tension:  "Sun square or opposite Jupiter: identity and expansion are in tension — the Jupiter person's big-picture enthusiasm can feel misaligned with the Sun person's sense of self, sometimes amplifying ego or over-promising.",
    context:  "Sun conjunct Jupiter: the Jupiter person amplifies and expands the Sun person's identity — one of the most straightforwardly uplifting contacts in synastry, though it can tip into excess.",
    _generic: "Sun and Jupiter in aspect: identity and expansion are linked — one person's optimism and vision intersects with the other's sense of self.",
  },
  "mercury-venus": {
    harmony:  "Mercury trine or sextile Venus: thought and affection are in natural dialogue — conversations feel warm and aesthetically pleasing, and you find each other's minds genuinely attractive.",
    tension:  "Mercury square or opposite Venus: how one of you thinks and communicates doesn't quite match what the other finds beautiful or fair — low-grade friction in how you each express care or ideas.",
    context:  "Mercury conjunct Venus: mind and affection meet at a single point — communication is imbued with warmth, and you tend to find each other's ways of expressing things genuinely appealing.",
    _generic: "Mercury and Venus in aspect: thinking and affection are linked — how one of you communicates is in dialogue with the other's sense of beauty and values.",
  },
  "mercury-mars": {
    harmony:  "Mercury trine or sextile Mars: thought and drive complement each other well — ideas flow into action, and debate between you tends to be energizing rather than escalating.",
    tension:  "Mercury square or opposite Mars: how one of you thinks and communicates clashes with the other's drive and directness — verbal friction is real, and debates can tip into argument more easily than either intends.",
    context:  "Mercury conjunct Mars: thought and drive operate at the same point — communication is direct, sometimes bluntly so, with a quality of immediate action following words.",
    _generic: "Mercury and Mars in aspect: how one of you thinks and communicates is directly linked to the other's drive — the relationship has an edge of mental activation.",
  },
  "mars-saturn": {
    harmony:  "Mars trine or sextile Saturn: drive and discipline complement each other — the Mars person's initiative is channeled productively by the Saturn person's patience and structure.",
    tension:  "Mars square or opposite Saturn: desire and restraint are in friction — the Saturn person's caution can feel frustrating to the Mars person's need to act; the Mars person's impulsiveness can alarm the Saturn person.",
    context:  "Mars conjunct Saturn: action and responsibility meet directly — shared projects can be disciplined and effective, but the combination can also feel heavy when Mars needs to move and Saturn needs to pause.",
    _generic: "Mars and Saturn in aspect: drive and discipline are in conversation — how you each act and how you each structure effort are tightly linked.",
  },
  "jupiter-saturn": {
    harmony:  "Jupiter trine or sextile Saturn: expansion and discipline work together — one of you brings optimism and possibility, the other brings realism and staying power, creating a productive and grounded partnership.",
    tension:  "Jupiter square or opposite Saturn: growth and caution are in friction — the Jupiter person's desire to expand can clash with the Saturn person's need for limits, creating tension around risk, commitment, and pace.",
    context:  "Jupiter conjunct Saturn: optimism and responsibility meet at the same point — the relationship carries a quality of serious ambition, where growth is always weighed against what is sustainable.",
    _generic: "Jupiter and Saturn in aspect: expansion and structure are in dialogue — how you each approach possibility and commitment shapes the relationship's long-term arc.",
  },
};

// ─── Additional explicit pair entries for outer-planet / minor-body pairs ───────
// These cover the "tail" aspects (outer planets × outer planets, nodes × planets)
// that previously fell through to the generic template and produced near-identical copy.

const ASPECT_READINGS_EXTRA: Record<string, PairEntry> = {
  "saturn-uranus": {
    harmony:  "Saturn trine or sextile Uranus across your charts: structure and disruption find a productive meeting point — one person's need for order is loosened just enough by the other's originality, without either extreme winning.",
    tension:  "Saturn square or opposite Uranus: tradition and revolution in friction — one person's impulse toward stability is constantly challenged by the other's drive to break free, creating a push-pull that can be creatively generative or chronically destabilizing.",
    context:  "Saturn conjunct Uranus: discipline and originality coexist here — one person's need to build lasting structures meets the other's urge to reinvent, producing an unusual blend of patience and radical change.",
    _generic: "Saturn and Uranus in aspect across your charts: themes of structure versus freedom, discipline versus originality, run through your connection — how each of you handles authority and change is directly in play.",
  },
  "saturn-neptune": {
    harmony:  "Saturn trine or sextile Neptune: boundaries and dissolution find a workable balance — one person's realism gives productive form to the other's idealism, and spiritual or creative endeavours gain practical grounding.",
    tension:  "Saturn square or opposite Neptune: reality and fantasy are in friction — one person's need for clear limits can feel deflating to the other's dreamy or spiritual orientation, and the Neptune person's fluidity may frustrate the Saturn person's demand for definition.",
    context:  "Saturn conjunct Neptune: duty and dream occupy the same point — the relationship has a quality of bringing ideals down to earth, which can be constructive or quietly disenchanting.",
    _generic: "Saturn and Neptune in aspect: the relationship navigates the territory between the practical and the imagined — structure and vision, boundary and dissolution, are recurring themes.",
  },
  "saturn-pluto": {
    harmony:  "Saturn trine or sextile Pluto: discipline and transformation work in concert — one person's staying power supports the other's drive to go deep and remake things, creating a slow but powerful force between you.",
    tension:  "Saturn square or opposite Pluto: control and transformation in direct friction — power dynamics are real here; the relationship can feel like a sustained contest between the need for structure and the drive to dismantle it.",
    context:  "Saturn conjunct Pluto: two heavyweight forces at the same point — the relationship is serious, potentially heavy, and carries a quality of irreversible consequence; endings and commitments both feel weighty.",
    _generic: "Saturn and Pluto in aspect: authority and transformation are in conversation — how each of you handles power, loss, and endurance are recurring themes between you.",
  },
  "uranus-neptune": {
    harmony:  "Uranus trine or sextile Neptune: originality and imagination complement each other — there is a shared quality of visionary thinking between you, where inspiration flows freely into creative or spiritual territory.",
    tension:  "Uranus square or opposite Neptune: disruption and dissolution in friction — one person's erratic originality can unsettle the other's need for a softer, more fluid experience, and neither may feel fully anchored.",
    context:  "Uranus conjunct Neptune: a generational echo — you share a quality of collective idealism and restlessness; in your relationship this manifests as a shared pull toward the unconventional and the inspired.",
    _generic: "Uranus and Neptune in aspect: freedom and idealism are in dialogue — the relationship carries a quality of shared visionary possibility, with an undercurrent of restlessness.",
  },
  "uranus-pluto": {
    harmony:  "Uranus trine or sextile Pluto: revolution and transformation find a productive alignment — change-making between you can be radical and effective, especially on shared causes or reinvention.",
    tension:  "Uranus square or opposite Pluto: sudden disruption and deep transformation in friction — power and freedom battle between your two charts; the relationship may feel periodically explosive or compulsively changeable.",
    context:  "Uranus conjunct Pluto: a generational intensity — the relationship is marked by cycles of radical change; nothing stays static, and transformation is always close to the surface.",
    _generic: "Uranus and Pluto in aspect: freedom and transformation are in conversation — the relationship carries an edge of upheaval and reinvention, which can be exhilarating or relentless.",
  },
  "neptune-pluto": {
    harmony:  "Neptune trine or sextile Pluto: a generation-level harmony — imagination and transformation flow together in your relationship, creating a sense of shared depth and purpose that transcends the everyday.",
    tension:  "Neptune square or opposite Pluto: dissolution and power in friction — the relationship can feel subtly undermining, with one person's fluid idealism colliding with the other's drive for control or depth.",
    context:  "Neptune conjunct Pluto: the deepest generational overlay — a shared quality of spiritual depth and the pull toward transformation and mystery; the relationship has an almost mythic undertow.",
    _generic: "Neptune and Pluto in aspect: imagination and transformation are in dialogue — the relationship carries depth, a sense of fate, and the possibility of profound mutual change.",
  },
  "chiron-mars": {
    harmony:  "Chiron trine or sextile Mars: old wounds around action and desire can heal gently here — one person's drive and initiative helps the other take action in areas where they have historically held back.",
    tension:  "Chiron square or opposite Mars: wounds around drive and assertiveness are activated — the Mars person's directness may, without intending to, touch old hurts about confidence, competitiveness, or the right to act.",
    context:  "Chiron conjunct Mars: healing and action meet directly — the relationship surfaces old wounds around desire and courage, which is uncomfortable and ultimately liberating.",
    _generic: "Chiron and Mars in aspect: healing and drive are in conversation — one person's initiative touches the other's old wounds around action and self-assertion.",
  },
  "chiron-jupiter": {
    harmony:  "Chiron trine or sextile Jupiter: old wounds and the capacity for growth are in productive dialogue — the Jupiter person's optimism helps the Chiron person believe that expansion and healing are genuinely possible.",
    tension:  "Chiron square or opposite Jupiter: growth and woundedness in friction — the Jupiter person's enthusiasm can inadvertently amplify the Chiron person's old hurts, or the Chiron person's caution may constrain the Jupiter person's expansion.",
    context:  "Chiron conjunct Jupiter: healing and optimism at the same point — the relationship has a quality of expanding old wounds into something larger and more meaningful, for better or for transformative challenge.",
    _generic: "Chiron and Jupiter in aspect: woundedness and possibility are in dialogue — how each of you handles growth and old hurts is a recurring theme.",
  },
  "chiron-saturn": {
    harmony:  "Chiron trine or sextile Saturn: old wounds and structure work together — the Saturn person's discipline and reliability provide a stable container in which the Chiron person's healing can unfold over time.",
    tension:  "Chiron square or opposite Saturn: woundedness and restriction in friction — the Saturn person's demands for order can inadvertently re-open old hurts, and the Chiron person's sensitivity may frustrate the Saturn person's need for dependability.",
    context:  "Chiron conjunct Saturn: healing and responsibility at the same point — old wounds often involve authority, duty, or the sense of not being enough; the relationship is a space for slowly working through these.",
    _generic: "Chiron and Saturn in aspect: woundedness and structure are in conversation — old hurts around duty, authority, and endurance surface and, with patience, can heal.",
  },
  "chiron-uranus": {
    harmony:  "Chiron trine or sextile Uranus: healing and liberation are in easy dialogue — one person's originality helps the other break free of old patterns of pain, making room for a less wounded way of being.",
    tension:  "Chiron square or opposite Uranus: disruption and old wounds in friction — the Uranus person's unpredictability can re-open the Chiron person's old hurts, especially around rejection or not belonging.",
    context:  "Chiron conjunct Uranus: freedom and healing at the same point — the relationship has a quality of radical awakening around old wounds, which can feel liberating or destabilizing.",
    _generic: "Chiron and Uranus in aspect: healing and liberation are in conversation — one person's drive for freedom touches the other's old wounds around belonging and originality.",
  },
  "chiron-neptune": {
    harmony:  "Chiron trine or sextile Neptune: healing and imagination flow together — the Neptune person's compassion and spiritual sensitivity help the Chiron person access a deeper, more forgiving relationship with their own wounds.",
    tension:  "Chiron square or opposite Neptune: woundedness and dissolution in friction — the Neptune person may idealize the Chiron person's pain or project their own, and the Chiron person may feel misunderstood or subtly erased.",
    context:  "Chiron conjunct Neptune: healing and transcendence at the same point — the relationship carries a quality of spiritual woundedness and the possibility of redemption through compassion.",
    _generic: "Chiron and Neptune in aspect: healing and idealism are in conversation — one person's wounds meet the other's compassion, creating a spiritually resonant dynamic.",
  },
  "chiron-pluto": {
    harmony:  "Chiron trine or sextile Pluto: deep healing and transformation flow together — the Pluto person's capacity for radical change helps the Chiron person break old wound patterns at a fundamental level.",
    tension:  "Chiron square or opposite Pluto: woundedness and power in friction — the Pluto person's intensity may feel overwhelming to the Chiron person, potentially re-triggering old wounds rather than healing them.",
    context:  "Chiron conjunct Pluto: healing and transformation at the same point — the relationship reaches into the deepest layers of old pain and offers the possibility of permanent release, though the process is rarely gentle.",
    _generic: "Chiron and Pluto in aspect: woundedness and transformation are in conversation — the relationship reaches into deep places, making healing possible at a fundamental level.",
  },
  "northnode-venus": {
    harmony:  "North Node trine or sextile Venus: the path of growth runs through love and beauty — affection and values align with where the North Node person is meant to be heading.",
    tension:  "North Node square or opposite Venus: love and soul direction in friction — what is comfortable and affectionate for the Venus person may not support the nodal person's growth, creating a tension between pleasure and purpose.",
    context:  "North Node conjunct Venus: love and fate at the same point — the relationship has a quality of soul-level attraction; one person's presence pulls the other toward who they are becoming.",
    _generic: "North Node and Venus in aspect: soul direction and affection are in conversation — the relationship carries a quality of meaningful purpose around love and values.",
  },
  "northnode-mars": {
    harmony:  "North Node trine or sextile Mars: drive and soul direction are in easy alignment — the Mars person's initiative supports the nodal person's growth, and taking action feels purposeful.",
    tension:  "North Node square or opposite Mars: drive and soul direction in friction — the Mars person's assertiveness may push the nodal person off their path, or the nodal person's growth direction may frustrate the Mars person's more immediate drives.",
    context:  "North Node conjunct Mars: action and fate at the same point — the relationship activates the nodal person's capacity for decisive action in their growth direction.",
    _generic: "North Node and Mars in aspect: soul direction and drive are in conversation — one person's initiative connects to the other's sense of where they are meant to be heading.",
  },
  "northnode-mercury": {
    harmony:  "North Node trine or sextile Mercury: communication and soul direction flow together — how the Mercury person thinks and speaks genuinely supports the nodal person's growth.",
    tension:  "North Node square or opposite Mercury: how one of you communicates runs across the other's soul direction — the Mercury person's thinking style may feel more comfortable than growth-oriented to the nodal person.",
    context:  "North Node conjunct Mercury: mind and fate at the same point — conversations carry a quality of pointing toward the nodal person's next chapter.",
    _generic: "North Node and Mercury in aspect: soul direction and communication are in conversation — how one of you thinks and speaks connects to the other's sense of purpose.",
  },
  "northnode-jupiter": {
    harmony:  "North Node trine or sextile Jupiter: growth and expansion flow in the same direction — the Jupiter person's optimism and vision support the nodal person's evolution.",
    tension:  "North Node square or opposite Jupiter: expansion and soul direction in friction — the Jupiter person's big-picture energy may pull the nodal person off course or amplify their existing comfort zone.",
    context:  "North Node conjunct Jupiter: possibility and fate at the same point — the relationship has a buoyant, purposeful quality where the Jupiter person's generosity aligns with the nodal person's growth.",
    _generic: "North Node and Jupiter in aspect: soul direction and expansion are in conversation — one person's optimism connects to the other's sense of meaningful growth.",
  },
  "northnode-saturn": {
    harmony:  "North Node trine or sextile Saturn: structure and soul direction work well together — the Saturn person's discipline and patience support the nodal person's evolution in a lasting way.",
    tension:  "North Node square or opposite Saturn: discipline and soul direction in friction — the Saturn person's demands for structure can either ground the nodal person's growth or feel like an obstacle to it.",
    context:  "North Node conjunct Saturn: duty and fate at the same point — the relationship has a serious, purposeful quality where commitment and growth direction are tightly linked.",
    _generic: "North Node and Saturn in aspect: soul direction and structure are in conversation — themes of discipline, commitment, and long-term growth run through the bond.",
  },
  "southnode-sun": {
    harmony:  "South Node trine or sextile Sun: a familiar resonance between you — the Sun person's identity feels deeply comfortable to the nodal person, connecting to past patterns of ease.",
    tension:  "South Node square or opposite Sun: the Sun person's identity activates the nodal person's old comfort zone in a challenging way — the relationship may replay familiar patterns rather than opening new territory.",
    context:  "South Node conjunct Sun: a past-life feeling — the Sun person's presence is deeply familiar to the nodal person, in a way that feels both comforting and difficult to leave behind.",
    _generic: "South Node and Sun in aspect: familiarity and identity are in dialogue — the relationship may feel fated in a way that connects to the past as much as the future.",
  },
  "southnode-moon": {
    harmony:  "South Node trine or sextile Moon: emotional familiarity runs deep — the Moon person's feelings resonate with the nodal person's old patterns of emotional safety.",
    tension:  "South Node square or opposite Moon: old emotional patterns are activated — the Moon person's way of feeling connects to the nodal person's past in ways that may feel comforting or regressive.",
    context:  "South Node conjunct Moon: one of the most past-life feeling contacts — emotional memory and familiarity run very deep; both people may sense a history between them from the first meeting.",
    _generic: "South Node and Moon in aspect: emotional familiarity and past patterns are in conversation — old emotional dynamics can resurface in this relationship.",
  },
  "southnode-venus": {
    harmony:  "South Node trine or sextile Venus: love and familiar values feel natural together — the Venus person's affection resonates with old patterns of what felt beautiful and safe.",
    tension:  "South Node square or opposite Venus: old values and comfort-seeking are activated by the Venus person's presence — the relationship may replay past relational patterns more than opening new ones.",
    context:  "South Node conjunct Venus: an old familiarity around love — affection here feels immediately natural, which is both lovely and potentially stagnating if neither person pushes toward new territory.",
    _generic: "South Node and Venus in aspect: familiarity and affection are in conversation — old relational patterns resurface, with a quality of comfortable recognition.",
  },
  "lilith-sun": {
    harmony:  "Lilith trine or sextile Sun: the raw, untamed quality of one person finds easy expression in the other's identity — an edgy, magnetic contact that feels liberating without destabilizing.",
    tension:  "Lilith square or opposite Sun: the primal, rebellious Lilith energy runs up against the Sun person's core identity — a push-pull between authentic self-expression and a wilder, more disruptive force.",
    context:  "Lilith conjunct Sun: the wild and the essential collide — one person's untamed quality meets the other's core sense of self, creating an intensity that is magnetic and at times unsettling.",
    _generic: "Lilith and Sun in aspect: the wild and the essential are in conversation — raw instinct and identity are in play between you.",
  },
  "lilith-moon": {
    harmony:  "Lilith trine or sextile Moon: primal instinct and emotional life find a productive meeting — the Lilith person's raw energy helps the Moon person access deeper, less conditioned emotional responses.",
    tension:  "Lilith square or opposite Moon: untamed energy and emotional need in friction — the Lilith person's refusal to be contained can feel emotionally destabilizing to the Moon person.",
    context:  "Lilith conjunct Moon: primal instinct and emotional memory at the same point — the relationship reaches into raw, unconditioned feeling that can be deeply liberating or psychically intense.",
    _generic: "Lilith and Moon in aspect: the primal and the emotional are in conversation — raw instinct meets the emotional world, with a quality of intensity and depth.",
  },
  "lilith-venus": {
    harmony:  "Lilith trine or sextile Venus: raw desire and affection flow together — the Lilith person's magnetic energy enhances the Venus person's sense of attraction, adding an edge to what might otherwise be comfortable love.",
    tension:  "Lilith square or opposite Venus: raw instinct and affection in friction — what the Lilith person embodies as wild and untamed may feel at odds with the Venus person's need for harmonious, valued connection.",
    context:  "Lilith conjunct Venus: desire and instinct at the same point — the relationship has a raw, magnetic quality where beauty and wildness coexist in a way that is hard to look away from.",
    _generic: "Lilith and Venus in aspect: wild instinct and affection are in conversation — the relationship carries a magnetic, slightly edgy quality around desire and beauty.",
  },
  "lilith-mars": {
    harmony:  "Lilith trine or sextile Mars: raw, untamed instinct and drive are in natural alignment — an unusually direct and magnetic contact where desire and action feel unmediated.",
    tension:  "Lilith square or opposite Mars: primal forces in friction — both Lilith and Mars are raw, driving energies, and in tension they can create power struggles, impulsive behaviour, or charged encounters.",
    context:  "Lilith conjunct Mars: two primal forces at the same point — the contact is intensely activating, with a magnetic, sometimes volatile quality that is hard to ignore.",
    _generic: "Lilith and Mars in aspect: raw instinct and drive are in direct conversation — the relationship carries an edge of intensity and unmediated desire.",
  },
  "lilith-saturn": {
    harmony:  "Lilith trine or sextile Saturn: the wild and the structured find a workable relationship — the Saturn person's discipline gives productive form to the Lilith person's untamed quality, without entirely taming it.",
    tension:  "Lilith square or opposite Saturn: freedom and structure in friction — the Lilith person's refusal to be contained runs directly into the Saturn person's need for order and reliability.",
    context:  "Lilith conjunct Saturn: the primal and the responsible at the same point — the relationship has a quality of testing what can and cannot be controlled, which can be deeply clarifying.",
    _generic: "Lilith and Saturn in aspect: the wild and the structured are in conversation — how each of you handles boundaries and instinct is a recurring theme.",
  },
};

// Merge extra entries into the main dataset (they do not overlap)
Object.assign(ASPECT_READINGS, ASPECT_READINGS_EXTRA);

// ─── Generic fallbacks by aspect type ────────────────────────────────────────
// These are templates; the lookup function interpolates BOTH body names AND person
// names so that (i) different body pairs produce distinct strings, and (ii) reversed
// pairs produce directional (non-identical) text.

type AspectGenericTemplate = Record<AspectNature, string>;

// {{A}} = body A label (e.g. "Uranus"), {{B}} = body B label (e.g. "Pluto")
// {{nameA}} = Person A's name, {{nameB}} = Person B's name
const GENERIC_BY_ASPECT: Record<AspectType, AspectGenericTemplate> = {
  conjunction: {
    harmony:  "{{nameA}}'s {{A}} conjunct {{nameB}}'s {{B}}: {{A}} and {{B}} share the same sky point, merging their themes into a single blended experience — what one of you expresses through {{A}} is inseparable from the other's {{B}}.",
    tension:  "{{nameA}}'s {{A}} conjunct {{nameB}}'s {{B}}: these two forces occupy the same point, making their interaction inescapable — the qualities of {{A}} and {{B}} intensify each other and are difficult to keep in separate channels.",
    context:  "{{nameA}}'s {{A}} conjunct {{nameB}}'s {{B}}: {{A}} and {{B}} operate together throughout this relationship, linking the areas of life each governs into a shared dynamic that runs beneath the surface.",
  },
  sextile: {
    harmony:  "{{nameA}}'s {{A}} sextile {{nameB}}'s {{B}}: {{A}} and {{B}} form a cooperative link — the areas of life these bodies govern support each other when either of you chooses to engage them, with a low-effort, reliable quality.",
    tension:  "{{nameA}}'s {{A}} sextile {{nameB}}'s {{B}}: a broadly supportive angle between {{A}} and {{B}}, though some underlying friction is present — the cooperation is real but benefits from occasional conscious attention.",
    context:  "{{nameA}}'s {{A}} sextile {{nameB}}'s {{B}}: a low-key connection between {{A}} and {{B}} — not dramatic, but quietly useful when these themes arise in the relationship.",
  },
  square: {
    harmony:  "{{nameA}}'s {{A}} square {{nameB}}'s {{B}}: {{A}} and {{B}} generate productive friction between you — the tension between their themes creates energy that, channeled consciously, pushes both of you forward.",
    tension:  "{{nameA}}'s {{A}} square {{nameB}}'s {{B}}: a recurring friction between the areas {{A}} and {{B}} govern — neither of you can simply ignore this dynamic; working through it is how the relationship develops.",
    context:  "{{nameA}}'s {{A}} square {{nameB}}'s {{B}}: {{A}} and {{B}} require ongoing negotiation between you — the challenge these themes present is real, and so is the growth that comes from engaging it.",
  },
  trine: {
    harmony:  "{{nameA}}'s {{A}} trine {{nameB}}'s {{B}}: {{A}} and {{B}} flow easily between you — the areas of life these bodies govern support each other naturally, and the themes of {{A}} and {{B}} tend to work themselves out without much friction.",
    tension:  "{{nameA}}'s {{A}} trine {{nameB}}'s {{B}}: a broadly easy link between {{A}} and {{B}}, though the ease here carries subtle differences in how you each approach these themes — worth exploring rather than taking for granted.",
    context:  "{{nameA}}'s {{A}} trine {{nameB}}'s {{B}}: {{A}} and {{B}} are in natural alignment — the themes they govern between you flow with minimal resistance and a quality of quiet mutual reinforcement.",
  },
  opposition: {
    harmony:  "{{nameA}}'s {{A}} opposite {{nameB}}'s {{B}}: {{A}} and {{B}} form a complementary polarity — what one of you brings through {{A}}, the other supplies the balancing perspective through {{B}}, creating a useful counterweight.",
    tension:  "{{nameA}}'s {{A}} opposite {{nameB}}'s {{B}}: a polarity tension between {{A}} and {{B}} — you may find yourselves pulling in opposite directions in these areas, which can be generative or exhausting depending on how it's navigated.",
    context:  "{{nameA}}'s {{A}} opposite {{nameB}}'s {{B}}: {{A}} and {{B}} face each other across the zodiac arc — you each see in the other a mirror of what you bring (or lack) in these themes, which keeps both of you oriented around a shared axis.",
  },
};

// ─── Lookup function ──────────────────────────────────────────────────────────

/** Normalise a pair key to always put the alphabetically-smaller key first */
function normalisePairKey(keyA: string, keyB: string): string {
  return [keyA, keyB].sort().join("-");
}

/** Capitalise first letter */
function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Convert a body key like "northnode" → "North Node", "lilith" → "Lilith" */
function bodyLabel(key: string): string {
  const labels: Record<string, string> = {
    sun: "Sun", moon: "Moon", mercury: "Mercury", venus: "Venus", mars: "Mars",
    jupiter: "Jupiter", saturn: "Saturn", uranus: "Uranus", neptune: "Neptune",
    pluto: "Pluto", chiron: "Chiron", northnode: "North Node", southnode: "South Node",
    lilith: "Lilith",
  };
  return labels[key] ?? cap(key);
}

/**
 * Map from a planet label (as it appears in blurbs) back to a body key.
 * Used by the name-interpolation normalizer.
 */
const LABEL_TO_KEY: Record<string, string> = {
  "Sun": "sun", "Moon": "moon", "Mercury": "mercury", "Venus": "venus",
  "Mars": "mars", "Jupiter": "jupiter", "Saturn": "saturn", "Uranus": "uranus",
  "Neptune": "neptune", "Pluto": "pluto", "Chiron": "chiron",
  "North Node": "northnode", "South Node": "southnode", "Lilith": "lilith",
};

/**
 * Try to look up a pair entry; also return whether the keys were swapped
 * to find the entry (flipped=true means the blurb was authored with keyB first).
 */
function lookupPairEntryWithFlip(
  keyA: string,
  keyB: string
): { entry: PairEntry; flipped: boolean } | null {
  // Try exact order first
  const k2 = `${keyA}-${keyB}`;
  if (ASPECT_READINGS[k2]) return { entry: ASPECT_READINGS[k2], flipped: false };

  // Try reversed order
  const k3 = `${keyB}-${keyA}`;
  if (ASPECT_READINGS[k3]) return { entry: ASPECT_READINGS[k3], flipped: true };

  // Try alphabetically normalised key — determine flip from sort order
  const sorted = [keyA, keyB].sort();
  const k1 = sorted.join("-");
  if (ASPECT_READINGS[k1]) {
    // flipped = the sorted order differs from [keyA, keyB] order
    const flipped = sorted[0] !== keyA;
    return { entry: ASPECT_READINGS[k1], flipped };
  }

  return null;
}

/**
 * Post-process a blurb to substitute "the X person" with "{name}'s X",
 * making each body's owner explicit and ensuring reversed pairs produce
 * distinctly-worded text.
 *
 * keyA / nameA = the body belonging to person A (caller's first arg).
 * keyB / nameB = the body belonging to person B (caller's second arg).
 *
 * The ownership rule is simple: whoever has the key matching the planet label
 * owns that planet. "the Saturn person" = nameA if keyA=saturn, nameB if keyB=saturn.
 * The blurb finding/flip logic does NOT change this — only the call site's keyA/keyB
 * determine ownership.
 *
 * To ensure reversed pairs (A.sun+B.saturn vs A.saturn+B.sun) produce different text,
 * we also prepend a directional header "{nameA}'s {labelA} — {nameB}'s {labelB}:"
 * when neither name appears after substitution.
 */
function nameBindBlurb(
  blurb: string,
  keyA: string,
  keyB: string,
  nameA: string,
  nameB: string,
): string {
  const labelA = bodyLabel(keyA);
  const labelB = bodyLabel(keyB);

  // Determine which name owns a given planet label.
  // Ownership = whoever's key matches; if the same body is on both sides (symmetric pair),
  // prefer nameA for keyA.
  const ownerOf = (label: string): string => {
    const key = LABEL_TO_KEY[label];
    if (!key) {
      // Multi-word lookup for "North Node" / "South Node"
      const nk = label === "North Node" ? "northnode" : label === "South Node" ? "southnode" : null;
      if (nk) {
        if (nk === keyA) return nameA;
        if (nk === keyB) return nameB;
      }
      return nameA; // fallback
    }
    if (key === keyA) return nameA;
    if (key === keyB) return nameB;
    return nameA; // fallback
  };

  // Owner of the nodal body (north/south node holder)
  const nodalOwner = (keyA === "northnode" || keyA === "southnode") ? nameA : nameB;

  // Replace "the [Planet] person" → "{owner}'s [Planet]"
  // Handle "the nodal person" FIRST (before the generic /the ([A-Z][a-z]+) person/ which
  // inadvertently catches it because the gi flag makes [A-Z] match lowercase 'n', causing
  // the erroneous "Nodal's" capitalisation). "the nodal person" refers to whoever holds
  // the node (north or south) — replace with "{name}'s North Node" or "{name}'s South Node".
  const nodalLabel = (keyA === "southnode" || keyB === "southnode") ? "South Node" : "North Node";
  let result = blurb
    .replace(/\bthe nodal person\b/gi, () => `${nodalOwner}'s ${nodalLabel}`)
    .replace(/\bthe (North Node|South Node) person\b/gi, (_, planet) => `${ownerOf(planet)}'s ${planet}`)
    .replace(/\bthe ([A-Z][a-z]+) person\b/gi, (_, planet) => `${ownerOf(planet)}'s ${planet.charAt(0).toUpperCase() + planet.slice(1)}`);

  // If neither name appears (e.g. blurb only says "you" / "the relationship"),
  // make the body sentence itself person-specific so reversed pairs are not byte-identical.
  if (!result.includes(nameA) && !result.includes(nameB)) {
    // For conjunction blurbs: replace the leading "X conjunct Y:" intro (either body order,
    // since the pair lookup can return either orientation) with a person-named phrase so
    // each direction of a symmetric conjunction reads uniquely and names both people.
    // Matches: "Jupiter conjunct Venus:" or "Venus conjunct Jupiter:" (either order)
    const conjunctPrefixRe = /^([A-Za-z ]+) conjunct ([A-Za-z ]+):/;
    const m = conjunctPrefixRe.exec(result);
    // Only use the inline-name injection for DIFFERENT bodies (non-symmetric pairs).
    // Symmetric pairs (sun-sun, moon-moon, etc.) can't resolve two different owners from
    // keyA/keyB alone, so fall back to the directional header for those.
    const blurbBodyFirst  = m ? m[1].trim() : "";
    const blurbBodySecond = m ? m[2].trim() : "";
    const firstKey  = blurbBodyFirst.toLowerCase().replace(/ /g, "");
    const secondKey = blurbBodySecond.toLowerCase().replace(/ /g, "");
    if (m && firstKey !== secondKey) {
      // Determine which body in the blurb prefix maps to person A vs person B.
      const firstOwner  = firstKey === keyA ? nameA : nameB;
      const secondOwner = secondKey === keyA ? nameA : nameB;
      result = result.replace(
        conjunctPrefixRe,
        `${firstOwner}'s ${blurbBodyFirst} sits on ${secondOwner}'s ${blurbBodySecond} —`
      );
    } else {
      // Generic fallback: prepend directional header
      result = `${nameA}'s ${labelA} — ${nameB}'s ${labelB}: ${result}`;
    }
  }

  return result;
}

export function getSynastryAspectReading(
  keyA: string,
  keyB: string,
  aspectType: AspectType,
  nature: AspectNature,
  nameA?: string,
  nameB?: string
): string {
  const pA = nameA ?? "Person A";
  const pB = nameB ?? "Person B";

  const found = lookupPairEntryWithFlip(keyA, keyB);
  if (found) {
    const blurb = found.entry[nature] ?? found.entry._generic;
    if (blurb) {
      return nameBindBlurb(blurb, keyA, keyB, pA, pB);
    }
  }
  // Fall back to generic by aspect type + nature — interpolate body names AND person names
  // so (i) different body pairs produce distinct strings and (ii) reversed pairs read differently.
  const template = GENERIC_BY_ASPECT[aspectType][nature];
  return template
    .replace(/\{\{A\}\}/g, bodyLabel(keyA))
    .replace(/\{\{B\}\}/g, bodyLabel(keyB))
    .replace(/\{\{nameA\}\}/g, pA)
    .replace(/\{\{nameB\}\}/g, pB);
}

// ─── House overlay readings ────────────────────────────────────────────────────

// Keyed by body key + house number. "_generic" fallback per house.
// "BinA" and "AinB" produce slight phrasing variation via the caller.

type OverlayBodyMap = Record<number | string, string>;

const OVERLAY_READINGS: Record<string, OverlayBodyMap> = {
  sun: {
    1:  "Your Sun falls in their First House — you activate their sense of self and personal presence. They feel more vividly themselves around you.",
    2:  "Your Sun in their Second House: you illuminate what they value and can help them see their own worth more clearly.",
    3:  "Your Sun in their Third House brings vitality to their communication and learning — conversations with you feel more alive.",
    4:  "Your Sun in their Fourth House touches their private world — you feel familiar to them at a foundational level, almost family-like.",
    5:  "Your Sun in their Fifth House lights up their creativity and joy — you encourage their playful, expressive side simply by being present.",
    6:  "Your Sun in their Sixth House: your energy motivates their day-to-day routines and work ethic; you can inspire better habits in them.",
    7:  "Your Sun falls in their Seventh House — a classic partnership placement. They see you as an ideal partner, a mirror of qualities they seek in close relationships.",
    8:  "Your Sun in their Eighth House creates intensity and depth — your presence triggers transformation in them, for better or worse.",
    9:  "Your Sun in their Ninth House broadens their horizons — being with you expands their beliefs and sense of what is possible.",
    10: "Your Sun in their Tenth House: your identity intersects with their public life and ambitions — you can play a role in their career or reputation.",
    11: "Your Sun in their Eleventh House energizes their social world and long-term vision — you fit naturally into their network of friends and causes.",
    12: "Your Sun in their Twelfth House reaches their hidden, private self — you may know sides of them that others rarely see.",
  },
  moon: {
    1:  "Your Moon in their First House: your emotional nature is immediately apparent to them and shapes the first impression you make.",
    2:  "Your Moon in their Second House: your feelings are tied to their sense of material security — you nurture their values and self-worth.",
    3:  "Your Moon in their Third House: emotionally you resonate through words — conversations with you feel safe and emotionally rich to them.",
    4:  "Your Moon in their Fourth House is a deeply domestic placement — you feel like home to them, and they feel safe letting their guard down around you.",
    5:  "Your Moon in their Fifth House: your feelings flow into their creative world and playfulness — a warm, nurturing energy around fun and romance.",
    6:  "Your Moon in their Sixth House: you nurture their daily life and health routines, often intuitively understanding what they need to function well.",
    7:  "Your Moon in their Seventh House: your emotional nature is central to the partnership — they feel emotionally invested in the relationship through your presence.",
    8:  "Your Moon in their Eighth House stirs their depths — your emotions reach into their most private self, which is both intimate and occasionally unsettling.",
    9:  "Your Moon in their Ninth House: emotional security for them is linked to belief and freedom — you may feel like a companion for their wider journey.",
    10: "Your Moon in their Tenth House: your emotional nature touches their public life — you may influence their professional reputation or how they are perceived.",
    11: "Your Moon in their Eleventh House: you feel like a trusted ally in their social world — emotionally, you belong in their circle of chosen community.",
    12: "Your Moon in their Twelfth House reaches their unconscious — a subtle, deep connection that often operates below the surface of daily life.",
  },
  mercury: {
    1:  "Your Mercury in their First House: you articulate things about their identity that they recognize immediately. Conversations start from the self.",
    2:  "Your Mercury in their Second House: how you think and talk connects to what they value — you may help them articulate their priorities.",
    3:  "Your Mercury in their Third House is one of the best mental-compatibility placements — conversations flow and you both feel understood.",
    4:  "Your Mercury in their Fourth House: dialogue goes deep into family, history, and private life — you help them process their roots.",
    5:  "Your Mercury in their Fifth House: your mind enlivens their creative and playful side — you come up with ideas they find genuinely fun.",
    6:  "Your Mercury in their Sixth House: your communication helps organize their daily life — you speak practically and usefully about what needs doing.",
    7:  "Your Mercury in their Seventh House: how you think and talk shapes the partnership dynamic — negotiation and dialogue are central to your bond.",
    8:  "Your Mercury in their Eighth House: you help them give language to deep or taboo subjects — conversations go to places they rarely go with others.",
    9:  "Your Mercury in their Ninth House: your mind broadens their philosophical or educational world — you trade ideas that expand how they see things.",
    10: "Your Mercury in their Tenth House: your words connect to their career or public life — you may play a role in how they communicate professionally.",
    11: "Your Mercury in their Eleventh House: you connect mentally to their social world and ideals — shared intellectual interests draw you into their friend group.",
    12: "Your Mercury in their Twelfth House: you speak to parts of them that rarely have a voice — conversations touch areas they usually keep private.",
  },
  venus: {
    1:  "Your Venus in their First House: you find them immediately attractive, and they sense it. Your presence makes them feel seen as beautiful or appealing.",
    2:  "Your Venus in their Second House: you appreciate what they value and own — a gentle affirming energy around their sense of worth and resources.",
    3:  "Your Venus in their Third House: your aesthetic sense enlivens their communication — conversations feel warm, pleasant, and enjoyable.",
    4:  "Your Venus in their Fourth House: you bring beauty and warmth into their private world. The home you share (literally or symbolically) matters to both of you.",
    5:  "Your Venus in their Fifth House is a classic romantic placement — you bring love, creativity, and delight into their world of joy and self-expression.",
    6:  "Your Venus in their Sixth House: you bring pleasure into their daily routines — small acts of beauty or care make their working life feel more humane.",
    7:  "Your Venus in their Seventh House is perhaps the most classic partnership overlay — they see you as exactly the kind of person they hope to commit to.",
    8:  "Your Venus in their Eighth House: attraction here runs deep and slightly obsessive — both of you feel the pull of something below the surface.",
    9:  "Your Venus in their Ninth House: you represent beauty and love across a wider horizon for them — travel, ideas, or cultural exploration feel enhanced by your presence.",
    10: "Your Venus in their Tenth House: your presence connects to their public life — you may be seen as a partner in their professional or social reputation.",
    11: "Your Venus in their Eleventh House: you fit naturally into their social circle and feel like a genuine ally in their wider community and causes.",
    12: "Your Venus in their Twelfth House: your affection reaches the parts of them they rarely show — a private, quietly tender dimension to the bond.",
  },
  mars: {
    1:  "Your Mars in their First House: your presence energizes their self-assertion — they feel more driven or physically activated when you are around.",
    2:  "Your Mars in their Second House: you motivate them to pursue what they value — your drive can propel them toward financial or material goals.",
    3:  "Your Mars in their Third House: your energy sharpens their communication — debates and direct conversations come easily, though so can verbal friction.",
    4:  "Your Mars in their Fourth House: your drive enters their private world — activating energy at home can be motivating or occasionally destabilizing.",
    5:  "Your Mars in their Fifth House: your desire ignites their creative and romantic side — chemistry is real and the connection is physically activating.",
    6:  "Your Mars in their Sixth House: you motivate their work ethic and daily habits — you push them toward action in the areas of health and service.",
    7:  "Your Mars in their Seventh House: you bring direct, assertive energy into the partnership — can be exciting or contentious, depending on the day.",
    8:  "Your Mars in their Eighth House creates intense, sometimes compulsive energy around deep bonding, shared power, and transformation.",
    9:  "Your Mars in their Ninth House: your drive pushes their philosophical and exploratory side — you motivate them to pursue ideas and adventures.",
    10: "Your Mars in their Tenth House: you energize their ambitions — your drive connects directly to their career and public achievements.",
    11: "Your Mars in their Eleventh House: your initiative activates their social world and group pursuits — you are a driver in their wider network.",
    12: "Your Mars in their Twelfth House: your drive operates in subtle or hidden ways in their psyche — can feel inspiring or confusing depending on awareness.",
  },
  jupiter: {
    1:  "Your Jupiter in their First House: you make them feel expansive and capable — a genuinely buoyant influence on their self-image.",
    2:  "Your Jupiter in their Second House: you attract abundance into their material world, or at least make them feel more optimistic about it.",
    3:  "Your Jupiter in their Third House: you expand how they think and communicate — conversations are enriching and ideas feel larger in scope.",
    4:  "Your Jupiter in their Fourth House: you bring warmth and optimism into their private world and family life — a generous domestic presence.",
    5:  "Your Jupiter in their Fifth House: joy, creativity, and romance expand around your bond — this is a pleasurable and generative connection.",
    6:  "Your Jupiter in their Sixth House: you encourage better habits and more humane working conditions — a positive influence on their daily routines.",
    7:  "Your Jupiter in their Seventh House: you represent growth and opportunity through the relationship — one of the most positive partnership placements.",
    8:  "Your Jupiter in their Eighth House: shared resources and transformative experiences may bring genuine fortune or expanded understanding of depth.",
    9:  "Your Jupiter in their Ninth House is one of the most resonant overlays — shared beliefs, travel, or philosophical exploration are genuinely expansive.",
    10: "Your Jupiter in their Tenth House: you broaden their career outlook and public standing — a beneficial influence on their reputation and ambitions.",
    11: "Your Jupiter in their Eleventh House: you are a generous presence in their social world — bringing optimism and opportunity into their community.",
    12: "Your Jupiter in their Twelfth House: you offer quiet grace to their inner life — a spiritually supportive, subtly fortunate overlay.",
  },
  saturn: {
    1:  "Your Saturn in their First House: your presence adds weight and seriousness to how they present themselves — they may feel more careful or structured around you.",
    2:  "Your Saturn in their Second House: you bring discipline to their material world — can help build lasting security or feel financially restrictive.",
    3:  "Your Saturn in their Third House: your communication style adds care and precision to theirs — or can feel critical; choose your words with awareness.",
    4:  "Your Saturn in their Fourth House: you touch their most private world with a sense of duty — can be stabilizing or feel emotionally heavy.",
    5:  "Your Saturn in their Fifth House: you introduce seriousness into their creative and romantic expression — can mature their self-expression or dampen joy.",
    6:  "Your Saturn in their Sixth House: you motivate disciplined work and health habits — a productive overlay when both parties value structure.",
    7:  "Your Saturn in their Seventh House: you carry a serious quality for them in partnership — this overlay often indicates long-term commitment, for better or for challenge.",
    8:  "Your Saturn in their Eighth House: you bring responsibility to shared depths — emotional and financial transformation are handled carefully.",
    9:  "Your Saturn in their Ninth House: you question or ground their beliefs — either helping them build a more disciplined worldview or feeling restrictive.",
    10: "Your Saturn in their Tenth House: you play a role in their career and public life in a serious way — a mentor, authority, or enduring professional influence.",
    11: "Your Saturn in their Eleventh House: you add structure to their social world — helping them commit to a few meaningful friendships rather than many casual ones.",
    12: "Your Saturn in their Twelfth House: you touch the hidden, karmic areas of their life — this overlay often carries a feeling of old obligation or deep purpose.",
  },
  chiron: {
    1:  "Your Chiron in their First House: you touch their sense of identity in a healing or wounding way — old self-doubts may surface, and with them, the chance to release them.",
    4:  "Your Chiron in their Fourth House: you reach into old family wounds — the connection carries a quality of healing old roots.",
    7:  "Your Chiron in their Seventh House: the relationship itself becomes a vehicle for healing how they approach partnerships — old relational wounds are gently exposed.",
    10: "Your Chiron in their Tenth House: you touch their professional wounds or public vulnerabilities — a place where healing through career or recognition can occur.",
    _generic_house: "Your Chiron falls in their {ORD} House — where it lands, old wounds and their healing potential come forward in the relationship.",
  },
  northnode: {
    7:  "Your North Node in their Seventh House: the relationship points you both toward the kind of partnership that supports genuine soul growth.",
    _generic_house: "Your North Node in their {ORD} House carries a quality of karmic direction — the themes of that House feel fated and developmental in this relationship.",
  },
  southnode: {
    _generic_house: "Your South Node in their {ORD} House brings a sense of familiarity or past-life resonance to the themes of that House — a comfortable, if sometimes stagnating, overlay.",
  },
  lilith: {
    _generic_house: "Your Lilith in their {ORD} House introduces a wild, untamed quality to that area of their chart — magnetic and potentially destabilizing in equal measure.",
  },
  uranus: {
    1:  "Your Uranus in their 1st House: your presence electrifies their sense of self — they feel freer, more original, and occasionally unsettled around you.",
    2:  "Your Uranus in their 2nd House: you disrupt their relationship to resources and security, sometimes productively — conventional approaches to money or values feel less fixed.",
    3:  "Your Uranus in their 3rd House: your mind sparks unusual ideas in their everyday communication — conversations take unexpected turns that they often find genuinely stimulating.",
    4:  "Your Uranus in their 4th House: you introduce an unpredictable quality to their sense of home and roots — comfortable domestic patterns may shift in this relationship.",
    5:  "Your Uranus in their 5th House: you bring a fresh, experimental energy to their creative and romantic life — their self-expression feels more inventive around you.",
    6:  "Your Uranus in their 6th House: you disrupt their daily routines in ways that can feel liberating or unsettling — the ordinary rhythms of their work and health are up for renegotiation.",
    7:  "Your Uranus in their 7th House: you represent a quality of freedom and unpredictability in partnership — they find you exciting and occasionally difficult to hold.",
    8:  "Your Uranus in their 8th House: you introduce sudden shifts into their zones of depth and shared resources — transformation here arrives unexpectedly.",
    9:  "Your Uranus in their 9th House: you open up unconventional ideas and philosophies in their world — their beliefs may be challenged and expanded by your presence.",
    10: "Your Uranus in their 10th House: you introduce an element of disruption or originality into their public and professional life — their career path may take unexpected turns around you.",
    11: "Your Uranus in their 11th House: you energize their social world with an unpredictable, innovative quality — groups, causes, and friendships feel more alive and less conventional.",
    12: "Your Uranus in their 12th House: your presence stirs unexpected things in their hidden world — unconscious material surfaces in ways that are both liberating and disorienting.",
    _generic_house: "Your Uranus falls in their {ORD} House — an unpredictable, liberating charge that disrupts comfortable patterns in this area of their chart.",
  },
  neptune: {
    1:  "Your Neptune in their 1st House: you carry a quality of mystery or idealization around how they present themselves — they may feel subtly inspired or subtly confused by your presence.",
    2:  "Your Neptune in their 2nd House: you introduce a dissolving quality around their sense of material security — practical clarity around money and values may soften or slip in this relationship.",
    3:  "Your Neptune in their 3rd House: your presence lends a dreamy, imaginative quality to their everyday communication — conversations can feel inspired or, at times, hard to pin down.",
    4:  "Your Neptune in their 4th House: you touch their sense of home and belonging with a wistful, idealized quality — domestic life together may feel deeply comforting or subtly illusory.",
    5:  "Your Neptune in their 5th House: you heighten the romantic and creative dimension of their life — love, play, and self-expression feel touched by inspiration or enchantment around you.",
    6:  "Your Neptune in their 6th House: you introduce a dissolving quality into their daily work and health routines — what feels productive may shift as priorities soften.",
    7:  "Your Neptune in their 7th House: you represent a quality of idealized partnership for them — they may see what they most wish for in a partner, which is both beautiful and worth examining.",
    8:  "Your Neptune in their 8th House: you bring a spiritualizing quality to their zones of depth and shared resources — intimacy here has a transcendent or illusory dimension.",
    9:  "Your Neptune in their 9th House: you resonate with their world of belief, meaning, and exploration — philosophical and spiritual inspiration flows through the bond.",
    10: "Your Neptune in their 10th House: you lend a visionary or idealizing quality to their public life — their professional image or ambitions may take on a dreamy or elusive character.",
    11: "Your Neptune in their 11th House: you dissolve boundaries in their social world — group connections and shared ideals feel more fluid and inspired, and also less definite.",
    12: "Your Neptune in their 12th House: you meet them in the most hidden, private depths — a subtle, sometimes uncanny resonance that operates below the surface of ordinary life.",
    _generic_house: "Your Neptune falls in their {ORD} House — a softening, idealizing current that dissolves fixed patterns and introduces a quality of inspiration (or illusion) in this area.",
  },
  pluto: {
    1:  "Your Pluto in their 1st House: your presence exerts a powerful, sometimes compulsive pull on how they present themselves — they may feel deeply changed by knowing you.",
    2:  "Your Pluto in their 2nd House: you introduce a transforming force into their relationship to resources and self-worth — old patterns around money and security are up for deep revision.",
    3:  "Your Pluto in their 3rd House: your presence intensifies how they think and communicate — conversations can reach depths they rarely go, with a quality of irreversibility.",
    4:  "Your Pluto in their 4th House: you reach into their most foundational layers — family patterns, old wounds, and the sense of home itself may be transformed by this connection.",
    5:  "Your Pluto in their 5th House: you intensify their creative and romantic life — self-expression and desire feel more compulsive and charged in this relationship.",
    6:  "Your Pluto in their 6th House: you introduce a deep-clearing quality into their work and daily routines — what needs to change at a structural level in their everyday life tends to surface.",
    7:  "Your Pluto in their 7th House: you represent a transformative force in their partnership zone — the relationship itself carries a quality of depth, power, and potential for irreversible change.",
    8:  "Your Pluto in their 8th House: an intense, sometimes fated overlay — shared power, resources, and transformation are focal points, with a quality of going to places neither expected.",
    9:  "Your Pluto in their 9th House: you challenge and potentially transform their beliefs and sense of meaning — philosophical frameworks that seemed fixed may not survive the relationship unchanged.",
    10: "Your Pluto in their 10th House: you bring a powerful influence to their public life and ambitions — career direction and reputation may undergo significant transformation.",
    11: "Your Pluto in their 11th House: you exert a transforming influence on their social world and long-term vision — group loyalties and collective ideals may be deeply revised.",
    12: "Your Pluto in their 12th House: you reach the deepest, most hidden layers of their psyche — old material buried in the unconscious surfaces, which is both revealing and intense.",
    _generic_house: "Your Pluto falls in their {ORD} House — a transforming, intensifying force in this area of their chart that tends to bring what is hidden to the surface.",
  },
};

const HOUSE_OVERLAY_GENERIC: Record<number, string> = {
  1:  "This placement activates their sense of self and personal presence — your energy is felt immediately in how they show up.",
  2:  "This placement connects to their values and resources — your presence influences how they relate to security and what they prioritize.",
  3:  "This placement enlivens their world of communication and learning — conversations between you carry particular weight.",
  4:  "This placement reaches their private, foundational world — a sense of familiarity or domestic resonance characterizes this overlay.",
  5:  "This placement brightens their creative and romantic zone — your energy amplifies their joy and self-expression.",
  6:  "This placement connects to their daily life and routines — you have a practical, grounding effect on their day-to-day.",
  7:  "This placement lands in their partnership zone — the most relationship-focused house overlay, carrying a quality of direct mirroring.",
  8:  "This placement reaches into their zone of depth and transformation — the themes shared between you tend to go below the surface.",
  9:  "This placement connects to their world of meaning and exploration — your presence broadens their sense of what is possible.",
  10: "This placement touches their public life and ambitions — your role in their career or reputation is meaningful.",
  11: "This placement activates their social world and community ties — you feel like a natural part of their larger network.",
  12: "This placement reaches their hidden, inner world — a quietly meaningful quality to this overlay that operates below the surface.",
};

/** Format a house number as an ordinal: 1 → 1st, 2 → 2nd, 3 → 3rd, 4–20 → Nth */
function houseOrdinal(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  return `${n}${suffixes[n % 10] ?? "th"}`;
}

/**
 * Replace ALL spelled-out house ordinals in a string with their numeric equivalents.
 * Handles "First House" → "1st House", "Twelfth House" → "12th House", etc.
 * Case-insensitive, handles both "House" and "house".
 * This ensures a single consistent numeric-ordinal format ("1st/7th/8th House") across
 * ALL overlay body text, regardless of how the source string was authored.
 */
function normaliseHouseOrdinals(text: string): string {
  const MAP: Array<[RegExp, string]> = [
    [/\bFirst\b/gi,   "1st"],
    [/\bSecond\b/gi,  "2nd"],
    [/\bThird\b/gi,   "3rd"],
    [/\bFourth\b/gi,  "4th"],
    [/\bFifth\b/gi,   "5th"],
    [/\bSixth\b/gi,   "6th"],
    [/\bSeventh\b/gi, "7th"],
    [/\bEighth\b/gi,  "8th"],
    [/\bNinth\b/gi,   "9th"],
    [/\bTenth\b/gi,   "10th"],
    [/\bEleventh\b/gi,"11th"],
    [/\bTwelfth\b/gi, "12th"],
  ];
  let result = text;
  for (const [re, replacement] of MAP) {
    result = result.replace(re, replacement);
  }
  return result;
}

export function getHouseOverlayReading(
  bodyKey: string,
  houseNum: number,
  direction: "BinA" | "AinB"
): string {
  const bodyData = OVERLAY_READINGS[bodyKey];
  if (bodyData) {
    const specific = bodyData[houseNum] as string | undefined;
    if (specific) {
      // Slightly rephrase for AinB direction, then normalise house ordinals to numeric
      let text = direction === "AinB"
        ? specific.replace(/^Your /, "Their ").replace(/ their /, " your ")
        : specific;
      return normaliseHouseOrdinals(text);
    }
    const genericHouse = bodyData["_generic_house"] as string | undefined;
    if (genericHouse) {
      // Replace {ORD} with the ordinal form (e.g. "1st", "8th")
      let text = genericHouse.replace(/\{ORD\}/g, houseOrdinal(houseNum));
      if (direction === "AinB") {
        text = text.replace(/^Your /, "Their ").replace(/ their /, " your ");
      }
      return normaliseHouseOrdinals(text);
    }
  }
  const generic = HOUSE_OVERLAY_GENERIC[houseNum] ?? "This placement creates a meaningful link between you in this area of the chart.";
  return normaliseHouseOrdinals(generic);
}
