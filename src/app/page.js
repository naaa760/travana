"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Playfair_Display, Cinzel, Montserrat } from "next/font/google";
import "./shimmer.css";

// Initialize the fonts
const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  // State to track if we're on the main page or in the slider
  const [mainPageComplete, setMainPageComplete] = useState(false);

  // State for the slider pages (all pages after the main landing page)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define all slides EXCEPT the main page
  const sliderSlides = [
    {
      title: "Try Talking to me directly",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
      circleColor: "bg-gradient-circle",
    },
    {
      title: "You can ask me to book a flight",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
      circleColor: "bg-gradient-circle",
    },
    {
      title: "You can ask me to book a Hotel",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
      circleColor: "bg-gradient-circle",
    },
    {
      title: "I can speak in 40+ Languages",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
      circleColor: "bg-gradient-circle",
    },
    {
      title: "Listening...",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
      circleColor: "bg-gradient-circle",
    },
    {
      title: "Where do you want to go? And",
      subtitle: "Where are you currently?",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
      circleColor: "bg-gradient-circle",
    },
    {
      title: "When do you plan on going to",
      subtitle: "Mumbai?",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: true,
      route: "DEL - BLR",
      circleColor: "bg-gradient-circle",
    },
    {
      title: "When do you plan on going to",
      subtitle: "Mumbai?",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: true,
      route: "DEL - BLR",
      date: "13th April 2025",
      circleColor: "bg-gradient-circle",
    },
    {
      title: "Here are the cheapest flights I",
      subtitle: "found, Choose one to continue..",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: false,
      showHeader: true,
      route: "DEL - MUM",
      date: "13th April 2025",
      showResults: true,
      circleColor: "bg-gradient-circle",
    },
    {
      title: "Cheapest Flights",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: false,
      showHeader: true,
      route: "DEL - MUM",
      date: "13th April 2025",
      showDetailedResults: true,
      circleColor: "bg-gradient-circle",
    },
    {
      title: "Great! Do you want to choose",
      subtitle: "seats?",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
      circleColor: "bg-gradient-circle",
    },
  ];

  const startJourney = () => {
    setMainPageComplete(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sliderSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderSlides.length - 1 : prev - 1
    );
  };

  // Keyboard navigation support (only for slider)
  useEffect(() => {
    if (!mainPageComplete) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mainPageComplete]);

  // Handle touch events for swipe support (only for slider)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    if (!mainPageComplete) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!mainPageComplete) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!mainPageComplete || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <main
      className="min-h-screen text-black overflow-hidden"
      style={{
        backgroundImage: "url('/vid.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!mainPageComplete ? (
        // Main Landing Page
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="text-center animate-fadeIn relative w-full">
            {/* Sparkle elements */}
            <div className="shimmer-sparkle sparkle-1"></div>
            <div className="shimmer-sparkle sparkle-2"></div>
            <div className="shimmer-sparkle sparkle-3"></div>
            <div className="shimmer-sparkle sparkle-4"></div>

            {/* TRAVANA Text centered in page */}
            <div className="w-full text-center mb-2">
              <h1
                className={`${cinzel.className} text-8xl md:text-8xl sm:text-6xl xs:text-5xl font-black tracking-wider mb-4 text-black shimmer-text`}
                style={{
                  textShadow: "3px 3px 6px rgba(255, 255, 255, 0.7)",
                  letterSpacing: "0.2em",
                  transform: "scale(1.05)",
                  WebkitTextStroke: "1px rgba(0, 0, 0, 0.3)",
                }}
              >
                TRAVANA
              </h1>
              <p
                className={`${montserrat.className} text-2xl sm:text-xl text-black mb-10`}
              >
                Your AI Travel Companion
              </p>

              {/* Improved responsive button container */}
              <div className="flex flex-wrap justify-center mt-8 space-x-4 sm:space-x-2 px-4">
                <button
                  onClick={startJourney}
                  className="start-journey-btn px-8 py-3 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-800 to-amber-600 text-white font-medium text-lg sm:text-base tracking-wide shadow-lg border border-amber-500/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  <span className="flex items-center">
                    <span>Start Journey</span>
                    <svg
                      className="ml-2 h-5 w-5 sm:h-4 sm:w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

                <button className="px-8 py-3 sm:px-6 sm:py-2.5 rounded-full bg-white/20 text-black font-medium text-lg sm:text-base tracking-wide shadow-md border border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Horizontal Slider (appears after main page)
        <>
          {/* Slider navigation arrows */}
          <button
            onClick={prevSlide}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/50 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} className="text-slate-800" />
          </button>

          <button
            onClick={nextSlide}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/50 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={28} className="text-slate-800" />
          </button>

          {/* Back to Home button */}
          <button
            onClick={() => setMainPageComplete(false)}
            className="fixed top-6 left-6 z-50 bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/50 transition-all flex items-center"
            aria-label="Back to home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-800 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-medium">Home</span>
          </button>

          {/* Horizontal slider container */}
          <div className="relative w-full h-screen overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{
                width: `${sliderSlides.length * 100}vw`,
                transform: `translateX(-${currentSlide * 100}vw)`,
              }}
            >
              {sliderSlides.map((slide, index) => (
                <div
                  key={index}
                  className="w-screen h-full flex flex-col items-center justify-center relative"
                >
                  {slide.showHeader && (
                    <div className="absolute top-0 left-0 right-0 text-center py-4 z-10">
                      <div className="text-lg sm:text-base font-medium mb-1">
                        {slide.route}
                      </div>
                      {slide.date && (
                        <div className="text-sm sm:text-xs text-gray-200">
                          {slide.date}
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={`flex flex-col items-center justify-center w-full max-w-xl px-4 ${
                      slide.showHeader ? "mt-16 sm:mt-14" : ""
                    }`}
                  >
                    {slide.showCircle && (
                      <div
                        className={`${
                          slide.circleColor || "bg-gradient-circle"
                        } w-40 h-40 rounded-full mb-8 animate-pulse-glow relative`}
                      >
                        <>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-300 via-emerald-100 to-white animate-spin-slow opacity-70 blur-md"></div>
                          <div className="absolute inset-2 rounded-full bg-gradient-to-tl from-white via-emerald-50 to-slate-200 animate-pulse-slow"></div>
                          <div className="absolute inset-0 rounded-full shimmer-ring"></div>
                        </>
                      </div>
                    )}
                    <div className="text-center px-4">
                      <p
                        className={`${montserrat.className} text-2xl font-medium text-slate-800 mb-2 animate-float-text`}
                      >
                        {slide.title}
                      </p>
                      {slide.subtitle && (
                        <p
                          className={`${montserrat.className} text-xl text-slate-700`}
                        >
                          {slide.subtitle}
                        </p>
                      )}
                    </div>

                    {slide.showResults && (
                      <div className="mt-4 bg-gray-300/70 backdrop-blur-sm rounded-lg w-[90%] max-w-xs h-48 flex items-center justify-center">
                        <p className="text-gray-500">
                          Flight results would appear here
                        </p>
                      </div>
                    )}

                    {slide.showDetailedResults && (
                      <div className="mt-4 w-full px-2 sm:px-1 max-w-md mx-auto">
                        <div className="text-center mb-4">
                          <h2
                            className={`${montserrat.className} text-2xl sm:text-xl font-semibold text-slate-800 mb-1`}
                          >
                            Cheapest Flights
                          </h2>
                          <div className="inline-block bg-indigo-600/80 backdrop-blur-sm text-white text-sm sm:text-xs px-4 py-1 rounded-full mb-3 shadow-md">
                            Cheapest Flights
                          </div>
                        </div>

                        {/* Responsive flight carousel */}
                        <div className="relative flight-carousel">
                          {/* Left scroll button - smaller on mobile */}
                          <button
                            onClick={() => {
                              const container = document.querySelector(
                                ".flight-cards-container"
                              );
                              container.scrollBy({
                                left: -280,
                                behavior: "smooth",
                              });
                            }}
                            className="absolute -left-1 sm:-left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm p-2 sm:p-1.5 rounded-full shadow-md hover:bg-white/30 transition-all active:scale-95"
                            aria-label="Scroll left"
                          >
                            <ChevronLeft
                              size={16}
                              className="text-slate-800 sm:w-4 sm:h-4"
                            />
                          </button>

                          {/* Right scroll button - smaller on mobile */}
                          <button
                            onClick={() => {
                              const container = document.querySelector(
                                ".flight-cards-container"
                              );
                              container.scrollBy({
                                left: 280,
                                behavior: "smooth",
                              });
                            }}
                            className="absolute -right-1 sm:-right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm p-2 sm:p-1.5 rounded-full shadow-md hover:bg-white/30 transition-all active:scale-95"
                            aria-label="Scroll right"
                          >
                            <ChevronRight
                              size={16}
                              className="text-slate-800 sm:w-4 sm:h-4"
                            />
                          </button>

                          {/* Responsive card container */}
                          <div className="flight-cards-container flex overflow-x-auto hide-scrollbar py-2 px-1 snap-x gap-3 sm:gap-2">
                            {/* Make flight cards responsive - first card */}
                            <div className="flex-shrink-0 w-64 sm:w-56 xs:w-48 bg-amber-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-amber-500/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 snap-center">
                              <div className="p-4 sm:p-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <div className="w-4 h-4 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2"></div>
                                      <span className="font-bold text-lg sm:text-base text-white">
                                        4:30 PM
                                      </span>
                                    </div>
                                    <div className="text-xs text-amber-100/90 ml-6 sm:ml-5 mt-0.5">
                                      Indigo
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-white text-lg sm:text-base">
                                      4 hr 55 min
                                    </div>
                                    <div className="text-xs text-amber-100/90">
                                      1 stop · 1 stop
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between mt-3 pt-2 border-t border-amber-500/20 items-center">
                                  <div className="flex items-center space-x-1">
                                    <div className="text-xs sm:text-[10px] text-amber-100/90">
                                      CO₂
                                    </div>
                                    <div className="text-xs sm:text-[10px] font-medium text-white">
                                      140 kg
                                    </div>
                                  </div>
                                  <div className="text-xs sm:text-[10px] text-amber-100/90">
                                    Avg emissions ·{" "}
                                    <span className="font-bold text-amber-200">
                                      ₹679
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Flight Option 2 */}
                            <div className="flex-shrink-0 w-64 bg-amber-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-amber-500/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 snap-center">
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                                      <span className="font-bold text-lg text-white">
                                        3:20 PM
                                      </span>
                                    </div>
                                    <div className="text-xs text-amber-100/90 ml-6 mt-0.5">
                                      Air India Express
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-white">
                                      1 hr 40 min
                                    </div>
                                    <div className="text-xs text-amber-100/90">
                                      1 stop
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between mt-3 pt-2 border-t border-amber-500/20 items-center">
                                  <div className="flex items-center space-x-1">
                                    <div className="text-xs text-amber-100/90">
                                      CO₂
                                    </div>
                                    <div className="text-xs font-medium text-white">
                                      187 kg
                                    </div>
                                  </div>
                                  <div className="text-xs text-red-200">
                                    +36% emissions ·{" "}
                                    <span className="font-bold">₹700</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Flight Option 3 */}
                            <div className="flex-shrink-0 w-64 bg-amber-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-amber-500/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 snap-center">
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                                      <span className="font-bold text-lg text-white">
                                        6:55 PM
                                      </span>
                                    </div>
                                    <div className="text-xs text-amber-100/90 ml-6 mt-0.5">
                                      Air India
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-white">
                                      2 hr 55 min
                                    </div>
                                    <div className="text-xs text-amber-100/90">
                                      Nonstop
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between mt-3 pt-2 border-t border-amber-500/20 items-center">
                                  <div className="flex items-center space-x-1">
                                    <div className="text-xs text-amber-100/90">
                                      CO₂
                                    </div>
                                    <div className="text-xs font-medium text-white">
                                      119 kg
                                    </div>
                                  </div>
                                  <div className="text-xs text-green-200">
                                    -17% emissions ·{" "}
                                    <span className="font-bold">₹709</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Flight Option 4 */}
                            <div className="flex-shrink-0 w-64 bg-amber-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-amber-500/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 snap-center">
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                                      <span className="font-bold text-lg text-white">
                                        3:30 AM
                                      </span>
                                    </div>
                                    <div className="text-xs text-amber-100/90 ml-6 mt-0.5">
                                      Air India
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-white">
                                      2 hr 45 min
                                    </div>
                                    <div className="text-xs text-amber-100/90">
                                      2 stops · 4 hr
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between mt-3 pt-2 border-t border-amber-500/20 items-center">
                                  <div className="flex items-center space-x-1">
                                    <div className="text-xs text-amber-100/90">
                                      CO₂
                                    </div>
                                    <div className="text-xs font-medium text-white">
                                      139 kg
                                    </div>
                                  </div>
                                  <div className="text-xs text-green-200">
                                    Best value ·{" "}
                                    <span className="font-bold">₹195</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {slide.showSearch && (
                      <div className="mt-8 w-full max-w-xs mx-auto">
                        <div className="border-2 border-emerald-100 bg-white/30 backdrop-blur-sm rounded-full py-3 px-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:border-emerald-200">
                          {slide.searchPlaceholder}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators at the bottom */}
          <div className="fixed bottom-8 left-0 right-0 flex justify-center space-x-2 z-50">
            {sliderSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
