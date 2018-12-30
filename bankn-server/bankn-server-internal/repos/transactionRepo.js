var db = require('../fn/mysql-db');

exports.send = object => {
    var sql = `INSERT INTO transaction ( user_id_sent, accountNumber, fee, otp)
    VALUES
    (${object.user_id_sent}, ${object.accountNumber}, '${object.fee}', '${object.otp}');`;
    return db.load(sql);
}