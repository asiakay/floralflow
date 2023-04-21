
import { useEffect } from 'react';
import { isSupported, getAnalytics } from 'firebase/analytics';
import { firebaseApp } from '../lib/firebase';

export const useAnalytics = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && isSupported()) {
      getAnalytics(firebaseApp);
    }
  }, []);
};