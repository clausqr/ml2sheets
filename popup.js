// popup.js 🪙

async function sendData() {
  console.log('Send data triggered 🪙');

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getProductData()  // Call the unified function
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

// Event listener for button click
document.getElementById('sendDataBtn').addEventListener('click', async () => {
  console.log('Button clicked 🪙');
  await sendData();
});

// Event listener for context menu
chrome.contextMenus.create({
  id: "sendDataContextMenu",
  title: "Send Data to Google Sheets",
  contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "sendDataContextMenu") {
    console.log('Context menu clicked 🪙');
    await sendData();
  }
});

// Event listener for hotkey
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "send-data") {
    console.log('Hotkey pressed 🪙');
    await sendData();
  }
});