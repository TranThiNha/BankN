var axios = require("axios");
var LENGTH_TRANSACTION=0;
var axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 10000,
});
var txRepo = require('../repos/transactionRepo');
var checkChangeTransaction = function () {
    return new Promise((resolve, reject) => {
        axiosInstance.get('/address/' + '045de212ef435d95088f430ab5c8bbf16967121bd7384b5393b09377ddf689194de456edae1993753c7f5cce76c1d5d54f75c61b4796bebcc8236aaf7b97593654')
            .then(function (res) {
                return res.data;
            })
            .then(value => resolve(value))
            .catch(err => {
                err => reject(err)
            });
    })
}

exports.checkTransactionReceive = () => {
    setInterval(receiveTran, 5000);
}

function receiveTran() {
    checkChangeTransaction().then(value => {
        if (value.unspentTxOuts.length > LENGTH_TRANSACTION) {
            let i = LENGTH_TRANSACTION;
            let lengthTran = value.unspentTxOuts.length;
            let unspentTxOuts = value.unspentTxOuts;
            LENGTH_TRANSACTION=lengthTran;
            console.log(LENGTH_TRANSACTION);
            for (i = i; i < lengthTran; i++) {
                let object = unspentTxOuts[i];
                console.log(object);
                if (object.accountFrom.id != undefined && object.accountFrom.id != null) {
                    excuteTransaction(object.amount, object.accountFrom, object.accountTo)
                }
                else console.log('underfine');
            }

        }

    }).catch(err => {
        console.log(err);
    })
}

function excuteTransaction(amount, accountFrom, accountTo) {
    var transaction = {
        sendAccount: accountFrom.id,
        receiAccount: accountTo.id,
        description: "",
        amount: amount,
        idbankfrom: accountTo.idbank,
        idbankto: accountFrom.idbank,
        fee: 2000,
        type: 0
    }

    txRepo.send(transaction);
}