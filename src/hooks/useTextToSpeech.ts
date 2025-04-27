import { useState } from "react";

export function useTextToSpeech(resetToOriginalState: () => void) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Native browser TTS
  const speakNative = async (text: string) => {
    try {
      setIsSpeaking(true);

      if (!text || text.trim() === "") {
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => console.log("Speaking started");
      utterance.onend = () => {
        setIsSpeaking(false);
        resetToOriginalState();
      };
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        setIsSpeaking(false);
        resetToOriginalState();
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech synthesis error:", error);
      setIsSpeaking(false);
      resetToOriginalState();
    }
  };

  // ElevenLabs TTS (via API)
  const speakElevenLabs = async (text: string) => {
    try {
      setIsSpeaking(true);

      if (!text || text.trim() === "") {
        setIsSpeaking(false);
        return;
      }

      let audioElement = document.getElementById(
        "tts-audio"
      ) as HTMLAudioElement;
      if (!audioElement) {
        audioElement = document.createElement("audio");
        audioElement.id = "tts-audio";
        document.body.appendChild(audioElement);
      }

      audioElement.pause();
      audioElement.currentTime = 0;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

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

        const audioBlob = base64ToBlob(data.audio, "audio/mpeg");
        const audioUrl = URL.createObjectURL(audioBlob);

        audioElement.src = audioUrl;

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

  return {
    isSpeaking,
    speakNative,
    speakElevenLabs,
  };
}

// Helper function to convert base64 to Blob
function base64ToBlob(base64: string, mimeType: string) {
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
}
