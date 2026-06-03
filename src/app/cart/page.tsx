import type { Metadata } from "next";

import { CartPage } from "@/features/cart";

export const metadata: Metadata = {
  title: "Cart | CartFlow",
  description: "Review and manage the products in your CartFlow shopping cart.",
};

export default function CartRoutePage() {
  return <CartPage />;
}
