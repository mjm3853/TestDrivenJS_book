function convertCurrency(amount, rateOfConversion) {
    var toCurrencyAmount = 0;
    toCurrencyAmount = 1/rateOfConversion * amount;
    toCurrencyAmount = parseFloat(toCurrencyAmount).toFixed(2);
    document.getElementById('toCurrencyAmount').value = '$'+toCurrencyAmount;
}