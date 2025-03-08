// content.js 🪙
// scraper.js was run before this script!

// Function to inject the "Agregar a Google Sheets" button
function injectButton() {
  const addToCartButton = document.querySelector('.andes-button--loud');

  if (addToCartButton) {
    const googleSheetsButton = document.createElement('button');
    googleSheetsButton.innerText = 'Agregar a Google Sheets 🪙';
    googleSheetsButton.style.marginTop = '10px';
    googleSheetsButton.style.backgroundColor = '#007bff';
    googleSheetsButton.style.color = 'white';
    googleSheetsButton.style.border = 'none';
    googleSheetsButton.style.padding = '10px 20px';
    googleSheetsButton.style.cursor = 'pointer';

    googleSheetsButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'sendData' });
    });

    addToCartButton.parentNode.insertBefore(googleSheetsButton, addToCartButton.nextSibling);
  }
}

// Inject the button when the content script is loaded
injectButton();

// Attach the function to the window object
window.getProductData = getProductData;
