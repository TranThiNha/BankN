import axios from 'axios'

export default {
    Login(ctx, user) {

        ctx.commit('SET_USER', user);
    },
    LogOut(ctx) {
        ctx.commit('REMOVE_USER');
    },
    SetListAccount({commit,state}) {
        axios
            .get("http://192.168.0.5:3000/accounts", {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                commit('SET_LIST_ACCOUNT', response.data.accounts);
            }).catch(err => alert(err));

    },
    SetListContact({commit,state}, contacts) {
        axios
        .get("http://192.168.0.5:3000/contacts", {
          headers: {
            "x-access-token": state.user.access_token
          }
        })
        .then(response => {
          if (response.status == 200) {
            commit('SET_LIST_CONTACT', response.data.contacts);
          }
        })
        .catch(err => {
          alert(err);
        });
        
    },
    UpdateListContact({commit, state}) {
        axios
        .get("http://192.168.0.5:3000/contacts", {
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
            .get("http://192.168.0.5:3000/users", {
                headers: {
                    "x-access-token": user.access_token,
                }
            })
            .then(response => {
                ctx.commit('SET_ALL_USER', response.data.accounts);
            });
    },
    UpdateListAccount({commit, state}) {
        axios
            .get(`http://192.168.0.5:3000/accounts/${state.user.id}`, {
                headers: {
                    "x-access-token": state.user.access_token
                }
            })
            .then(response => {
                commit('SET_LIST_ACCOUNT', response.data.accounts);
            });
    },
    SetTransactionHistory({commit, state}){
        axios
        .get("http://192.168.0.5:3000/transactions", {
          headers: {
            "x-access-token": state.user.access_token
          }
        })
        .then(response => {
          alert(JSON.stringify(response));
          if (response.data.status == 200) {
            
          }
        })
        .catch(err => {
          alert(err);
        });
    }
}