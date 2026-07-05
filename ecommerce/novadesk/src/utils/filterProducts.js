const checkboxFilterKeys = ["category", "studyGoal", "color", "material"];

function getSelectedValues(filters, key) {
  const value = filters?.[key];
  return Array.isArray(value) ? value : [];
}

function matchesCheckboxFilters(product, filters) {
  return checkboxFilterKeys.every((key) => {
    const selectedValues = getSelectedValues(filters, key);

    if (selectedValues.length === 0) {
      return true;
    }

    return selectedValues.includes(product[key]);
  });
}

function matchesPriceFilter(product, filters) {
  const maxPrice =
    typeof filters?.maxPrice === "number" ? filters.maxPrice : Number.POSITIVE_INFINITY;

  return product.price <= maxPrice;
}

function matchesEcoFilter(product, filters) {
  if (filters?.eco !== true) {
    return true;
  }

  return product.eco === true;
}

export function filterProducts(products, filters) {
  if (!Array.isArray(products)) {
    return [];
  }

  return products.filter((product) => {
    return (
      matchesCheckboxFilters(product, filters) &&
      matchesPriceFilter(product, filters) &&
      matchesEcoFilter(product, filters)
    );
  });
}

export function getInitialFilters() {
  return {
    category: [],
    studyGoal: [],
    color: [],
    material: [],
    maxPrice: 200,
    eco: false
  };
}

export function hasActiveFilters(filters) {
  return (
    getSelectedValues(filters, "category").length > 0 ||
    getSelectedValues(filters, "studyGoal").length > 0 ||
    getSelectedValues(filters, "color").length > 0 ||
    getSelectedValues(filters, "material").length > 0 ||
    filters?.maxPrice < 200 ||
    filters?.eco === true
  );
}

export function getActiveFilterCount(filters) {
  let count = 0;

  for (const key of checkboxFilterKeys) {
    count += getSelectedValues(filters, key).length;
  }

  if (filters?.maxPrice < 200) {
    count += 1;
  }

  if (filters?.eco === true) {
    count += 1;
  }

  return count;
}