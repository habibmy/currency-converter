const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const resultDiv = document.getElementById("result");

// Fetch the list of available currencies from the Frankfurter API
fetch("https://api.frankfurter.app/currencies")
  .then((response) => response.json())
  .then((data) => {
    // Populate the currency options dropdowns
    for (const currency in data) {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = `${currency} - ${data[currency]}`;
      fromCurrencySelect.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = `${currency} - ${data[currency]}`;
      toCurrencySelect.appendChild(option2);
    }
  })
  .catch((error) => {
    console.error("Error fetching currencies:", error);
  });

function updateValue() {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = parseFloat(amountInput.value);

  if (fromCurrency != toCurrency) {
    convert(fromCurrency, toCurrency, amount);
  } else {
    alert("Choose Diffrent Currency");
  }
}

function convert(fromCurrency, toCurrency, amount) {
  // Fetch the exchange rate from Frankfurter API
  fetch(
    `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
  )
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.rates[toCurrency];
      if (!exchangeRate) {
        alert("Exchange rate not available.");
        return;
      }

      const convertedAmount = (amount * exchangeRate).toFixed(2);
      resultDiv.textContent = `${amount} ${fromCurrency} equals ${convertedAmount} ${toCurrency}`;
    })
    .catch((error) => {
      console.error("Error fetching exchange rate:", error);
    });
}
