import Vue from 'vue'
import Vuex from 'vuex'
import text from './text'
import { EventBus } from '@/mixins/EventBus'

import UserService from '@/services/UserService'
import PostService from '@/services/PostService'

Vue.use(Vuex)

const lan = () => {
  return localStorage.getItem('language') || 'english'
}

export default new Vuex.Store({
  state: {
    userInfo: {
      isLogined: false,
      token: localStorage.getItem('token') || null,
      user: null
    },
    language: lan(),
    text,
    count: { old: 0, new: 0 }
  },
  getters: {
    text: state => word => {
      if (!word) return ''
      if (!state.text[word][state.language]) return state.text[word]['default']
      return state.text[word][state.language]
    },
    isMe: state => id => {
      if (!state.userInfo.isLogined) return false
      return id === state.userInfo.user._id
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
    },
    isFollow: state => user => {
      if (!state.userInfo.isLogined) return false
      let result = false
      state.userInfo.user.followings.forEach(item => {
        if (item === user._id) result = true
      })
      return result
    }
  },
  mutations: {
    changeLan: (state, language) => {
      state.language = language
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
      state.userInfo.user.likes.splice(
        state.userInfo.user.likes.indexOf(post._id),
        1
      )
    },
    actionFollow: (state, user) => {
      state.userInfo.user.followings.push(user._id)
    },
    actionUnfollow: (state, user) => {
      state.userInfo.user.followings.splice(
        state.userInfo.user.followings.indexOf(user._id),
        1
      )
    },
    addCount: state => {
      if (window.innerWidth < 800) {
        state.count.old += state.count.new
      } else if (window.innerWidth < 1280) {
        state.count.old += state.count.new
      } else {
        state.count.old += state.count.new
      }
    },
    resetCount: state => {
      if (window.innerWidth < 800) {
        state.count.old = 0
        state.count.new = 10
      } else if (window.innerWidth < 1280) {
        state.count.old = 0
        state.count.new = 20
      } else {
        state.count.old = 0
        state.count.new = 30
      }
    }
  },
  actions: {
    changeLan({ state, commit }, language) {
      if (!language) {
        if (state.language === 'english') language = 'korean'
        if (state.language === 'korean') language = 'english'
      }
      commit('changeLan', language)
    },
    login({ commit }, payload) {
      localStorage.setItem('token', payload.token)
      commit('login', payload)
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit('logout')
      EventBus.$emit('loadCollections')
    },
    actionLike({ state, commit }, post) {
      commit('actionLike', post)
      UserService.updateUser(state.userInfo.user)
      PostService.updatePost(post)
    },
    actionUnlike({ state, commit }, post) {
      commit('actionUnlike', post)
      UserService.updateUser(state.userInfo.user)
      PostService.updatePost(post)
    },
    createCollection({ state }, title) {
      return new Promise((resolve, reject) => {
        UserService.createCollection({
          title,
          author: {
            id: state.userInfo.user._id,
            name: state.userInfo.user.name
          }
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
    },
    actionFollow({ state, commit }, user) {
      commit('actionFollow', user)
      UserService.updateUser(state.userInfo.user)
      user.followers.push(state.userInfo.user._id)
      UserService.updateUser(user)
    },
    actionUnfollow({ state, commit }, user) {
      commit('actionUnfollow', user)
      UserService.updateUser(state.userInfo.user)
      user.followers.splice(user.followers.indexOf(state.userInfo.user._id), 1)
      UserService.updateUser(user)
    }
  }
})
