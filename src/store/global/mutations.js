import * as types from './mutation-types'
import { stroage } from '@/common/untils/strogeUntil.js'

const mutations = {
  // 定义一些突变的方法 如果不通过 commit('SET_ADDRESS', address) 会报错
  [types.SET_USERINFO] (state, data) {
    try {
      state.userInfo = data
      stroage.local.set('userInfo', state.userInfo)
    } catch (err) {
      console.log(`保存用户信息失败，${err}`)
    }
  },
  [types.REMOVE_USERINFO] (state) {
    state.userInfo = ''
    stroage.local.set('userInfo', state.userInfo)
  },
  [types.SET_REGISTER_LOGIN] (state, data) {
    try {
      state.namePassword = data
    } catch (err) {
      console.log(`保存账户密码失败，${err}`)
    }
  },
  [types.REMOVE_REGISTER_LOGIN] (state) {
    try {
      state.namePassword = ''
    } catch (err) {
      console.log(`清除账户密码失败，${err}`)
    }
  }
}

export default mutations
