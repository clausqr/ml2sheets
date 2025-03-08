// popup.js 🪙
// This script handles the popup button click event to extract product data and send it to Google Sheets.

document.getElementById('sendDataBtn').addEventListener('click', async () => {
  console.log('Button clicked 🪙'); // Mensaje de prueba

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      function getProductData() {
        const productTitleElement = document.querySelector('h1.ui-pdp-title');
        const productTitle = productTitleElement ? productTitleElement.innerText : document.querySelector('.ui-pdp-title__main-title')?.innerText || '';
      
        const priceElement = document.querySelector('.andes-money-amount__fraction');
        const price = priceElement ? priceElement.innerText : document.querySelector('.ui-pdp-price__second-line .andes-money-amount__fraction')?.innerText || '';
      
        const shippingCostElement = document.querySelector('.ui-pdp-buybox__quantity__available');
        const shippingCost = shippingCostElement ? shippingCostElement.innerText : document.querySelector('.ui-pdp-shipping__message')?.innerText || 'Free';
      
        const sellerElement = document.querySelector('.ui-pdp-seller__header__title');
        const seller = sellerElement ? sellerElement.innerText : document.querySelector('.ui-pdp-seller__link-trigger')?.innerText || '';
      
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
        mode: 'no-cors',  // <--- No-cors mode
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
