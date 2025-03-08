// scraper.js 🪙
// This file contains the unified function to extract product data

function getProductData() {
  // Extract product title
  const productTitleElement = document.querySelector('h1.ui-pdp-title') ||
                              document.querySelector('.ui-pdp-title__main-title');
  const productTitle = productTitleElement ? productTitleElement.innerText : '';

  // Extract price using the specified selector
  const priceElement = document.querySelector('.andes-money-amount__fraction[aria-hidden="true"]');
  const price = priceElement ? priceElement.innerText : '';

  // Extract shipping cost using available selectors
  const shippingCostElement = document.querySelector('.ui-pdp-buybox__quantity__available') ||
                              document.querySelector('.ui-pdp-shipping__message');
  const shippingCost = shippingCostElement ? shippingCostElement.innerText : 'Free';

  // Extract seller information
  const sellerElement = document.querySelector('.ui-pdp-seller__header__title') ||
                        document.querySelector('.ui-pdp-seller__link-trigger');
  const seller = sellerElement ? sellerElement.innerText : '';

  // Get the current page URL
  const productUrl = window.location.href;

  return { productTitle, price, shippingCost, seller, productUrl };
}

// Attach the function to the window object
window.getProductData = getProductData;