import Card from "./Card";
import GameOver from "./GameOver";
import Icon from "./Icon";
import StatsBar from "./StatsBar";

import {
  FOCUS_RESULT_TYPES,
  FOCUS_STATUS,
  useFocusChallenge
} from "../hooks/useFocusChallenge";
import { formatTime } from "../utils/formatTime";

function getCardSize(levelId) {
  if (levelId === "hard") {
    return "compact";
  }

  if (levelId === "medium") {
    return "medium";
  }

  return "normal";
}

function getPressureCopy({ pressureLevel, remainingTime, penaltySeconds, combo }) {
  if (pressureLevel === "victory") {
    return {
      iconName: "trophy",
      title: "Challenge cleared",
      message: "You finished before the timer expired."
    };
  }

  if (pressureLevel === "critical") {
    return {
      iconName: "warning",
      title: "Critical pressure",
      message: `${remainingTime}s left. One mistake can end the run.`
    };
  }

  if (pressureLevel === "danger") {
    return {
      iconName: "warning",
      title: "Time is low",
      message: `Each mismatch removes ${penaltySeconds}s. Stay precise.`
    };
  }

  if (pressureLevel === "combo") {
    return {
      iconName: "target",
      title: `Combo x${combo}`,
      message: "Clean matches are boosting your score."
    };
  }

  return {
    iconName: "focus",
    title: "Focus mode",
    message: "Match fast. Mistakes reduce the timer and destroy your combo."
  };
}

function getResultCopy(lastResult) {
  if (!lastResult || lastResult.type === FOCUS_RESULT_TYPES.none) {
    return null;
  }

  if (lastResult.type === FOCUS_RESULT_TYPES.match) {
    return {
      iconName: "check",
      title: "Match",
      message: lastResult.message
    };
  }

  if (lastResult.type === FOCUS_RESULT_TYPES.combo) {
    return {
      iconName: "target",
      title: `Combo x${lastResult.combo}`,
      message: lastResult.message
    };
  }

  if (lastResult.type === FOCUS_RESULT_TYPES.mismatch) {
    return {
      iconName: "warning",
      title: "Mismatch",
      message: lastResult.message
    };
  }

  if (lastResult.type === FOCUS_RESULT_TYPES.warning) {
    return {
      iconName: "warning",
      title: "Warning",
      message: lastResult.message
    };
  }

  if (lastResult.type === FOCUS_RESULT_TYPES.timeout) {
    return {
      iconName: "warning",
      title: "Time out",
      message: lastResult.message
    };
  }

  if (lastResult.type === FOCUS_RESULT_TYPES.complete) {
    return {
      iconName: "trophy",
      title: "Complete",
      message: lastResult.message
    };
  }

  return {
    iconName: "focus",
    title: "Focus",
    message: lastResult.message
  };
}

function FocusTimer({
  remainingTime,
  timeLimit,
  timeProgress,
  pressureLevel,
  penaltySeconds
}) {
  return (
    <section
      className={`focus-timer focus-timer-${pressureLevel}`}
      aria-labelledby="focus-timer-title"
    >
      <div className="focus-timer-copy">
        <p className="eyebrow">Time pressure</p>
        <h2 id="focus-timer-title">{formatTime(remainingTime)}</h2>
        <p>
          {remainingTime > 0
            ? `${remainingTime}s remaining from a ${timeLimit}s limit`
            : "Timer expired"}
        </p>
      </div>

      <div className="focus-timer-ring" aria-hidden="true">
        <span>{timeProgress}%</span>
      </div>

      <div className="focus-timer-track" aria-hidden="true">
        <span style={{ width: `${timeProgress}%` }} />
      </div>

      <div className="focus-penalty-badge">
        <Icon name="warning" size={16} />
        <span>-{penaltySeconds}s per mismatch</span>
      </div>
    </section>
  );
}

function FocusPressurePanel({
  pressureLevel,
  remainingTime,
  penaltySeconds,
  combo,
  bestCombo,
  lastResult,
  instruction
}) {
  const pressureCopy = getPressureCopy({
    pressureLevel,
    remainingTime,
    penaltySeconds,
    combo
  });

  const resultCopy = getResultCopy(lastResult);

  return (
    <section
      className={`focus-pressure-panel focus-pressure-${pressureLevel}`}
      aria-live="polite"
    >
      <div className="focus-pressure-main">
        <span className="focus-pressure-icon" aria-hidden="true">
          <Icon name={resultCopy?.iconName ?? pressureCopy.iconName} size={22} />
        </span>

        <div>
          <p className="eyebrow">{resultCopy?.title ?? pressureCopy.title}</p>
          <h3>{resultCopy?.message ?? pressureCopy.message}</h3>
          <span>{instruction}</span>
        </div>
      </div>

      <div className="focus-combo-panel">
        <div>
          <span>Current combo</span>
          <strong>x{combo}</strong>
        </div>

        <div>
          <span>Best combo</span>
          <strong>x{bestCombo}</strong>
        </div>
      </div>
    </section>
  );
}

