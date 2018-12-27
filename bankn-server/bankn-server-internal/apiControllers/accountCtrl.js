var express = require('express');

var accountRepo = require('../repos/accountRepo');

var router = express.Router();

router.get('/', (req, res) => {
    var user = {
        id: req.headers['x-access-token']
    }
    if (user.id) {
        accountRepo.loadAccontByUser(user).then((rows) => {
            res.json({
                accounts: rows,
                msg: 'success!'
            })
        }).catch(err => {
            console.log('accountCtrl: ' + err);
            res.json({
                msg: 'error query databse'
            })
            res.statusCode = 500
        })
    } else {
        res.json({
            msg: 'token null'
        })
    }
    
})

router.post('/', (req, res) => {
    res.json({
        msg: 'chưa viết!!!'
    })
})

module.exports = router;