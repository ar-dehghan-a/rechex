import {useEffect, useState} from 'react';

function useChromeLocalStorage<T>(
  key: string,
  initialValue: T,
  sync?: boolean
): [value: T, setLocalStorage: (newValue: T) => void] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    chrome.storage.local.get([key], result => {
      if (result[key]) setValue(result[key]);
    });
  }, [key]);

  if (sync)
    useEffect(() => {
      const listener = (
        changes: {[key: string]: chrome.storage.StorageChange},
        areaName: string
      ) => {
        if (areaName === 'local')
          for (const changedKey in changes)
            if (changedKey === key) setValue(changes[changedKey].newValue);
      };
      chrome.storage.onChanged.addListener(listener);
      return () => {
        chrome.storage.onChanged.removeListener(listener);
      };
    }, [value]);

  const setLocalStorage = (newValue: any) => {
    setValue(newValue);
    chrome.storage.local.set({[key]: newValue});
  };

  return [value, setLocalStorage];
}

export default useChromeLocalStorage;
