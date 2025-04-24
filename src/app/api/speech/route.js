import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Convert the file to an array buffer
    const buffer = await audioFile.arrayBuffer();

    // Create form data for Deepgram API
    const audioBlob = new Blob([buffer], { type: audioFile.type });

    // Send the audio to Deepgram API
    const response = await fetch("https://api.deepgram.com/v1/listen", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": audioFile.type,
      },
      body: buffer,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Transcription API error:", error);
      return NextResponse.json(
        { error: "Failed to transcribe audio" },
        { status: response.status }
      );
    }

    const result = await response.json();
    const transcript =
      result.results?.channels[0]?.alternatives[0]?.transcript || "";

    return NextResponse.json({ transcript });
  } catch (error) {
    console.error("Error processing speech:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
