"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import {
  addCartItem,
  clearCart,
  removeCartItem,
  updateCartItemQuantity,
} from "@/features/cart/reducer/cart.actions";
import {
  cartReducer,
  INITIAL_CART_STATE,
} from "@/features/cart/reducer/cart.reducer";
import {
  getCartItemCount,
  getCartSubtotal,
  getCartTotalQuantity,
  isCartEmpty,
} from "@/features/cart/selectors/cart.selectors";
import type {
  AddCartItemInput,
  CartContextValue,
} from "@/features/cart/types/cart.types";

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE);

  const addItem = useCallback((item: AddCartItemInput) => {
    dispatch(addCartItem(item));
  }, []);

  const updateItemQuantity = useCallback(
    (productId: number, quantity: number) => {
      dispatch(updateCartItemQuantity(productId, quantity));
    },
    [],
  );

  const removeItem = useCallback((productId: number) => {
    dispatch(removeCartItem(productId));
  }, []);

  const clearCartItems = useCallback(() => {
    dispatch(clearCart());
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      items: state.items,
      itemCount: getCartItemCount(state),
      totalQuantity: getCartTotalQuantity(state),
      subtotal: getCartSubtotal(state),
      isEmpty: isCartEmpty(state),
      addItem,
      updateItemQuantity,
      removeItem,
      clearCart: clearCartItems,
    }),
    [addItem, clearCartItems, removeItem, state, updateItemQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
