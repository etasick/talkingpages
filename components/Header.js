// components/Header.js
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="px-6 py-4 shadow flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold cursor-pointer">TalkingPages</h1>
      </Link>
      <nav className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/about-us" className="hover:underline">About</Link>
        <Link href="/contact-us" className="hover:underline">Contact</Link>
        <Link href="/terms" className="hover:underline">Terms</Link>
      </nav>
    </header>
  );
}
