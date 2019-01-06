var express = require('express');

var userRepo = require('../repos/userRepo');

var router = express.Router();

router.get('/', (req, res) => {
    userRepo.loadAll().then((rows) => {
        console.log(rows.length);
        res.json({
            accounts: rows,
            msg: 'success!'
        })
    }).catch(err => {
        console.log('accountCtrl: ' + err);
        res.json({
            msg: 'error query database'
        })
        res.statusCode = 500
    })
})

router.get('/:accountNumber', (req, res) => {
    userRepo.loadUserByAccountNumber(req.params.accountNumber).then((rows) => {
        if (rows.length > 0) {
            res.json({
                account: rows[0],
                msg: 'success!'
            })
        } else {
            res.json({
                accounts: null,
                msg: 'account number invalid'
            })
        }
    }).catch(err => {
        res.json({
            msg: 'error query database'
        })
        res.statusCode = 500
    })
})

router.post('/', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
    }
    userRepo.insert(user).then(()=> {
        res.status = 200;
        res.json({
            msg: 'success!'
        })
    }).catch(err=>{
        res.json({
            msg: 'error nha'
        })
    })
    
})

module.exports = router;