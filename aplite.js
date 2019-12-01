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
  console.log("Reading request");
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

async function _processPostBody(body) {
  console.log("Parsing post data");
  keyInserts = valInserts = arg1 = arg2 = "";
  elArr = [];
  return new Promise(function (resolve) {
    body.forEach((element, index) => {
      if (index !== 0) {
        keyInserts += ', ';
        valInserts += ', ';
      }
      element = element.replace(/\s+/g, ''); // get rid of whitespace
      element = element.split('=' || ':'); // split the pairs, creating a 2d arr
      if (element[0] === "Uname") {
        arg1 = element[1];
      } else if (element[0] === "Hash") {
        arg2 = element[1];
      }


      keyInserts += element[0];
      valInserts += '?'; // . . . an array element
      elArr.push(element[1]);
    });
    args = [arg1, arg2];
    resolve(elArr, keyInserts, valInserts, args);
  })
}

async function _processGetBody(body) {
  console.log("Parsing get data");
  elArr = [];
  return new Promise(function (resolve) {
    body.forEach(element => {
      element = element.replace(/\s+/g, ''); // get rid of whitespace
      element = element.split('=' || ':'); // split the pairs, creating a 2d arr
      elArr.push(element[1]); // . . . an array element
    })
    resolve(elArr);
  });
}

async function processLogin(request, response) {
  try {
    let body = await _readBody(request);
    elArr = [];
    elArr = await _processGetBody(body);
    await queries.find("select distinct * from users where Uname=? AND Hash=?", elArr, response);  } catch (error) {
    console.log(error);
    response.statusCode = 409;
    response.setHeader('Content-Type', 'text/plain');
    response.end("bad inputs");
  }
  // at this point, `body` has the entire request body stored in it as a string 
};



async function registerUser(request, response) {
  let body = await _readBody(request);
  elArr, keyInserts, valInserts, arg1 = await _processPostBody(body);
  let isAvailable = await queries.check("select * from users where Uname=?", [args[0]], response);
  if (isAvailable) {
    sql = "insert into users (" + keyInserts + ") values (" + valInserts + ")";
    await queries.insert(sql, elArr, response, args);
  } else {
    response.statusCode = 409;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Username is already in use");
  }
};

async function addLog(request, response) {
  let body = await _readBody(request);
  keyInserts = valInserts = arg1 = "";
  elArr = [];
  elArr, keyInserts, valInserts, arg1 = await _processPostBody(body);
  let isAvailable = await queries.check("select * from users where Uname=?", [args[0]], response);
  if (isAvailable) {
    sql = "insert into vitals (" + keyInserts + ") values (" + valInserts + ")";
    await queries.insert(sql, elArr, response, args);
  } else {
    response.statusCode = 409;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Username is already in use");
  }
// at this point, `body` has the entire request body stored in it as a string 
};

async function getLogs(request, response) {
  try {
    let body = await _readBody(request);
    console.log("so far so good");
    elArr = [];
    elArr = await _processGetBody(body);
    await queries.find("select * from vitals where Hash=?", [elArr[1]], response);  
  } catch (error) {
    console.log(error);
    response.statusCode = 409;
    response.setHeader('Content-Type', 'text/plain');
    response.end("bad inputs");
  }

  // at this point, `body` has the entire request body stored in it as a string 
};

const server = http.createServer((req, res) => {
  if (req.method == 'GET') {
    if (req.url === '/ref') {
      getLogs(req, res);
    }
    //sendAdminLogin(req, res);
  } else if (req.method == 'PUT') {
    if (req.url === '/login') {
      processLogin(req, res);
    }
  } else if (req.method === 'POST') {
    if (req.url === '/register') {
      registerUser(req, res);
    } else if (req.url === '/log') {
      addLog(req, res);
    }
  } else if (req.method === 'DELETE') {}

});

server.listen(port, hostname, () => {
  console.log("Server running at http://" + hostname + ':' + port);
});