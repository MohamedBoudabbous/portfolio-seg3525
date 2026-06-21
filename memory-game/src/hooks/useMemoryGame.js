import { useCallback, useEffect, useMemo, useReducer } from "react";

import { DEFAULT_LEVEL_ID, getLevelById } from "../data/levels";
import { DEFAULT_MODE_ID } from "../data/modes";
import { DEFAULT_THEME_ID, getThemeById } from "../data/themes";
import { createShuffledPairs } from "../utils/shuffle";
import { createScoreSummary } from "../utils/score";
import {
  GAME_ACTIONS,
  GAME_STATUS,
  RESULT_TYPES,
  gameReducer,
  initialGameState,
  selectCanFlip,
  selectIsComplete,
  selectProgress,
  selectSelectedCards,
  selectSelectedCardsMatch
} from "../utils/gameReducer";

export function useMemoryGame({
  themeId = DEFAULT_THEME_ID,
  levelId = DEFAULT_LEVEL_ID,
  modeId = DEFAULT_MODE_ID,
  autoStart = true,
  matchDelay = 280,
  mismatchDelay = 850
} = {}) {
  const theme = useMemo(() => getThemeById(themeId), [themeId]);
  const level = useMemo(() => getLevelById(levelId), [levelId]);

  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const buildDeck = useCallback(() => {
    return createShuffledPairs(theme.cards, level.pairsCount);
  }, [theme.cards, level.pairsCount]);

  const startGame = useCallback(() => {
    dispatch({
      type: GAME_ACTIONS.START_GAME,
      cards: buildDeck(),
      totalPairs: level.pairsCount
    });
  }, [buildDeck, level.pairsCount]);

  const restartGame = useCallback(() => {
    dispatch({
      type: GAME_ACTIONS.START_GAME,
      cards: buildDeck(),
      totalPairs: level.pairsCount
    });
  }, [buildDeck, level.pairsCount]);

  const flipCard = useCallback((uid) => {
    dispatch({
      type: GAME_ACTIONS.FLIP_CARD,
      uid
    });
  }, []);

  const selectedCards = useMemo(() => {
    return selectSelectedCards(state);
  }, [state]);

  const selectedCardsKey = state.selectedCards.join("|");

  useEffect(() => {
    if (!autoStart) {
      return;
    }

    startGame();
  }, [autoStart, startGame]);

  useEffect(() => {
    if (state.status !== GAME_STATUS.PLAYING && state.status !== GAME_STATUS.CHECKING) {
      return undefined;
    }

    const intervalId = globalThis.setInterval(() => {
      dispatch({ type: GAME_ACTIONS.TICK });
    }, 1000);

    return () => {
      globalThis.clearInterval(intervalId);
    };
  }, [state.status]);

  useEffect(() => {
    if (state.status !== GAME_STATUS.CHECKING) {
      return undefined;
    }

    if (state.selectedCards.length !== 2) {
      return undefined;
    }

    if (state.lastResult.type !== RESULT_TYPES.NONE) {
      return undefined;
    }

    const timeoutId = globalThis.setTimeout(() => {
      const isMatch = selectSelectedCardsMatch(state);

      if (isMatch) {
        dispatch({
          type: GAME_ACTIONS.MATCH_SUCCESS,
          cards: state.selectedCards
        });
      } else {
        dispatch({
          type: GAME_ACTIONS.MATCH_FAIL,
          cards: state.selectedCards
        });
      }
    }, matchDelay);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [
    state.status,
    state.lastResult.type,
    state.selectedCards,
    state.cards,
    matchDelay
  ]);

  useEffect(() => {
    if (state.status !== GAME_STATUS.CHECKING) {
      return undefined;
    }

    if (state.lastResult.type !== RESULT_TYPES.MISMATCH) {
      return undefined;
    }

    const cardsToReset = [...state.lastResult.cards];

    const timeoutId = globalThis.setTimeout(() => {
      dispatch({
        type: GAME_ACTIONS.RESET_FLIPPED,
        cards: cardsToReset
      });
    }, mismatchDelay);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [
    state.status,
    state.lastResult.type,
    selectedCardsKey,
    mismatchDelay
  ]);

  const scoreSummary = useMemo(() => {
    return createScoreSummary({
      levelId: level.id,
      modeId,
      moves: state.moves,
      seconds: state.seconds,
      totalPairs: state.totalPairs || level.pairsCount,
      mistakes: state.mistakes,
      completed: state.status === GAME_STATUS.WON
    });
  }, [
    level.id,
    level.pairsCount,
    modeId,
    state.moves,
    state.seconds,
    state.totalPairs,
    state.mistakes,
    state.status
  ]);

  const progress = useMemo(() => {
    return selectProgress(state);
  }, [state]);

  const canFlip = useMemo(() => {
    return selectCanFlip(state);
  }, [state]);

  const isComplete = useMemo(() => {
    return selectIsComplete(state);
  }, [state]);

  const gridStyle = useMemo(() => {
    return {
      gridTemplateColumns: `repeat(${level.columns}, minmax(0, 1fr))`
    };
  }, [level.columns]);

  return {
    cards: state.cards,
    selectedCards,
    selectedCardIds: state.selectedCards,
    moves: state.moves,
    mistakes: state.mistakes,
    seconds: state.seconds,
    score: scoreSummary.score,
    maxScore: scoreSummary.maxScore,
    accuracy: scoreSummary.accuracy,
    rank: scoreSummary.rank,
    stars: scoreSummary.stars,
    scoreRatio: scoreSummary.ratio,
    matchedPairs: state.matchedPairs,
    totalPairs: state.totalPairs || level.pairsCount,
    totalCards: state.cards.length,
    progress,
    status: state.status,
    lastResult: state.lastResult,
    canFlip,
    isComplete,
    isPlaying: state.status === GAME_STATUS.PLAYING,
    isChecking: state.status === GAME_STATUS.CHECKING,
    isWon: state.status === GAME_STATUS.WON,
    theme,
    level,
    modeId,
    rows: level.rows,
    columns: level.columns,
    gridStyle,
    flipCard,
    startGame,
    restartGame
  };
}