import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme/theme-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
