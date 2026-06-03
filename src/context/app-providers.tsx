import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { CartProvider } from "@/features/cart";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
