var EventEmitter = require("events").EventEmitter;
var eventEmitter = new EventEmitter();
eventEmitter.on("touch", function() {
    console.log("Touch event has occured");
});

eventEmitter.emit("touch");