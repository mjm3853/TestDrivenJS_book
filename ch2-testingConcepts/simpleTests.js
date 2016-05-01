YUI().use('test-console', 'test', function (Y) {

    var suite = new Y.Test.Suite("Simple currency conversion suite");

    //tests go here
    var testINRCase = new Y.Test.Case({
        name: "Simple INR currency conversion case",
        
        setUp: function () {
            this.expectedResult = 1.59;
        },

        tearDown: function () {
            delete this.expectedResult;
        },

        testData: function () {
            Y.Assert.areEqual(this.expectedResult, convertCurrency(100, 1 / 63), "100 INR should be equal to $ 1.59");
        }
    });
    
    var testFakeCase = new Y.Test.Case({
        name: "Simple Fake currency conversion case",
        
        setUp: function(){
            this.expectedResult = 1.00;
        },
        
        tearDown: function (){
            delete this.expectedResult;
        },
        
        testData: function (){
            Y.Assert.areEqual(this.expectedResult, convertCurrency(100, 1/100), "100 Fake should be equal to $ 1.00");
        }
    })

    //render the test console
    new Y.Test.Console({
        newestOnTop: false,
    }).render('#testLogs');

    suite.add(testINRCase);
    suite.add(testFakeCase);

    Y.Test.Runner.add(suite);

    //run the tests
    Y.Test.Runner.run();
});