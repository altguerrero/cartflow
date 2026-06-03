import { describe, expect, it } from "vitest";

import { createCartItemInputFromProduct } from "@/features/cart/utils/cart-product-adapter";
import type { Product } from "@/features/products/types/product.types";

const product: Product = {
  id: 7,
  title: "Compact Travel Pack",
  price: 48.5,
  description: "A durable daily travel pack.",
  category: "bags",
  image: "https://example.com/product.png",
  rating: {
    rate: 4.4,
    count: 120,
  },
};

describe("createCartItemInputFromProduct", () => {
  it("maps product fields to cart input fields", () => {
    expect(createCartItemInputFromProduct(product)).toEqual({
      productId: 7,
      title: "Compact Travel Pack",
      price: 48.5,
      image: "https://example.com/product.png",
      category: "bags",
    });
  });

  it("does not mutate the product object", () => {
    const originalProduct = structuredClone(product);

    createCartItemInputFromProduct(product);

    expect(product).toEqual(originalProduct);
  });
});
