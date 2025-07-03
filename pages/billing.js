// pages/account/billing.js

'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import SignOutButton from '@/components/SignOutButton';
import { fetchUserProfile } from '@/lib/fetchUser';

const plans = [
  {
    name: 'FREE',
    description: '5,000 free credits monthly. Limited to basic voices.',
    quotaLimit: 5000,
    price: 'Free',
    highlight: false,
  },
  {
    name: 'PRO',
    description: '50,000 credits/month. Premium voices included.',
    quotaLimit: 50000,
    price: '$5.99/month',
    highlight: false,
  },
  {
    name: 'PREMIUM',
    description:
      '100,000 credits/month. Voice cloning, cloud storage, premium voices.',
    quotaLimit: 100000,
    price: '$22/month',
    highlight: true,
  },
  {
    name: 'ENTERPRISE',
    description: 'Custom plan for large-scale businesses or platforms.',
    quotaLimit: 'Custom',
    price: 'Contact Us',
    highlight: false,
  },
];

export default function BillingPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to load current plan.');
      }
    }
    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Billing & Subscription Plans</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {user && (
          <p className="mb-6 text-sm text-gray-600">
            Current Plan:{' '}
            <span className="font-medium text-blue-600">{user.usagePlan}</span>
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border p-5 rounded-lg shadow-sm ${
                plan.highlight ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="mb-3 text-gray-700">{plan.description}</p>
              <p className="font-medium text-lg mb-4">{plan.price}</p>
              {user?.usagePlan === plan.name ? (
                <span className="text-green-600 font-semibold">Your current plan</span>
              ) : (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => alert('Upgrade logic coming soon')}
                >
                  Upgrade to {plan.name}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-between">
          <a href="/account" className="text-blue-600 hover:underline">
            ← Back to Account
          </a>
          <SignOutButton />
        </div>
      </main>
    </div>
  );
}

