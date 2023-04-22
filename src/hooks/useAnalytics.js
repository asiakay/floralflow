
import { useEffect } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { firebaseApp } from '../lib/firebase';

const isSupported = () => {
  const supported =
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
    'isIntersecting' in window.IntersectionObserverEntry.prototype;

  return supported;
};


const useAnalytics = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && isSupported()) {
      getAnalytics(firebaseApp, { debug: true });
    }
  }, []);
};

export default useAnalytics;