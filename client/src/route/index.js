import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Home from '@/views/Home'
import Login from '@/views/user/Login.vue'
import Signup from '@/views/user/Signup.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('logout')
        next({ name: 'home' })
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Home
    }
  ]
})


export default router
