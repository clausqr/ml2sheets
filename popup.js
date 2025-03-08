// popup.js 🪙
// This script handles the popup button click event to extract product data and send it to Google Sheets.

document.getElementById('sendDataBtn').addEventListener('click', async () => {
  console.log('Button clicked 🪙');

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: async () => {
      // Return fixed data for testing
      return {
        productTitle: "Test Product",
        price: "12345",
        shippingCost: "Free",
        seller: "Test Seller",
        productUrl: "http://example.com"
      };
    }
  }, (results) => {
    if (chrome.runtime.lastError || !results || !results[0].result) {
      console.error('Error fetching product data 🪙:', chrome.runtime.lastError);
      return;
    }
    
    const data = results[0].result;
    console.log("Extracted Data:", data);
    
    // Retrieve the Google Apps Script URL from storage 🪙
    chrome.storage.sync.get(['googleScriptUrl'], (result) => {
      const url = result.googleScriptUrl;
      if (!url) {
        console.error("Google Script URL is not set! 🪙");
        alert("Please set the Google Script URL in the Options page. 🪙");
        return;
      }
      
      fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Using no-cors mode to bypass CORS restrictions
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
});
