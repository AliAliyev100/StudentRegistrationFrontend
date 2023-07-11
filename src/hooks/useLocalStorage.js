import { useState, useEffect } from "react";

function getSavedValue(key, initialValue) {
  const savedValue = localStorage.getItem(key);
  if (savedValue) {
    try {
      return JSON.parse(savedValue);
    } catch (error) {}
  }

  if (typeof savedValue === "function") return initialValue;
  return initialValue;
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, setValue]);

  return [value, setValue];
}
