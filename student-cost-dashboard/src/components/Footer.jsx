import { getPortfolioHref } from "../config/navigation.js";

function Footer({ t }) {
  const language = t.language.code;

  const portfolioHref =
    getPortfolioHref(language);

  return (
    <footer className="dashboard-footer">
      <div className="dashboard-footer__inner">
        <div className="dashboard-footer__summary">
          <div
            className="dashboard-footer__mark"
            aria-hidden="true"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              focusable="false"
            >
              <path
                d="M5 20V10M12 20V4M19 20v-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M3 20h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <p className="dashboard-footer__course">
              {t.footer.course}
            </p>

            <p className="dashboard-footer__notice">
              {t.footer.syntheticNotice}
            </p>
          </div>
        </div>

        <div className="dashboard-footer__bottom">
          <a
            className="dashboard-footer__portfolio-link"
            href={portfolioHref}
            hrefLang={language}
            aria-label={
              t.navigation.backToPortfolioAriaLabel
            }
          >
            <svg
              className="dashboard-footer__link-icon"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>
              {t.footer.portfolioLabel}
            </span>
          </a>

          <small className="dashboard-footer__copyright">
            {t.footer.copyright}
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;