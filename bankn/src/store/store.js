import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    accounts: [],
    contacts: [],
    allAccounts: []
  },
  mutations: {
    SET_USER(state, payload){
      state.user = payload;
    },
    REMOVE_USER(state){
      state.user = {};
    },
    SET_LIST_ACCOUNT(state, payload){
      state.accounts = payload
    },
    SET_LIST_CONTACT(state, payload){
      state.contacts = payload
    },
    SET_ALL_USER(state, payload){
      state.allAccounts = payload
    }
  },
  actions
})
