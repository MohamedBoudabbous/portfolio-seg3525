import { getPortfolioHref } from "../config/navigation.js";

function Header({
  language,
  onLanguageChange,
  t
}) {
  const targetLanguage =
    language === "fr" ? "en" : "fr";

  const portfolioHref =
    getPortfolioHref(language);

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
      >
        {t.navigation.skipToMain}
      </a>

      <header className="dashboard-header">
        <div className="dashboard-header__inner">
          <div className="dashboard-header__topbar">
            <a
              className="portfolio-link"
              href={portfolioHref}
              hrefLang={language}
              aria-label={
                t.navigation.backToPortfolioAriaLabel
              }
            >
              <svg
                className="portfolio-link__icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>
                {t.navigation.backToPortfolio}
              </span>
            </a>

            <button
              className="language-button"
              type="button"
              lang={targetLanguage}
              aria-label={
                t.language.switchAriaLabel
              }
              onClick={onLanguageChange}
            >
              <svg
                className="language-button__icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M3 12h18M12 3c2.4 2.5 3.7 5.5 3.7 9S14.4 18.5 12 21M12 3C9.6 5.5 8.3 8.5 8.3 12s1.3 6.5 3.7 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <span>
                {t.language.switchLabel}
              </span>
            </button>
          </div>

          <div className="dashboard-header__content">
            <p className="dashboard-header__eyebrow">
              {t.header.eyebrow}
            </p>

            <h1
              id="dashboard-title"
              className="dashboard-header__title"
            >
              {t.header.title}
            </h1>

            <p className="dashboard-header__subtitle">
              {t.header.subtitle}
            </p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;