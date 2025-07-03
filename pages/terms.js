"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <main className="flex-grow px-4 py-12 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
          <div className="mb-8">
            <p className="mb-6 text-gray-300 text-lg">
              Welcome to <strong className="text-purple-400">TalkingPages</strong>. By accessing or using our website, services, or tools, you agree to be bound by the following terms and conditions. Please read them carefully.
            </p>

            <div className="space-y-10">
              <div className="border-b border-gray-700 pb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  Use of Service
                </h2>
                <p className="text-gray-300">
                  TalkingPages provides AI-powered tools for voice cloning, text-to-speech, and cloud audio storage. You may use these services for both personal and commercial purposes, provided you do not violate any applicable laws or the rights of others.
                </p>
              </div>

              <div className="border-b border-gray-700 pb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  Acceptable AI Usage
                </h2>
                <p className="text-gray-300">
                  You agree not to use our services to generate or disseminate content that is harmful, abusive, deceptive, or unlawful. You must not use TalkingPages to impersonate individuals, misrepresent your identity, or engage in unethical AI-generated activity.
                </p>
              </div>

              <div className="border-b border-gray-700 pb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  Voice Cloning
                </h2>
                <p className="text-gray-300">
                  By submitting voice samples for cloning, you confirm that you have the full legal right and permission to use and reproduce that voice. Unauthorized cloning of voices without consent is strictly prohibited and may result in account suspension or legal action.
                </p>
              </div>

              <div className="border-b border-gray-700 pb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">4</span>
                  </div>
                  Intellectual Property
                </h2>
                <p className="text-gray-300">
                  All content, trademarks, and brand assets of TalkingPages are owned by us or licensed appropriately. You retain full rights over your own generated content and voices. We do not claim ownership of user-generated text or audio.
                </p>
              </div>

              <div className="border-b border-gray-700 pb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">5</span>
                  </div>
                  Content Accuracy
                </h2>
                <p className="text-gray-300">
                  TalkingPages uses advanced AI models to process, convert, and summarize text. However, we do not guarantee 100% accuracy, naturalness, or appropriateness of the generated content. Users should review outputs before public or commercial use.
                </p>
              </div>

              <div className="border-b border-gray-700 pb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">6</span>
                  </div>
                  Privacy & Data Handling
                </h2>
                <p className="text-gray-300">
                  TalkingPages is privacy-first. We do not track your usage behavior or store the content of your TTS inputs and outputs beyond what is necessary to deliver the service. You can delete your content or account at any time.
                </p>
              </div>

              <div className="border-b border-gray-700 pb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">7</span>
                  </div>
                  Plan Eligibility & Fair Usage
                </h2>
                <p className="text-gray-300">
                  Access to certain features like voice cloning or cloud storage depends on your current subscription plan. Abuse of these features, such as bulk automation, may result in rate limits or account suspension.
                </p>
              </div>

              <div className="border-b border-gray-700 pb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">8</span>
                  </div>
                  Changes to Terms
                </h2>
                <p className="text-gray-300">
                  We may update these terms occasionally to reflect legal, technical, or service changes. Continued use of TalkingPages after such updates constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">9</span>
                  </div>
                  Contact
                </h2>
                <p className="text-gray-300">
                  For questions or support, reach out to us at:
                  <br />
                  <a href="mailto:info@talkingpages.io" className="text-blue-400 hover:text-blue-300 transition flex items-center mt-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    info@talkingpages.io
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}