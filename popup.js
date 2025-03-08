// popup.js 💰
// This script handles the popup button click event to extract product data from the current tab and send it to Google Sheets.

document.getElementById('sendDataBtn').addEventListener('click', async () => {
  // Query the active tab in the current window 🪙
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Execute script in the active tab to get product data 🪙
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // Define function to extract product data (same as in content.js)
      function getProductData() {
        const productTitle = document.querySelector('h1.item-title')?.innerText || '';
        const priceElement = document.querySelector('.price-tag-fraction');
        const price = priceElement ? priceElement.innerText : '';
        const shippingCost = document.querySelector('.shipping-cost')?.innerText || 'Free';
        const seller = document.querySelector('.seller-info')?.innerText || '';
        const productUrl = window.location.href;
        return { productTitle, price, shippingCost, seller, productUrl };
      }
      return getProductData();
    }
  }, (results) => {
    // Check for errors and process the returned data 🪙
    if (chrome.runtime.lastError || !results || !results[0].result) {
      console.error('Error fetching product data 🪙:', chrome.runtime.lastError);
      return;
    }
    
    const data = results[0].result;
    
    // Replace 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL' with your actual deployed Google Apps Script URL 🪙
    fetch('YOUR_GOOGLE_SCRIPT_WEB_APP_URL', {
      method: 'POST',
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
