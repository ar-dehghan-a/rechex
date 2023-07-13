import React from 'react'
import {localStorageContext} from '../context/localStorageProvider'

type hookType = [any, (data: any) => void, () => void]

const useLocalStorage = (variables: string[] | string | null = null): hookType => {
  const {data, changeData, saveData} = React.useContext(localStorageContext)
  const keys = Object.keys(data)

  if (variables !== null && Array.isArray(variables)) {
    const filteredData: {[key: string]: any} = {}

    variables.forEach(variable => {
      if (!keys.includes(variable)) {
        chrome.storage.local.set({[variable]: ''})
        changeData({[variable]: ''})
      }
      Object.assign(filteredData, {[variable]: data[variable] || ''})
    })

    return [filteredData, changeData, saveData]
  }

  if (variables !== null && typeof variables === 'string') {
    if (!keys.includes(variables)) {
      chrome.storage.local.set({[variables]: ''})
      changeData({[variables]: ''})
    }

    const setVariable = (data: any) => {
      changeData({[variables]: data})
    }

    return [data[variables], setVariable, saveData]
  }

  return [data, changeData, saveData]
}

export default useLocalStorage
