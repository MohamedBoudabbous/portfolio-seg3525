export function filterProducts(products, filters) {
  return products.filter((product) => {
    const checkboxKeys = ["category", "useCase", "color", "material"];

    for (const key of checkboxKeys) {
      if (filters[key].length > 0 && !filters[key].includes(product[key])) {
        return false;
      }
    }

    if (product.price > filters.price) return false;
    if (filters.eco === "Eco-friendly only" && !product.eco) return false;

    return true;
  });
}
