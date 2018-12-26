var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan');

var authCtrl = require('./apiControllers/authCtrl');

app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth/', authCtrl);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
})