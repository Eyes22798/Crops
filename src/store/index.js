import Vue from 'vue'
import Vuex from 'vuex'
import state from './global/state'
import getters from './global/getters'
import actions from './global/actions'
import mutations from './global/mutations'

import disease from './modules/disease'
import pest from './modules/pest'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    disease,
    pest
  }
})
