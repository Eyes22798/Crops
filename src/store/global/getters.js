// getters 只会依赖 state 中的成员去更新
const getters = {
  userData: (state) => state.userInfo,
  sessionID: (state) => state.sessionID,
  namePassword: (state) => state.namePassword,
  pageName: (state) => state.pageName,
  category: (state) => state.category,
  diseaseName: (state) => state.diseaseName,
  pestDiseaseName: (state) => state.pestDiseaseName,
  imageName: (state) => state.imageName,
  searchText: (state) => state.searchText
}

export default getters
