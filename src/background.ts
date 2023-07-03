chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason !== 'update')
    chrome.storage.local.set({
      message: 'hello world!'
    });
});
