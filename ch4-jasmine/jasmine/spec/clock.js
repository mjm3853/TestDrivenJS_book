
describe('Clock tests', () => {

    var employee;

    beforeEach(() => {
        employee = new Employee("Alice", 5, "Testing");
        employee.checkAvailability = jasmine.createSpy("checkAvailability");
        jasmine.clock().install();
    });


    afterEach(() => {
        jasmine.clock().uninstall();
    });


    it('Checks if Alice is available after one hour', () => {
        setTimeout(() => {
            employee.checkAvailability()
        }, 60 * 60 * 1000);

        expect(employee.checkAvailability).not.toHaveBeenCalled();

        jasmine.clock().tick(60 * 60 * 1000);

        expect(employee.checkAvailability).toHaveBeenCalled();
    });


    it('Checks if Alice is available for the next 3 hours', () => {
        setInterval(() => {
            employee.checkAvailability();
        }, 60 * 60 * 1000);

        expect(employee.checkAvailability).not.toHaveBeenCalled();

        jasmine.clock().tick(60 * 60 * 1000 + 1);
        expect(employee.checkAvailability.calls.count()).toEqual(1);

        jasmine.clock().tick(60 * 60 * 1000 + 1);
        expect(employee.checkAvailability.calls.count()).toEqual(2);

        jasmine.clock().tick(60 * 60 * 1000 + 1);
        expect(employee.checkAvailability.calls.count()).toEqual(3);
    });


});
