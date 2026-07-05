import { EmptyState } from "./EmptyState";
import { ProductCard } from "./ProductCard";

function getSafeProducts(products) {
  return Array.isArray(products) ? products : [];
}

export function ProductGrid({
  products = [],
  total = 0,
  onAddToCart,
  addToCart,
}) {
  const safeProducts = getSafeProducts(products);
  const handleAddToCart = onAddToCart || addToCart;
  const resultCount = safeProducts.length;
  const totalCount = Number.isFinite(total) && total > 0 ? total : resultCount;

  if (resultCount === 0) {
    return (
      <section
        className="product-results"
        aria-labelledby="product-results-title"
      >
        <div className="product-results-header">
          <div>
            <p className="eyebrow">Curated products</p>

            <h2 id="product-results-title">No matching products</h2>

            <p>
              Your filters are active, but no NovaDesk products match this
              exact combination.
            </p>
          </div>
        </div>

        <EmptyState
          title="No products match these filters."
          message="Try removing one or two filters, increasing the maximum price, or clearing all filters from the filter panel."
          actionLabel="Adjust filters"
        />
      </section>
    );
  }

  return (
    <section
      className="product-results"
      aria-labelledby="product-results-title"
    >
      <div className="product-results-header">
        <div>
          <p className="eyebrow">Curated products</p>

          <h2 id="product-results-title">
            {resultCount} {resultCount === 1 ? "item" : "items"} available
          </h2>

          <p>
            Showing {resultCount} of {totalCount} NovaDesk products based on
            the selected filters.
          </p>
        </div>

        <div className="product-results-meta" aria-label="Catalog result count">
          <strong>{resultCount}</strong>
          <span>shown</span>
        </div>
      </div>

      <div className="product-grid" aria-label="Product list">
        {safeProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}