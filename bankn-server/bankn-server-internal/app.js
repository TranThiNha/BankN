var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan');

var authCtrl = require('./apiControllers/authCtrl');
var contactCtrl = require('./apiControllers/contactCtrl');
var accountCtrl = require('./apiControllers/accountCtrl');
var userCtrl = require('./apiControllers/userCtrl');
var transactionCtrl = require('./apiControllers/transactionCtrl');

var verifyAccessToken = require('./repos/authRepo').verifyAccessToken;

app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authCtrl);
app.use('/contacts', verifyAccessToken, contactCtrl);
app.use('/accounts', verifyAccessToken, accountCtrl);
app.use('/users', verifyAccessToken, userCtrl);
app.use('/transactions', verifyAccessToken, transactionCtrl);

var PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on PORT ${PORT}`);
})