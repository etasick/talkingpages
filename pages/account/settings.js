// pages/settings.js
'use client';

import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import {
  getCurrentUser,
  fetchAuthSession,
  updateUserAttributes,
  updatePassword,
} from 'aws-amplify/auth';

export default function SettingsPage() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const currentUser = await getCurrentUser();
        const session = await fetchAuthSession();
        const attributes = session.tokens.idToken.payload;

        setUserId(attributes.sub || '');
        setName(attributes.name || '');
        setEmail(attributes.email || '');
      } catch (err) {
        console.error('Failed to fetch user attributes', err);
        setMessage('❌ Failed to load user data');
      }
    };

    fetchUserInfo();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserAttributes({
        userAttributes: {
          name: name
        }
      });
      setMessage('✅ Profile updated! Sign out and back in to see changes');
    } catch (err) {
      console.error('Error updating name:', err);
      setMessage('❌ Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      return setMessage('❌ Enter both passwords');
    }
    try {
      await updatePassword({ 
        oldPassword, 
        newPassword 
      });
      setMessage('✅ Password changed successfully');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      console.error('Error changing password:', err);
      setMessage(`❌ ${err.message || 'Failed to change password'}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-gray-400 mt-1">Manage your profile and security</p>
        </div>

        <div className="space-y-8">
          {/* Profile Section */}
          <section className="bg-gray-900 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <p className="text-gray-400 text-sm mt-1">
                Update your personal details
              </p>
            </div>
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">User ID</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-gray-300 cursor-not-allowed"
                  value={userId}
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-gray-400 cursor-not-allowed"
                  value={email}
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </section>

          {/* Password Section */}
          <section className="bg-gray-900 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Password Settings</h2>
              <p className="text-gray-400 text-sm mt-1">
                Change your login password
              </p>
            </div>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </section>
        </div>

        {message && (
          <div className={`mt-6 py-3 px-4 rounded-lg ${
            message.startsWith('✅') 
              ? 'bg-green-900/30 border border-green-800 text-green-400' 
              : 'bg-red-900/30 border border-red-800 text-red-400'
          }`}>
            {message}
          </div>
        )}
      </main>
    </div>
  );
}