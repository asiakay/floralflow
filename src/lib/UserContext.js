import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from './firebase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
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



export { auth, onAuthStateChanged };
