var assert = require('assert');
var http = require('http');
const fs = require('fs');
var api = require('./aplite');

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIvbG9naW4iLCJpc3MiOiJEZXNrdG9wQXBwVXNlIiwiZXhwIjoxNTc1MzE3MTY1LCJpbmZvIjoie1VuYW1lPTUyYmIzNDBhMDUxZTU4ZGY0OTI5YzU2M2U5YWM2MTA1ZGE3YzZhMmFhMzE0OGQ2NmY3NjBkOTkzOWI0NTE5YjMsIEhhc2g9NTExODJjMGY4YjJiNzRkNzM5MDYyMWM0NmM2MDYzNTRhZDU0ZTllNWE2YmIyNmU3ZWM5YzMyZmQ0NWQ3M2ZhM30ifQ.lF9k9LYkHCZizY3BOAACD7zMarh1oypWqDeuZl1vAGc'
var res = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjoiW3tcIlVJRFwiOjEsXCJGbmFtZVwiOlwiQWxiZXJ0XCIsXCJMbmFtZVwiOlwiRWluc3RlaW5cIixcIlVuYW1lXCI6XCI1MmJiMzQwYTA1MWU1OGRmNDkyOWM1NjNlOWFjNjEwNWRhN2M2YTJhYTMxNDhkNjZmNzYwZDk5MzliNDUxOWIzXCIsXCJFbWFpbFwiOlwiZWluc3RlaW5AZ21haWwuY29tXCIsXCJIYXNoXCI6XCI1MTE4MmMwZjhiMmI3NGQ3MzkwNjIxYzQ2YzYwNjM1NGFkNTRlOWU1YTZiYjI2ZTdlYzljMzJmZDQ1ZDczZmEzXCIsXCJET0JcIjpcIlR1ZUphbjIxMDA6MDA6MDBDU1QxNzc3XCIsXCJTZXhcIjpcIlwiLFwiUmFjZVwiOlwiXCIsXCJUeXBlXCI6XCJQYXRpZW50XCJ9XSIsImlhdCI6MTU3NTMyMzI2NywiZXhwIjoxNTc1MzI1MDY3LCJpc3MiOiJzZXJ2ZXIiLCJzdWIiOiJHb29kUmVxdWVzdCJ9.NQ7gYDez-84LLLgSjVrx4mPg8uVsHOQXoXszkdKtvKc'

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
