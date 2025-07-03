"use client";

import Navbar from "../components/Navbar";

export default function CloudStorageInfoPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-12">
      <Navbar />
      <main className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Cloud Storage for Your Audio Files
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Secure storage for all your generated audio content
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-10">
          <div className="flex items-start mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-lg text-gray-300">
                With <strong className="text-blue-400">TalkingPages Premium</strong> and <strong className="text-blue-400">Enterprise</strong> plans, you gain access to
                secure and reliable <strong className="text-blue-400">cloud storage</strong> for all your generated audio files. Whether you're
                producing content for <em>YouTube, TikTok, Instagram, podcasts</em> or <em>client projects</em>, your
                audio library is always at your fingertips—accessible anytime, anywhere.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Why Store in the Cloud?
              </h2>
              <ul className="space-y-4 text-gray-300 pl-9">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  Secure, encrypted storage on a fast CDN-backed network
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m4.242-12.02a9 9 0 012.728 2.728"></path>
                  </svg>
                  Play your audio files directly without redownloading
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  One-click download for use across platforms
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Access your audio history anytime—even months later
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Who Can Access It?
              </h2>
              <p className="text-gray-300 pl-9">
                This feature is <strong className="text-blue-400">exclusively available</strong> to users on the <strong className="text-blue-400">PREMIUM</strong> and{" "}
                <strong className="text-blue-400">ENTERPRISE</strong> plans. If you're currently on a Free or Pro tier, consider upgrading to unlock
                full access to your audio archive and streamline your creative workflow.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-700 rounded-xl p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <div>
              <p className="text-blue-100">
                <strong>New to TalkingPages?</strong> Start with a FREE account and receive <strong>5,000 credits</strong> to test our
                text-to-speech tools and upgrade anytime.
              </p>
              <a 
                href="/signup" 
                className="mt-3 inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
              >
                Create Free Account
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}