'use client';

import { useEffect, useState } from 'react';

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  // Check if we are in a browser environment vs. server-side rendering where window is not defined
  const isBrowser = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) {
      return initialValue;
    }
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (isBrowser) {
        sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const onStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        if (
          event.newValue === undefined ||
          event.newValue === null ||
          event.newValue === ''
        ) {
          setStoredValue(initialValue);
        } else {
          setStoredValue(JSON.parse(event.newValue || 'null'));
        }
      }
    };

    if (isBrowser) {
      window.addEventListener('storage', onStorageChange);
    }
    return () => {
      if (isBrowser) {
        window.removeEventListener('storage', onStorageChange);
      }
    };
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
};
