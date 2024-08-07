import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProvider from "@/components/AppProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todo Dapp with ink! contract",
  description: "A simple todo dapp with ink! contract",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AppProvider>
          <main className="flex min-h-screen flex-col px-4 sm:px-6 lg:px-8 py-5 max-w-7xl mx-auto">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
