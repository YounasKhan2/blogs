// Image Download Script for Blog Posts
// This script helps you download appropriate images for your tech blog posts

const imageRequests = [
  // Mobile Reviews
  {
    filename: "iphone-15-pro-max.jpg",
    searchTerm: "iphone-15-pro-max",
    unsplashQuery: "iphone,smartphone,apple,mobile",
    size: "1200x800"
  },
  {
    filename: "google-pixel-8-pro-vs-iphone-15-pro.jpg", 
    searchTerm: "smartphone-comparison",
    unsplashQuery: "smartphone,mobile,comparison,phones",
    size: "1200x800"
  },
  {
    filename: "iphone-16-pro-max-vs-galaxy-s25-ultra.jpg",
    searchTerm: "flagship-smartphones",
    unsplashQuery: "smartphones,mobile,technology,comparison",
    size: "1200x800"
  },
  {
    filename: "best-budget-smartphones-under-400-2025.jpg",
    searchTerm: "budget-smartphones",
    unsplashQuery: "smartphone,mobile,budget,phones",
    size: "1200x800"
  },
  {
    filename: "oneplus-12-review.jpg",
    searchTerm: "oneplus-smartphone",
    unsplashQuery: "smartphone,android,mobile,oneplus",
    size: "1200x800"
  },
  {
    filename: "samsung-galaxy-s24-ultra-review.jpg",
    searchTerm: "samsung-galaxy",
    unsplashQuery: "samsung,smartphone,galaxy,android",
    size: "1200x800"
  },
  {
    filename: "galaxy-s24-ultra.jpg",
    searchTerm: "samsung-galaxy-ultra",
    unsplashQuery: "samsung,smartphone,galaxy,ultra",
    size: "1200x800"
  },

  // Laptop Reviews
  {
    filename: "macbook-pro-m3-vs-dell-xps-15.jpg",
    searchTerm: "laptop-comparison",
    unsplashQuery: "laptop,macbook,computer,technology",
    size: "1200x800"
  },
  {
    filename: "macbook-pro-14-m4-2025-review.jpg",
    searchTerm: "macbook-pro-m4",
    unsplashQuery: "macbook,apple,laptop,computer",
    size: "1200x800"
  },
  {
    filename: "asus-rog-zephyrus-g16-review.jpg",
    searchTerm: "gaming-laptop",
    unsplashQuery: "gaming,laptop,computer,asus",
    size: "1200x800"
  },
  {
    filename: "framework-laptop-16-modular-review.jpg",
    searchTerm: "modular-laptop",
    unsplashQuery: "laptop,modular,computer,technology",
    size: "1200x800"
  },
  {
    filename: "lenovo-thinkpad-x1-carbon-gen-12.jpg",
    searchTerm: "business-laptop",
    unsplashQuery: "laptop,business,thinkpad,computer",
    size: "1200x800"
  },
  {
    filename: "best-gaming-laptops-under-1500-2025.jpg",
    searchTerm: "gaming-laptops",
    unsplashQuery: "gaming,laptop,computer,rgb",
    size: "1200x800"
  },

  // AI Technology
  {
    filename: "chatgpt-vs-claude.jpg",
    searchTerm: "ai-comparison",
    unsplashQuery: "artificial-intelligence,ai,robot,technology",
    size: "1200x800"
  },
  {
    filename: "claude-sonnet-vs-gpt4o-coding.jpg",
    searchTerm: "ai-coding",
    unsplashQuery: "coding,programming,ai,computer,screen",
    size: "1200x800"
  },
  {
    filename: "gemini-2-vs-chatgpt-5-comparison.jpg",
    searchTerm: "ai-assistants",
    unsplashQuery: "ai,artificial-intelligence,chatbot,technology",
    size: "1200x800"
  },
  {
    filename: "microsoft-copilot-vs-google-bard.jpg",
    searchTerm: "ai-productivity",
    unsplashQuery: "ai,productivity,office,computer,technology",
    size: "1200x800"
  },
  {
    filename: "gpt-5-vs-claude-4-2025-comparison.jpg",
    searchTerm: "ai-language-models",
    unsplashQuery: "ai,language,model,technology,robot",
    size: "1200x800"
  },
  {
    filename: "best-ai-video-generators-2025.jpg",
    searchTerm: "ai-video",
    unsplashQuery: "video,ai,creation,content,digital",
    size: "1200x800"
  },
  {
    filename: "ai-image-generation-tools-comparison.jpg",
    searchTerm: "ai-image-generation",
    unsplashQuery: "ai,image,generation,art,digital",
    size: "1200x800"
  },

  // Software Reviews
  {
    filename: "adobe-photoshop-2025-review.jpg",
    searchTerm: "photo-editing",
    unsplashQuery: "photoshop,editing,design,creative,computer",
    size: "1200x800"
  },
  {
    filename: "notion-vs-obsidian-2025-comparison.jpg",
    searchTerm: "note-taking-apps",
    unsplashQuery: "notes,productivity,app,writing,computer",
    size: "1200x800"
  },
  {
    filename: "davinci-resolve-vs-premiere-pro-2025.jpg",
    searchTerm: "video-editing",
    unsplashQuery: "video,editing,timeline,creative,computer",
    size: "1200x800"
  },
  {
    filename: "microsoft-office-vs-google-workspace.jpg",
    searchTerm: "office-productivity",
    unsplashQuery: "office,productivity,business,computer,software",
    size: "1200x800"
  },
  {
    filename: "figma-vs-adobe-xd-comparison.jpg",
    searchTerm: "ui-design-tools",
    unsplashQuery: "design,ui,interface,creative,software",
    size: "1200x800"
  },
  {
    filename: "password-managers-comparison.jpg",
    searchTerm: "cybersecurity-password",
    unsplashQuery: "security,password,protection,cybersecurity,lock",
    size: "1200x800"
  },
  {
    filename: "slack-vs-teams-communication.jpg",
    searchTerm: "team-communication",
    unsplashQuery: "communication,team,chat,collaboration,business",
    size: "1200x800"
  },
  {
    filename: "antivirus-software-comparison.jpg",
    searchTerm: "antivirus-security",
    unsplashQuery: "antivirus,security,protection,shield,computer",
    size: "1200x800"
  },
  {
    filename: "code-editors-comparison.jpg",
    searchTerm: "programming-code-editor",
    unsplashQuery: "coding,programming,developer,computer,screen",
    size: "1200x800"
  },

  // Accessories & Gadgets
  {
    filename: "best-gaming-headsets-2025.jpg",
    searchTerm: "gaming-headsets",
    unsplashQuery: "headset,gaming,audio,microphone",
    size: "1200x800"
  },
  {
    filename: "best-wireless-mice-2025.jpg",
    searchTerm: "wireless-mouse",
    unsplashQuery: "mouse,wireless,computer,peripheral",
    size: "1200x800"
  },
  {
    filename: "best-wireless-earbuds-2025.jpg",
    searchTerm: "wireless-earbuds",
    unsplashQuery: "earbuds,wireless,audio,bluetooth",
    size: "1200x800"
  },
  {
    filename: "best-smart-home-devices-2025.jpg",
    searchTerm: "smart-home",
    unsplashQuery: "smart,home,iot,automation,technology",
    size: "1200x800"
  },

  // How-to Guides
  {
    filename: "speed-up-computer-guide.jpg",
    searchTerm: "computer-optimization",
    unsplashQuery: "computer,performance,speed,optimization",
    size: "1200x800"
  },
  {
    filename: "how-to-build-gaming-pc-budget-2025.jpg",
    searchTerm: "pc-building",
    unsplashQuery: "pc,building,computer,components,gaming",
    size: "1200x800"
  },
  {
    filename: "home-office-setup-guide-2025.jpg",
    searchTerm: "home-office",
    unsplashQuery: "home,office,desk,setup,workspace",
    size: "1200x800"
  },
  {
    filename: "digital-security-guide-2025.jpg",
    searchTerm: "cybersecurity",
    unsplashQuery: "security,cybersecurity,lock,protection,digital",
    size: "1200x800"
  }
];

