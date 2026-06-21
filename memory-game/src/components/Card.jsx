import { memo } from "react";

import Icon from "./Icon";

function getCardState({ isFlipped, isMatched, isWrong }) {
  if (isMatched) return "matched";
  if (isWrong) return "wrong";
  if (isFlipped) return "flipped";
  return "hidden";
}

function Card({
  card,
  onClick,
  disabled = false,
  index,
  size = "normal",
  showLabel = true,
  revealAll = false
}) {
  const {
    uid,
    symbolName,
    label,
    isFlipped = false,
    isMatched = false,
    isWrong = false
  } = card;

  const isVisible = isFlipped || isMatched || revealAll;
  const isDisabled = disabled || isMatched;
  const state = getCardState({ isFlipped: isVisible, isMatched, isWrong });

  const className = [
    "memory-card",
    `memory-card-${size}`,
    isVisible ? "memory-card-flipped" : "",
    isMatched ? "memory-card-matched" : "",
    isWrong ? "memory-card-wrong" : "",
    isDisabled ? "memory-card-disabled" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const ariaLabel = isVisible
    ? `${label} card${isMatched ? ", matched" : ""}`
    : `Hidden card${Number.isInteger(index) ? ` ${index + 1}` : ""}`;

  function handleClick() {
    if (isDisabled) {
      return;
    }

    onClick?.(uid);
  }

  return (
    <button
      className={className}
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-pressed={isVisible}
      aria-disabled={isDisabled}
      data-card-state={state}
      data-card-id={uid}
    >
      <span className="memory-card-inner" aria-hidden="true">
        <span className="memory-card-face memory-card-back">
          <span className="memory-card-back-pattern">
            <span className="memory-card-back-icon">
              <Icon name="brain" size={26} />
            </span>
          </span>
        </span>

        <span className="memory-card-face memory-card-front">
          <span className="memory-card-symbol">
            <Icon name={symbolName} size={44} />
          </span>

          {showLabel && (
            <span className="memory-card-label">{label}</span>
          )}

          {isMatched && (
            <span className="memory-card-match-badge">
              <Icon name="check" size={14} />
            </span>
          )}
        </span>
      </span>

      <span className="sr-only">
        {isVisible ? label : "Hidden card"}
      </span>
    </button>
  );
}

export default memo(Card, (previousProps, nextProps) => {
  return (
    previousProps.card.uid === nextProps.card.uid &&
    previousProps.card.symbolName === nextProps.card.symbolName &&
    previousProps.card.isFlipped === nextProps.card.isFlipped &&
    previousProps.card.isMatched === nextProps.card.isMatched &&
    previousProps.card.isWrong === nextProps.card.isWrong &&
    previousProps.disabled === nextProps.disabled &&
    previousProps.size === nextProps.size &&
    previousProps.showLabel === nextProps.showLabel &&
    previousProps.revealAll === nextProps.revealAll
  );
});