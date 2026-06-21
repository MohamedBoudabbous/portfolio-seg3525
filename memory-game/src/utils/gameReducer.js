export const GAME_ACTIONS = {
  START_GAME: "START_GAME",
  FLIP_CARD: "FLIP_CARD",
  MATCH_SUCCESS: "MATCH_SUCCESS",
  MATCH_FAIL: "MATCH_FAIL",
  RESET_FLIPPED: "RESET_FLIPPED",
  TICK: "TICK",
  END_GAME: "END_GAME",
  RESTART_GAME: "RESTART_GAME"
};

export const GAME_STATUS = {
  IDLE: "idle",
  READY: "ready",
  PLAYING: "playing",
  CHECKING: "checking",
  WON: "won",
  LOST: "lost"
};

export const RESULT_TYPES = {
  NONE: "none",
  MATCH: "match",
  MISMATCH: "mismatch",
  COMPLETE: "complete"
};

export const initialGameState = {
  status: GAME_STATUS.IDLE,
  cards: [],
  selectedCards: [],
  matchedPairs: 0,
  totalPairs: 0,
  moves: 0,
  mistakes: 0,
  seconds: 0,
  startedAt: null,
  endedAt: null,
  lastResult: {
    type: RESULT_TYPES.NONE,
    cards: [],
    message: ""
  }
};

function createLastResult(type = RESULT_TYPES.NONE, cards = [], message = "") {
  return {
    type,
    cards,
    message
  };
}

function hasCard(cards, uid) {
  return cards.some((card) => card.uid === uid);
}

function findCard(cards, uid) {
  return cards.find((card) => card.uid === uid) ?? null;
}

function isCardPlayable(card) {
  return Boolean(card) && !card.isFlipped && !card.isMatched;
}

function normalizeCards(cards) {
  if (!Array.isArray(cards)) {
    return [];
  }

  return cards.map((card) => ({
    ...card,
    isFlipped: Boolean(card.isFlipped),
    isMatched: Boolean(card.isMatched),
    isWrong: Boolean(card.isWrong)
  }));
}

function countPairs(cards) {
  const uniquePairs = new Set(cards.map((card) => card.pairId ?? card.id));

  return uniquePairs.size;
}

function countMatchedPairs(cards) {
  const matchedPairIds = new Set();

  for (const card of cards) {
    if (card.isMatched) {
      matchedPairIds.add(card.pairId ?? card.id);
    }
  }

  return matchedPairIds.size;
}

function updateCards(cards, predicate, updater) {
  return cards.map((card) => {
    if (!predicate(card)) {
      return card;
    }

    return updater(card);
  });
}

function clearWrongState(cards) {
  return cards.map((card) => ({
    ...card,
    isWrong: false
  }));
}

function areMatchingCards(firstCard, secondCard) {
  if (!firstCard || !secondCard) {
    return false;
  }

  if (firstCard.uid === secondCard.uid) {
    return false;
  }

  return (firstCard.pairId ?? firstCard.id) === (secondCard.pairId ?? secondCard.id);
}

