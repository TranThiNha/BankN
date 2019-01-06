var db = require('../fn/mysql-db');

exports.loadAllOtherBank = () => {
    var sql = `select * from otherBank`;
    return db.load(sql);
}

exports.loadOtherBankById = (id) => {
    var sql = `select * from otherBank where id = ${id}`;
    return db.load(sql);
}