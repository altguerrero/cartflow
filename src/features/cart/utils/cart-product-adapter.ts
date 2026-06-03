import type { AddCartItemInput } from "@/features/cart/types/cart.types";
import type { Product } from "@/features/products/types/product.types";

export function createCartItemInputFromProduct(
  product: Product,
): AddCartItemInput {
  return {
    productId: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
  };
}
