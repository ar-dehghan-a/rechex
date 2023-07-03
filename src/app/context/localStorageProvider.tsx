import React from 'react'

type Props = {
  children: React.ReactNode
}

type Data = {
  [key: string]: any
}

type StorageContextType = {
  data: Data
  changeData: (valueChanged: Data) => void
  saveData: () => void
}

let localStorage = await chrome.storage.local.get()

export const localStorageContext = React.createContext<StorageContextType>({
  data: {},
  changeData: () => {},
  saveData: () => {},
})

const LocalStorageProvider: React.FC<Props> = ({children}) => {
  const [data, setData] = React.useState<Data>(localStorage)

  const changeData = (valueChanged: Data) => {
    setData(prev => ({...prev, ...valueChanged}))
  }

  const saveData = async () => {
    let changes = {}
    for (const item in data) {
      if (localStorage[item] !== data[item])
        changes = {...changes, [item]: data[item]}
    }

    await chrome.storage.local.set(changes)
    const newLocalStorage = await chrome.storage.local.get()
    localStorage = newLocalStorage
  }

  return (
    <localStorageContext.Provider value={{data, changeData, saveData}}>
      {children}
    </localStorageContext.Provider>
  )
}

export default LocalStorageProvider
