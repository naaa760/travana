import React, { createContext, useContext } from "react";
import { Responses, useTravanaAgent } from "@/hooks/useTravanaAgent";

interface TravanaAgentContextType {
  creatingThread: boolean;
  threadId: string | null;
  fetchingResponse: boolean;
  responseError: string | null;
  responses: Responses[];
  createThread: () => Promise<void>;
  sendMessage: (userInput: string) => Promise<void>;
}

const TravanaAgentContext = createContext<TravanaAgentContextType | undefined>(
  undefined
);

export const TravanaAgentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const agent = useTravanaAgent();

  return (
    <TravanaAgentContext.Provider value={agent}>
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
