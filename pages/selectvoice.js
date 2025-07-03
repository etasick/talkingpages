"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchUserProfile } from "../lib/fetchUser";

const voices = [
  {
    name: "Adams",
    description: "Deep, commanding male voice. Perfect for authority, depth, and gravitas. Ideal for motivational narration or audiobook intros.",
    openai: "onyx",
    preview: "https://www.butterflyassets.online/voicepreviews/adams.mp3",
    color: "from-blue-700 to-blue-900",
  },
  {
    name: "Brian",
    description: "Clear, expressive male narrator. Excellent for chatty podcasts, product explainers, or general-purpose clarity.",
    openai: "echo",
    preview: "https://www.butterflyassets.online/voicepreviews/brian.mp3",
    color: "from-green-700 to-green-900",
  },
  {
    name: "Sophia",
    description: "Warm, articulate female voice. Ideal for immersive storytelling, meditations, or learning content.",
    openai: "nova",
    preview: "https://www.butterflyassets.online/voicepreviews/sophia.mp3",
    color: "from-purple-700 to-purple-900",
  },
  {
    name: "Lily",
    description: "Youthful, bright female tone. Best for kids' content, tutorials, or enthusiastic educational material.",
    openai: "shimmer",
    preview: "https://www.butterflyassets.online/voicepreviews/Lily.mp3",
    color: "from-pink-700 to-pink-900",
  },
];

export default function SelectVoice() {
  const [selectedVoice, setSelectedVoice] = useState("echo");
  const [userData, setUserData] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [upgradeMessage, setUpgradeMessage] = useState("");
  const [playingPreview, setPlayingPreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("selectedVoice") || "echo";
    setSelectedVoice(saved);

    const checkUser = async () => {
      try {
        const session = await fetchAuthSession();
        const sub = session?.tokens?.accessToken?.payload?.sub;
        if (sub) {
          const profile = await fetchUserProfile(sub);
          setUserData(profile);
        }
      } catch (err) {
        console.warn("No user signed in");
      } finally {
        setAuthLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleSelect = (voiceId) => {
    if (voiceId !== "echo") {
      if (!userData || ["FREE"].includes(userData?.usagePlan)) {
        let msg = "🚫 You need a PRO, PREMIUM, or ENTERPRISE account to select this voice.";
        if (!userData) {
          msg += " Start by creating a FREE account to get 5000 free credits.";
        } else {
          msg += " Upgrade now to access premium voices.";
        }
        setUpgradeMessage(msg);
        return;
      }
    }

    setSelectedVoice(voiceId);
    localStorage.setItem("selectedVoice", voiceId);
    router.push("/");
  };

  const handlePreview = (url, voiceName) => {
    // Stop any currently playing preview
    if (playingPreview) {
      playingPreview.pause();
    }
    
    const audio = new Audio(url);
    setPlayingPreview(audio);
    audio.play();
    
    audio.onended = () => setPlayingPreview(null);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Head>
        <title>Select a Voice | TalkingPages</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Voice
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Select the perfect voice for your content. Preview each option to find your match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {voices.map((voice) => {
            const isSelected = selectedVoice === voice.openai;
            const isFreeVoice = voice.openai === "echo";
            const requiresUpgrade = !isFreeVoice && (!userData || ["FREE"].includes(userData?.usagePlan));
            
            return (
              <div
                key={voice.name}
                className={`p-6 rounded-2xl border-2 ${
                  isSelected 
                    ? "border-blue-500 bg-gradient-to-br from-gray-900 to-gray-950" 
                    : "border-gray-800 bg-gray-900 hover:border-gray-600"
                } transition-all duration-300 relative overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${voice.color}`}></div>
                
                <div className="flex items-start mb-4">
                  <div className="bg-gray-800 rounded-lg p-2 mr-4">
                    <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold flex items-center">
                      {voice.name}
                      {!isFreeVoice && (
                        <span className="ml-2 text-xs bg-gradient-to-r from-yellow-700 to-orange-700 text-yellow-200 px-2 py-0.5 rounded-full">
                          PREMIUM
                        </span>
                      )}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">{voice.description}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handlePreview(voice.preview, voice.name)}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                      playingPreview?.src === voice.preview
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {playingPreview?.src === voice.preview ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Playing...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Preview
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleSelect(voice.openai)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                      isSelected 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : requiresUpgrade
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    disabled={requiresUpgrade}
                  >
                    {isSelected ? (
                      <span className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Selected
                      </span>
                    ) : requiresUpgrade ? (
                      <span className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Upgrade Required
                      </span>
                    ) : (
                      "Select Voice"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {upgradeMessage && (
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-800">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-300">{upgradeMessage}</p>
            </div>
            
            <div className="mt-4 flex justify-center">
              {!userData ? (
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Create Free Account
                </a>
              ) : (
                <a
                  href="/account/billing"
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Upgrade Your Plan
                </a>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}