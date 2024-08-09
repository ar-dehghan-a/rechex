import {useCallback, useEffect, useState} from 'react';

function useChromeLocalStorage<T>(
  key: string,
  initialValue: T,
  sync = false
): [T, (newValue: T | ((prevValue: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    chrome.storage.local.get([key], result => {
      if (result[key]) setValue(result[key] as T);
    });

    if (sync) {
      const listener = (
        changes: {[key: string]: chrome.storage.StorageChange},
        areaName: string
      ) => {
        if (areaName === 'local' && changes[key]) {
          setValue(changes[key].newValue as T);
        }
      };
      chrome.storage.onChanged.addListener(listener);
      return () => chrome.storage.onChanged.removeListener(listener);
    }
  }, [key, sync]);

  const setLocalStorage = useCallback(
    (newValue: T | ((prevValue: T) => T)) => {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      chrome.storage.local.set({[key]: valueToStore});
    },
    [key, value]
  );

  const clearLocalStorage = useCallback(() => {
    setValue(initialValue);
    chrome.storage.local.remove(key);
  }, [key, initialValue]);

  return [value, setLocalStorage, clearLocalStorage];
}

export default useChromeLocalStorage;
