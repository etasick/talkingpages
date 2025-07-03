// pages/api/textToSpeech.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, userId, voice = "echo", plan = "FREE" } = req.body;

  if (!text || typeof text !== "string" || !userId) {
    return res.status(400).json({ error: "Missing or invalid input" });
  }

  try {
    const ttsResponse = await fetch("https://talkingpages-audio-worker-parser.etasick.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
                     "x-api-key": process.env.NEXT_PUBLIC_WORKER_API_KEY,
          },
      body: JSON.stringify({ text, userId, voice, plan }),
    });

    if (!ttsResponse.ok) {
      const errorText = await ttsResponse.text();
      console.error("Worker error:", errorText);
      return res.status(500).json({ error: "Failed to generate audio" });
    }

    const { audioUrl, charactersUsed } = await ttsResponse.json();

    return res.status(200).json({ audioUrl, charactersUsed });
  } catch (err) {
    console.error("TTS processing failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
