"use client";

import React, { useState } from "react";
import Link from "next/link";
import CategoryDropdown from "./CategoryDropdown";
import { ShoppingCartIcon, UserIcon, PhoneIcon } from "@heroicons/react/24/outline";

function Header({ cart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-xl">
      {/* Top Notification Bar */}
      <div className="bg-emerald-700 text-white text-sm py-2 px-4 text-center">
        <span className="hidden md:inline">🌟 Premium Quality | 🔒 Secure Checkout | 🚚 Discreet Shipping</span>
        <div className="md:hidden flex items-center justify-center gap-2">
          <PhoneIcon className="w-4 h-4" />
          <span>24/7 Support: 1-800-555-HEMP</span>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="https://www.butterflyassets.online/THCVapeCartsimages/THCVapecartusa.png" 
              alt="THC Vape Carts USA Logo" 
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold text-white font-serif">
              THC Vape Carts
              <span className="block text-sm font-normal text-emerald-400">Premium Quality Guaranteed</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link href="/shop" className="text-white hover:text-emerald-400 transition-colors">
                Shop
              </Link>
              <CategoryDropdown />
              <Link href="/wholesale" className="text-white hover:text-emerald-400 transition-colors">
                Wholesale
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6 ml-8">
              <Link href="/account" className="text-white hover:text-emerald-400">
                <UserIcon className="w-6 h-6" />
              </Link>
              
              <Link href="/cart" className="relative text-white hover:text-emerald-400">
                <ShoppingCartIcon className="w-6 h-6" />
                {cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} mt-4 pb-4`}>
          <div className="flex flex-col gap-4 text-white">
            <Link href="/shop" className="py-2 border-b border-slate-700">
              Shop
            </Link>
            <Link href="/wholesale" className="py-2 border-b border-slate-700">
              Wholesale
            </Link>
            <div className="py-2 border-b border-slate-700">
              <CategoryDropdown mobile />
            </div>
            <div className="flex justify-between mt-4">
              <Link href="/account" className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                Account
              </Link>
              <Link href="/cart" className="flex items-center gap-2">
                <ShoppingCartIcon className="w-5 h-5" />
                Cart ({cart?.length || 0})
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;