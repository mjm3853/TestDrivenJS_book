YUI().use('test-console', function(Y){
    //tests go here
    var testCase = new Y.Test.Case({
       testCurrencyConversion: function(){
           var expectedResult = 1.59;
           var actualResult = convertCurrency(100, 1/63);
           
           Y.Assert.areEqual(expectedResult, actualResult, "100 INR should be equal to $ 1.59");
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