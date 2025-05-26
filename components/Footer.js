"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-sm text-center text-gray-600 py-10 border-t mt-12 px-4">
      <div className="max-w-6xl mx-auto mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Experience the Web Differently</h3>
        <p className="mb-6">TalkingPages converts webpages into high-quality MP3 audio you can stream or download.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Listen Anywhere</h4>
            <p>Convert articles into audio and take them with you—perfect for commuting or multitasking.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Quick Summaries</h4>
            <p>Get a spoken summary before deciding if a page is worth your time.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Download & Save</h4>
            <p>Download the MP3 version of any page and listen offline whenever it’s convenient.</p>
          </div>
        </div>

        <p className="mt-6 text-blue-600 font-semibold">
          TalkingPages: <span className="italic">Let the web speak to you.</span>
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
