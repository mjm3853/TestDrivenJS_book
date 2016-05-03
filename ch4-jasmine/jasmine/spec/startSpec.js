describe("Starting suite", function () {
    var numberA = 3, numberB = 2;

    it("Testing the add() function", function () {
        expect(add(numberA, numberB)).toEqual(5);
    });
});