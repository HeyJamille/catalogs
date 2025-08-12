import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        try {
          setStoredValue(JSON.parse(item));
        } catch {
          console.warn(
            `Valor inválido no localStorage para chave "${key}". Resetando para valor inicial.`
          );
          setStoredValue(initialValue);
          window.localStorage.setItem(key, JSON.stringify(initialValue));
        }
      }
    } catch (error) {
      console.error(`Erro ao acessar localStorage com chave "${key}":`, error);
    }
  }, [key, initialValue]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Erro ao definir localStorage com chave "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
