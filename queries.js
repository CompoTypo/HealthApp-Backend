const jwt = require('jsonwebtoken');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./sqlite.db');

function end(err, result, res) {
    if (err) {
        console.log(err.name, err.message, err.stack);
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        if (typeof result !== 'undefined') {
            let payload = {
                info: JSON.stringify(result),
            }
            let sOpts = {
                issuer: 'server',
                subject: 'GoodReq',
                expiresIn: '30m',
                algorithm: 'HS256'
            }
            let t = jwt.sign(payload, 'secret', sOpts);
            res.end(t.toString());
        } else {
            res.end('Account,registered');
        }
    }
}

exports.find = (sql, params, res) => {
    db.all(sql, params, (err, result) =>
        end(err, result, res));
}

exports.check = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) { reject(console.error(err.message)); }
            resolve(row ? 0 : 1);
        })
    });
}

exports.insert = (sql, params, res) => {
    db.run(sql, params, (err, result) =>
        end(err, result, res));
}
