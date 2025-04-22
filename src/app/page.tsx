"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const suggestionTexts = [
    "Try talking to me directly",
    "You can ask me to book a flight",
    "I can speak in 40+ languages",
    "Where do you want to go?",
    "Where are you currently?",
    "Search for travel destinations",
    "Find the best flight deals",
  ];

  const nextSlide = () => {
    setTextIndex((current) => (current + 1) % suggestionTexts.length);
  };

  const prevSlide = () => {
    setTextIndex((current) =>
      current === 0 ? suggestionTexts.length - 1 : current - 1
    );
  };

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 z-10 backdrop-blur-sm bg-black/30 p-8 rounded-2xl">
              <div className="mb-8">
                <Link
                  href="/voice-agent-api"
                  className="inline-flex items-center px-4 py-2 rounded-full border border-lime-400 text-lime-400 hover:bg-lime-400/10 transition-colors"
                >
                  <span className="text-shadow-sm">
                    Introducing Travana&apos;s Voice Agent API
                  </span>
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>

              <h1 className="font-normal main-gradient text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-6">
                The <span className="gradient-text lime-glow">Voice AI</span>{" "}
                platform for
                <span className="silver-shine"> enterprise use cases</span>
              </h1>

              <p className="text-lg text-gray-200 mb-8 font-light">
                Travana&apos;s voice AI platform provides APIs for
                <span className="silver-accent font-medium">
                  {" "}
                  speech-to-text
                </span>
                ,
                <span className="text-lime-400 font-medium">
                  {" "}
                  text-to-speech
                </span>
                , and full
                <span className="silver-accent font-medium">
                  {" "}
                  speech-to-speech
                </span>{" "}
                voice agents. Over{" "}
                <span className="text-lime-300 font-semibold">
                  200,000+
                </span>{" "}
                developers use Travana to build voice AI products and features.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/try-free"
                  className="shimmer-effect px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-medium rounded-md hover:shadow-lg hover:shadow-lime-500/20 transition-all btn-glow text-center"
                >
                  Try It Free
                </Link>
                <Link
                  href="/demo"
                  className="px-6 py-3 bg-transparent border border-lime-500 text-white font-medium rounded-md hover:bg-lime-500/20 transition-colors text-center"
                >
                  Get A Demo
                </Link>
              </div>
            </div>

            {/* Video Section - Displaying Original Video */}
            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center float-animation">
              <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/vid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Search Section */}
        <section className="container mx-auto px-4 py-16 relative">
          <div className="flex flex-col items-center">
            {/* Video Container - Smaller Size */}
            <div className="w-full max-w-xl mb-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/vid2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Manual Slider for Text Suggestions */}
            <div className="mb-10 w-full max-w-lg">
              <div className="relative flex items-center">
                <button
                  onClick={prevSlide}
                  className="absolute -left-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="w-full overflow-hidden h-10">
                  <div className="text-slide-container">
                    <p
                      key={textIndex}
                      className="eye-catching-text text-2xl md:text-3xl text-center slide-in"
                    >
                      {suggestionTexts[textIndex]}
                    </p>
                  </div>
                </div>

                <button
                  onClick={nextSlide}
                  className="absolute -right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Bar - Silver/Green Design */}
            <div className="w-full max-w-lg flex flex-col items-center">
              <div className="relative w-full group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-slate-500 to-lime-600 flex items-center justify-center shadow-inner shadow-white/10 p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-lime-400 search-icon-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-500 to-lime-500 blur-md opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <input
                  type="text"
                  placeholder="Search for cheapest flights..."
                  className="relative w-full py-4 pl-16 pr-5 rounded-full bg-gray-900/90 backdrop-blur-md border border-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-lime-500/50 focus:ring-2 focus:ring-lime-500/25 shadow-xl transition-all ease-in-out duration-300 group-hover:border-slate-500"
                />
                <div className="absolute inset-0 rounded-full search-gradient-border opacity-30 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <div className="flex justify-center mt-4 gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                <div className="w-2 h-2 rounded-full bg-lime-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Beautiful Enhanced Footer with Oval Shapes */}
      <footer className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden pt-20 pb-12">
        {/* Enhanced Glow effects */}
        <div className="absolute w-96 h-96 rounded-full bg-lime-500/10 blur-[100px] top-0 -left-48 animate-pulse-slow"></div>
        <div className="absolute w-[30rem] h-[30rem] rounded-full bg-slate-500/10 blur-[120px] -bottom-48 right-20"></div>
        <div className="absolute w-64 h-64 rounded-full bg-purple-500/5 blur-[80px] top-1/3 right-1/4"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-500/30 to-transparent"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full bg-gradient-to-r from-slate-500/30 via-white/40 to-slate-500/30"></div>

        {/* Main footer content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 lg:mb-24">
            {/* Left column - Main message */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 leading-tight">
                Transform your{" "}
                <span className="silver-shine">voice experience</span> with{" "}
                <span className="text-lime-400">Travana</span>
              </h2>
              <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
                Imagine your voice applications, just smarter and more
                intuitive. That&apos;s the AI experience Travana is built to
                deliver.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  href="/get-started"
                  className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full text-white font-medium hover:shadow-lg hover:shadow-lime-500/20 transition-all border border-gray-700 backdrop-blur group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-lime-500/0 via-lime-500/20 to-lime-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="flex items-center relative z-10">
                    Get Started
                    <svg
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/documentation"
                  className="px-8 py-4 bg-transparent border border-gray-700 rounded-full text-gray-200 font-medium hover:border-lime-500/50 hover:bg-lime-500/5 transition-all flex items-center group"
                >
                  <svg
                    className="mr-2 w-5 h-5 text-lime-400 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Documentation
                </Link>
              </div>
            </div>

            {/* Right column - Newsletter & links */}
            <div className="flex flex-col justify-between bg-gray-900/30 rounded-3xl border border-gray-800/50 p-8 backdrop-blur-sm">
              <div className="mb-10">
                <h3 className="text-xl font-medium text-white mb-6 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-lime-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Stay updated with our newsletter
                </h3>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow py-3 px-6 bg-gray-800/70 border border-gray-700/50 rounded-full sm:rounded-r-none text-white focus:outline-none focus:border-lime-500/50 shadow-inner"
                  />
                  <button className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-gray-900 font-medium py-3 px-8 rounded-full sm:rounded-l-none transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/30 sm:-ml-4">
                    Subscribe
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8">
                <div>
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mr-2"></span>
                    Products
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/speech-to-text"
                        className="text-gray-400 hover:text-lime-400 transition-colors block hover:translate-x-1 duration-200"
                      >
                        Speech-to-Text
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/text-to-speech"
                        className="text-gray-400 hover:text-lime-400 transition-colors block hover:translate-x-1 duration-200"
                      >
                        Text-to-Speech
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/voice-agents"
                        className="text-gray-400 hover:text-lime-400 transition-colors block hover:translate-x-1 duration-200"
                      >
                        Voice Agents
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mr-2"></span>
                    Company
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/about"
                        className="text-gray-400 hover:text-lime-400 transition-colors block hover:translate-x-1 duration-200"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-gray-400 hover:text-lime-400 transition-colors block hover:translate-x-1 duration-200"
                      >
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog"
                        className="text-gray-400 hover:text-lime-400 transition-colors block hover:translate-x-1 duration-200"
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mr-2"></span>
                    Resources
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/documentation"
                        className="text-gray-400 hover:text-lime-400 transition-colors block hover:translate-x-1 duration-200"
                      >
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pricing"
                        className="text-gray-400 hover:text-lime-400 transition-colors block hover:translate-x-1 duration-200"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/support"
                        className="text-gray-400 hover:text-lime-400 transition-colors block hover:translate-x-1 duration-200"
                      >
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section with curved shape */}
          <div className="relative">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent -top-8"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-24 h-8 bg-gradient-to-b from-gray-900 to-transparent rounded-full border-t border-gray-800"></div>

            <div className="py-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <Link
                  href="/"
                  className="text-2xl font-bold text-white mr-8 group"
                >
                  <span className="inline-block silver-shine transition-transform group-hover:scale-110 duration-300">
                    Tra
                  </span>
                  <span className="inline-block text-lime-400 transition-transform group-hover:scale-110 duration-500">
                    vana
                  </span>
                </Link>
                <div className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Travana. All rights reserved.
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-4 md:gap-6">
                <Link
                  href="/terms"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
                <div className="flex space-x-4 bg-gray-800/30 p-2 rounded-full border border-gray-700/30">
                  <Link
                    href="https://twitter.com"
                    className="text-gray-400 hover:text-lime-400 transition-colors p-2 hover:bg-gray-800/50 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                  <Link
                    href="https://github.com"
                    className="text-gray-400 hover:text-lime-400 transition-colors p-2 hover:bg-gray-800/50 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    className="text-gray-400 hover:text-lime-400 transition-colors p-2 hover:bg-gray-800/50 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </Link>
                </div>

                <div className="flex items-center bg-gradient-to-r from-gray-800/30 to-gray-900/30 px-4 py-2 rounded-full border border-gray-700/30">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                  </span>
                  <span className="text-sm text-gray-300">
                    All services online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
