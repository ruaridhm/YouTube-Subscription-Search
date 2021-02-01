//Persists state through Local Storage
import { useState, useEffect } from 'react';

const usePersistedState = (defaultValue, key) => {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [key, value]);
  return [value, setValue];
};

export default usePersistedState;
