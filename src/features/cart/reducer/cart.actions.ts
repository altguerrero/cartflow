import type {
  AddCartItemInput,
  CartAction,
} from "@/features/cart/types/cart.types";
import { CART_ACTION_TYPES } from "@/features/cart/types/cart.types";

export function addCartItem(item: AddCartItemInput): CartAction {
  return {
    type: CART_ACTION_TYPES.addItem,
    payload: item,
  };
}

export function updateCartItemQuantity(
  productId: number,
  quantity: number,
): CartAction {
  return {
    type: CART_ACTION_TYPES.updateItemQuantity,
    payload: {
      productId,
      quantity,
    },
  };
}

export function removeCartItem(productId: number): CartAction {
  return {
    type: CART_ACTION_TYPES.removeItem,
    payload: {
      productId,
    },
  };
}

export function clearCart(): CartAction {
  return {
    type: CART_ACTION_TYPES.clear,
  };
}
