import React, { createContext, useContext, useState } from "react";
import useVoiceRecorder from "@/hooks/useVoiceRecorder";

// Define context shape
interface VoiceRecorderContextType {
  isRecording: boolean;
  isProcessing: boolean;
  listening: boolean;
  userSpeaking: boolean;
  transcript: string;
  pauseVAD: () => void;
  startVAD: () => void;
}

// Create context
const VoiceRecorderContext = createContext<
  VoiceRecorderContextType | undefined
>(undefined);

// Provider
export const VoiceRecorderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transcript, setTranscript] = useState("");

  const voiceRecorder = useVoiceRecorder((newTranscript) => {
    console.log("✨ Transcript received:", newTranscript);
    if (newTranscript && newTranscript.trim()) {
      setTranscript(newTranscript);
    }
  });

  return (
    <VoiceRecorderContext.Provider
      value={{
        ...voiceRecorder,
        transcript,
      }}
    >
      {children}
    </VoiceRecorderContext.Provider>
  );
};

// Hook to access
export const useVoiceRecorderContext = () => {
  const context = useContext(VoiceRecorderContext);
  if (!context) {
    throw new Error(
      "useVoiceRecorderContext must be used inside VoiceRecorderProvider"
    );
  }
  return context;
};
