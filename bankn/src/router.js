import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import General from './views/General.vue'
import Transfer from './views/Transfer.vue'
import Login from './views/Login.vue'
import InternalTransfer from './components/InternalTransfer.vue'
import ExterTransfer from './components/ExterTransfer.vue'
import Staff_Users from './views/Staff_Users.vue'
import Staff_Accounts from './views/Staff_Accounts.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/bankN',
      component: General,
      children: [
        {
          path: '/home',
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
            },
            {
              path: '/exter',
              component: ExterTransfer
            }
          ]
        },
        {
          path: '/staff-home',
          name: 'Staff_Users',
          component: Staff_Users
        },
        {
          path: '/staff-account/:id',
          name: 'Staff_Accounts',
          component: Staff_Accounts
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
