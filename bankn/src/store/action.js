import axios from 'axios'

export default {
    Login(ctx, user){
        ctx.commit('SET_USER', user);
    },
    LogOut(ctx){
        ctx.commit('REMOVE_USER');
    },
    SetListAccount(ctx, accounts){
        ctx.commit('SET_LIST_ACCOUNT', accounts);
    },
    SetListContact(ctx, contacts){
        ctx.commit('SET_LIST_CONTACT', contacts);
    },
    UpdateListContact(ctx, user){
        axios
      .get("http://192.168.0.116:3000/contacts", {
        headers: {
          "x-access-token": user.access_token,
          id: user.id
        }
      })
      .then(response => {
        alert(JSON.stringify(response));
        ctx.commit('SET_LIST_CONTACT', response.data.contacts);

      });
    }
}