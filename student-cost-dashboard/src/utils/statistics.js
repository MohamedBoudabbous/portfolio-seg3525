import { categoryKeys } from "../data/costData.js";

const validCategories = new Set(categoryKeys);

/**
 * Ensures that a value is an array.
 *
 * @param {unknown} value
 * @param {string} functionName
 */
function assertArray(value, functionName) {
  if (!Array.isArray(value)) {
    throw new TypeError(`${functionName} expects an array.`);
  }
}

/**
 * Ensures that a value is a finite number.
 *
 * @param {unknown} value
 * @param {string} functionName
 */
function assertFiniteNumber(value, functionName) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    throw new TypeError(
      `${functionName} expects finite numeric values.`
    );
  }
}

/**
 * Ensures that an expense observation contains every category.
 *
 * @param {unknown} monthData
 * @param {string} functionName
 */
function assertMonthlyExpense(monthData, functionName) {
  if (
    monthData === null ||
    typeof monthData !== "object"
  ) {
    throw new TypeError(
      `${functionName} expects a monthly expense object.`
    );
  }

  for (const category of categoryKeys) {
    assertFiniteNumber(monthData[category], functionName);
  }
}

/**
 * Ensures that a category belongs to the dataset schema.
 *
 * @param {string} category
 * @param {string} functionName
 */
function assertCategory(category, functionName) {
  if (!validCategories.has(category)) {
    throw new RangeError(
      `${functionName} received an unknown category.`
    );
  }
}

/**
 * Calculates the total of all expense categories for one month.
 *
 * @param {object} monthData
 * @returns {number}
 */
export function calculateMonthlyTotal(monthData) {
  assertMonthlyExpense(
    monthData,
    "calculateMonthlyTotal"
  );

  return categoryKeys.reduce(
    (total, category) => total + monthData[category],
    0
  );
}

/**
 * Calculates the total expenses for the complete dataset.
 * An empty dataset has a total of zero.
 *
 * @param {ReadonlyArray<object>} monthlyExpenses
 * @returns {number}
 */
export function calculateAnnualTotal(monthlyExpenses) {
  assertArray(
    monthlyExpenses,
    "calculateAnnualTotal"
  );

  return monthlyExpenses.reduce(
    (total, monthData) =>
      total + calculateMonthlyTotal(monthData),
    0
  );
}

/**
 * Calculates the average monthly expense total.
 * An empty dataset has an average of zero.
 *
 * @param {ReadonlyArray<object>} monthlyExpenses
 * @returns {number}
 */
export function calculateMonthlyAverage(
  monthlyExpenses
) {
  assertArray(
    monthlyExpenses,
    "calculateMonthlyAverage"
  );

  if (monthlyExpenses.length === 0) {
    return 0;
  }

  return (
    calculateAnnualTotal(monthlyExpenses) /
    monthlyExpenses.length
  );
}

/**
 * Calculates the annual total for one expense category.
 *
 * @param {ReadonlyArray<object>} monthlyExpenses
 * @param {string} category
 * @returns {number}
 */
export function calculateCategoryTotal(
  monthlyExpenses,
  category
) {
  assertArray(
    monthlyExpenses,
    "calculateCategoryTotal"
  );
  assertCategory(
    category,
    "calculateCategoryTotal"
  );

  return monthlyExpenses.reduce(
    (total, monthData) => {
      assertMonthlyExpense(
        monthData,
        "calculateCategoryTotal"
      );

      return total + monthData[category];
    },
    0
  );
}

/**
 * Finds the category with the highest annual total.
 * Ties preserve the order provided in categories.
 *
 * @param {ReadonlyArray<object>} monthlyExpenses
 * @param {ReadonlyArray<string>} categories
 * @returns {{ category: string, total: number } | null}
 */
export function findHighestCategory(
  monthlyExpenses,
  categories
) {
  assertArray(
    monthlyExpenses,
    "findHighestCategory"
  );
  assertArray(
    categories,
    "findHighestCategory"
  );

  if (
    monthlyExpenses.length === 0 ||
    categories.length === 0
  ) {
    return null;
  }

  let highestCategory = null;

  for (const category of categories) {
    assertCategory(
      category,
      "findHighestCategory"
    );

    const total = calculateCategoryTotal(
      monthlyExpenses,
      category
    );

    if (
      highestCategory === null ||
      total > highestCategory.total
    ) {
      highestCategory = {
        category,
        total
      };
    }
  }

  return highestCategory;
}

/**
 * Finds the month with the highest total expenses.
 * Ties preserve chronological order.
 *
 * @param {ReadonlyArray<object>} monthlyExpenses
 * @returns {{ month: number, total: number } | null}
 */
export function findHighestMonth(monthlyExpenses) {
  assertArray(
    monthlyExpenses,
    "findHighestMonth"
  );

  let highestMonth = null;

  for (const monthData of monthlyExpenses) {
    const total = calculateMonthlyTotal(monthData);

    if (
      !Number.isInteger(monthData.month) ||
      monthData.month < 1 ||
      monthData.month > 12
    ) {
      throw new RangeError(
        "findHighestMonth expects month numbers from 1 to 12."
      );
    }

    if (
      highestMonth === null ||
      total > highestMonth.total
    ) {
      highestMonth = {
        month: monthData.month,
        total
      };
    }
  }

  return highestMonth;
}

/**
 * Finds the minimum value in a numeric array.
 * An empty array returns null.
 *
 * @param {ReadonlyArray<number>} values
 * @returns {number | null}
 */
export function findMinimumValue(values) {
  assertArray(values, "findMinimumValue");

  if (values.length === 0) {
    return null;
  }

  for (const value of values) {
    assertFiniteNumber(
      value,
      "findMinimumValue"
    );
  }

  return values.reduce(
    (minimum, value) =>
      value < minimum ? value : minimum,
    values[0]
  );
}

/**
 * Finds the maximum value in a numeric array.
 * An empty array returns null.
 *
 * @param {ReadonlyArray<number>} values
 * @returns {number | null}
 */
export function findMaximumValue(values) {
  assertArray(values, "findMaximumValue");

  if (values.length === 0) {
    return null;
  }

  for (const value of values) {
    assertFiniteNumber(
      value,
      "findMaximumValue"
    );
  }

  return values.reduce(
    (maximum, value) =>
      value > maximum ? value : maximum,
    values[0]
  );
}

/**
 * Calculates the relative change between two values.
 *
 * The result is a decimal ratio compatible with
 * formatPercentage(). For example, 0.25 represents 25%.
 *
 * A change from zero to a non-zero value has no finite
 * percentage and returns null. A change from zero to zero
 * returns zero.
 *
 * @param {number} firstValue
 * @param {number} lastValue
 * @returns {number | null}
 */
export function calculatePercentageChange(
  firstValue,
  lastValue
) {
  assertFiniteNumber(
    firstValue,
    "calculatePercentageChange"
  );
  assertFiniteNumber(
    lastValue,
    "calculatePercentageChange"
  );

  if (firstValue === 0) {
    return lastValue === 0 ? 0 : null;
  }

  return (
    (lastValue - firstValue) /
    Math.abs(firstValue)
  );
}