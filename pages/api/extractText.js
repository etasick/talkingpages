import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { OpenAI } from "openai";

// Use Edge-compatible imports
export const config = {
  runtime: "edge",
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "Missing URL" }), { status: 400 });
  }

  try {
    const htmlResponse = await fetch(url);
    if (!htmlResponse.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch webpage" }), { status: 502 });
    }

    const html = await htmlResponse.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return new Response(JSON.stringify({ error: "No text extracted" }), { status: 422 });
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

    const speech = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: "onyx",
      input: summary,
    });

    const arrayBuffer = await speech.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const filename = `talkingpages-${Date.now()}.mp3`;

    // Upload to R2
    await env.AUDIO_BUCKET.put(filename, buffer, {
      httpMetadata: { contentType: "audio/mpeg" },
    });

    // Save metadata to D1 (if binding set as env.DB)
    const insertSQL = `
      INSERT INTO audios (filename, summary, created_at)
      VALUES (?, ?, datetime('now'))
    `;
    await env.DB.prepare(insertSQL).bind(filename, summary).run();

    const r2Url = `https://talkingpages-audio-worker.etasick.workers.dev/${filename}`;


    return new Response(JSON.stringify({ summary, audioUrl: r2Url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error generating audio:", err);
    return new Response(JSON.stringify({ error: "Processing failed" }), { status: 500 });
  }
}
