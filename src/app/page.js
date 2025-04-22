"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Playfair_Display, Cinzel, Montserrat } from "next/font/google";
import "./shimmer.css";

// Initialize the fonts
const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef([]);

  const slides = [
    {
      title: "TRAVANA",
      subtitle: "Your AI Travel Companion",
      searchPlaceholder: "",
      showCircle: false,
      showSearch: false,
      showHeader: false,
      route: "",
    },
    {
      title: "Try Talking to me directly",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
    },
    {
      title: "You can ask me to book a flight",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
    },
    {
      title: "You can ask me to book a Hotel",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
    },
    {
      title: "I can speak in 40+ Languages",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
    },
    {
      title: "Listening...",
      subtitle: "",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
      circleColor: "bg-blue-400",
    },
    {
      title: "Where do you want to go? And",
      subtitle: "Where are you currently?",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
    },
    {
      title: "When do you plan on going to",
      subtitle: "Benguluru?",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: true,
      route: "DEL - BLR",
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
    },
    {
      title: "Great! Do you want to choose",
      subtitle: "seats?",
      searchPlaceholder: "Search for Cheapest Flights...",
      showCircle: true,
      showSearch: true,
      showHeader: false,
      route: "",
    },
  ];

  const scrollToSlide = (index) => {
    if (slidesRef.current[index]) {
      slidesRef.current[index]?.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(index);
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        const slideTop = slide.offsetTop;
        if (scrollPosition >= slideTop - windowHeight / 2) {
          setCurrentSlide(index);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  };

  return (
    <main
      className="min-h-screen text-black"
      style={{
        backgroundImage: "url('/vid.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (slidesRef.current[index] = el)}
          className="min-h-screen flex flex-col items-center justify-between relative"
        >
          {slide.showHeader && (
            <div className="w-full text-center pt-4 font-mono text-sm">
              {slide.route}
              {slide.date && <div>{slide.date}</div>}
            </div>
          )}

          <div className="flex flex-col items-center justify-center flex-grow">
            {index === 0 ? (
              <div className="text-center animate-fadeIn relative">
                {/* Sparkle elements */}
                <div className="shimmer-sparkle sparkle-1"></div>
                <div className="shimmer-sparkle sparkle-2"></div>
                <div className="shimmer-sparkle sparkle-3"></div>
                <div className="shimmer-sparkle sparkle-4"></div>

                <h1
                  className={`${cinzel.className} text-8xl font-black tracking-wider mb-4 text-black shimmer-text`}
                  style={{
                    textShadow: "3px 3px 6px rgba(255, 255, 255, 0.7)",
                    letterSpacing: "0.2em",
                    transform: "scale(1.05)",
                    WebkitTextStroke: "1px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  className={`${montserrat.className} text-2xl font-medium text-black mt-6 max-w-md mx-auto`}
                  style={{
                    textShadow: "1px 1px 3px rgba(255, 255, 255, 0.6)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {slide.subtitle}
                </p>
                <div className="mt-10 flex space-x-4 justify-center">
                  <button
                    className={`${montserrat.className} bg-black text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition duration-300`}
                    style={{
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    }}
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
            ) : (
              <>
                {slide.showCircle && (
                  <div
                    className={`${
                      slide.circleColor || "bg-purple-400"
                    } w-32 h-32 rounded-full mb-8 opacity-70 blur-md`}
                  ></div>
                )}
                <div className="text-center px-4">
                  <p className="text-lg">{slide.title}</p>
                  {slide.subtitle && (
                    <p className="text-lg">{slide.subtitle}</p>
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
                    <h2 className="text-xl font-bold mb-4">{slide.title}</h2>

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
                        <div className="text-xs text-gray-600">140 kg CO2e</div>
                        <div className="text-xs text-green-600">
                          Avg emissions <span className="font-bold">₹679</span>
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
                          <div className="text-xs text-gray-600">1 stop</div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="text-xs text-gray-600">187 kg CO2e</div>
                        <div className="text-xs text-red-600">
                          +36% emissions <span className="font-bold">₹700</span>
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
                        <div className="text-xs text-gray-600">119 kg CO2e</div>
                        <div className="text-xs text-green-600">
                          -17% emissions <span className="font-bold">₹709</span>
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
                        <div className="text-xs text-gray-600">139 kg CO2e</div>
                        <div className="text-xs text-green-600">
                          Avg emissions <span className="font-bold">₹195</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {slide.showSearch && (
            <div className="mb-8 w-full px-4 max-w-xs mx-auto">
              <div className="border-2 border-gray-800 rounded-full py-3 px-6 text-center">
                {slide.searchPlaceholder}
              </div>
            </div>
          )}

          {index < slides.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-600 animate-bounce"
              aria-label="Scroll to next section"
            >
              <ChevronDown size={24} />
            </button>
          )}
        </div>
      ))}
    </main>
  );
}
