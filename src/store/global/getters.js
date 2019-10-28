// getters 只会依赖 state 中的成员去更新
const getters = {
  userData: (state) => state.userInfo,
  sessionID: (state) => state.sessionID,
  namePassword: (state) => state.namePassword,
  pageName: (state) => state.pageName
}

export default getters
