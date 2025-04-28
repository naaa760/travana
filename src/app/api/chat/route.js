import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are TRAVANA, an AI travel assistant that helps users book flights and hotels. Keep all responses EXTREMELY brief, under 1-2 sentences, and focused on answering the user's question directly. Never use more than 10-15 words. Be concise but friendly. Do not add any extra information beyond what was asked.",
            },
            ...messages.slice(-10),
          ],
          temperature: 0.7,
          max_tokens: 60,
        }),
      }
    );

    const data = await response.json();
    const assistantMessage =
      data?.choices?.[0]?.message?.content ?? "No response.";
    return NextResponse.json(assistantMessage);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
