
describe('Custom spy object', () => {
    var car;


    beforeEach(() => {
        car = jasmine.createSpyObj('car', ['start', 'stop', 'openDoor']);
        car.start();
        car.stop();
        car.openDoor();
    });


    it('Expect car to be started', () => {
        expect(car.start).toHaveBeenCalled();
    });


    it('Expect car to be stopped', () => {
        expect(car.stop).toHaveBeenCalled();
    });
});
