import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DEFAULT_LEVEL_ID, getGridStyle, getLevelById } from "../data/levels";
import { DEFAULT_THEME_ID, getThemeById } from "../data/themes";
import {
  calculateAccuracy,
  calculateMaxScore,
  getScoreRank,
  getStarRating
} from "../utils/score";
import { createShuffledPairs } from "../utils/shuffle";

export const FOCUS_STATUS = {
  ready: "ready",
  playing: "playing",
  checking: "checking",
  won: "won",
  lost: "lost"
};

export const FOCUS_RESULT_TYPES = {
  none: "none",
  start: "start",
  match: "match",
  mismatch: "mismatch",
  penalty: "penalty",
  combo: "combo",
  warning: "warning",
  complete: "complete",
  timeout: "timeout"
};

const FOCUS_SETTINGS = {
  easy: {
    timeLimit: 70,
    mismatchPenaltySeconds: 4,
    checkDelayMs: 620,
    mismatchDelayMs: 780,
    warningThreshold: 15,
    perfectBonus: 320,
    comboStep: 28,
    intensityMultiplier: 1
  },
  medium: {
    timeLimit: 85,
    mismatchPenaltySeconds: 5,
    checkDelayMs: 560,
    mismatchDelayMs: 720,
    warningThreshold: 18,
    perfectBonus: 520,
    comboStep: 42,
    intensityMultiplier: 1.25
  },
  hard: {
    timeLimit: 125,
    mismatchPenaltySeconds: 7,
    checkDelayMs: 500,
    mismatchDelayMs: 680,
    warningThreshold: 24,
    perfectBonus: 900,
    comboStep: 64,
    intensityMultiplier: 1.55
  }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function toSafeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function getFocusSettings(levelId) {
  return FOCUS_SETTINGS[levelId] ?? FOCUS_SETTINGS.easy;
}

function normalizeCards(cards) {
  return cards.map((card) => ({
    ...card,
    isFlipped: false,
    isMatched: false,
    isWrong: false
  }));
}

function calculateFocusScore({
  levelId,
  totalPairs,
  matchedPairs,
  moves,
  mistakes,
  seconds,
  remainingTime,
  bestCombo,
  completed
}) {
  const level = getLevelById(levelId);
  const settings = getFocusSettings(levelId);

  const safeTotalPairs = Math.max(1, Math.floor(toSafeNumber(totalPairs, level.pairsCount)));
  const safeMatchedPairs = clamp(Math.floor(toSafeNumber(matchedPairs)), 0, safeTotalPairs);
  const safeMoves = Math.max(0, Math.floor(toSafeNumber(moves)));
  const safeMistakes = Math.max(0, Math.floor(toSafeNumber(mistakes)));
  const safeSeconds = Math.max(0, Math.floor(toSafeNumber(seconds)));
  const safeRemainingTime = Math.max(0, Math.floor(toSafeNumber(remainingTime)));
  const safeBestCombo = Math.max(0, Math.floor(toSafeNumber(bestCombo)));

  const maxScore = calculateMaxScore({
    levelId,
    modeId: "focus",
    totalPairs: safeTotalPairs
  });

  const completionRatio = safeMatchedPairs / safeTotalPairs;
  const idealMoves = safeTotalPairs;
  const extraMoves = Math.max(0, safeMoves - idealMoves);

  const progressScore = maxScore * 0.38 * completionRatio;
  const completionScore = completed ? maxScore * 0.22 : 0;
  const speedScore =
    maxScore *
    0.22 *
    clamp(safeRemainingTime / settings.timeLimit, 0, 1) *
    Math.max(0.35, completionRatio);

  const precisionScore =
    maxScore *
    0.14 *
    clamp(1 - safeMistakes / Math.max(1, safeMoves), 0, 1) *
    Math.max(0.3, completionRatio);

  const comboScore = Math.min(
    maxScore * 0.18,
    safeBestCombo * settings.comboStep * settings.intensityMultiplier
  );

  const mistakePenalty =
    safeMistakes *
    level.mismatchPenalty *
    11 *
    settings.intensityMultiplier;

  const inefficiencyPenalty =
    extraMoves * 20 * settings.intensityMultiplier;

  const timePressurePenalty =
    completed ? 0 : safeSeconds * 2.8 * settings.intensityMultiplier;

  const perfectBonus =
    completed && safeMistakes === 0
      ? settings.perfectBonus * settings.intensityMultiplier
      : 0;

  const rawScore =
    progressScore +
    completionScore +
    speedScore +
    precisionScore +
    comboScore +
    perfectBonus -
    mistakePenalty -
    inefficiencyPenalty -
    timePressurePenalty;

  return Math.round(clamp(rawScore, 0, maxScore));
}

function createInitialResult() {
  return {
    type: FOCUS_RESULT_TYPES.none,
    message: "Match all pairs before the timer runs out.",
    intensity: "neutral",
    penaltySeconds: 0,
    combo: 0,
    uid: null,
    matchedUid: null
  };
}

export function useFocusChallenge({
  themeId = DEFAULT_THEME_ID,
  levelId = DEFAULT_LEVEL_ID,
  autoStart = true,
  random = Math.random
} = {}) {
  const theme = useMemo(() => getThemeById(themeId), [themeId]);
  const level = useMemo(() => getLevelById(levelId), [levelId]);
  const settings = useMemo(() => getFocusSettings(level.id), [level.id]);

  const randomRef = useRef(random);
  const mismatchTimeoutRef = useRef(null);
  const matchTimeoutRef = useRef(null);

  useEffect(() => {
    randomRef.current = random;
  }, [random]);

  const [status, setStatus] = useState(FOCUS_STATUS.ready);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(settings.timeLimit);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [lastResult, setLastResult] = useState(createInitialResult);

  const totalPairs = level.pairsCount;
  const isPlaying = status === FOCUS_STATUS.playing;
  const isChecking = status === FOCUS_STATUS.checking;
  const isWon = status === FOCUS_STATUS.won;
  const isLost = status === FOCUS_STATUS.lost;
  const isComplete = isWon || isLost;

  const clearTimers = useCallback(() => {
    if (mismatchTimeoutRef.current) {
      globalThis.clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }

    if (matchTimeoutRef.current) {
      globalThis.clearTimeout(matchTimeoutRef.current);
      matchTimeoutRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    clearTimers();

    const nextCards = normalizeCards(
      createShuffledPairs(
        theme.cards,
        level.pairsCount,
        randomRef.current
      )
    );

    setCards(nextCards);
    setSelectedCards([]);
    setMoves(0);
    setMistakes(0);
    setSeconds(0);
    setRemainingTime(settings.timeLimit);
    setMatchedPairs(0);
    setCombo(0);
    setBestCombo(0);
    setLastResult({
      type: FOCUS_RESULT_TYPES.start,
      message: "Timer started. Play fast and avoid mistakes.",
      intensity: "high",
      penaltySeconds: 0,
      combo: 0,
      uid: null,
      matchedUid: null
    });
    setStatus(FOCUS_STATUS.playing);
  }, [clearTimers, theme.cards, level.pairsCount, settings.timeLimit]);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (!autoStart) {
      setRemainingTime(settings.timeLimit);
      return;
    }

    startGame();
  }, [autoStart, startGame, settings.timeLimit]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  useEffect(() => {
    if (status !== FOCUS_STATUS.playing && status !== FOCUS_STATUS.checking) {
      return undefined;
    }

    const intervalId = globalThis.setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);

      setRemainingTime((currentRemainingTime) => {
        const nextRemainingTime = Math.max(0, currentRemainingTime - 1);

        if (nextRemainingTime === settings.warningThreshold) {
          setLastResult((currentResult) => ({
            ...currentResult,
            type: FOCUS_RESULT_TYPES.warning,
            message: `${settings.warningThreshold} seconds left. Finish fast.`,
            intensity: "danger",
            penaltySeconds: 0
          }));
        }

        if (nextRemainingTime === 0) {
          setStatus((currentStatus) => {
            if (
              currentStatus === FOCUS_STATUS.won ||
              currentStatus === FOCUS_STATUS.lost
            ) {
              return currentStatus;
            }

            return FOCUS_STATUS.lost;
          });

          setSelectedCards([]);
          setLastResult({
            type: FOCUS_RESULT_TYPES.timeout,
            message: "Time is up. The challenge is over.",
            intensity: "danger",
            penaltySeconds: 0,
            combo: 0,
            uid: null,
            matchedUid: null
          });
        }

        return nextRemainingTime;
      });
    }, 1000);

    return () => {
      globalThis.clearInterval(intervalId);
    };
  }, [status, settings.warningThreshold]);

  const applyPenalty = useCallback(
    (penaltySeconds) => {
      setRemainingTime((currentRemainingTime) => {
        const nextRemainingTime = Math.max(0, currentRemainingTime - penaltySeconds);

        if (nextRemainingTime === 0) {
          setStatus((currentStatus) => {
            if (currentStatus === FOCUS_STATUS.won) {
              return currentStatus;
            }

            return FOCUS_STATUS.lost;
          });

          setLastResult({
            type: FOCUS_RESULT_TYPES.timeout,
            message: "The penalty drained the timer.",
            intensity: "danger",
            penaltySeconds,
            combo: 0,
            uid: null,
            matchedUid: null
          });
        }

        return nextRemainingTime;
      });
    },
    []
  );

  const flipCard = useCallback(
    (uid) => {
      if (status !== FOCUS_STATUS.playing) {
        return;
      }

      if (selectedCards.length >= 2) {
        return;
      }

      const targetCard = cards.find((card) => card.uid === uid);

      if (
        !targetCard ||
        targetCard.isMatched ||
        targetCard.isFlipped ||
        targetCard.isWrong
      ) {
        return;
      }

      const nextSelectedCards = [...selectedCards, uid];

      setCards((currentCards) =>
        currentCards.map((card) =>
          card.uid === uid
            ? {
                ...card,
                isFlipped: true,
                isWrong: false
              }
            : card
        )
      );

      setSelectedCards(nextSelectedCards);

      if (nextSelectedCards.length !== 2) {
        return;
      }

      setStatus(FOCUS_STATUS.checking);
      setMoves((currentMoves) => currentMoves + 1);

      const [firstUid, secondUid] = nextSelectedCards;
      const firstCard = cards.find((card) => card.uid === firstUid);
      const secondCard = cards.find((card) => card.uid === secondUid);

      if (!firstCard || !secondCard) {
        setStatus(FOCUS_STATUS.playing);
        setSelectedCards([]);
        return;
      }

      const isMatch = firstCard.pairId === secondCard.pairId;

      if (isMatch) {
        matchTimeoutRef.current = globalThis.setTimeout(() => {
          setCards((currentCards) =>
            currentCards.map((card) =>
              nextSelectedCards.includes(card.uid)
                ? {
                    ...card,
                    isMatched: true,
                    isFlipped: true,
                    isWrong: false
                  }
                : card
            )
          );

          setSelectedCards([]);

          setMatchedPairs((currentMatchedPairs) => {
            const nextMatchedPairs = currentMatchedPairs + 1;
            const complete = nextMatchedPairs >= totalPairs;

            setStatus(complete ? FOCUS_STATUS.won : FOCUS_STATUS.playing);

            setLastResult({
              type: complete
                ? FOCUS_RESULT_TYPES.complete
                : combo + 1 >= 3
                  ? FOCUS_RESULT_TYPES.combo
                  : FOCUS_RESULT_TYPES.match,
              message: complete
                ? "Challenge complete. Excellent focus under pressure."
                : combo + 1 >= 3
                  ? `Combo x${combo + 1}. Keep the pressure high.`
                  : "Match confirmed. Keep moving.",
              intensity: complete ? "victory" : combo + 1 >= 3 ? "high" : "success",
              penaltySeconds: 0,
              combo: combo + 1,
              uid: firstUid,
              matchedUid: secondUid
            });

            return nextMatchedPairs;
          });

          setCombo((currentCombo) => {
            const nextCombo = currentCombo + 1;
            setBestCombo((currentBestCombo) => Math.max(currentBestCombo, nextCombo));
            return nextCombo;
          });
        }, settings.checkDelayMs);

        return;
      }

      setMistakes((currentMistakes) => currentMistakes + 1);
      setCombo(0);
      applyPenalty(settings.mismatchPenaltySeconds);

      setCards((currentCards) =>
        currentCards.map((card) =>
          nextSelectedCards.includes(card.uid)
            ? {
                ...card,
                isFlipped: true,
                isWrong: true
              }
            : card
        )
      );

      setLastResult({
        type: FOCUS_RESULT_TYPES.mismatch,
        message: `Mismatch. -${settings.mismatchPenaltySeconds}s penalty applied.`,
        intensity: "danger",
        penaltySeconds: settings.mismatchPenaltySeconds,
        combo: 0,
        uid: firstUid,
        matchedUid: secondUid
      });

      mismatchTimeoutRef.current = globalThis.setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) =>
            nextSelectedCards.includes(card.uid) && !card.isMatched
              ? {
                  ...card,
                  isFlipped: false,
                  isWrong: false
                }
              : card
          )
        );

        setSelectedCards([]);

        setStatus((currentStatus) =>
          currentStatus === FOCUS_STATUS.lost ? currentStatus : FOCUS_STATUS.playing
        );
      }, settings.mismatchDelayMs);
    },
    [
      status,
      selectedCards,
      cards,
      totalPairs,
      combo,
      settings.checkDelayMs,
      settings.mismatchDelayMs,
      settings.mismatchPenaltySeconds,
      applyPenalty
    ]
  );

  const progress = useMemo(() => {
    return Math.round((matchedPairs / Math.max(1, totalPairs)) * 100);
  }, [matchedPairs, totalPairs]);

  const timeProgress = useMemo(() => {
    return Math.round(
      clamp((remainingTime / Math.max(1, settings.timeLimit)) * 100, 0, 100)
    );
  }, [remainingTime, settings.timeLimit]);

  const accuracy = useMemo(() => {
    return calculateAccuracy({
      moves,
      totalPairs,
      mistakes
    });
  }, [moves, totalPairs, mistakes]);

  const maxScore = useMemo(() => {
    return calculateMaxScore({
      levelId: level.id,
      modeId: "focus",
      totalPairs
    });
  }, [level.id, totalPairs]);

  const score = useMemo(() => {
    return calculateFocusScore({
      levelId: level.id,
      totalPairs,
      matchedPairs,
      moves,
      mistakes,
      seconds,
      remainingTime,
      bestCombo,
      completed: isWon
    });
  }, [
    level.id,
    totalPairs,
    matchedPairs,
    moves,
    mistakes,
    seconds,
    remainingTime,
    bestCombo,
    isWon
  ]);

  const rank = useMemo(() => {
    return getScoreRank(score, maxScore);
  }, [score, maxScore]);

  const stars = useMemo(() => {
    return getStarRating(score, maxScore);
  }, [score, maxScore]);

  const gridStyle = useMemo(() => {
    return getGridStyle(level.id);
  }, [level.id]);

  const pressureLevel = useMemo(() => {
    if (isComplete) {
      return isWon ? "victory" : "danger";
    }

    if (remainingTime <= Math.ceil(settings.warningThreshold / 2)) {
      return "critical";
    }

    if (remainingTime <= settings.warningThreshold) {
      return "danger";
    }

    if (combo >= 3) {
      return "combo";
    }

    return "normal";
  }, [isComplete, isWon, remainingTime, settings.warningThreshold, combo]);

  const instruction = useMemo(() => {
    if (status === FOCUS_STATUS.ready) {
      return "Start the timed challenge when you are ready.";
    }

    if (status === FOCUS_STATUS.playing && pressureLevel === "critical") {
      return "Critical time. Match fast and avoid every mistake.";
    }

    if (status === FOCUS_STATUS.playing && pressureLevel === "danger") {
      return "Timer is low. Every mismatch removes more time.";
    }

    if (status === FOCUS_STATUS.playing && combo >= 3) {
      return `Combo x${combo}. Stay clean to protect the score.`;
    }

    if (status === FOCUS_STATUS.checking) {
      return "Checking the pair under pressure.";
    }

    if (status === FOCUS_STATUS.won) {
      return "Focus challenge cleared before the timer expired.";
    }

    if (status === FOCUS_STATUS.lost) {
      return "The timer expired. Try a cleaner and faster run.";
    }

    return "Find all pairs before the timer reaches zero.";
  }, [status, pressureLevel, combo]);

  const phaseLabel = useMemo(() => {
    if (status === FOCUS_STATUS.ready) {
      return "Ready";
    }

    if (status === FOCUS_STATUS.playing) {
      return "Focus";
    }

    if (status === FOCUS_STATUS.checking) {
      return "Checking";
    }

    if (status === FOCUS_STATUS.won) {
      return "Complete";
    }

    return "Time out";
  }, [status]);

  return {
    cards,
    selectedCards,
    selectedCardIds: selectedCards,
    moves,
    mistakes,
    seconds,
    remainingTime,
    timeLimit: settings.timeLimit,
    timeProgress,
    matchedPairs,
    totalPairs,
    combo,
    bestCombo,
    score,
    maxScore,
    accuracy,
    rank,
    stars,
    progress,
    status,
    phaseLabel,
    instruction,
    lastResult,
    pressureLevel,
    penaltySeconds: settings.mismatchPenaltySeconds,
    theme,
    level,
    modeId: "focus",
    gridStyle,
    isReady: status === FOCUS_STATUS.ready,
    isPlaying,
    isChecking,
    isWon,
    isLost,
    isComplete,
    canFlip: status === FOCUS_STATUS.playing && selectedCards.length < 2,
    startGame,
    restartGame,
    flipCard
  };
}