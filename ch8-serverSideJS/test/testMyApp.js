var assert = require("chai").assert;
var http = require("http");

var url = "http://localhost";
var port = "8000";

describe('Testing Running Status of Server', () => {

    it('should return a 200 response', (done) => {
        http.get(url + ":" + port, (response) => {
            assert.equal(response.statusCode, 200);
            done();
        });
    });
});
