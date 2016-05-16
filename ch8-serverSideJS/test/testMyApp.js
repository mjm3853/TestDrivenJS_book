var assert = require("chai").assert;
var http = require("http");
var userLogin = require("../custom_modules/user");
var TicketDetails = require("../custom_modules/ticket");
var mongoose = require("mongoose");
var should = require("should");

var server = require("../custom_modules/server.js");

var url = "http://localhost";
var port = "8000";

var mongoPath = 'mongodb://localhost:27017/nodedb';

var db;

describe('Testing Running Status of Server', () => {

    it('should return a 200 response', (done) => {
        //var app = server();
        http.get(url + ":" + port, (response) => {
            assert.equal(response.statusCode, 200);
            done();
        });
    });

});


describe('Test Login Module', () => {
    before((done) => {
        db = mongoose.connect(mongoPath);
        done();
    });


    after((done) => {
        mongoose.connection.close();
        done();
    });


    beforeEach((done) => {
        var user = new userLogin({
            username: 'testuser',
            password: 'test'
        });

        user.save(function (err) {
            if (err) console.log('error' + err);
            else console.log('no error in saving a new user');
            done();
        });
    });


    afterEach(function(done) {
		userLogin.remove({username: 'testuser'}, function(err) {
			if (err)
				console.log('error' + err);
			else 
				console.log('user removed from the database successfully');			
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
    
    
    it('should find a user by username', (done) => {
        userLogin.findOne({username: 'testuser'}, (err, user) => {
           user.username.should.eql('testuser');
           console.log("username: ", user.username)
           done(); 
        });
        
    });
        

describe('Users must login before accessing dashboard', () => {
    
    it('users must not access dashboard without login', (done) => {
        http.get(url + ":" + port + "/dashboard", (response) => {
           assert.equal(response.statusCode, 302);
           done(); 
        });
    });
        
});


describe('Testing ticket module', () => {
    
    before((done) => {
        db = mongoose.createConnection(mongoPath);
        done();
    });
    
    after((done) => {
       mongoose.connection.close();
       done(); 
    });
    
    
    beforeEach((done) => {
        var ticket = new TicketDetails({
           user: 'testuser',
           email: 'test@testdomain.com',
           issuetype: 'Access Related Issue',
           department: 'IT',
           ticketstate: 'Open',
           comments: 'not able to access the shared database URL',
           createddate: Date('2015-09-15') 
        });
        
        
    });
        
});
    
    

});

