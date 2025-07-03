// components/Header.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Account", href: "/account" },
    { name: "Features", href: "#", subLinks: [
        { name: "Voice Cloning", href: "/voice_cloning" },
        { name: "Voice Selection", href: "/voice_selection" },
        { name: "Cloud Storage", href: "/cloud_storage" }
    ]},
    { name: "Resources", href: "#", subLinks: [
        { name: "FAQ", href: "/faq" }
    ]},
    { name: "Company", href: "#", subLinks: [
        { name: "About Us", href: "/about-us" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
        { name: "Terms", href: "/terms" }
    ]}
  ];

  return (
    <header className="bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <div className="relative w-40 h-10"> {/* Adjusted size for logo */}
              <Image src="/logo.svg" alt="TalkingPages Logo" fill className="object-contain" priority />

              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              link.subLinks ? (
                <div key={link.name} className="relative group">
                  <button className="px-4 py-2 text-sm font-medium hover:bg-gray-800 rounded-md transition-all flex items-center">
                    {link.name}
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div className="absolute hidden group-hover:block bg-gray-800 rounded-md shadow-lg py-1 min-w-[200px] z-10">
                    {link.subLinks.map((subLink) => (
                      <Link 
                        key={subLink.name}
                        href={subLink.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-700"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium hover:bg-gray-800 rounded-md transition-all"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link 
              href="/pricing"
              className="ml-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  <div className="mb-2">
                    <div className="text-gray-300 px-3 py-2 text-sm font-medium">
                      {link.name}
                    </div>
                    <div className="pl-4">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          onClick={closeMenu}
                          className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/pricing"
              onClick={closeMenu}
              className="block px-4 py-2 mt-4 text-center text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}