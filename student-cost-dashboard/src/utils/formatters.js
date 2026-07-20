import { dataMetadata } from "../data/costData.js";
import { getTranslations } from "../i18n/translations.js";

const formatterCache = new Map();

/**
 * Returns a cached Intl.NumberFormat instance.
 *
 * @param {string} locale
 * @param {Intl.NumberFormatOptions} options
 * @returns {Intl.NumberFormat}
 */
function getNumberFormatter(locale, options) {
  const cacheKey = `${locale}:${JSON.stringify(options)}`;

  if (!formatterCache.has(cacheKey)) {
    formatterCache.set(
      cacheKey,
      new Intl.NumberFormat(locale, options)
    );
  }

  return formatterCache.get(cacheKey);
}

/**
 * Ensures that a value can be safely formatted.
 *
 * @param {number} value
 * @param {string} functionName
 */
function assertFiniteNumber(value, functionName) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(
      `${functionName} expects a finite number.`
    );
  }
}

/**
 * Returns the Canadian locale associated with the interface language.
 * Unsupported languages fall back to French through getTranslations().
 *
 * @param {string} language
 * @returns {string}
 */
export function getLocale(language) {
  return getTranslations(language).language.locale;
}

/**
 * Formats a value as Canadian dollars, rounded to the nearest dollar.
 *
 * @param {number} value
 * @param {string} language
 * @returns {string}
 */
export function formatCurrency(value, language) {
  assertFiniteNumber(value, "formatCurrency");

  return getNumberFormatter(getLocale(language), {
    style: "currency",
    currency: dataMetadata.currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Formats a number as a localized integer.
 *
 * @param {number} value
 * @param {string} language
 * @returns {string}
 */
export function formatInteger(value, language) {
  assertFiniteNumber(value, "formatInteger");

  return getNumberFormatter(getLocale(language), {
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Formats a number with up to two localized decimal places.
 *
 * @param {number} value
 * @param {string} language
 * @returns {string}
 */
export function formatDecimal(value, language) {
  assertFiniteNumber(value, "formatDecimal");

  return getNumberFormatter(getLocale(language), {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Returns the localized long name of a month.
 *
 * @param {number} monthNumber - Integer from 1 to 12.
 * @param {string} language
 * @returns {string}
 */
export function formatMonth(monthNumber, language) {
  if (
    !Number.isInteger(monthNumber) ||
    monthNumber < 1 ||
    monthNumber > 12
  ) {
    throw new RangeError(
      "formatMonth expects an integer from 1 to 12."
    );
  }

  return getTranslations(language).months.long[
    monthNumber - 1
  ];
}

/**
 * Formats a decimal ratio as a localized percentage.
 *
 * Example: 0.125 represents 12.5%.
 *
 * @param {number} value - Ratio where 1 represents 100%.
 * @param {string} language
 * @returns {string}
 */
export function formatPercentage(value, language) {
  assertFiniteNumber(value, "formatPercentage");

  return getNumberFormatter(getLocale(language), {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value);
}