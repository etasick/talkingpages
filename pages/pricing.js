// pages/pricing.js
"use client";

import { useState, useEffect } from "react";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { fetchUserProfile } from "../lib/fetchUser";
import Navbar from "../components/Navbar";

const plans = [
  {
    id: "FREE",
    name: "Free",
    price: "$0",
    description:
      "Explore our Text-to-Speech features with 5000 free credits. Perfect for beginners and casual users.",
    features: [
      "5000 free credits monthly",
      "Access to one professional voice",
      "Basic usage analytics",
      "No cloud storage access",
    ],
    highlight: false,
  },
  {
    id: "PRO",
    name: "Pro",
    price: "$5/month",
    description:
      "For content creators and hobbyists needing more voices and higher limits.",
    features: [
      "50,000 monthly credits",
      "Access to all 4+ voices",
      "Enhanced usage analytics",
      "Priority support",
      "No cloud storage access",
    ],
    highlight: false,
  },
  {
    id: "PREMIUM",
    name: "Premium",
    price: "$22/month",
    description:
      "For professionals requiring cloud storage, voice cloning, and advanced features.",
    features: [
      "100,000 monthly credits",
      "Cloud storage for audio files",
      "Use your own cloned voice",
      "Advanced analytics and reports",
      "Priority support",
    ],
    highlight: true,
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: "Custom",
    description:
      "Complete solution with dedicated support for businesses and teams.",
    features: [
      "All Premium features",
      "Dedicated account manager",
      "Custom voice cloning workflows",
      "SLAs and uptime guarantees",
      "Team collaboration tools",
    ],
    highlight: false,
  },
];

// Tailwind button styles mapped to classes
const btnClass = {
  current: "bg-gray-700 text-white cursor-not-allowed border border-gray-600",
  upgrade: "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white",
  downgrade: "bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-90 text-white",
  freeStart: "bg-gradient-to-r from-green-600 to-teal-600 hover:opacity-90 text-white",
};

function PricingActionButton({ userPlan, planId }) {
  const planOrder = plans.map((p) => p.id);
  const userIndex = planOrder.indexOf(userPlan);
  const planIndex = planOrder.indexOf(planId);

  // No user signed in or unknown plan
  if (userIndex === -1) {
    if (planId === "FREE") {
      return (
        <a 
          href="/signup"
          className={`px-5 py-3 rounded-lg font-semibold text-center block ${btnClass.freeStart}`}
        >
          Start with Free
        </a>
      );
    }
    return (
      <a 
        href="/signup"
        className={`px-5 py-3 rounded-lg font-semibold text-center block ${btnClass.upgrade}`}
      >
        Get {planId}
      </a>
    );
  }

  if (userIndex === planIndex) {
    return (
      <button
        disabled
        className={`px-5 py-3 rounded-lg font-semibold w-full ${btnClass.current}`}
      >
        Current Plan
      </button>
    );
  }

  if (planIndex > userIndex) {
    return (
      <a 
        href="/account/billing"
        className={`px-5 py-3 rounded-lg font-semibold text-center block ${btnClass.upgrade}`}
      >
        Upgrade to {planId}
      </a>
    );
  }

  // planIndex < userIndex
  return (
    <a 
      href="/account/downgrade"
      className={`px-5 py-3 rounded-lg font-semibold text-center block ${btnClass.downgrade}`}
    >
      Downgrade to {planId}
    </a>
  );
}

export default function PricingPage() {
  const [userPlan, setUserPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPlan = async () => {
      try {
        const currentUser = await getCurrentUser();
        const session = await fetchAuthSession();
        const sub = session.tokens.idToken.payload.sub;
        if (sub) {
          const profile = await fetchUserProfile(sub);
          setUserPlan(profile.usagePlan);
        }
      } catch {
        setUserPlan(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserPlan();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Choose Your Voice Plan
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Transparent pricing for powerful AI voice technology. Your privacy is protected - 
            we never track your text-to-speech operations or share your data.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading plans...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-gray-800 rounded-xl p-6 flex flex-col h-full border ${
                  plan.highlight 
                    ? "border-purple-500 shadow-lg shadow-purple-500/20 relative" 
                    : "border-gray-700"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                
                <header className="mb-4">
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                  <p className="text-xl font-semibold text-purple-400 mt-1">
                    {plan.price}
                  </p>
                </header>
                <p className="text-gray-400 flex-grow">{plan.description}</p>

                <ul className="mt-6 mb-6 space-y-3 text-gray-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <PricingActionButton userPlan={userPlan} planId={plan.id} />
                </div>
              </div>
            ))}
          </div>
        )}

        <section className="mt-16 max-w-3xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
          <div className="flex items-start">
            <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Your Privacy Matters
              </h3>
              <p className="text-gray-400">
                We respect your privacy and ensure that your text-to-speech
                conversions are secure and confidential. TalkingPages does not
                track or store your usage data beyond what is necessary to provide
                the service. Your voice, your content, stays yours.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">What are credits?</h4>
              <p className="text-gray-400 text-sm">
                Each credit equals one character processed. For example, "Hello World" (11 characters) would use 11 credits.
              </p>
            </div>
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">Can I change plans?</h4>
              <p className="text-gray-400 text-sm">
                Yes! You can upgrade or downgrade anytime. Unused credits don't roll over to the next month.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}