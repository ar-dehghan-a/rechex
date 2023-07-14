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
}

let localStorage = await chrome.storage.local.get()

export const localStorageContext = React.createContext<StorageContextType>({
  data: {},
  changeData: () => {},
})
export const saveStorageContext = React.createContext(() => {})

const LocalStorageProvider: React.FC<Props> = ({children}) => {
  const [data, setData] = React.useState<Data>(localStorage)

  const changeData = React.useCallback((valueChanged: Data) => {
    setData(prev => ({...prev, ...valueChanged}))
  }, [])

  const saveData = React.useCallback(async () => {
    let changes = {}
    for (const item in data) {
      if (localStorage[item] !== data[item])
        changes = {...changes, [item]: data[item]}
    }

    await chrome.storage.local.set(changes)
    const newLocalStorage = await chrome.storage.local.get()
    localStorage = newLocalStorage
  }, [data, localStorage])

  return (
    <localStorageContext.Provider value={{data, changeData}}>
      <saveStorageContext.Provider value={saveData}>
        {children}
      </saveStorageContext.Provider>
    </localStorageContext.Provider>
  )
}

export default LocalStorageProvider
