import React from 'react'
import {
  localStorageContext,
  saveStorageContext,
} from '../context/localStorageProvider'

type hookType = [any, (data: any) => void]

const useLocalStorage = (variables: string[] | string | null = null): hookType => {
  const {data, changeData} = React.useContext(localStorageContext)
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

    return [filteredData, changeData]
  }

  if (variables !== null && typeof variables === 'string') {
    if (!keys.includes(variables)) {
      chrome.storage.local.set({[variables]: ''})
      changeData({[variables]: ''})
    }

    const setVariable = (data: any) => {
      changeData({[variables]: data})
    }

    return [data[variables], setVariable]
  }

  return [data, changeData]
}

export const useSaveStorage = () => {
  const saveData = React.useContext(saveStorageContext)

  return saveData
}

export default useLocalStorage
