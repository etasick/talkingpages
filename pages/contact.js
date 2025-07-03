'use client';

import Navbar from '../components/Navbar';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Contact Support
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Get in touch with our team for enterprise solutions and premium support
          </p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Enterprise Solutions</h2>
            <p className="text-gray-300">
              For <strong className="text-purple-400">Enterprise upgrades</strong>, large-scale API usage,
              white-label access, or voice cloning:
            </p>
          </div>

          <div className="bg-gray-700/50 border border-gray-600 p-5 rounded-lg mb-6">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span className="text-gray-300">Email us directly at:</span>
            </div>
            <a
              href="mailto:info@talkingpages.io?subject=Enterprise%20Upgrade%20Request"
              className="text-xl font-medium text-blue-400 hover:text-blue-300 transition flex items-center"
            >
              info@talkingpages.io
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>

          <div className="flex items-start text-sm text-gray-400">
            <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p>
              Please include your registered email or User ID when reaching out so we can assist you faster.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/account" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Account
          </a>
        </div>
      </main>
    </div>
  );
}