import { useCallback, useEffect, useMemo, useState } from "react";

function isBrowserStorageAvailable() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readStorageValue(key, initialValue, deserialize) {
  if (!isBrowserStorageAvailable()) {
    return typeof initialValue === "function" ? initialValue() : initialValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue === null) {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }

    return deserialize(storedValue);
  } catch {
    return typeof initialValue === "function" ? initialValue() : initialValue;
  }
}

export function useLocalStorage(
  key,
  initialValue,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    syncAcrossTabs = true
  } = {}
) {
  const [value, setValue] = useState(() => {
    return readStorageValue(key, initialValue, deserialize);
  });

  const setStoredValue = useCallback(
    (nextValue) => {
      setValue((currentValue) => {
        const resolvedValue =
          typeof nextValue === "function" ? nextValue(currentValue) : nextValue;

        if (isBrowserStorageAvailable()) {
          try {
            window.localStorage.setItem(key, serialize(resolvedValue));
          } catch {
            return resolvedValue;
          }
        }

        return resolvedValue;
      });
    },
    [key, serialize]
  );

  const removeStoredValue = useCallback(() => {
    if (isBrowserStorageAvailable()) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        return;
      }
    }

    setValue(typeof initialValue === "function" ? initialValue() : initialValue);
  }, [key, initialValue]);

  const refreshStoredValue = useCallback(() => {
    setValue(readStorageValue(key, initialValue, deserialize));
  }, [key, initialValue, deserialize]);

  useEffect(() => {
    setValue(readStorageValue(key, initialValue, deserialize));
  }, [key, initialValue, deserialize]);

  useEffect(() => {
    if (!syncAcrossTabs || !isBrowserStorageAvailable()) {
      return undefined;
    }

    function handleStorageChange(event) {
      if (event.storageArea !== window.localStorage) {
        return;
      }

      if (event.key !== key) {
        return;
      }

      if (event.newValue === null) {
        setValue(typeof initialValue === "function" ? initialValue() : initialValue);
        return;
      }

      try {
        setValue(deserialize(event.newValue));
      } catch {
        setValue(typeof initialValue === "function" ? initialValue() : initialValue);
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue, deserialize, syncAcrossTabs]);

  return useMemo(
    () => [value, setStoredValue, removeStoredValue, refreshStoredValue],
    [value, setStoredValue, removeStoredValue, refreshStoredValue]
  );
}

export function usePreference(key, initialValue) {
  return useLocalStorage(`neuromatch_preference_${key}`, initialValue);
}

export function useStoredScores(key = "all") {
  return useLocalStorage(`neuromatch_scores_${key}`, []);
}