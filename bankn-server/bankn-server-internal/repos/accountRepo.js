var db = require('../fn/mysql-db');

exports.loadAccontsByUser = user => {
    var sql = `select * from accounts where user_id = '${user.id}' and enable = 1`;
    return db.load(sql);
}