"use client";

import { useState } from "react";
import Head from "next/head";
import NewsSummaries from "@/components/NewsSummaries";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [fullText, setFullText] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audio, setAudio] = useState(null);
  const [audioPlayed, setAudioPlayed] = useState(false);

const handleListen = async (target) => {
  const targetUrl = typeof target === "string" ? target : url;
  if (!targetUrl) return alert("Please enter a URL.");
  setLoading(true);
  setAudioUrl(null);
  setSummary(null);
  try {
    const response = await fetch(`/api/extractText?url=${encodeURIComponent(targetUrl)}`);
    const data = await response.json();
    if (data.audioUrl) {
      const audio = new Audio(data.audioUrl);
      audio.play();
      setAudio(audio);
      setAudioUrl(data.audioUrl);
      setSummary(data.summary || "No summary available.");

    } else {
      alert("Failed to extract audio.");
    }
  } catch (error) {
    console.error("Error fetching page:", error);
    alert("Error fetching or processing the page.");
  } finally {
    setLoading(false);
  }
};



  const handleReplay = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setAudioPlayed(false);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = "talkingpages-audio.mp3";
      a.click();
    } else {
      alert("No audio available to download.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Head>
        <meta charSet="utf-8" />
        <title>Listen to the audio recording of any webpage | TalkingPages</title>
        <meta
          name="description"
          content="TalkingPages enables you to listen to the audio recording of any webpage by simply entering the address."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-10">
        <h2 className="text-3xl font-semibold mb-2">Welcome to TalkingPages</h2>
        <p className="mb-6 max-w-xl text-lg">
          We make web pages come alive with the power of AI. Listen to the audio of any web page.
        </p>

        <div className="w-full max-w-xl bg-gray-50 p-6 rounded-xl shadow-md">
          <input
            type="url"
            placeholder="Enter webpage URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleListen}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "🎧 Listen to Webpage"}
            </button>

            <button
              onClick={handleDownload}
              className="border border-gray-400 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
              disabled={!audioUrl}
            >
              ⬇️ Download Audio
            </button>
          </div>

          {audioPlayed && (
            <button
              onClick={handleReplay}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              🔁 Replay Audio
            </button>
          )}
        </div>


        {summary && (
          <div className="mt-8 max-w-2xl text-left bg-gray-100 p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">📝 Webpage Summary</h3>
              <button
                onClick={() => setShowFull(!showFull)}
                className="text-blue-600 underline text-sm"
              >
                {showFull ? "Show Summary" : "Show Full Text"}
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-line">
              {showFull ? fullText || summary : summary}
            </p>
          </div>
        )}

        {/* News Summaries Section */}
        <div className="mt-12 w-full max-w-5xl px-4">
          <h3 className="text-2xl font-bold mb-6 text-center">📰 Listen to News Summaries from top sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Forbes", url: "https://forbes.com" },
              { name: "CNN", url: "https://edition.cnn.com/" },
              { name: "MSNBC", url: "https://www.msnbc.com/" },
            ].map((news) => (
              <div
                key={news.name}
                className="bg-gray-50 border p-4 rounded-lg shadow text-center flex flex-col justify-between"
              >
                <h4 className="text-lg font-semibold mb-2">{news.name}</h4>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    onClick={() => handleListen(news.url)}
                  >
                    🎧 Listen
                  </button>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    🔗 Visit Site
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
