"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [fadeState, setFadeState] = useState("fadeIn");
  const [isListening, setIsListening] = useState(false);
  const [flightInfo, setFlightInfo] = useState({
    from: "DEL",
    to: "BLR",
    date: "13th April 2025",
  });

  const pages = [
    { text: "TRAVANA", isLogo: true },
    { text: "Try Talking to me directly" },
    { text: "You can ask me to book a flight" },
    { text: "You can ask me to book a Hotel" },
    { text: "I can speak in 40+ Languages" },
    { text: "Listening...", isListening: true },
    { text: "Where do you want to go? And Where are you currently?" },
    { text: "When do you plan on going to Benguluru?", showFlightCode: true },
    {
      text: "When do you plan on going to Benguluru?",
      showFlightCode: true,
      showDate: true,
    },
  ];

  useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      setFadeState("visible");
    }, 1000);

    const fadeOutTimeout = setTimeout(() => {
      setFadeState("fadeOut");
    }, 3000);

    const nextPageTimeout = setTimeout(() => {
      if (currentPage < pages.length - 1) {
        setCurrentPage((prevPage) => prevPage + 1);
        setFadeState("fadeIn");
        setIsListening(pages[currentPage + 1]?.isListening || false);
      } else {
        // Reset to the beginning
        setCurrentPage(0);
        setFadeState("fadeIn");
        setIsListening(false);
      }
    }, 4000);

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

          <div className={`${styles.circleContainer} ${styles[fadeState]}`}>
            <div
              className={`${styles.circle} ${
                isListening ? styles.listening : ""
              }`}
            ></div>
          </div>

          <p className={`${styles.prompt} ${styles[fadeState]}`}>
            {pages[currentPage].text}
          </p>

          <div className={styles.searchBarContainer}>
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search for Cheapest Flights..."
              readOnly
            />
          </div>
        </div>
      )}
    </main>
  );
}
