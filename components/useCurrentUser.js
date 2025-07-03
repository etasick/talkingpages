'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        console.log('Current user:', currentUser);
        setUser(currentUser);
      } catch (error) {
        console.log('No current user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
