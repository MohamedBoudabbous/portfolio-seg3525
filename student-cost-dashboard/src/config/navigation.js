const portfolioHrefs = Object.freeze({
  fr: "../../index.html#projects",
  en: "../../en/index.html#projects"
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