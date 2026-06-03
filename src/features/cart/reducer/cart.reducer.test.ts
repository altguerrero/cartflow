import { describe, expect, it } from "vitest";

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
import type {
  AddCartItemInput,
  CartState,
} from "@/features/cart/types/cart.types";

const backpack: AddCartItemInput = {
  productId: 1,
  title: "Leather Backpack",
  price: 109.95,
  image: "https://example.com/backpack.jpg",
  category: "men's clothing",
};

const ring: AddCartItemInput = {
  productId: 2,
  title: "Gold Ring",
  price: 695,
  image: "https://example.com/ring.jpg",
  category: "jewelery",
};

describe("cart reducer", () => {
  it("adds a new item", () => {
    expect(cartReducer(INITIAL_CART_STATE, addCartItem(backpack))).toEqual({
      items: [
        {
          ...backpack,
          quantity: 1,
        },
      ],
    });
  });

  it("increments quantity when adding an existing item", () => {
    const state = cartReducer(INITIAL_CART_STATE, addCartItem(backpack));

    expect(cartReducer(state, addCartItem(backpack)).items[0]?.quantity).toBe(
      2,
    );
  });

  it("adds an item with explicit quantity", () => {
    const state = cartReducer(
      INITIAL_CART_STATE,
      addCartItem({
        ...ring,
        quantity: 3,
      }),
    );

    expect(state.items[0]?.quantity).toBe(3);
  });

  it("updates item quantity", () => {
    const state = cartReducer(INITIAL_CART_STATE, addCartItem(backpack));
    const nextState = cartReducer(state, updateCartItemQuantity(1, 4));

    expect(nextState.items[0]?.quantity).toBe(4);
  });

  it("removes item when quantity is set to zero", () => {
    const state = cartReducer(INITIAL_CART_STATE, addCartItem(backpack));

    expect(cartReducer(state, updateCartItemQuantity(1, 0))).toEqual({
      items: [],
    });
  });

  it("removes item by product ID", () => {
    const state = createCartState();

    expect(cartReducer(state, removeCartItem(1))).toEqual({
      items: [
        {
          ...ring,
          quantity: 1,
        },
      ],
    });
  });

  it("clears cart", () => {
    expect(cartReducer(createCartState(), clearCart())).toEqual({
      items: [],
    });
  });

  it("returns unchanged state for no-op removal or update", () => {
    const state = createCartState();

    expect(cartReducer(state, removeCartItem(999))).toBe(state);
    expect(cartReducer(state, updateCartItemQuantity(999, 2))).toBe(state);
    expect(cartReducer(state, updateCartItemQuantity(1, 1))).toBe(state);
  });

  it("does not mutate previous state", () => {
    const state = createCartState();
    const originalState = structuredClone(state);

    cartReducer(state, addCartItem(backpack));
    cartReducer(state, updateCartItemQuantity(1, 5));
    cartReducer(state, removeCartItem(1));

    expect(state).toEqual(originalState);
  });
});

function createCartState(): CartState {
  return {
    items: [
      {
        ...backpack,
        quantity: 1,
      },
      {
        ...ring,
        quantity: 1,
      },
    ],
  };
}