// Instructions for downloading images:
console.log("=== Blog Post Image Download Guide ===\n");

console.log("Method 1: Unsplash (Free, High Quality)");
console.log("1. Visit https://unsplash.com");
console.log("2. Search for the terms below");
console.log("3. Download images at 1200x800 resolution");
console.log("4. Save to public/images/posts/ with the exact filename\n");

console.log("Method 2: Automated Script URLs");
console.log("Use these direct Unsplash URLs (may change):\n");

imageRequests.forEach((img, index) => {
  const unsplashUrl = `https://source.unsplash.com/1200x800/?${img.unsplashQuery.replace(/,/g, ',')}`;
  console.log(`${index + 1}. ${img.filename}`);
  console.log(`   Search: ${img.unsplashQuery}`);
  console.log(`   URL: ${unsplashUrl}`);
  console.log(`   Save as: public/images/posts/${img.filename}\n`);
});

console.log("Method 3: Alternative Free Stock Photo Sites:");
console.log("- Pixabay: https://pixabay.com");
console.log("- Pexels: https://pexels.com"); 
console.log("- StockVault: https://stockvault.net");
console.log("- Burst: https://burst.shopify.com\n");

console.log("Method 4: AI Generated Images:");
console.log("- Midjourney: https://midjourney.com");
console.log("- DALL-E: https://openai.com/dall-e");
console.log("- Stable Diffusion: https://stablediffusionweb.com\n");

// Export the list for programmatic use
module.exports = { imageRequests };
