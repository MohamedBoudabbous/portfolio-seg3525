const TAX_RATE = 0.13;

function safeNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function getCartSubtotal(items) {
  if (!Array.isArray(items)) {
    return 0;
  }

  return items.reduce((sum, item) => {
    const price = safeNumber(item.price);
    const quantity = safeNumber(item.quantity);

    return sum + price * quantity;
  }, 0);
}

export function getCartTaxes(subtotal) {
  return safeNumber(subtotal) * TAX_RATE;
}

export function getCartTotal(items) {
  const subtotal = getCartSubtotal(items);
  const taxes = getCartTaxes(subtotal);

  return subtotal + taxes;
}

export function getCartItemCount(items) {
  if (!Array.isArray(items)) {
    return 0;
  }

  return items.reduce((sum, item) => {
    return sum + safeNumber(item.quantity);
  }, 0);
}

export function getCartSummary(items) {
  const subtotal = getCartSubtotal(items);
  const taxes = getCartTaxes(subtotal);
  const total = subtotal + taxes;
  const itemCount = getCartItemCount(items);

  return {
    subtotal,
    taxes,
    total,
    itemCount,
  };
}

export function formatPrice(value) {
  const amount = safeNumber(value);

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}