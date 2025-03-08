document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('optionsForm');

  // Load saved options
  chrome.storage.sync.get(['googleScriptUrl', 'selectors'], (result) => {
    document.getElementById('googleScriptUrl').value = result.googleScriptUrl || '';
    document.getElementById('selectors').value = result.selectors || 'h1.ui-pdp-title, #highlighted_specs_features > section > div.ui-pdp-container__row.ui-pdp-container__row--highlighted-features > div > ul, .andes-money-amount__fraction[aria-hidden="true"]';
  });

  // Save options
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const googleScriptUrl = document.getElementById('googleScriptUrl').value;
    const selectors = document.getElementById('selectors').value;
    chrome.storage.sync.set({ googleScriptUrl, selectors }, () => {
      console.log('Options saved:', { googleScriptUrl, selectors });
      alert('Options saved!');
    });
  });
});