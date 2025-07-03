// pages/voice_cloning.js
"use client";

import Navbar from "../components/Navbar";

export default function VoiceCloningInfoPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-12">
      <Navbar />
      <main className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Voice Cloning Technology
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your voice into a digital instrument for all your content needs
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-10">
          <div className="flex items-start mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div>
              <p className="text-lg text-gray-300">
                <strong className="text-purple-400">Imagine this:</strong> your own unique voice—or any voice you love—instantly transformed into a digital instrument for all your text-to-speech needs. With <strong className="text-purple-400">TalkingPages' Voice Cloning</strong> service, you can create a hyper-realistic voice model that speaks exactly the way you do.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
                What Is Voice Cloning?
              </h2>
              <p className="text-gray-300 pl-9">
                Voice cloning uses cutting-edge AI to replicate vocal patterns, tone, and style from a short sample recording. Once your voice is cloned, it becomes available for all future text-to-speech conversions—perfect for content creators, educators, narrators, and entrepreneurs.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                </svg>
                How Does It Work?
              </h2>
              <ul className="space-y-3 text-gray-300 pl-9">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                  Record and submit a short high-quality audio sample (we'll guide you)
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                  Our AI processes and learns your vocal identity
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                  </svg>
                  Your cloned voice is added to your account for TTS usage
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Who Can Clone a Voice?
              </h2>
              <p className="text-gray-300 pl-9">
                This feature is exclusive to <strong className="text-purple-400">PREMIUM</strong> and <strong className="text-purple-400">ENTERPRISE</strong> plan holders. 
                You can clone your own voice or submit one with permission. Once cloned, you can use it just like any of our default voices—only it's uniquely yours.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 border border-indigo-700 rounded-xl p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-blue-100">
              <strong>Join TalkingPages today, upgrade your plan,</strong> and unlock the power of personalized voice cloning for your content creation needs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}