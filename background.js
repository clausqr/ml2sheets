// background.js 🪙
// This background service worker handles context menu clicks and hotkey commands

// Create a context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "sendData",
        title: "Send Data to Sheets 🪙",
        contexts: ["all"]
    });
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendData") {
        sendProductData(tab.id);
    }
});

// Listen for hotkey commands (Ctrl+Shift+Y)
chrome.commands.onCommand.addListener((command) => {
    console.log("Hotkey command triggered:", command);
    if (command === "send-data") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                sendProductData(tabs[0].id);
            }
        });
    }
});


// Helper function to execute the content script and send data to Google Sheets
function sendProductData(tabId) {
    chrome.scripting.executeScript({
        target: { tabId },
        func: getProductData // Execute the function defined below in the context of the page
    }, (results) => {
        if (chrome.runtime.lastError || !results || !results[0].result) {
            console.error("Error fetching product data 🪙:", chrome.runtime.lastError);
            return;
        }
        const data = results[0].result;
        chrome.storage.sync.get(['googleScriptUrl'], (result) => {
            const url = result.googleScriptUrl;
            if (!url) {
                console.error("Google Script URL is not set! 🪙");
                alert("Please set the Google Script URL in the Options page. 🪙");
                return;
            }
            // Using mode: 'no-cors' for simplicity; response will be opaque
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(() => console.log("Data sent successfully via background action! 🪙"))
                .catch(error => console.error("Error sending data 🪙:", error));
        });
    });
}

// This function will be executed in the context of the MercadoLibre page
function getProductData() {
    // Extract product title (adjust selector as needed) 🪙
    const productTitle = document.querySelector('h1.item-title')?.innerText || '';
    // Extract price using class selector 🪙
    const priceElement = document.querySelector('.price-tag-fraction');
    const price = priceElement ? priceElement.innerText : '';
    // Extract shipping cost 🪙
    const shippingCost = document.querySelector('.shipping-cost')?.innerText || 'Free';
    // Extract seller information 🪙
    const seller = document.querySelector('.seller-info')?.innerText || '';
    // Get the current page URL 🪙
    const productUrl = window.location.href;
    return { productTitle, price, shippingCost, seller, productUrl };
}
