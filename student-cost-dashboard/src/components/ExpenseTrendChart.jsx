import {
  useId,
  useState
} from "react";

import ChartCard from "./ChartCard.jsx";

import {
  monthlyExpenses
} from "../data/costData.js";

const availableMonths = Object.freeze(
  monthlyExpenses.map(
    (monthData) => monthData.month
  )
);

function MonthlyComparisonChart({ t }) {
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

    if (
      availableMonths.includes(nextMonth)
    ) {
      setSelectedMonth(nextMonth);
    }
  }

  const controls = (
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
          aria-controls={chartRegionId}
          onChange={handleMonthChange}
        >
          {!hasMonths && (
            <option value="">
              {t.common.unavailable}
            </option>
          )}

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
  );

  const chart = (
    <div
      id={chartRegionId}
      className="chart-card__chart-mount"
      data-selected-month={selectedMonth}
    />
  );

  return (
    <ChartCard
      title={
        t.charts.comparison.title
      }
      description={
        t.charts.comparison.description
      }
      controls={controls}
      chart={chart}
      insight={null}
      table={null}
    />
  );
}

export default MonthlyComparisonChart;