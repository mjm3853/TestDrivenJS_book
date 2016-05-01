YUI().use('test-console', 'test', function (Y) {

    var suite = new Y.Test.Suite("SimpleSuite1");

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

    suite.add(testCase);

    Y.Test.Runner.add(suite);

    //run the tests
    Y.Test.Runner.run();
});