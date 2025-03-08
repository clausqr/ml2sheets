// scraper.js 🪙
// This file contains the unified function to extract product data

function getProductData() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['selectors'], (result) => {
      const selectors = result.selectors ? result.selectors.split(',') : [
        'h1.ui-pdp-title',
        '.andes-money-amount__fraction[aria-hidden="true"]',
        '#highlighted_specs_features > section > div.ui-pdp-container__row.ui-pdp-container__row--highlighted-features > div > ul',
        '.ui-pdp-seller__header__title'
      ];

      const data = selectors.map(selector => {
        const element = document.querySelector(selector.trim());
        return element ? element.innerText : '';
      });

      // Add the current page URL as the last element
      data.push(window.location.href);

      resolve(data);
    });
  });
}

// Attach the function to the window object
window.getProductData = getProductData;