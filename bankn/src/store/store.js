import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action.js'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    persistedState()
  ],
  state: {
    user: {},
    accounts: [],
    contacts: [],
    allAccounts: [],
    getOTP: false,
    postOTP: false,
    successInternal: false,
    banks: [],
    selectedBank:{}
  },
  getters: {
    getUser: state => {
      return state.user;
    }
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
    },
    GET_OTP_FLAG(state, payload){
      state.getOTP = payload
    },
    SET_POST_OTP_FLAG(state, payload){
      state.postOTP = payload
    },
    RESET(state){
      state.getOTP = false;
      state.postOTP = false;
      state.successInternal = false;
    },
    SET_SUCCESS_INTERNAL(state){
      state.successInternal = true;
    },
    SET_BANKS(state, payload){
      state.banks = payload
    },
    SET_SECLECTED_BANK(state, payload){
      state.selectedBank = payload
    }
  },
  actions

});



