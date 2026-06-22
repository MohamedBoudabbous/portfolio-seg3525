import Icon from "./Icon";

import { useStoredScores } from "../hooks/useLocalStorage";
import { formatTime } from "../utils/formatTime";

function formatDate(dateValue) {
  if (!dateValue) {
    return "Unknown date";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function ScoreMetric({ iconName, label, value }) {
  return (
    <span className="leaderboard-metric">
      <Icon name={iconName} size={16} />
      <span className="sr-only">{label}: </span>
      <span>{value}</span>
    </span>
  );
}

function ScoreRow({ score, index }) {
  const safeScore = Math.max(0, Math.round(Number(score.score) || 0));
  const safeMoves = Math.max(0, Math.round(Number(score.moves) || 0));
  const safeAccuracy = Math.min(100, Math.max(0, Math.round(Number(score.accuracy) || 0)));
  const safeSeconds = Math.max(0, Math.floor(Number(score.seconds) || 0));

  return (
    <li className="leaderboard-row">
      <div className="leaderboard-rank" aria-label={`Rank ${index + 1}`}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="leaderboard-score-main">
        <div className="leaderboard-score-line">
          <strong>{safeScore}</strong>
          <span>points</span>
        </div>

        <div className="leaderboard-score-date">
          {formatDate(score.createdAt)}
        </div>
      </div>

      <div className="leaderboard-score-metrics" aria-label="Score details">
        <ScoreMetric
          iconName="clock"
          label="Time"
          value={formatTime(safeSeconds)}
        />

        <ScoreMetric
          iconName="cards"
          label="Moves"
          value={safeMoves}
        />

        <ScoreMetric
          iconName="target"
          label="Accuracy"
          value={`${safeAccuracy}%`}
        />
      </div>
    </li>
  );
}

export default function Leaderboard({
  modeId = "classic",
  levelId = "easy",
  modeName = "Classic Match",
  levelName = "Beginner",
  maxItems = 5
}) {
  const storageKey = `${modeId}_${levelId}`;
  const [scores] = useStoredScores(storageKey);

  const safeScores = Array.isArray(scores) ? scores : [];
  const visibleScores = safeScores.slice(0, maxItems);
  const hasScores = visibleScores.length > 0;

  return (
    <section className="leaderboard" aria-labelledby="leaderboard-title">
      <div className="section-heading leaderboard-heading">
        <p className="eyebrow">Local performance</p>

        <h2 id="leaderboard-title">Best scores</h2>

        <p className="section-description">
          Saved results for <strong>{modeName}</strong> on{" "}
          <strong>{levelName}</strong> difficulty.
        </p>
      </div>

      <div className="leaderboard-card">
        <div className="leaderboard-card-header">
          <span className="leaderboard-card-icon" aria-hidden="true">
            <Icon name="score" size={22} />
          </span>

          <div>
            <strong>Personal leaderboard</strong>
            <span>
              {hasScores
                ? `${visibleScores.length} saved result${visibleScores.length === 1 ? "" : "s"}`
                : "No saved results yet"}
            </span>
          </div>
        </div>

        {hasScores ? (
          <ol className="leaderboard-list">
            {visibleScores.map((score, index) => (
              <ScoreRow
                key={score.id ?? `${score.createdAt}-${index}`}
                score={score}
                index={index}
              />
            ))}
          </ol>
        ) : (
          <div className="leaderboard-empty">
            <Icon name="target" size={30} />

            <div>
              <strong>No score recorded yet</strong>
              <p>
                Complete a memory session to save your first result locally on
                this browser.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}