var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan');

var authCtrl = require('./apiControllers/authCtrl');
var contactCtrl = require('./apiControllers/contactCtrl');
var accountCtrl = require('./apiControllers/accountCtrl');

var verifyAccessToken = require('./repos/authRepo').verifyAccessToken;

app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth/', authCtrl);
app.use('/contact/', verifyAccessToken, contactCtrl);
app.use('/account/', verifyAccessToken, accountCtrl);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
})