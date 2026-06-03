import { describe, expect, it } from "vitest";

import {
  formatCartCurrency,
  formatCartItemQuantity,
} from "@/features/cart/utils/cart-formatters";

describe("cart formatters", () => {
  it("formats USD currency consistently", () => {
    expect(formatCartCurrency(109.95)).toBe("$109.95");
    expect(formatCartCurrency(10)).toBe("$10.00");
    expect(formatCartCurrency(0)).toBe("$0.00");
  });

  it("formats singular and plural item quantity labels", () => {
    expect(formatCartItemQuantity(1)).toBe("1 item");
    expect(formatCartItemQuantity(2)).toBe("2 items");
    expect(formatCartItemQuantity(0)).toBe("0 items");
  });
});
