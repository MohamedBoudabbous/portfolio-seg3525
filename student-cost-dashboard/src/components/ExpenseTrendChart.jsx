import { useId, useState } from "react";
import { categoryKeys } from "../data/costData.js";

function ExpenseTrendChart({ t }) {
  const titleId = useId();
  const descriptionId = useId();
  const selectId = useId();
  const chartRegionId = useId();

  const hasCategories =
    categoryKeys.length > 0;

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState(() => categoryKeys[0] ?? "");

  function handleCategoryChange(event) {
    const nextCategory = event.target.value;

    if (categoryKeys.includes(nextCategory)) {
      setSelectedCategory(nextCategory);
    }
  }

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
          {t.charts.trend.title}
        </h3>

        <p
          id={descriptionId}
          className="chart-card__description"
        >
          {t.charts.trend.description}
        </p>
      </header>

      <div className="chart-card__controls">
        <div className="chart-control">
          <label
            className="chart-control__label"
            htmlFor={selectId}
          >
            {t.charts.trend.selectLabel}
          </label>

          <div className="chart-control__select-wrapper">
            <select
              id={selectId}
              className="chart-control__select"
              name="expense-category"
              value={selectedCategory}
              disabled={!hasCategories}
              aria-describedby={descriptionId}
              aria-controls={chartRegionId}
              onChange={handleCategoryChange}
            >
              {!hasCategories ? (
                <option value="">
                  {t.common.unavailable}
                </option>
              ) : null}

              {categoryKeys.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {t.categories[category]}
                </option>
              ))}
            </select>

            <svg
              className="chart-control__chevron"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="m7 10 5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/*
        Le composant Line de react-chartjs-2 et son tableau
        accessible seront ajoutés dans cette région.
      */}
      <div
        id={chartRegionId}
        className="chart-card__visualization"
        data-selected-category={selectedCategory}
      />
    </article>
  );
}

export default ExpenseTrendChart;