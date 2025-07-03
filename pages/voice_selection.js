// pages/voice_selection.js
"use client";

import Navbar from "../components/Navbar";
import Head from "next/head";

export default function VoiceSelectionPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>Choose the Perfect Voice | TalkingPages AI</title>
        <meta
          name="description"
          content="Select from a diverse range of high-quality AI voices or clone your own. TalkingPages offers unmatched flexibility and realism in voice selection."
        />
      </Head>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Voice Selection
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Bring your words to life with the perfect voice for your content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
            <div className="flex items-start mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Premium AI Voices</h2>
                <p className="text-gray-300">
                  Choose from a curated selection of 4+ premium-quality voices—each designed to suit various moods, tones, and content types.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-3">
                {['Brian', 'Sophia', 'Adams', 'Lily', 'Echo'].map((voice, index) => (
                  <div key={index} className="px-4 py-2 bg-gray-700 rounded-full text-sm font-medium">
                    {voice}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
            <div className="flex items-start mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Voice Cloning</h2>
                <p className="text-gray-300">
                  <span className="text-purple-400 font-medium">PREMIUM & ENTERPRISE</span> users can clone their own voice. Submit a sample to generate audio in your unique voice with astonishing accuracy.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <a 
                href="/voice_cloning" 
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition"
              >
                Learn about voice cloning
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-10">
          <div className="flex items-start">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Perfect for All Content Types</h2>
              <p className="text-gray-300 mb-6">
                Whether you're narrating a YouTube video, podcasting, or creating reels for TikTok or Instagram, you'll find a voice that fits your content.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['YouTube', 'Podcasts', 'TikTok', 'Instagram'].map((platform, index) => (
                  <div key={index} className="flex items-center justify-center bg-gray-700 p-3 rounded-lg">
                    <span className="text-sm font-medium">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 border border-indigo-700 rounded-xl p-8 text-center">
          <p className="text-xl font-bold text-white mb-4">
            Your voice, your identity, your message—perfectly delivered.
          </p>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            With TalkingPages, you maintain complete control over how your message sounds, ensuring it aligns perfectly with your brand and personal style.
          </p>
        </div>
      </main>
    </div>
  );
}