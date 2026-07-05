const helpItems = [
  {
    title: "Faceted search",
    text:
      "Use category, study goal, color, material, price, and eco filters to narrow the catalog.",
  },
  {
    title: "Checkout guidance",
    text:
      "The checkout flow shows each step clearly: cart, contact, payment, and confirmation.",
  },
  {
    title: "Prototype note",
    text:
      "NovaDesk is a front-end prototype. No real payment or account data is processed.",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-labelledby="footer-title">
      <div className="footer-shell">
        <section className="footer-brand">
          <div className="footer-logo-row">
            <span className="footer-logo" aria-hidden="true">
              N
            </span>

            <div>
              <h2 id="footer-title">NovaDesk</h2>
              <p>Premium student workspace essentials.</p>
            </div>
          </div>

          <p className="footer-description">
            NovaDesk is a high-fidelity e-commerce prototype created for
            SEG3525. It demonstrates faceted search, a guided checkout process,
            visual design consistency, and a short feedback flow.
          </p>
        </section>

        <section className="footer-help" aria-labelledby="footer-help-title">
          <h3 id="footer-help-title">Mini help</h3>

          <div className="footer-help-grid">
            {helpItems.map((item) => (
              <article className="footer-help-card" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="footer-links" aria-labelledby="footer-links-title">
          <h3 id="footer-links-title">Project links</h3>

          <ul>
            <li>
              <a href="#shop">Product catalog</a>
            </li>
            <li>
              <a href="#how-it-works">Interaction processes</a>
            </li>
            <li>
              <a href="../../index.html">Back to portfolio</a>
            </li>
            <li>
              <a
                href="https://github.com/MohamedBoudabbous/portfolio-seg3525"
                target="_blank"
                rel="noreferrer"
              >
                GitHub repository
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} NovaDesk prototype — SEG3525 Interface Design and
          Analysis.
        </p>

        <p>
          Built as a student UI/UX prototype. Product images and checkout data
          are used for demonstration only.
        </p>
      </div>
    </footer>
  );
}