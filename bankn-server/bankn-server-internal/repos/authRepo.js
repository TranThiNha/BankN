var jwt = require('jsonwebtoken'),
    rndToken = require('rand-token'),
    moment = require('moment'),
    db = require('../fn/mysql-db');

const SECRET = 'ABCDEF';
const AC_LIFETIME = 5000000;

exports.generateAccessToken = userEntity => {
    var payload = {
        user: userEntity,
        info: 'more info'
    }

    var token = jwt.sign(payload, SECRET, {
        expiresIn: AC_LIFETIME
    })

    return token;
}

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    console.log(token);

    if (token) {
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) {
                res.statusCode = 401;
                res.json({
                    auth: 2,
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO_TOKEN',
            auth: 0
        })
    }
}

var self = this;

exports.updateAccessToken = refresh_token => {
    return new Promise((resolve, reject) => {
        var sql = `select * from userRefreshTokenExt where rfToken = '${refresh_token}'`;
        console.log(sql);
        db.load(sql).then(values => {
            console.log(values);
            if (values.length > 0) {
                var token = self.generateAccessToken(refresh_token);
                 resolve(token);
            } else {
                reject({
                    msg: 'error refresh token'
                })
            }
        })
        .catch(err => {
            console.log(err)
            reject(err);
        });
    })
}

exports.generateRefreshToken = () => {
    const SIZE = 80;
    return rndToken.generate(SIZE);
}

exports.updateRefreshToken = (userId, rfToken) => {
    return new Promise((resolve, reject) => {
        var sql = `delete from userRefreshTokenExt where user_id = ${userId}`;
        db.insert(sql).then(value => {
            var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
            sql = `insert into userRefreshTokenExt values(${userId}, '${rfToken}', '${rdt}')`;
            return db.insert(sql);
        })
            .then(value => resolve(value))
            .catch(err => reject(err));
    })
}