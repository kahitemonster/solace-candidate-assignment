import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeToggle from "./components/ThemeToggle";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-gradient-to-br from-blue-50 to-white text-gray-900 antialiased dark:from-gray-900 dark:to-gray-800 dark:text-gray-100`}
      >
        <div className="min-h-screen flex flex-col relative">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <svg className="absolute top-0 left-0 w-96 opacity-20 animate-pulse-slow" viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={40} stroke="#A5B4FC" strokeWidth={20} fill="none" />
            </svg>
          </div>
          <header className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 py-6 shadow-lg flex items-center justify-between px-6 lg:px-20 dark:from-gray-800 dark:to-gray-900">
            <h1 className="text-3xl font-bold text-white tracking-wide">Solace Advocates</h1>
            <ThemeToggle />
          </header>
          <main className="flex-grow container mx-auto px-6 py-10 relative">{children}</main>
          <footer className="relative z-10 bg-white border-t py-4 dark:bg-gray-900 dark:border-gray-700">
            <div className="container mx-auto px-6 text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Solace Health. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
