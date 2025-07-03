'use client';

import { useEffect, useState } from 'react';
import { fetchUserProfile } from '@/lib/fetchUser';
import Navbar from '@/components/Navbar';
import SignOutButton from '@/components/SignOutButton';
import { fetchAuthSession } from 'aws-amplify/auth';

export default function BillingPage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const session = await fetchAuthSession();
        const userSub = session?.tokens?.accessToken?.payload?.sub;

        if (!userSub) throw new Error('User ID not found in session');

        const data = await fetchUserProfile(userSub);
        setUserData(data);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError('❌ Failed to load user data');
      }
    }

    loadData();
  }, []);

  const upgradeOptions = {
    FREE: {
      nextPlan: 'PRO',
      amount: '0.00067 BTC',
      address: 'bc1qjjkdueex5tp7cga5h2wt4h0rtpupmnfur0wvny',
    },
    PRO: {
      nextPlan: 'PREMIUM',
      amount: '0.0025 BTC',
      address: 'bc1qjjkdueex5tp7cga5h2wt4h0rtpupmnfur0wvny',
    },
    PREMIUM: {
      nextPlan: 'ENTERPRISE',
      contact: true,
    },
  };

  const renderUpgradeBox = () => {
    const currentPlan = userData?.usagePlan;
    const upgrade = upgradeOptions[currentPlan];

    if (!upgrade) return null;

    return (
      <div className={`p-6 rounded-xl mt-8 ${
        upgrade.contact 
          ? 'bg-indigo-900/30 border border-indigo-700' 
          : 'bg-yellow-900/20 border border-yellow-700'
      }`}>
        {upgrade.contact ? (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-indigo-300">
              Enterprise Upgrade
            </h3>
            <p className="text-gray-300">
              For custom usage plans, voice cloning, team access, or white-label services:
            </p>
            <a
              href="/contact"
              className="inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
            >
              Contact Support
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-300">
              Upgrade to {upgrade.nextPlan}
            </h3>
            <p className="text-gray-300">
              Send exactly <strong className="text-white">{upgrade.amount}</strong> to the BTC address below:
            </p>
            <code className="block bg-black p-3 rounded-lg text-sm font-mono border border-yellow-600 text-yellow-400 break-all">
              {upgrade.address}
            </code>
            <ul className="text-sm text-gray-400 space-y-1">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-yellow-500 mr-1.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Upgrades within 10-20 minutes after payment</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-yellow-500 mr-1.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>1 year subscription included</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-yellow-500 mr-1.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Include your <strong className="text-white">User ID</strong> or <strong className="text-white">Email</strong> in transaction</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Billing & Plan</h1>
          <p className="text-gray-400 mt-1">Manage your subscription and usage</p>
        </div>

        {error && (
          <div className="mb-6 py-3 px-4 rounded-lg bg-red-900/30 border border-red-800 text-red-400">
            {error}
          </div>
        )}

        {userData ? (
          <div className="bg-gray-900 rounded-xl p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border-b md:border-b-0 md:border-r border-gray-700 pb-5 md:pb-0 md:pr-5">
                <h2 className="text-lg font-semibold mb-3">Account Details</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Current Plan</p>
                    <p className="font-medium text-lg">{userData.usagePlan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Monthly Usage</p>
                    <p className="font-medium">
                      {userData.quotaUsed} / {userData.quotaLimit} credits
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">User Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">User ID</p>
                    <code className="text-sm font-mono text-gray-300 break-all">
                      {userData.id}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {renderUpgradeBox()}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-48 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-32 bg-gray-700 rounded"></div>
            </div>
            <p className="mt-4 text-gray-400">Loading your plan details...</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a 
            href="/account" 
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Account
          </a>
          <SignOutButton />
        </div>
      </main>
    </div>
  );
}