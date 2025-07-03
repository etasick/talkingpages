'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import SignOutButton from '@/components/SignOutButton';
import { fetchUserProfile } from '@/lib/fetchUser';
import { fetchAuthSession } from 'aws-amplify/auth';

export default function PlansPage() {
  const [planData, setPlanData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        const session = await fetchAuthSession();
        const userSub = session?.tokens?.accessToken?.payload?.sub;

        if (!userSub) {
          throw new Error('User ID not found in session');
        }

        const data = await fetchUserProfile(userSub);
        if (!data) {
          throw new Error('No user data received');
        }
        setPlanData(data);
      } catch (err) {
        console.error('❌ Error fetching plan data:', err);
        setError('Failed to load plan information');
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  const getQuotaPercentage = () => {
    if (!planData) return 0;
    return Math.min(
      Math.round((planData.quotaUsed / planData.quotaLimit) * 100),
      100
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Plan & Quota</h1>
          <p className="text-gray-400 mt-1">Manage your subscription and usage</p>
        </div>

        {error && (
          <div className="mb-6 py-3 px-4 rounded-lg bg-red-900/30 border border-red-800 text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-48 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-32 bg-gray-700 rounded"></div>
            </div>
            <p className="mt-4 text-gray-400">Loading your plan details...</p>
          </div>
        ) : planData ? (
          <div className="space-y-6">
            {/* Account Details Card */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Account Details</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  planData.usagePlan === 'FREE' 
                    ? 'bg-blue-900/30 text-blue-400'
                    : planData.usagePlan === 'PRO'
                      ? 'bg-purple-900/30 text-purple-400'
                      : 'bg-yellow-900/30 text-yellow-400'
                }`}>
                  {planData.usagePlan} Plan
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">{planData.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Account Created</p>
                  <p className="font-medium">{formatDate(planData.createdAt)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Last Updated</p>
                  <p className="font-medium">{formatDate(planData.updatedAt)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">User ID</p>
                  <code className="text-xs font-mono text-gray-300 break-all">
                    {planData.id}
                  </code>
                </div>
              </div>
            </div>

            {/* Quota Usage Card */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Credits Usage</h2>
                <p className="text-sm font-medium">
                  <span className="text-blue-400">{planData.quotaUsed}</span> / {planData.quotaLimit} credits
                </p>
              </div>
              
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3"
                  style={{ width: `${getQuotaPercentage()}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Monthly quota</span>
                <span className="text-sm font-medium">{getQuotaPercentage()}% used</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-2">
                  Your monthly quota resets on the 1st of each month
                </p>
              </div>
            </div>

            {/* Upgrade Card */}
            <div className="bg-gradient-to-br from-yellow-900/20 to-amber-900/10 rounded-xl p-6 border border-amber-700">
              <div className="flex items-start">
                <div className="bg-amber-500/20 p-2 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-amber-200 mb-2">
                    Upgrade for More Features
                  </h3>
                  <p className="text-amber-100 mb-4">
                    Get higher quotas, premium voices, cloud storage, and voice cloning
                  </p>
                  <a
                    href="/account/billing"
                    className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-black font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Upgrade Plan
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">No Plan Data Available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't retrieve your plan information. Please try again later.
            </p>
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