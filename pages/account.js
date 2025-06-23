"use client";

import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (err) {
        // Not logged in — redirect to signin
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      router.push("/signin");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-white">
      <h1 className="text-3xl font-bold mb-4">Account Home</h1>

      {user && (
        <div className="max-w-md w-full p-6 bg-gray-50 rounded-lg shadow-md">
          <p className="mb-4 text-gray-700">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="mb-6 text-gray-700">
            <strong>Email:</strong> {user.attributes?.email || "N/A"}
          </p>

          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
