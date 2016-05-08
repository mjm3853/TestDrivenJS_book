describe("Jasmine Spy", function () {

    it("Spying Employee", function () {
        var alice = new Employee("Alice", 4, "Testing");
        spyOn(alice, "calculateSalary");
        console.log(alice.getDetails());
        expect(alice.calculateSalary).toHaveBeenCalled();
    });

    it("Spying Employee with call through", function () {
        var alice = new Employee("Alice", 4, "Testing");
        spyOn(alice, "calculateSalary").and.callThrough();
        var salary = alice.getSalary();
        expect(alice.calculateSalary).toHaveBeenCalled();
        console.log("Salary is : " + salary);
        expect(salary).toEqual(4000);
    });

    it("Spying Employee with return value", function () {
        var alice = new Employee("Alice", 4, "Testing");
        spyOn(alice, "calculateSalary").and.returnValue(9999);
        alice.calculateSalary();
        expect(alice.calculateSalary).toHaveBeenCalled();
        expect(alice.calculateSalary()).toEqual(9999);
    });

    it("Spying Employee with fake call", function () {
        var alice = new Employee("Alice", 4, "Testing");
        spyOn(alice, "calculateSalary").and.callFake(function (grade) {
            var tSalary = 1000;
            return tSalary * grade;
        });
        var salary = alice.calculateSalary(10);
        expect(alice.calculateSalary).toHaveBeenCalled();
        expect(salary).toEqual(10000);
    });

    it("Tracking spies with calls property", function () {
        var alice = new Employee("Alice", 4, "Testing");

        spyOn(alice, "calculateSalary").and.callThrough();
        var salary = alice.getSalary();

        alice.calculateSalary.and.stub();
        salary = alice.getSalary();
        expect(salary).toEqual(4000);

        expect(alice.calculateSalary.calls.any()).toEqual(true);
        expect(alice.calculateSalary.calls.count()).toEqual(1);
        console.log(alice.calculateSalary.calls.argsFor(0));
        expect(alice.calculateSalary.calls.argsFor(0)).toEqual([]);

        alice.calculateSalary(1000);

        console.log(alice.calculateSalary.calls.argsFor(1));
        expect(alice.calculateSalary.calls.allArgs());
        expect(alice.calculateSalary.calls.allArgs()).toEqual([[], [1000]]);
    });
});