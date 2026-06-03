"use client";

import { useContext } from "react";

import { CartContext } from "@/features/cart/context/cart-context";
import type { CartContextValue } from "@/features/cart/types/cart.types";

export function useCart(): CartContextValue {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return cartContext;
}
