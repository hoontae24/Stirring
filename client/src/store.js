import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'en',
    text: null
  },
  getters: {
    text: (state) => (word) => {
      return state.text[word][state.language]
    }
  },
  mutations: {
    initText: (state, payload) => {
      state.text = payload
    },
    changeLan: state => {
      if ( state.language == 'ko' ) state.language = 'en'
      else state.language = 'ko'
    }
  },
  actions: {
    changeLan (context) {
      context.commit('changeLan')
    }

  }
})
