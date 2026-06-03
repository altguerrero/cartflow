import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { AppProviders } from "@/context/app-providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CartFlow",
  description: "Modern e-commerce experience built with Next.js.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="bg-base text-primary min-h-full font-sans antialiased">
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Header />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
