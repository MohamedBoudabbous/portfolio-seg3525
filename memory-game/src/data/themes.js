export const DEFAULT_THEME_ID = "animals";

export const THEMES = {
  animals: {
    id: "animals",
    name: "Animals",
    iconName: "animal",
    description: "Friendly animal symbols designed for fast visual recognition.",
    memoryFocus: "Visual association",
    accent: "#f59e0b",
    cards: [
      { id: "dog", symbolName: "animal-paw", label: "Dog" },
      { id: "cat", symbolName: "animal-claw", label: "Cat" },
      { id: "bear", symbolName: "animal-spot", label: "Bear" },
      { id: "fox", symbolName: "animal-tail", label: "Fox" },
      { id: "panda", symbolName: "animal-stripe", label: "Panda" },
      { id: "lion", symbolName: "animal-horn", label: "Lion" },
      { id: "frog", symbolName: "animal-web", label: "Frog" },
      { id: "tiger", symbolName: "animal-scale", label: "Tiger" },
      { id: "monkey", symbolName: "animal-ear", label: "Monkey" },
      { id: "koala", symbolName: "animal-hoof", label: "Koala" },
      { id: "rabbit", symbolName: "animal-beak", label: "Rabbit" },
      { id: "penguin", symbolName: "animal-wing", label: "Penguin" },
      { id: "owl", symbolName: "animal-feather", label: "Owl" },
      { id: "duck", symbolName: "animal-fin", label: "Duck" },
      { id: "whale", symbolName: "animal-fish", label: "Whale" },
      { id: "dolphin", symbolName: "animal-shell", label: "Dolphin" },
      { id: "butterfly", symbolName: "animal-bug", label: "Butterfly" },
      { id: "unicorn", symbolName: "animal-antler", label: "Unicorn" }
    ]
  },

  space: {
    id: "space",
    name: "Space",
    iconName: "space",
    description: "High-contrast cosmic symbols for attention and pattern recall.",
    memoryFocus: "Symbol recognition",
    accent: "#8b5cf6",
    cards: [
      { id: "rocket", symbolName: "space-rocket", label: "Rocket" },
      { id: "planet", symbolName: "space-planet", label: "Planet" },
      { id: "star", symbolName: "space-star", label: "Star" },
      { id: "moon", symbolName: "space-moon", label: "Moon" },
      { id: "sun", symbolName: "space-sun", label: "Sun" },
      { id: "comet", symbolName: "space-comet", label: "Comet" },
      { id: "alien", symbolName: "space-orbit", label: "Orbit" },
      { id: "satellite", symbolName: "space-satellite", label: "Satellite" },
      { id: "milky-way", symbolName: "space-galaxy", label: "Galaxy" },
      { id: "astronaut", symbolName: "space-capsule", label: "Capsule" },
      { id: "ufo", symbolName: "space-eclipse", label: "Eclipse" },
      { id: "earth", symbolName: "space-radar", label: "Radar" },
      { id: "mars", symbolName: "space-asteroid", label: "Asteroid" },
      { id: "telescope", symbolName: "space-telescope", label: "Telescope" },
      { id: "night", symbolName: "space-constellation", label: "Constellation" },
      { id: "sparkles", symbolName: "space-spark", label: "Spark" },
      { id: "orbit", symbolName: "space-meteor", label: "Meteor" },
      { id: "black-hole", symbolName: "space-blackhole", label: "Black Hole" }
    ]
  },

  food: {
    id: "food",
    name: "Food",
    iconName: "food",
    description: "Clean food symbols that support quick categorization and recall.",
    memoryFocus: "Category memory",
    accent: "#ef4444",
    cards: [
      { id: "apple", symbolName: "food-apple", label: "Apple" },
      { id: "banana", symbolName: "food-citrus", label: "Citrus" },
      { id: "grapes", symbolName: "food-berry", label: "Berry" },
      { id: "strawberry", symbolName: "food-leaf", label: "Herb" },
      { id: "watermelon", symbolName: "food-slice", label: "Slice" },
      { id: "pizza", symbolName: "food-plate", label: "Plate" },
      { id: "burger", symbolName: "food-bread", label: "Bread" },
      { id: "fries", symbolName: "food-fork", label: "Fork" },
      { id: "taco", symbolName: "food-spoon", label: "Spoon" },
      { id: "sushi", symbolName: "food-bowl", label: "Bowl" },
      { id: "ramen", symbolName: "food-steam", label: "Steam" },
      { id: "rice", symbolName: "food-grain", label: "Grain" },
      { id: "cake", symbolName: "food-cake", label: "Cake" },
      { id: "donut", symbolName: "food-cookie", label: "Cookie" },
      { id: "cookie", symbolName: "food-drop", label: "Drop" },
      { id: "ice-cream", symbolName: "food-cone", label: "Cone" },
      { id: "coffee", symbolName: "food-cup", label: "Cup" },
      { id: "popcorn", symbolName: "food-bottle", label: "Bottle" }
    ]
  },

  nature: {
    id: "nature",
    name: "Nature",
    iconName: "leaf",
    description: "Organic line symbols for relaxed memory practice.",
    memoryFocus: "Spatial memory",
    accent: "#10b981",
    cards: [
      { id: "tree", symbolName: "nature-tree", label: "Tree" },
      { id: "pine", symbolName: "nature-branch", label: "Branch" },
      { id: "flower", symbolName: "nature-flower", label: "Flower" },
      { id: "rose", symbolName: "nature-leaf", label: "Leaf" },
      { id: "sunflower", symbolName: "nature-sun", label: "Sun" },
      { id: "leaf", symbolName: "nature-sprout", label: "Sprout" },
      { id: "maple", symbolName: "nature-seed", label: "Seed" },
      { id: "mushroom", symbolName: "nature-root", label: "Root" },
      { id: "cactus", symbolName: "nature-stone", label: "Stone" },
      { id: "mountain", symbolName: "nature-mountain", label: "Mountain" },
      { id: "volcano", symbolName: "nature-fire", label: "Fire" },
      { id: "ocean", symbolName: "nature-wave", label: "Wave" },
      { id: "rainbow", symbolName: "nature-wind", label: "Wind" },
      { id: "cloud", symbolName: "nature-cloud", label: "Cloud" },
      { id: "rain", symbolName: "nature-rain", label: "Rain" },
      { id: "snowflake", symbolName: "nature-snow", label: "Snow" },
      { id: "fire", symbolName: "nature-drop", label: "Drop" },
      { id: "seedling", symbolName: "nature-moon", label: "Moon" }
    ]
  }
};

export const THEME_OPTIONS = Object.values(THEMES).map((theme) => ({
  id: theme.id,
  name: theme.name,
  iconName: theme.iconName,
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

export function getThemeIds() {
  return Object.keys(THEMES);
}

export function isValidTheme(themeId) {
  return Boolean(THEMES[themeId]);
}