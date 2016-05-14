var expect = require("chai").expect;
var convertCurrency = require("../custom_modules/currency-converter.js");

describe('Convert Currency', () => {

    it('100 INR should be equal to $1.59', () => {
        expect(convertCurrency(100, 1 / 63)).to.equal('1.59');
    });

});