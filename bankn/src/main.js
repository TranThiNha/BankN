import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store/store'

Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use({
  install: function(Vue, options){
      Vue.prototype.$jQuery = require('jquery'); // you'll have this.$jQuery anywhere in your vue project
  }
})

new Vue({
  router,
  // store,
  render: function (h) { return h(App) }
}).$mount('#app')