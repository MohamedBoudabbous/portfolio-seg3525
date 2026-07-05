const checkboxFilterLabels = {
  category: "Category",
  studyGoal: "Study goal",
  color: "Color",
  material: "Material",
};

function getSelectedValues(filters, key) {
  const value = filters?.[key];

  return Array.isArray(value) ? value : [];
}

function buildActiveFilters(filters) {
  const activeFilters = [];

  Object.entries(checkboxFilterLabels).forEach(([key, label]) => {
    getSelectedValues(filters, key).forEach((value) => {
      activeFilters.push({
        id: `${key}-${value}`,
        key,
        label,
        value,
        text: `${label}: ${value}`,
        type: "checkbox",
      });
    });
  });

  if (typeof filters?.maxPrice === "number" && filters.maxPrice < 200) {
    activeFilters.push({
      id: "maxPrice",
      key: "maxPrice",
      label: "Maximum price",
      value: filters.maxPrice,
      text: `Max price: $${filters.maxPrice}`,
      type: "range",
    });
  }

  if (filters?.eco === true) {
    activeFilters.push({
      id: "eco",
      key: "eco",
      label: "Eco option",
      value: true,
      text: "Eco-friendly only",
      type: "toggle",
    });
  }

  return activeFilters;
}

export function ActiveFilters({
  filters = {},
  setFilters,
  resetFilters,
  resultCount = 0,
  totalCount = 0,
}) {
  const activeFilters = buildActiveFilters(filters);
  const hasActiveFilters = activeFilters.length > 0;

  function removeFilter(filter) {
    if (typeof setFilters !== "function") {
      return;
    }

    setFilters((currentFilters) => {
      if (filter.type === "checkbox") {
        const currentValues = getSelectedValues(currentFilters, filter.key);

        return {
          ...currentFilters,
          [filter.key]: currentValues.filter((value) => value !== filter.value),
        };
      }

      if (filter.type === "range") {
        return {
          ...currentFilters,
          maxPrice: 200,
        };
      }

      if (filter.type === "toggle") {
        return {
          ...currentFilters,
          eco: false,
        };
      }

      return currentFilters;
    });
  }

  function handleResetFilters() {
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
    <section
      className="active-filters"
      aria-labelledby="active-filters-title"
      aria-live="polite"
    >
      <div className="results-summary">
        <div>
          <p className="eyebrow">Product results</p>

          <h2 id="active-filters-title">
            {resultCount} {resultCount === 1 ? "product" : "products"} found
          </h2>

          <p>
            Showing {resultCount} of {totalCount} NovaDesk products.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            className="text-button"
            type="button"
            onClick={handleResetFilters}
          >
            Clear all
          </button>
        )}
      </div>

      {hasActiveFilters ? (
        <div className="filter-badges" aria-label="Active filters">
          {activeFilters.map((filter) => (
            <button
              className="filter-badge"
              type="button"
              key={filter.id}
              onClick={() => removeFilter(filter)}
              aria-label={`Remove filter ${filter.text}`}
            >
              <span>{filter.text}</span>
              <span className="filter-badge-remove" aria-hidden="true">
                ×
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="no-active-filters">
          No filters selected. Start broad, then refine the catalog with the
          filter panel.
        </p>
      )}
    </section>
  );
}