import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    accounts: [],
  },
  mutations: {
    SET_USER(state, payload){
      state.user = payload;
    },
    SET_ACCOUNTS(state, payload){
      state.accounts = payload;
    }
  },
  actions
})
