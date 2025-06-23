'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports'; // adjust path

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showUsername, setShowUsername] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailSubmit = async () => {
    if (!email) {
      setErrorMsg('Enter your email');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      // Example: your API endpoint for lookup
      const response = await fetch(
        'https://p4l8c7wl87.execute-api.us-east-1.amazonaws.com/default/userbyemail',
        {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await response.json();

      if (response.ok && data?.username) {
        setUsername(data.username);
        setShowUsername(true);
      } else {
        setErrorMsg('No account found with this email');
      }
    } catch (err) {
      console.error('Lookup error:', err);
      setErrorMsg('Failed to look up account');
    }

    setIsLoading(false);
  };

  const handleSendResetCode = async () => {
    if (!username) {
      setErrorMsg('Username is required');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      await Auth.resetPassword({ username });
      setCodeSent(true);
    } catch (err) {
      console.error('Reset error:', err);
      setErrorMsg(err.message || 'Failed to initiate reset');
    }

    setIsLoading(false);
  };

  const handleConfirmReset = async () => {
    if (!code || !newPassword) {
      setErrorMsg('Enter code and new password');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      await Auth.confirmResetPassword({
        username,
        confirmationCode: code.trim(),
        newPassword: newPassword.trim(),
      });

      alert('Password reset successfully!');
      router.push('/signin');
    } catch (err) {
      console.error('Confirm reset error:', err);
      setErrorMsg(err.message || 'Failed to reset password');
    }

    setIsLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-600 to-purple-700">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Password Recovery</h1>

        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {errorMsg}
          </div>
        )}

        {!codeSent ? (
          <>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="border p-2 w-full mb-4 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />

            {showUsername && (
              <>
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  className="border p-2 w-full mb-4 rounded"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </>
            )}

            <button
              onClick={showUsername ? handleSendResetCode : handleEmailSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLoading ? 'Processing...' : showUsername ? 'Send Reset Code' : 'Continue'}
            </button>
          </>
        ) : (
          <>
            <label className="block mb-2">Verification Code</label>
            <input
              type="text"
              className="border p-2 w-full mb-4 rounded"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
            />

            <label className="block mb-2">New Password</label>
            <input
              type="password"
              className="border p-2 w-full mb-4 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
            />

            <button
              onClick={handleConfirmReset}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}

        <div className="mt-6 text-center">
          <a href="/signin" className="text-blue-600 underline font-semibold">
            Back to Sign In
          </a>
        </div>
      </div>
    </main>
  );
}
