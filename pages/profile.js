'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>

        {user ? (
          <div className="bg-gray-100 p-4 rounded space-y-2">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>User ID:</strong> {user.userId}</p>
            <p><strong>Email:</strong> {user.signInDetails?.loginId || 'N/A'}</p>
            {/* You can add more user details here */}
          </div>
        ) : (
          <p>Please <a href="/signin" className="text-blue-600 underline">sign in</a> to view your profile.</p>
        )}
      </main>
    </div>
  );
}
