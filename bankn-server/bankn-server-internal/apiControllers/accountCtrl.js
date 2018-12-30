var express = require('express');

var accountRepo = require('../repos/accountRepo');
var authRepo = require('../repos/authRepo');
var userRepo = require('../repos/userRepo');
var txRepo = require('../repos/transactionRepo');
var creditcardGenerator = require("creditcard-generator")

var router = express.Router();

router.get('/', (req, res) => {
    var user = {
        id: req.id
    }
    accountRepo.loadAccountsByUser(user).then((rows) => {
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
})

router.get('/:id', (req, res) => {
    var user = {
        id: req.params.id
    }
    var p1 = userRepo.loadUserById(user.id);
    var p2 = accountRepo.loadAccountsByUser(user);
    Promise.all([p1, p2]).then(([p1Rows, p2Rows]) => {
        res.json({
            user: p1Rows[0],
            accounts: p2Rows,
            msg: 'success!'
        })
    }).catch(err => {
        console.log('accountCtrl: ' + err);
        res.json({
            msg: 'error query databse'
        })
        res.statusCode = 500
    })
})

router.put('/balance', (req, res) => {
    var account = {
        accountNumber: req.body.accountNumber,
        amount: req.body.amount
    }
    accountRepo.addMoney(account).then(() => {
        res.status = 200;
        res.json({
            msg: 'success!'
        })
    }).catch(err => {
        res.json({
            msg: 'error query'
        })
    })
})

router.post('/', (req, res) => {
    var accountNumber = creditcardGenerator.GenCC();
    var account = {
        user_id: req.body.userId,
        accountNumber: accountNumber[0]
    }
    if (account.user_id != undefined) {
        accountRepo.insert(account).then(() => {
            res.status = 200;
            res.json({
                accountNumber: accountNumber[0],
                msg: 'success!'
            })
        }).catch(err => {
            res.json({
                msg: 'error query'
            })
        })

    } else {
        res.json({
            msg: 'user id undefined'
        })
    }
})


router.post('/', (req, res) => {

    res.json({
        accountNumber: accountNumber,
        msg: 'chưa viết!!!'
    })
})

router.put('/remove', (req, res) => {
    var account = {
        user_id: req.id,
        accountNumber: req.body.accountNumber
    }

    if (account.accountNumber != undefined) {
        var p1 = accountRepo.countAccountByUserId(req.id);
        var p2 = accountRepo.loadAccontsByAccountNumber(account);

        Promise.all([p1, p2]).then(([p1Rows, p2Rows]) => {
            if (p1Rows[0].numberAccount == 1) {
                res.json({
                    granted: 0,
                    msg: 'no permission remove'
                })
            } else if (p1Rows[0].numberAccount > 1) {
                if (+p2Rows[0].balance > 0) {
                    res.json({
                        granted: 1,
                        msg: 'no permission remove because has money'
                    })
                } else if (+p2Rows[0].balance == 0) {
                    accountRepo.delete(account).then(() => {
                        res.json({
                            granted: 2,
                            msg: 'delete success'
                        })
                    }).catch(err => {
                        res.json({
                            msg: 'error query'
                        })
                    })
                }
            } else {
                res.json({
                    granted: -1,
                    msg: 'account number invalid!'
                })
            }
        })
    } else {
        res.json({
            msg: 'account number undefined'
        })
    }


})

module.exports = router;