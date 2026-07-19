import { useId } from "react";

function SummaryCards({ t }) {
  const titleId = useId();

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

      {/*
        Les composants MetricCard seront ajoutés ici
        pendant la phase consacrée aux KPI.
      */}
      <div className="summary-grid" />
    </section>
  );
}

export default SummaryCards;