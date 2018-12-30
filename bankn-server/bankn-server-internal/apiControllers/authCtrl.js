var express = require('express');

var userRepo = require('../repos/userRepo');
var authRepo = require('../repos/authRepo');

var router = express.Router();


router.post('/', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password,
    }
    userRepo.login(user).then(rows => {
        if (rows.length > 0) {
            var loginEntity = rows[0];
            var acToken = authRepo.generateAccessToken(loginEntity);
            var rfToken = authRepo.generateRefreshToken();
            authRepo.updateRefreshToken(loginEntity.id, rfToken).then(value => {
                let object = {
                    auth: 1,
                    access_token: acToken,
                    refresh_token: rfToken,
                    role: loginEntity.role,
                    id: loginEntity.id
                };
                res.status = 200;
                res.json(object);
            })
                .catch(err => {
                    console.log('update refresh token: ' + err);
                    res.status = 500;
                    res.end('View error log on console');
                })
        } else {
            res.json({
                auth: 0,
                msg: 'tài khoản hoặc mật khẩu không đúng'
            })
        }
    })
        .catch(err => {
            console.log(err);
            res.status = 500;
            res.end('View error log on console');
        })
})

router.post('/updateAccessToken', (req, res) => {
    authRepo.updateAccessToken(req.body.refresh_token).then(token => {
        console.log("token" + token);
        res.status = 200;
        res.json = {
            access_token: token
        }
    }).catch(err => {
        res.status = 401;
        res.json = {
            access_token: "",
            msg: "wrong refresh token"
        }
    })
})

module.exports = router;