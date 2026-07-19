import { useId } from "react";

/**
 * Shared accessible structure for dashboard charts.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {import("react").ReactNode} props.controls
 * @param {import("react").ReactNode} props.chart
 * @param {import("react").ReactNode} [props.insight]
 * @param {import("react").ReactNode} [props.table]
 */
function ChartCard({
  title,
  description,
  controls,
  chart,
  insight = null,
  table = null
}) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <article
      className="chart-card"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <header className="chart-card__header">
        <h3
          id={titleId}
          className="chart-card__title"
        >
          {title}
        </h3>

        <p
          id={descriptionId}
          className="chart-card__description"
        >
          {description}
        </p>
      </header>

      <div className="chart-card__controls">
        {controls}
      </div>

      <div className="chart-card__visualization">
        {chart}
      </div>

      <p
        className="chart-card__insight"
        aria-live="polite"
        aria-atomic="true"
      >
        {insight}
      </p>

      {table !== null &&
        table !== undefined && (
          <div className="chart-card__table">
            {table}
          </div>
        )}
    </article>
  );
}

export default ChartCard;