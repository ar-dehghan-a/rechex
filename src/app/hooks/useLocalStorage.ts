import {useContext} from 'react';
import {LocalStorageContext} from '../context/LocalStorageProvider';
import {LocalStorageType} from '../../types/index.type';

function useLocalStorage(): [
  LocalStorageType,
  (key: keyof LocalStorageType | 'all', value?: any) => void
] {
  const storage = useContext(LocalStorageContext);

  return [
    storage,
    (key, value) => {
      if (value === undefined) {
        key === 'all'
          ? chrome.storage.local.clear()
          : chrome.storage.local.remove(key);
        return;
      }

      key === 'all'
        ? chrome.storage.local.set(value)
        : chrome.storage.local.set({[key]: value});
    },
  ];
}

export {useLocalStorage};
