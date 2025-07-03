// pages/index.js
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { Hub } from "aws-amplify/utils";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { fetchUserProfile } from "../lib/fetchUser";
import SignOutButton from "@/components/SignOutButton";
import { useRouter } from "next/navigation";
import { AwsClient } from "aws4fetch";

export default function Home() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState("echo"); // default
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        const session = await fetchAuthSession();
        const userSub = session?.tokens?.accessToken?.payload?.sub;
        if (userSub) {
          const profile = await fetchUserProfile(userSub);
          setUserData(profile);
        }
      } catch (err) {
        console.log("No user signed in", err);
        setUser(null);
        setUserData(null);
      } finally {
        setAuthLoading(false);
      }
    };

    const savedVoice = localStorage.getItem("selectedVoice") || "echo";
    setSelectedVoice(savedVoice);

    checkUser();

    const unsubscribe = Hub.listen("auth", (data) => {
      if (data.payload?.event === "signedOut" || data.payload?.event === "signedIn") {
        checkUser();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleListen = async () => {
    if (!text) return alert("Please enter some text.");
    if (!userData) return router.push("/signin");
    if (userData.quotaUsed >= userData.quotaLimit)
      return alert("You have used all your available credits. Please upgrade your plan.");

    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await fetch("/api/textToSpeech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          userId: userData.id,
          plan: userData.usagePlan,
          voice: selectedVoice,
        }),
      });

      const data = await response.json();
      if (data.audioUrl && data.charactersUsed) {
        const audio = new Audio(data.audioUrl);
        audio.play();
        setAudio(audio);
        setAudioUrl(data.audioUrl);
        setAudioPlayed(true);

        const session = await fetchAuthSession();
        const credentials = session.credentials;

        if (credentials) {
          const client = new AwsClient({
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            service: "execute-api",
            region: "us-east-1",
          });

          await client.fetch("https://j8kx7hnf1i.execute-api.us-east-1.amazonaws.com/default/updateQuota", {
            method: "POST",
            body: JSON.stringify({ userId: userData.id, used: data.charactersUsed }),
            headers: { "Content-Type": "application/json" },
          });
        }
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

  const handleDownload = async () => {
    if (!audioUrl) return alert("No audio available to download.");

    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "talkingpages-audio.mp3";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl); // clean up
    } catch (err) {
      console.error("Download failed:", err);
      alert("❌ Failed to download audio.");
    }
  };

  const handleSelectVoice = () => router.push("/selectvoice");

  const handleCloneVoice = () => {
    if (!userData) {
      alert("Please sign in to access this feature.");
      return router.push("/signin");
    }

    if (["FREE", "PRO"].includes(userData.usagePlan)) {
      alert("This feature requires a PREMIUM plan or higher. Redirecting to upgrade page...");
      return router.push("/account/billing");
    }

    return router.push("/clonevoice");
  };

  const selectedVoiceNameMap = {
    echo: "Brian",
    onyx: "Adams",
    nova: "Sophia",
    shimmer: "Lily",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Head>
        <title>AI voice generator |text to speech |protection & privacy| TalkingPages</title>
        <meta
          name="description"
          content="TalkingPages is an AI voice generator and text to speech tool for people who value their protection and privacy. You can use any of our high-quality human-like voices or clone a voice yourself with our Premium plan. Create a Free account and get 5000 credits to try out our ai voice generator and text to speech tool."
        />
        <meta name="google-site-verification" content="HAxfYe2846r5ZUCHbGqcvp8SYSBhM8gaAQEirXPgjKk" />
      </Head>

      {/* Simplified Header */}
      <header className="w-full p-4 flex justify-end items-center text-sm bg-gray-800">
        {authLoading ? (
          <span className="text-gray-400">Checking session...</span>
        ) : user ? (
          <div className="flex space-x-4 items-center">
            <a href="/account" className="text-blue-400 font-medium hover:text-blue-300 transition">
              Account
            </a>
            <SignOutButton />
          </div>
        ) : (
          <div className="space-x-4">
            <a href="/signin" className="text-blue-400 font-medium hover:text-blue-300 transition">
              Sign In
            </a>
            <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition">
              Sign Up
            </a>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-10 max-w-4xl mx-auto">
        <div className="mb-10 text-center px-4">
  <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight">
    AI voice generator, text to speech, your privacy guaranteed.
  </h1>
  <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
    TalkingPages is an AI voice generator and text to speech tool for people who value their protection and privacy. You can use any of our high-quality human-like voices or clone a voice yourself with our Premium plan. Create a Free account and get 5000 credits to try out our AI voice generator and text to speech tool.
  </p>
</div>


        <div className="w-full bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
          <textarea
            rows={6}
            placeholder="Enter your text here to convert to speech..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 bg-gray-700 text-white rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button
              onClick={handleListen}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition flex items-center disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m4.242-12.02a9 9 0 012.728 2.728"></path>
                  </svg>
                  Generate MP3 Audio
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center disabled:opacity-50"
              disabled={!audioUrl}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download
            </button>

            <button
              onClick={handleSelectVoice}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
              {selectedVoiceNameMap[selectedVoice] || "Brian"}
            </button>

            <button
              onClick={handleCloneVoice}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:opacity-90 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              Clone Voice
            </button>
          </div>

          {audioPlayed && (
            <button
              onClick={handleReplay}
              className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center mx-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Replay Audio
            </button>
          )}
        </div>

        {userData && (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 w-full max-w-md mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Usage:</span>
              <span className="font-medium">{userData.quotaUsed} / {userData.quotaLimit} credits</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
                style={{ width: `${(userData.quotaUsed / userData.quotaLimit) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-400">Plan:</span>
              <span className="font-medium">{userData.usagePlan}</span>
            </div>
          </div>
        )}

        {!user && (
          <div className="mt-6 text-center text-gray-300 max-w-xl">
            <p className="mb-4">
              <span className="text-blue-400 font-medium">Free Tier:</span> Get 5000 credits to try our AI voice technology
            </p>
            <a 
              href="/signup" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition"
            >
              Create Free Account
            </a>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Natural Voices</h3>
            <p className="text-gray-400">Lifelike AI narrators with human-like intonation and emotion</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Downloads</h3>
            <p className="text-gray-400">Get studio-quality MP3 files in seconds</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-gray-400">Enterprise-grade security for your content</p>
          </div>
        </div>
      </main>
    </div>
  );
}