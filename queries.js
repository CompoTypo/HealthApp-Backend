const jwt = require('jsonwebtoken');
const sqlite = require('sqlite3').verbose();

function end(err, result, res) {
    if (err) {
        console.log(err.name, err.message, err.stack);
    } else {
        if (result === undefined || result === null) {
            result = 'proper request completed';
        } else {
            result = JSON.stringify(result);
        }
        console.log(result);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        let payload = {
            info: result
        }
        let sOpts = {
            issuer: 'server',
            subject: 'GoodRequest',
            expiresIn: '30m',
            algorithm: 'HS256'
        }
        let t = jwt.sign(payload, 'secret', sOpts);
        res.end(t.toString());

    }
}

exports.find = (sql, params, res) => {
    console.log(sql);
    return new Promise((resolve) => {
        new sqlite.Database('./sqlite.db').all(sql, params, (err, result) =>
            resolve(end(err, result, res)));
    });
}

exports.check = (sql, params) => {
    console.log(sql);
    return new Promise((resolve, reject) => {
        new sqlite.Database('./sqlite.db').get(sql, params, (err, row) => {
            if (err) {
                reject(console.error(err.message));
            }
            resolve(row ? 0 : 1);
        })
    });
}

exports.insert = (sql, params, res) => {
    console.log(sql);
    return new Promise((resolve) => {
        new sqlite.Database('./sqlite.db').run(sql, params, (err, result) =>
            resolve(end(err, result, res)));
    });
}