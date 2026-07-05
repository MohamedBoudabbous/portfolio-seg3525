import { formatPrice } from "../utils/cartTotals";

function getRatingLabel(rating) {
  if (typeof rating !== "number") {
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

export function ProductCard({ product, onAddToCart }) {
  if (!product) {
    return null;
  }

  const ratingLabel = getRatingLabel(product.rating);

  function handleAddToCart() {
    if (typeof onAddToCart === "function") {
      onAddToCart(product);
    }
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
      </div>

      <div className="product-card-body">
        <div className="product-meta-row">
          <span className="product-category">{product.category}</span>

          <span className="product-rating" aria-label={ratingLabel}>
            ★ {typeof product.rating === "number" ? product.rating.toFixed(1) : "New"}
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

        <div className="product-card-footer">
          <div className="product-price-block">
            <span className="price-label">Price</span>
            <strong className="product-price">{formatPrice(product.price)}</strong>
          </div>

          <button
            className="add-to-cart-button"
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}