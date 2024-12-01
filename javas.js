async function populateCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
  
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies,flag');
      const countries = await response.json();
  
      countries.forEach((country) => {
        const currencyCode = Object.keys(country.currencies)[0];
        const currencyName = country.currencies[currencyCode].name;
        const flag = country.flag;
  
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');
  
        optionFrom.value = currencyCode;
        optionFrom.textContent = `${flag} ${currencyCode} - ${currencyName}`;
        optionTo.value = currencyCode;
        optionTo.textContent = `${flag} ${currencyCode} - ${currencyName}`;
  
        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
      });
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  }
  
  window.addEventListener('DOMContentLoaded', populateCurrencies);