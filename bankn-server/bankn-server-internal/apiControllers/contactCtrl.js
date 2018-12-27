var express = require('express');

var contactRepo = require('../repos/contactRepo');

var router = express.Router();

router.get('/', (req, res) => {
    var user = {
        id: req.headers['x-access-token']
    }
    contactRepo.loadContactsByUser(user).then((rows) => {
        res.json({
            contacts: rows
        })
    }).catch(err => {
        console.log(err);
        res.statusCode = 500
    })
})


router.post('/', (req, res) => {
    var contactEnity = {
        id: req.headers['x-access-token'],
        nameSug: req.body.nameSug,
        accountNumer: req.body.accountNumer
    }
    contactRepo.addContactByUser(contactEnity).then((rows) => {
        res.json({
            contacts: rows
        })
    }).catch(err => {
        console.log(err);
        res.statusCode = 500
    })
})

module.exports = router;