export const DEFAULT_THEME_ID = "animals";

export const THEMES = {
  animals: {
    id: "animals",
    name: "Animals",
    icon: "🐾",
    description: "Friendly animal cards designed for fast visual recognition.",
    memoryFocus: "Visual association",
    accent: "#f59e0b",
    cards: [
      { id: "dog", emoji: "🐶", label: "Dog" },
      { id: "cat", emoji: "🐱", label: "Cat" },
      { id: "bear", emoji: "🐻", label: "Bear" },
      { id: "fox", emoji: "🦊", label: "Fox" },
      { id: "panda", emoji: "🐼", label: "Panda" },
      { id: "lion", emoji: "🦁", label: "Lion" },
      { id: "frog", emoji: "🐸", label: "Frog" },
      { id: "tiger", emoji: "🐯", label: "Tiger" },
      { id: "monkey", emoji: "🐵", label: "Monkey" },
      { id: "koala", emoji: "🐨", label: "Koala" },
      { id: "rabbit", emoji: "🐰", label: "Rabbit" },
      { id: "penguin", emoji: "🐧", label: "Penguin" },
      { id: "owl", emoji: "🦉", label: "Owl" },
      { id: "duck", emoji: "🦆", label: "Duck" },
      { id: "whale", emoji: "🐳", label: "Whale" },
      { id: "dolphin", emoji: "🐬", label: "Dolphin" },
      { id: "butterfly", emoji: "🦋", label: "Butterfly" },
      { id: "unicorn", emoji: "🦄", label: "Unicorn" }
    ]
  },

  space: {
    id: "space",
    name: "Space",
    icon: "🚀",
    description: "High-contrast cosmic symbols for attention and pattern recall.",
    memoryFocus: "Symbol recognition",
    accent: "#8b5cf6",
    cards: [
      { id: "rocket", emoji: "🚀", label: "Rocket" },
      { id: "planet", emoji: "🪐", label: "Planet" },
      { id: "star", emoji: "⭐", label: "Star" },
      { id: "moon", emoji: "🌙", label: "Moon" },
      { id: "sun", emoji: "☀️", label: "Sun" },
      { id: "comet", emoji: "☄️", label: "Comet" },
      { id: "alien", emoji: "👽", label: "Alien" },
      { id: "satellite", emoji: "🛰️", label: "Satellite" },
      { id: "milky-way", emoji: "🌌", label: "Galaxy" },
      { id: "astronaut", emoji: "🧑‍🚀", label: "Astronaut" },
      { id: "ufo", emoji: "🛸", label: "UFO" },
      { id: "earth", emoji: "🌍", label: "Earth" },
      { id: "mars", emoji: "🔴", label: "Mars" },
      { id: "telescope", emoji: "🔭", label: "Telescope" },
      { id: "night", emoji: "🌠", label: "Shooting Star" },
      { id: "sparkles", emoji: "✨", label: "Sparkles" },
      { id: "orbit", emoji: "💫", label: "Orbit" },
      { id: "black-hole", emoji: "🕳️", label: "Black Hole" }
    ]
  },

  food: {
    id: "food",
    name: "Food",
    icon: "🍽️",
    description: "Colorful food icons that support quick categorization and recall.",
    memoryFocus: "Category memory",
    accent: "#ef4444",
    cards: [
      { id: "apple", emoji: "🍎", label: "Apple" },
      { id: "banana", emoji: "🍌", label: "Banana" },
      { id: "grapes", emoji: "🍇", label: "Grapes" },
      { id: "strawberry", emoji: "🍓", label: "Strawberry" },
      { id: "watermelon", emoji: "🍉", label: "Watermelon" },
      { id: "pizza", emoji: "🍕", label: "Pizza" },
      { id: "burger", emoji: "🍔", label: "Burger" },
      { id: "fries", emoji: "🍟", label: "Fries" },
      { id: "taco", emoji: "🌮", label: "Taco" },
      { id: "sushi", emoji: "🍣", label: "Sushi" },
      { id: "ramen", emoji: "🍜", label: "Ramen" },
      { id: "rice", emoji: "🍚", label: "Rice" },
      { id: "cake", emoji: "🍰", label: "Cake" },
      { id: "donut", emoji: "🍩", label: "Donut" },
      { id: "cookie", emoji: "🍪", label: "Cookie" },
      { id: "ice-cream", emoji: "🍦", label: "Ice Cream" },
      { id: "coffee", emoji: "☕", label: "Coffee" },
      { id: "popcorn", emoji: "🍿", label: "Popcorn" }
    ]
  },

  nature: {
    id: "nature",
    name: "Nature",
    icon: "🌿",
    description: "Organic shapes and calming visuals for relaxed memory practice.",
    memoryFocus: "Spatial memory",
    accent: "#10b981",
    cards: [
      { id: "tree", emoji: "🌳", label: "Tree" },
      { id: "pine", emoji: "🌲", label: "Pine Tree" },
      { id: "flower", emoji: "🌸", label: "Flower" },
      { id: "rose", emoji: "🌹", label: "Rose" },
      { id: "sunflower", emoji: "🌻", label: "Sunflower" },
      { id: "leaf", emoji: "🍃", label: "Leaf" },
      { id: "maple", emoji: "🍁", label: "Maple Leaf" },
      { id: "mushroom", emoji: "🍄", label: "Mushroom" },
      { id: "cactus", emoji: "🌵", label: "Cactus" },
      { id: "mountain", emoji: "⛰️", label: "Mountain" },
      { id: "volcano", emoji: "🌋", label: "Volcano" },
      { id: "ocean", emoji: "🌊", label: "Ocean" },
      { id: "rainbow", emoji: "🌈", label: "Rainbow" },
      { id: "cloud", emoji: "☁️", label: "Cloud" },
      { id: "rain", emoji: "🌧️", label: "Rain" },
      { id: "snowflake", emoji: "❄️", label: "Snowflake" },
      { id: "fire", emoji: "🔥", label: "Fire" },
      { id: "seedling", emoji: "🌱", label: "Seedling" }
    ]
  }
};

export const THEME_OPTIONS = Object.values(THEMES).map((theme) => ({
  id: theme.id,
  name: theme.name,
  icon: theme.icon,
  description: theme.description,
  memoryFocus: theme.memoryFocus,
  accent: theme.accent
}));

export function getThemeById(themeId) {
  return THEMES[themeId] ?? THEMES[DEFAULT_THEME_ID];
}

export function getThemeCards(themeId) {
  return getThemeById(themeId).cards;
}