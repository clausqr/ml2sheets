// background.js 🪙

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendDataContextMenu",
    title: "Send Data to Google Sheets",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "sendDataContextMenu") {
    console.log('Context menu clicked 🪙');
    sendData(tab);
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "send-data") {
    console.log('Hotkey pressed 🪙');
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    sendData(tab);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'sendData') {
    sendData(sender.tab);
    sendResponse({ status: 'Message received' });
  }
});

async function sendData(tab) {
  console.log('Send data triggered 🪙');

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getProductData().then(data => data)  // Call the unified function
  }, (results) => {
    if (chrome.runtime.lastError || !results || !results[0].result) {
      console.error('Error fetching product data 🪙:', chrome.runtime.lastError);
      return;
    }
    
    const data = results[0].result;
    console.log("Extracted Data:", data);
    
    // Retrieve the Google Apps Script URL from storage
    chrome.storage.sync.get(['googleScriptUrl'], (result) => {
      const url = result.googleScriptUrl;
      if (!url) {
        console.error("Google Script URL is not set! 🪙");
        alert("Please set the Google Script URL in the Options page. 🪙");
        return;
      }
      
      fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.text())
      .then(result => console.log('Data sent successfully 🪙:', result))
      .catch(error => console.error('Error sending data 🪙:', error));
    });
  });
}