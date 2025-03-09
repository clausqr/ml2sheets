// content.js 🪙
// scraper.js was run before this script!

// Add CSS for the button animations
const style = document.createElement('style');
style.textContent = `
  .google-sheets-button {
    transition: transform 0.2s, background-color 0.2s;
  }
  .google-sheets-button:hover {
    background-color: #9b30ff; /* Slightly lighter purple */
    transform: scale(1.1);
    animation: shake 0.5s infinite;
  }
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
`;
document.head.appendChild(style);

// Function to inject the "Agregar a Google Sheets" button
function injectButton() {
  const addToCartButton = document.querySelector('.andes-button--loud');

  if (addToCartButton && !document.querySelector('.google-sheets-button')) {
    const googleSheetsButton = document.createElement('button');
    googleSheetsButton.innerText = '✨Agregar a Google Sheets✨';
    googleSheetsButton.className = 'andes-button andes-button--loud google-sheets-button';
    googleSheetsButton.style.marginTop = '10px';
    googleSheetsButton.style.backgroundColor = '#800080'; // Color lila
    googleSheetsButton.style.color = 'white'; // Texto en blanco

    googleSheetsButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
      chrome.runtime.sendMessage({ action: 'sendData' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', JSON.stringify(chrome.runtime.lastError));
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
