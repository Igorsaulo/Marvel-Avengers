import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '../store/useAuth';
import { useProfile } from '../queries/auth/profile';

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { access_token, setProfile } = useAuth();
  const { data } = useProfile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (data) setProfile(data);
  }, [data, setProfile]);

  useEffect(() => {
    if (!access_token) {
      window.location.href = '/login';
    }
  }, [access_token]);

  return isClient && access_token ? children : null;
}
