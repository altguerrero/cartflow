import type { Dispatch } from "react";

export const CART_ACTION_TYPES = {
  addItem: "cart/add-item",
  updateItemQuantity: "cart/update-item-quantity",
  removeItem: "cart/remove-item",
  clear: "cart/clear",
  hydrate: "cart/hydrate",
} as const;

export interface CartItem {
  productId: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface AddCartItemInput {
  productId: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
}

export type CartAction =
  | {
      type: typeof CART_ACTION_TYPES.addItem;
      payload: AddCartItemInput;
    }
  | {
      type: typeof CART_ACTION_TYPES.updateItemQuantity;
      payload: {
        productId: number;
        quantity: number;
      };
    }
  | {
      type: typeof CART_ACTION_TYPES.removeItem;
      payload: {
        productId: number;
      };
    }
  | {
      type: typeof CART_ACTION_TYPES.clear;
    }
  | {
      type: typeof CART_ACTION_TYPES.hydrate;
      payload: CartState;
    };

export type CartDispatch = Dispatch<CartAction>;

export interface CartContextValue {
  state: CartState;
  items: CartItem[];
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  isEmpty: boolean;
  isHydrated: boolean;
  addItem: (item: AddCartItemInput) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}
