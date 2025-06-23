'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports'; 



export default function SignIn() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isOtpRequired, setIsOtpRequired] = useState(false);

  const handleSignIn = async () => {
    if (!phoneNumber || !password) {
      setErrorMsg('Phone and Password required');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    try {
      const phone = '+237' + phoneNumber.trim();

      const signInResult = await Auth.signIn({
        username: phone,
        password: password,
      });

      if (signInResult.isSignedIn) {
        // success
        router.push('/home');
      } else {
        handleSignInStep(signInResult.nextStep?.signInStep);
      }
    } catch (err) {
      console.error('SignIn error:', err);
      setErrorMsg(formatError(err.message));
    }
    setIsLoading(false);
  };

  const formatError = (message) => {
    if (message.includes('UserNotFoundException')) return 'Account not found';
    if (message.includes('NotAuthorizedException')) return 'Incorrect password';
    if (message.includes('UserNotConfirmedException')) return 'Please verify your phone first';
    return `Sign-in failed: ${message}`;
  };

  const handleSignInStep = (step) => {
    console.log('Next step:', step);
    switch (step) {
      case 'CONFIRM_SIGN_IN_WITH_SMS_MFA_CODE':
        setIsOtpRequired(true);
        break;
      case 'DONE':
        router.push('/home');
        break;
      default:
        setErrorMsg('Unexpected sign-in step');
    }
  };

  const handleConfirmOtp = async () => {
    if (!otpCode) {
      setErrorMsg('Enter OTP code');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    try {
      const result = await Auth.confirmSignIn(otpCode.trim());
      if (result.isSignedIn) {
        router.push('/home');
      }
    } catch (err) {
      console.error('Confirm error:', err);
      setErrorMsg(err.message || 'Verification failed');
    }
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-600 to-purple-700">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Secure Sign In</h1>

        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {errorMsg}
          </div>
        )}

        {!isOtpRequired ? (
          <>
            <label className="block mb-2">Phone Number (+237)</label>
            <input
              type="tel"
              className="border p-2 w-full mb-4 rounded"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="6XXXXXXXX"
            />

            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="border p-2 w-full mb-4 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end mb-4">
              <a href="/forgot-password" className="text-blue-600 text-sm underline">
                Forgot Password?
              </a>
            </div>

            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </>
        ) : (
          <>
            <label className="block mb-2">SMS Verification Code</label>
            <input
              type="text"
              className="border p-2 w-full mb-4 rounded"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter code"
            />

            <button
              onClick={handleConfirmOtp}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </>
        )}

        <div className="mt-6 text-center">
          <span className="text-gray-600">New user? </span>
          <a href="/signup" className="text-blue-600 underline font-semibold">
            Create Account
          </a>
        </div>
      </div>
    </main>
  );
}
