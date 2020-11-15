import { useEffect, useState } from "react";
import useClientSideOnly from "./useClientSideOnly";
// Needed to use two-pass rendering here
// Since we can only access localStorage on the client side
// https://reactjs.org/docs/react-dom.html#hydrate

export default function useLocalStorage(key, initialValue) {
  const isClient = useClientSideOnly();
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      const parsed = item ? JSON.parse(item) : initialValue;
      setStoredValue(parsed);
    } catch (error) {
      setStoredValue(initialValue);
    }
  }, [isClient]);

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
