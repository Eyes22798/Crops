import * as types from './mutation-types'
import { stroage } from '@/common/untils/strogeUntil.js'

const mutations = {
  // 定义一些突变的方法 如果不通过 commit('SET_ADDRESS', address) 会报错
  [types.SET_USERINFO] (state, data) {
    try {
      state.userDatas = data
      stroage.local.set('userInfo', state.userDatas)
    } catch (err) {
      console.log(`保存用户信息失败，${err}`)
    }
  },
  [types.REMOVE_USERINFO] (state) {
    state.userDatas = ''
    stroage.local.set('userInfo', state.userDatas)
  }
}

export default mutations
