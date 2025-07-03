// pages/about.js
"use client";

import Navbar from "../components/Navbar";
import Head from "next/head";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>About Us | TalkingPages AI</title>
        <meta
          name="description"
          content="Learn more about TalkingPages – a privacy-first AI platform for creators. Explore voice cloning, text-to-speech, and cloud storage tools."
        />
      </Head>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Welcome to TalkingPages
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Privacy-first AI tools for content creators
          </p>
        </div>

        <div className="space-y-10">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="flex items-start">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Our Mission</h2>
                <p className="text-gray-300">
                  TalkingPages is a <strong>privacy-first AI platform</strong> designed to empower content creators of all kinds. Whether you're producing engaging YouTube videos, snappy TikTok content, informative podcasts, or high-impact presentations, we provide the tools you need to bring your voice ideas to life — securely and efficiently.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="flex items-start mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Voice Technology</h2>
                </div>
              </div>
              <p className="text-gray-300">
                Our platform features a powerful <strong>Text-to-Speech engine</strong> with access to over 4+ high-quality voices, letting you create expressive audio from written text. You can even <strong>clone your own voice</strong> with our advanced cloning tool, available to <span className="font-semibold text-purple-400">PREMIUM</span> and <span className="font-semibold text-purple-400">ENTERPRISE</span> users.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="flex items-start mb-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Cloud Storage</h2>
                </div>
              </div>
              <p className="text-gray-300">
                We offer secure <strong>cloud storage</strong> for your generated audio files. This lets you organize, stream, or download your projects at any time — perfect for consistent content creation across platforms like Instagram, YouTube, and more.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="flex items-start">
              <div className="bg-gradient-to-r from-red-500 to-red-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Privacy Commitment</h2>
                <p className="text-gray-300">
                  TalkingPages was built on a core principle: <strong>no tracking, no profiling, no surveillance</strong>. Your content is yours alone. We do not monitor, log, or analyze your text or audio operations. Unlike other platforms, we believe creativity should be free and private.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="flex items-start">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3">Future Vision</h2>
                <p className="text-gray-300">
                  We're continuously evolving to deliver more tools and features tailored to your workflow — with simplicity, speed, and respect for your privacy at the heart of everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Start for Free - Get 5000 Credits
          </a>
          <p className="mt-4 text-gray-400 text-sm">
            No credit card required · Privacy protected · Cancel anytime
          </p>
        </div>
      </main>
    </div>
  );
}