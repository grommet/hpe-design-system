'use client';

import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Check if we are in a browser environment vs. server-side rendering where window is not defined
  const isBrowser = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isBrowser) {
      setStoredValue(initialValue);
      return;
    }

    try {
      const item = localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);
  const setValue = (value: T | ((val: T) => T)) => {
    setStoredValue(prev => {
      try {
        const valueToStore =
          value instanceof Function ? value(prev) : value;
        if (isBrowser) {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        return valueToStore;
      } catch (error) {
        console.error(
          `Failed to write to localStorage for key '${key}':`,
          error,
        );
        return prev;
      }
    });
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
          try {
            setStoredValue(JSON.parse(event.newValue));
          } catch (error) {
            setStoredValue(initialValue);
          }
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
