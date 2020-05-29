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
  },
  [types.SET_PAGENAME] (state, data) {
    try {
      state.pageName = data
    } catch (err) {
      console.log(`传递分页name失败，${err}`)
    }
  },
  [types.SET_CATEGORY] (state, data) {
    try {
      state.category = data
    } catch (err) {
      console.log(`保存联动分级信息失败，${err}`)
    }
  },
  [types.SET_DISEASENAME] (state, data) {
    try {
      state.diseaseName = data
    } catch (err) {
      console.log(`保存病害名失败，${err}`)
    }
  },
  [types.REMOVE_DISEASENAME] (state) {
    try {
      state.diseaseName = null
    } catch (err) {
      console.log(`清除病害名失败，${err}`)
    }
  },
  [types.SET_PESEDISEASENAME] (state, data) {
    try {
      state.pestDiseaseName = data
    } catch (err) {
      console.log(`保存病害名失败，${err}`)
    }
  },
  [types.REMOVE_PESEDISEASENAME] (state) {
    try {
      state.pestDiseaseName = null
    } catch (err) {
      console.log(`清除病害名失败，${err}`)
    }
  },
  [types.SET_IMAGENAME] (state, data) {
    try {
      state.imageName = data
    } catch (err) {
      console.log(`保存图像识别出的name失败，${err}`)
    }
  },
  [types.REMOVE_IMAGENAME] (state) {
    try {
      state.imageName = null
    } catch (err) {
      console.log(`清除图像识别出的name失败，${err}`)
    }
  },
  [types.SET_SEARCHTEXT] (state, data) {
    try {
      state.searchText = data
    } catch (err) {
      console.log(`保存首页热点推送搜索文字失败，${err}`)
    }
  }
}

export default mutations
