import { useState } from "react";
import { useTravanaProcessor } from "./useTravanaProcessor";
import { useTextToSpeech } from "./useTextToSpeech";

export interface Responses {
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function useTravanaAgent() {
  const [creatingThread, setCreatingThread] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [fetchingResponse, setFetchingResponse] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Responses[]>([]);
  const { flightInfo, processAssistantMessage } = useTravanaProcessor();
  const { speakNative } = useTextToSpeech(() => {});

  // Mock createThread function
  const createThread = async () => {
    try {
      setCreatingThread(true);
      setThreadId(null);
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      const newThreadId = Math.random().toString(36).substring(2, 10);
      setThreadId(newThreadId);
    } catch (error) {
      console.error("Error creating thread:", error);
      setResponseError("Failed to create thread");
    } finally {
      setCreatingThread(false);
    }
  };

  const sendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    try {
      if (!threadId) {
        await createThread();
      }

      setFetchingResponse(true);
      setResponseError(null);

      const newUserMessage = {
        type: "user" as const,
        content: userInput,
        timestamp: new Date(),
      };

      setResponses((prev) => [...prev, newUserMessage]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      const assistantMessage =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't process that request.";

      const newAssistantMessage = {
        type: "assistant" as const,
        content: assistantMessage,
        timestamp: new Date(),
      };

      setResponses((prev) => [...prev, newAssistantMessage]);
      speakNative(assistantMessage);
      processAssistantMessage(assistantMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseError("Failed to send message");

      const errorAssistantMessage = {
        type: "assistant" as const,
        content:
          "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };

      setResponses((prev) => [...prev, errorAssistantMessage]);
    } finally {
      setFetchingResponse(false);
    }
  };

  return {
    creatingThread,
    threadId,
    fetchingResponse,
    responseError,
    responses,
    createThread,
    sendMessage,
  };
}
