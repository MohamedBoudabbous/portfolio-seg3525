import { describe, expect, it } from "vitest";

import {
  GAME_ACTIONS,
  GAME_STATUS,
  RESULT_TYPES,
  createGameState,
  gameReducer,
  initialGameState,
  selectCanFlip,
  selectIsComplete,
  selectProgress,
  selectSelectedCardsMatch
} from "../utils/gameReducer";

function createCards() {
  return [
    {
      uid: "alpha-a",
      id: "alpha",
      pairId: "alpha",
      label: "Alpha"
    },
    {
      uid: "alpha-b",
      id: "alpha",
      pairId: "alpha",
      label: "Alpha"
    },
    {
      uid: "beta-a",
      id: "beta",
      pairId: "beta",
      label: "Beta"
    },
    {
      uid: "beta-b",
      id: "beta",
      pairId: "beta",
      label: "Beta"
    }
  ];
}

function startState() {
  return gameReducer(initialGameState, {
    type: GAME_ACTIONS.START_GAME,
    cards: createCards(),
    totalPairs: 2
  });
}

describe("gameReducer", () => {
  it("START_GAME creates the game state", () => {
    const state = startState();

    expect(state.status).toBe(GAME_STATUS.PLAYING);
    expect(state.cards).toHaveLength(4);
    expect(state.totalPairs).toBe(2);
    expect(state.moves).toBe(0);
    expect(state.mistakes).toBe(0);
    expect(state.startedAt).toEqual(expect.any(Number));
  });

  it("FLIP_CARD flips one card", () => {
    const state = gameReducer(startState(), {
      type: GAME_ACTIONS.FLIP_CARD,
      uid: "alpha-a"
    });

    expect(state.cards.find((card) => card.uid === "alpha-a").isFlipped).toBe(true);
    expect(state.selectedCards).toEqual(["alpha-a"]);
    expect(state.status).toBe(GAME_STATUS.PLAYING);
    expect(state.moves).toBe(0);
  });

  it("FLIP_CARD moves to checking after two selected cards", () => {
    const firstFlip = gameReducer(startState(), {
      type: GAME_ACTIONS.FLIP_CARD,
      uid: "alpha-a"
    });

    const secondFlip = gameReducer(firstFlip, {
      type: GAME_ACTIONS.FLIP_CARD,
      uid: "alpha-b"
    });

    expect(secondFlip.selectedCards).toEqual(["alpha-a", "alpha-b"]);
    expect(secondFlip.status).toBe(GAME_STATUS.CHECKING);
    expect(secondFlip.moves).toBe(1);
    expect(selectSelectedCardsMatch(secondFlip)).toBe(true);
  });

  it("MATCH_SUCCESS marks a matching pair as matched", () => {
    const selectedState = {
      ...startState(),
      selectedCards: ["alpha-a", "alpha-b"],
      status: GAME_STATUS.CHECKING,
      cards: createCards().map((card) =>
        card.pairId === "alpha" ? { ...card, isFlipped: true } : card
      )
    };

    const state = gameReducer(selectedState, {
      type: GAME_ACTIONS.MATCH_SUCCESS,
      cards: ["alpha-a", "alpha-b"]
    });

    expect(state.matchedPairs).toBe(1);
    expect(state.status).toBe(GAME_STATUS.PLAYING);
    expect(state.selectedCards).toEqual([]);
    expect(state.lastResult.type).toBe(RESULT_TYPES.MATCH);
    expect(
      state.cards
        .filter((card) => card.pairId === "alpha")
        .every((card) => card.isMatched)
    ).toBe(true);
  });

  it("MATCH_SUCCESS ends the game when the last pair is matched", () => {
    const selectedState = createGameState({
      totalPairs: 2,
      status: GAME_STATUS.CHECKING,
      cards: [
        {
          uid: "alpha-a",
          id: "alpha",
          pairId: "alpha",
          isFlipped: true,
          isMatched: true
        },
        {
          uid: "alpha-b",
          id: "alpha",
          pairId: "alpha",
          isFlipped: true,
          isMatched: true
        },
        {
          uid: "beta-a",
          id: "beta",
          pairId: "beta",
          isFlipped: true,
          isMatched: false
        },
        {
          uid: "beta-b",
          id: "beta",
          pairId: "beta",
          isFlipped: true,
          isMatched: false
        }
      ]
    });

    const state = gameReducer(
      {
        ...selectedState,
        selectedCards: ["beta-a", "beta-b"]
      },
      {
        type: GAME_ACTIONS.MATCH_SUCCESS,
        cards: ["beta-a", "beta-b"]
      }
    );

    expect(state.status).toBe(GAME_STATUS.WON);
    expect(state.matchedPairs).toBe(2);
    expect(state.lastResult.type).toBe(RESULT_TYPES.COMPLETE);
    expect(selectIsComplete(state)).toBe(true);
  });

  it("MATCH_FAIL marks selected cards as wrong and increments mistakes", () => {
    const selectedState = {
      ...startState(),
      selectedCards: ["alpha-a", "beta-a"],
      status: GAME_STATUS.CHECKING,
      cards: createCards().map((card) =>
        ["alpha-a", "beta-a"].includes(card.uid)
          ? { ...card, isFlipped: true }
          : card
      )
    };

    const state = gameReducer(selectedState, {
      type: GAME_ACTIONS.MATCH_FAIL,
      cards: ["alpha-a", "beta-a"]
    });

    expect(state.mistakes).toBe(1);
    expect(state.status).toBe(GAME_STATUS.CHECKING);
    expect(state.lastResult.type).toBe(RESULT_TYPES.MISMATCH);
    expect(state.cards.find((card) => card.uid === "alpha-a").isWrong).toBe(true);
    expect(state.cards.find((card) => card.uid === "beta-a").isWrong).toBe(true);
  });

  it("RESET_FLIPPED hides mismatched cards", () => {
    const failedState = gameReducer(
      {
        ...startState(),
        selectedCards: ["alpha-a", "beta-a"],
        status: GAME_STATUS.CHECKING,
        cards: createCards().map((card) =>
          ["alpha-a", "beta-a"].includes(card.uid)
            ? { ...card, isFlipped: true }
            : card
        )
      },
      {
        type: GAME_ACTIONS.MATCH_FAIL,
        cards: ["alpha-a", "beta-a"]
      }
    );

    const state = gameReducer(failedState, {
      type: GAME_ACTIONS.RESET_FLIPPED,
      cards: ["alpha-a", "beta-a"]
    });

    expect(state.status).toBe(GAME_STATUS.PLAYING);
    expect(state.selectedCards).toEqual([]);
    expect(state.cards.find((card) => card.uid === "alpha-a").isFlipped).toBe(false);
    expect(state.cards.find((card) => card.uid === "alpha-a").isWrong).toBe(false);
  });

  it("RESTART_GAME resets the game to ready state", () => {
    const state = gameReducer(startState(), {
      type: GAME_ACTIONS.RESTART_GAME,
      cards: createCards(),
      totalPairs: 2
    });

    expect(state.status).toBe(GAME_STATUS.READY);
    expect(state.cards).toHaveLength(4);
    expect(state.moves).toBe(0);
    expect(state.mistakes).toBe(0);
    expect(selectProgress(state)).toBe(0);
    expect(selectCanFlip(state)).toBe(false);
  });

  it("TICK increments seconds only while playing or checking", () => {
    const playingState = gameReducer(startState(), {
      type: GAME_ACTIONS.TICK
    });

    const idleState = gameReducer(initialGameState, {
      type: GAME_ACTIONS.TICK
    });

    expect(playingState.seconds).toBe(1);
    expect(idleState.seconds).toBe(0);
  });
});