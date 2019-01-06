// var md5 = require('crypto-js/md5');

var db = require('../fn/mysql-db');

exports.login = user => {
    var sql = `select * from users where username = '${user.username}'
     and password = '${user.password}'`;
    return db.load(sql);
}

exports.loadAll = () => {
    var sql = `select id, fullname from users where role = 1`;
    return db.load(sql);
}

exports.loadUserById = (id) => {
    var sql = `select * from users where id = ${id}`;
    return db.load(sql);
}

exports.loadUserByAccountNumber = (number) => {
    var sql = `select * from users, accounts where accountNumber = ${number} and users.id = accounts.user_id`;
    return db.load(sql);
}

exports.insert = (user) => {
    var sql = `INSERT INTO users (username, password, fullname, email, phoneNumber, role)
    VALUES
    ('${user.username}', '${user.password}', '${user.fullname}', '${user.email}', '${user.phone}', 1);`;
    return db.load(sql);
}