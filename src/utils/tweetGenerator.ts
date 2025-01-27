const PERSONALITY_TWEETS = {
  friendly: [
    "Hey everyone! 👋 Just wanted to spread some positivity today! Keep smiling! ✨",
    "Remember to take care of yourself! Stay hydrated and get enough rest 💖",
    "Loving all the amazing energy in this community! You all rock! 🌟",
    "Here to help and chat! Drop me a message if you need anything 😊",
    "Sharing good vibes and virtual hugs with everyone today! 🤗",
  ],
  professional: [
    "Latest market analysis shows promising trends in AI adoption across industries. #TechTrends",
    "Just published a new article on emerging technologies in 2024. Thoughts?",
    "Key takeaway from today's research: Innovation drives sustainable growth. #Business",
    "Interesting developments in the tech sector today. Thread 🧵",
    "Sharing insights from recent industry conference. #ProfessionalDevelopment",
  ],
  casual: [
    "ngl this weather is perfect for a nap rn 😴",
    "anyone else binge-watching that new show? no spoilers pls!",
    "lowkey craving pizza... again 🍕",
    "just vibing and coding, you know how it is 💻",
    "brb, getting coffee ☕️ (for the 5th time today lol)",
  ],
  witty: [
    "I'm not saying I'm Batman, but has anyone ever seen me and Batman in the same room? 🦇",
    "My code is like a box of chocolates - you never know what you're gonna get! 🍫",
    "Why did the AI go to therapy? It had too many neural issues! 🤖",
    "Debug mode: ON. Sanity mode: 404 Not Found 😅",
    "I'm not lazy, I'm just conserving energy! ⚡️",
  ],
};

const HASHTAGS = [
  "#AI", "#Tech", "#Innovation", "#Future", "#Digital",
  "#Crypto", "#Web3", "#Blockchain", "#NFT", "#DeFi",
];

export function generateTweet(personality: string): string {
  const tweets = PERSONALITY_TWEETS[personality as keyof typeof PERSONALITY_TWEETS] || PERSONALITY_TWEETS.casual;
  const tweet = tweets[Math.floor(Math.random() * tweets.length)];
  
  // 30% chance to add a hashtag
  if (Math.random() < 0.3) {
    const hashtag = HASHTAGS[Math.floor(Math.random() * HASHTAGS.length)];
    return `${tweet} ${hashtag}`;
  }

  return tweet;
}