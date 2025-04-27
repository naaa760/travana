import { useState, useCallback } from "react";

type FlightInfo = {
  from?: string;
  to?: string;
  date?: string;
};

export const useTravanaProcessor = () => {
  const [flightInfo, setFlightInfo] = useState<FlightInfo>({});

  const processAssistantMessage = useCallback((assistantMessage: string) => {
    if (
      assistantMessage.includes("flight") ||
      assistantMessage.includes("travel")
    ) {
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

      const dateMatch = assistantMessage.match(
        /(\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+\d{4})/
      );
      if (dateMatch) {
        setFlightInfo((prev) => ({ ...prev, date: dateMatch[0] }));
      }
    }
  }, []);

  return {
    flightInfo,
    processAssistantMessage,
  };
};
