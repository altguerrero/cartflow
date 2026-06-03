import { describe, expect, it } from "vitest";

import {
  CART_STORAGE_KEY,
  clearPersistedCartState,
  parsePersistedCartState,
  readPersistedCartState,
  writePersistedCartState,
} from "@/features/cart/persistence/cart-storage";
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
  ],
};

describe("cart storage", () => {
  it("returns empty when the storage key is missing", () => {
    expect(readPersistedCartState(createMemoryStorage())).toEqual({
      status: "empty",
    });
  });

  it("hydrates valid persisted cart state", () => {
    const storage = createMemoryStorage({
      [CART_STORAGE_KEY]: JSON.stringify({
        version: 1,
        state: cartState,
      }),
    });

    expect(readPersistedCartState(storage)).toEqual({
      status: "success",
      state: cartState,
    });
  });

  it("returns invalid for malformed JSON without throwing", () => {
    expect(parsePersistedCartState("{not-json")).toEqual({
      status: "invalid",
    });
  });

  it("rejects unsupported payload versions", () => {
    expect(
      parsePersistedCartState(
        JSON.stringify({
          version: 2,
          state: cartState,
        }),
      ),
    ).toEqual({
      status: "invalid",
    });
  });

  it("rejects invalid payload shapes", () => {
    expect(
      parsePersistedCartState(
        JSON.stringify({
          version: 1,
          state: {
            items: "not-items",
          },
        }),
      ),
    ).toEqual({
      status: "invalid",
    });
  });

  it("rejects invalid item fields during hydration", () => {
    const result = parsePersistedCartState(
      JSON.stringify({
        version: 1,
        state: {
          items: [
            cartState.items[0],
            {
              productId: Number.NaN,
              title: "Invalid",
              price: 10,
              image: "https://example.com/invalid.jpg",
              category: "test",
              quantity: 1,
            },
            {
              productId: 2,
              title: "",
              price: 10,
              image: "https://example.com/invalid.jpg",
              category: "test",
              quantity: 1,
            },
            {
              productId: 3,
              title: "Invalid quantity",
              price: 10,
              image: "https://example.com/invalid.jpg",
              category: "test",
              quantity: 0,
            },
          ],
        },
      }),
    );

    expect(result).toEqual({
      status: "success",
      state: cartState,
    });
  });

  it("keeps the first valid duplicate product ID deterministically", () => {
    const duplicateCartState: CartState = {
      items: [
        cartState.items[0],
        {
          ...cartState.items[0],
          title: "Later Duplicate",
          quantity: 9,
        },
      ],
    };

    expect(
      parsePersistedCartState(
        JSON.stringify({
          version: 1,
          state: duplicateCartState,
        }),
      ),
    ).toEqual({
      status: "success",
      state: cartState,
    });
  });

  it("hydrates an empty cart when every persisted item is invalid", () => {
    expect(
      parsePersistedCartState(
        JSON.stringify({
          version: 1,
          state: {
            items: [
              {
                productId: 1,
                title: "Invalid price",
                price: -1,
                image: "https://example.com/invalid.jpg",
                category: "test",
                quantity: 1,
              },
            ],
          },
        }),
      ),
    ).toEqual({
      status: "success",
      state: {
        items: [],
      },
    });
  });

  it("writes the expected versioned payload", () => {
    const storage = createMemoryStorage();

    expect(writePersistedCartState(cartState, storage)).toEqual({
      status: "success",
    });
    expect(JSON.parse(storage.getItem(CART_STORAGE_KEY) ?? "")).toEqual({
      version: 1,
      state: cartState,
    });
  });

  it("clears the storage key", () => {
    const storage = createMemoryStorage({
      [CART_STORAGE_KEY]: "stored",
    });

    expect(clearPersistedCartState(storage)).toEqual({
      status: "success",
    });
    expect(storage.getItem(CART_STORAGE_KEY)).toBeNull();
  });

  it("recovers from storage read, write, and clear failures", () => {
    const storage = createFailingStorage();

    expect(readPersistedCartState(storage)).toEqual({
      status: "unavailable",
    });
    expect(writePersistedCartState(cartState, storage)).toEqual({
      status: "unavailable",
    });
    expect(clearPersistedCartState(storage)).toEqual({
      status: "unavailable",
    });
  });

  it("returns unavailable when browser storage is not present", () => {
    expect(readPersistedCartState()).toEqual({
      status: "unavailable",
    });
  });
});

function createMemoryStorage(initialValues: Record<string, string> = {}) {
  const values = new Map(Object.entries(initialValues));

  return {
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
    removeItem(key: string) {
      values.delete(key);
    },
  };
}

function createFailingStorage() {
  return {
    getItem() {
      throw new Error("Storage read failed");
    },
    setItem() {
      throw new Error("Storage write failed");
    },
    removeItem() {
      throw new Error("Storage clear failed");
    },
  };
}
