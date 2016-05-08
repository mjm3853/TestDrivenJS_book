
describe('Custom Spy', () => {
    
    var alice;
    
    beforeEach(() => {
        alice = new Employee("Alice", 5, "Testing");
        
        alice.assignTask = jasmine.createSpy("assignTask");
        alice.getName = jasmine.createSpy("getName").and.returnValue("Ms Alice");
    });
    
    
    it('Expect assignTask to be defined', () => {
        expect(alice.assignTask).toBeDefined();
    });
    
    
    it('Expect assignTas to be called with arguments', () => {
        alice.assignTask("Test the login of application");
        expect(alice.assignTask.calls.argsFor(0)).toEqual(["Test the login of application"]);
    });
        
    
    it('Expect name to be with title Mr or Ms', () => {
        console.log(alice.getName());
        expect(alice.getName()).toEqual("Ms Alice");
    });
        
});
