import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing or invalid text" });
  }

  try {
    const ttsResponse = await fetch("https://talkingpages-audio-worker-parser.etasick.workers.dev/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!ttsResponse.ok) {
      return res.status(500).json({ error: "Failed to generate audio" });
    }

    const { audioUrl } = await ttsResponse.json();

    return res.status(200).json({ audioUrl });
  } catch (err) {
    console.error("TTS processing failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
