import type {
  AddCartItemInput,
  CartAction,
  CartItem,
  CartState,
} from "@/features/cart/types/cart.types";
import { CART_ACTION_TYPES } from "@/features/cart/types/cart.types";

export const INITIAL_CART_STATE: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CART_ACTION_TYPES.addItem:
      return addItemToCart(state, action.payload);
    case CART_ACTION_TYPES.updateItemQuantity:
      return updateItemQuantity(
        state,
        action.payload.productId,
        action.payload.quantity,
      );
    case CART_ACTION_TYPES.removeItem:
      return removeItemFromCart(state, action.payload.productId);
    case CART_ACTION_TYPES.clear:
      return state.items.length === 0 ? state : INITIAL_CART_STATE;
    case CART_ACTION_TYPES.hydrate:
      return action.payload;
  }
}

function addItemToCart(state: CartState, input: AddCartItemInput): CartState {
  const quantity = getAddItemQuantity(input.quantity);
  const existingItem = state.items.find(
    (item) => item.productId === input.productId,
  );

  if (!existingItem) {
    return {
      items: [...state.items, createCartItem(input, quantity)],
    };
  }

  return {
    items: state.items.map((item) =>
      item.productId === input.productId
        ? {
            ...item,
            quantity: item.quantity + quantity,
          }
        : item,
    ),
  };
}

function updateItemQuantity(
  state: CartState,
  productId: number,
  quantity: number,
): CartState {
  const existingItem = state.items.find((item) => item.productId === productId);

  if (!existingItem) {
    return state;
  }

  if (quantity <= 0) {
    return removeItemFromCart(state, productId);
  }

  if (!Number.isInteger(quantity) || existingItem.quantity === quantity) {
    return state;
  }

  return {
    items: state.items.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity,
          }
        : item,
    ),
  };
}

function removeItemFromCart(state: CartState, productId: number): CartState {
  if (!state.items.some((item) => item.productId === productId)) {
    return state;
  }

  return {
    items: state.items.filter((item) => item.productId !== productId),
  };
}

function createCartItem(input: AddCartItemInput, quantity: number): CartItem {
  return {
    productId: input.productId,
    title: input.title,
    price: input.price,
    image: input.image,
    category: input.category,
    quantity,
  };
}

function getAddItemQuantity(quantity: number | undefined): number {
  if (quantity && Number.isInteger(quantity) && quantity > 0) {
    return quantity;
  }

  return 1;
}
