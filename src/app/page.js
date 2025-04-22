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
      subtitle: "Benguluru?",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: true,
      route: "DEL - BLR",
      circleColor: "bg-gradient-circle",
    },
    {
      title: "When do you plan on going to",
      subtitle: "Benguluru?",
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
      route: "DEL - BLR",
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
      route: "DEL - BLR",
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
            <div className="w-full text-center mb-8">
              <h1
                className={`${cinzel.className} text-8xl font-black tracking-wider mb-4 text-black shimmer-text`}
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
                className={`${montserrat.className} text-2xl font-medium text-black mt-6 max-w-md mx-auto`}
                style={{
                  textShadow: "1px 1px 3px rgba(255, 255, 255, 0.6)",
                  letterSpacing: "0.05em",
                }}
              >
                Your AI Travel Companion
              </p>
              <div className="mt-10 flex space-x-4 justify-center">
                <button
                  className={`${montserrat.className} bg-black text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition duration-300`}
                  style={{
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                  }}
                  onClick={startJourney}
                >
                  Start Journey
                </button>
                <button
                  className={`${montserrat.className} bg-white/85 backdrop-blur-sm text-black px-8 py-4 rounded-full font-semibold hover:bg-white/95 transition duration-300 border-2 border-black`}
                  style={{
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                  }}
                >
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
                    <div className="absolute top-4 left-0 right-0 text-center font-mono text-sm">
                      {slide.route}
                      {slide.date && <div>{slide.date}</div>}
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center w-full max-w-xl px-4">
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
                      <div className="mt-4 w-[90%] max-w-xs">
                        <h2 className="text-xl font-bold mb-4">
                          {slide.title}
                        </h2>
                        {/* Flight Option 1 */}
                        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <div className="w-6 h-6 mr-2 text-blue-600">
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                                <span className="font-semibold">4:30 PM</span>
                              </div>
                              <div className="text-xs text-gray-600 ml-8">
                                Indigo
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">4 hr 55 min</div>
                              <div className="text-xs text-gray-600">
                                1 stop · 1 stop
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-xs text-gray-600">
                              140 kg CO2e
                            </div>
                            <div className="text-xs text-green-600">
                              Avg emissions{" "}
                              <span className="font-bold">₹679</span>
                            </div>
                          </div>
                        </div>

                        {/* Flight Option 2 */}
                        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <div className="w-6 h-6 mr-2 text-red-600">
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                                <span className="font-semibold">3:20 PM</span>
                              </div>
                              <div className="text-xs text-gray-600 ml-8">
                                Air India Express
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">1 hr 40 min</div>
                              <div className="text-xs text-gray-600">
                                1 stop
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-xs text-gray-600">
                              187 kg CO2e
                            </div>
                            <div className="text-xs text-red-600">
                              +36% emissions{" "}
                              <span className="font-bold">₹700</span>
                            </div>
                          </div>
                        </div>

                        {/* Flight Option 3 */}
                        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <div className="w-6 h-6 mr-2 text-red-600">
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                                <span className="font-semibold">6:55 PM</span>
                              </div>
                              <div className="text-xs text-gray-600 ml-8">
                                Air India
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">2 hr 55 min</div>
                              <div className="text-xs text-gray-600">
                                2.55 min Nonstop
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-xs text-gray-600">
                              119 kg CO2e
                            </div>
                            <div className="text-xs text-green-600">
                              -17% emissions{" "}
                              <span className="font-bold">₹709</span>
                            </div>
                          </div>
                          <div className="text-xs text-green-600 mt-1">
                            Avoids as much CO2e as 1,157 trees absorb in 1 day
                          </div>
                        </div>

                        {/* Flight Option 4 */}
                        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <div className="w-6 h-6 mr-2 text-red-600">
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                                <span className="font-semibold">3:30 AM</span>
                              </div>
                              <div className="text-xs text-gray-600 ml-8">
                                Air India
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">2 hr 45 min</div>
                              <div className="text-xs text-gray-600">
                                2 sts at 4 hr
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-xs text-gray-600">
                              139 kg CO2e
                            </div>
                            <div className="text-xs text-green-600">
                              Avg emissions{" "}
                              <span className="font-bold">₹195</span>
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
