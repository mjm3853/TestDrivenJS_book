if (!Object.observe){
    alert('Your browser does not support Object.observe. This demo will not work.');
}

console.log("Your browser supports Object.observe");

var employee = {
    status: {},
    StatusModified: false
};

var inactive = "Active";

Object.defineProperty(employee.status, 'Active', {
    get: () => {
        return inactive;
    },
    
    set: (status) => {
        Object.getNotifier(this).notify({
           type: 'update',
           name: 'Inactive',
           oldValue: inactive 
        });
        
        console.log('set', status);
        
        inactive = b;
    }
});

Object.observe(employee, (modifications) => {
   modifications.forEach((modification, i) => {
       console.log(modification);
   }); 
});

employee.status = 'Employee Status';

employee.modifiedby = Date.now();

delete employee.StatusModified;