export function createGameState({ cards = [], totalPairs, status = GAME_STATUS.READY } = {}) {
  const normalizedCards = normalizeCards(cards);
  const safeTotalPairs = Number.isInteger(totalPairs) && totalPairs > 0 ? totalPairs : countPairs(normalizedCards);

  return {
    ...initialGameState,
    status,
    cards: normalizedCards,
    totalPairs: safeTotalPairs,
    matchedPairs: countMatchedPairs(normalizedCards),
    startedAt: null,
    endedAt: null
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTIONS.START_GAME: {
      const cards = normalizeCards(action.cards);
      const totalPairs = Number.isInteger(action.totalPairs) && action.totalPairs > 0 ? action.totalPairs : countPairs(cards);

      return {
        ...initialGameState,
        status: GAME_STATUS.PLAYING,
        cards,
        totalPairs,
        startedAt: Date.now(),
        lastResult: createLastResult(RESULT_TYPES.NONE)
      };
    }

    case GAME_ACTIONS.FLIP_CARD: {
      if (state.status !== GAME_STATUS.PLAYING) {
        return state;
      }

      const uid = action.uid;

      if (!uid || !hasCard(state.cards, uid)) {
        return state;
      }

      if (state.selectedCards.length >= 2) {
        return state;
      }

      const selectedCard = findCard(state.cards, uid);

      if (!isCardPlayable(selectedCard)) {
        return state;
      }

      const cards = updateCards(
        clearWrongState(state.cards),
        (card) => card.uid === uid,
        (card) => ({
          ...card,
          isFlipped: true
        })
      );

      const selectedCards = [...state.selectedCards, uid];
      const isChecking = selectedCards.length === 2;

      return {
        ...state,
        cards,
        selectedCards,
        moves: isChecking ? state.moves + 1 : state.moves,
        status: isChecking ? GAME_STATUS.CHECKING : GAME_STATUS.PLAYING,
        lastResult: createLastResult(RESULT_TYPES.NONE)
      };
    }

    case GAME_ACTIONS.MATCH_SUCCESS: {
      const selectedCards = action.cards ?? state.selectedCards;

      if (selectedCards.length !== 2) {
        return state;
      }

      const [firstUid, secondUid] = selectedCards;
      const firstCard = findCard(state.cards, firstUid);
      const secondCard = findCard(state.cards, secondUid);

      if (!areMatchingCards(firstCard, secondCard)) {
        return state;
      }

      const cards = updateCards(
        state.cards,
        (card) => card.uid === firstUid || card.uid === secondUid,
        (card) => ({
          ...card,
          isFlipped: true,
          isMatched: true,
          isWrong: false
        })
      );

      const matchedPairs = countMatchedPairs(cards);
      const isComplete = matchedPairs >= state.totalPairs;

      return {
        ...state,
        cards,
        selectedCards: [],
        matchedPairs,
        status: isComplete ? GAME_STATUS.WON : GAME_STATUS.PLAYING,
        endedAt: isComplete ? Date.now() : state.endedAt,
        lastResult: createLastResult(
          isComplete ? RESULT_TYPES.COMPLETE : RESULT_TYPES.MATCH,
          selectedCards,
          isComplete ? "All pairs found." : "Pair found."
        )
      };
    }

    case GAME_ACTIONS.MATCH_FAIL: {
      const selectedCards = action.cards ?? state.selectedCards;

      if (selectedCards.length !== 2) {
        return state;
      }

      const cards = updateCards(
        state.cards,
        (card) => selectedCards.includes(card.uid),
        (card) => ({
          ...card,
          isWrong: true
        })
      );

      return {
        ...state,
        cards,
        mistakes: state.mistakes + 1,
        status: GAME_STATUS.CHECKING,
        lastResult: createLastResult(RESULT_TYPES.MISMATCH, selectedCards, "Not a match.")
      };
    }

    case GAME_ACTIONS.RESET_FLIPPED: {
      const selectedCards = action.cards ?? state.selectedCards;

      const cards = updateCards(
        state.cards,
        (card) => selectedCards.includes(card.uid) && !card.isMatched,
        (card) => ({
          ...card,
          isFlipped: false,
          isWrong: false
        })
      );

      return {
        ...state,
        cards,
        selectedCards: [],
        status: state.status === GAME_STATUS.WON || state.status === GAME_STATUS.LOST ? state.status : GAME_STATUS.PLAYING,
        lastResult: createLastResult(RESULT_TYPES.NONE)
      };
    }

    case GAME_ACTIONS.TICK: {
      if (state.status !== GAME_STATUS.PLAYING && state.status !== GAME_STATUS.CHECKING) {
        return state;
      }

      return {
        ...state,
        seconds: state.seconds + 1
      };
    }

    case GAME_ACTIONS.END_GAME: {
      return {
        ...state,
        status: action.status ?? GAME_STATUS.WON,
        endedAt: Date.now(),
        lastResult: createLastResult(action.resultType ?? RESULT_TYPES.COMPLETE, [], action.message ?? "")
      };
    }

    case GAME_ACTIONS.RESTART_GAME: {
      return createGameState({
        cards: action.cards ?? [],
        totalPairs: action.totalPairs,
        status: action.status ?? GAME_STATUS.READY
      });
    }

    default:
      return state;
  }
}

export function selectSelectedCards(state) {
  return state.selectedCards.map((uid) => findCard(state.cards, uid)).filter(Boolean);
}

export function selectSelectedCardsMatch(state) {
  const [firstCard, secondCard] = selectSelectedCards(state);

  return areMatchingCards(firstCard, secondCard);
}

export function selectProgress(state) {
  if (state.totalPairs <= 0) {
    return 0;
  }

  return Math.round((state.matchedPairs / state.totalPairs) * 100);
}

export function selectIsComplete(state) {
  return state.status === GAME_STATUS.WON || state.matchedPairs >= state.totalPairs;
}

export function selectCanFlip(state) {
  return state.status === GAME_STATUS.PLAYING && state.selectedCards.length < 2;
}