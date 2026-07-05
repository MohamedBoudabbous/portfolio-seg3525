function EmptyStateIcon() {
  return (
    <svg
      className="empty-state-icon"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="10"
        y="14"
        width="44"
        height="34"
        rx="10"
        fill="currentColor"
        opacity="0.08"
      />
      <path
        d="M22 27H42"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M22 36H34"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M44 42L53 51"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="39"
        cy="37"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

export function EmptyState({
  title = "No products match your filters.",
  message = "Try clearing one filter or increasing the maximum price.",
  actionLabel = "Adjust your filters",
}) {
  return (
    <div
      className="empty-state"
      role="status"
      aria-live="polite"
      aria-labelledby="empty-state-title"
    >
      <div className="empty-state-visual">
        <EmptyStateIcon />
      </div>

      <div className="empty-state-content">
        <p className="eyebrow">No results</p>

        <h3 id="empty-state-title">{title}</h3>

        <p>{message}</p>

        <div className="empty-state-help">
          <span className="empty-state-help-dot" aria-hidden="true" />
          <span>{actionLabel}</span>
        </div>
      </div>
    </div>
  );
}