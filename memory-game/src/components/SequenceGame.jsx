import { useEffect, useRef } from "react";

import Card from "./Card";
import GameOver from "./GameOver";
import Icon from "./Icon";
import StatsBar from "./StatsBar";

import {
  SEQUENCE_RESULT_TYPES,
  SEQUENCE_STATUS,
  useSequenceGame
} from "../hooks/useSequenceGame";

function getCardSize(levelId) {
  if (levelId === "hard") {
    return "compact";
  }

  if (levelId === "medium") {
    return "medium";
  }

  return "normal";
}

function getResultCopy({ lastResult, cards }) {
  if (!lastResult || lastResult.type === SEQUENCE_RESULT_TYPES.none) {
    return {
      iconName: "sequence",
      title: "Watch the order",
      message: "Memorize the highlighted symbols before the recall phase starts."
    };
  }

  if (lastResult.type === SEQUENCE_RESULT_TYPES.correct) {
    return {
      iconName: "check",
      title: "Correct step",
      message: "Good recall. Continue with the next symbol in the sequence."
    };
  }

  if (lastResult.type === SEQUENCE_RESULT_TYPES.wrong) {
    const expectedCard = cards.find((card) => card.uid === lastResult.expectedUid);
    const selectedCard = cards.find((card) => card.uid === lastResult.uid);

    return {
      iconName: "warning",
      title: "Wrong step",
      message: expectedCard && selectedCard
        ? `Expected ${expectedCard.label}, but you selected ${selectedCard.label}. Keep going.`
        : "That was not the expected symbol. Keep going and finish the sequence."
    };
  }

  if (lastResult.type === SEQUENCE_RESULT_TYPES.complete) {
    return {
      iconName: "trophy",
      title: "Sequence complete",
      message: "The sequence is finished. Review your final score and accuracy."
    };
  }

  return {
    iconName: "brain",
    title: "Keep going",
    message: "Focus on the order and continue the recall."
  };
}

