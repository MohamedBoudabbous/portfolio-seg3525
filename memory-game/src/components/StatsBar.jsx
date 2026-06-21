import Icon from "./Icon";

import { formatTime } from "../utils/formatTime";

function StatItem({
  iconName,
  label,
  value,
  helper,
  highlight = false,
  danger = false,
  ariaLabel
}) {
  const className = [
    "stat-card",
    highlight ? "stat-card-highlight" : "",
    danger ? "stat-card-danger" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className} aria-label={ariaLabel ?? `${label}: ${value}`}>
      <span className="stat-icon" aria-hidden="true">
        <Icon name={iconName} size={20} />
      </span>

      <span className="stat-content">
        <span className="stat-label">{label}</span>
        <strong className="stat-value">{value}</strong>
        {helper && <span className="stat-helper">{helper}</span>}
      </span>
    </article>
  );
}

export default function StatsBar({
  seconds = 0,
  moves = 0,
  mistakes = 0,
  matchedPairs = 0,
  totalPairs = 0,
  score = 0,
  maxScore = 0,
  accuracy = 0,
  progress = 0,
  rank,
  remainingTime = null,
  showMistakes = true,
  showAccuracy = true,
  showProgress = true,
  modeId = "classic",
  status = "playing"
}) {
  const safeScore = Math.max(0, Math.round(Number(score) || 0));
  const safeMaxScore = Math.max(0, Math.round(Number(maxScore) || 0));
  const safeAccuracy = Math.min(100, Math.max(0, Math.round(Number(accuracy) || 0)));
  const safeProgress = Math.min(100, Math.max(0, Math.round(Number(progress) || 0)));
  const safeMatchedPairs = Math.max(0, Math.round(Number(matchedPairs) || 0));
  const safeTotalPairs = Math.max(0, Math.round(Number(totalPairs) || 0));
  const safeMoves = Math.max(0, Math.round(Number(moves) || 0));
  const safeMistakes = Math.max(0, Math.round(Number(mistakes) || 0));

  const isFocusMode = modeId === "focus";
  const hasRemainingTime = Number.isFinite(remainingTime);
  const displayedTime = isFocusMode && hasRemainingTime ? remainingTime : seconds;
  const timeLabel = isFocusMode && hasRemainingTime ? "Time left" : "Time";
  const timeDanger = isFocusMode && hasRemainingTime && remainingTime <= 10;
  const scoreHelper = safeMaxScore > 0 ? `Best possible: ${safeMaxScore}` : null;
  const pairHelper = safeTotalPairs > 0 ? `${safeProgress}% complete` : "No pairs yet";
  const rankLabel = rank?.label ?? "Training";
  const rankIconName = rank?.iconName ?? "brain";

  return (
    <section className="stats-panel" aria-label="Game statistics">
      <div className="stats-bar" role="list">
        <div role="listitem">
          <StatItem
            iconName={timeDanger ? "warning" : "clock"}
            label={timeLabel}
            value={formatTime(displayedTime)}
            helper={status === "checking" ? "Checking cards" : "Live"}
            danger={timeDanger}
            ariaLabel={`${timeLabel}: ${formatTime(displayedTime)}`}
          />
        </div>

        <div role="listitem">
          <StatItem
            iconName="cards"
            label="Moves"
            value={safeMoves}
            helper={safeMoves === 1 ? "1 attempt" : `${safeMoves} attempts`}
            ariaLabel={`Moves: ${safeMoves}`}
          />
        </div>

        <div role="listitem">
          <StatItem
            iconName="check"
            label="Pairs"
            value={`${safeMatchedPairs}/${safeTotalPairs}`}
            helper={pairHelper}
            ariaLabel={`Pairs found: ${safeMatchedPairs} out of ${safeTotalPairs}`}
          />
        </div>

        <div role="listitem">
          <StatItem
            iconName="score"
            label="Score"
            value={safeScore}
            helper={scoreHelper}
            highlight
            ariaLabel={`Score: ${safeScore}`}
          />
        </div>

        {showMistakes && (
          <div role="listitem">
            <StatItem
              iconName="warning"
              label="Mistakes"
              value={safeMistakes}
              helper={safeMistakes === 0 ? "Perfect so far" : "Try slowing down"}
              danger={safeMistakes >= 5}
              ariaLabel={`Mistakes: ${safeMistakes}`}
            />
          </div>
        )}

        {showAccuracy && (
          <div role="listitem">
            <StatItem
              iconName="target"
              label="Accuracy"
              value={`${safeAccuracy}%`}
              helper={rankLabel}
              highlight={safeAccuracy >= 85}
              ariaLabel={`Accuracy: ${safeAccuracy} percent`}
            />
          </div>
        )}

        <div role="listitem">
          <StatItem
            iconName={rankIconName}
            label="Rank"
            value={rankLabel}
            helper={rank?.message ?? "Keep training your memory"}
            highlight
            ariaLabel={`Current rank: ${rankLabel}`}
          />
        </div>
      </div>

      {showProgress && (
        <div
          className="progress-section"
          role="progressbar"
          aria-label="Game progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={safeProgress}
        >
          <div className="progress-header">
            <span>Progress</span>
            <strong>{safeProgress}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {`Time ${formatTime(displayedTime)}, ${safeMoves} moves, ${safeMatchedPairs} pairs found out of ${safeTotalPairs}, score ${safeScore}.`}
      </p>
    </section>
  );
}