"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-sm text-center text-gray-600 py-10 border-t mt-12 px-4">
      <div className="max-w-6xl mx-auto mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to TalkingPages</h3>
        <p className="mb-6">An AI tool that enables you to listen to web pages.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Save Time</h4>
            <p>Don't stress yourself opening a web page without knowing if it interests you.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Listen First</h4>
            <p>Listen to a web page to get a summary of what it's all about.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Take It With You</h4>
            <p>Download the webpage audio and use it whenever it's convenient for you.</p>
          </div>
        </div>

        <p className="mt-6 text-blue-600 font-semibold">TalkingPages: <span className="italic">Listen before you leap!</span></p>
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
