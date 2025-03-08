// content.js 💰
// This script extracts product data from a MercadoLibre page

function getProductData() {
  // Extract product title (change the selector as needed) 🪙
  const productTitle = document.querySelector('h1.item-title')?.innerText || '';
  
  // Extract price from element with class "price-tag-fraction" 🪙
  const priceElement = document.querySelector('.price-tag-fraction');
  const price = priceElement ? priceElement.innerText : '';
  
  // Extract shipping cost (default to 'Free' if not found) 🪙
  const shippingCost = document.querySelector('.shipping-cost')?.innerText || 'Free';
  
  // Extract seller information 🪙
  const seller = document.querySelector('.seller-info')?.innerText || '';
  
  // Get the current page URL 🪙
  const productUrl = window.location.href;
  
  // Return an object with the extracted data 🪙
  return { productTitle, price, shippingCost, seller, productUrl };
}

// Optionally, you could automatically send the data here by calling sendDataToSheets(getProductData())
// but in this example, the popup script will trigger the action.
