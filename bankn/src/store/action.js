import axios from 'axios'

export default {
    login(ctx, info){
        alert("vooo");
        ctx.commit('SET_USER', info);
    }
}