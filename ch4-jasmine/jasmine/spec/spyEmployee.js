describe("Jasmine Spy", function () {

    it("Spying Employee", function () {
        var alice = new Employee("Alice", 4, "Testing");
        spyOn(alice, "calculateSalary");
        console.log(alice.getDetails());
        expect(alice.calculateSalary).toHaveBeenCalled();
    });
    
    it("Spying Employee with call through", function(){
       var alice = new Employee("Alice", 4, "Testing");
       spyOn(alice, "calculateSalary").and.callThrough();
       var salary = alice.getSalary();
       expect (alice.calculateSalary).toHaveBeenCalled();
       console.log("Salary is : " + salary);
       expect(salary).toEqual(4000);
    });
});