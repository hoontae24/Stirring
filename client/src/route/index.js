import Vue from "vue"
import Router from "vue-router"

import Home from "@/views/Home"
import Login from "@/views/user/Login.vue"
import Signup from "@/views/user/Signup.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/search",
      name: "search",
      component: Home
    },
    {
      path: "/upload",
      name: "upload",
      component: Home
    }
  ]
})
