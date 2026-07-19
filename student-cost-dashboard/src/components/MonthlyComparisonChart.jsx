import { useId, useState } from "react";
import { monthlyExpenses } from "../data/costData.js";

const availableMonths = Object.freeze(
  monthlyExpenses.map(
    (monthData) => monthData.month
  )
);

function MonthlyComparisonChart({ t }) {
  const titleId = useId();
  const descriptionId = useId();
  const selectId = useId();
  const chartRegionId = useId();

  const hasMonths =
    availableMonths.length > 0;

  const [
    selectedMonth,
    setSelectedMonth
  ] = useState(
    () => availableMonths[0] ?? ""
  );

  function handleMonthChange(event) {
    const nextMonth = Number(
      event.target.value
    );

    if (availableMonths.includes(nextMonth)) {
      setSelectedMonth(nextMonth);
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
          {t.charts.comparison.title}
        </h3>

        <p
          id={descriptionId}
          className="chart-card__description"
        >
          {t.charts.comparison.description}
        </p>
      </header>

      <div className="chart-card__controls">
        <div className="chart-control">
          <label
            className="chart-control__label"
            htmlFor={selectId}
          >
            {t.charts.comparison.selectLabel}
          </label>

          <div className="chart-control__select-wrapper">
            <select
              id={selectId}
              className="chart-control__select"
              name="comparison-month"
              value={selectedMonth}
              disabled={!hasMonths}
              aria-describedby={descriptionId}
              aria-controls={chartRegionId}
              onChange={handleMonthChange}
            >
              {!hasMonths ? (
                <option value="">
                  {t.common.unavailable}
                </option>
              ) : null}

              {availableMonths.map(
                (monthNumber) => (
                  <option
                    key={monthNumber}
                    value={monthNumber}
                  >
                    {t.months.long[
                      monthNumber - 1
                    ] ?? t.common.unavailable}
                  </option>
                )
              )}
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
        Le graphique à barres et son tableau accessible
        seront ajoutés dans cette région.
      */}
      <div
        id={chartRegionId}
        className="chart-card__visualization"
        data-selected-month={selectedMonth}
      />
    </article>
  );
}

export default MonthlyComparisonChart;