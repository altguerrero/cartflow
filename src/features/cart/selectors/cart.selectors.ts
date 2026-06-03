import type { CartItem, CartState } from "@/features/cart/types/cart.types";

export function getCartItemCount(state: CartState): number {
  return state.items.length;
}

export function getCartTotalQuantity(state: CartState): number {
  return state.items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartItemSubtotal(item: CartItem): number {
  return roundCurrency(item.price * item.quantity);
}

export function getCartSubtotal(state: CartState): number {
  return roundCurrency(
    state.items.reduce(
      (subtotal, item) => subtotal + item.price * item.quantity,
      0,
    ),
  );
}

export function isCartEmpty(state: CartState): boolean {
  return state.items.length === 0;
}

export function getCartItemByProductId(
  state: CartState,
  productId: number,
): CartItem | undefined {
  return state.items.find((item) => item.productId === productId);
}

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
