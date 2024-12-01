// API Endpoints
const countryListAPI = "https://restcountries.com/v3.1/all?fields=name,currencies,flag";
const baseExchangeRateAPI = "https://v6.exchangerate-api.com/v6/7fdca965a1453b0c96617bfa/pair"; // Replace `yourApiKey` with your actual API key

// DOM Elements
const amountInput = document.getElementById("amount");
const fromCurrencyDropdown = document.getElementById("from-currency");
const toCurrencyDropdown = document.getElementById("to-currency");
const convertButton = document.getElementById("convert-btn");
const resultText = document.getElementById("result");
const errorText = document.getElementById("error");

// Fetch Country and Currency Data
async function fetchCountryData() {
  try {
    const response = await fetch(countryListAPI);
    const countries = await response.json();

    // Populate dropdowns with country data
    populateDropdowns(countries);
  } catch (error) {
    displayError("Failed to fetch country data.");
  }
}

// Populate Dropdown Menus
function populateDropdowns(countries) {
  countries.forEach((country) => {
    if (country.currencies) {
      const currencyCode = Object.keys(country.currencies)[0];
      const currencyName = country.currencies[currencyCode].name;
      const flag = country.flag;

      const optionHTML = `<option value="${currencyCode}">${flag} ${currencyCode} - ${currencyName}</option>`;

      fromCurrencyDropdown.innerHTML += optionHTML;
      toCurrencyDropdown.innerHTML += optionHTML;
    }
  });
}

// Handle Conversion
async function convertCurrency() {
  // Validate input
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencyDropdown.value;
  const toCurrency = toCurrencyDropdown.value;

  if (!amount || !fromCurrency || !toCurrency) {
    displayError("Please enter a valid amount and select currencies.");
    return;
  }

  try {
    // Fetch exchange rate
    const response = await fetch(`${baseExchangeRateAPI}/${fromCurrency}/${toCurrency}`);
    const data = await response.json();

    if (data.result === "success") {
      const rate = data.conversion_rate;
      const convertedAmount = (amount * rate).toFixed(2);
      displayResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    } else {
      displayError("Failed to fetch exchange rate.");
    }
  } catch (error) {
    displayError("An error occurred during conversion.");
  }
}

// Display Result
function displayResult(message) {
  errorText.style.display = "none";
  resultText.style.display = "block";
  resultText.textContent = message;
}

// Display Error
function displayError(message) {
  resultText.style.display = "none";
  errorText.style.display = "block";
  errorText.textContent = message;
}

// Event Listeners
convertButton.addEventListener("click", (e) => {
  e.preventDefault();
  convertCurrency();
});

// Initialize App
fetchCountryData();
