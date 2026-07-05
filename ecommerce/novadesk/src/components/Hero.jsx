export function Hero({ setPage }) {
  return (
    <section className="hero">
      <p className="eyebrow">Student workspace essentials</p>
      <h1>Build a cleaner desk for deeper focus.</h1>
      <p>Discover curated accessories for studying, remote classes, and organized dorm setups.</p>
      <button type="button" onClick={() => setPage("shop")}>Explore products</button>
    </section>
  );
}
