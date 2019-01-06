var axios = require("axios");

exports.mineBlockChain = () => {
    setInterval(mineBlock, 5000);
}

function mineBlock() {
    axios.get('http://localhost:3001/transactionPool').then(respone => {
        if (respone.data.length > 0) {
            axios.post('http://localhost:3001/mineBlock',null,null);
        }
    })
}