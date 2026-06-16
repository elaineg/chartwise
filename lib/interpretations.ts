/**
 * Original concise interpretation blurbs for chartwise.
 * All text is original — astrological concepts (facts/ideas) are not copyrightable;
 * only specific wording is. These are in-house authored, not copied from Cafe Astrology,
 * co-star, or any other source.
 */

export interface Interpretations {
  planetInHouse: Record<string, Record<string, string>>;
  signInHouse: Record<string, Record<string, string>>;
  signs: Record<string, string>;
  planets: Record<string, string>;
  elements: Record<string, string>;
  modalities: Record<string, string>;
  nodes: Record<string, string>;
  retrograde: Record<string, string>;
  houseThemes: Record<string, string>;
}

const interpretations: Interpretations = {
  houseThemes: {
    "1": "Self & identity — how you come across to others, your body, and first impressions.",
    "2": "Money & values — what you earn, own, and care about most.",
    "3": "Communication & learning — how you think, speak, and connect with siblings and neighbors.",
    "4": "Home & roots — your family, early life, and the private foundation you return to.",
    "5": "Creativity & pleasure — romance, play, self-expression, and having fun.",
    "6": "Work & health — daily routines, service, and how you keep body and mind running.",
    "7": "Partnerships — close one-on-one relationships, marriage, and open rivals.",
    "8": "Transformation — deep change, shared resources, intimacy, and what you can't control.",
    "9": "Beliefs & exploration — philosophy, travel, higher education, and the search for meaning.",
    "10": "Career & public life — your reputation, ambitions, and what the world sees you achieving.",
    "11": "Community & vision — friendships, groups, social causes, and your hopes for the future.",
    "12": "Inner life & solitude — the unconscious, hidden matters, retreat, and spiritual depth.",
  },

  signs: {
    aries:
      "Bold and direct, you lead with instinct and act before you overthink. You thrive on being first.",
    taurus:
      "Patient and grounded, you build slowly but reliably. Comfort, beauty, and loyalty matter deeply.",
    gemini:
      "Curious and adaptable, you collect ideas and connections. You see every side — sometimes too many.",
    cancer:
      "Emotionally intuitive and protective, you nurture what you love and never forget how things felt.",
    leo: "Warm and expressive, you want to shine and be seen. Generosity and pride walk hand in hand.",
    virgo:
      "Precise and helpful, you notice what others miss and take quiet satisfaction in doing things right.",
    libra:
      "Diplomatic and relationship-focused, you seek balance and find it uncomfortable to make enemies.",
    scorpio:
      "Intense and perceptive, you go deep and rarely show your full hand. Power and trust are the stakes.",
    sagittarius:
      "Optimistic and freedom-loving, you chase meaning, adventure, and the big picture.",
    capricorn:
      "Disciplined and ambitious, you play the long game and respect what takes real effort to build.",
    aquarius:
      "Independent and idea-driven, you think ahead of your time and care about the collective as well as the individual.",
    pisces:
      "Empathetic and imaginative, you blur boundaries with ease and feel the undercurrents others miss.",
  },

  planets: {
    sun: "Your core identity and life force — what you're here to express and become.",
    moon: "Your emotional inner world — instinctive reactions, needs, and what makes you feel safe.",
    mercury:
      "Your mind and voice — how you think, communicate, and process information.",
    venus:
      "Your values and attractions — what you love, find beautiful, and seek in relationships.",
    mars:
      "Your drive and desire — where you put your energy and how you go after what you want.",
    jupiter:
      "Your growth and optimism — where life expands, luck shows up, and beliefs take root.",
    saturn:
      "Your discipline and limits — where you're tested, built slowly, and gain real mastery.",
    uranus:
      "Your need for freedom and change — where you break rules, innovate, and shake things up.",
    neptune:
      "Your sense of the infinite — where you dream, dissolve boundaries, and seek transcendence.",
    pluto:
      "Your power and transformation — where life forces deep change and nothing stays the same forever.",
    chiron:
      "Your wound and wisdom — a tender spot that, when worked through, becomes a source of healing for others.",
    northnode:
      "Your growth edge — the direction your soul is expanding toward in this lifetime.",
    southnode:
      "Your comfort zone — innate talents from the past that feel natural but may keep you from growing.",
  },

  elements: {
    fire: "Fire energy is bold, enthusiastic, and driven by inspiration. You come alive when pursuing something meaningful.",
    earth:
      "Earth energy is practical, reliable, and grounded in the physical world. You build real things that last.",
    air: "Air energy is intellectual, social, and drawn to ideas. You thrive on connection and communication.",
    water:
      "Water energy is emotional, intuitive, and sensitive to undercurrents. You navigate by feeling as much as thinking.",
  },

  modalities: {
    cardinal:
      "Cardinal energy initiates — you start things, set direction, and aren't afraid of a blank slate.",
    fixed:
      "Fixed energy sustains — you commit deeply, resist change, and see things through to the end.",
    mutable:
      "Mutable energy adapts — you adjust easily, bridge transitions, and see multiple possibilities at once.",
  },

  nodes: {
    north:
      "Your North Node marks the edge of your growth — unfamiliar territory that challenges and ultimately fulfills you.",
    south:
      "Your South Node marks your comfort zone — skills that come easily but may keep you playing it safe.",
  },

  retrograde: {
    mercury:
      "Mercury retrograde slows and internalizes thinking — communication and plans benefit from review rather than launch.",
    venus:
      "Venus retrograde turns affection inward — values and relationships are re-examined rather than pursued outward.",
    mars:
      "Mars retrograde channels drive inward — action is deliberate and often delayed, but more considered.",
    jupiter:
      "Jupiter retrograde focuses growth inward — wisdom comes from reflection and inner expansion rather than external gains.",
    saturn:
      "Saturn retrograde internalizes structure — discipline and responsibility are self-directed, often from past-life or early patterns.",
    uranus:
      "Uranus retrograde internalizes rebellion — the urge to break free is processed quietly before surfacing.",
    neptune:
      "Neptune retrograde sharpens intuition — illusions dissolve faster and inner spiritual life intensifies.",
    pluto:
      "Pluto retrograde deepens transformation — power and change work at a subterranean level, slow but thorough.",
    chiron:
      "Chiron retrograde turns healing inward — the wound is examined privately before it can help others.",
    _generic:
      "This planet retrograde turns its energy inward — the themes it governs are reviewed and refined rather than pushed outward.",
  },

  // 10 planets × 12 houses = 120 entries
  planetInHouse: {
    sun: {
      "1": "Your identity is front and center — you project confidence and vitality naturally, and how you show up in the world IS your life's work.",
      "2": "Your sense of self is tied to what you build and own; success and self-worth are deeply connected for you.",
      "3": "Your identity shines through communication — you thrive when sharing ideas, and words are how you make your mark.",
      "4": "Your core self is rooted in home and family; private life gives you the fuel to face the public world.",
      "5": "You come alive through play, creativity, and self-expression — joy isn't a luxury, it's the point.",
      "6": "You find yourself through daily work and being useful; excellence in craft is a source of real pride.",
      "7": "You define yourself through your closest relationships — partnerships bring out who you truly are.",
      "8": "Transformation is central to your identity; you're drawn to depth, intensity, and reinvention.",
      "9": "You are at your most yourself when exploring — ideas, travel, and philosophy fuel your sense of purpose.",
      "10": "Your life force goes into career and public standing; achievement and recognition feel essential, not optional.",
      "11": "You shine in community — your identity is expressed through friendships, causes, and collective vision.",
      "12": "Your light burns quietly — inner development, solitude, and spiritual work are where your true self lives.",
    },
    moon: {
      "1": "Your emotions are worn openly — moods are visible and you're deeply sensitive to the atmosphere around you.",
      "2": "Emotional security comes from financial stability; possessions and savings soothe an anxious heart.",
      "3": "Your mind moves on feelings — you learn through emotion, and conversation is how you process the world.",
      "4": "Home and family are your emotional bedrock; you need a private sanctuary to feel whole.",
      "5": "You feel most alive when creating or playing; emotional highs come through romance and self-expression.",
      "6": "Daily routine and caring for others gives you emotional grounding; when your body is well, you are well.",
      "7": "You seek emotional completion through partnership — a close relationship is essential to feeling okay.",
      "8": "Your emotional world is intense and private; deep bonds are nourishing but you share them slowly.",
      "9": "Belief and exploration feed your inner life — you feel whole when learning, travelling, or seeking meaning.",
      "10": "Your emotions are tied to public life and work; recognition from the world matters to your inner stability.",
      "11": "You find emotional comfort in community — friends and groups give you a sense of belonging.",
      "12": "Your emotional life runs underground — you feel things deeply and privately, often processing alone.",
    },
    mercury: {
      "1": "Your mind is part of your first impression — quick thinking and a gift for words define how others see you.",
      "2": "You think in practical terms — money, resources, and the tangible are your mental playground.",
      "3": "Mercury here is at home: you communicate with ease, learn quickly, and collect knowledge naturally.",
      "4": "Your deepest thinking happens in private — home is where you process, and family shaped your mental patterns.",
      "5": "Your mind loves to play — creative ideas come easily and you communicate with flair and warmth.",
      "6": "Analytical and detail-oriented, you thrive in work that rewards precision and careful thinking.",
      "7": "You think best in dialogue — partnerships and debate sharpen your mind and give you perspective.",
      "8": "Your mind goes where others don't — psychology, research, and hidden truths fascinate you.",
      "9": "Big-picture thinking is your strength — you love ideas, philosophy, and learning that opens new worlds.",
      "10": "Your mind is career-oriented; strategic thinking and communications define your professional path.",
      "11": "You connect ideas and people naturally — groups, technology, and collective thinking energize your mind.",
      "12": "Your mental life is private and rich — you think deeply in solitude and often know things you can't explain.",
    },
    venus: {
      "1": "You project warmth and beauty naturally; others are drawn to your presence and social grace.",
      "2": "You love beautiful things and spend on quality — money and pleasure are intertwined for you.",
      "3": "You charm through words; conversation is an art form and you make others feel heard and valued.",
      "4": "You love a beautiful home and cherish family bonds; domestic harmony is your heart's priority.",
      "5": "Romance and creativity are your happy place — you love love, and art is how you play.",
      "6": "You find beauty in useful things and enjoy work that involves aesthetics, health, or service.",
      "7": "You are a natural partner — harmonious one-on-one relationships are where you feel most yourself.",
      "8": "Your love runs deep — you seek intensity and transformation in close relationships and financial matters.",
      "9": "You're attracted to what's different — foreign cultures, big ideas, and adventurous companions appeal.",
      "10": "Charm and aesthetics play a role in your career; you succeed where beauty, diplomacy, or taste matter.",
      "11": "You love your friends and causes deeply — social connections and community are how you experience beauty.",
      "12": "Your affections are private and sometimes hidden even from yourself; spiritual love often means most.",
    },
    mars: {
      "1": "You lead with action and assert yourself naturally; energy and drive are your most visible qualities.",
      "2": "You work hard for what you want and defend your resources fiercely — drive is channeled into building wealth.",
      "3": "You argue to win and communicate with force; your mind is sharp and you don't back down in debate.",
      "4": "Your drive is expressed in private — home improvements, family protection, and domestic ambitions fire you up.",
      "5": "You pursue pleasure and creative projects with intensity — romantic passion and competitive play energize you.",
      "6": "You work with vigor and can be relentlessly productive; health habits require the same energy you put into tasks.",
      "7": "You attract active, assertive partners and may clash in relationships — you need a partner who can hold their own.",
      "8": "Ambition and drive go into the depths — power, shared resources, and transformation motivate you intensely.",
      "9": "You chase big ideas and adventures with real passion — debate, travel, and pushing limits light you up.",
      "10": "Career ambition is fierce and focused; you work hard for public recognition and won't quit until you succeed.",
      "11": "You're driven by social causes and group action; community goals and collective work fire you up.",
      "12": "Your drive operates quietly — you work best alone or in private, and your energy builds in solitude.",
    },
    jupiter: {
      "1": "Optimism and expansion are your default mode — life tends to open up around you and you attract good fortune.",
      "2": "Abundance comes through material effort; you have a gift for generating income and may earn generously.",
      "3": "Your mind expands naturally — learning, writing, and communication bring growth and opportunity.",
      "4": "Home and family are blessed; you find deep happiness in your roots and private life tends to be expansive.",
      "5": "Joy, creativity, and romance are amplified — life gives you plenty of pleasure and you give it freely.",
      "6": "Work and health are areas of growth; you benefit from service and improve with practice.",
      "7": "Relationships bring expansion — partners open doors and marriage or close alliances tend to be fortunate.",
      "8": "Others' resources and deep transformation offer growth; inheritance, investment, or shared wealth may benefit you.",
      "9": "This is Jupiter's home territory — wisdom, travel, and higher learning bring profound expansion and luck.",
      "10": "Career and public life are blessed; ambition pays off and your reputation grows over time.",
      "11": "Community and social connection bring abundance — your network is a genuine source of opportunity.",
      "12": "Hidden blessings operate quietly in your life; spiritual growth and inner development bring deep rewards.",
    },
    saturn: {
      "1": "Self-discipline is a life theme — you may feel serious from a young age, but maturity brings real authority.",
      "2": "Financial security requires hard work and patience; you build wealth slowly but it lasts.",
      "3": "Communication takes effort — early difficulties with speaking or learning build careful, precise expression over time.",
      "4": "Home and family come with responsibility; early life may have been strict, but you build lasting foundations.",
      "5": "Creativity and joy take work — you may hold back from fun, but disciplined creative effort pays off.",
      "6": "Work ethic is strong and health requires discipline; you can achieve mastery through consistent, careful practice.",
      "7": "Partnerships carry weight — serious or older partners, or real commitment tested over time, define your close bonds.",
      "8": "Shared resources and deep change require patience; you handle power carefully and transform through sustained effort.",
      "9": "Beliefs are hard-won — you don't take big ideas on faith; wisdom comes through experience, not shortcuts.",
      "10": "Career is a lifelong project; Saturn here is the classic marker of ambition and eventual achievement through persistence.",
      "11": "Social connections are carefully chosen; friendships are few but loyal, and group goals require real commitment.",
      "12": "Inner work is the Saturn task — alone time is important, and you take spiritual or psychological growth seriously.",
    },
    uranus: {
      "1": "You are distinctly yourself — unconventional, unpredictable, and impossible to pin down. You do things your own way.",
      "2": "Your financial life is erratic — income may come in unusual ways and values are ahead of their time.",
      "3": "Your mind crackles with originality; you communicate in surprising ways and your ideas leap ahead of convention.",
      "4": "Home life has been unconventional — frequent moves, unusual family, or a strong desire to break from roots.",
      "5": "You express yourself in radically original ways; creativity is experimental and romance is unpredictable.",
      "6": "Work and health are approached unconventionally — you need variety and freedom in daily routines or you chafe.",
      "7": "Relationships are anything but conventional — you attract unusual partners and need freedom within commitment.",
      "8": "Deep change arrives suddenly and unexpectedly; power dynamics are disrupted and you reinvent yourself dramatically.",
      "9": "Your beliefs are ahead of their time — you challenge orthodoxy, think independently, and seek radical truth.",
      "10": "Career takes unexpected turns; you do best in innovative, nontraditional fields and resist being managed.",
      "11": "You're at home in progressive communities — groups and social causes are where your originality finds purpose.",
      "12": "Inner breakthroughs happen suddenly and unexpectedly; intuition is electric and the unconscious holds surprises.",
    },
    neptune: {
      "1": "You're hard to define — fluid, sensitive, and often perceived as mysterious or otherworldly.",
      "2": "Money and values are idealized or confused — generosity can tip into financial vagueness if you aren't careful.",
      "3": "Your mind is poetic and intuitive; you think in images and may blur the line between fact and feeling.",
      "4": "Home life carries a dreamlike quality — idealized family memories or a longing for belonging shape you deeply.",
      "5": "Romance and creativity are infused with fantasy; you love deeply but can project perfection onto partners.",
      "6": "Work and health need clear structure — Neptune here can blur boundaries and lead to overwhelm without routine.",
      "7": "Partnerships are idealistic; you may see what you want to see in others, which requires compassionate discernment.",
      "8": "Deep transformation has a mystical quality — you dissolve into change and emerge with spiritual insight.",
      "9": "Beliefs are felt more than reasoned — mysticism, art, and spiritual seeking call more than formal religion.",
      "10": "Career has a hazy or idealistic quality; you're drawn to creative, spiritual, or behind-the-scenes work.",
      "11": "You connect deeply with causes and communities — idealism is a strength and a vulnerability in groups.",
      "12": "Neptune is at home here — spiritual depth, vivid dreams, and compassion flow through your inner life.",
    },
    pluto: {
      "1": "Power radiates from you — intentionally or not, you affect others deeply. Reinvention is a recurring theme.",
      "2": "Money and resources become vehicles for power; wealth is built and dismantled through deep transformation.",
      "3": "Your words carry weight — you think and communicate in ways that cut through the surface to the real.",
      "4": "Family and home life have been sites of deep transformation; roots were either powerful or needed uprooting.",
      "5": "Creativity and romance are intense — you don't do either halfway, and transformation comes through both.",
      "6": "Work can become all-consuming; you pursue mastery or burn out, and health may require major overhauls.",
      "7": "Close relationships are deeply transformative — partnerships challenge you at the core and change you forever.",
      "8": "Pluto is at home here — depth, power, regeneration, and the willingness to face what others avoid define you.",
      "9": "Beliefs can become obsessions; you pursue truth with intensity and may dismantle and rebuild your worldview more than once.",
      "10": "Career involves power and authority at the highest levels — public life may include dramatic rises and falls.",
      "11": "Group dynamics are intense — you may transform communities or be transformed by them; collective power is magnetic.",
      "12": "The deepest transformation happens in private — subconscious patterns are powerful, and inner work changes everything.",
    },
    chiron: {
      "1": "Identity is the tender spot — early struggles with who you are become the foundation of hard-won self-confidence.",
      "2": "Self-worth and resources carry an old wound — healing comes through learning that your value isn't conditional.",
      "3": "Communication has been painful at some point — the very words you struggled to find become gifts for others.",
      "4": "Family is the wound and the medicine — early home-life pain becomes the source of your ability to nurture others.",
      "5": "Creativity and self-expression carry hurt — once healed, your authentic expression becomes a gift to the world.",
      "6": "Work and health hold old patterns — the body keeps score and daily practice is both the wound and the cure.",
      "7": "Relationships trigger the deepest healing — early partnership pain teaches you what genuine connection really is.",
      "8": "The wound runs deep — intimacy, loss, and transformation are the teachers that eventually set you free.",
      "9": "Beliefs have been wounding or confused — finding your own truth, without dogma, is the lifelong journey.",
      "10": "Career carries a wound around achievement and recognition — mastery eventually comes through accepting imperfection.",
      "11": "Community has been a source of pain or exclusion — that experience becomes compassion for the outsider.",
      "12": "The deepest wound is also the most private — inner healing, often spiritual, is both the task and the reward.",
    },
  },

  // 12 signs × 12 houses = 144 entries
  signInHouse: {
    aries: {
      "1": "Aries on the first house makes you bold, direct, and energetic — you come out swinging and first impressions are confident.",
      "2": "Aries here pushes you to earn and spend boldly; you act fast with money and can build wealth through initiative.",
      "3": "Aries in the third house makes you a direct, fast-talking communicator — you get to the point and don't look back.",
      "4": "Aries on the home cusp means domestic life is active and sometimes combative; you need autonomy at home.",
      "5": "Aries in the fifth brings passionate, competitive creativity — you play hard and romance with bold pursuit.",
      "6": "Aries in the sixth means you attack daily work with energy and impatience — you want results fast.",
      "7": "Aries on the seventh house draws bold, assertive partners and can bring rivalry into relationships.",
      "8": "Aries here makes transformation urgent — you push through deep change fast and can be impulsive with shared resources.",
      "9": "Aries in the ninth drives passionate pursuit of big ideas and adventures; you're a pioneer of belief.",
      "10": "Aries on the tenth means career is driven by ambition and competitive energy — you want to lead.",
      "11": "Aries in the eleventh makes you a social initiator — you start groups, inspire causes, and rally others.",
      "12": "Aries in the twelfth means hidden drives and unconscious anger — solitary action and private initiative.",
    },
    taurus: {
      "1": "Taurus rising gives you a calm, steady, dependable presence — others sense your groundedness immediately.",
      "2": "Taurus in the second is at home — comfort with money and possessions, a talent for building wealth slowly.",
      "3": "Taurus in the third makes you a careful, deliberate communicator — you think before you speak and mean what you say.",
      "4": "Taurus on the home cusp craves domestic stability — you build a beautiful, secure home and cherish your roots.",
      "5": "Taurus in the fifth means pleasure-filled creativity — you love sensory art, romance at a steady pace, and real comfort.",
      "6": "Taurus in the sixth brings steady, reliable work habits — you're productive and keep consistent routines.",
      "7": "Taurus on the seventh draws stable, loyal partners — you need reliability in relationships and offer the same.",
      "8": "Taurus in the eighth means change comes slowly and resistance is real — you transform through stubbornness turned to patience.",
      "9": "Taurus in the ninth makes philosophical pursuits practical — you want wisdom you can apply and travel that's comfortable.",
      "10": "Taurus on the tenth means career is built slowly and surely — persistence and reliability define your reputation.",
      "11": "Taurus in the eleventh makes you a loyal friend and steady group member — you contribute sustainably to communities.",
      "12": "Taurus in the twelfth brings quiet pleasure-seeking in private — rest and beauty are your retreat.",
    },
    gemini: {
      "1": "Gemini rising gives you a quick, curious, communicative presence — others see you as clever and versatile.",
      "2": "Gemini in the second means multiple income streams and flexible values — money moves in and out quickly.",
      "3": "Gemini is at home in the third — you're a natural communicator, prolific writer, and perpetual learner.",
      "4": "Gemini on the home cusp means a lively, mentally active household — home is also where ideas flow freely.",
      "5": "Gemini in the fifth brings playful, witty creativity — you flirt through words and love variety in romance.",
      "6": "Gemini in the sixth means you need mental variety in work — repetitive tasks drain you, multitasking energizes you.",
      "7": "Gemini on the seventh draws clever, conversational partners — intellectual connection is as important as emotional.",
      "8": "Gemini in the eighth approaches depth with curiosity — you study transformation and can talk about hard topics with ease.",
      "9": "Gemini in the ninth loves to learn across many subjects — philosophy and travel are better as exploration than conclusion.",
      "10": "Gemini on the tenth brings communication-oriented careers — writing, media, teaching, and networking are your arena.",
      "11": "Gemini in the eleventh means your social network is vast and varied — you move between groups and circles naturally.",
      "12": "Gemini in the twelfth means private mental chatter — thoughts run in the background of your inner life constantly.",
    },
    cancer: {
      "1": "Cancer rising gives you a warm, receptive, and protective presence — others feel nurtured around you.",
      "2": "Cancer in the second ties security to emotional comfort — money feels better saved than spent.",
      "3": "Cancer in the third means communication is emotional and memory-based — you tell stories from the heart.",
      "4": "Cancer is at home in the fourth — roots and family are everything, and your home is your sanctuary.",
      "5": "Cancer in the fifth means creativity and romance are emotionally rich — you love deeply and parent with devotion.",
      "6": "Cancer in the sixth means work is best when you feel emotionally connected to it — service and nurturing call you.",
      "7": "Cancer on the seventh draws nurturing, family-oriented partners — emotional security is the glue of close bonds.",
      "8": "Cancer in the eighth means transformation is felt deeply — change is held close, processed slowly, and never forgotten.",
      "9": "Cancer in the ninth seeks meaning through emotional wisdom — home, heritage, and belonging inform belief.",
      "10": "Cancer on the tenth brings emotional investment in career — reputation matters like a second family to you.",
      "11": "Cancer in the eleventh means your groups feel like chosen family — you nurture your community with loyalty.",
      "12": "Cancer in the twelfth brings a rich emotional inner life — private feeling is deep, sometimes unprocessed.",
    },
    leo: {
      "1": "Leo rising gives you a warm, radiant, commanding presence — you enter a room and people notice.",
      "2": "Leo in the second means money is spent generously — you value quality and love to treat yourself and others.",
      "3": "Leo in the third makes you a dramatic, expressive communicator — storytelling is your natural medium.",
      "4": "Leo on the home cusp means your home is your stage — you take pride in domestic life and family legacy.",
      "5": "Leo is at home in the fifth — creativity, romance, and performance are your greatest joys.",
      "6": "Leo in the sixth takes pride in daily work — you lead in your field and want your competence recognized.",
      "7": "Leo on the seventh draws dramatic, charismatic partners — relationships have a theatrical quality.",
      "8": "Leo in the eighth transforms through passion and will — deep change is embraced with courage.",
      "9": "Leo in the ninth seeks grand beliefs and inspirational teachings — you share your philosophy with confidence.",
      "10": "Leo on the tenth means career is about legacy and recognition — you aim for a title that reflects your light.",
      "11": "Leo in the eleventh shines in social groups — you naturally lead and are generous with your community.",
      "12": "Leo in the twelfth keeps its light private — creativity and pride operate beneath the surface.",
    },
    virgo: {
      "1": "Virgo rising gives you a careful, precise, and helpful presence — you notice everything and present yourself thoughtfully.",
      "2": "Virgo in the second means financial precision — you budget carefully, avoid waste, and value what you've earned.",
      "3": "Virgo in the third makes you a meticulous communicator — you choose words carefully and value accuracy.",
      "4": "Virgo on the home cusp means a well-organized home and a critical eye for domestic details.",
      "5": "Virgo in the fifth brings craft to creativity — you refine your art and prefer skillful romance over flashy gestures.",
      "6": "Virgo is at home in the sixth — work, health, and daily routine are your domain and you excel in all three.",
      "7": "Virgo on the seventh draws thoughtful, helpful partners — you notice details in relationships and value reliability.",
      "8": "Virgo in the eighth analyzes transformation carefully — you process change methodically and gain mastery through study.",
      "9": "Virgo in the ninth seeks practical wisdom — philosophy must be useful and beliefs must hold up to scrutiny.",
      "10": "Virgo on the tenth means career is defined by precision and service — you build a reputation for doing things right.",
      "11": "Virgo in the eleventh serves groups through practical contributions — you organize, critique, and improve communities.",
      "12": "Virgo in the twelfth means worry operates quietly in the background — perfectionism runs deep beneath the surface.",
    },
    libra: {
      "1": "Libra rising gives you a charming, balanced, and harmonious presence — others find you easy to be around.",
      "2": "Libra in the second means money is often shared — finances come through partnerships and you weigh every purchase.",
      "3": "Libra in the third makes you a diplomatic communicator — you naturally consider both sides and facilitate agreement.",
      "4": "Libra on the home cusp means a harmonious, aesthetically pleasing home is a genuine need.",
      "5": "Libra in the fifth means romance is a serious art form — you court carefully, and creativity is polished and social.",
      "6": "Libra in the sixth brings a fair, balanced approach to work — you collaborate well and need a pleasant environment.",
      "7": "Libra is at home in the seventh — partnerships are your strength and close relationships define your best self.",
      "8": "Libra in the eighth seeks balance in deep transformation — you approach power and intimacy with tact.",
      "9": "Libra in the ninth seeks philosophical balance — truth is found through dialogue, not dogma.",
      "10": "Libra on the tenth brings career success through diplomacy, partnerships, and aesthetics.",
      "11": "Libra in the eleventh builds friendships through fairness — you create harmony in groups and are a natural mediator.",
      "12": "Libra in the twelfth quietly seeks inner balance — ideals of peace and fairness operate in the unconscious.",
    },
    scorpio: {
      "1": "Scorpio rising gives you an intense, penetrating, magnetic presence — people sense your depth immediately.",
      "2": "Scorpio in the second means money is power — you build wealth strategically and guard your resources.",
      "3": "Scorpio in the third makes you a probing, incisive communicator — you say what you mean and spot what's unsaid.",
      "4": "Scorpio on the home cusp means deep family secrets or emotional intensity in your roots and private life.",
      "5": "Scorpio in the fifth brings intense creativity and passionate romance — you love with full devotion.",
      "6": "Scorpio in the sixth means work is pursued with obsessive focus — you investigate and go deep in your field.",
      "7": "Scorpio on the seventh draws intense, transformative partners — close bonds are powerful and sometimes challenging.",
      "8": "Scorpio is at home in the eighth — transformation, depth, and the mystery of existence are your natural territory.",
      "9": "Scorpio in the ninth seeks deep, transformative truth — philosophy must go to the root or it isn't worth believing.",
      "10": "Scorpio on the tenth means career involves power and strategic maneuvering — you play the long game publicly.",
      "11": "Scorpio in the eleventh forms deep bonds within communities — you prefer a few intense friendships to many casual ones.",
      "12": "Scorpio in the twelfth means the most intense experiences are private — inner life holds deep power.",
    },
    sagittarius: {
      "1": "Sagittarius rising gives you an optimistic, expansive, adventure-seeking presence — others see you as inspiring.",
      "2": "Sagittarius in the second means finances come and go expansively — generosity and big spending are both real risks.",
      "3": "Sagittarius in the third makes you an enthusiastic, big-picture communicator — you inspire more than you detail.",
      "4": "Sagittarius on the home cusp means home is a launching pad — you need freedom within your private life.",
      "5": "Sagittarius in the fifth brings joyful, adventurous creativity and romance that thrives on freedom and exploration.",
      "6": "Sagittarius in the sixth needs meaningful work — routine is tolerable only when the bigger purpose is clear.",
      "7": "Sagittarius on the seventh draws adventurous, philosophical partners — you need a companion for the journey.",
      "8": "Sagittarius in the eighth approaches transformation with optimism — you find meaning in deep change.",
      "9": "Sagittarius is at home in the ninth — travel, philosophy, and the search for truth are your native territory.",
      "10": "Sagittarius on the tenth means career is a voyage — you thrive in expansive, adventurous professional paths.",
      "11": "Sagittarius in the eleventh builds large, inspiring communities — you rally people around a shared vision.",
      "12": "Sagittarius in the twelfth holds beliefs quietly — spiritual seeking is private and philosophy runs deep.",
    },
    capricorn: {
      "1": "Capricorn rising gives you a serious, capable, and reliable presence — others trust you to get things done.",
      "2": "Capricorn in the second is excellent for finance — patient, disciplined, and building wealth over time.",
      "3": "Capricorn in the third makes you a careful, authoritative communicator — you speak with purpose and expect to be taken seriously.",
      "4": "Capricorn on the home cusp means family responsibility comes early — home is a structure to maintain.",
      "5": "Capricorn in the fifth means creativity and romance take patience — you invest slowly but seriously.",
      "6": "Capricorn in the sixth brings a rigorous work ethic — you set high standards and meet them consistently.",
      "7": "Capricorn on the seventh draws ambitious, mature partners — relationships are taken seriously and built to last.",
      "8": "Capricorn in the eighth means transformation through hard work — you earn your depth and rebuild piece by piece.",
      "9": "Capricorn in the ninth pursues wisdom practically — you want beliefs that translate into real results.",
      "10": "Capricorn is at home in the tenth — ambition, authority, and career achievement are your defining drives.",
      "11": "Capricorn in the eleventh builds lasting community structures — your contribution to groups is long-term and serious.",
      "12": "Capricorn in the twelfth holds responsibility privately — inner discipline and self-mastery are ongoing quiet work.",
    },
    aquarius: {
      "1": "Aquarius rising gives you an original, independent, and somewhat detached presence — you're a type unto yourself.",
      "2": "Aquarius in the second brings unconventional values and erratic finances — you're generous but unpredictable with money.",
      "3": "Aquarius in the third makes you a brilliant, unusual communicator — your ideas are original and often ahead of their time.",
      "4": "Aquarius on the home cusp means home is unconventional — you need freedom and space within your private life.",
      "5": "Aquarius in the fifth brings experimental creativity and romance that needs freedom above all else.",
      "6": "Aquarius in the sixth needs flexibility at work — innovative approaches to health and routine suit you well.",
      "7": "Aquarius on the seventh draws progressive, independent partners — you need a relationship that doesn't feel like a cage.",
      "8": "Aquarius in the eighth approaches transformation intellectually — you analyze deep change rather than just feeling through it.",
      "9": "Aquarius in the ninth holds progressive, humanitarian beliefs — your philosophy challenges conventional wisdom.",
      "10": "Aquarius on the tenth means career is in innovative, progressive, or humanitarian fields — you lead with ideas.",
      "11": "Aquarius is at home in the eleventh — community, friendship, and collective causes are where you feel most yourself.",
      "12": "Aquarius in the twelfth holds unconventional inner experiences — hidden idealism and unusual intuition.",
    },
    pisces: {
      "1": "Pisces rising gives you a gentle, fluid, and empathetic presence — others sense your sensitivity immediately.",
      "2": "Pisces in the second means money flows in and out — values are spiritual and financial clarity requires effort.",
      "3": "Pisces in the third makes you an imaginative, poetic communicator — your words carry feeling and evoke mood.",
      "4": "Pisces on the home cusp means home is a sanctuary of feeling — you need your private space to be peaceful.",
      "5": "Pisces in the fifth brings deeply romantic, artistic creativity — you love with your whole heart and create from the soul.",
      "6": "Pisces in the sixth means work must feel meaningful — health is sensitive and routines need gentle maintenance.",
      "7": "Pisces on the seventh draws sensitive, artistic, or spiritually oriented partners — relationships feel fated.",
      "8": "Pisces in the eighth means transformation is deeply spiritual — you dissolve into change and emerge more whole.",
      "9": "Pisces in the ninth seeks mystical truth — spirituality, art, and intuition are the most meaningful philosophies.",
      "10": "Pisces on the tenth means career is in service, creative, or spiritual fields — your reputation is built on compassion.",
      "11": "Pisces in the eleventh connects to community through empathy — you feel for your friends and causes deeply.",
      "12": "Pisces is at home in the twelfth — your inner life is vast and spiritual, and solitude is genuinely restorative.",
    },
  },
};

