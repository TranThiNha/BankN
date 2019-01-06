var axios = require("axios");
var LENGTH_TRANSACTION=0;
var axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 10000,
});
var checkChangeTransaction = function () {
    return new Promise((resolve, reject) => {
        axiosInstance.get('/address/' + '042d14e0fb73f3733448967618107fac7ba9bb58094fa2879fca8d918d196a821c22624bbf6c2299b226f7ebdad867c600c7b2e6e35ee79636a9440a4d112ff8f5')
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
    // let personReceive = {
    //     accountid: accountTo.id,
    //     type: 2,
    //     date: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     accountdes: accountFrom.id,
    //     paymenttype: 1,
    //     money: amount,
    //     transfertype: 2,
    //     id: GenerateID(),
    //     bankid: accountFrom.idbank,
    //     fee: config.FEE.OTHER
    // }
    // //Luu lich su giao dich
    // historytransactionRepo
    //     .addHistory(personReceive)
    // confirmTran.recharge(accountTo.id, amount)
    

}