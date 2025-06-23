'use client';
import { useState,useEffect} from 'react';  
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/navigation';


export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [cognitoUsername, setCognitoUsername] = useState('');
  useEffect(() => {
  console.log('Auth object:', Auth);
}, []);


  const handleSignUp = async () => {
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const phone = '+237' + phoneNumber.trim(); 
      console.log(Auth);
      
      const result = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          phone_number: phone,
          email: email,
          name: fullName,
          preferred_username: 'johndoe',
        },
      });

      console.log('SignUp result:', result);
      setCognitoUsername(result.userSub || phone);
      if (result.nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
        setIsOtpRequired(true);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setErrorMsg(err.message || 'Signup failed');
    }
    setIsLoading(false);
  };

  const handleConfirmSignUp = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await Auth.confirmSignUp(cognitoUsername, otpCode.trim());
      router.push('/signin'); // navigate to sign in page
    } catch (err) {
      console.error('Confirm error:', err);
      setErrorMsg(err.message || 'Confirmation failed');
    }
    setIsLoading(false);
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      {!isOtpRequired ? (
        <>
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label className="block mb-2">MoMo Number (+237)</label>
          <input
            type="tel"
            className="border p-2 w-full mb-4"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="border p-2 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="border p-2 w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </>
      ) : (
        <>
          <label className="block mb-2">Enter OTP Code</label>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            required
            placeholder="Check your email"
          />

          {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

          <button
            onClick={handleConfirmSignUp}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {isLoading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </>
      )}

      <p className="mt-4 text-center">
        Already have an account?{' '}
        <a href="/signin" className="text-blue-600 underline">
          Sign In
        </a>
      </p>
    </main>
  );
}
