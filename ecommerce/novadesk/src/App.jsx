import { useMemo, useState } from "react";
import { products } from "./data/products";
import { facets, initialFilters } from "./data/facets";
import { filterProducts } from "./utils/filterProducts";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProcessOverview } from "./components/ProcessOverview";
import { FacetPanel } from "./components/FacetPanel";
import { ActiveFilters } from "./components/ActiveFilters";
import { ProductGrid } from "./components/ProductGrid";
import { CartPanel } from "./components/CartPanel";
import { CheckoutFlow } from "./components/CheckoutFlow";
import { Survey } from "./components/Survey";
import { Footer } from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("shop");
  const [filters, setFilters] = useState(initialFilters);
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters]
  );

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const resetFilters = () => setFilters(initialFilters);

  return (
    <div className="app-shell">
      <Header page={page} setPage={setPage} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <Hero setPage={setPage} />
      <ProcessOverview />

      {page === "shop" && (
        <main className="shop-layout" id="shop">
          <FacetPanel facets={facets} filters={filters} setFilters={setFilters} products={products} />
          <section className="shop-main" aria-label="Product results">
            <ActiveFilters filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
            <ProductGrid products={filteredProducts} total={products.length} addToCart={addToCart} />
          </section>
        </main>
      )}

      {page === "cart" && (
        <CartPanel cart={cart} removeFromCart={removeFromCart} setPage={setPage} />
      )}

      {page === "checkout" && (
        <CheckoutFlow cart={cart} setCart={setCart} setPage={setPage} />
      )}

      {page === "survey" && <Survey />}

      <Footer />
    </div>
  );
}
