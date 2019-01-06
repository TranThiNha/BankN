var db = require('../fn/mysql-db');

exports.loadContactsByUser = user => {
    var sql = `select * from contacts where contacts.user_id = ${user.id} and contacts.enable = 1 order by nameSug`;
    return db.load(sql);
}

exports.addContactByUser = contact => {
    var sql = `INSERT INTO contacts ( user_id, enable, account, nameSug)
    VALUES
    (${contact.id}, 1, ${contact.accountNumber}, '${contact.nameSug}');`;
    return db.insert(sql);
}

exports.removeContactByUser = contact => {
    var sql = `update contacts set enable = 0 where user_id = ${contact.user_id} and account = ${contact.accountNumber}`;
    return db.insert(sql);
}

