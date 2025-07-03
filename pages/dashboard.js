'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import Navbar from '../components/Navbar';

export default function DashboardPage() {
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
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        {user ? (
          <p>Welcome back, <strong>{user.username}</strong>!</p>
        ) : (
          <p>Please <a href="/signin" className="text-blue-600 underline">sign in</a> to view your dashboard.</p>
        )}
      </main>
    </div>
  );
}
