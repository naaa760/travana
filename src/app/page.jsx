"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import VoiceRecognition from "@/components/VoiceRecognition";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [fadeState, setFadeState] = useState("fadeIn");
  const [transcript, setTranscript] = useState("");
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

    setTranscript(text);
    setInputText(text);
    setIsConversationActive(true);

    // Process the transcript when received
    handleChatSubmit(text);
  };

  // Handle text input submission
  const handleChatSubmit = (message) => {
    if (!message.trim()) return;

    setIsConversationActive(true);
    setInputText("");

    // Add user message to conversation
    const newUserMessage = {
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => {
        const assistantMessage =
          data.choices?.[0]?.message?.content ||
          "Sorry, I couldn't process that request.";

        // Add assistant message to conversation
        const newAssistantMessage = {
          type: "assistant",
          content: assistantMessage,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newAssistantMessage]);
        setChatResponse(assistantMessage);

        // Process flight information
        if (
          assistantMessage.includes("flight") ||
          assistantMessage.includes("travel")
        ) {
          // Simple pattern matching - you could make this more sophisticated
          if (
            assistantMessage.includes("Delhi") ||
            assistantMessage.includes("DEL")
          ) {
            setFlightInfo((prev) => ({ ...prev, from: "DEL" }));
          }
          if (
            assistantMessage.includes("Bengaluru") ||
            assistantMessage.includes("BLR")
          ) {
            setFlightInfo((prev) => ({ ...prev, to: "BLR" }));
          }
          // Extract potential dates - this is a simple example
          const dateMatch = assistantMessage.match(
            /(\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+\d{4})/
          );
          if (dateMatch) {
            setFlightInfo((prev) => ({ ...prev, date: dateMatch[0] }));
          }
        }
      })
      .catch((error) => {
        console.error("Error sending message to Groq:", error);

        // Add error message to conversation
        const errorMessage = {
          type: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
          isError: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
        setChatResponse(
          "Sorry, I'm having trouble connecting right now. Please try again later."
        );
      });
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle keyboard submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      setTranscript(inputText);
      handleChatSubmit(inputText);
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
    setTranscript("");
    setChatResponse("");
  };

  // Add this to displayText logic to ensure responses don't disappear
  const displayText = isConversationActive
    ? isListening
      ? "Listening..."
      : chatResponse || "How can I help you?"
    : pages[currentPage].text;

  const displaySearchPlaceholder = isConversationActive
    ? transcript || "Just speak to TRAVANA..."
    : pages[currentPage].searchPlaceholder;

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

  return (
    <main className={styles.main}>
      {pages[currentPage].isLogo && !isConversationActive ? (
        <div className={`${styles.logoContainer} ${styles[fadeState]}`}>
          <h1 className={styles.logo}>TRAVANA</h1>
        </div>
      ) : (
        <div className={styles.contentContainer}>
          {/* Top section for flight info */}
          {(pages[currentPage].showFlightCode || isConversationActive) && (
            <div className={styles.flightCodeContainer}>
              <div className={styles.flightCode}>
                {flightInfo.from} - {flightInfo.to}
                {(pages[currentPage].showDate || isConversationActive) && (
                  <div className={styles.flightDate}>{flightInfo.date}</div>
                )}
              </div>
            </div>
          )}

          {/* Middle section with fixed heights */}
          <div className={styles.fixedHeightSection}>
            {/* Voice circle with fixed position */}
            <div className={styles.circleContainer}>
              <div
                className={`${styles.circle} ${
                  isListening ? styles.listening : ""
                }`}
              ></div>
              {isListening && (
                <div className={styles.listeningText}>Listening...</div>
              )}
            </div>

            {/* Text display with fixed height */}
            {!isConversationActive && (
              <div className={styles.promptContainer}>
                <p
                  className={`${styles.prompt} ${
                    isConversationActive ? "" : styles[fadeState]
                  }`}
                >
                  {displayText}
                </p>
              </div>
            )}
          </div>

          {/* Message container with fixed positioning */}
          {isConversationActive && (
            <div className={styles.messagesContainer}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.messageCard} ${
                    msg.type === "user"
                      ? styles.userMessage
                      : styles.assistantMessage
                  } ${msg.isError ? styles.errorMessage : ""}`}
                >
                  <div className={styles.messageContent}>{msg.content}</div>
                  <div className={styles.messageTime}>
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Bottom section with fixed position */}
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
                    handleChatSubmit(inputText);
                  }}
                  aria-label="Send message"
                />
              )}
            </div>
          </div>

          {/* Hidden voice recognition - now works automatically */}
          <div style={{ display: "none" }}>
            <VoiceRecognition
              onTranscriptReceived={handleTranscript}
              onListeningChange={handleListeningChange}
            />
          </div>

          {/* Hidden chat interface is no longer needed */}
          {/* <div style={{ display: "none" }}>
            <ChatInterface
              transcript={transcript}
              onChatResponse={handleChatResponse}
            />
          </div> */}
        </div>
      )}
    </main>
  );
}
