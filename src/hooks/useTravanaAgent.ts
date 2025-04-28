import { useState } from "react";

export interface Responses {
  role: "user" | "assistant";
  content: string;
  // timestamp: Date;
}

export function useTravanaAgent(onResponseRecieved: (text: string) => void) {
  const [creatingThread, setCreatingThread] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [fetchingResponse, setFetchingResponse] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Responses[]>([]);

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
      // if (!threadId) {
      //   await createThread();
      // }

      setFetchingResponse(true);
      setResponseError(null);

      const newUserMessage: Responses = {
        role: "user",
        content: userInput,
        // timestamp: new Date(),
      };

      const updatedResponses = [...responses, newUserMessage];
      setResponses(updatedResponses);

      // const formattedMessages = updatedResponses.map((msg) => ({
      //   role: msg.role,
      //   content: msg.content,
      // }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedResponses.slice(-10),
        }),
      });

      const data = await response.json();

      const assistantMessage = data || "Sorry, no response.";

      const newAssistantMessage: Responses = {
        role: "assistant",
        content: assistantMessage,
        // timestamp: new Date(),
      };

      setResponses((prev) => [...prev, newAssistantMessage]);
      onResponseRecieved(assistantMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseError("Failed to send message");

      const errorAssistantMessage: Responses = {
        role: "assistant" as const,
        content:
          "Sorry, I'm having trouble connecting right now. Please try again later.",
        // timestamp: new Date(),
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
