import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audio = formData.get("audio");

    if (!audio || audio.size < 100) {
      return NextResponse.json(
        { transcript: "", error: "Audio file too small or empty" },
        { status: 400 }
      );
    }

    console.log("Sending audio to Deepgram, size:", audio.size);

    const response = await fetch(
      "https://api.deepgram.com/v1/listen?model=nova-2&language=en&punctuate=true&detect_language=true",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
          "Content-Type": "audio/webm",
        },
        body: audio,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Deepgram API error:", errorText);
      return NextResponse.json(
        { transcript: "", error: "Speech API error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Deepgram response:", JSON.stringify(data.results, null, 2));

    return NextResponse.json({
      transcript: data.results?.channels[0]?.alternatives[0]?.transcript || "",
    });
  } catch (error) {
    console.error("Speech processing error:", error);
    return NextResponse.json(
      { error: error.message, transcript: "" },
      { status: 500 }
    );
  }
}
