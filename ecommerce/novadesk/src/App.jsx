import { useCallback, useMemo, useState } from "react";

import { products } from "./data/products";
import { facets, initialFilters } from "./data/facets";
import { filterProducts } from "./utils/filterProducts";
import { useCart } from "./hooks/useCart";

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

const PAGE_TITLES = {
  shop: "NovaDesk product catalog",
  cart: "Shopping cart",
  checkout: "Checkout",
  survey: "Customer feedback survey",
};

function cloneInitialFilters() {
  return {
    ...initialFilters,
    category: [...initialFilters.category],
    studyGoal: [...initialFilters.studyGoal],
    color: [...initialFilters.color],
    material: [...initialFilters.material],
  };
}

export default function App() {
  const [page, setPage] = useState("shop");
  const [filters, setFilters] = useState(() => cloneInitialFilters());
  const [statusMessage, setStatusMessage] = useState("");

  const cart = useCart();

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [filters]);

  const goToPage = useCallback((nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(cloneInitialFilters());
    setStatusMessage("All filters have been cleared.");
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      cart.addItem(product);
      setStatusMessage(`${product.name} was added to your cart.`);
    },
    [cart]
  );

  const handleRemoveFromCart = useCallback(
    (productId) => {
      const removedItem = cart.items.find(
        (item) => String(item.id) === String(productId)
      );

      cart.removeItem(productId);

      if (removedItem) {
        setStatusMessage(`${removedItem.name} was removed from your cart.`);
      }
    },
    [cart]
  );

  const handleClearCart = useCallback(() => {
    cart.clearCart();
    setStatusMessage("Your cart has been cleared.");
  }, [cart]);

  const startCheckout = useCallback(() => {
    if (cart.isEmpty) {
      setStatusMessage("Add at least one product before starting checkout.");
      return;
    }

    goToPage("checkout");
  }, [cart.isEmpty, goToPage]);

  const finishCheckout = useCallback(() => {
    cart.clearCart();
    setStatusMessage("Your order was confirmed. The cart is now empty.");
    goToPage("survey");
  }, [cart, goToPage]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Header
        page={page}
        setPage={goToPage}
        cartCount={cart.totalItems}
      />

      <div className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </div>

      {page === "shop" && (
        <>
          <Hero setPage={goToPage} />
          <ProcessOverview />

          <main
            id="main-content"
            className="shop-layout"
            aria-label={PAGE_TITLES.shop}
          >
            <FacetPanel
              facets={facets}
              filters={filters}
              setFilters={setFilters}
              products={products}
              resetFilters={resetFilters}
            />

            <section className="shop-main" aria-label="Product results">
              <ActiveFilters
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                resultCount={filteredProducts.length}
                totalCount={products.length}
              />

              <ProductGrid
                products={filteredProducts}
                total={products.length}
                addToCart={handleAddToCart}
                getItemQuantity={cart.getItemQuantity}
              />
            </section>
          </main>
        </>
      )}

      {page === "cart" && (
        <main
          id="main-content"
          className="page-section"
          aria-label={PAGE_TITLES.cart}
        >
          <CartPanel
            cart={cart.items}
            cartSummary={cart.summary}
            removeFromCart={handleRemoveFromCart}
            increaseQuantity={cart.increaseQuantity}
            decreaseQuantity={cart.decreaseQuantity}
            clearCart={handleClearCart}
            setPage={goToPage}
            onCheckout={startCheckout}
          />
        </main>
      )}

      {page === "checkout" && (
        <main
          id="main-content"
          className="page-section"
          aria-label={PAGE_TITLES.checkout}
        >
          <CheckoutFlow
            cart={cart.items}
            cartSummary={cart.summary}
            setPage={goToPage}
            onBackToCart={() => goToPage("cart")}
            onFinish={finishCheckout}
          />
        </main>
      )}

      {page === "survey" && (
        <main
          id="main-content"
          className="page-section"
          aria-label={PAGE_TITLES.survey}
        >
          <Survey setPage={goToPage} />
        </main>
      )}

      <Footer />
    </div>
  );
}