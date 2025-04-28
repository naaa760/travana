"use client";

import React, { useState, useEffect, useRef } from "react";

import {
  TravanaAgentProvider,
  useTravanaAgentContext,
} from "@/contexts/TravanaAgentContext";
import {
  useVoiceRecorderContext,
  VoiceRecorderProvider,
} from "@/contexts/VoiceRecorderContext";

import slides from "@/data/slides.json";

import styles from "./page.module.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeState, setFadeState] = useState("fadeIn");
  const [chatResponse, setChatResponse] = useState("");
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const [flightInfo, setFlightInfo] = useState({
    from: "DEL",
    to: "BLR",
    date: "13th April 2025",
  });

  const { sendMessage, responses, isSpeaking } = useTravanaAgentContext();
  const { isProcessing, listening, isRecording, transcript } =
    useVoiceRecorderContext();

  useEffect(() => {
    sendMessage(transcript);
  }, [transcript]);

  useEffect(() => setIsConversationActive(responses.length > 0), [responses]);

  // Auto-cycle slides ONLY when conversation is not active
  useEffect(() => {
    if (isConversationActive) return;

    const fadeInTimeout = setTimeout(
      () => {
        setFadeState("visible");
      },
      currentSlide === 0 ? 200 : 1000
    );

    const fadeOutTimeout = setTimeout(
      () => {
        setFadeState("fadeOut");
      },
      currentSlide === 0 ? 800 : 3000
    );

    // Use a CSS class instead of repositioning elements
    const nextSlideTimeout = setTimeout(
      () => {
        // First fade out current page
        setFadeState("fadeOut");

        // After fade out completes, change the page
        setTimeout(() => {
          if (currentSlide < slides.length - 1) {
            setCurrentSlide((prevPage) => prevPage + 1);
          } else {
            // Reset to the beginning but skip the logo
            setCurrentSlide(1);
          }
          // Then fade in the new page
          setFadeState("fadeIn");
        }, 500); // Wait for fadeOut to complete
      },
      currentSlide === 0 ? 1000 : 4000
    );

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(nextSlideTimeout);
    };
  }, [currentSlide, slides.length, isConversationActive]);

  // Auto-scroll to bottom when responses change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses]);

  // Add this function to reset to the original state after a response
  const resetToOriginalState = () => {
    // Wait a short time after speaking before resetting
    setTimeout(() => {
      setIsConversationActive(false);
      setCurrentSlide(1); // Reset to the second page (after logo)
      setFadeState("fadeIn");
    }, 8000); // 8 seconds after response - adjust this timing as needed
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle keyboard submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      // Clear previous responses
      // setMessages([]);

      // setTranscript(inputText);
      sendMessage(inputText);
      e.preventDefault();
    }
  };

  // Add a new function to handle initiating new chats
  const startNewChat = () => {
    // Save previous chat for history if needed
    // setChatHistory(prev => [...prev, { query: transcript, response: chatResponse }]);

    // Clear for new chat
    // setTranscript("");
    setChatResponse("");
  };

  // Add this to displayText logic to ensure responses don't disappear
  const displayText = isConversationActive
    ? isRecording
      ? "Listening..."
      : chatResponse || "How can I help you?"
    : slides[currentSlide].text;

  // const displaySearchPlaceholder = isConversationActive
  //   ? transcript || "Just speak to TRAVANA..."
  //   : slides[currentSlide].searchPlaceholder;

  // Add this at the top of your component (after your useState declarations)
  useEffect(() => {
    // Initialize speech synthesis voices
    if ("speechSynthesis" in window) {
      // Load voices
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        // Voices not loaded yet, add an event listener
        window.speechSynthesis.addEventListener("voiceschanged", () => {
          console.log(
            "Voices loaded:",
            window.speechSynthesis.getVoices().length
          );
        });
      }
    }
  }, []);

  return (
    <main className={styles.main}>
      {slides[currentSlide].isLogo && !isConversationActive ? (
        <div className={`${styles.logoContainer} ${styles[fadeState]}`}>
          <h1 className={styles.logo}>TRAVANA</h1>
        </div>
      ) : (
        <div className={styles.contentContainer}>
          {/* Middle section with fixed heights */}
          <div className={styles.fixedHeightSection}>
            {/* Voice circle with fixed position */}
            <div className={styles.circleContainer}>
              <div
                className={`${styles.circle} ${
                  (!isSpeaking && responses.length > 0) || isRecording
                    ? styles.listening
                    : ""
                }`}
                style={{ marginTop: "-40px" }}
              ></div>
              <div
                className={styles.listeningText}
                style={{ marginTop: "-20px" }}
              >
                {isRecording
                  ? "Listening..."
                  : isProcessing
                  ? "Processing.."
                  : isSpeaking
                  ? "Speaking..."
                  : ""}
              </div>
            </div>

            {/* Text display with fixed height - hide when listening */}
            {!isRecording && !isConversationActive && (
              <div className={styles.promptContainer}>
                <p
                  className={`${styles.prompt} ${
                    isConversationActive ? "" : styles[fadeState]
                  }`}
                >
                  {slides[currentSlide].text}
                </p>
              </div>
            )}
          </div>

          {/* Message container - only show when in conversation and not listening */}
          {isConversationActive && (
            <div
              className={styles.messagesContainer}
              style={{
                marginTop: "100px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Show the latest message */}
              {responses.length > 0 &&
                responses[responses.length - 1].role === "assistant" && (
                  <div
                    className={`${styles.messageCard} ${styles.assistantMessage}`}
                  >
                    <div className={styles.messageContent}>
                      {responses[responses.length - 1].content}
                    </div>
                  </div>
                )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Bottom section with fixed position - hide during listening */}
          {!isRecording && (
            <div className={styles.bottomSection}>
              <div className={styles.searchBarContainer}>
                <input
                  type="text"
                  className={styles.searchBar}
                  placeholder={
                    isConversationActive
                      ? "Type your message..."
                      : slides[currentSlide].searchPlaceholder
                  }
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {inputText.trim().length > 0 && (
                  <button
                    className={styles.sendButton}
                    onClick={() => {
                      sendMessage(inputText);
                    }}
                    aria-label="Send message"
                  />
                )}
              </div>
            </div>
          )}

          {/* Hidden voice recognition component remains */}
          {/* <div style={{ display: "none" }}>
            <VoiceRecognition
              onTranscriptReceived={handleVoiceInput}
              onListeningChange={handleListeningChange}
            />
          </div> */}
        </div>
      )}
    </main>
  );
}

export default function TravanaAI() {
  return (
    <TravanaAgentProvider>
      <VoiceRecorderProvider>
        <Home />
      </VoiceRecorderProvider>
    </TravanaAgentProvider>
  );
};
