const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");

fetch("https://api.frankfurter.app/currencies")
  .then((response) => response.json())
  .then((data) => {
    for (const currency in data) {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = `${data[currency]}`;
      fromCurrencySelect.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = `${data[currency]}`;
      toCurrencySelect.appendChild(option2);
    }
    fromCurrencySelect.value = "USD";
    toCurrencySelect.value = "INR";
    fromCurrencyCode.textContent = fromCurrencySelect.value;
    toCurrencyCode.textContent = toCurrencySelect.value;
  })
  .catch((error) => {
    console.error("Error fetching currencies:", error);
  });

function updateValue() {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  fromCurrencyCode.textContent = fromCurrency;
  toCurrencyCode.textContent = toCurrency;

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
      result.textContent = `${convertedAmount}`;
    })
    .catch((error) => {
      console.error("Error fetching exchange rate:", error);
    });
}
