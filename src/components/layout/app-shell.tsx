import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-base text-primary flex min-h-screen flex-col">
      <Header />
      <main id="content" className="flex-1">
        {children}
      </main>
    </div>
  );
}
