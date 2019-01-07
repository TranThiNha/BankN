import axios from 'axios'

export default {
    Login(ctx, user) {

        ctx.commit('SET_USER', user);
    },
    LogOut(ctx) {
        ctx.commit('REMOVE_USER');
    },
    SetListAccount({
        commit,
        state
    }) {
        axios
            .get("http://192.168.0.130:3000/accounts", {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                commit('SET_LIST_ACCOUNT', response.data.accounts);
            }).catch(err => alert(err));

    },
    SetListContact({
        commit,
        state
    }) {
        axios
            .get("http://192.168.0.130:3000/contacts", {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                // alert(JSON.stringify(response));
                if (response.status == 200) {
                    commit('SET_LIST_CONTACT', response.data.contacts);
                }
            })
            .catch(err => {
                alert(err);
            });

    },
    UpdateListContact({
        commit,
        state
    }) {
        axios
            .get("http://192.168.0.130:3000/contacts", {
                headers: {
                    "x-access-token": state.access_token
                }
            })
            .then(response => {
                commit('SET_LIST_CONTACT', response.data.contacts);
            });
    },
    SetAllAccount(ctx, users) {
        ctx.commit('SET_ALL_USER', users);
    },
    UpdateListUser(ctx, user) {
        axios
            .get("http://192.168.0.130:3000/users", {
                headers: {
                    "x-access-token": user.access_token,
                }
            })
            .then(response => {
                ctx.commit('SET_ALL_USER', response.data.accounts);
            });
    },
    UpdateListAccount({
        commit,
        state
    }) {
        axios
            .get(`http://192.168.0.130:3000/accounts/${state.user.id}`, {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                commit('SET_LIST_ACCOUNT', response.data.accounts);
            });
    },
    SetTransactionHistory({
        commit,
        state
    }) {
        axios
            .get("http://192.168.0.130:3000/transactions", {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                if (response.status == 200) {
                    // alert(JSON.stringify(response.data));
                    commit('SET_TRANSACTIONS', response.data.transactions)
                }
            })
            .catch(err => {
                alert(err);
            });
    },
    GetOTP({
        commit,
        state
    }) {
        axios
            .get("http://192.168.0.130:3000/transactions/otp", {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                // alert("OTP" + JSON.stringify(response));
                if (response.data.msg == "success") {
                    commit('GET_OTP_FLAG', true);
                }
            })
            .catch(err => {
                alert(err);
            });
    },
    PostOTP({
        commit,
        state
    }, otp) {
        axios
            .post("http://192.168.0.130:3000/transactions/otp", otp, {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                // alert(JSON.stringify(response));
                if (response.status == 200) {
                    commit('SET_POST_OTP_FLAG', true);
                }
            })
            .catch(err => {
                alert(err);
            });
    },
    Reset(ctx) {
        ctx.commit('RESET');
    },
    TransactionExternal({ commit, state }, dataSent) {
        // alert(JSON.stringify(dataSent));
        axios
            .post(
                "http://192.168.0.130:3000/transactions/internal", {
                    sendAccount: dataSent.sendAccount,
                    receiAccount: dataSent.receiAccount,
                    amount: +dataSent.amount - 1000,
                    description: dataSent.description,
                    type: 0
                }, {
                    headers: {
                        "x-access-token": state.user.access_token
                    }
                }
            )
            .then(response => {
                // alert(JSON.stringify(response));
                  if (response.data.msg == "success") {
                      commit('SET_SUCCESS_INTERNAL', true);
                  } else {
                    // alert(response.data.msg);
                  }
            })
            .catch(err => {
                alert(err);
            });
    },
    AnotherBanks({commit, state}){
        axios
            .get("http://192.168.0.130:3000/otherbank", {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                // alert(JSON.stringify(response));
                if (response.data.msg == "success!") {
                    commit('SET_BANKS', response.data.otherBanks);
                }
            })
            .catch(err => {
                alert(err);
            });
    },
    SetSelectedBank(ctx, selectedBank){
        ctx.commit('SET_SECLECTED_BANK', selectedBank)

    },
    TransactionExternal({ commit, state }, dataSent){
        // alert(JSON.stringify(state.selectedBank));
        axios
            .post("http://192.168.0.130:3000/transactions/external",
            {
                sendAccount: dataSent.sendAccount,
                receiAccount: dataSent.receiAccount,
                amount: +dataSent.amount - 1000,
                description: dataSent.description,
                idbank: state.selectedBank.id
            }, {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                // alert(JSON.stringify(response));
                if (response.data.msg == "success!") {
                    // commit('SET_BANKS', response.data.otherBanks);
                }
            })
            .catch(err => {
                alert(err);
            });
    }
}