import { formatPrice, getCartSummary } from "../utils/cartTotals";

function getSafeCart(cart) {
  return Array.isArray(cart) ? cart : [];
}

function getSafeSummary(cart, cartSummary) {
  if (
    cartSummary &&
    typeof cartSummary.subtotal === "number" &&
    typeof cartSummary.taxes === "number" &&
    typeof cartSummary.total === "number"
  ) {
    return cartSummary;
  }

  return getCartSummary(cart);
}

function getItemImage(item) {
  if (item?.image) {
    return item.image;
  }

  return "./images/products/alto-laptop-stand.jpg";
}

export function CartPanel({
  isOpen = true,
  onClose,
  cart = [],
  cartSummary,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setPage,
  onCheckout,
}) {
  const safeCart = getSafeCart(cart);
  const summary = getSafeSummary(safeCart, cartSummary);
  const isEmpty = safeCart.length === 0;

  if (!isOpen) {
    return null;
  }

  function goBackToShop() {
    if (typeof onClose === "function") {
      onClose();
      return;
    }

    if (typeof setPage === "function") {
      setPage("shop");
    }
  }

  function handleCheckout() {
    if (isEmpty) {
      return;
    }

    if (typeof onCheckout === "function") {
      onCheckout();
    }
  }

  function handleClearCart() {
    if (typeof clearCart === "function") {
      clearCart();
    }
  }

  function handleIncrease(productId) {
    if (typeof increaseQuantity === "function") {
      increaseQuantity(productId);
    }
  }

  function handleDecrease(productId) {
    if (typeof decreaseQuantity === "function") {
      decreaseQuantity(productId);
    }
  }

  function handleRemove(productId) {
    if (typeof removeFromCart === "function") {
      removeFromCart(productId);
    }
  }

  return (
    <section
      className="cart-panel"
      aria-labelledby="cart-panel-title"
      aria-describedby="cart-panel-description"
    >
      <div className="cart-panel-header">
        <div>
          <p className="eyebrow">Shopping cart</p>

          <h1 id="cart-panel-title">Your cart</h1>

          <p id="cart-panel-description">
            Review your selected workspace essentials before moving to checkout.
          </p>
        </div>

        {typeof onClose === "function" && (
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="cart-empty-state" role="status">
          <div className="cart-empty-icon" aria-hidden="true">
            🛒
          </div>

          <h2>Your cart is empty.</h2>

          <p>
            Add a product from the catalog to start your checkout flow.
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={goBackToShop}
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items" aria-label="Cart items">
            {safeCart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  src={getItemImage(item)}
                  alt={item.imageAlt || item.name}
                  loading="lazy"
                />

                <div className="cart-item-main">
                  <div className="cart-item-heading">
                    <div>
                      <p className="cart-item-category">{item.category}</p>
                      <h2>{item.name}</h2>
                    </div>

                    <strong className="cart-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </strong>
                  </div>

                  <p className="cart-item-description">
                    {item.description}
                  </p>

                  <div className="cart-item-controls">
                    <div
                      className="quantity-control"
                      aria-label={`Quantity controls for ${item.name}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleDecrease(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>

                      <span aria-label={`${item.quantity} selected`}>
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncrease(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item-button"
                      type="button"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary" aria-labelledby="cart-summary-title">
            <div>
              <p className="eyebrow">Order summary</p>

              <h2 id="cart-summary-title">Summary</h2>
            </div>

            <dl className="summary-list">
              <div>
                <dt>Items</dt>
                <dd>{summary.itemCount}</dd>
              </div>

              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(summary.subtotal)}</dd>
              </div>

              <div>
                <dt>Estimated taxes</dt>
                <dd>{formatPrice(summary.taxes)}</dd>
              </div>

              <div className="summary-total">
                <dt>Total</dt>
                <dd>{formatPrice(summary.total)}</dd>
              </div>
            </dl>

            <div className="cart-summary-actions">
              <button
                className="primary-button checkout-button"
                type="button"
                onClick={handleCheckout}
              >
                Checkout
              </button>

              <button
                className="secondary-button"
                type="button"
                onClick={goBackToShop}
              >
                Continue shopping
              </button>

              <button
                className="text-button danger"
                type="button"
                onClick={handleClearCart}
              >
                Clear cart
              </button>
            </div>

            <p className="cart-disclaimer">
              This is a prototype checkout. No real payment will be processed.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}