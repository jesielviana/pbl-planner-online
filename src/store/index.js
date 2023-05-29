import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isLogged: false,
    url: ''
  },
  mutations: {
    loading (state, isLoading) {
      state.isLoading = isLoading
    },
    logged (state, isLogged) {
      state.isLogged = isLogged
    },
    urlRedirect (state, url) {
      state.url = url
    }
  }
})
