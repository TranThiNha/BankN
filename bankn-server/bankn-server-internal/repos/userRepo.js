// var md5 = require('crypto-js/md5');

var db = require('../fn/mysql-db');

exports.login = loginEntity => {
    var sql = `select * from users where username = '${loginEntity.username}'
     and password = '${loginEntity.password}'
     and role = '${loginEntity.role}'`;
     console.log(sql);
    return db.load(sql);
}