function SequenceTimeline({
  status,
  sequence,
  visibleSequence,
  activePreviewIndex,
  selectedSteps,
  totalSteps
}) {
  const isHidden =
    status === SEQUENCE_STATUS.ready ||
    status === SEQUENCE_STATUS.recall;

  const selectedByStep = new Map(
    selectedSteps.map((step) => [step.step, step])
  );

  return (
    <section className="sequence-panel" aria-labelledby="sequence-panel-title">
      <div className="sequence-panel-header">
        <div>
          <p className="eyebrow">Sequence path</p>
          <h3 id="sequence-panel-title">Remember the order</h3>
        </div>

        <span className="sequence-count-badge">
          {Math.max(0, selectedSteps.length)}/{Math.max(0, totalSteps)} steps
        </span>
      </div>

      <ol className="sequence-timeline" aria-label="Sequence order">
        {Array.from({ length: totalSteps }, (_, index) => {
          const visibleCard = visibleSequence[index];
          const originalCard = sequence[index];
          const selectedStep = selectedByStep.get(index);
          const isActive = status === SEQUENCE_STATUS.preview && index === activePreviewIndex;
          const isPastPreview = status === SEQUENCE_STATUS.preview && index < activePreviewIndex;
          const isCorrect = selectedStep?.isCorrect;
          const isWrong = selectedStep && !selectedStep.isCorrect;

          const className = [
            "sequence-step",
            isActive ? "sequence-step-active" : "",
            isPastPreview ? "sequence-step-seen" : "",
            isCorrect ? "sequence-step-correct" : "",
            isWrong ? "sequence-step-wrong" : "",
            isHidden ? "sequence-step-hidden" : ""
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li className={className} key={originalCard?.uid ?? index}>
              <span className="sequence-step-number">{index + 1}</span>

              {visibleCard ? (
                <>
                  <span className="sequence-step-icon" aria-hidden="true">
                    <Icon name={visibleCard.symbolName} size={22} />
                  </span>
                  <span className="sequence-step-label">{visibleCard.label}</span>
                </>
              ) : (
                <>
                  <span className="sequence-step-icon" aria-hidden="true">
                    <Icon name={isWrong ? "warning" : isCorrect ? "check" : "brain"} size={22} />
                  </span>
                  <span className="sequence-step-label">
                    {selectedStep
                      ? isCorrect
                        ? "Correct"
                        : "Missed"
                      : "Hidden"}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function SequenceFeedback({ status, phaseLabel, instruction, lastResult, cards }) {
  const resultCopy = getResultCopy({ lastResult, cards });

  return (
    <section className="board-feedback sequence-feedback" aria-live="polite">
      <span className="board-feedback-icon" aria-hidden="true">
        <Icon
          name={status === SEQUENCE_STATUS.preview ? "sequence" : resultCopy.iconName}
          size={20}
        />
      </span>

      <span className="sequence-feedback-copy">
        <strong>{phaseLabel}</strong>
        <span>
          {status === SEQUENCE_STATUS.preview || status === SEQUENCE_STATUS.recall
            ? instruction
            : resultCopy.message}
        </span>
      </span>
    </section>
  );
}

export default function SequenceGame({
  levelId = "easy",
  themeId = "animals",
  onBackToConfig
}) {
  const gridSectionRef = useRef(null);

  const game = useSequenceGame({
    levelId,
    themeId,
    autoStart: true
  });

  const {
    cards,
    sequence,
    visibleSequence,
    selectedSteps,
    activePreviewIndex,
    mistakes,
    seconds,
    score,
    maxScore,
    accuracy,
    rank,
    stars,
    progress,
    previewProgress,
    previewDurationSeconds,
    status,
    phaseLabel,
    instruction,
    lastResult,
    totalSteps,
    correctSteps,
    attempts,
    theme,
    level,
    gridStyle,
    isPreviewing,
    isRecall,
    isComplete,
    canClick,
    restartGame,
    clickCard
  } = game;

  useEffect(() => {
    if (!gridSectionRef.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      gridSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      gridSectionRef.current.focus({
        preventScroll: true
      });
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const cardSize = getCardSize(level.id);
  const boardProgress = isPreviewing ? previewProgress : progress;

  const boardClassName = [
    "game-board",
    "sequence-game",
    `game-board-${level.id}`,
    `sequence-game-${status}`,
    isComplete ? "game-board-complete" : "",
    isPreviewing ? "game-board-checking" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <section className={boardClassName} aria-labelledby="sequence-game-title">
        <div className="game-board-header">
          <div className="game-board-heading">
            <p className="eyebrow">Sequence Recall</p>

            <h1 id="sequence-game-title">Repeat the hidden order</h1>

            <div className="board-meta" aria-label="Current game settings">
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
                <Icon name="sequence" size={16} />
                {totalSteps} steps
              </span>

              <span className="meta-separator" aria-hidden="true">•</span>

              <span className="inline-meta-item">
                <Icon name="clock" size={16} />
                {previewDurationSeconds}s preview
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

        <StatsBar
          seconds={seconds}
          moves={attempts}
          mistakes={mistakes}
          matchedPairs={correctSteps}
          totalPairs={totalSteps}
          score={score}
          maxScore={maxScore}
          accuracy={accuracy}
          progress={boardProgress}
          rank={rank}
          showMistakes
          showAccuracy
          showProgress
          modeId="sequence"
          status={status}
        />

        <SequenceTimeline
          status={status}
          sequence={sequence}
          visibleSequence={visibleSequence}
          activePreviewIndex={activePreviewIndex}
          selectedSteps={selectedSteps}
          totalSteps={totalSteps}
        />

        <SequenceFeedback
          status={status}
          phaseLabel={phaseLabel}
          instruction={instruction}
          lastResult={lastResult}
          cards={cards}
        />

        <div
          className="board-surface sequence-board-surface"
          ref={gridSectionRef}
          tabIndex={-1}
        >
          <div
            className={`cards-grid cards-grid-${level.id} sequence-cards-grid`}
            style={gridStyle}
            role="grid"
            aria-label="Sequence recall choices"
          >
            {cards.map((card, index) => {
              const renderedCard = {
                ...card,
                isFlipped: true,
                isMatched: card.isCorrect,
                isWrong: card.isWrong
              };

              const cellClassName = [
                "card-cell",
                "sequence-card-cell",
                card.isPreviewTarget ? "sequence-card-preview-target" : "",
                card.isSelected ? "sequence-card-selected" : "",
                card.isCorrect ? "sequence-card-correct" : "",
                card.isWrong ? "sequence-card-wrong" : "",
                isRecall && !card.isSelected ? "sequence-card-clickable" : ""
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  className={cellClassName}
                  key={card.uid}
                  role="gridcell"
                  data-sequence-index={card.sequenceIndex ?? undefined}
                >
                  {card.isInSequence && status !== SEQUENCE_STATUS.recall && (
                    <span className="sequence-order-badge" aria-hidden="true">
                      {(card.sequenceIndex ?? 0) + 1}
                    </span>
                  )}

                  <Card
                    card={renderedCard}
                    index={index}
                    size={cardSize}
                    showLabel={level.id !== "hard"}
                    revealAll
                    disabled={!canClick || card.isSelected}
                    onClick={clickCard}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <footer className="game-board-footer">
          <span>
            {isPreviewing
              ? `Memorize the highlighted symbols during the ${previewDurationSeconds}s preview.`
              : "Click the visible symbols in the same order as the preview."}
          </span>

          <strong>{phaseLabel}</strong>
        </footer>
      </section>

      {isComplete && (
        <GameOver
          modeId="sequence"
          levelId={level.id}
          themeId={theme.id}
          modeName="Sequence Recall"
          themeName={theme.name}
          levelName={level.name}
          seconds={seconds}
          moves={attempts}
          mistakes={mistakes}
          matchedPairs={correctSteps}
          totalPairs={totalSteps}
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