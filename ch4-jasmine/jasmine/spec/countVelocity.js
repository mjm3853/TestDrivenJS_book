describe("Setup and Teardown. With Velocity and Counts", function () {
    var count = 0;
    var velocity = 0;
    beforeEach(function () {
        velocity = 100;
        count++;
        console.log("Count is", count);
    });

    afterEach(function () {
        velocity = 0;
        console.log("Some spec just finished and this function is called.");
    });

    beforeAll(function () {
        console.log("The beforeAll function is called only once, and then specs are run.")
    });

    afterAll(function () {
        console.log("Should be the last function after all specs are finished. Teardown time.")
    });
    
    it("Testing Velocity and reducing", function(){
       expect(velocity).toEqual(100);
       velocity = 20;
       expect(velocity).toEqual(20); 
    });
    
    it("Just testing Velocity", function(){
       expect(velocity).toEqual(100); 
    });
});