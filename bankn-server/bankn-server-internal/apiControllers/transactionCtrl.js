var express = require('express');

var txRepo = require('../repos/transactionRepo');
var otplib = require('otplib');

var otherBank = require('../repos/otherBankRepo');
var router = express.Router();
var nodemailer = require('nodemailer');
var userRepo = require('../repos/userRepo')
var axios = require('axios');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'banknvn@gmail.com',
        pass: '#12345678a'
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

    const token = otplib.authenticator.generate(user.id);

    userRepo.loadUserById(user.id).then(rows => {
        if (rows.length > 0) {
            let user = rows[0];
            const mailOptions = {
                from: 'bankvn@email.com', // sender address
                to: user.email, // list of receivers
                subject: 'OTP bankN', // Subject line
                html: `<head>
                <style>
                    @font-face {
                        font-family: 'SF UI Display';
                        src: url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Regular.eot');
                        src: url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Regular.eot?#iefix') format('embedded-opentype'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Regular.woff2') format('woff2'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Regular.woff') format('woff'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Regular.svg#SFUIDisplay-Regular') format('svg');
                        font-weight: 300;
                        font-style: normal;
                    }
            
                    @font-face {
                        font-family: 'SF UI Display';
                        src: url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Medium.eot');
                        src: url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Medium.eot?#iefix') format('embedded-opentype'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Medium.woff2') format('woff2'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Medium.woff') format('woff'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Medium.svg#SFUIDisplay-Medium') format('svg');
                        font-weight: 500;
                        font-style: normal;
                    }
            
                    @font-face {
                        font-family: 'SF UI Display';
                        src: url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Bold.eot');
                        src: url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Bold.eot?#iefix') format('embedded-opentype'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Bold.woff2') format('woff2'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Bold.woff') format('woff'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Bold.svg#SFUIDisplay-Bold') format('svg');
                        font-weight: 700;
                        font-style: normal;
                    }
            
                    @font-face {
                        font-family: 'SF UI Display';
                        src: url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Black.eot');
                        src: url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Black.eot?#iefix') format('embedded-opentype'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Black.woff2') format('woff2'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Black.woff') format('woff'), url('https://turnback.000webhostapp.com/fonts/SFUIDisplay-Black.svg#SFUIDisplay-Black') format('svg');
                        font-weight: 900;
                        font-style: normal;
                    }
            
                    .bankn-mail-body {
                        font-family: SF UI Display !important;
                        text-align: center;
                        padding: 30px;
                    }
            
                    .header {
                        margin-top: 30px;
                        border-radius: 10px 10px 0px 0px;
                        background: url(https://turnback.000webhostapp.com/imgs/bg.png);
                        background-size: cover;
                        height: 50px;
                        color: #fff;
                        font-weight: 900;
                        text-align: center;
                        font-size: 24px;
                        padding-top: 15px;
                    }
            
                    .mail-body {
                        border-radius: 0px 0px 10px 10px;
                        border: 1px solid #ccc;
                        border-top: 0px;
                        font-size: 18px;
                        padding: 30px;
                        text-align: left;
                        color: #000;
                    }
            
                    .mail-body div {
                        margin: 15px 0px;
                    }
            
                    .receiver {
                        font-weight: 700;
                        color: #FC4100;
                    }
            
                    .otp-cnt {
                        color: #888;
                        font-weight: 700;
                        padding-top: 30px;
                        text-align: center;
                    }
            
                    .otp-cnt .otp-number {
                        padding-top: 5px;
                        height: 60px;
                        background: #FC4100;
                        border-radius: 10px;
                        font-size: 36px;
                        font-weight: 900;
                        letter-spacing: 0.5em;
                        color: #fff;
                        margin-top: 20px;
                        max-width: 350px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                </style>
            </head>
            
            <div class="bankn-mail-body">
            
                <img src="https://turnback.000webhostapp.com/imgs/logo.png">
                <div class="otp-mail">
                    <div class="header">
                        Mã OTP chuyển khoản
                    </div>
                    <div class="mail-body">
                        <div>
                            Chào <span class="receiver">${user.full_name}</span>,
                        </div>
                        <div>
                            Chúng tôi gửi bạn mã OTP cho giao dịch chuyển khoản gần nhất của bạn.
                        </div>
                        <div>
                            Hãy nhập mã OTP dưới đây vào trang web để thực hiện giao dịch.
                        </div>
                        <div class="otp-cnt">
                            Mã OTP
                            <div class="otp-number">
                                ${token}
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>`// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    res.json({
                        msg: 'failed'
                    })
                    console.log(err);
                }
                else {
                    res.json({
                        msg: 'success'
                    })
                    console.log(info);
                }
            });

        }
    })

})

router.post('/otp', (req, res) => {
    if (req.body.otp == undefined) {
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
    } else {
        res.json({
            result: false,
            msg: 'otp undefined'
        })
    }
    
})


router.post('/internal', (req, res) => {

    var transaction = {
        userId: req.id,
        sendAccount: req.body.sendAccount,
        receiAccount: req.body.receiAccount,
        description: req.body.description,
        amount: req.body.amount,
        fee: 1000,
        idbank: 888,
        type: req.body.type
    }
    txRepo.send(transaction).then(row => {
        console.log(row[0][0]);
        if (row[0][0].result == 1) {
            res.json({
                msg: 'success'
            })
            
        } else {
            res.json({
                msg: 'failed'
            })
        }
    }).catch(err => {
        console.log('error internal: ' + err)
        res.json({
            msg: 'failed'
        })
    })
})

router.post('/external', (req, res) => {

    var transaction = {
        userId: req.id,
        sendAccount: req.body.sendAccount,
        receiAccount: req.body.receiAccount,
        desciption: req.body.description,
        amount: req.body.amount,
        idbank: req.body.idbank,
        fee: 2000,
        type: 0
    }

    txRepo.send(transaction).then(row => {
        if (row[0][0].result == 1) {
            res.json({
                msg: 'success'
            })

            otherBank.loadOtherBankById(transaction.idbank).then(rows => {
                let bank = rows[0];
                axios.post('/sendTransaction', {
                    'accountFrom': {
                        'id': transaction.sendAccount,
                        'idbank': 888
                    },
                    'accountTo': {
                        'id': transaction.receiAccount,
                        'idbank': transaction.idbank
                    },
                    'amount' : transaction.amount,
                    'address' : bank.address
                }).then(respone => {
                    console.log(respone);
                }).catch(err => {
                    console.log('send transaction error: ' + err);
                })
            }).catch(err => {
                console.log('error load bank' + err);
            })
        } else {
            res.json({
                msg: 'failed'
            })
        }
    }).catch(err => {
        console.log('error internal: ' + err)
        res.json({
            msg: 'failed'
        })
    })
})


module.exports = router;