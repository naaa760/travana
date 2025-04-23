"use client";

import { useState, useRef, useEffect } from "react";
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

  // Remove the debounce timers that are causing problems
  // const isSpeakingRef = useRef(false);
  // const speakingTimeoutRef = useRef(null);
  // const silenceTimeoutRef = useRef(null);

  // Check for microphone permissions on mount
  useEffect(() => {
    checkMicrophonePermission();

    return () => {
      // Clean up any active streams
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
    if (onListeningChange) {
      onListeningChange(isRecording);
    }
  }, [isRecording, onListeningChange]);

  const startRecording = async () => {
    if (isProcessing) return;

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // Create media recorder without any speech detection first
      let mimeType = "audio/webm";
      if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        mimeType = "audio/webm;codecs=opus";
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
        audioBitsPerSecond: 128000,
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      // Handle microphone data
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      // VOICE ACTIVITY DETECTION - Using RMS power instead of frequency bins
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Use a counter to reduce sensitivity - only change states after consistent readings
      let voiceDetectedCount = 0;
      let silenceCount = 0;

      const detectVoice = () => {
        if (!streamRef.current) return;

        analyser.getByteTimeDomainData(dataArray); // Get waveform data

        // Calculate RMS power - more accurate for voice detection
        let sumSquares = 0;
        for (let i = 0; i < bufferLength; i++) {
          // Convert from 0-255 to -1 to 1
          const amplitude = (dataArray[i] - 128) / 128;
          sumSquares += amplitude * amplitude;
        }
        const rms = Math.sqrt(sumSquares / bufferLength);

        // Convert to dB for easier thresholding
        const db = 20 * Math.log10(rms);

        // Use a higher threshold to avoid false positives
        // -35 dB might pick up background noise, so let's use -30 dB
        const threshold = -30;

        if (db > threshold) {
          // Voice detected - turn blue IMMEDIATELY
          if (!isRecording) {
            setIsRecording(true);
          }

          // Reset silence counter
          silenceCount = 0;
          voiceDetectedCount++;
        } else {
          // No voice detected
          silenceCount++;
          voiceDetectedCount = 0;

          // Wait for 15 frames of silence (about 250ms) before turning off
          if (silenceCount >= 15 && isRecording) {
            setIsRecording(false);
          }
        }

        // Continue detection loop
        if (streamRef.current) {
          requestAnimationFrame(detectVoice);
        }
      };

      // Start voice detection loop
      detectVoice();

      // Handle recording stop
      mediaRecorder.onstop = async () => {
        setIsProcessing(true);

        // Only process if we have audio data
        if (chunksRef.current.length > 0) {
          const audioBlob = new Blob(chunksRef.current, { type: mimeType });

          // Only send to API if the blob has a reasonable size (not empty)
          if (audioBlob.size > 100) {
            const formData = new FormData();
            formData.append("audio", audioBlob);

            try {
              const response = await fetch("/api/speech", {
                method: "POST",
                body: formData,
              });

              const data = await response.json();

              if (data.transcript && data.transcript.trim()) {
                onTranscriptReceived(data.transcript);
              }
            } catch (error) {
              console.error("Error processing speech:", error);
            }
          }
        }

        // Clean up the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        // Reset state
        setIsRecording(false);
        setIsProcessing(false);

        // Auto restart listening after a short delay
        timeoutRef.current = setTimeout(() => {
          startRecording();
        }, 1000);
      };

      // Start recording
      mediaRecorder.start();

      // Record for 8 seconds max
      setTimeout(() => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === "recording"
        ) {
          mediaRecorderRef.current.stop();
        }
      }, 8000);
    } catch (error) {
      console.error("Error starting recording:", error);

      // Try again after a delay
      timeoutRef.current = setTimeout(startRecording, 3000);
    }
  };

  return (
    <div className={styles.voiceStatus}>
      {!permissionGranted && (
        <div className={styles.permissionWarning}>
          Microphone access required for voice features
        </div>
      )}
    </div>
  );
}
