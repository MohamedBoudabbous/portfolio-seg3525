import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DEFAULT_LEVEL_ID, getGridStyle, getLevelById } from "../data/levels";
import { DEFAULT_THEME_ID, getThemeById } from "../data/themes";
import {
  calculateMaxScore,
  getScoreRank,
  getStarRating
} from "../utils/score";

export const SEQUENCE_STATUS = {
  ready: "ready",
  preview: "preview",
  recall: "recall",
  complete: "complete"
};

export const SEQUENCE_RESULT_TYPES = {
  none: "none",
  correct: "correct",
  wrong: "wrong",
  complete: "complete"
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function toSafeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function shuffleItems(items, random = Math.random) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function getChoiceCount(level, theme) {
  const minimumChoices = Math.max(level.sequenceLength + 2, level.pairsCount);
  return clamp(minimumChoices, level.sequenceLength, theme.cards.length);
}

function buildSequenceRound({ theme, level, random = Math.random }) {
  const choiceCount = getChoiceCount(level, theme);

  const choices = shuffleItems(theme.cards, random)
    .slice(0, choiceCount)
    .map((card, index) => ({
      ...card,
      uid: `sequence-${card.id}-${index}`,
      pairId: card.id,
      isSelected: false,
      isCorrect: false,
      isWrong: false,
      isPreviewTarget: false
    }));

  const sequenceLength = clamp(level.sequenceLength, 1, choices.length);

  const sequence = shuffleItems(choices, random)
    .slice(0, sequenceLength)
    .map((card, index) => ({
      ...card,
      sequenceIndex: index
    }));

  const cards = shuffleItems(choices, random);

  return {
    cards,
    sequence
  };
}

function calculateSequenceAccuracy({ correctSteps, attempts, totalSteps }) {
  const safeCorrectSteps = Math.max(0, Math.floor(toSafeNumber(correctSteps)));
  const safeAttempts = Math.max(0, Math.floor(toSafeNumber(attempts)));
  const safeTotalSteps = Math.max(1, Math.floor(toSafeNumber(totalSteps, 1)));
  const denominator = Math.max(safeAttempts, safeTotalSteps);

  if (denominator === 0) {
    return 0;
  }

  return Math.round(clamp((safeCorrectSteps / denominator) * 100, 0, 100));
}

function calculateSequenceScore({
  levelId,
  sequenceLength,
  correctSteps,
  attempts,
  mistakes,
  recallSeconds,
  isComplete
}) {
  const maxScore = calculateMaxScore({
    levelId,
    modeId: "sequence",
    totalPairs: sequenceLength
  });

  const safeSequenceLength = Math.max(1, Math.floor(toSafeNumber(sequenceLength, 1)));
  const safeCorrectSteps = Math.max(0, Math.floor(toSafeNumber(correctSteps)));
  const safeAttempts = Math.max(0, Math.floor(toSafeNumber(attempts)));
  const safeMistakes = Math.max(0, Math.floor(toSafeNumber(mistakes)));
  const safeRecallSeconds = Math.max(0, Math.floor(toSafeNumber(recallSeconds)));

  const exactnessRatio = clamp(safeCorrectSteps / safeSequenceLength, 0, 1);
  const attemptEfficiency = clamp(
    safeSequenceLength / Math.max(safeSequenceLength, safeAttempts),
    0,
    1
  );
  const targetRecallSeconds = Math.max(8, safeSequenceLength * 2.4);
  const speedRatio = clamp(1 - safeRecallSeconds / targetRecallSeconds, 0, 1);
  const mistakeRatio = clamp(safeMistakes / safeSequenceLength, 0, 1);

  const completionWeight = isComplete ? 0.14 : 0;
  const exactnessScore = maxScore * 0.56 * exactnessRatio;
  const efficiencyScore = maxScore * 0.12 * attemptEfficiency * exactnessRatio;
  const speedScore = maxScore * 0.18 * speedRatio * exactnessRatio;
  const completionScore = maxScore * completionWeight * exactnessRatio;
  const mistakePenalty = maxScore * 0.2 * mistakeRatio;

  return Math.round(
    clamp(
      exactnessScore +
        efficiencyScore +
        speedScore +
        completionScore -
        mistakePenalty,
      0,
      maxScore
    )
  );
}

export function useSequenceGame({
  themeId = DEFAULT_THEME_ID,
  levelId = DEFAULT_LEVEL_ID,
  autoStart = true,
  previewStepMs = 1300,
  previewEndDelayMs = 900,
  random = Math.random
} = {}) {
  const theme = useMemo(() => getThemeById(themeId), [themeId]);
  const level = useMemo(() => getLevelById(levelId), [levelId]);

  const randomRef = useRef(random);
  const statusRef = useRef(SEQUENCE_STATUS.ready);
  const selectedStepsRef = useRef([]);
  const attemptsRef = useRef(0);
  const mistakesRef = useRef(0);
  const sequenceRef = useRef([]);
  const isResolvingMistakeRef = useRef(false);
  const mistakeResetTimeoutRef = useRef(null);

  const [status, setStatus] = useState(SEQUENCE_STATUS.ready);
  const [cards, setCards] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [activePreviewIndex, setActivePreviewIndex] = useState(-1);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isResolvingMistake, setIsResolvingMistake] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recallSeconds, setRecallSeconds] = useState(0);
  const [lastResult, setLastResult] = useState({
    type: SEQUENCE_RESULT_TYPES.none,
    step: -1,
    uid: null,
    expectedUid: null
  });

  useEffect(() => {
    randomRef.current = random;
  }, [random]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    selectedStepsRef.current = selectedSteps;
  }, [selectedSteps]);

  useEffect(() => {
    attemptsRef.current = attempts;
  }, [attempts]);

  useEffect(() => {
    mistakesRef.current = mistakes;
  }, [mistakes]);

  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);

  useEffect(() => {
    isResolvingMistakeRef.current = isResolvingMistake;
  }, [isResolvingMistake]);

  useEffect(() => {
    return () => {
      if (mistakeResetTimeoutRef.current) {
        globalThis.clearTimeout(mistakeResetTimeoutRef.current);
      }
    };
  }, []);

  const sequenceLength = sequence.length;

  const previewDurationSeconds = useMemo(() => {
    const effectiveSequenceLength = sequenceLength || level.sequenceLength || 1;

    return Math.ceil(
      (effectiveSequenceLength * previewStepMs + previewEndDelayMs) / 1000
    );
  }, [sequenceLength, level.sequenceLength, previewStepMs, previewEndDelayMs]);

  const startGame = useCallback(() => {
    const nextRound = buildSequenceRound({
      theme,
      level,
      random: randomRef.current
    });

    if (mistakeResetTimeoutRef.current) {
      globalThis.clearTimeout(mistakeResetTimeoutRef.current);
      mistakeResetTimeoutRef.current = null;
    }

    statusRef.current = SEQUENCE_STATUS.preview;
    selectedStepsRef.current = [];
    attemptsRef.current = 0;
    mistakesRef.current = 0;
    sequenceRef.current = nextRound.sequence;
    isResolvingMistakeRef.current = false;

    setCards(nextRound.cards);
    setSequence(nextRound.sequence);
    setActivePreviewIndex(0);
    setSelectedSteps([]);
    setAttempts(0);
    setMistakes(0);
    setIsResolvingMistake(false);
    setSeconds(0);
    setRecallSeconds(0);
    setLastResult({
      type: SEQUENCE_RESULT_TYPES.none,
      step: -1,
      uid: null,
      expectedUid: null
    });
    setStatus(SEQUENCE_STATUS.preview);
  }, [theme, level]);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (!autoStart) {
      return;
    }

    startGame();
  }, [autoStart, startGame]);

  useEffect(() => {
    if (status !== SEQUENCE_STATUS.preview || sequenceLength === 0) {
      return undefined;
    }

    setActivePreviewIndex(0);

    let nextIndex = 0;

    const intervalId = globalThis.setInterval(() => {
      nextIndex += 1;

      if (nextIndex >= sequenceLength) {
        globalThis.clearInterval(intervalId);
        return;
      }

      setActivePreviewIndex(nextIndex);
    }, previewStepMs);

    const timeoutId = globalThis.setTimeout(() => {
      statusRef.current = SEQUENCE_STATUS.recall;
      setActivePreviewIndex(-1);
      setStatus(SEQUENCE_STATUS.recall);
    }, sequenceLength * previewStepMs + previewEndDelayMs);

    return () => {
      globalThis.clearInterval(intervalId);
      globalThis.clearTimeout(timeoutId);
    };
  }, [status, sequenceLength, previewStepMs, previewEndDelayMs]);

  useEffect(() => {
    if (
      status !== SEQUENCE_STATUS.preview &&
      status !== SEQUENCE_STATUS.recall
    ) {
      return undefined;
    }

    const intervalId = globalThis.setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      globalThis.clearInterval(intervalId);
    };
  }, [status]);

  useEffect(() => {
    if (status !== SEQUENCE_STATUS.recall) {
      return undefined;
    }

    const intervalId = globalThis.setInterval(() => {
      setRecallSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      globalThis.clearInterval(intervalId);
    };
  }, [status]);

  const clickCard = useCallback((uid) => {
    if (statusRef.current !== SEQUENCE_STATUS.recall) {
      return;
    }

    if (isResolvingMistakeRef.current) {
      return;
    }

    const currentSelectedSteps = selectedStepsRef.current;
    const currentAttempts = attemptsRef.current;
    const currentMistakes = mistakesRef.current;
    const currentSequence = sequenceRef.current;
    const currentSequenceLength = currentSequence.length;

    if (currentSelectedSteps.some((step) => step.uid === uid)) {
      return;
    }

    const stepIndex = currentSelectedSteps.length;
    const expectedCard = currentSequence[stepIndex];

    if (!expectedCard) {
      return;
    }

    const isCorrect = uid === expectedCard.uid;
    const nextAttempts = currentAttempts + 1;

    attemptsRef.current = nextAttempts;
    setAttempts(nextAttempts);

    if (!isCorrect) {
      const nextMistakes = currentMistakes + 1;

      mistakesRef.current = nextMistakes;
      isResolvingMistakeRef.current = true;

      setMistakes(nextMistakes);
      setIsResolvingMistake(true);

      setCards((currentCards) =>
        currentCards.map((card) => {
          if (card.uid !== uid) {
            return card;
          }

          return {
            ...card,
            isSelected: false,
            isCorrect: false,
            isWrong: true
          };
        })
      );

      setLastResult({
        type: SEQUENCE_RESULT_TYPES.wrong,
        step: stepIndex,
        uid,
        expectedUid: expectedCard.uid
      });

      if (mistakeResetTimeoutRef.current) {
        globalThis.clearTimeout(mistakeResetTimeoutRef.current);
      }

      mistakeResetTimeoutRef.current = globalThis.setTimeout(() => {
        setCards((currentCards) =>
          currentCards.map((card) => {
            if (card.uid !== uid) {
              return card;
            }

            return {
              ...card,
              isWrong: false
            };
          })
        );

        isResolvingMistakeRef.current = false;
        mistakeResetTimeoutRef.current = null;
        setIsResolvingMistake(false);
      }, 650);

      return;
    }

    const nextStep = {
      uid,
      expectedUid: expectedCard.uid,
      step: stepIndex,
      isCorrect: true
    };

    const nextSelectedSteps = [...currentSelectedSteps, nextStep];
    const isRoundComplete = nextSelectedSteps.length === currentSequenceLength;

    selectedStepsRef.current = nextSelectedSteps;

    setSelectedSteps(nextSelectedSteps);

    setCards((currentCards) =>
      currentCards.map((card) => {
        if (card.uid !== uid) {
          return card;
        }

        return {
          ...card,
          isSelected: true,
          isCorrect: true,
          isWrong: false
        };
      })
    );

    setLastResult({
      type: isRoundComplete
        ? SEQUENCE_RESULT_TYPES.complete
        : SEQUENCE_RESULT_TYPES.correct,
      step: stepIndex,
      uid,
      expectedUid: expectedCard.uid
    });

    if (isRoundComplete) {
      statusRef.current = SEQUENCE_STATUS.complete;
      setStatus(SEQUENCE_STATUS.complete);
    }
  }, []);

  const correctSteps = useMemo(() => {
    return selectedSteps.filter((step) => step.isCorrect).length;
  }, [selectedSteps]);

  const accuracy = useMemo(() => {
    return calculateSequenceAccuracy({
      correctSteps,
      attempts,
      totalSteps: sequenceLength
    });
  }, [correctSteps, attempts, sequenceLength]);

  const maxScore = useMemo(() => {
    return calculateMaxScore({
      levelId: level.id,
      modeId: "sequence",
      totalPairs: sequenceLength || level.sequenceLength
    });
  }, [level.id, level.sequenceLength, sequenceLength]);

  const score = useMemo(() => {
    return calculateSequenceScore({
      levelId: level.id,
      sequenceLength: sequenceLength || level.sequenceLength,
      correctSteps,
      attempts,
      mistakes,
      recallSeconds,
      isComplete: status === SEQUENCE_STATUS.complete
    });
  }, [
    level.id,
    level.sequenceLength,
    sequenceLength,
    correctSteps,
    attempts,
    mistakes,
    recallSeconds,
    status
  ]);

  const rank = useMemo(() => {
    return getScoreRank(score, maxScore);
  }, [score, maxScore]);

  const stars = useMemo(() => {
    return getStarRating(score, maxScore);
  }, [score, maxScore]);

  const progress = useMemo(() => {
    if (sequenceLength === 0) {
      return 0;
    }

    return Math.round((selectedSteps.length / sequenceLength) * 100);
  }, [selectedSteps.length, sequenceLength]);

  const previewProgress = useMemo(() => {
    if (sequenceLength === 0 || status !== SEQUENCE_STATUS.preview) {
      return 0;
    }

    return Math.round(((activePreviewIndex + 1) / sequenceLength) * 100);
  }, [activePreviewIndex, sequenceLength, status]);

  const visibleSequence = useMemo(() => {
    if (
      status === SEQUENCE_STATUS.preview ||
      status === SEQUENCE_STATUS.complete
    ) {
      return sequence;
    }

    return [];
  }, [status, sequence]);

  const nextStepIndex = selectedSteps.length;
  const nextExpectedCard = sequence[nextStepIndex] ?? null;

  const enhancedCards = useMemo(() => {
    const activePreviewUid =
      status === SEQUENCE_STATUS.preview && activePreviewIndex >= 0
        ? sequence[activePreviewIndex]?.uid
        : null;

    const expectedOrder = new Map(
      sequence.map((card) => [card.uid, card.sequenceIndex])
    );

    return cards.map((card) => ({
      ...card,
      sequenceIndex: expectedOrder.get(card.uid) ?? null,
      isInSequence: expectedOrder.has(card.uid),
      isPreviewTarget: card.uid === activePreviewUid
    }));
  }, [cards, sequence, status, activePreviewIndex]);

  const isPerfect =
    status === SEQUENCE_STATUS.complete &&
    accuracy === 100 &&
    mistakes === 0;

  const instruction = useMemo(() => {
    if (status === SEQUENCE_STATUS.ready) {
      return "Start the sequence round when you are ready.";
    }

    if (status === SEQUENCE_STATUS.preview) {
      return `Memorize the highlighted sequence. You have about ${previewDurationSeconds} seconds before recall starts.`;
    }

    if (status === SEQUENCE_STATUS.recall && isResolvingMistake) {
      return "Wrong symbol. Try the same step again.";
    }

    if (status === SEQUENCE_STATUS.recall) {
      return "Select the symbols in the exact same order.";
    }

    if (isPerfect) {
      return "Perfect sequence recall.";
    }

    return "Sequence completed. Review the order and try to improve your precision.";
  }, [status, isResolvingMistake, isPerfect, previewDurationSeconds]);

  const phaseLabel = useMemo(() => {
    if (status === SEQUENCE_STATUS.preview) {
      return "Preview";
    }

    if (status === SEQUENCE_STATUS.recall) {
      return "Recall";
    }

    if (status === SEQUENCE_STATUS.complete) {
      return "Complete";
    }

    return "Ready";
  }, [status]);

  const gridStyle = useMemo(() => {
    return getGridStyle(level.id);
  }, [level.id]);

  return {
    cards: enhancedCards,
    sequence,
    visibleSequence,
    selectedSteps,
    selectedCards: selectedSteps,
    selectedCardIds: selectedSteps.map((step) => step.uid),
    activePreviewIndex,
    nextStepIndex,
    nextExpectedCard,
    attempts,
    mistakes,
    seconds,
    recallSeconds,
    score,
    maxScore,
    accuracy,
    rank,
    stars,
    progress,
    previewProgress,
    previewStepMs,
    previewEndDelayMs,
    previewDurationSeconds,
    status,
    phaseLabel,
    instruction,
    lastResult,
    totalSteps: sequenceLength,
    correctSteps,
    theme,
    level,
    modeId: "sequence",
    gridStyle,
    isReady: status === SEQUENCE_STATUS.ready,
    isPreviewing: status === SEQUENCE_STATUS.preview,
    isRecall: status === SEQUENCE_STATUS.recall,
    isComplete: status === SEQUENCE_STATUS.complete,
    isPerfect,
    isResolvingMistake,
    canClick:
      status === SEQUENCE_STATUS.recall &&
      !isResolvingMistake &&
      selectedSteps.length < sequenceLength,
    startGame,
    restartGame,
    clickCard
  };
}