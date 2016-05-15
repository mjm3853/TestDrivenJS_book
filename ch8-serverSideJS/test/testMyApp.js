var assert = require("chai").assert;
var http = require("http");
var userLogin = require("../routes/user");
var mongoose = require("mongoose");

var server = require("../custom_modules/server.js");

var url = "http://localhost";
var port = "8000";

var db;


before((done) => {
    db = mongoose.connect('mongodb://localhost:27017/nodedb');
    done();
});


after((done) => {
    mongoose.connection.close();
});


beforeEach((done) => {
    var user = new userLogin({
        username: 'testuser',
        password: 'test'
    });
});


afterEach((done) => {
    userLogin.remove({username: 'testuser'}, () => {
       if (error) console.log("Error while removing user", error.message);
       else console.log('user removed from the database successfully');
       done(); 
    });
});
    




describe('Testing Running Status of Server', () => {

    it('should return a 200 response', (done) => {
        var app = server();
        http.get(url + ":" + port, (response) => {
            assert.equal(response.statusCode, 200);
            done();
        });
    });
    
    
    it('should return the login page', (done) => {
        http.get(url + ":" + port, (response) => {
           var htmlData;
           response.on("data", (data) => {
              htmlData = data; 
           }).on("end", () => {
               assert.isTrue(htmlData.indexOf("<title>Login</title>") != -1);
               done();
           }); 
        });
    });
        
        
});
