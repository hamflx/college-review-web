import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const cachedValue = localStorage.getItem(key);

    if (cachedValue) {
      setValue(JSON.parse(cachedValue));
    }
  }, []);

  const setValueAndLocalStorage = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setValueAndLocalStorage];
};
