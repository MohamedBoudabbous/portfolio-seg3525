const processes = [
  {
    number: "01",
    title: "Explore with filters",
    label: "Divergent / convergent exploration",
    description:
      "Browse the full catalog, then narrow results with meaningful facets such as category, study goal, color, material, price, and eco-friendly options.",
    evidence:
      "Functional faceted search with active filters, result count, and reset control.",
  },
  {
    number: "02",
    title: "Follow checkout steps",
    label: "Step-by-step instruction process",
    description:
      "Move through a clear purchase flow from cart review to contact details, payment information, and final confirmation.",
    evidence:
      "Visible checkout stepper showing what is completed, current, and remaining.",
  },
  {
    number: "03",
    title: "Share feedback",
    label: "Communication process",
    description:
      "After the shopping experience, users can quickly rate the site and leave a short comment without interrupting the main buying flow.",
    evidence:
      "Short satisfaction survey designed to feel positive, useful, and non-intrusive.",
  },
];

export function ProcessOverview() {
  return (
    <section
      id="how-it-works"
      className="process-section"
      aria-labelledby="process-title"
    >
      <div className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Interface requirements</p>

          <h2 id="process-title">
            Three interaction processes are built into NovaDesk.
          </h2>

          <p className="section-intro">
            The prototype makes the required UX processes visible instead of
            hiding them in the code. Users can explore products, follow a guided
            purchase flow, and communicate feedback after the experience.
          </p>
        </div>

        <div className="process-grid">
          {processes.map((process) => (
            <article className="process-card" key={process.number}>
              <div className="process-card-header">
                <span className="process-number" aria-hidden="true">
                  {process.number}
                </span>

                <span className="process-label">{process.label}</span>
              </div>

              <h3>{process.title}</h3>

              <p>{process.description}</p>

              <div className="process-evidence">
                <span className="evidence-dot" aria-hidden="true" />
                <span>{process.evidence}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}