import React, { createContext, useContext } from "react";
import { Responses, useTravanaAgent } from "@/hooks/useTravanaAgent";
import { useTravanaProcessor } from "@/hooks/useTravanaProcessor";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface TravanaAgentContextType {
  creatingThread: boolean;
  threadId: string | null;
  fetchingResponse: boolean;
  responseError: string | null;
  responses: Responses[];
  createThread: () => Promise<void>;
  sendMessage: (userInput: string) => Promise<void>;

  isSpeaking: boolean;
}

const TravanaAgentContext = createContext<TravanaAgentContextType | undefined>(
  undefined
);

export const TravanaAgentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { flightInfo, processAssistantMessage } = useTravanaProcessor();
  const { speakNative, isSpeaking } = useTextToSpeech(() => {});
  const agent = useTravanaAgent((response) => {
    speakNative(response);
    processAssistantMessage(response);
  });

  return (
    <TravanaAgentContext.Provider value={{ ...agent, isSpeaking }}>
      {children}
    </TravanaAgentContext.Provider>
  );
};

export const useTravanaAgentContext = () => {
  const context = useContext(TravanaAgentContext);
  if (!context) {
    throw new Error(
      "useTravanaAgentContext must be used within TravanaAgentProvider"
    );
  }
  return context;
};
