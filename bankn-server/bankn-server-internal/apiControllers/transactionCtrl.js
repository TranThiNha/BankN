var express = require('express');

var txRepo = require('../repos/transactionRepo');

var router = express.Router();
var nodemailer = require('nodemailer');
var userRepo = require('../repos/userRepo')
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@address.com',
        pass: 'yourpassword'
    }
});

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

router.get('/otp', (req, res) => {
    var user = {
        id: req.id,
    }

    const token = otplib.authenticator.generate(user);

    userRepo.loadUserById(user.id).then(rows => {
        if (rows.length > 0) {
            let user = rows[0];
            const mailOptions = {
                from: 'leehuunghi@email.com', // sender address
                to: user.email, // list of receivers
                subject: 'OTP bankN', // Subject line
                html: '<p>123456</p>'// plain text body
            };
        
            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                  console.log('lỗi' + err)
                else
                  console.log(info);
             });
        
        }
    })

})

router.post('/otp', (req, res) => {
    const isValid = otplib.authenticator.check(req.body.otp, req.id);
    if (isValid) {
        res.status = 200;
        res.json({
            result: true
        })
    } else {
        res.json({
            result: false
        })
    }
})


router.post('/internal', (req, res) => {

    var transaction = {
        userId: req.id,
        sendAccount: req.body.sendAccount,
        receiAccount: req.body.receiAccount,
        desciption: req.body.desciption,
        amount: req.body.amount,
        fee: 1000,
        type: 0
    }


})

module.exports = router;