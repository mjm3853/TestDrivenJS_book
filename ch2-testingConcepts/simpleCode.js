function convertCurrency(amount, rateOfConversion) {
    //logic goes here
    var toCurrencyAmount = 0;
    toCurrencyAmount = amount * rateOfConversion;
    toCurrencyAmount = Number.parseFloat(toCurrencyAmount).toFixed(2);
    return toCurrencyAmount;
}