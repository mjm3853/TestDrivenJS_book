function convertCurrency(amount, rateOfConversion) {
    var toCurrencyAmount = 0;
    toCurrencyAmount = rateOfConversion * amount;
    toCurrencyAmount = parseFloat(toCurrencyAmount).toFixed(2);
    return toCurrencyAmount;
}