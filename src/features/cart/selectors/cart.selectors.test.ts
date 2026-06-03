import { describe, expect, it } from "vitest";

import {
  getCartItemByProductId,
  getCartItemCount,
  getCartItemSubtotal,
  getCartSubtotal,
  getCartTotalQuantity,
  isCartEmpty,
} from "@/features/cart/selectors/cart.selectors";
import type { CartState } from "@/features/cart/types/cart.types";

const cartState: CartState = {
  items: [
    {
      productId: 1,
      title: "Leather Backpack",
      price: 109.95,
      image: "https://example.com/backpack.jpg",
      category: "men's clothing",
      quantity: 2,
    },
    {
      productId: 2,
      title: "Gold Ring",
      price: 695,
      image: "https://example.com/ring.jpg",
      category: "jewelery",
      quantity: 1,
    },
  ],
};

describe("cart selectors", () => {
  it("calculates unique item count", () => {
    expect(getCartItemCount(cartState)).toBe(2);
  });

  it("calculates total quantity", () => {
    expect(getCartTotalQuantity(cartState)).toBe(3);
  });

  it("calculates item subtotal", () => {
    expect(getCartItemSubtotal(cartState.items[0]!)).toBe(219.9);
  });

  it("calculates cart subtotal", () => {
    expect(getCartSubtotal(cartState)).toBe(914.9);
  });

  it("detects empty cart", () => {
    expect(isCartEmpty({ items: [] })).toBe(true);
    expect(isCartEmpty(cartState)).toBe(false);
  });

  it("finds item by product ID", () => {
    expect(getCartItemByProductId(cartState, 2)).toEqual(cartState.items[1]);
    expect(getCartItemByProductId(cartState, 999)).toBeUndefined();
  });

  it("rounds currency calculations to two decimals", () => {
    expect(
      getCartSubtotal({
        items: [
          {
            productId: 3,
            title: "Tiny Price",
            price: 0.1,
            image: "https://example.com/tiny.jpg",
            category: "electronics",
            quantity: 3,
          },
        ],
      }),
    ).toBe(0.3);
  });
});
