import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Travana - Voice AI Platform",
  description: "The Voice AI platform for enterprise use cases",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="sticky top-0 z-50 px-4 py-4">
          <header className="rounded-full bg-gray-900/50 backdrop-blur-md border border-gray-800/50 shadow-lg transition-all duration-300">
            <div className="container mx-auto px-6">
              <nav className="flex items-center justify-between h-16 md:h-20">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="text-2xl font-bold mr-10 text-white"
                  >
                    <span className="silver-shine">Tra</span>
                    <span className="text-lime-400">vana</span>
                  </Link>

                  <div className="hidden md:flex space-x-8">
                    <div className="relative group">
                      <button className="flex items-center text-gray-200 hover:text-slate-300 transition-colors">
                        Products
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="relative group">
                      <button className="flex items-center text-gray-200 hover:text-slate-300 transition-colors">
                        Solutions
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="relative group">
                      <button className="flex items-center text-gray-200 hover:text-lime-400 transition-colors">
                        Resources
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="relative group">
                      <button className="flex items-center text-gray-200 hover:text-lime-400 transition-colors">
                        Developers
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>

                    <Link
                      href="/enterprise"
                      className="text-gray-200 hover:text-slate-300 transition-colors"
                    >
                      Enterprise
                    </Link>

                    <Link
                      href="/pricing"
                      className="text-gray-200 hover:text-lime-400 transition-colors"
                    >
                      Pricing
                    </Link>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-200 hover:text-slate-300 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>

                  <Link
                    href="/login"
                    className="text-gray-200 hover:text-slate-300 transition-colors"
                  >
                    Log in
                  </Link>

                  <Link
                    href="/demo"
                    className="hidden sm:inline-block px-4 py-2 border border-lime-500 rounded-full hover:border-lime-400 hover:text-lime-400 transition-all"
                  >
                    Get A Demo
                  </Link>

                  <Link
                    href="/signup"
                    className="shimmer-effect px-5 py-2 bg-gradient-to-r from-slate-700 to-lime-600 text-white rounded-full hover:shadow-lg hover:shadow-lime-500/25 transition-all btn-glow"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </nav>
            </div>
          </header>
        </div>

        {children}
      </body>
    </html>
  );
}
