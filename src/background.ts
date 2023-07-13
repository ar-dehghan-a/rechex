chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason !== 'update') {
    chrome.storage.local.clear()
    chrome.storage.local.set({
      message: 'hello world!',
      exVersion: '0.0.1',
    })
  }
})
