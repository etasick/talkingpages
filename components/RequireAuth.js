'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCurrentUser from './useCurrentUser';

export default function RequireAuth({ children }) {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null; // No user, redirecting...
  }

  return children;
}
