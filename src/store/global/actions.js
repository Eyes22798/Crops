import * as types from './mutation-types'

export default {
  // 异步 导出某些行为对象，业务逻辑
  setUserInfoData ({ commit }, param) {
    commit(types.SET_USERINFO, param)
  },
  removeUserInfoData ({ commit }) {
    commit(types.REMOVE_USERINFO)
  }
}
