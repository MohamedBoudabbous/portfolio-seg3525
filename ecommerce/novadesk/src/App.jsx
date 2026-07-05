import { useCallback, useMemo, useState } from "react";

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

function calculateCartSummary(cart) {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.13;
  const total = subtotal + taxes;

  return {
    itemCount,
    subtotal,
    taxes,
    total,
  };
}

export default function App() {
  const [page, setPage] = useState("shop");
  const [filters, setFilters] = useState(() => cloneInitialFilters());
  const [cart, setCart] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [filters]);

  const cartSummary = useMemo(() => {
    return calculateCartSummary(cart);
  }, [cart]);

  const goToPage = useCallback((nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const addToCart = useCallback((product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    setStatusMessage(`${product.name} was added to your cart.`);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((currentCart) => {
      const removedItem = currentCart.find((item) => item.id === productId);

      if (removedItem) {
        setStatusMessage(`${removedItem.name} was removed from your cart.`);
      }

      return currentCart.filter((item) => item.id !== productId);
    });
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setStatusMessage("Your cart has been cleared.");
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(cloneInitialFilters());
    setStatusMessage("All filters have been cleared.");
  }, []);

  const startCheckout = useCallback(() => {
    if (cart.length === 0) {
      setStatusMessage("Add at least one product before starting checkout.");
      return;
    }

    goToPage("checkout");
  }, [cart.length, goToPage]);

  const finishCheckout = useCallback(() => {
    clearCart();
    goToPage("survey");
  }, [clearCart, goToPage]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Header
        page={page}
        setPage={goToPage}
        cartCount={cartSummary.itemCount}
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
                addToCart={addToCart}
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
            cart={cart}
            cartSummary={cartSummary}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
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
            cart={cart}
            cartSummary={cartSummary}
            setCart={setCart}
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