var assert = require('assert');
var http = require('http');
const fs = require('fs');
var api = require('./aplite');


describe('GET Requests', function () {
    it('promise for good status', function (done) {
        http.get('http://127.0.0.1:8000', function (response) {
            assert.equal(200, response.statusCode);
        });
        done();
    })
});

describe('shut down', function () {
    it('stop server',function (done) {
        api.close();
        done();
    });
});
/*
describe('Login', function () {
    options.path = '/login';
    options.method = 'PUT';
    var d = '';
    var s = 0;
    const req = http.request(options, function (res) {
        console.log(res.statusCode);
        res.on('data', function (chunk) {
            d += chunk;
        });
        res.on('end', function () {
            console.log(d);
            s = res.statusCode
        });
        req.write(data);
        req.end();
    });
    it('promise for good status', function () {
        console.log(s);
        assert.equal(s, 200);
    });

    it('should return data, confirming successful login', function () {
        console.log(d);
        assert.equal(d, creds);
    });

});
*/