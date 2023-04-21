import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../lib/UserContext';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useUser();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
