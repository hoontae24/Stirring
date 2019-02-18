import Vue from 'vue'
import Vuex from 'vuex'
import text from './text'

import UserService from '@/services/UserService'

Vue.use(Vuex)

const lan = () => {
  return localStorage.getItem('language') || 'en'
}

export default new Vuex.Store({
  state: {
    userInfo: {
      isLogined: false,
      token: null,
      user: null
    },
    language: lan(),
    text
  },
  getters: {
    text: state => word => {
      return state.text[state.language][word.toLowerCase()]
    },
    isLogined: state => {
      return state.userInfo.isLogined
    },
    isLike: state => post => {
      if (!state.userInfo.isLogined) return false
      let result = false
      state.userInfo.user.likes.forEach(item => {
        if (item === post._id) result = true
      })
      return result
    }
  },
  mutations: {
    changeLan: state => {
      if (state.language == 'ko') state.language = 'en'
      else state.language = 'ko'
      localStorage.setItem('language', state.language)
    },
    login: (state, payload) => {
      state.userInfo.isLogined = true
      state.userInfo.token = payload.token
      state.userInfo.user = payload.user
    },
    logout: state => {
      state.userInfo.isLogined = false
      state.userInfo.token = null
      state.userInfo.user = null
    },
    actionLike: (state, post) => {
      state.userInfo.user.likes.push(post._id)
    },
    actionUnlike: (state, post) => {
      state.userInfo.user.likes.pop(post._id)
    }
  },
  actions: {
    changeLan({ commit }) {
      commit('changeLan')
    },
    login({ commit }, payload) {
      localStorage.setItem('token', payload.token)
      commit('login', payload)
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit('logout')
    },
    actionLike({ state, commit }, post) {
      commit('actionLike', post)
      UserService.updateUser(state.userInfo.user)
    },
    actionUnlike({ state, commit }, post) {
      commit('actionUnlike', post)
      UserService.updateUser(state.userInfo.user)
    },
    createCollection({ state }, title) {
      return new Promise((resolve, reject) => {
        UserService.createCollection({
          title,
          user: state.userInfo.user
        })
          .then(res => {
            if (!res.data.success) throw new Error('Fail to create Collection')
            state.userInfo.user = res.data.user
            resolve(true)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
