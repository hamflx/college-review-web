import { useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const cachedValue = localStorage.getItem(key);
  const [value, setValue] = useState(
    cachedValue ? JSON.parse(cachedValue) : initialValue,
  );
  const setValueAndLocalStorage = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setValueAndLocalStorage];
};
