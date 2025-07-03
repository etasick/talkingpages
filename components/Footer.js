"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
                            
                            
          <img src="/logo.svg" alt="TalkingPages Logo"  className="h-10 w-auto mb-4"
 priority />
              
              <p className="text-gray-400 mt-2">
                Supercharge your  content creation with studio-quality voiceovers using AI-powered voice generation technology.
              </p>
            </div>
            
          </div>

          {/* Features Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-2">AI Features</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/voice_cloning" className="flex items-center hover:text-white transition group">
                  <svg className="w-4 h-4 mr-3 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                  Voice Cloning
                </Link>
              </li>
              <li>
                <Link href="/voice_selection" className="flex items-center hover:text-white transition group">
                  <svg className="w-4 h-4 mr-3 text-purple-400 group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                  Voice Selection
                </Link>
              </li>
              <li>
                <Link href="/cloud_storage" className="flex items-center hover:text-white transition group">
                  <svg className="w-4 h-4 mr-3 text-green-400 group-hover:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  Cloud Storage
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="flex items-center hover:text-white transition group">
                  <svg className="w-4 h-4 mr-3 text-yellow-400 group-hover:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Premium Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-2">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-2">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="hover:text-white transition">FAQ</Link>
              </li>
             
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TalkingPages . All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4 text-gray-500 text-sm">
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
}