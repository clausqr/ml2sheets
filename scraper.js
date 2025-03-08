// scraper.js 🪙
// This file contains the unified function to extract product data

function getProductData() {
  // Return fixed example data for testing
  return {
    productTitle: "Example Product Title",
    price: "9999",
    shippingCost: "Free",
    seller: "Example Seller",
    productUrl: "http://example.com"
  };
}

// Attach the function to the window object
window.getProductData = getProductData;