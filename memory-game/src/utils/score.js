import { getLevelById } from "../data/levels";

const MODE_MULTIPLIERS = {
  classic: 1,
  sequence: 1.2,
  focus: 1.35
};

const RANKS = [
  {
    minRatio: 0.9,
    label: "Elite Memory",
    message: "Outstanding speed, accuracy, and recall.",
    icon: "🏆"
  },
  {
    minRatio: 0.75,
    label: "Excellent",
    message: "Strong memory performance with very few inefficiencies.",
    icon: "✨"
  },
  {
    minRatio: 0.55,
    label: "Good",
    message: "Solid performance with room to improve speed or precision.",
    icon: "💪"
  },
  {
    minRatio: 0.35,
    label: "Developing",
    message: "Good effort. Try focusing on card positions before moving fast.",
    icon: "🌱"
  },
  {
    minRatio: 0,
    label: "Practice Run",
    message: "Keep training. Memory improves with repeated attempts.",
    icon: "🔁"
  }
];

function toSafeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function calculateAccuracy({ moves = 0, totalPairs = 0, mistakes = 0 }) {
  const safeMoves = Math.max(0, Math.floor(toSafeNumber(moves)));
  const safePairs = Math.max(0, Math.floor(toSafeNumber(totalPairs)));
  const safeMistakes = Math.max(0, Math.floor(toSafeNumber(mistakes)));

  if (safePairs === 0) {
    return 0;
  }

  if (safeMoves === 0) {
    return 100;
  }

  const moveEfficiency = safePairs / safeMoves;
  const mistakePenalty = safeMistakes * 3;
  const accuracy = moveEfficiency * 100 - mistakePenalty;

  return Math.round(clamp(accuracy, 0, 100));
}

export function calculateMaxScore({ levelId = "easy", modeId = "classic", totalPairs }) {
  const level = getLevelById(levelId);
  const safePairs = Math.max(1, Math.floor(toSafeNumber(totalPairs, level.pairsCount)));
  const modeMultiplier = MODE_MULTIPLIERS[modeId] ?? MODE_MULTIPLIERS.classic;

  return Math.round(safePairs * 120 * level.scoreMultiplier * modeMultiplier + safePairs * 40);
}

export function calculateScore({
  levelId = "easy",
  modeId = "classic",
  moves = 0,
  seconds = 0,
  totalPairs,
  mistakes = 0,
  remainingTime = 0,
  completed = true
} = {}) {
  const level = getLevelById(levelId);
  const safePairs = Math.max(1, Math.floor(toSafeNumber(totalPairs, level.pairsCount)));
  const safeMoves = Math.max(0, Math.floor(toSafeNumber(moves)));
  const safeSeconds = Math.max(0, Math.floor(toSafeNumber(seconds)));
  const safeMistakes = Math.max(0, Math.floor(toSafeNumber(mistakes)));
  const safeRemainingTime = Math.max(0, Math.floor(toSafeNumber(remainingTime)));
  const modeMultiplier = MODE_MULTIPLIERS[modeId] ?? MODE_MULTIPLIERS.classic;

  const maxScore = calculateMaxScore({
    levelId,
    modeId,
    totalPairs: safePairs
  });

  const idealMoves = safePairs;
  const extraMoves = Math.max(0, safeMoves - idealMoves);

  const completionBonus = completed ? safePairs * 40 : 0;
  const speedBonus = modeId === "focus" ? safeRemainingTime * 6 : Math.max(0, 90 - safeSeconds) * 2;
  const baseScore = safePairs * 120 * level.scoreMultiplier * modeMultiplier;

  const timePenalty = safeSeconds * (modeId === "focus" ? 2.5 : 1.6);
  const movePenalty = extraMoves * 14;
  const mistakePenalty = safeMistakes * level.mismatchPenalty * 8;

  const rawScore = baseScore + completionBonus + speedBonus - timePenalty - movePenalty - mistakePenalty;
  const finalScore = completed ? rawScore : rawScore * 0.35;

  return Math.round(clamp(finalScore, 0, maxScore));
}

export function getScoreRatio(score, maxScore) {
  const safeScore = Math.max(0, toSafeNumber(score));
  const safeMaxScore = Math.max(1, toSafeNumber(maxScore, 1));

  return clamp(safeScore / safeMaxScore, 0, 1);
}

export function getScoreRank(score, maxScore) {
  const ratio = getScoreRatio(score, maxScore);

  return RANKS.find((rank) => ratio >= rank.minRatio) ?? RANKS[RANKS.length - 1];
}

export function getStarRating(score, maxScore) {
  const ratio = getScoreRatio(score, maxScore);

  if (ratio >= 0.9) return 5;
  if (ratio >= 0.75) return 4;
  if (ratio >= 0.55) return 3;
  if (ratio >= 0.35) return 2;
  if (ratio > 0) return 1;

  return 0;
}

export function createScoreSummary({
  levelId = "easy",
  modeId = "classic",
  moves = 0,
  seconds = 0,
  totalPairs,
  mistakes = 0,
  remainingTime = 0,
  completed = true
} = {}) {
  const level = getLevelById(levelId);
  const safePairs = Math.max(1, Math.floor(toSafeNumber(totalPairs, level.pairsCount)));

  const score = calculateScore({
    levelId,
    modeId,
    moves,
    seconds,
    totalPairs: safePairs,
    mistakes,
    remainingTime,
    completed
  });

  const maxScore = calculateMaxScore({
    levelId,
    modeId,
    totalPairs: safePairs
  });

  const accuracy = calculateAccuracy({
    moves,
    totalPairs: safePairs,
    mistakes
  });

  const rank = getScoreRank(score, maxScore);
  const stars = getStarRating(score, maxScore);

  return {
    score,
    maxScore,
    accuracy,
    rank,
    stars,
    ratio: getScoreRatio(score, maxScore)
  };
}

export function createScoreEntry({
  modeId,
  levelId,
  themeId,
  score,
  maxScore,
  moves,
  seconds,
  mistakes = 0,
  accuracy,
  completed = true
}) {
  return {
    id: crypto.randomUUID(),
    modeId,
    levelId,
    themeId,
    score: Math.max(0, Math.round(toSafeNumber(score))),
    maxScore: Math.max(1, Math.round(toSafeNumber(maxScore, 1))),
    moves: Math.max(0, Math.floor(toSafeNumber(moves))),
    seconds: Math.max(0, Math.floor(toSafeNumber(seconds))),
    mistakes: Math.max(0, Math.floor(toSafeNumber(mistakes))),
    accuracy: Math.round(clamp(toSafeNumber(accuracy), 0, 100)),
    completed: Boolean(completed),
    createdAt: new Date().toISOString()
  };
}

export function sortScores(scores) {
  if (!Array.isArray(scores)) {
    return [];
  }

  return [...scores].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.seconds !== b.seconds) return a.seconds - b.seconds;
    if (a.moves !== b.moves) return a.moves - b.moves;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function keepBestScores(scores, limit = 5) {
  const safeLimit = Math.max(1, Math.floor(toSafeNumber(limit, 5)));

  return sortScores(scores).slice(0, safeLimit);
}