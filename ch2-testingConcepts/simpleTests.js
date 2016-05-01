YUI().use('test-console', 'test', function (Y) {
    //tests go here
    var testCase = new Y.Test.Case({

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

    //render the test console
    new Y.Test.Console({
        newestOnTop: false,
    }).render('#testLogs');

    Y.Test.Runner.add(testCase);

    //run the tests
    Y.Test.Runner.run();
});