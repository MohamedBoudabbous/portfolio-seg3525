function CartIcon() {
  return (
    <svg
      className="cart-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6.2 6.2H21L19.4 14.1C19.2 15.1 18.3 15.8 17.3 15.8H9.1C8.1 15.8 7.2 15.1 7 14.1L5.2 3.8H2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20.2C10.2 20.2 10.8 19.6 10.8 18.9C10.8 18.2 10.2 17.6 9.5 17.6C8.8 17.6 8.2 18.2 8.2 18.9C8.2 19.6 8.8 20.2 9.5 20.2Z"
        fill="currentColor"
      />
      <path
        d="M17.3 20.2C18 20.2 18.6 19.6 18.6 18.9C18.6 18.2 18 17.6 17.3 17.6C16.6 17.6 16 18.2 16 18.9C16 19.6 16.6 20.2 17.3 20.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Header({ page = "shop", setPage, cartCount = 0, onOpenCart }) {
  const safeCartCount = Number.isFinite(cartCount) ? cartCount : 0;

  function navigateTo(nextPage) {
    if (typeof setPage === "function") {
      setPage(nextPage);
    }
  }

  function goToShop() {
    navigateTo("shop");
  }

  function goToHowItWorks() {
    navigateTo("shop");

    window.setTimeout(() => {
      const section = document.getElementById("how-it-works");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function goToCheckout() {
    if (safeCartCount > 0) {
      navigateTo("checkout");
    } else {
      navigateTo("cart");
    }
  }

  function goToCart() {
    if (typeof onOpenCart === "function") {
      onOpenCart();
      return;
    }

    navigateTo("cart");
  }

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <button
          className="brand-link"
          type="button"
          onClick={goToShop}
          aria-label="Go to NovaDesk home"
        >
          <img
            className="brand-logo"
            src="./images/brand/novadesk-logo.svg"
            alt=""
            aria-hidden="true"
          />

          <span className="brand-copy">
            <span className="brand-name">NovaDesk</span>
            <span className="brand-tagline">Premium student workspace essentials</span>
          </span>
        </button>

        <div className="nav-links" aria-label="Primary links">
          <button
            type="button"
            className={page === "shop" ? "nav-link active" : "nav-link"}
            onClick={goToShop}
          >
            Shop
          </button>

          <button
            type="button"
            className="nav-link"
            onClick={goToHowItWorks}
          >
            How it works
          </button>

          <button
            type="button"
            className={page === "checkout" ? "nav-link active" : "nav-link"}
            onClick={goToCheckout}
          >
            Checkout
          </button>

          <button
            type="button"
            className={page === "survey" ? "nav-link active" : "nav-link"}
            onClick={() => navigateTo("survey")}
          >
            Feedback
          </button>
        </div>

        <button
          className="cart-button"
          type="button"
          onClick={goToCart}
          aria-label={`Open cart with ${safeCartCount} item${safeCartCount === 1 ? "" : "s"}`}
        >
          <CartIcon />

          <span>Cart</span>

          <span className="cart-count" aria-label={`${safeCartCount} cart items`}>
            {safeCartCount}
          </span>
        </button>
      </nav>
    </header>
  );
}