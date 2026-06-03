/**
 * @vitest-environment jsdom
 */

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { CartProvider } from "@/features/cart/context/cart-context";
import { useCart } from "@/features/cart/hooks/use-cart";
import {
  CART_STORAGE_KEY,
  parsePersistedCartState,
} from "@/features/cart/persistence/cart-storage";
import type { CartState } from "@/features/cart/types/cart.types";

const persistedCartState: CartState = {
  items: [
    {
      productId: 1,
      title: "Leather Jacket",
      price: 79.95,
      image: "https://example.com/jacket.jpg",
      category: "men's clothing",
      quantity: 2,
    },
  ],
};

describe("CartProvider", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: createMemoryStorage(),
    });
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("hydrates persisted cart state after mount without overwriting storage first", async () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        state: persistedCartState,
      }),
    );

    render(
      <CartProvider>
        <CartStateProbe />
      </CartProvider>,
    );

    expect(readStoredCartState()).toEqual(persistedCartState);

    await screen.findByText("hydrated");

    expect(screen.getByLabelText("cart quantity").textContent).toBe("2");
    expect(screen.getByLabelText("cart subtotal").textContent).toBe("159.9");
    expect(readStoredCartState()).toEqual(persistedCartState);
  });

  it("clears invalid persisted state after hydration", async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, "{not-json");

    render(
      <CartProvider>
        <CartStateProbe />
      </CartProvider>,
    );

    await screen.findByText("hydrated");

    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBeNull();
    expect(screen.getByLabelText("cart quantity").textContent).toBe("0");
  });

  it("persists add, update, remove, and clear cart actions", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartStateProbe />
      </CartProvider>,
    );

    await screen.findByText("hydrated");

    await user.click(screen.getByRole("button", { name: "Add jacket" }));

    await waitFor(() => {
      expect(readStoredCartState()).toEqual({
        items: [
          {
            ...persistedCartState.items[0],
            quantity: 1,
          },
        ],
      });
    });

    await user.click(screen.getByRole("button", { name: "Set quantity to 3" }));

    await waitFor(() => {
      expect(readStoredCartState()?.items[0]?.quantity).toBe(3);
    });

    await user.click(screen.getByRole("button", { name: "Remove jacket" }));

    await waitFor(() => {
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBeNull();
    });

    await user.click(screen.getByRole("button", { name: "Add jacket" }));
    await user.click(screen.getByRole("button", { name: "Clear cart" }));

    await waitFor(() => {
      expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBeNull();
    });
  });
});

function CartStateProbe() {
  const cart = useCart();
  const item = persistedCartState.items[0];

  return (
    <div>
      <p>{cart.isHydrated ? "hydrated" : "not hydrated"}</p>
      <p aria-label="cart quantity">{cart.totalQuantity}</p>
      <p aria-label="cart subtotal">{cart.subtotal}</p>
      <button
        type="button"
        onClick={() => {
          cart.addItem({
            productId: item.productId,
            title: item.title,
            price: item.price,
            image: item.image,
            category: item.category,
          });
        }}
      >
        Add jacket
      </button>
      <button
        type="button"
        onClick={() => {
          cart.updateItemQuantity(item.productId, 3);
        }}
      >
        Set quantity to 3
      </button>
      <button
        type="button"
        onClick={() => {
          cart.removeItem(item.productId);
        }}
      >
        Remove jacket
      </button>
      <button type="button" onClick={cart.clearCart}>
        Clear cart
      </button>
    </div>
  );
}

function readStoredCartState(): CartState | undefined {
  const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!storedValue) {
    return undefined;
  }

  const parsedCart = parsePersistedCartState(storedValue);

  return parsedCart.status === "success" ? parsedCart.state : undefined;
}

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();

  return {
    get length() {
      return values.size;
    },
    clear() {
      values.clear();
    },
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(values.keys())[index] ?? null;
    },
    removeItem(key: string) {
      values.delete(key);
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
  };
}
