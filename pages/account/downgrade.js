'use client';

import Navbar from '@/components/Navbar';

export default function DownGradePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Downgrade Plan</h1>
        <p className="mb-4">
          For <strong>plan downgrades</strong>:
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded">
          <p className="mb-2">
            📧 Email us directly at:
          </p>
          <a
            href="mailto:info@talkingpages.io?subject=Enterprise%20Upgrade%20Request"
            className="text-blue-600 underline font-medium"
          >
            info@talkingpages.io
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Please include your registered email or User ID and the new plan you want when reaching out so we can assist you faster.Your request will be processed within 10 minutes.
        </p>

        <div className="mt-6">
          <a href="/account" className="text-blue-600 hover:underline">
            ← Back to Account
          </a>
        </div>
      </main>
    </div>
  );
}

