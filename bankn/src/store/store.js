import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SET_USER(state, payload){
      JSON.stringify(payload);
      state.user = payload;
    }
  },
  actions
})
