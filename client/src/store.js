import Vue from 'vue'
import Vuex from 'vuex'
import text from './text'

Vue.use(Vuex)

const lan = () => {
  return localStorage.getItem('language') || 'en'
}

export default new Vuex.Store({
  state: {
    userInfo: {
      isLogined: false,
      name: null,
      token: null
    },
    language: lan(),
    text
  },
  getters: {
    text: (state) => (word) => {
      return state.text[state.language][word.toLowerCase()]
    },
    isLogined: (state) => {
      return state.userInfo.isLogined
    }
  },
  mutations: {
    changeLan: state => {
      if ( state.language == 'ko' ) state.language = 'en'
      else state.language = 'ko'
      localStorage.setItem('language', state.language)
    },
    login: (state, payload) => {
      state.userInfo.isLogined = true
      state.userInfo.name = payload.name
      state.userInfo.token = payload.token
    },
    logout: (state) => {
      state.userInfo.isLogined = false
      state.userInfo.name = null
      state.userInfo.token = null
    }
  },
  actions: {
    changeLan ({ commit }) {
      commit('changeLan')
    },
    login({ commit }, payload)  {
      commit('login', payload)
      localStorage.setItem('token', payload.token)
    },
    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('token')
    }
  }
})
