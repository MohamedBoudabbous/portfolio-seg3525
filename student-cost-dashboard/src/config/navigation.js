const portfolioHrefs = Object.freeze({
  fr: "../index.html",
  en: "../en/index.html"
});

/**
 * Returns the portfolio page matching the interface language.
 * Unsupported languages safely fall back to French.
 *
 * @param {string} language
 * @returns {string}
 */
export function getPortfolioHref(language) {
  return (
    portfolioHrefs[language] ??
    portfolioHrefs.fr
  );
}