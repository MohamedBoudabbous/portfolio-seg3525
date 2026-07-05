import { formatPrice } from "../utils/cartTotals";

function getRatingLabel(rating) {
  if (typeof rating !== "number" || !Number.isFinite(rating)) {
    return "No rating yet";
  }

  return `${rating.toFixed(1)} out of 5 stars`;
}

function getProductImage(product) {
  if (product?.image) {
    return product.image;
  }

  return "./images/products/alto-laptop-stand.jpg";
}

function getAvailableStock(product) {
  if (typeof product?.stock === "number" && Number.isFinite(product.stock)) {
    return Math.max(0, Math.floor(product.stock));
  }

  return 0;
}

function getOrderedQuantity(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.floor(value));
}

export function ProductCard({ product, orderedQuantity = 0, onAddToCart }) {
  if (!product) {
    return null;
  }

  const ratingLabel = getRatingLabel(product.rating);
  const availableStock = getAvailableStock(product);
  const safeOrderedQuantity = getOrderedQuantity(orderedQuantity);
  const remainingStock = Math.max(availableStock - safeOrderedQuantity, 0);

  const isOutOfStock = availableStock === 0;
  const hasReachedLimit = safeOrderedQuantity >= availableStock;
  const isLowStock = remainingStock > 0 && remainingStock <= 3;

  function handleAddToCart() {
    if (typeof onAddToCart !== "function") {
      return;
    }

    if (isOutOfStock || hasReachedLimit) {
      return;
    }

    onAddToCart(product);
  }

  return (
    <article className="product-card">
      <div className="product-image-frame">
        <img
          className="product-image"
          src={getProductImage(product)}
          alt={product.imageAlt || product.name}
          loading="lazy"
        />

        {product.eco && (
          <span className="product-badge eco-badge">Eco-friendly</span>
        )}

        {isLowStock && (
          <span className="product-badge stock-badge">
            Low stock
          </span>
        )}
      </div>

      <div className="product-card-body">
        <div className="product-meta-row">
          <span className="product-category">{product.category}</span>

          <span className="product-rating" aria-label={ratingLabel}>
            ★{" "}
            {typeof product.rating === "number" && Number.isFinite(product.rating)
              ? product.rating.toFixed(1)
              : "New"}
          </span>
        </div>

        <h3>{product.name}</h3>

        <p className="product-description">{product.description}</p>

        {Array.isArray(product.tags) && product.tags.length > 0 && (
          <div className="product-tags" aria-label="Product tags">
            {product.tags.slice(0, 2).map((tag) => (
              <span className="product-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="product-availability" aria-label="Product availability">
          <div className="availability-pill">
            <span>Available</span>
            <strong>{availableStock}</strong>
          </div>

          <div className="availability-pill ordered">
            <span>In cart</span>
            <strong>{safeOrderedQuantity}</strong>
          </div>

          <div className="availability-pill remaining">
            <span>Remaining</span>
            <strong>{remainingStock}</strong>
          </div>
        </div>

        <div className="product-card-footer">
          <div className="product-price-block">
            <span className="price-label">Price</span>

            <strong className="product-price">
              {formatPrice(product.price)}
            </strong>
          </div>

          <button
            className="add-to-cart-button"
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || hasReachedLimit}
            aria-label={`Add ${product.name} to cart. ${remainingStock} remaining.`}
          >
            {isOutOfStock
              ? "Out of stock"
              : hasReachedLimit
                ? "Max in cart"
                : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}