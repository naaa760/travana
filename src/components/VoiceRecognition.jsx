"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./VoiceRecognition.module.css";

export default function VoiceRecognition({
  onTranscriptReceived,
  onListeningChange,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timeoutRef = useRef(null);
  const streamRef = useRef(null);
  const recognition = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [keepListening, setKeepListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   checkMicrophonePermission();

  //   return () => {
  //     if (streamRef.current) {
  //       streamRef.current.getTracks().forEach((track) => track.stop());
  //     }

  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  // Check if microphone permission is granted
  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermissionGranted(true);

      // Stop the test stream tracks
      stream.getTracks().forEach((track) => track.stop());

      // Start recording if permission is granted
      startRecording();
    } catch (error) {
      console.error("Microphone permission error:", error);
      setPermissionGranted(false);
    }
  };

  // Function to notify listening state change
  useEffect(() => {
    console.log("isRecording: ", isRecording);
    if (onListeningChange) {
      onListeningChange(isRecording);
    }
  }, [isRecording, onListeningChange]);

  // Optimize the speech recognition initialization
  useEffect(() => {
    if (!recognition.current && typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        recognition.current.lang = "en-US";

        // Make these handlers more responsive
        recognition.current.onstart = () => {
          setIsListening(true);
          setErrorMessage("");
        };

        recognition.current.onaudiostart = () => {
          // Immediately show visual feedback when audio is detected
          setIsListening(true);
        };

        recognition.current.onspeechstart = () => {
          // Ensure circle appears as soon as speech starts
          setIsListening(true);
        };

        recognition.current.onresult = (event) => {
          // Process results immediately
          const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");

          setTranscript(transcript);

          // IMPORTANT: Send the transcript to your handler
          if (transcript.trim() && onTranscriptReceived) {
            onTranscriptReceived(transcript);
          }

          // Update UI immediately when speech is detected
          setIsListening(true);
        };

        recognition.current.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setErrorMessage(`Error: ${event.error}`);
          setIsListening(false);
        };

        recognition.current.onend = () => {
          // Only set to false if we're actually stopping listening
          if (!keepListening) {
            setIsListening(false);
          } else {
            // Restart immediately to prevent delays
            try {
              recognition.current.start();
            } catch (err) {
              console.error("Could not restart recognition", err);
            }
          }
        };
      } else {
        setErrorMessage("Speech recognition not supported in this browser.");
      }
    }
  }, [keepListening]);

  // Improve toggle function for faster response
  const toggleListening = useCallback(() => {
    if (recognition.current) {
      if (isListening) {
        recognition.current.stop();
        setKeepListening(false);
      } else {
        // Add a visual feedback immediately
        setIsListening(true);

        // Start recognition with minimal delay
        setTimeout(() => {
          try {
            recognition.current.start();
            setKeepListening(true);
            setErrorMessage("");
          } catch (error) {
            console.error("Error starting recognition:", error);
            setIsListening(false);
            setErrorMessage(`Failed to start listening: ${error.message}`);
          }
        }, 10);
      }
    }
  }, [isListening]);

  const startRecording = () => {
    console.log("Starting recording...");

    if (!streamRef.current) {
      console.error("No stream available for recording");
      return;
    }

    let mimeType = "audio/webm";
    if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
      mimeType = "audio/webm;codecs=opus";
    }

    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: mimeType,
      audioBitsPerSecond: 128000,
    });

    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      console.log("Recording stopped, processing audio...");
      setIsProcessing(true);

      if (chunksRef.current.length > 0) {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        console.log("Audio blob size:", audioBlob.size);

        if (audioBlob.size > 100) {
          const formData = new FormData();
          formData.append("audio", audioBlob);

          try {
            const response = await fetch("/api/speech", {
              method: "POST",
              body: formData,
            });

            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const data = await response.json();
            console.log("Transcript:", data);
            if (data.transcript?.trim()) {
              onTranscriptReceived(data.transcript);
            }
          } catch (err) {
            console.error("Speech API error:", err);
          }
        } else {
          console.warn("Audio too small to process");
        }
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      setIsRecording(false);
      setIsProcessing(false);

      // Restart voice detection
      timeoutRef.current = setTimeout(startMicrophoneAndDetectVoice, 1000);
    };

    mediaRecorder.start();
    setIsRecording(true);

    // Limit recording to max 8 seconds
    setTimeout(() => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    }, 8000);
  };

  const startMicrophoneAndDetectVoice = async () => {
    console.log("Listening for voice to start recording...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let voiceDetectedCount = 0;
      let silenceCount = 0;
      let recordingStarted = false;

      const detectVoice = () => {
        if (!streamRef.current) return;

        analyser.getByteTimeDomainData(dataArray);

        let sumSquares = 0;
        for (let i = 0; i < bufferLength; i++) {
          const amplitude = (dataArray[i] - 128) / 128;
          sumSquares += amplitude * amplitude;
        }
        const rms = Math.sqrt(sumSquares / bufferLength);
        const db = 20 * Math.log10(rms);

        const threshold = -30; // Adjust if needed

        if (db > threshold) {
          voiceDetectedCount++;
          silenceCount = 0;

          if (voiceDetectedCount > 2 && !recordingStarted) {
            console.log("Voice detected, starting recording...");
            recordingStarted = true;
            startRecording();
          }
        } else {
          silenceCount++;
          voiceDetectedCount = 0;

          // Optional: if long silence detected without starting, reset
          if (silenceCount > 100 && !recordingStarted) {
            console.log("No voice detected for a while, still waiting...");
            silenceCount = 0;
          }
        }

        if (streamRef.current && !recordingStarted) {
          requestAnimationFrame(detectVoice);
        }
      };

      detectVoice();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      timeoutRef.current = setTimeout(startMicrophoneAndDetectVoice, 3000);
    }
  };

  useEffect(() => {
    startMicrophoneAndDetectVoice();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  function processAudioResult(result) {
    console.log("Processing audio result:", result);
    // ... existing code ...
  }

  return (
    <div className={styles.voiceRecognitionContainer}>
      <button
        onClick={toggleListening}
        className={`${styles.voiceButton} ${
          isListening ? styles.listening : ""
        }`}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        <div className={styles.buttonContent}>
          <div
            className={`${styles.micIcon} ${isListening ? styles.pulsing : ""}`}
            style={{ transition: "all 0.1s ease-in-out" }} // Faster transition
          >
            {isListening ? "🎙️" : "🎙️"}
          </div>
          <div className={styles.statusText}>
            {isListening ? "Listening..." : "Listen"}
          </div>
        </div>
      </button>

      {/* Improve the visual indicator responsiveness */}
      {isListening && (
        <div
          className={styles.listeningIndicator}
          style={{
            backgroundColor: "blue",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            position: "absolute",
            top: "-10px",
            right: "-10px",
            animation: "pulse 1s infinite",
          }}
        />
      )}

      {!permissionGranted && (
        <div className={styles.permissionWarning}>
          Microphone access required for voice features
        </div>
      )}
    </div>
  );
}
