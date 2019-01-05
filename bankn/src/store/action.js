import axios from 'axios'

export default {
    Login(ctx, user) {

        ctx.commit('SET_USER', user);
    },
    LogOut(ctx) {
        ctx.commit('REMOVE_USER');
    },
    SetListAccount(ctx) {
        
        axios
            .get("http://192.168.1.13:3000/accounts", {
                headers: {
                    "x-access-token": this.$session.get("access_token")
                }
            })
            .then(response => {
                ctx.commit('SET_LIST_ACCOUNT', response.data.accounts);
            }).catch(err => alert(err));

    },
    SetListContact(ctx, contacts) {
        // alert(JSON.stringify(contacts));
        ctx.commit('SET_LIST_CONTACT', contacts);
    },
    UpdateListContact(ctx, user) {
        axios
            .get("http://192.168.1.13:3000/contacts", {
                headers: {
                    "x-access-token": user.access_token,
                }
            })
            .then(response => {
                ctx.commit('SET_LIST_CONTACT', response.data.contacts);

            });
    },
    SetAllAccount(ctx, users) {
        ctx.commit('SET_ALL_USER', users);
    },
    UpdateListUser(ctx, user) {
        axios
            .get("http://192.168.1.13:3000/users", {
                headers: {
                    "x-access-token": user.access_token,
                }
            })
            .then(response => {
                ctx.commit('SET_ALL_USER', response.data.accounts);
            });
    },
    UpdateListAccount(ctx, info) {
        axios
            .get(`http://192.168.1.13:3000/accounts/${info.id}`, {
                headers: {
                    "x-access-token": info.user.access_token,
                }
            })
            .then(response => {
                ctx.commit('SET_LIST_ACCOUNT', response.data.accounts);
            });
    }
}