export default interpretations;

// Helper functions for lookup with fallbacks
export function getPlanetInHouseBlurb(
  planet: string,
  house: number
): string {
  const houseStr = String(house);
  return (
    interpretations.planetInHouse[planet]?.[houseStr] ??
    `${capitalize(planet)} in house ${house} shapes how this area of life is activated — look to this planet's themes for what drives this domain.`
  );
}

export function getSignInHouseBlurb(sign: string, house: number): string {
  const houseStr = String(house);
  return (
    interpretations.signInHouse[sign]?.[houseStr] ??
    `${capitalize(sign)} on the ${ordinal(house)} house colors this life area with ${capitalize(sign)}'s qualities — its core traits define how you approach this domain.`
  );
}

export function getSignBlurb(sign: string): string {
  return (
    interpretations.signs[sign] ??
    `${capitalize(sign)} brings its distinctive qualities to this placement.`
  );
}

export function getPlanetBlurb(planet: string): string {
  return (
    interpretations.planets[planet] ??
    `${capitalize(planet)} activates the themes of this placement.`
  );
}

export function getRetrogradeBlurb(planet: string): string {
  return (
    interpretations.retrograde[planet] ??
    interpretations.retrograde["_generic"]
  );
}

export function getElementBlurb(element: string): string {
  return (
    interpretations.elements[element.toLowerCase()] ??
    `${capitalize(element)} element energy is prominent in this chart.`
  );
}

export function getHouseTheme(house: number): string {
  return (
    interpretations.houseThemes[String(house)] ??
    `House ${house} governs this area of life.`
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ordinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}
