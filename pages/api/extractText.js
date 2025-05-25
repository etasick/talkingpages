import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const htmlResponse = await fetch(url);
    if (!htmlResponse.ok) {
      return res.status(502).json({ error: "Failed to fetch webpage" });
    }

    const html = await htmlResponse.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return res.status(422).json({ error: "No text extracted" });
    }

    const fullText = article.textContent.slice(0, 8000);
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You summarize web pages into engaging spoken audio narrations." },
        { role: "user", content: `Summarize this page for a listener:\n\n${fullText}` }
      ],
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content;

    // Call your Cloudflare Worker
    const workerResponse = await fetch("https://talkingpages-audio-worker-parser.etasick.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary,originalUrl: url }),
    });

    if (!workerResponse.ok) {
      return res.status(500).json({ error: "Worker failed to generate audio" });
    }

    const { audioUrl } = await workerResponse.json();

    return res.status(200).json({ summary, audioUrl });
  } catch (err) {
    console.error("Processing failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
