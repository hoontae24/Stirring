import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Home from '@/views/Home'
import Login from '@/views/user/Login'
import Signup from '@/views/user/Signup'
import PostDetails from '@/views/PostDetails'
import CollectionDetails from '@/views/CollectionDetails'

import search from '@/router/search'
import mypage from '@/router/mypage'

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
        next(from.path)
      }
    },
    {
      path: '/posts/:id',
      name: 'post-details',
      component: PostDetails,
      props: true
    },
    {
      path: '/collections/:id',
      name: 'collection-details',
      component: CollectionDetails,
      props: true
    },
    search,
    mypage
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
