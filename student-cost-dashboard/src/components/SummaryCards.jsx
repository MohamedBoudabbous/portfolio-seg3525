import { useId } from "react";

import MetricCard from "./MetricCard.jsx";

import {
  categoryKeys,
  monthlyExpenses
} from "../data/costData.js";

import {
  formatCurrency,
  formatMonth
} from "../utils/formatters.js";

import {
  calculateAnnualTotal,
  calculateMonthlyAverage,
  findHighestCategory,
  findHighestMonth
} from "../utils/statistics.js";

/*
 * Les données sont statiques et immuables. Les calculs indépendants
 * de la langue peuvent donc être effectués une seule fois au
 * chargement du module.
 */
const summaryStatistics = Object.freeze({
  annualTotal:
    calculateAnnualTotal(monthlyExpenses),

  monthlyAverage:
    calculateMonthlyAverage(monthlyExpenses),

  highestCategory:
    findHighestCategory(
      monthlyExpenses,
      categoryKeys
    ),

  highestMonth:
    findHighestMonth(monthlyExpenses)
});

/**
 * Creates the localized presentation model for the KPI cards.
 *
 * @param {string} language
 * @param {object} t
 * @returns {Array<object>}
 */
function createMetrics(language, t) {
  const {
    annualTotal,
    monthlyAverage,
    highestCategory,
    highestMonth
  } = summaryStatistics;

  const highestCategoryName =
    highestCategory
      ? (
          t.categories[
            highestCategory.category
          ] ?? t.common.unavailable
        )
      : t.common.unavailable;

  const highestMonthName =
    highestMonth
      ? formatMonth(
          highestMonth.month,
          language
        )
      : t.common.unavailable;

  return [
    {
      id: "annual-total",
      tone: "blue",
      label:
        t.summary.annualTotal.label,
      value: formatCurrency(
        annualTotal,
        language
      ),
      detail: null,
      description:
        t.summary.annualTotal.description
    },
    {
      id: "monthly-average",
      tone: "teal",
      label:
        t.summary.monthlyAverage.label,
      value: formatCurrency(
        monthlyAverage,
        language
      ),
      detail: null,
      description:
        t.summary.monthlyAverage.description
    },
    {
      id: "highest-category",
      tone: "violet",
      label:
        t.summary.highestCategory.label,
      value: highestCategoryName,
      detail: highestCategory
        ? formatCurrency(
            highestCategory.total,
            language
          )
        : null,
      description:
        t.summary.highestCategory.description
    },
    {
      id: "highest-month",
      tone: "amber",
      label:
        t.summary.highestMonth.label,
      value: highestMonthName,
      detail: highestMonth
        ? formatCurrency(
            highestMonth.total,
            language
          )
        : null,
      description:
        t.summary.highestMonth.description
    }
  ];
}

function SummaryCards({
  language,
  t
}) {
  const titleId = useId();
  const metrics =
    createMetrics(language, t);

  return (
    <section
      className="summary-section"
      aria-labelledby={titleId}
    >
      <header className="section-header">
        <p className="section-eyebrow">
          {t.summary.sectionLabel}
        </p>

        <h2
          id={titleId}
          className="section-title"
        >
          {t.summary.sectionTitle}
        </h2>
      </header>

      <ul className="summary-grid">
        {metrics.map((metric) => (
          <li
            key={metric.id}
            className="summary-grid__item"
          >
            <MetricCard
              label={metric.label}
              value={metric.value}
              detail={metric.detail}
              description={
                metric.description
              }
              tone={metric.tone}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SummaryCards;