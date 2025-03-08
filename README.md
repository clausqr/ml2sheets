# ML2Sheets

ML2Sheets is a Chrome extension that automatically extracts product information from MercadoLibre pages and appends a new row in a Google Sheets document. This extension is built using HTML, JavaScript, and the Chrome Extensions API, and it integrates with a Google Apps Script Web App for seamless data transfer.

**Current status is alpha - you must load it via "Load Unpacked" in Chrome to use it.**

## Features ✨

- **Data Extraction:** Automatically extracts product details (description, price, shipping cost, seller, URL, etc.) from MercadoLibre pages.
- **Google Sheets Integration:** Sends the extracted data to a Google Sheet by appending a new row.
- **User Configuration:** Easily set up your Google Apps Script Web App URL via the extension’s Options page.
- **Simple UI:** Intuitive popup interface to trigger data sending.
- **Didactic Code:** Code and comments in English with fun currency emojis to guide you through the process.

## Usage (After initial Setup, see below!) 🚀

1. **Navigate to a MercadoLibre Product Page:**
   - Open any product page on MercadoLibre.

2. **Extract and Send Data:**
    Either:
    1. Click on the ML2Sheets extension icon in the Chrome toolbar and then click **Send Data**.
    2. Right-click on the page and select **Send Data to Google Sheets** from the context menu.
    3. Press `Ctrl+Shift+U` to trigger the data extraction and sending to Google Sheets.

3. **Verify the Data:**
   - Open your Google Sheet to confirm that the new row with product details has been added.

## Prerequisites 📋

- **Google Account:** Required to access Google Sheets and Google Apps Script.
- **Google Sheet:** Create a Google Sheet where the product data will be stored.
- **Google Apps Script Web App:** Set up and deploy a Google Apps Script Web App to handle incoming data.
- **Chrome Browser:** For installing and testing the extension.
- **VS Code or any Code Editor:** To modify the extension code if needed.
- **Shell Environment:** To run the provided project creation script (optional).

## Installation 🛠️

1. **Download or Clone the Repository:**
   - Clone this repository or download the source code to your local machine.

2. **Automatically Create the Project Structure:**
   - Run the provided shell script to create all necessary files and folders:

     ```bash
     chmod +x create_ml2sheets.sh
     ./create_ml2sheets.sh
     ```

   - This will create a folder named `ml2sheets` with all the required files.

3. **Load the Extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" using the toggle at the top-right.
   - Click **Load unpacked** and select the `ml2sheets` folder.

## Setup ⚙️

### Google Apps Script & Google Sheets Integration

1. **Create a Google Sheet:**
   - Create a new Google Sheet where the product data will be stored.

2. **Set Up Google Apps Script:**
   - Open your Google Sheet.
   - Go to **Extensions > Apps Script**.
   - Create a new project and paste the following code:

     ```js
     function doGet(e) {
       // Returns a simple message to confirm the web app is running 
       return ContentService.createTextOutput("ML2Sheets Web App is running!");
     }

     function doPost(e) {
       // Parse the incoming JSON data 
       var data = JSON.parse(e.postData.contents);

       // Open the Google Sheet by ID (replace "YOUR_SHEET_ID" with your actual Sheet ID) 
       var sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getActiveSheet();
  
       // Append the data as a new row in the sheet 
       sheet.appendRow(data);
  
       return ContentService.createTextOutput("Row added successfully ");
     }
     ```

   - Replace `"YOUR_SHEET_ID"` with your actual Google Sheet ID.
   - Deploy the script as a Web App:
     - Click on **Deploy > New deployment**.
     - Choose **Web App** as the deployment type.
     - Set access to **Anyone, even anonymous**.
     - Copy the Web App URL.

3. **Configure the Extension:**
   - In Chrome, click on the ML2Sheets extension icon.
   - Open the Options page (accessible from the extension details).
   - Enter your Google Apps Script Web App URL and click **Save Options**.
   - Enter the CSS selectors for the data fields you want to extract, separated by commas. The default selectors are:
     - `h1.ui-pdp-title` for the product title
     - `.andes-money-amount__fraction[aria-hidden="true"]` for the price
     - `.ui-pdp-buybox__quantity__available` for the shipping cost
     - `.ui-pdp-seller__header__title` for the seller

## Customization and Further Development 🔧

- **Selectors:**  
  The CSS selectors used to extract data can be configured via the extension's Options page. By default, the following selectors are used:
  - `h1.ui-pdp-title` for the product title
  - `.andes-money-amount__fraction[aria-hidden="true"]` for the price
  - `.ui-pdp-buybox__quantity__available` for the shipping cost
  - `.ui-pdp-seller__header__title` for the seller
  You can adjust these selectors based on the current MercadoLibre page structure.

- **Error Handling:**  
  You can enhance error handling as needed for production use.

- **Additional Fields:**  
  Modify the data extraction logic to include any extra fields you might need.

## Contributing 🤝

Contributions are welcome! Feel free to fork the repository, submit issues, or open pull requests to help improve the extension. Please ensure that all code is well-documented and follows the project's style guidelines.

## License 📄

This project is licensed under the [MIT License](LICENSE).

## Contact 📧

If you have any questions or need support, please open an issue in the repository.

---

Happy coding!
