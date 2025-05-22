// components/HeroSlider.js
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const HeroSlider = () => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      image: "https://www.butterflyassets.online/THCVapeCartsimages/THC_vape_carts_slider2.webp",
      title: "Premium 510 THC Cartridges",
      subtitle: "Lab-Tested • 25+ Flavors • Fast Discreet Shipping",
      cta: "Shop Now",
      offer: "NEWCUSTOMER20 - 20% Off First Order",
      link: "/shop"
    },
    {
      image: "https://www.butterflyassets.online/THCVapeCartsimages/THC_vape_cartsUSAslider1.webp",
      title: "Wholesale Distribution Available",
      subtitle: "Volume Discounts • Custom Branding • Bulk Orders",
      cta: "Request Pricing",
      offer: "Bulk Orders Save Up To 40%",
      link: "/wholesale"
    }
  ];

  // Auto-rotate slides every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            quality={80}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center">
            <div className="container mx-auto px-4 text-center lg:text-left">
              <div className="max-w-2xl lg:max-w-4xl bg-black/30 p-8 rounded-xl backdrop-blur-sm">
                <div className="mb-4">
                  <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm">
                    {slide.offer}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 mb-8">
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => router.push(slide.link)}
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
            className={`w-3 h-3 rounded-full ${
              index === activeSlide ? 'bg-emerald-500' : 'bg-white/50'
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Manual Navigation */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
        onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
      >
        <ChevronRightIcon className="w-8 h-8 text-white" />
      </button>
    </div>
  );
};

export default HeroSlider;