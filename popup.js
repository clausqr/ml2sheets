// popup.js 🪙
// This script handles the popup button click event to extract product data and send it to Google Sheets.

document.getElementById('sendDataBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
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
    if (chrome.runtime.lastError || !results || !results[0].result) {
      console.error('Error fetching product data 🪙:', chrome.runtime.lastError);
      return;
    }
    
    const data = results[0].result;
    
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
