"use client";

import { useState, useEffect } from "react";
import styles from "./ChatInterface.module.css";

export default function ChatInterface({ transcript, onChatResponse }) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [previousTranscript, setPreviousTranscript] = useState("");

  // Process transcript only when it changes and isn't empty
  useEffect(() => {
    if (transcript && transcript !== previousTranscript && transcript.trim()) {
      setPreviousTranscript(transcript);
      setInput(transcript);
      handleSubmit(transcript);
    }
  }, [transcript, previousTranscript]);

  const handleSubmit = async (message) => {
    try {
      setLoading(true);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const assistantMessage =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't process that request.";

      onChatResponse(assistantMessage);
    } catch (error) {
      console.error("Error sending message to Groq:", error);
      onChatResponse(
        "Sorry, I'm having trouble connecting right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatInterface}>
      {loading && (
        <div className={styles.loadingIndicator}>
          Processing your request...
        </div>
      )}
    </div>
  );
}
