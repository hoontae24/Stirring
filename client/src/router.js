import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Header from './components/Header'
import Footer from './components/Footer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        header: Header,
        default: Home,
        footer: Footer
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:'/login',
      name: 'login',
      components: {
        header: Header,
        default: Home,
        footer: Footer
      }
    }
  ]
})
