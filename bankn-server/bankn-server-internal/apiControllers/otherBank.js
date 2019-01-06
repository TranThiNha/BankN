var express = require('express');

var otherBank = require('../repos/otherBankRepo');

var router = express.Router();

router.get('/', (req, res) => {
    otherBank.loadAllOtherBank().then((rows) => {
        res.json({
            otherBanks: rows,
            msg: 'success!'
        })
    }).catch(err => {
        res.json({
            msg: 'error query database'
        })
        res.statusCode = 500
    })
})

router.get('/:id', (req, res) => {
    otherBank.loadOtherBankById(req.params.id).then((rows) => {
        if (rows.length > 0) {
            res.json({
                otherBanks: rows[0],
                msg: 'success!'
            })
        } else {
            res.json({
                otherBanks: null,
                msg: 'id bank invalid!'
            })
        }
        
    }).catch(err => {
        res.json({
            msg: 'error query database'
        })
        res.statusCode = 500
    })
})

module.exports = router;