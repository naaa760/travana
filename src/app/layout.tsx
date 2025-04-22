import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deepgram - Voice AI Platform",
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
        <header className="border-b border-gray-800">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between h-16 md:h-20">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold mr-10">
                  Deepgram
                </Link>

                <div className="hidden md:flex space-x-6">
                  <div className="relative group">
                    <button className="flex items-center text-gray-300 hover:text-white">
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
                    <button className="flex items-center text-gray-300 hover:text-white">
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
                    <button className="flex items-center text-gray-300 hover:text-white">
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
                    <button className="flex items-center text-gray-300 hover:text-white">
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
                    className="text-gray-300 hover:text-white"
                  >
                    Enterprise
                  </Link>

                  <Link
                    href="/pricing"
                    className="text-gray-300 hover:text-white"
                  >
                    Pricing
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-300 hover:text-white">
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

                <Link href="/login" className="text-gray-300 hover:text-white">
                  Log in
                </Link>

                <Link
                  href="/demo"
                  className="hidden sm:inline-block px-4 py-2 border border-gray-700 rounded hover:bg-gray-800 transition-colors"
                >
                  Get A Demo
                </Link>

                <Link
                  href="/signup"
                  className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
                >
                  Sign Up Free
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
