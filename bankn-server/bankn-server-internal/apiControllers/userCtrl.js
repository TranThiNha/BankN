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
        console.log(JSON.stringify(user));
    }).catch(err=>{
        res.json({
            msg: 'error nha'
        })
    })
    
})

module.exports = router;