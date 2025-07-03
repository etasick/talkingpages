'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { resendSignUpCode } from 'aws-amplify/auth';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      await resendSignUpCode({ username: email });
      setMessage('Verification code resent! Please check your email.');
    } catch (error) {
      console.error('Error resending code:', error);
      setMessage(error.message || 'Failed to resend verification code.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>

        <form onSubmit={handleResend} className="space-y-4">
          <label className="block">Email</label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && <p className="text-green-600">{message}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Resend Verification Email
          </button>
        </form>
      </main>
    </div>
  );
}
