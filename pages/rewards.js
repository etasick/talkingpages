"use client";

import React from "react";
import { CurrencyDollarIcon, GiftIcon, SparklesIcon, UserGroupIcon, ArrowPathIcon, TrophyIcon } from "@heroicons/react/24/outline";

const RewardsPage = () => {
  // Mock data - replace with actual data from your backend
  const userRewards = {
    points: 2450,
    tier: "Gold",
    nextTier: "Platinum",
    progress: 75,
    recentActivity: [
      { date: "2024-03-15", description: "Purchase - 510 Cart (500 pts)", points: "+500" },
      { date: "2024-03-12", description: "Birthday Bonus", points: "+200" },
      { date: "2024-03-10", description: "Product Review", points: "+50" },
    ],
    availableRewards: [
      { name: "$10 Store Credit", points: 1000, image: "/reward-credit.jpg" },
      { name: "Free Shipping", points: 500, image: "/reward-shipping.jpg" },
      { name: "Premium Cartridge", points: 2500, image: "/reward-premium.jpg" },
    ]
  };

  const getTierColor = (tier) => {
    switch(tier.toLowerCase()) {
      case 'bronze': return 'bg-amber-600';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-400';
      case 'platinum': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <SparklesIcon className="w-8 h-8 text-purple-600" />
                Loyalty Rewards
              </h1>
              <p className="mt-2 text-gray-600">
                Earn points with every purchase and unlock exclusive rewards
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">
                  {userRewards.points} Points
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className={`${getTierColor(userRewards.tier)} w-12 h-12 rounded-full flex items-center justify-center`}>
                <TrophyIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Current Tier: {userRewards.tier}</h3>
                <p className="text-sm text-gray-600">Progress to {userRewards.nextTier}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-purple-600 rounded-full h-4 transition-all duration-500" 
                style={{ width: `${userRewards.progress}%` }}
              />
            </div>
          </div>

          {/* Ways to Earn */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ArrowPathIcon className="w-6 h-6 text-green-600" />
              Ways to Earn Points
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-medium">Refer a Friend</h4>
                  <p className="text-sm text-gray-600">500 points per successful referral</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                <GiftIcon className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-medium">Make a Purchase</h4>
                  <p className="text-sm text-gray-600">1 point per $1 spent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userRewards.availableRewards.map((reward, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-white font-semibold">{reward.name}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CurrencyDollarIcon className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">{reward.points} Points</span>
                    </div>
                    <button 
                      className={`px-4 py-2 rounded-lg ${
                        userRewards.points >= reward.points
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {userRewards.recentActivity.map((activity, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-4">{new Date(activity.date).toLocaleDateString()}</td>
                    <td className="py-4">{activity.description}</td>
                    <td className="py-4 text-right font-medium text-green-600">
                      {activity.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RewardsPage;