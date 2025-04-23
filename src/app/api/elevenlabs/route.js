import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Default voice: Rachel (female voice)
    const voiceId = "21m00Tcm4TlvDq8ikWAM";

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", errorText);
      return NextResponse.json(
        { error: "Speech synthesis failed" },
        { status: response.status }
      );
    }

    // Return audio as array buffer
    const audioArrayBuffer = await response.arrayBuffer();

    // Convert to Base64 to send over JSON
    const base64Audio = Buffer.from(audioArrayBuffer).toString("base64");

    return new NextResponse(JSON.stringify({ audio: base64Audio }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("ElevenLabs processing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
