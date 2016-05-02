var convertINR = {
    currencyConversion: function (amount, rateOfConversion) {
        var toCurrencyAmount = 0;
        toCurrencyAmount = amount * rateOfConversion;
        toCurrencyAmount = parseFloat(toCurrencyAmount).toFixed(2);
        return toCurrencyAmount;
    }
}