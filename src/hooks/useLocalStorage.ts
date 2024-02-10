import {useEffect, useState} from 'react';

function useChromeLocalStorage<T>(
  key: string,
  initialValue: T
): [
  value: T,
  setLocalStorage: (newValue: T) => void,
  clearLocalStorage: () => void
] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    chrome.storage.local.get([key], result => {
      if (result[key]) setValue(result[key]);
    });

    const listener = (
      changes: {[key: string]: chrome.storage.StorageChange},
      areaName: string
    ) => {
      if (areaName === 'local')
        for (const changedKey in changes)
          if (changedKey === key) setValue(changes[changedKey].newValue);
    };

    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, [key]);

  const setLocalStorage = (newValue: any) => {
    setValue(newValue);
    chrome.storage.local.set({[key]: newValue});
  };

  const clearLocalStorage = () => {
    chrome.storage.local.remove(key);
  };

  return [value, setLocalStorage, clearLocalStorage];
}

export default useChromeLocalStorage;
