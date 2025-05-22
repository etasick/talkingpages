import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity";
import { ChevronRightIcon, TagIcon, GiftIcon, ShoppingCartIcon, UsersIcon } from "@heroicons/react/24/outline";

const Homepage = ({ initialProducts }) => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      image: "https://www.butterflyassets.online/THCVapeCartsimages/IMG-20200514-WA0004-768x1024.jpg",
      title: "Premium THC Vape Cartridges",
      subtitle: "Lab-Tested • 25+ Flavors • Fast Discreet Shipping",
      cta: "Shop Now"
    },
    {
      image: "/wholesale-bg.jpg",
      title: "Wholesale Distributors Welcome",
      subtitle: "Volume Discounts • Custom Branding • Bulk Orders",
      cta: "Request Pricing"
    },
    {
      image: "/sale-bg.jpg",
      title: "Summer Sale - Limited Time!",
      subtitle: "Use Code: SAVE15 for 15% Off All Orders",
      cta: "Claim Discount"
    }
  ];

  // Auto-rotate slides every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50">
      <Head>
        <title>THC Vape Carts USA | Premium 510 Cartridges & Bulk Wholesale</title>
        <meta name="description" content="America's Largest Online THC Marketplace: 25+ Lab-Tested Flavors, Wholesale Distribution, Daily Deals & Secure Nationwide Shipping. Shop Now or Apply for Bulk Pricing." />
      </Head>

      {/* Hero Carousel */}
      <div className="relative h-[600px] w-full">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority
              className="object-cover"
              quality={80}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div className="container mx-auto px-4 text-center lg:text-left">
                <div className="max-w-2xl lg:max-w-4xl bg-black/30 p-8 rounded-xl backdrop-blur-sm">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
                    {slide.title}
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-200 mb-8">
                    {slide.subtitle}
                  </p>
                  <button
                    onClick={() => router.push(index === 1 ? '/wholesale' : '/shop')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-emerald-500' : 'bg-white/50'}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-emerald-800 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <GiftIcon className="w-6 h-6 text-white" />
            <span className="text-white text-lg font-medium">New Customer Offer: Use Code WELCOME20 for 20% Off First Order!</span>
          </div>
          <button 
            onClick={() => router.push('/shop')}
            className="bg-white text-emerald-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Value Propositions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <UsersIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Wholesale Program</h3>
            <p className="text-gray-600">Volume discounts up to 40% for retailers & distributors</p>
            <button 
              onClick={() => router.push('/wholesale')}
              className="mt-4 text-emerald-600 font-semibold hover:underline"
            >
              Learn More →
            </button>
          </div>
          
          <div className="text-center p-6">
            <ShoppingCartIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Daily Deals</h3>
            <p className="text-gray-600">Flash sales & rotating promotions</p>
            <div className="mt-4">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Today: Buy 2 Get 1 Free</span>
            </div>
          </div>

          <div className="text-center p-6">
            <TagIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Loyalty Rewards</h3>
            <p className="text-gray-600">Earn points with every purchase</p>
            <button 
              onClick={() => router.push('/rewards')}
              className="mt-4 text-emerald-600 font-semibold hover:underline"
            >
              Join Program →
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Flavored Carts', 'Disposable Pens', 'Concentrates', 'Bulk Orders'].map((category) => (
              <div 
                key={category}
                className="group relative h-64 bg-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={`/${category.toLowerCase().replace(' ', '-')}.jpg`}
                  alt={category}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold text-center">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold mb-4">Wholesale Partners</h2>
            <p className="text-lg mb-6">Join 500+ retailers across the US enjoying:</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <ChevronRightIcon className="w-5 h-5 text-emerald-300 mr-2" />
                Exclusive bulk pricing
              </li>
              <li className="flex items-center">
                <ChevronRightIcon className="w-5 h-5 text-emerald-300 mr-2" />
                Custom packaging options
              </li>
              <li className="flex items-center">
                <ChevronRightIcon className="w-5 h-5 text-emerald-300 mr-2" />
                Priority order processing
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Wholesale Pricing</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Business Name" className="w-full p-3 border rounded-lg" />
                <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" />
                <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-lg" />
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  Get Wholesale Info
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {['Lab Tested', 'Secure Payments', 'Discreet Shipping', '24/7 Support'].map((badge) => (
              <div key={badge} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Add appropriate icons for each badge */}
                  </svg>
                </div>
                <span className="font-medium text-gray-700">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  // ... existing getStaticProps implementation
}

export default Homepage;