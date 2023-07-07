import React from 'react'
import {localStorageContext} from '../context/localStorageProvider'

const useLocalStorage = (variables: string[] | null = null) => {
  const context = React.useContext(localStorageContext)
  const filteredData = {}
  if (variables) {
    const keys = Object.keys(context.data)
    variables.forEach(variable => {
      if (!keys.includes(variable)) chrome.storage.local.set({[variable]: ''})
      Object.assign(filteredData, {[variable]: context.data[variable] || ''})
    })
    context.data = filteredData
  }
  return context
}

export default useLocalStorage
