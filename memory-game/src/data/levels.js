export const DEFAULT_LEVEL_ID = "easy";

export const LEVELS = {
  easy: {
    id: "easy",
    name: "Beginner",
    shortName: "Easy",
    icon: "🌱",
    gridLabel: "4 × 4",
    rows: 4,
    columns: 4,
    pairsCount: 8,
    totalCards: 16,
    scoreMultiplier: 1,
    previewSeconds: 4,
    focusTimeLimit: 90,
    sequenceLength: 4,
    mismatchPenalty: 3,
    description: "A calm introduction with fewer cards and a low cognitive load.",
    userGoal: "Understand the rules and build confidence.",
    memoryFocus: "Basic visual memory",
    recommendedFor: "First-time players",
    uiGuidance: "Large cards, clear spacing, and slower pacing."
  },

  medium: {
    id: "medium",
    name: "Intermediate",
    shortName: "Medium",
    icon: "⚡",
    gridLabel: "5 × 4",
    rows: 4,
    columns: 5,
    pairsCount: 10,
    totalCards: 20,
    scoreMultiplier: 1.35,
    previewSeconds: 3,
    focusTimeLimit: 75,
    sequenceLength: 6,
    mismatchPenalty: 5,
    description: "A balanced challenge with more information to remember.",
    userGoal: "Improve speed, attention, and pattern recognition.",
    memoryFocus: "Visual scanning and working memory",
    recommendedFor: "Players who already understand the game",
    uiGuidance: "Moderate density with strong visual hierarchy."
  },

  hard: {
    id: "hard",
    name: "Advanced",
    shortName: "Hard",
    icon: "🧠",
    gridLabel: "6 × 6",
    rows: 6,
    columns: 6,
    pairsCount: 18,
    totalCards: 36,
    scoreMultiplier: 2,
    previewSeconds: 2,
    focusTimeLimit: 60,
    sequenceLength: 8,
    mismatchPenalty: 8,
    description: "A demanding layout designed to test memory, attention, and persistence.",
    userGoal: "Maximize performance under higher cognitive load.",
    memoryFocus: "Complex visual memory and sustained attention",
    recommendedFor: "Experienced players",
    uiGuidance: "Compact grid, strong contrast, and immediate feedback."
  }
};

export const LEVEL_OPTIONS = Object.values(LEVELS).map((level) => ({
  id: level.id,
  name: level.name,
  shortName: level.shortName,
  icon: level.icon,
  gridLabel: level.gridLabel,
  rows: level.rows,
  columns: level.columns,
  pairsCount: level.pairsCount,
  totalCards: level.totalCards,
  description: level.description,
  memoryFocus: level.memoryFocus,
  recommendedFor: level.recommendedFor
}));

export function getLevelById(levelId) {
  return LEVELS[levelId] ?? LEVELS[DEFAULT_LEVEL_ID];
}

export function getGridStyle(levelId) {
  const level = getLevelById(levelId);

  return {
    gridTemplateColumns: `repeat(${level.columns}, minmax(0, 1fr))`
  };
}

export function getLevelIds() {
  return Object.keys(LEVELS);
}

export function isValidLevel(levelId) {
  return Boolean(LEVELS[levelId]);
}