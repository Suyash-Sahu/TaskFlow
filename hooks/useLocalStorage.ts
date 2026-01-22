import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      // Try to parse as JSON first
      try {
        return JSON.parse(item);
      } catch (parseError) {
        // If parsing fails, it might be a plain string value
        // Try to use it directly if it matches the expected type
        if (typeof initialValue === 'string') {
          // Store it properly as JSON for future use
          try {
            window.localStorage.setItem(key, JSON.stringify(item));
          } catch {
            // Ignore storage errors during cleanup
          }
          return item as T;
        }
        // If it's not a string type, clear the invalid data and return initial value
        try {
          window.localStorage.removeItem(key);
        } catch {
          // Ignore removal errors
        }
        return initialValue;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

