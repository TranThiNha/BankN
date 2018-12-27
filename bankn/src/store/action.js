import axios from 'axios'

export default {
    Login(ctx, user){
        ctx.commit('SET_USER', user);
    },
    LogOut(ctx){
        ctx.commit('REMOVE_USER');
    },
    GetListAccount(ctx){
        alert(1);
        axios.get("http://192.168.0.116:3000/accounts",
        {
            headers:{
                x_access_token: [...state.user]
            }
        })
    },
    updateAccounts(ctx, user) {
        console.log('user ' + user)
        axios.get('http://localhost:3000/accounts', {
            headers: {
                "x-access-token": user.access_token,
                "id": user.id
              }
    }).then(respone => {
        alert(1);
            ctx.commit('SET_ACCOUNTS', respone.data)
        }).catch(err => {
            alert(err);
        })
    }
}