
'use client';
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, Auth } from 'firebase/auth';

export function useUser(auth: Auth) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, [auth]);

  return { user, loading };
}
