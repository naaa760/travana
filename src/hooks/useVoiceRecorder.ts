import { useEffect, useRef, useState } from "react";
import { useMicVAD, type ReactRealTimeVADOptions } from "@ricky0123/vad-react";

export default function useVoiceRecorder(
  onTranscriptReceived: (text: string) => void
) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { listening, errored, loading, userSpeaking, start, pause } = useMicVAD(
    {
      onSpeechStart: () => {
        console.log("🛫 Speech started");
        // startRecording();
      },
      onSpeechEnd: (audioFloat32) => {
        console.log("🛬 Speech ended");
        const blob = float32ToWavBlob(audioFloat32, 16000);
        handleRecordingStop(blob);
        // stopRecording();
      },
      startOnLoad: true,
      //   userSpeakingThreshold: 0.7, // optional tuning
      //   minSpeechFrames: 5,
      //   preSpeechPadFrames: 10,
      model: "v5",
      //   workletOptions: {
      //     numberOfInputs: 1,
      //     numberOfOutputs: 1,
      //     outputChannelCount: [1],
      //   },
      //   baseAssetPath: "/",
      //   onnxWASMBasePath: "/",
    } satisfies Partial<ReactRealTimeVADOptions>
  );

  useEffect(() => {
    if (isProcessing) pause();
    else start();
  }, [isProcessing]);

  const startRecording = async () => {
    if (isRecording) return; // Avoid double-starts
    try {
      if (!streamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        streamRef.current = stream;
      }

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType,
        audioBitsPerSecond: 128_000,
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      //   mediaRecorder.onstop = handleRecordingStop;

      mediaRecorder.start();
      setIsRecording(true);

      timeoutRef.current = setTimeout(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          console.log("🛑 Timeout reached. Stopping recording...");
          stopRecording();
        }
      }, 8000); // Safety timeout
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleRecordingStop = async (blob: Blob) => {
    setIsProcessing(true);

    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current);
    //   timeoutRef.current = null;
    // }

    // if (chunksRef.current.length > 0) {
    //   const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    //   console.log("🎤 Audio Blob size:", blob.size);

    if (blob.size > 500) {
      const formData = new FormData();
      formData.append("audio", blob);

      try {
        const response = await fetch("/api/speech", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        if (data?.transcript?.trim()) {
          onTranscriptReceived(data.transcript);
        } else {
          console.warn("⚠️ Empty transcript received");
        }
      } catch (error) {
        console.error("Error sending audio:", error);
      }
    } else {
      console.warn("⚠️ Ignored tiny audio blob");
    }
    // }

    cleanupRecording();
  };

  const cleanupRecording = () => {
    setIsRecording(false);
    setIsProcessing(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }

    chunksRef.current = [];
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    isRecording,
    isProcessing,
    listening,
    userSpeaking,
    startVAD: start,
    pauseVAD: pause,
    errored,
    loading,
  };
}

function float32ToWavBlob(
  float32Array: Float32Array,
  sampleRate = 16000
): Blob {
  const numSamples = float32Array.length;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // Write WAV header
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample
  writeString(36, "data");
  view.setUint32(40, numSamples * 2, true);

  // Write PCM samples
  for (let i = 0; i < numSamples; i++) {
    const sample = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(
      44 + i * 2,
      sample < 0 ? sample * 0x8000 : sample * 0x7fff,
      true
    );
  }

  return new Blob([view], { type: "audio/wav" });
}
  