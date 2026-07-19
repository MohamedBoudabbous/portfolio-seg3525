import {
  useId,
  useState
} from "react";

import { Bar } from "react-chartjs-2";

import AccessibleDataTable
  from "./AccessibleDataTable.jsx";
import ChartCard
  from "./ChartCard.jsx";

import {
  categoryKeys,
  monthlyExpenses
} from "../data/costData.js";

import {
  formatCurrency,
  formatInteger,
  formatMonth,
  getLocale
} from "../utils/formatters.js";

import {
  findMaximumValue
} from "../utils/statistics.js";

const availableMonths = Object.freeze(
  monthlyExpenses.map(
    (monthData) => monthData.month
  )
);

const barColours = Object.freeze({
  defaultBackground: "#2563a6",
  defaultBorder: "#1d4f7a",
  highestBackground: "#d97706",
  highestBorder: "#9a3412"
});

/**
 * Splits long category labels over multiple lines.
 *
 * Chart.js accepts an array of strings for a multiline label.
 *
 * @param {string} label
 * @returns {string | Array<string>}
 */
function createAxisLabel(label) {
  return label.length > 14
    ? label.split(" ")
    : label;
}

function MonthlyComparisonChart({
  language,
  t
}) {
  const selectId = useId();
  const chartRegionId = useId();

  const [
    selectedMonth,
    setSelectedMonth
  ] = useState(1);

  const selectedMonthData =
    monthlyExpenses.find(
      (item) =>
        item.month === selectedMonth
    );

  const hasMonths =
    availableMonths.length > 0;

  const hasData =
    selectedMonthData !== undefined;

  const selectedMonthLabel =
    formatMonth(
      selectedMonth,
      language
    );

  const categoryLabels =
    categoryKeys.map(
      (category) =>
        t.categories[category] ??
        t.common.unavailable
    );

  const values = selectedMonthData
    ? categoryKeys.map(
        (category) =>
          selectedMonthData[category]
      )
    : [];

  const maximumValue =
    findMaximumValue(values);

  const highestCategoryIndex =
    maximumValue === null
      ? -1
      : values.indexOf(maximumValue);

  const highestCategory =
    categoryKeys[
      highestCategoryIndex
    ] ?? null;

  const highestCategoryLabel =
    highestCategory
      ? (
          t.categories[
            highestCategory
          ] ?? t.common.unavailable
        )
      : t.common.unavailable;

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

  const chartData = {
    labels:
      categoryLabels.map(
        createAxisLabel
      ),

    datasets: [
      {
        label:
          t.charts.comparison.datasetLabel(
            selectedMonthLabel
          ),

        data: values,

        backgroundColor:
          categoryKeys.map(
            (_, index) =>
              index ===
              highestCategoryIndex
                ? barColours
                    .highestBackground
                : barColours
                    .defaultBackground
          ),

        borderColor:
          categoryKeys.map(
            (_, index) =>
              index ===
              highestCategoryIndex
                ? barColours.highestBorder
                : barColours.defaultBorder
          ),

        borderWidth:
          categoryKeys.map(
            (_, index) =>
              index ===
              highestCategoryIndex
                ? 3
                : 1
          ),

        borderRadius: 7,
        borderSkipped: false,
        maxBarThickness: 48,
        categoryPercentage: 0.78,
        barPercentage: 0.82
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    locale: getLocale(language),

    interaction: {
      mode: "nearest",
      intersect: true
    },

    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        displayColors: true,

        callbacks: {
          title(items) {
            const dataIndex =
              items[0]?.dataIndex;

            return (
              categoryLabels[
                dataIndex
              ] ?? ""
            );
          },

          label(context) {
            const categoryLabel =
              categoryLabels[
                context.dataIndex
              ] ?? t.common.unavailable;

            return (
              `${categoryLabel}: ` +
              formatCurrency(
                Number(context.parsed.y),
                language
              )
            );
          }
        }
      }
    },

    scales: {
      x: {
        title: {
          display: true,
          text:
            t.charts.comparison
              .xAxisTitle,
          color: "#334155",
          font: {
            weight: "bold"
          }
        },

        grid: {
          display: false
        },

        border: {
          color: "#cbd5e1"
        },

        ticks: {
          autoSkip: false,
          color: "#475569",
          maxRotation: 35,
          minRotation: 35,
          padding: 6
        }
      },

      y: {
        beginAtZero: true,

        title: {
          display: true,
          text:
            t.charts.comparison
              .yAxisTitle,
          color: "#334155",
          font: {
            weight: "bold"
          }
        },

        grid: {
          color:
            "rgba(148, 163, 184, 0.22)"
        },

        border: {
          display: false
        },

        ticks: {
          color: "#475569",

          callback(value) {
            return formatCurrency(
              Number(value),
              language
            );
          }
        }
      }
    }
  };

  const insight =
    hasData &&
    highestCategory &&
    maximumValue !== null
      ? t.insights.comparisonHighest({
          month: selectedMonthLabel,
          category:
            highestCategoryLabel,
          value: formatCurrency(
            maximumValue,
            language
          )
        })
      : t.charts.comparison.emptyMessage;

  const tableColumns = [
    {
      key: "category",
      header:
        t.dataTable.categoryHeader,
      rowHeader: true
    },
    {
      key: "amount",
      header:
        t.dataTable.amountHeader,
      align: "end"
    },
    {
      key: "currency",
      header:
        t.dataTable.currencyHeader
    }
  ];

  const tableRows =
    selectedMonthData
      ? categoryKeys.map(
          (category) => ({
            id:
              `${selectedMonth}-${category}`,

            category:
              t.categories[category] ??
              t.common.unavailable,

            amount: formatInteger(
              selectedMonthData[
                category
              ],
              language
            ),

            currency:
              t.common.currencyCode
          })
        )
      : [];

  const controls = (
    <div className="chart-control">
      <label
        className="chart-control__label"
        htmlFor={selectId}
      >
        {
          t.charts.comparison
            .selectLabel
        }
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
                {formatMonth(
                  monthNumber,
                  language
                )}
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

  const chart = hasData ? (
  <div
    id={chartRegionId}
    className="chart-card__chart-mount"
  >
    <Bar
      role="img"
      aria-label={
        t.charts.comparison.ariaLabel(
          selectedMonthLabel
        )
      }
      data={chartData}
      options={chartOptions}
    />
  </div>
  ) : (
    <p
      id={chartRegionId}
      className="chart-card__empty-message"
    >
      {
        t.charts.comparison
          .emptyMessage
      }
    </p>
  );

  const table = (
    <AccessibleDataTable
      caption={
        t.dataTable.comparisonCaption(
          selectedMonthLabel
        )
      }
      columns={tableColumns}
      rows={tableRows}
      showLabel={
        t.dataTable.showData
      }
      hideLabel={
        t.dataTable.hideData
      }
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
      insight={insight}
      table={table}
    />
  );
}

export default MonthlyComparisonChart;