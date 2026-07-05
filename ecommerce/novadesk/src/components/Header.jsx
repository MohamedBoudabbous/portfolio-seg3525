export function Header({ page, setPage, cartCount }) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => setPage("shop")}>NovaDesk</button>
      <nav aria-label="Main navigation">
        <button type="button" aria-current={page === "shop" ? "page" : undefined} onClick={() => setPage("shop")}>Shop</button>
        <button type="button" aria-current={page === "cart" ? "page" : undefined} onClick={() => setPage("cart")}>Cart ({cartCount})</button>
        <button type="button" aria-current={page === "survey" ? "page" : undefined} onClick={() => setPage("survey")}>Survey</button>
      </nav>
    </header>
  );
}
