var expect = require("chai").expect;
var convertCurrency = require("../custom_modules/currency-converter.js");

describe('Convert Currency', () => {

    it('100 INR should be equal to $1.59', () => {
        expect(convertCurrency(100, 1 / 63)).to.equal('1.59');
    });
    
    it('200 INR should not be equal to $1.59', () => {
        expect(convertCurrency(200, 1 / 63)).to.not.equal('1.59');
    });

});