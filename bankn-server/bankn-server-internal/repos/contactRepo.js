var db = require('../fn/mysql-db');

exports.loadContactsByUser = user => {
    var sql = `select * from contacts where user_id = '${user.id}' and enable = 1`;
    return db.load(sql);
}

exports.addContactByUser = contact => {
    var sql = `INSERT INTO contacts ( user_id, account, nameSug)
    VALUES
    (${contact.id}, ${contact.accountNumber}, '${contact.nameSug}');`;
    return db.insert(sql);
}