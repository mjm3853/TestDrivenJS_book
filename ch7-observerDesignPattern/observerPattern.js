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