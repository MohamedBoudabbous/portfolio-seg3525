export function getCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartTax(cart) {
  return getCartSubtotal(cart) * 0.13;
}

export function getCartTotal(cart) {
  return getCartSubtotal(cart) + getCartTax(cart);
}
