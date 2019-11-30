const util = require('util');
const http = require('http');
const fs = require('fs');
const queries = require('./queries');
const jwt = require('jsonwebtoken');
const port = 8000;
const hostname = "127.0.0.1";

exports.close = () => {
  server.close();
}

function sendAdminLogin(request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.end(fs.readFileSync("./html/index.html"));
}

async function _readBody(request) {
  let body = [];
  return new Promise(function (resolve, reject) {
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      Headers = jwt.decode(body);
      body = jwt.verify(body, 'secret', 'complete');
      console.log(body.info);
      resolve(body.info.substring(1, body.info.toString().length - 1).split(",")); // trims brackets and divides each pair into . . .
    }).on('err', (err) => {
      reject(err);
    })
  });
}

async function processLogin(request, response) {
  let body = await _readBody(request);
  elArr = [];
  try {
    body.forEach(element => {
      element = element.replace(/\s+/g, ''); // get rid of whitespace
      element = element.split('=' || ':'); // split the pairs, creating a 2d arr
      elArr.push(element); // . . . an array element
    });
    queries.find("select distinct * from users where Uname=? AND Hash=?", [elArr[0][1], elArr[1][1]], response);
  } catch (err) {
    console.log(err);
  }
  // at this point, `body` has the entire request body stored in it as a string 
};

async function registerUser(request, response) {
  keyInserts = valInserts = "";
  let body = await _readBody(request);
  elArr = [];
  let arg1;
  body.forEach((element, index) => {
    if (index !== 0) {
      keyInserts += ', ';
      valInserts += ', ';
    }
    element = element.replace(/\s+/g, ''); // get rid of whitespace
    element = element.split('='); // split the pairs, creating a 2d arr
    if (element[0] === "Uname") { arg1 = element[1]; }
    keyInserts += element[0];
    valInserts += '?'; // . . . an array element
    elArr.push(element[1]);
  });
  let isAvailable = await queries.check("select * from users where Uname=?", [arg1], response);
  if (isAvailable) {
    sql = "insert into users (" + keyInserts + ") values (" + valInserts + ")";
    await queries.insert(sql, elArr, response);
  } else {
    response.statusCode = 409;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Username is already in use");
  }
};

const server = http.createServer((req, res) => {
  if (req.method == 'GET') {
    sendAdminLogin(req, res);
    //if (req.headers.host === hostname + ":" + port) {
    //}
  } else if (req.method == 'PUT') {
    if (req.url === '/login') {
      processLogin(req, res);
    }
  } else if (req.method === 'POST') {
    if (req.url === '/register') {
      registerUser(req, res);
    }
  } else if (req.method === 'DELETE') {}

});

server.listen(port, hostname, () => {
  console.log("Server running at http://" + hostname + ':' + port);
});
