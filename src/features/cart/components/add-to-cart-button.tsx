"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/hooks/use-cart";
import { createCartItemInputFromProduct } from "@/features/cart/utils/cart-product-adapter";
import type { Product } from "@/features/products/types/product.types";
import { cn } from "@/lib/utils";

const ADDED_FEEDBACK_DURATION_MS = 1200;

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  size?: "default" | "lg";
}

export function AddToCartButton({
  product,
  className,
  size = "default",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [wasRecentlyAdded, setWasRecentlyAdded] = useState(false);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  function handleAddToCart() {
    addItem(createCartItemInputFromProduct(product));
    setWasRecentlyAdded(true);

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      setWasRecentlyAdded(false);
      feedbackTimeoutRef.current = null;
    }, ADDED_FEEDBACK_DURATION_MS);
  }

  return (
    <Button
      type="button"
      size={size}
      variant={wasRecentlyAdded ? "secondary" : "default"}
      className={cn("gap-2 transition-[background-color,transform]", className)}
      aria-label={
        wasRecentlyAdded
          ? `${product.title} added to cart`
          : `Add ${product.title} to cart`
      }
      aria-live="polite"
      onClick={handleAddToCart}
    >
      {wasRecentlyAdded ? (
        <Check
          aria-hidden="true"
          className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-150"
        />
      ) : (
        <ShoppingCart
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover/button:-translate-y-0.5"
        />
      )}
      {wasRecentlyAdded ? "Added" : "Add to cart"}
    </Button>
  );
}
