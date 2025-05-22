// components/AboutSection.js
"use client";
import { useRouter } from "next/router";
import { CheckBadgeIcon, ShieldCheckIcon, TruckIcon, StarIcon } from "@heroicons/react/24/outline";

const AboutSection = () => {
    const router = useRouter();
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Premium THC Vape Cartridges<br />
              <span className="text-emerald-600">Trusted Nationwide</span>
            </h2>
            
            <p className="text-lg text-gray-600">
              At THC Vape Carts USA, we've revolutionized cannabis consumption by providing 
              Americans with access to:
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <CheckBadgeIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">25+ Lab-Tested Flavors</h3>
                  <p className="text-gray-600">
                    Curated selection of premium strains and innovative blends, 
                    all third-party tested for purity and potency
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <ShieldCheckIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Secure & Discreet Service</h3>
                  <p className="text-gray-600">
                    Encrypted transactions and unmarked packaging 
                    with nationwide shipping
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <StarIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Industry-Leading Quality</h3>
                  <p className="text-gray-600">
                    Pharmaceutical-grade hardware with 
                    CO2-extracted cannabis oil
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex gap-4">
              <button 
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                onClick={() => router.push('/shop')}
              >
                Explore Products
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-xl">
              <TruckIcon className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">3-5 business day delivery to all 50 states</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-xl">
              <ShieldCheckIcon className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">30-day satisfaction guarantee on all products</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl">
              <StarIcon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">5-Star Support</h3>
              <p className="text-gray-600">Dedicated cannabis experts available 24/7</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl">
              <CheckBadgeIcon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Pure</h3>
              <p className="text-gray-600">0% pesticides • 0% additives • 0% heavy metals</p>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-16 border-t pt-12">
          <h3 className="text-center text-gray-600 mb-8">Trusted By Cannabis Enthusiasts Across</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {['California', 'Colorado', 'Florida', 'New York', 'Texas'].map((state) => (
              <div key={state} className="text-center text-gray-700 font-medium">
                {state}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;