// content.js 🪙
// scraper.js was run before this script!

// Function to inject the "Agregar a Google Sheets" button
function injectButton() {
  const addToCartButton = document.querySelector('.andes-button--loud');

  if (addToCartButton && !document.querySelector('.google-sheets-button')) {
    const googleSheetsButton = document.createElement('button');
    googleSheetsButton.innerText = 'Agregar a Google Sheets 🪙';
    googleSheetsButton.className = 'andes-button andes-button--loud google-sheets-button';
    googleSheetsButton.style.marginTop = '10px';
    googleSheetsButton.style.backgroundColor = '#800080'; // Color lila
    googleSheetsButton.style.color = 'white'; // Texto en blanco

    googleSheetsButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
      chrome.runtime.sendMessage({ action: 'sendData' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
        } else {
          console.log('Message sent:', response);
        }
      });
    });

    addToCartButton.parentNode.insertBefore(googleSheetsButton, addToCartButton.nextSibling);
  }
}

// Function to observe changes in the DOM and re-inject the button if necessary
function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        injectButton();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Inject the button when the content script is loaded
injectButton();

// Start observing changes in the DOM
observeDOMChanges();
