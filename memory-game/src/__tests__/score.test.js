import { describe, expect, it } from "vitest";

import {
  calculateAccuracy,
  calculateMaxScore,
  calculateScore,
  getScoreRank,
  getStarRating,
  keepBestScores,
  sortScores
} from "../utils/score";

describe("calculateAccuracy", () => {
  it("returns 0 when there are no pairs or moves", () => {
    expect(calculateAccuracy({ moves: 0, totalPairs: 8, mistakes: 0 })).toBe(0);
    expect(calculateAccuracy({ moves: 10, totalPairs: 0, mistakes: 0 })).toBe(0);
  });

  it("rewards efficient play and penalizes mistakes", () => {
    const perfect = calculateAccuracy({
      moves: 8,
      totalPairs: 8,
      mistakes: 0
    });

    const messy = calculateAccuracy({
      moves: 24,
      totalPairs: 8,
      mistakes: 10
    });

    expect(perfect).toBe(100);
    expect(messy).toBeLessThan(perfect);
    expect(messy).toBeGreaterThanOrEqual(0);
  });
});

describe("calculateMaxScore", () => {
  it("returns a positive max score", () => {
    const maxScore = calculateMaxScore({
      levelId: "easy",
      modeId: "classic",
      totalPairs: 8
    });

    expect(maxScore).toBeGreaterThan(0);
  });

  it("gives higher max score for harder levels", () => {
    const easy = calculateMaxScore({
      levelId: "easy",
      modeId: "classic",
      totalPairs: 8
    });

    const hard = calculateMaxScore({
      levelId: "hard",
      modeId: "classic",
      totalPairs: 18
    });

    expect(hard).toBeGreaterThan(easy);
  });
});

describe("calculateScore", () => {
  it("returns a score inside the valid score range", () => {
    const maxScore = calculateMaxScore({
      levelId: "easy",
      modeId: "classic",
      totalPairs: 8
    });

    const score = calculateScore({
      levelId: "easy",
      modeId: "classic",
      moves: 12,
      seconds: 40,
      totalPairs: 8,
      mistakes: 4,
      completed: true
    });

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(maxScore);
  });

  it("rewards faster and cleaner play", () => {
    const strongScore = calculateScore({
      levelId: "medium",
      modeId: "classic",
      moves: 14,
      seconds: 45,
      totalPairs: 10,
      mistakes: 2,
      completed: true
    });

    const weakScore = calculateScore({
      levelId: "medium",
      modeId: "classic",
      moves: 40,
      seconds: 120,
      totalPairs: 10,
      mistakes: 25,
      completed: true
    });

    expect(strongScore).toBeGreaterThan(weakScore);
  });

  it("penalizes incomplete games", () => {
    const completed = calculateScore({
      levelId: "easy",
      modeId: "classic",
      moves: 12,
      seconds: 40,
      totalPairs: 8,
      mistakes: 3,
      completed: true
    });

    const incomplete = calculateScore({
      levelId: "easy",
      modeId: "classic",
      moves: 12,
      seconds: 40,
      totalPairs: 8,
      mistakes: 3,
      completed: false
    });

    expect(completed).toBeGreaterThan(incomplete);
  });
});

describe("rank and stars", () => {
  it("returns the correct score rank", () => {
    expect(getScoreRank(95, 100).label).toBe("Elite Memory");
    expect(getScoreRank(80, 100).label).toBe("Excellent");
    expect(getScoreRank(60, 100).label).toBe("Good");
    expect(getScoreRank(40, 100).label).toBe("Developing");
    expect(getScoreRank(10, 100).label).toBe("Practice Run");
  });

  it("returns a star rating from 0 to 5", () => {
    expect(getStarRating(95, 100)).toBe(5);
    expect(getStarRating(80, 100)).toBe(4);
    expect(getStarRating(60, 100)).toBe(3);
    expect(getStarRating(40, 100)).toBe(2);
    expect(getStarRating(10, 100)).toBe(1);
    expect(getStarRating(0, 100)).toBe(0);
  });
});

describe("score sorting", () => {
  const scores = [
    {
      id: "a",
      score: 500,
      seconds: 60,
      moves: 20,
      createdAt: "2026-01-01T10:00:00.000Z"
    },
    {
      id: "b",
      score: 900,
      seconds: 90,
      moves: 25,
      createdAt: "2026-01-01T10:00:00.000Z"
    },
    {
      id: "c",
      score: 900,
      seconds: 50,
      moves: 30,
      createdAt: "2026-01-01T10:00:00.000Z"
    },
    {
      id: "d",
      score: 900,
      seconds: 50,
      moves: 18,
      createdAt: "2026-01-01T10:00:00.000Z"
    }
  ];

  it("sorts by score, then time, then moves", () => {
    expect(sortScores(scores).map((score) => score.id)).toEqual([
      "d",
      "c",
      "b",
      "a"
    ]);
  });

  it("keeps only the best scores", () => {
    expect(keepBestScores(scores, 2).map((score) => score.id)).toEqual([
      "d",
      "c"
    ]);
  });

  it("returns an empty array for invalid score lists", () => {
    expect(sortScores(null)).toEqual([]);
  });
});