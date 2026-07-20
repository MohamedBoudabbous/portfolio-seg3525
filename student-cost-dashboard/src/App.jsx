import { useEffect, useState } from "react";

import DataWarning from "./components/DataWarning.jsx";
import ExpenseTrendChart from "./components/ExpenseTrendChart.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import MonthlyComparisonChart from "./components/MonthlyComparisonChart.jsx";
import SummaryCards from "./components/SummaryCards.jsx";

import {
  defaultLanguage,
  getTranslations,
  supportedLanguages
} from "./i18n/translations.js";

function getNextLanguage(currentLanguage) {
  const currentIndex =
    supportedLanguages.indexOf(currentLanguage);

  const nextIndex =
    (currentIndex + 1) % supportedLanguages.length;

  return supportedLanguages[nextIndex];
}

function App() {
  const [language, setLanguage] =
    useState(defaultLanguage);

  const t = getTranslations(language);

  useEffect(() => {
    document.documentElement.lang =
      t.language.code;

    document.title =
      t.document.title;

    const description = document.querySelector(
      'meta[name="description"]'
    );

    if (description) {
      description.setAttribute(
        "content",
        t.document.description
      );
    }
  }, [t]);

  function handleLanguageChange() {
    setLanguage((currentLanguage) =>
      getNextLanguage(currentLanguage)
    );
  }

  return (
    <>
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        t={t}
      />

      <DataWarning t={t} />

      <main
        id="main-content"
        className="dashboard-main"
        tabIndex={-1}
      >
        <SummaryCards
          language={language}
          t={t}
        />

        <section
          className="dashboard-grid"
          aria-labelledby="charts-section-title"
        >
          <header className="dashboard-grid__header">
            <p className="section-eyebrow">
              {t.charts.sectionLabel}
            </p>

            <h2
              id="charts-section-title"
              className="section-title"
            >
              {t.charts.sectionTitle}
            </h2>
          </header>

          <ExpenseTrendChart
            language={language}
            t={t}
          />

          <MonthlyComparisonChart
            language={language}
            t={t}
          />
        </section>
      </main>

      <Footer t={t} />

      <p
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {t.accessibility.languageChanged}
      </p>
    </>
  );
}

export default App;