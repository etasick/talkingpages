"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { Auth } from 'aws-amplify';

export default function Home() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Check if user is signed in
    const checkUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleListen = async () => {
    if (!text) return alert("Please enter some text.");
    setLoading(true);
    setAudioUrl(null);
    try {
      const response = await fetch("/api/textToSpeech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audio.play();
        setAudio(audio);
        setAudioUrl(data.audioUrl);
        setAudioPlayed(true);
      } else {
        alert("Failed to generate audio.");
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      alert("An error occurred during text-to-speech processing.");
    } finally {
      setLoading(false);
    }
  };

  const handleReplay = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
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
        <title>Convert Text to Speech | TalkingPages</title>
        <meta
          name="description"
          content="TalkingPages is a powerful AI tool that converts any text into high-quality MP3 audio using advanced TTS technology."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://www.butterflyassets.online/talkingpages_logo.png" />
      </Head>

      {/* Account Section */}
      <header className="w-full bg-gray-100 p-4 flex justify-end items-center text-sm">
        {authLoading ? (
          <span>Checking session...</span>
        ) : user ? (
          <a
            href="/account"
            className="text-blue-600 font-medium hover:underline"
          >
            Account Home
          </a>
        ) : (
          <div className="space-x-4">
            <a href="/signin" className="text-blue-600 font-medium hover:underline">
              Sign In
            </a>
            <a href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign Up
            </a>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-10">
        <h2 className="text-3xl font-semibold mb-2">Welcome to TalkingPages</h2>
        <p className="mb-6 max-w-xl text-lg">
          Instantly convert any written text into natural-sounding speech. Ideal for content creators, learners, and productivity.
        </p>

        <div className="w-full max-w-xl bg-gray-50 p-6 rounded-xl shadow-md">
          <textarea
            rows={6}
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleListen}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "🎧 Convert to MP3 Audio"}
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
      </main>
    </div>
  );
}
