var db = require('../fn/mysql-db');

exports.loadAccountsByUser = user => {
    var sql = `select * from accounts where user_id = ${user.id} and enable = 1`;
    return db.load(sql);
}

exports.countAccountByUserId = id => {
    var sql = `select count(*) as numberAccount from accounts where user_id = ${id} and enable = 1`;
    return db.load(sql);
}

exports.loadAccontsByAccountNumber = account => {
    var sql = `select * from accounts where user_id = ${account.user_id} and enable = 1 and accountNumber = ${account.accountNumber}`;
    return db.load(sql);
}

exports.findAccountNumber = number => {
    var sql = `select * from accounts where enable = 1 and accountNumber = ${number}`;
    console.log(sql);
    return db.load(sql);
}

exports.delete = account => {
    var sql = `update accounts set enable = 0 where user_id = ${account.user_id} and accountNumber = '${account.accountNumber}'`;
    return db.load(sql);
}

exports.count = () => {
    var sql = 'SELECT COUNT(*) as numberAccount FROM accounts WHERE user_id = 7 and enable = 1';
    return db.load(sql);
}

exports.addMoney = (account) => {
    var sql = `UPDATE accounts set balance = balance + ${account.amount} where accountNumber = ${account.accountNumber}`;
    return db.load(sql);
}

exports.insert = (account) => {
    var sql = `INSERT INTO accounts (user_id, accountNumber, balance, enable)
    VALUES
    (${account.user_id}, '${account.accountNumber}', 0, 1);`;
    return db.load(sql);
}