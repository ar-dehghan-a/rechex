import React, {createContext, useState, useEffect} from 'react'
import {LocalStorageType} from '../../types/index.type'

const initLocalStorage = (await chrome.storage.local.get()) as LocalStorageType
export const LocalStorageContext = createContext<LocalStorageType>(initLocalStorage)

function LocalStorageProvider<T extends LocalStorageType>({
  children,
}: {
  children: React.ReactNode
}) {
  const [storage, setStorage] = useState<T>(initLocalStorage as T)

  useEffect(() => {
    const listener = (
      changes: {[key: string]: chrome.storage.StorageChange},
      areaName: string,
    ) => {
      if (areaName === 'local') {
        const newStorage = {...storage}
        for (const key in changes) {
          const change = changes[key]
          if (change.newValue === undefined) {
            delete newStorage[key as keyof T]
          } else {
            newStorage[key as keyof T] = change.newValue
          }
        }
        setStorage(newStorage as T)
      }
    }
    chrome.storage.onChanged.addListener(listener)
    return () => {
      chrome.storage.onChanged.removeListener(listener)
    }
  }, [storage])

  return (
    <LocalStorageContext.Provider value={storage}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export {LocalStorageProvider}
