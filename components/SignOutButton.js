'use client';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('User signed out');
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Sign Out
    </button>
  );
}
