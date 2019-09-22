import Vue from 'vue'
import Vuex from 'vuex'

import disease from './modules/disease'
import pest from './modules/pest'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    disease,
    pest
  }
})
