import { useState, useEffect } from "react";

const PREFIX = "heraPheri-";

const useLocalStorage = (
  key: string,
  providedValue: string | Function | null | undefined | boolean | object
) => {
  providedValue = providedValue === undefined ? null : providedValue;

  const PREFIXED_KEY = PREFIX + key;

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(PREFIXED_KEY);
    if (storedValue !== null) return JSON.parse(storedValue);
    if (typeof providedValue === "function") return providedValue();
    return providedValue;
  });

  useEffect(() => {
    localStorage.setItem(PREFIXED_KEY, JSON.stringify(value));
  }, [value, PREFIXED_KEY]);

  return [value, setValue];
};

export default useLocalStorage;
