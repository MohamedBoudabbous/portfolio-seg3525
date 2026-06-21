import { useEffect, useMemo, useRef } from "react";

import Icon from "./Icon";

import { useStoredScores } from "../hooks/useLocalStorage";
import { createScoreEntry, keepBestScores } from "../utils/score";
import { formatTime, formatTimeLong } from "../utils/formatTime";

function RatingScale({ value = 0 }) {
  const safeValue = Math.min(5, Math.max(0, Math.round(Number(value) || 0)));

  return (
    <div className="result-rating" aria-label={`Performance rating: ${safeValue} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < safeValue ? "rating-segment rating-segment-active" : "rating-segment"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ResultMetric({ iconName, label, value, helper, highlight = false }) {
  const className = ["result-metric", highlight ? "result-metric-highlight" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className}>
      <span className="result-metric-icon" aria-hidden="true">
        <Icon name={iconName} size={20} />
      </span>

      <span className="result-metric-content">
        <span className="result-metric-label">{label}</span>
        <strong className="result-metric-value">{value}</strong>
        {helper && <span className="result-metric-helper">{helper}</span>}
      </span>
    </article>
  );
}

function BestScoreNote({ scores, currentScore }) {
  const bestScore = scores?.[0];

  if (!bestScore) {
    return (
      <p className="result-note">
        This is your first saved result for this mode and difficulty.
      </p>
    );
  }

  if (currentScore >= bestScore.score) {
    return (
      <p className="result-note result-note-positive">
        New personal best saved locally.
      </p>
    );
  }

  return (
    <p className="result-note">
      Personal best: <strong>{bestScore.score}</strong> points in{" "}
      <strong>{formatTime(bestScore.seconds)}</strong>.
    </p>
  );
}

export default function GameOver({
  modeId = "classic",
  levelId = "easy",
  themeId = "animals",
  modeName = "Classic Match",
  themeName = "Animals",
  levelName = "Beginner",
  seconds = 0,
  moves = 0,
  mistakes = 0,
  matchedPairs = 0,
  totalPairs = 0,
  score = 0,
  maxScore = 0,
  accuracy = 0,
  rank,
  stars = 0,
  onRestart,
  onBackToConfig
}) {
  const restartButtonRef = useRef(null);
  const storageKey = `${modeId}_${levelId}`;
  const [scores, setScores] = useStoredScores(storageKey);

  const safeScore = Math.max(0, Math.round(Number(score) || 0));
  const safeMaxScore = Math.max(1, Math.round(Number(maxScore) || 1));
  const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
  const safeMoves = Math.max(0, Math.floor(Number(moves) || 0));
  const safeMistakes = Math.max(0, Math.floor(Number(mistakes) || 0));
  const safeAccuracy = Math.min(100, Math.max(0, Math.round(Number(accuracy) || 0)));
  const safeMatchedPairs = Math.max(0, Math.round(Number(matchedPairs) || 0));
  const safeTotalPairs = Math.max(0, Math.round(Number(totalPairs) || 0));
  const scorePercent = Math.min(100, Math.max(0, Math.round((safeScore / safeMaxScore) * 100)));

  const rankLabel = rank?.label ?? "Session Complete";
  const rankMessage =
    rank?.message ??
    "You completed the memory challenge. Try again to improve your speed, accuracy, and recall.";
  const rankIconName = rank?.iconName ?? "trophy";

  const resultFingerprint = useMemo(() => {
    return [
      modeId,
      levelId,
      themeId,
      safeSeconds,
      safeMoves,
      safeMistakes,
      safeScore,
      safeAccuracy
    ].join(":");
  }, [
    modeId,
    levelId,
    themeId,
    safeSeconds,
    safeMoves,
    safeMistakes,
    safeScore,
    safeAccuracy
  ]);

  useEffect(() => {
    restartButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const entry = {
      ...createScoreEntry({
        modeId,
        levelId,
        themeId,
        score: safeScore,
        maxScore: safeMaxScore,
        moves: safeMoves,
        seconds: safeSeconds,
        mistakes: safeMistakes,
        accuracy: safeAccuracy,
        completed: true
      }),
      fingerprint: resultFingerprint
    };

    setScores((currentScores) => {
      if (currentScores.some((savedScore) => savedScore.fingerprint === resultFingerprint)) {
        return currentScores;
      }

      return keepBestScores([...currentScores, entry], 5);
    });
  }, [
    modeId,
    levelId,
    themeId,
    safeScore,
    safeMaxScore,
    safeMoves,
    safeSeconds,
    safeMistakes,
    safeAccuracy,
    resultFingerprint,
    setScores
  ]);

  function handleKeyDown(event) {
    if (event.key === "Escape" && onBackToConfig) {
      onBackToConfig();
    }
  }

  return (
    <div
      className="game-over-overlay"
      role="presentation"
      onKeyDown={handleKeyDown}
    >
      <section
        className="game-over-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-over-title"
        aria-describedby="game-over-description"
      >
        <div className="result-hero">
          <div className="result-badge" aria-hidden="true">
            <Icon name={rankIconName} size={34} />
          </div>

          <p className="eyebrow">Challenge completed</p>

          <h2 id="game-over-title">Memory session complete</h2>

          <p id="game-over-description" className="result-description">
            You completed <strong>{modeName}</strong> on{" "}
            <strong>{levelName}</strong> difficulty using the{" "}
            <strong>{themeName}</strong> theme.
          </p>

          <RatingScale value={stars} />

          <div className="result-rank">
            <strong>{rankLabel}</strong>
            <span>{rankMessage}</span>
          </div>
        </div>

        <div className="result-score-panel" aria-label="Final score">
          <span className="result-score-label">Final score</span>

          <strong className="result-score-value">{safeScore}</strong>

          <span className="result-score-max">
            {scorePercent}% of {safeMaxScore} possible points
          </span>

          <div
            className="result-score-track"
            role="progressbar"
            aria-label="Score performance"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={scorePercent}
          >
            <div
              className="result-score-fill"
              style={{ width: `${scorePercent}%` }}
            />
          </div>
        </div>

        <div className="result-metrics" aria-label="Final performance summary">
          <ResultMetric
            iconName="clock"
            label="Time"
            value={formatTime(safeSeconds)}
            helper={formatTimeLong(safeSeconds)}
            highlight
          />

          <ResultMetric
            iconName="cards"
            label="Moves"
            value={safeMoves}
            helper={safeMoves === 1 ? "1 attempt" : `${safeMoves} attempts`}
          />

          <ResultMetric
            iconName="check"
            label="Pairs"
            value={`${safeMatchedPairs}/${safeTotalPairs}`}
            helper="All pairs found"
            highlight
          />

          <ResultMetric
            iconName="target"
            label="Accuracy"
            value={`${safeAccuracy}%`}
            helper={safeMistakes === 0 ? "No mistakes" : `${safeMistakes} mistakes`}
          />

          <ResultMetric
            iconName="score"
            label="Score"
            value={safeScore}
            helper={`Maximum: ${safeMaxScore}`}
            highlight
          />
        </div>

        <BestScoreNote scores={scores} currentScore={safeScore} />

        <div className="result-actions">
          <button
            ref={restartButtonRef}
            className="primary-button"
            type="button"
            onClick={onRestart}
          >
            <Icon name="restart" size={18} />
            <span>Play again</span>
          </button>

          {onBackToConfig && (
            <button
              className="secondary-button"
              type="button"
              onClick={onBackToConfig}
            >
              <Icon name="back" size={18} />
              <span>Back to setup</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}