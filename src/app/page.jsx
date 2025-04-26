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
  const [isSpeaking, setIsSpeaking] = useState(false);

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

    // Clear previous messages when starting a new prompt
    setMessages([]);

    setTranscript(text);
    setInputText(text);
    setIsConversationActive(true);

    // Process the transcript when received
    handleChatSubmit(text);
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

  // Modify handleChatSubmit to not reset until speaking is done
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

    // Clear previous messages for a cleaner experience
    setMessages([newUserMessage]);

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

        // Replace all messages with just the latest conversation
        setMessages([newUserMessage, newAssistantMessage]);
        setChatResponse(assistantMessage);

        // Speak the response - ONLY the exact response text
        speakResponse(assistantMessage);

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

        // Don't reset to original state here! Let onended handle that
        // Only reset if we don't have speech
        if (!assistantMessage.trim()) {
          resetToOriginalState();
        }
      })
      .catch((error) => {
        console.error("Error sending message to Groq:", error);

        // Add error message
        const errorMessage = {
          type: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
          isError: true,
          timestamp: new Date(),
        };

        setMessages([newUserMessage, errorMessage]);

        // Speak the error message
        speakResponse(
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
      // Clear previous messages
      setMessages([]);

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

  // Update the useEffect that handles listening state in Page.jsx
  useEffect(() => {
    // Make the circle change more immediate with direct DOM manipulation
    const circle = document.querySelector(`.${styles.circle}`);
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

  // Optimize the speakResponse function to be more responsive
  const speakResponse11 = async (text) => {
    try {
      // Set speaking state IMMEDIATELY
      setIsSpeaking(true);

      // Only speak if we have text to speak
      if (!text || text.trim() === "") {
        setIsSpeaking(false);
        return;
      }

      // Create audio element if it doesn't exist
      let audioElement = document.getElementById("tts-audio");
      if (!audioElement) {
        audioElement = document.createElement("audio");
        audioElement.id = "tts-audio";
        document.body.appendChild(audioElement);
      }

      // Stop any currently playing audio
      audioElement.pause();
      audioElement.currentTime = 0;

      // Call ElevenLabs API through our Next.js API route - with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

      try {
        const response = await fetch("/api/elevenlabs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Failed to generate speech");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Convert base64 to blob
        const audioBlob = base64ToBlob(data.audio, "audio/mpeg");
        const audioUrl = URL.createObjectURL(audioBlob);

        // Play the audio
        audioElement.src = audioUrl;

        // Set up event handlers
        audioElement.onplay = () => console.log("Speaking started");

        audioElement.onended = () => {
          setIsSpeaking(false);
          resetToOriginalState();
          URL.revokeObjectURL(audioUrl);
        };

        audioElement.onerror = () => {
          setIsSpeaking(false);
          resetToOriginalState();
          URL.revokeObjectURL(audioUrl);
        };

        // Play the audio
        await audioElement.play();
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Speech request failed:", error);
        setIsSpeaking(false);
        resetToOriginalState();
      }
    } catch (error) {
      console.error("Speech synthesis error:", error);
      setIsSpeaking(false);
      resetToOriginalState();
    }
  };

  const speakResponse = async (text) => {
    try {
      setIsSpeaking(true);

      if (!text || text.trim() === "") {
        setIsSpeaking(false);
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // You can set the language/accent here
      utterance.rate = 1; // 1 = normal speed
      utterance.pitch = 1; // 1 = normal pitch
      utterance.volume = 1; // 1 = max volume

      // Handle speech start
      utterance.onstart = () => {
        console.log("Speaking started");
      };

      // Handle speech end
      utterance.onend = () => {
        setIsSpeaking(false);
        resetToOriginalState();
      };

      // Handle speech error
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        setIsSpeaking(false);
        resetToOriginalState();
      };

      // Speak the text
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech synthesis error:", error);
      setIsSpeaking(false);
      resetToOriginalState();
    }
  };

  // Helper function to convert base64 to blob
  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mimeType });
  };

  // In your page component, update handleVoiceInput to actually use the transcript
  const handleVoiceInput = (transcript) => {
    console.log("Page received transcript:", transcript);

    if (transcript && transcript.trim()) {
      // This is the critical missing piece - send the transcript to your chat processor
      handleChatSubmit(transcript);
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
                      handleChatSubmit(inputText);
                    }}
                    aria-label="Send message"
                  />
                )}
              </div>
            </div>
          )}

          {/* Hidden voice recognition component remains */}
          <div style={{ display: "none" }}>
            <VoiceRecognition
              onTranscriptReceived={handleVoiceInput}
              onListeningChange={handleListeningChange}
            />
          </div>
        </div>
      )}
    </main>
  );
}
