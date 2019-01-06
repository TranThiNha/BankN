var db = require('../fn/mysql-db');

exports.send = object => {
    var sql = `call transfer('${object.sendAccount}', '${object.receiAccount}', ${object.amount}, ${object.type}, ${object.fee}, "${object.description}");`;
    console.log(sql);
    return db.load(sql);
}

exports.loadTxsByUser = object => {
    var sql = `SELECT DISTINCT
	p1.full_name AS sendName,
	p2.full_name AS receiName,
	acc1.accountNumber AS sendAccount,
	acc2.accountNumber AS receiAccount,
	tx1.amount AS amount,
	tx1.fee AS fee,
	tx1.type,
	tx1.date 
FROM
	transactions AS tx1,
	users AS p1,
	users AS p2,
	accounts AS acc1,
	accounts AS acc2 
WHERE
	p1.id = ${object.id}
	AND p1.id = acc1.user_id 
	AND acc1.accountNumber = tx1.userAccount 
	AND p2.id = acc2.user_id 
	AND acc2.accountNumber = tx1.receiverAccount UNION
SELECT DISTINCT
	p2.full_name AS sendAccount,
	p1.full_name AS receiName,
	acc2.accountNumber AS sendAccount,
	acc1.accountNumber AS receiAccount,
	tx2.amount AS amount,
	tx2.fee AS fee,
	tx2.type,
	tx2.date 
FROM
	transactions AS tx2,
	users AS p1,
	users AS p2,
	accounts AS acc1,
	accounts AS acc2
WHERE
	p1.id = ${object.id} 
	AND p1.id = acc1.user_id 
	AND acc1.accountNumber = tx2.receiverAccount 
	AND p2.id = acc2.user_id 
	AND acc2.accountNumber = tx2.userAccount`;
    return db.load(sql);
}

