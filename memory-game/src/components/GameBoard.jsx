import { useId, useMemo } from "react";

import Card from "./Card";
import GameOver from "./GameOver";
import Icon from "./Icon";
import StatsBar from "./StatsBar";

import { useMemoryGame } from "../hooks/useMemoryGame";
import { formatTime } from "../utils/formatTime";

function getBoardMessage(lastResult, matchedPairs, totalPairs) {
  if (!lastResult) {
    return "Find all matching pairs.";
  }

  if (lastResult.type === "match") {
    return "Great memory. You found a pair.";
  }

  if (lastResult.type === "mismatch") {
    return "Not a match. Try to remember these positions.";
  }

  if (lastResult.type === "complete") {
    return `Excellent. You found all ${totalPairs} pairs.`;
  }

  if (matchedPairs === 0) {
    return "Flip two cards to find a matching pair.";
  }

  return `${matchedPairs} out of ${totalPairs} pairs found. Keep going.`;
}

function getFeedbackIconName(resultType) {
  if (resultType === "match") return "check";
  if (resultType === "mismatch") return "warning";
  if (resultType === "complete") return "trophy";
  return "brain";
}

function getCardSize(levelId) {
  if (levelId === "hard") return "compact";
  if (levelId === "medium") return "medium";
  return "normal";
}

export default function GameBoard({
  themeId = "animals",
  levelId = "easy",
  modeId = "classic",
  onBackToConfig
}) {
  const boardTitleId = useId();
  const boardDescriptionId = useId();
  const feedbackId = useId();

  const game = useMemoryGame({
    themeId,
    levelId,
    modeId
  });

  const {
    cards,
    moves,
    mistakes,
    seconds,
    score,
    maxScore,
    accuracy,
    rank,
    matchedPairs,
    totalPairs,
    progress,
    status,
    lastResult,
    canFlip,
    isChecking,
    isWon,
    theme,
    level,
    gridStyle,
    flipCard,
    restartGame
  } = game;

  const boardMessage = useMemo(() => {
    return getBoardMessage(lastResult, matchedPairs, totalPairs);
  }, [lastResult, matchedPairs, totalPairs]);

  const feedbackIconName = useMemo(() => {
    return getFeedbackIconName(lastResult?.type);
  }, [lastResult?.type]);

  const cardSize = getCardSize(level.id);

  const boardClassName = [
    "game-board",
    `game-board-${level.id}`,
    isChecking ? "game-board-checking" : "",
    isWon ? "game-board-complete" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const gridClassName = [
    "cards-grid",
    `cards-grid-${level.columns}`,
    `cards-grid-${level.id}`
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={boardClassName}
      aria-labelledby={boardTitleId}
      aria-describedby={boardDescriptionId}
      style={{ "--theme-accent": theme.accent }}
    >
      <div className="game-board-header">
        <div className="game-board-heading">
          <p className="eyebrow board-meta">
            <span className="inline-meta-item">
              <Icon name={theme.iconName} size={16} />
              <span>{theme.name}</span>
            </span>

            <span className="meta-separator" aria-hidden="true">
              ·
            </span>

            <span className="inline-meta-item">
              <Icon name={level.iconName} size={16} />
              <span>{level.name}</span>
            </span>
          </p>

          <h2 id={boardTitleId}>Classic Match</h2>

          <p id={boardDescriptionId} className="section-description">
            Flip two cards at a time, remember their positions, and find all
            matching pairs with as few moves as possible.
          </p>
        </div>

        <div className="game-board-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={restartGame}
          >
            <Icon name="restart" size={18} />
            <span>Restart</span>
          </button>

          {onBackToConfig && (
            <button
              className="ghost-button"
              type="button"
              onClick={onBackToConfig}
            >
              <Icon name="back" size={18} />
              <span>Setup</span>
            </button>
          )}
        </div>
      </div>

      <StatsBar
        seconds={seconds}
        moves={moves}
        mistakes={mistakes}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
        score={score}
        maxScore={maxScore}
        accuracy={accuracy}
        progress={progress}
        rank={rank}
        modeId={modeId}
        status={status}
      />

      <div className="board-feedback" id={feedbackId} aria-live="polite">
        <span className="board-feedback-icon" aria-hidden="true">
          <Icon name={feedbackIconName} size={20} />
        </span>

        <span>{boardMessage}</span>
      </div>

      <div className="board-surface">
        <div
          className={gridClassName}
          style={gridStyle}
          role="grid"
          aria-label={`${level.name} memory grid with ${level.rows} rows, ${level.columns} columns, and ${totalPairs} pairs`}
          aria-describedby={feedbackId}
        >
          {cards.map((card, index) => (
            <div
              className="card-cell"
              role="gridcell"
              key={card.uid}
              aria-rowindex={Math.floor(index / level.columns) + 1}
              aria-colindex={(index % level.columns) + 1}
            >
              <Card
                card={card}
                index={index}
                size={cardSize}
                onClick={flipCard}
                disabled={!canFlip || isChecking}
                showLabel={level.id !== "hard"}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="game-board-footer" aria-label="Current game summary">
        <span>
          Grid: <strong>{level.gridLabel}</strong>
        </span>

        <span>
          Theme: <strong>{theme.name}</strong>
        </span>

        <span>
          Time: <strong>{formatTime(seconds)}</strong>
        </span>
      </div>

      {isWon && (
        <GameOver
          modeId={modeId}
          levelId={level.id}
          themeId={theme.id}
          modeName="Classic Match"
          themeName={theme.name}
          levelName={level.name}
          seconds={seconds}
          moves={moves}
          mistakes={mistakes}
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
          score={score}
          maxScore={maxScore}
          accuracy={accuracy}
          rank={rank}
          stars={game.stars}
          onRestart={restartGame}
          onBackToConfig={onBackToConfig}
        />
      )}
    </section>
  );
}