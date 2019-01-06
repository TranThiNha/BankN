var express = require('express');

var contactRepo = require('../repos/contactRepo');
var accountRepo = require('../repos/accountRepo');
var router = express.Router();

router.get('/', (req, res) => {
    var user = {
        id: req.id
    }
    if (user.id != undefined) {
        contactRepo.loadContactsByUser(user).then((rows) => {
            rows.forEach(row => {
                if (row.nameSug === null) row.nameSug = row.full_name
            });
            res.json({
                contacts: rows
            })
        }).catch(err => {
            console.log(err);
            res.statusCode = 500
        })
    } else {
        res.json({
            error: 'id user id undefined'
        })
    }
})

router.post('/', (req, res) => {
    var contactEnity = {
        id: req.id,
        nameSug: req.body.nameSug,
        accountNumber: req.body.accountNumber
    }
    if (contactEnity.id != undefined && contactEnity.accountNumber != undefined) {
        accountRepo.findAccountNumber(contactEnity.accountNumber).then(rows => {
            if (rows.length > 0) {
                if (contactEnity.nameSug == undefined || contactEnity.nameSug == "" || contactEnity.nameSug == null) {
                    contactEnity.nameSug = rows[0].full_name;
                }
                contactRepo.addContactByUser(contactEnity).then(() => {
                    res.status = 200;
                    res.json({
                        msg: 'success!'
                    })
                }).catch(err => {
                    if (err === 'ER_DUP_ENTRY') {
                        res.json({
                            code: 'ER_DUP_ENTRY',
                            msg: 'duplicate!'
                        })
                    } else {
                        console.log(err);
                        res.statusCode = 500
                    }
                })
            } else {
                res.json({
                    msg: 'account number invalid!'
                })
            }
        }).catch(err => {
            console.log(err);
            res.statusCode = 500
        })
    } else {
        res.statusCode = 500;
        res.json({
            msg: 'has one filed undefine'
        })
    }
})

router.delete('/', (req, res) => {
    var contactEnity = {
        id: req.headers['x-access-token'],
        accountNumer: req.body.accountNumer
    }
    contactRepo.removeContactByUser(contactEnity).then(() => {
        res.status = 200;
        res.json({
            msg: 'success!'
        })
    }).catch(err => {
        console.log(err);
        res.statusCode = 500
    })
})

module.exports = router;