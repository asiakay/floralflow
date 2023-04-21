import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext value={{ user, loading }}>
      {children}
    </UserContext>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
