"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-sm text-center text-gray-600 py-10 border-t mt-12 px-4">
      <div className="max-w-6xl mx-auto mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Bring Your Words to Life</h3>
        <p className="mb-6">TalkingPages transforms written content into studio-quality MP3 voiceovers.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Natural Voices</h4>
            <p>Choose from lifelike AI narrators designed for clarity, emotion, and engagement.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Voiceover Downloads</h4>
            <p>Generate and download MP3 voiceovers for videos, blogs, scripts, or any creative project.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Content Accessibility</h4>
            <p>Turn any written message into audio—making it easier to share, hear, and understand.</p>
          </div>
        </div>

        <p className="mt-6 text-blue-600 font-semibold">
          TalkingPages: <span className="italic">Let your text speak volumes.</span>
        </p>
      </div>

      <div className="space-x-2 text-gray-500">
        <Link href="/" className="hover:underline">Home</Link>
        <span>|</span>
        <Link href="/about-us" className="hover:underline">About</Link>
        <span>|</span>
        <Link href="/contact-us" className="hover:underline">Contact</Link>
        <span>|</span>
        <Link href="/terms" className="hover:underline">Terms</Link>
      </div>
      <p className="mt-2 text-xs">&copy; {new Date().getFullYear()} TalkingPages</p>
    </footer>
  );
}
