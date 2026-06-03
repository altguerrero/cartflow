import type { CartItem, CartState } from "@/features/cart/types/cart.types";

export const CART_STORAGE_KEY = "cartflow.cart.v1";
const CART_STORAGE_VERSION = 1;

interface PersistedCartPayload {
  version: typeof CART_STORAGE_VERSION;
  state: CartState;
}

interface CartStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

export type CartStorageReadResult =
  | { status: "success"; state: CartState }
  | { status: "empty" }
  | { status: "invalid" }
  | { status: "unavailable" };

export type CartStorageWriteResult =
  | { status: "success" }
  | { status: "unavailable" };

export function readPersistedCartState(
  storage = getBrowserStorage(),
): CartStorageReadResult {
  if (!storage) {
    return { status: "unavailable" };
  }

  try {
    const storedValue = storage.getItem(CART_STORAGE_KEY);

    if (!storedValue) {
      return { status: "empty" };
    }

    return parsePersistedCartState(storedValue);
  } catch {
    return { status: "unavailable" };
  }
}

export function writePersistedCartState(
  state: CartState,
  storage = getBrowserStorage(),
): CartStorageWriteResult {
  if (!storage) {
    return { status: "unavailable" };
  }

  try {
    const payload: PersistedCartPayload = {
      version: CART_STORAGE_VERSION,
      state,
    };

    storage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));

    return { status: "success" };
  } catch {
    return { status: "unavailable" };
  }
}

export function clearPersistedCartState(
  storage = getBrowserStorage(),
): CartStorageWriteResult {
  if (!storage) {
    return { status: "unavailable" };
  }

  try {
    storage.removeItem(CART_STORAGE_KEY);

    return { status: "success" };
  } catch {
    return { status: "unavailable" };
  }
}

export function parsePersistedCartState(
  storedValue: string,
): CartStorageReadResult {
  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    return validatePersistedCartPayload(parsedValue);
  } catch {
    return { status: "invalid" };
  }
}

function validatePersistedCartPayload(value: unknown): CartStorageReadResult {
  if (!isRecord(value) || value.version !== CART_STORAGE_VERSION) {
    return { status: "invalid" };
  }

  const state = value.state;

  if (!isRecord(state) || !Array.isArray(state.items)) {
    return { status: "invalid" };
  }

  return {
    status: "success",
    state: {
      items: getValidCartItems(state.items),
    },
  };
}

function getValidCartItems(items: unknown[]): CartItem[] {
  const productIds = new Set<number>();
  const validItems: CartItem[] = [];

  for (const item of items) {
    if (!isValidCartItem(item) || productIds.has(item.productId)) {
      continue;
    }

    productIds.add(item.productId);
    validItems.push({
      productId: item.productId,
      title: item.title,
      price: item.price,
      image: item.image,
      category: item.category,
      quantity: item.quantity,
    });
  }

  return validItems;
}

function isValidCartItem(value: unknown): value is CartItem {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.productId === "number" &&
    Number.isFinite(value.productId) &&
    isNonEmptyString(value.title) &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    isNonEmptyString(value.image) &&
    isNonEmptyString(value.category) &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getBrowserStorage(): CartStorage | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.localStorage;
}
