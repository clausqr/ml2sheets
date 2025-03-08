// options.js 🪙
// This script saves and retrieves configuration options using chrome.storage

// Save options when the button is clicked 🪙
document.getElementById('saveBtn').addEventListener('click', () => {
  const googleScriptUrl = document.getElementById('googleScriptUrl').value;
  chrome.storage.sync.set({ googleScriptUrl }, () => {
    alert('Options saved successfully! 🪙');
  });
});

// Load saved options on page load 🪙
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['googleScriptUrl'], (result) => {
    if (result.googleScriptUrl) {
      document.getElementById('googleScriptUrl').value = result.googleScriptUrl;
    }
  });
});
