import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Home
    },
    {
      path: '/upload',
      name: 'upload',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Home
    },
  ]
})
