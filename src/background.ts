import {LocalStorageType} from './types/index.type'

const initialValue: LocalStorageType = {
  name: 'rechex',
  message: 'hello from rechex',
}

chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') chrome.storage.local.set(initialValue)
  else
    chrome.storage.local.get(null, res => {
      const localKeys = Object.keys(res)
      for (const initKey in initialValue)
        if (!localKeys.includes(initKey))
          chrome.storage.local.set({
            [initKey]: initialValue[initKey as keyof LocalStorageType],
          })
    })
})
