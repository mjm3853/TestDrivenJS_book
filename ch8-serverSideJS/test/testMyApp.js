var assert = require("chai").assert;
var http = require("http");

var server = require("../custom_modules/server.js");

var url = "http://localhost";
var port = "8000";

describe('Testing Running Status of Server', () => {

    it('should return a 200 response', (done) => {
        var app = server();
        http.get(url + ":" + port, (response) => {
            assert.equal(response.statusCode, 200);
            done();
        });
    });
});
