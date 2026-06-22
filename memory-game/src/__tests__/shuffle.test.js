import { describe, expect, it } from "vitest";

import { createShuffledPairs, shuffle } from "../utils/shuffle";

const sampleCards = [
  { id: "alpha", label: "Alpha", symbolName: "space-star" },
  { id: "beta", label: "Beta", symbolName: "space-moon" },
  { id: "gamma", label: "Gamma", symbolName: "space-sun" }
];

describe("shuffle", () => {
  it("returns a new array", () => {
    const original = [1, 2, 3, 4];
    const result = shuffle(original, () => 0.5);

    expect(result).not.toBe(original);
    expect(result).toHaveLength(original.length);
  });

  it("keeps the same elements", () => {
    const original = ["a", "b", "c", "d"];
    const result = shuffle(original, () => 0.25);

    expect([...result].sort()).toEqual([...original].sort());
  });

  it("does not mutate the original array", () => {
    const original = [1, 2, 3, 4];
    const snapshot = [...original];

    shuffle(original, () => 0);

    expect(original).toEqual(snapshot);
  });

  it("throws when the input is not an array", () => {
    expect(() => shuffle("not-array")).toThrow(TypeError);
  });
});

describe("createShuffledPairs", () => {
  it("creates two cards for each selected pair", () => {
    const pairs = createShuffledPairs(sampleCards, 2, () => 0.5);

    expect(pairs).toHaveLength(4);
  });

  it("adds uid and pairId to every created card", () => {
    const pairs = createShuffledPairs(sampleCards, 2, () => 0.5);

    for (const card of pairs) {
      expect(card.uid).toMatch(/-(a|b)$/);
      expect(card.pairId).toBe(card.id);
      expect(card.isFlipped).toBe(false);
      expect(card.isMatched).toBe(false);
      expect(card.isWrong).toBe(false);
    }
  });

  it("creates exactly two cards for each pairId", () => {
    const pairs = createShuffledPairs(sampleCards, 3, () => 0.5);

    const counts = pairs.reduce((accumulator, card) => {
      accumulator[card.pairId] = (accumulator[card.pairId] ?? 0) + 1;
      return accumulator;
    }, {});

    expect(counts).toEqual({
      alpha: 2,
      beta: 2,
      gamma: 2
    });
  });

  it("throws when pairsCount is invalid", () => {
    expect(() => createShuffledPairs(sampleCards, 0)).toThrow(RangeError);
    expect(() => createShuffledPairs(sampleCards, -1)).toThrow(RangeError);
    expect(() => createShuffledPairs(sampleCards, 1.5)).toThrow(RangeError);
    expect(() => createShuffledPairs(sampleCards, 4)).toThrow(RangeError);
  });
});