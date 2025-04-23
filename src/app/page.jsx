"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [fadeState, setFadeState] = useState("fadeIn");
  const [flightInfo, setFlightInfo] = useState({
    from: "DEL",
    to: "BLR",
    date: "13th April 2025",
  });

  const pages = [
    {
      text: "TRAVANA",
      isLogo: true,
      searchPlaceholder: "Your AI travel assistant...",
    },
    {
      text: "Try Talking to me directly",
      searchPlaceholder: "Say 'Hello TRAVANA'...",
    },
    {
      text: "You can ask me to book a flight",
      searchPlaceholder: "Find flights to New York...",
    },
    {
      text: "You can ask me to book a Hotel",
      searchPlaceholder: "Book a hotel in Paris...",
    },
    {
      text: "I can speak in 40+ Languages",
      searchPlaceholder: "Hola! Bonjour! Ciao! Namaste!",
    },
    {
      text: "Listening...",
      isListening: true,
      searchPlaceholder: "I'm listening to you...",
    },
    {
      text: "Where do you want to go? And Where are you currently?",
      searchPlaceholder: "Tell me your departure and destination...",
    },
    {
      text: "When do you plan on going to Benguluru?",
      showFlightCode: true,
      searchPlaceholder: "When are you planning to travel?",
    },
    {
      text: "When do you plan on going to Benguluru?",
      showFlightCode: true,
      showDate: true,
      searchPlaceholder: "Searching flights on 13th April 2025...",
    },
  ];

  useEffect(() => {
    const fadeInTimeout = setTimeout(
      () => {
        setFadeState("visible");
      },
      currentPage === 0 ? 200 : 1000
    );

    const fadeOutTimeout = setTimeout(
      () => {
        setFadeState("fadeOut");
      },
      currentPage === 0 ? 800 : 3000
    );

    const nextPageTimeout = setTimeout(
      () => {
        if (currentPage < pages.length - 1) {
          setCurrentPage((prevPage) => prevPage + 1);
          setFadeState("fadeIn");
        } else {
          // Reset to the beginning but skip the logo
          setCurrentPage(1);
          setFadeState("fadeIn");
        }
      },
      currentPage === 0 ? 1000 : 4000
    );

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(nextPageTimeout);
    };
  }, [currentPage, pages.length]);

  return (
    <main className={styles.main}>
      {pages[currentPage].isLogo ? (
        <div className={`${styles.logoContainer} ${styles[fadeState]}`}>
          <h1 className={styles.logo}>TRAVANA</h1>
        </div>
      ) : (
        <div className={styles.contentContainer}>
          {pages[currentPage].showFlightCode && (
            <div className={styles.flightCode}>
              {flightInfo.from} - {flightInfo.to}
              {pages[currentPage].showDate && (
                <div className={styles.flightDate}>{flightInfo.date}</div>
              )}
            </div>
          )}

          {/* Voice circle that never fades */}
          <div className={styles.circleContainer}>
            <div
              className={`${styles.circle} ${
                pages[currentPage].text === "Listening..."
                  ? styles.listening
                  : ""
              }`}
            ></div>
          </div>

          {/* Only the text fades in/out */}
          <p className={`${styles.prompt} ${styles[fadeState]}`}>
            {pages[currentPage].text}
          </p>

          <div className={styles.searchBarContainer}>
            <input
              type="text"
              className={styles.searchBar}
              placeholder={
                pages[currentPage].searchPlaceholder ||
                "Search for Cheapest Flights..."
              }
              readOnly
            />
          </div>
        </div>
      )}
    </main>
  );
}
