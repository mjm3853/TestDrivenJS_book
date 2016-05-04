describe("Jasmine Spy", function () {

    it("Spying Employee", function () {
        var alice = new Employee("Alice", 4, "Testing");
        spyOn(alice, "calculateSalary");
        console.log(alice.getDetails());
        expect(alice.calculateSalary).toHaveBeenCalled();
    })
});