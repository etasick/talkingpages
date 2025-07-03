'use client';
import { useState, useEffect } from 'react';
import { getCurrentUser, updateUserAttributes } from 'aws-amplify/auth';
import Navbar from '../components/Navbar';

export default function UpdateProfilePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setEmail(currentUser.signInDetails?.loginId || '');
        setName(currentUser.username || '');
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserAttributes({
        userAttributes: {
          email,
          name,
        },
      });
      setMessage('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage(error.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Update Profile</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <label className="block">Email</label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block">Full Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {message && <p className="text-green-600">{message}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </main>
    </div>
  );
}
