import { useCallback, useMemo, useState } from "react";
import { getCartSummary } from "../utils/cartTotals";

function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    imageAlt: product.imageAlt,
    eco: product.eco,
    quantity: 1,
  };
}

function isSameProduct(item, productId) {
  return String(item.id) === String(productId);
}

function normalizeQuantity(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 1;
  }

  return Math.max(1, Math.floor(value));
}

export function useCart() {
  const [items, setItems] = useState([]);

  const addItem = useCallback((product) => {
    if (!product || product.id === undefined || product.id === null) {
      return;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) =>
        isSameProduct(item, product.id)
      );

      if (existingItem) {
        return currentItems.map((item) =>
          isSameProduct(item, product.id)
            ? {
                ...item,
                quantity: normalizeQuantity(item.quantity + 1),
              }
            : item
        );
      }

      return [...currentItems, normalizeProduct(product)];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => !isSameProduct(item, productId))
    );
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        isSameProduct(item, productId)
          ? {
              ...item,
              quantity: normalizeQuantity(item.quantity + 1),
            }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          isSameProduct(item, productId)
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const setQuantity = useCallback((productId, quantity) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          isSameProduct(item, productId)
            ? {
                ...item,
                quantity: normalizeQuantity(quantity),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const hasItem = useCallback(
    (productId) => {
      return items.some((item) => isSameProduct(item, productId));
    },
    [items]
  );

  const getItemQuantity = useCallback(
    (productId) => {
      const item = items.find((cartItem) => isSameProduct(cartItem, productId));
      return item ? item.quantity : 0;
    },
    [items]
  );

  const summary = useMemo(() => {
    return getCartSummary(items);
  }, [items]);

  const isEmpty = items.length === 0;

  return {
    items,
    isEmpty,

    totalItems: summary.itemCount,
    itemCount: summary.itemCount,
    subtotal: summary.subtotal,
    taxes: summary.taxes,
    total: summary.total,
    summary,

    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    clearCart,
    hasItem,
    getItemQuantity,
  };
}