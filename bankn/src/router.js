import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import General from './views/General.vue'
import Transfer from './views/Transfer.vue'
import InternalTransfer from './components/InternalTransfer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/bankN'
    },
    {
      path: '/bankN',
      component: General,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/transfer',
          name: 'Transfer',
          component: Transfer,
          children: [
            {
              path: '/internal',
              component: InternalTransfer
            }
          ]
        },
      ]
    },
   
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
