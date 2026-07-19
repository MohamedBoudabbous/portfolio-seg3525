import { useId } from "react";

const supportedTones = Object.freeze([
  "blue",
  "teal",
  "violet",
  "amber"
]);

/**
 * Displays one dashboard key performance indicator.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {import("react").ReactNode} props.value
 * @param {import("react").ReactNode} [props.detail]
 * @param {string} props.description
 * @param {"blue" | "teal" | "violet" | "amber"} [props.tone]
 */
function MetricCard({
  label,
  value,
  detail = null,
  description,
  tone = "blue"
}) {
  const labelId = useId();

  const resolvedTone =
    supportedTones.includes(tone)
      ? tone
      : "blue";

  const hasDetail =
    detail !== null &&
    detail !== undefined &&
    detail !== "";

  return (
    <article
      className="metric-card"
      data-tone={resolvedTone}
      aria-labelledby={labelId}
    >
      <header className="metric-card__header">
        <span
          className="metric-card__indicator"
          aria-hidden="true"
        />

        <h3
          id={labelId}
          className="metric-card__label"
        >
          {label}
        </h3>
      </header>

      <div className="metric-card__content">
        <p className="metric-card__value">
          {value}
        </p>

        {hasDetail && (
          <p className="metric-card__detail">
            {detail}
          </p>
        )}
      </div>

      <p className="metric-card__description">
        {description}
      </p>
    </article>
  );
}

export default MetricCard;