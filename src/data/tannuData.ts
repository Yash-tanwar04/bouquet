export interface FlowerItem {
  id: number;
  slug: string;
  name: string;
  category: string;
  meaning: string;
  image: string;
  ghibliImage: string;
  alt: string;
  noteTitle: string;
  noteText: string;
  botanicalNote: string;
  color: string;
  coordinates: { x: number; y: number };
}

export interface LittleThing {
  id: number;
  title: string;
  description: string;
}

export interface ConstellationStory {
  id: number;
  title: string;
  date?: string;
  text: string;
  icon: string;
  isSpecial?: boolean;
}

export interface EnvelopeLetter {
  id: number;
  slug: string;
  label: string;
  sealColor: string;
  waxIcon: string;
  dateTag: string;
  message: string;
}

export interface MemoryPhoto {
  id: number;
  image: string;
  caption: string;
  date: string;
  rotation: number;
  noteBack: string;
}

export const TANNU_DATA = {
  names: {
    fullName: "Tanisha",
    petName: "Tannu",
    creatorName: "Yash",
  },
  dates: {
    birthday: "29 September",
    birthdayShort: "29.09",
    confessionDate: "20 Sept",
  },
  distance: {
    herCity: "Your City",
    hisCity: "Yash's City",
    quote: "Distance doesn't count here, because no matter where we are, we're always under the same sky. ♡",
  },
  header: {
    greeting: "For my Tannu ♡",
    title: "Happy Birthday, Tannu",
    subtitle: "A bouquet of little things I love about you, because one day is never enough to tell you how much you mean to me. ♡",
    instruction: "Touch a flower ♡",
    counterPrefix: "There are 12 flowers with 12 special notes from Yash ♡",
  },
  secretHeart: {
    triggerCount: 29,
    title: "You found my secret ♡",
    line1: "There wasn't supposed to be anything here.",
    line2: "I just wanted one more excuse to tell you that I love you. Happy 29th September, my perfy Tannu. ♡",
  },
  mirrorWords: [
    "beautiful",
    "kind",
    "funny",
    "soft",
    "strong",
    "chaotic",
    "loving",
    "my favourite person",
  ],
  mirrorQuote: {
    line1: "You sometimes see yourself through the things you don't like.",
    line2: "I wish you could borrow my eyes for a day. ♡",
  },
  music: {
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    caption: "Press play. Pretend I'm sitting beside you. ♡",
    subtext: "Some songs just feel like you... ♡",
  },
  finalPage: {
    greeting: "Tannu,",
    message1: "No matter how many miles separate our rooms today, I hope today feels a little more special, a little more warm, and a little more like home.",
    message2: "Because you, always, are my favourite place. ♡",
    wish: "Happy 29th September, baby. ♡",
    closing: "Come back whenever you miss me.",
    buttonText: "♡ Come back to me",
  },

  // 12 Intimate & Authentic Flower Notes (Yash to Tannu)
  flowers: [
    {
      id: 1,
      slug: "beginning",
      name: "Wild Garden Rose",
      category: "Our Beginning",
      meaning: "From Schmooze to my whole universe.",
      image: "/assets/images/flowers/flower_1_happiness.png",
      ghibliImage: "/assets/images/ghibli/ghibli_1_beginning.png",
      alt: "Ghibli style bloom for Our Beginning",
      noteTitle: "From a dumb meme to my favourite person",
      noteText: "It still makes me laugh thinking about how we started on Schmooze. Our first few texts were honestly so dry and ordinary, nobody could've guessed where this was going. But then we moved to Instagram, and I replied to that story of yours about the comedy club because I watched way too much stand-up back then... and somehow that one random reply turned into talking all night. It’s wild how something so ordinary became the most important part of my life. ♡",
      botanicalNote: "Rosa damascena — from an ordinary spark to an endless flame",
      color: "#e28292",
      coordinates: { x: 48, y: 52 },
    },
    {
      id: 2,
      slug: "favourite",
      name: "Blushing Peony",
      category: "My Favourite Thing",
      meaning: "The gentle, genuine soul you are underneath.",
      image: "/assets/images/flowers/flower_2_strength.png",
      ghibliImage: "/assets/images/ghibli/ghibli_2_favourite.png",
      alt: "Ghibli style peony for My Favourite Thing",
      noteTitle: "The person you are underneath",
      noteText: "Everyone knows you're pretty, Tannu, but that's not even what made me fall for you so hard. It's the way your heart works. The way you genuinely care about people even when you try to act aloof, the way you react to little things with so much honesty, and just how soft you are on the inside. You have this quiet goodness in you that makes everyone around you feel looked after. That’s my favourite thing about you. ♡",
      botanicalNote: "Paeonia — graceful inner warmth and quiet compassion",
      color: "#f5edd6",
      coordinates: { x: 46, y: 31 },
    },
    {
      id: 3,
      slug: "little-things",
      name: "Delicate Wildflower",
      category: "Your Little Things",
      meaning: "The tiny moments only a boyfriend notices.",
      image: "/assets/images/flowers/flower_3_safe_place.png",
      ghibliImage: "/assets/images/ghibli/ghibli_3_little_things.png",
      alt: "Ghibli style wildflower for Little Things",
      noteTitle: "The things you don't even realise",
      noteText: "I don’t know if you even realise how many tiny things I notice about you. The way your voice changes when you're super excited to tell me a story, the little facial expressions you make when you're thinking, and the habits you do without even thinking twice. You probably don't consider any of those things special about yourself, but to me, they’re the cutest parts of my day. Never stop being you, bby. ♡",
      botanicalNote: "Anemone — unspoken wonders in the quietest details",
      color: "#99a9d6",
      coordinates: { x: 62, y: 40 },
    },
    {
      id: 4,
      slug: "laugh",
      name: "Sunny Chamomile",
      category: "Your Laugh",
      meaning: "The instant reset button for my hardest days.",
      image: "/assets/images/flowers/flower_4_conversations.png",
      ghibliImage: "/assets/images/ghibli/ghibli_4_laugh.png",
      alt: "Ghibli style daisy for Your Laugh",
      noteTitle: "My mood changer",
      noteText: "I don't think you realise how much power your laugh has over me. I could be having the most stressful, annoying day where everything is going wrong, but the second you send me an audio note wheezing over something silly or bursting out laughing on call, my whole mood flips in two seconds. It’s like an instant reset button for my brain. Your laugh is pure magic, Tannu. ♡",
      botanicalNote: "Matricaria — warmth that melts the heaviest storms",
      color: "#e892a0",
      coordinates: { x: 72, y: 32 },
    },
    {
      id: 5,
      slug: "peace",
      name: "Velvet English Rose",
      category: "My Peace",
      meaning: "Where I can take off all my filters and just breathe.",
      image: "/assets/images/flowers/flower_5_habits.png",
      ghibliImage: "/assets/images/ghibli/ghibli_5_peace.png",
      alt: "Ghibli style velvet rose for My Peace",
      noteTitle: "Zero filters with you",
      noteText: "With the rest of the world, I feel like I always have to be on guard or have things figured out. But with you? I can be tired, quiet, completely unhinged, or just sitting in total silence, and it feels completely peaceful. Talking to you makes the noisy parts of life feel so much softer. You're the one place where I never have to pretend. That means everything to me, Bebu. ♡",
      botanicalNote: "Rosa rugosa — absolute stillness and quiet sanctuary",
      color: "#e8eff5",
      coordinates: { x: 28, y: 28 },
    },
    {
      id: 6,
      slug: "tease",
      name: "Playful Sweet Pea",
      category: "The One I Tease",
      meaning: "Comfortable nonsense and banter that never gets old.",
      image: "/assets/images/flowers/flower_6_laughs.png",
      ghibliImage: "/assets/images/ghibli/ghibli_6_tease.png",
      alt: "Ghibli style sweet pea for Teasing",
      noteTitle: "My favourite person to annoy",
      noteText: "Look, as much as I adore you, you are also genuinely my favourite human being to annoy on this planet. Seeing your little dramatic reactions when I tease you or hearing that slight annoyed tone before you start laughing is the best part of our banter. I love that we can talk about deep emotional stuff for hours, and five minutes later be talking complete comfortable nonsense. Wouldn't trade that dynamic for anything. ♡",
      botanicalNote: "Lathyrus — playful mischief, laughter and comfort",
      color: "#fcfaf2",
      coordinates: { x: 38, y: 42 },
    },
    {
      id: 7,
      slug: "cold-coffee",
      name: "Mocha Blossom",
      category: "Cold Coffee",
      meaning: "Loving Tannu means accepting her coffee addiction.",
      image: "/assets/images/flowers/flower_7_today_tomorrow.png",
      ghibliImage: "/assets/images/ghibli/ghibli_7_cold_coffee.png",
      alt: "Ghibli style blossom for Cold Coffee",
      noteTitle: "Loving you = accepting your coffee addiction",
      noteText: "I’m pretty sure part of falling in love with you was signing an unspoken contract that I have to accept your questionable, borderline illegal consumption of cold coffee. Like, do you ever drink normal water, Tannu? Haha. Every time you have a cold coffee in your hand, you look completely in your element, so I guess I have no choice but to support your addiction forever. ♡",
      botanicalNote: "Coffea arabica — sweet daily rituals and inside jokes",
      color: "#eab308",
      coordinates: { x: 74, y: 44 },
    },
    {
      id: 8,
      slug: "confession",
      name: "Crimson Tulip",
      category: "20 September",
      meaning: "The day you confessed first.",
      image: "/assets/images/flowers/flower_8_inspiration.png",
      ghibliImage: "/assets/images/ghibli/ghibli_8_confession.png",
      alt: "Ghibli style tulip for 20 September",
      noteTitle: "She said it first",
      noteText: "20.09. I don’t even have to say the full story, because we both know what happened that day. Just remember that you confessed first, miss. You said it before I did, and I still smile like an idiot whenever I think about that moment. That day shifted everything between us, and I will keep that date locked in my heart forever. Best decision you ever made, by the way. ♡",
      botanicalNote: "Tulipa gesneriana — bold honest confession of the heart",
      color: "#7c8ec4",
      coordinates: { x: 32, y: 48 },
    },
    {
      id: 9,
      slug: "see-you",
      name: "Sky Blue Hydrangea",
      category: "The Way I See You",
      meaning: "I wish you could borrow my eyes for ten minutes.",
      image: "/assets/images/flowers/flower_9_beginning.png",
      ghibliImage: "/assets/images/ghibli/ghibli_9_see_you.png",
      alt: "Ghibli style hydrangea for The Way I See You",
      noteTitle: "I wish you could see what I see",
      noteText: "I know you don't always feel super excited about your birthday, and I know there are days when you look in the mirror and don't feel great about yourself. But Tannu, I swear, if you could borrow my eyes for just ten minutes, you'd never doubt yourself again. You are so effortlessly gorgeous, inside and out. You don't have to be perfect; who you already are is more than enough for me. ♡",
      botanicalNote: "Hydrangea — true perspective, unclouded appreciation",
      color: "#f8b4c0",
      coordinates: { x: 56, y: 22 },
    },
    {
      id: 10,
      slug: "safe-place",
      name: "White Gardenia",
      category: "My Safe Place",
      meaning: "Where home is a voice on the other end of the line.",
      image: "/assets/images/flowers/flower_10_peace.png",
      ghibliImage: "/assets/images/ghibli/ghibli_10_safe_place.png",
      alt: "Ghibli style white flower for Safe Place",
      noteTitle: "Where my heart feels rested",
      noteText: "Somewhere between random late-night texts and getting to know every little corner of who you are, you became my home. You're the person I run to when something exciting happens, and you're the first person I want to talk to when things feel heavy. Knowing I have you in my corner makes me feel so safe. Thank you for always having my back, baby. ♡",
      botanicalNote: "Gardenia jasminoides — deep unwavering trust and loyalty",
      color: "#d9657b",
      coordinates: { x: 56, y: 20 },
    },
    {
      id: 11,
      slug: "distance",
      name: "Twilight Bellflower",
      category: "Distance",
      meaning: "Leaving pieces of my heart here until I can hold you.",
      image: "/assets/images/flowers/flower_11_you_always.png",
      ghibliImage: "/assets/images/ghibli/ghibli_11_distance.png",
      alt: "Ghibli style bellflower for Distance",
      noteTitle: "Until I can be there",
      noteText: "I hate that I can’t be there in person today to wake you up, see your sleepy face, and take you out for your birthday. Being long-distance sucks on days like this. But until the day comes where I can pull you into a proper hug and not let go, I built you this little universe instead. Think of every flower here as a little piece of me sitting beside you. Happy 29th, perfy. ♡",
      botanicalNote: "Campanula — love that stays steady across the miles",
      color: "#f7f1e6",
      coordinates: { x: 42, y: 18 },
    },
    {
      id: 12,
      slug: "always-you",
      name: "Eternal Crimson Rose",
      category: "Always You",
      meaning: "My constant, unwavering choice. Always.",
      image: "/assets/images/flowers/flower_12_sept29.png",
      ghibliImage: "/assets/images/ghibli/ghibli_12_always_you.png",
      alt: "Ghibli style red rose for Always You",
      noteTitle: "My constant choice",
      noteText: "Through every mood, every random argument, all the miles between us, and every quiet night on call... my answer is always going to be you, Tannu. You make my life brighter, funnier, and so much warmer just by being in it. Happy birthday, my girl. I love you so much, more than all these screen pixels could ever show. Yours, Yash. ♡",
      botanicalNote: "Rosa rubiginosa — forever yours through every chapter",
      color: "#ea758c",
      coordinates: { x: 60, y: 64 },
    },
  ] as FlowerItem[],

  // 29 Little Things About Tannu (Yash's authentic observations)
  littleThings: [
    { id: 1, title: "Your laugh on calls", description: "When something catches you off guard and you do that wheezing laugh you try to suppress." },
    { id: 2, title: "Your cold coffee habit", description: "Your borderline alarming loyalty to cold coffee over basic human hydration." },
    { id: 3, title: "How you tell stories", description: "The way you get super animated and take five different side tangents before finishing your point." },
    { id: 4, title: "Replying to your comedy story", description: "Remember that Instagram story about the comedy club? Best story reply I will ever send in my life." },
    { id: 5, title: "How you care secretly", description: "You act tough and pretend you're indifferent, but you're actually the softest soul alive." },
    { id: 6, title: "Your sleepy voice", description: "When you answer late at night, slightly raspy, and dangerously cute." },
    { id: 7, title: "The 20th September memory", description: "Never letting you forget that you said it first, bby. 20.09 is stamped in my heart." },
    { id: 8, title: "When you try not to smile", description: "Fighting that little smirk when I say something stupid before you finally lose and laugh." },
    { id: 9, title: "Our comfortable silence", description: "We can literally be on a call for an hour doing our own work without it feeling awkward at all." },
    { id: 10, title: "Your little expressions", description: "The face you make when something confuses or mildly annoys you—it's hilarious." },
    { id: 11, title: "How you change my mood", description: "A two-minute conversation with you can fix a whole day of stress without you even trying." },
    { id: 12, title: "Your stubbornness", description: "Infuriating sometimes, but honestly one of the qualities I secretly respect most about you." },
    { id: 13, title: "Schmooze beginnings", description: "From dry small talk on a meme app to calling you my home. Still wild to me." },
    { id: 14, title: "The way you say my name", description: "There's a specific tone you have when you're being soft that I could listen to on repeat." },
    { id: 15, title: "How you stand by people", description: "You fiercely protect anyone you love. Your loyalty runs deeper than anyone realizes." },
    { id: 16, title: "When you doubt yourself", description: "I hate when you do that, because you have no idea how capable and wonderful you really are." },
    { id: 17, title: "Our inside jokes", description: "Things that make zero sense to anyone else in the world, but make us burst out laughing." },
    { id: 18, title: "Your sleepy texts", description: "Half-typed words that end abruptly when you drift off to sleep mid-sentence." },
    { id: 19, title: "How safe you make me feel", description: "With you, I don't have to pretend to be tough or have answers. I can just be Yash." },
    { id: 20, title: "Your little dramatic pouts", description: "When you don't get your way and you put on the face that you know wins every single argument." },
    { id: 21, title: "The songs you send me", description: "Dropping a random track into our chat with no caption, knowing it will stay in my head for days." },
    { id: 22, title: "How you make distance small", description: "Somehow, 1000 kilometers feels small because you show up for me every day." },
    { id: 23, title: "Your chaotic moments", description: "When you get that midnight energy burst and start acting completely unhinged." },
    { id: 24, title: "Your honesty", description: "You don't play fake games. You tell me what you feel, and I respect that so much." },
    { id: 25, title: "How you look when you're focusing", description: "That cute little brow furrow when you're trying to figure something out." },
    { id: 26, title: "When you're proud of me", description: "Hearing you say you're proud of me hits different than anyone else in the world." },
    { id: 27, title: "Your soft heart", description: "The world can be harsh, but you never let it turn you cold or bitter." },
    { id: 28, title: "Being my favourite person to tease", description: "You're genuinely the best banter partner I could ever ask for, perfy." },
    { id: 29, title: "Simply you, Tannu ♡", description: "Just the way you are. Not a single thing changed. Happy 29th September, my girl. ♡" },
  ] as LittleThing[],

  // Our Story Constellation (Yash & Tannu's real journey)
  storyMilestones: [
    {
      id: 1,
      title: "We met on Schmooze ♡",
      date: "The ordinary start",
      text: "Swiping memes on Schmooze. Our first chats were honestly so short and dry—neither of us had any idea what was coming.",
      icon: "Sparkles",
    },
    {
      id: 2,
      title: "Moving to Instagram ♡",
      date: "The transition",
      text: "Leaving the app behind and starting to see little glimpses of each other's actual lives and stories.",
      icon: "MessageCircleHeart",
    },
    {
      id: 3,
      title: "The Comedy Club story ♡",
      date: "The turning point",
      text: "You posted about a comedy club, and because I was obsessed with stand-up, I replied. That one story reply changed our whole dynamic.",
      icon: "Smile",
    },
    {
      id: 4,
      title: "20 September — She said it first ♡",
      date: "20 Sept ♡",
      text: "You confessed your feelings first. The most courageous, heart-racing moment that shifted my whole universe. Best day ever.",
      icon: "Heart",
      isSpecial: true,
    },
    {
      id: 5,
      title: "Countless late nights & cold coffee ♡",
      date: "Every single day",
      text: "Midnight voice notes, inside jokes, teasing each other, your cold coffee updates, and learning every habit of yours.",
      icon: "Moon",
    },
    {
      id: 6,
      title: "Still writing our story ♡",
      date: "Forever & 29.09",
      text: "Distance is just temporary. Every chapter ahead is waiting to be lived with you in person. Happy birthday, Tannu.",
      icon: "Infinity",
    },
  ] as ConstellationStory[],

  // Letters / Envelopes (Directly from Yash's heart)
  envelopes: [
    {
      id: 1,
      slug: "sad",
      label: "Open when you're sad",
      sealColor: "#c24158",
      waxIcon: "Heart",
      dateTag: "Always here for you",
      message: "Hey Bebu, take a deep breath. Whatever is making your chest feel heavy right now, remember it's just a rough chapter, not your whole story. You don't have to be strong or 'have it together' today. Close your eyes, imagine my arms around you, and let yourself just rest. I'm right here with you in spirit. You are so deeply loved, Tannu. ♡",
    },
    {
      id: 2,
      slug: "miss-me",
      label: "Open when you miss me",
      sealColor: "#9c27b0",
      waxIcon: "Sparkles",
      dateTag: "Same sky, baby",
      message: "I miss you too, more than words or miles can say. Look at the sky right now—the very same sky over you is right over me. Every day apart is just one day closer to the day I get to pull you into a proper hug and refuse to let go. Until then, remember: you have all of my heart, every single second. ♡",
    },
    {
      id: 3,
      slug: "not-pretty",
      label: "Open when you don't feel pretty",
      sealColor: "#e91e63",
      waxIcon: "Sun",
      dateTag: "Yash's honest truth",
      message: "Stop whatever mean thoughts you're telling yourself right now. I swear, if you could borrow my eyes for just ten seconds, you'd understand. You are so effortlessly stunning, Tannu—makeup or messy bun, oversized clothes or dressed up, smiling or rolling your eyes at me. You take my breath away every single time. You're gorgeous, bby. ♡",
    },
    {
      id: 4,
      slug: "doubt",
      label: "Open when you doubt yourself",
      sealColor: "#d97706",
      waxIcon: "ShieldAlert",
      dateTag: "I believe in you",
      message: "Listen to me: you are so much smarter, braver, and more capable than the little voice of doubt in your head. Look at everything you've overcome. I believe in you with every fiber of my being, even on days you forget to believe in yourself. You've got this, and I'm your number one cheerleader forever. ♡",
    },
    {
      id: 5,
      slug: "random-tuesday",
      label: "Open on a random Tuesday",
      sealColor: "#059669",
      waxIcon: "Coffee",
      dateTag: "Go drink some water",
      message: "Just a random check-in on an ordinary day: go drink some water (and no, cold coffee doesn't count as water, Tannu!). You don't need a special occasion to be celebrated. Just existing as you are makes my life infinitely better. Sending you the biggest virtual forehead kiss today. ♡",
    },
    {
      id: 6,
      slug: "hug",
      label: "Open when you need a hug",
      sealColor: "#e11d48",
      waxIcon: "HeartHandshake",
      dateTag: "Wrap your arms tight",
      message: "Wrap both your arms around yourself right now and squeeze tight. That's a proxy hug from me. Imagine me resting my chin on your head and kissing your forehead. No distance can ever make you alone when someone loves you this hard. I've got you, perfy. Always. ♡",
    },
  ] as EnvelopeLetter[],

  // Memory Box Polaroids
  memories: [
    {
      id: 1,
      image: "/assets/images/memories/polaroid_1.jpg",
      caption: "Our late night calls ♡",
      date: "3 AM conversations",
      rotation: -4,
      noteBack: "Remember this call? When we talked until almost sunrise and both our phones died. That's when I knew you were my home.",
    },
    {
      id: 2,
      image: "/assets/images/memories/polaroid_2.jpg",
      caption: "Sunset thoughts of you",
      date: "Golden hour",
      rotation: 3,
      noteBack: "Every sunset I watch from my window, I look at the sky and think of how much better it'll be when you're leaning on my shoulder.",
    },
    {
      id: 3,
      image: "/assets/images/memories/polaroid_3.jpg",
      caption: "Same sky, always",
      date: "29/09 Forever",
      rotation: -2,
      noteBack: "No matter how many miles lie between our cities, the same sun sets on both of us. We are never truly apart, Tannu.",
    },
    {
      id: 4,
      image: "/assets/images/memories/polaroid_note.jpg",
      caption: "I wish we had more pictures together ♡",
      date: "Our future promise",
      rotation: 5,
      noteBack: "Soon we won't have to count miles or screens. We're going to take a thousand real photos together. That's a promise.",
    },
  ] as MemoryPhoto[],
};
