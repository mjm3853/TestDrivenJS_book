module.exports = {
    'Testing convertCurrency': function (test) {
        var actualResult = '1.59'

        test.open('file:///home/matt/tddJS/ch3-testingTools/DalekJS/index.html')
            .type('#amount', '100')
            .type('#rateOfConversion', '63')
            .click('#convert')
            .assert.val('#toCurrencyAmount', '$1.59')
            .screenshot('test2.png')
            .done();
    }
};