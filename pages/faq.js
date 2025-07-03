"use client";

import Navbar from "../components/Navbar";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about TalkingPages
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              question: "What is TalkingPages?",
              answer: "TalkingPages is a privacy-first AI-powered platform that lets you convert text to speech, clone voices, and store audio files securely in the cloud. We are designed for content creators, educators, developers, and professionals looking for high-quality, ethical AI voice tools."
            },
            {
              question: "Is TalkingPages really private?",
              answer: "Yes. We do not track your behavior or store your input/output text. Your audio files belong to you, and you have full control. We're building this platform with a privacy-first mindset from day one."
            },
            {
              question: "How do I get started?",
              answer: "Simply create a free account to get 5,000 free characters and test the full TTS experience. You can upgrade anytime to unlock additional features like voice cloning and cloud storage."
            },
            {
              question: "What voices can I use?",
              answer: "We offer 4+ high-quality voices for all users. With a PREMIUM or ENTERPRISE plan, you can also submit your own voice for cloning and use it in your future TTS operations."
            },
            {
              question: "Can I use TalkingPages for YouTube or commercial projects?",
              answer: "Absolutely. You can use generated audio in your YouTube videos, podcasts, TikToks, presentations, and more—even for monetized or commercial use."
            },
            {
              question: "How does voice cloning work?",
              answer: "With a PREMIUM or ENTERPRISE plan, you can upload a voice sample that we'll process using our AI voice cloning system. You must have the legal rights and consent to use that voice. Once approved, you can use your cloned voice for any text-to-speech task."
            },
            {
              question: "How do I delete my account?",
              answer: "You can delete your account at any time via your dashboard. All your data will be permanently removed, and this action cannot be undone."
            },
            {
              question: "Do you offer refunds?",
              answer: "Since TalkingPages operates on a monthly subscription basis, we do not offer refunds after a billing cycle has started. You can cancel or downgrade your plan anytime before the next cycle."
            }
          ].map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-purple-500 transition-colors"
            >
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">{faq.question}</h2>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gray-800 rounded-xl border border-gray-700 p-8">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <h3 className="text-xl font-bold text-white">Still have questions?</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Reach out to our support team for personalized assistance
          </p>
          <a 
            href="mailto:info@talkingpages.io" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition text-lg"
          >
            info@talkingpages.io
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
}