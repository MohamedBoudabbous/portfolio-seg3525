export function Hero({ setPage }) {
  function handleExploreProducts() {
    if (typeof setPage === "function") {
      setPage("shop");
    }

    window.setTimeout(() => {
      const catalog = document.getElementById("main-content");

      if (catalog) {
        catalog.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 80);
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="eyebrow">Student workspace essentials</p>

      <h1 id="hero-title">Build a cleaner desk for deeper focus.</h1>

      <p>
        Discover curated accessories for studying, remote classes, and organized
        dorm setups.
      </p>

      <button type="button" onClick={handleExploreProducts}>
        Explore products
      </button>
    </section>
  );
}