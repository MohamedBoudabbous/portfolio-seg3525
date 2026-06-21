export const DEFAULT_MODE_ID = "classic";

export const MODES = {
  classic: {
    id: "classic",
    name: "Classic Match",
    shortName: "Match",
    icon: "🃏",
    tagline: "Find every hidden pair.",
    description:
      "A classic memory card game where the player flips two cards at a time and tries to remember their positions.",
    memoryFocus: "Visual memory and spatial recall",
    cognitiveSkills: ["Visual recognition", "Spatial memory", "Attention"],
    interactionPattern: "Flip two cards, compare them, and remember their locations.",
    feedbackStyle: "Immediate visual feedback for matches and mismatches.",
    difficultyBehavior:
      "Higher levels increase the number of cards and the amount of information to retain.",
    uxGoal:
      "Keep the rules instantly understandable while providing clear feedback and a satisfying sense of progression.",
    bestFor: "Players who want a familiar, accessible memory challenge.",
    primaryMetric: "Pairs found",
    secondaryMetric: "Moves",
    route: "classic"
  },

  sequence: {
    id: "sequence",
    name: "Sequence Recall",
    shortName: "Sequence",
    icon: "🔢",
    tagline: "Memorize the order.",
    description:
      "A sequence-based memory mode where the player studies a short pattern and must reproduce it in the correct order.",
    memoryFocus: "Working memory and sequential recall",
    cognitiveSkills: ["Short-term memory", "Order recall", "Concentration"],
    interactionPattern:
      "Observe a temporary sequence, wait for it to disappear, then select the cards in the same order.",
    feedbackStyle:
      "Step-by-step feedback showing whether the recalled order is correct.",
    difficultyBehavior:
      "Higher levels reduce preview time and increase the length of the sequence.",
    uxGoal:
      "Guide the player through memorization and recall phases without creating confusion.",
    bestFor: "Players who want a more cognitive and focused memory task.",
    primaryMetric: "Sequence accuracy",
    secondaryMetric: "Recall time",
    route: "sequence"
  },

  focus: {
    id: "focus",
    name: "Focus Challenge",
    shortName: "Focus",
    icon: "⏱️",
    tagline: "Match fast under pressure.",
    description:
      "A timed challenge mode where the player must find pairs quickly while avoiding costly mistakes.",
    memoryFocus: "Sustained attention and decision speed",
    cognitiveSkills: ["Attention control", "Fast recall", "Error management"],
    interactionPattern:
      "Play the matching game under a time limit, with penalties for incorrect attempts.",
    feedbackStyle:
      "Stronger visual feedback, time pressure, and score changes after each action.",
    difficultyBehavior:
      "Higher levels reduce the available time and increase mismatch penalties.",
    uxGoal:
      "Create intensity while keeping the interface readable, fair, and easy to understand.",
    bestFor: "Players who want a faster and more competitive experience.",
    primaryMetric: "Score",
    secondaryMetric: "Remaining time",
    route: "focus"
  }
};

export const MODE_OPTIONS = Object.values(MODES).map((mode) => ({
  id: mode.id,
  name: mode.name,
  shortName: mode.shortName,
  icon: mode.icon,
  tagline: mode.tagline,
  description: mode.description,
  memoryFocus: mode.memoryFocus,
  cognitiveSkills: mode.cognitiveSkills,
  bestFor: mode.bestFor,
  primaryMetric: mode.primaryMetric,
  secondaryMetric: mode.secondaryMetric
}));

export function getModeById(modeId) {
  return MODES[modeId] ?? MODES[DEFAULT_MODE_ID];
}

export function getModeIds() {
  return Object.keys(MODES);
}

export function isValidMode(modeId) {
  return Boolean(MODES[modeId]);
}