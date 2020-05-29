import * as types from './mutation-types'

export default {
  // 异步 导出某些行为对象，业务逻辑
  setUserInfoData ({ commit }, param) {
    commit(types.SET_USERINFO, param)
  },
  removeUserInfoData ({ commit }) {
    commit(types.REMOVE_USERINFO)
  },
  setNamePassword ({ commit }, param) {
    commit(types.SET_REGISTER_LOGIN, param)
  },
  removeNamePassword ({ commit }, param) {
    commit(types.REMOVE_REGISTER_LOGIN, param)
  },
  setPageName ({ commit }, param) {
    commit(types.SET_PAGENAME, param)
  },
  setCategory ({ commit }, param) {
    commit(types.SET_CATEGORY, param)
  },
  setDiseaseName ({ commit }, param) {
    commit(types.SET_DISEASENAME, param)
  },
  removeDiseaseName ({ commit }, param) {
    commit(types.REMOVE_DISEASENAME, param)
  },
  setPestDiseaseName ({ commit }, param) {
    commit(types.SET_PESEDISEASENAME, param)
  },
  removePestDiseaseName ({ commit }, param) {
    commit(types.REMOVE_PESEDISEASENAME, param)
  },
  setImageName ({ commit }, param) {
    commit(types.SET_IMAGENAME, param)
  },
  removeImageName ({ commit }, param) {
    commit(types.REMOVE_IMAGENAME, param)
  },
  setSearchText ({ commit }, param) {
    commit(types.SET_SEARCHTEXT, param)
  }
}
