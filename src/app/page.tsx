"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
// import VoiceRecognition from "@/components/VoiceRecognition";
import ChatInterface from "@/components/ChatInterface";
import React from "react";
import {
  TravanaAgentProvider,
  useTravanaAgentContext,
} from "@/contexts/TravanaAgentContext";
import {
  useVoiceRecorderContext,
  VoiceRecorderProvider,
} from "@/contexts/VoiceRecorderContext";

function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [fadeState, setFadeState] = useState("fadeIn");
  // const [transcript, setTranscript] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [flightInfo, setFlightInfo] = useState({
    from: "DEL",
    to: "BLR",
    date: "13th April 2025",
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const { sendMessage } = useTravanaAgentContext();
  const { isRecording, isProcessing, listening, userSpeaking, transcript } =
    useVoiceRecorderContext();

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
    sendMessage(transcript);
  }, [transcript]);

  // Auto-cycle pages ONLY when conversation is not active
  useEffect(() => {
    if (isConversationActive) return;

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

    // Use a CSS class instead of repositioning elements
    const nextPageTimeout = setTimeout(
      () => {
        // First fade out current page
        setFadeState("fadeOut");

        // After fade out completes, change the page
        setTimeout(() => {
          if (currentPage < pages.length - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
          } else {
            // Reset to the beginning but skip the logo
            setCurrentPage(1);
          }
          // Then fade in the new page
          setFadeState("fadeIn");
        }, 500); // Wait for fadeOut to complete
      },
      currentPage === 0 ? 1000 : 4000
    );

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(nextPageTimeout);
    };
  }, [currentPage, pages.length, isConversationActive]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle voice transcript
  const handleTranscript = (text) => {
    if (!text.trim()) return;

    // Clear previous messages when starting a new prompt
    setMessages([]);

    // setTranscript(text);
    setInputText(text);
    setIsConversationActive(true);

    // Process the transcript when received
    sendMessage(text);
  };

  // Add this function to reset to the original state after a response
  const resetToOriginalState = () => {
    // Wait a short time after speaking before resetting
    setTimeout(() => {
      setIsConversationActive(false);
      setCurrentPage(1); // Reset to the second page (after logo)
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
      // Clear previous messages
      setMessages([]);

      // setTranscript(inputText);
      sendMessage(inputText);
      e.preventDefault();
    }
  };

  // Handle listening state changes
  const handleListeningChange = (listening) => {
    setIsListening(listening);
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
    ? isListening
      ? "Listening..."
      : chatResponse || "How can I help you?"
    : pages[currentPage].text;

  // const displaySearchPlaceholder = isConversationActive
  //   ? transcript || "Just speak to TRAVANA..."
  //   : pages[currentPage].searchPlaceholder;

  // Add this function to fix the error
  const handleChatResponse = (response) => {
    setChatResponse(response);

    // Process flight information - copied from handleChatSubmit
    if (response.includes("flight") || response.includes("travel")) {
      // Pattern matching for flight information
      if (response.includes("Delhi") || response.includes("DEL")) {
        setFlightInfo((prev) => ({ ...prev, from: "DEL" }));
      }
      if (response.includes("Bengaluru") || response.includes("BLR")) {
        setFlightInfo((prev) => ({ ...prev, to: "BLR" }));
      }
      // Extract potential dates
      const dateMatch = response.match(
        /(\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+\d{4})/
      );
      if (dateMatch) {
        setFlightInfo((prev) => ({ ...prev, date: dateMatch[0] }));
      }
    }
  };

  // Update the useEffect that handles listening state in Page.jsx
  useEffect(() => {
    // Make the circle change more immediate with direct DOM manipulation
    const circle = document.querySelector(`.${styles.circle}`) as HTMLElement;
    if (circle) {
      if (isListening) {
        circle.classList.add(styles.listening);
        circle.style.transition = "all 0.15s linear";
      } else {
        circle.classList.remove(styles.listening);
        circle.style.transition = "all 0.3s linear";
      }
    }
  }, [isListening, styles.circle, styles.listening]);

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
      {pages[currentPage].isLogo && !isConversationActive ? (
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
                  isListening ? styles.listening : ""
                }`}
                style={{ marginTop: "-40px" }}
              ></div>
              <div
                className={styles.listeningText}
                style={{ marginTop: "-20px" }}
              >
                {isListening ? "Listening..." : isSpeaking ? "Speaking..." : ""}
              </div>
            </div>

            {/* Text display with fixed height - hide when listening */}
            {!isListening && !isConversationActive && (
              <div className={styles.promptContainer}>
                <p
                  className={`${styles.prompt} ${
                    isConversationActive ? "" : styles[fadeState]
                  }`}
                >
                  {pages[currentPage].text}
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
              {messages.length > 0 &&
                messages[messages.length - 1].type === "assistant" && (
                  <div
                    className={`${styles.messageCard} ${styles.assistantMessage}`}
                  >
                    <div className={styles.messageContent}>
                      {messages[messages.length - 1].content}
                    </div>
                  </div>
                )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Bottom section with fixed position - hide during listening */}
          {!isListening && (
            <div className={styles.bottomSection}>
              <div className={styles.searchBarContainer}>
                <input
                  type="text"
                  className={styles.searchBar}
                  placeholder={
                    isConversationActive
                      ? "Type your message..."
                      : pages[currentPage].searchPlaceholder
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

export const TravanaAI = () => {
  return (
    <TravanaAgentProvider>
      <VoiceRecorderProvider>
        <Home />
      </VoiceRecorderProvider>
    </TravanaAgentProvider>
  );
};
