import {
  useId,
  useState
} from "react";

import { Line } from "react-chartjs-2";

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
  formatMonth,
  getLocale
} from "../utils/formatters.js";

import {
  findMaximumValue
} from "../utils/statistics.js";

function createTrendInsight({
  categoryLabel,
  values,
  language,
  t
}) {
  if (values.length === 0) {
    return t.charts.trend.emptyMessage;
  }

  const firstValue = values[0];

  const lastValue =
    values[values.length - 1];

  const firstMonth =
    formatMonth(1, language);

  const lastMonth =
    formatMonth(
      values.length,
      language
    );

  const maximumValue =
    findMaximumValue(values);

  const maximumIndex =
    values.indexOf(maximumValue);

  const maximumMonth =
    formatMonth(
      maximumIndex + 1,
      language
    );

  const formattedFirstValue =
    formatCurrency(
      firstValue,
      language
    );

  const formattedLastValue =
    formatCurrency(
      lastValue,
      language
    );

  const formattedMaximumValue =
    formatCurrency(
      maximumValue,
      language
    );

  const peakInsight =
    t.insights.trendPeak({
      category: categoryLabel,
      month: maximumMonth,
      value: formattedMaximumValue
    });

  if (lastValue > firstValue) {
    return [
      t.insights.trendIncrease({
        category: categoryLabel,
        startMonth: firstMonth,
        endMonth: lastMonth,
        startValue:
          formattedFirstValue,
        endValue:
          formattedLastValue
      }),
      peakInsight
    ].join(" ");
  }

  if (lastValue < firstValue) {
    return [
      t.insights.trendDecrease({
        category: categoryLabel,
        startMonth: firstMonth,
        endMonth: lastMonth,
        startValue:
          formattedFirstValue,
        endValue:
          formattedLastValue
      }),
      peakInsight
    ].join(" ");
  }

  const isCompletelyStable =
    values.every(
      (value) => value === firstValue
    );

  if (isCompletelyStable) {
    return t.insights.trendStable({
      category: categoryLabel,
      startMonth: firstMonth,
      endMonth: lastMonth,
      value: formattedFirstValue
    });
  }

  /*
   * Si janvier et décembre sont identiques,
   * mais que les mois intermédiaires varient,
   * annoncer seulement le maximum évite
   * d’affirmer incorrectement que toute
   * la série est restée stable.
   */
  return peakInsight;
}

function ExpenseTrendChart({
  language,
  t
}) {
  const selectId = useId();
  const chartRegionId = useId();

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("food");

  const hasData =
    categoryKeys.length > 0 &&
    monthlyExpenses.length > 0;

  const categoryLabel =
    t.categories[selectedCategory] ??
    t.common.unavailable;

  const values = monthlyExpenses.map(
    (monthData) =>
      monthData[selectedCategory]
  );

  function handleCategoryChange(event) {
    const nextCategory =
      event.target.value;

    if (
      categoryKeys.includes(nextCategory)
    ) {
      setSelectedCategory(nextCategory);
    }
  }

  const chartData = {
    labels: t.months.short,

    datasets: [
      {
        label:
          `${t.charts.trend.datasetLabel} — ${categoryLabel}`,
        data: values,
        borderColor: "#2563a6",
        backgroundColor:
          "rgba(37, 99, 166, 0.12)",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHitRadius: 12,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#2563a6",
        pointBorderWidth: 2,
        fill: false,
        tension: 0.25,
        spanGaps: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    locale: getLocale(language),

    interaction: {
      mode: "index",
      intersect: false
    },

    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        displayColors: false,

        callbacks: {
          label(context) {
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
            t.charts.trend.xAxisTitle,
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
          maxRotation: 45,
          minRotation: 0
        }
      },

      y: {
        title: {
          display: true,
          text:
            t.charts.trend.yAxisTitle,
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

  const insight = createTrendInsight({
    categoryLabel,
    values,
    language,
    t
  });

  const tableColumns = [
    {
      key: "month",
      header:
        t.dataTable.monthHeader,
      rowHeader: true
    },
    {
      key: "category",
      header:
        t.dataTable.categoryHeader
    },
    {
      key: "amount",
      header:
        t.dataTable.amountHeader,
      align: "end"
    }
  ];

  const tableRows =
    monthlyExpenses.map(
      (monthData) => ({
        id: monthData.id,

        month: formatMonth(
          monthData.month,
          language
        ),

        category: categoryLabel,

        amount: formatCurrency(
          monthData[selectedCategory],
          language
        )
      })
    );

  const controls = (
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
          disabled={!hasData}
          aria-controls={chartRegionId}
          onChange={handleCategoryChange}
        >
          {!hasData && (
            <option value="">
              {t.common.unavailable}
            </option>
          )}

          {categoryKeys.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {
                  t.categories[category] ??
                  t.common.unavailable
                }
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

  /*
   * Oxlint ne sait pas que le composant
   * React Chart.js génère un élément canvas.
   */
  /* oxlint-disable jsx-a11y/prefer-tag-over-role -- Chart.js renders a canvas element. */
  const chart = hasData ? (
    <div
      id={chartRegionId}
      className="chart-card__chart-mount"
    >
      <Line
        role="img"
        aria-label={
          t.charts.trend.ariaLabel(
            categoryLabel
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
      {t.charts.trend.emptyMessage}
    </p>
  );
  /* oxlint-enable jsx-a11y/prefer-tag-over-role */

  const table = (
    <AccessibleDataTable
      caption={
        t.dataTable.trendCaption(
          categoryLabel
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
      title={t.charts.trend.title}
      description={
        t.charts.trend.description
      }
      controls={controls}
      chart={chart}
      insight={insight}
      table={table}
    />
  );
}

export default ExpenseTrendChart;