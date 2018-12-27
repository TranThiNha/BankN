import axios from 'axios'

export default {
    login(ctx, info){
        ctx.commit('SET_USER', info);
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