var convertCurrency = (amount, rateOfConversion) => {

    var toCurrencyAmount = 0;

    toCurrencyAmount = amount * rateOfConversion;
    toCurrencyAmount = parseFloat(Math.round(toCurrencyAmount * 100) / 100).toFixed(2);

    return toCurrencyAmount;
}

module.exports = convertCurrency;