function FocusProgressStrip({
  matchedPairs,
  totalPairs,
  mistakes,
  remainingTime,
  pressureLevel
}) {
  return (
    <section className="focus-strip" aria-label="Focus challenge summary">
      <div className={`focus-strip-item focus-strip-${pressureLevel}`}>
        <Icon name="cards" size={18} />
        <span>Pairs</span>
        <strong>
          {matchedPairs}/{totalPairs}
        </strong>
      </div>

      <div className="focus-strip-item">
        <Icon name="warning" size={18} />
        <span>Mistakes</span>
        <strong>{mistakes}</strong>
      </div>

      <div className="focus-strip-item">
        <Icon name="clock" size={18} />
        <span>Time left</span>
        <strong>{remainingTime}s</strong>
      </div>
    </section>
  );
}

export default function FocusChallenge({
  levelId = "easy",
  themeId = "animals",
  onBackToConfig
}) {
  const game = useFocusChallenge({
    levelId,
    themeId,
    autoStart: true
  });

  const {
    cards,
    moves,
    mistakes,
    seconds,
    remainingTime,
    timeLimit,
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
    penaltySeconds,
    theme,
    level,
    gridStyle,
    isChecking,
    isWon,
    isLost,
    isComplete,
    canFlip,
    restartGame,
    flipCard
  } = game;

  const cardSize = getCardSize(level.id);

  const boardClassName = [
    "game-board",
    "focus-challenge",
    `game-board-${level.id}`,
    `focus-challenge-${status}`,
    `focus-pressure-${pressureLevel}`,
    isChecking ? "game-board-checking" : "",
    isWon ? "game-board-complete" : "",
    isLost ? "focus-challenge-lost" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <section className={boardClassName} aria-labelledby="focus-challenge-title">
        <div className="game-board-header">
          <div className="game-board-heading">
            <p className="eyebrow">Focus Challenge</p>

            <h1 id="focus-challenge-title">Beat the timer</h1>

            <div className="board-meta" aria-label="Current focus challenge settings">
              <span className="inline-meta-item">
                <Icon name={theme.iconName} size={16} />
                {theme.name}
              </span>

              <span className="meta-separator" aria-hidden="true">•</span>

              <span className="inline-meta-item">
                <Icon name={level.iconName} size={16} />
                {level.name}
              </span>

              <span className="meta-separator" aria-hidden="true">•</span>

              <span className="inline-meta-item">
                <Icon name="focus" size={16} />
                {timeLimit}s limit
              </span>
            </div>
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

        <FocusTimer
          remainingTime={remainingTime}
          timeLimit={timeLimit}
          timeProgress={timeProgress}
          pressureLevel={pressureLevel}
          penaltySeconds={penaltySeconds}
        />

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
          showMistakes
          showAccuracy
          showProgress
          modeId="focus"
          status={status}
        />

        <FocusProgressStrip
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
          mistakes={mistakes}
          remainingTime={remainingTime}
          pressureLevel={pressureLevel}
        />

        <FocusPressurePanel
          pressureLevel={pressureLevel}
          remainingTime={remainingTime}
          penaltySeconds={penaltySeconds}
          combo={combo}
          bestCombo={bestCombo}
          lastResult={lastResult}
          instruction={instruction}
        />

        <div className="board-surface focus-board-surface">
          <div
            className={`cards-grid cards-grid-${level.id} focus-cards-grid`}
            style={gridStyle}
            role="grid"
            aria-label="Focus challenge cards"
          >
            {cards.map((card, index) => {
              const cellClassName = [
                "card-cell",
                "focus-card-cell",
                card.isMatched ? "focus-card-matched" : "",
                card.isWrong ? "focus-card-wrong" : "",
                canFlip && !card.isFlipped && !card.isMatched
                  ? "focus-card-clickable"
                  : ""
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div className={cellClassName} key={card.uid} role="gridcell">
                  <Card
                    card={card}
                    index={index}
                    size={cardSize}
                    showLabel={level.id !== "hard"}
                    disabled={!canFlip || card.isMatched || card.isWrong}
                    onClick={flipCard}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <footer className="game-board-footer">
          <span>
            {isComplete
              ? isWon
                ? "Challenge completed before the timer expired."
                : "Timer expired. Try a faster and cleaner run."
              : "Every mismatch removes time and resets your combo."}
          </span>

          <strong>{phaseLabel}</strong>
        </footer>
      </section>

      {isComplete && (
        <GameOver
          modeId="focus"
          levelId={level.id}
          themeId={theme.id}
          modeName="Focus Challenge"
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
          stars={stars}
          onRestart={restartGame}
          onBackToConfig={onBackToConfig}
        />
      )}
    </>
  );
}