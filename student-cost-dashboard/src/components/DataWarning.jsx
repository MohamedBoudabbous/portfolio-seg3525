import { useId } from "react";

function DataWarning({ t }) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <aside
      className="data-warning"
      role="note"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="data-warning__inner">
        <div
          className="data-warning__icon"
          aria-hidden="true"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            focusable="false"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M12 10.5V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <circle
              cx="12"
              cy="7.5"
              r="1"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="data-warning__text">
          <h2
            id={titleId}
            className="data-warning__title"
          >
            {t.dataNotice.title}
          </h2>

          <p
            id={descriptionId}
            className="data-warning__description"
          >
            {t.dataNotice.description}
          </p>
        </div>
      </div>
    </aside>
  );
}

export default DataWarning;