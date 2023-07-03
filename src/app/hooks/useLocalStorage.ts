import React from 'react'
import {localStorageContext} from '../context/localStorageProvider'

const useLocalStorage = () => {
  const context = React.useContext(localStorageContext)
  return context
}

export default useLocalStorage
