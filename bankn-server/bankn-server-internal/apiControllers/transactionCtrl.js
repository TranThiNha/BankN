var express = require('express');

var txRepo = require('../repos/transactionRepo');

var router = express.Router();

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('YOUR_API_KEY');

router.get('/', (req, res) => {

    var user = {
        id: req.id
    }
    txRepo.loadTxsByUser(user).then((rows) => {
        res.json({
            contacts: rows
        })
    }).catch(err => {
        console.log(err);
        res.statusCode = 500
    })



    
})

module.exports = router;