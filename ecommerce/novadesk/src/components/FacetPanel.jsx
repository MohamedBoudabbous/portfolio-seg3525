import { getActiveFilterCount } from "../utils/filterProducts";
import { FacetGroup } from "./FacetGroup";

function getSafeFacets(facets) {
  return Array.isArray(facets) ? facets : [];
}

function getSafeProducts(products) {
  return Array.isArray(products) ? products : [];
}

export function FacetPanel({
  facets = [],
  filters = {},
  setFilters,
  products = [],
  resetFilters,
}) {
  const safeFacets = getSafeFacets(facets);
  const safeProducts = getSafeProducts(products);
  const activeFilterCount = getActiveFilterCount(filters);

  function handleClearFilters() {
    if (typeof resetFilters === "function") {
      resetFilters();
      return;
    }

    if (typeof setFilters === "function") {
      setFilters({
        category: [],
        studyGoal: [],
        color: [],
        material: [],
        maxPrice: 200,
        eco: false,
      });
    }
  }

  return (
    <aside
      className="facet-panel"
      aria-labelledby="facet-panel-title"
      aria-describedby="facet-panel-description"
    >
      <div className="facet-panel-header">
        <div>
          <p className="eyebrow">Refine catalog</p>

          <h2 id="facet-panel-title">Filters</h2>

          <p id="facet-panel-description">
            Narrow the product list by combining several meaningful product
            characteristics.
          </p>
        </div>

        <span className="filter-count" aria-label={`${activeFilterCount} active filters`}>
          {activeFilterCount}
        </span>
      </div>

      <div className="facet-panel-actions">
        <button
          className="clear-filters-button"
          type="button"
          onClick={handleClearFilters}
          disabled={activeFilterCount === 0}
        >
          Clear all filters
        </button>

        <p className="facet-help-text">
          Filters combine across categories, helping you move from broad
          exploration to precise results.
        </p>
      </div>

      <div className="facet-groups" aria-label="Product filters">
        {safeFacets.map((facet) => (
          <FacetGroup
            key={facet.id}
            facet={facet}
            filters={filters}
            setFilters={setFilters}
            products={safeProducts}
          />
        ))}
      </div>
    </aside>
  );
}