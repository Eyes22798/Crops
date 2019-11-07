import $axios from '../http'
import qs from 'qs'

const common = {
  test () {
    return $axios({
      url: '/query',
      method: 'get'
    })
  },
  // 用户注销
  loginout (phone) {
    return $axios({
      url: `/common/loginout?phone=${phone}`,
      method: 'get'
    })
  },
  // 用户登录
  login (params) {
    return $axios({
      url: '/common/login',
      method: 'post',
      data: params
    })
  },
  // 获取验证码
  loginSendCode (params) {
    return $axios({
      url: '/common/login/sendcode',
      method: 'post',
      data: params
    })
  },
  // 发送验证码登录
  loginCodeSend (params) {
    return $axios({
      url: '/common/code/login',
      method: 'post',
      data: params
    })
  },
  // 获取 session 数据
  getSessionData () {
    return $axios({
      url: '/common/get/user',
      method: 'get'
    })
  },
  // 普通用户注册
  ordinaryRegister (params) {
    return $axios({
      url: '/common/ordinary/regist',
      method: 'post',
      data: params
    })
  },
  // 专家用户注册
  expertRegister (params) {
    return $axios({
      url: '/common/expert/regist',
      method: 'post',
      data: params
    })
  },
  // 省市县三级联动
  linkAge (level = 1, parentId = 0) {
    return $axios({
      url: `/common/linkage?level=${level}&parentId=${parentId}`,
      method: 'get'
    })
  },
  // 验证注册使用的电话
  registerSendCode (params) {
    return $axios({
      url: '/common/regist/sendcode',
      method: 'post',
      data: params
    })
  },
  // 个人信息修改
  updateInfo (params) {
    return $axios({
      url: '/common/user/modify',
      method: 'post',
      data: params
    })
  },
  // 修改密码
  updatePassword (params) {
    return $axios({
      url: '/common/user/password',
      method: 'post',
      data: params
    })
  },
  // 验证电话号码
  phoneSendCode (phone) {
    return $axios({
      url: `/common/changephone/sendcode?phone=${phone}`,
      method: 'get'
    })
  },
  // 验证新的电话号码
  newPhoneSendCode (params) {
    return $axios({
      url: '/common/modifyphone/sendcode',
      method: 'post',
      data: params
    })
  },
  // 验证验证码
  verificationPhone (params) {
    return $axios({
      url: '/common/phone/verification',
      method: 'post',
      data: params
    })
  },
  // 绑定电话修改
  updatePhone (params) {
    return $axios({
      url: '/common/user/phone',
      method: 'post',
      data: params
    })
  },
  // 头像修改
  updateAvatar (formData) {
    return $axios({
      url: '/common/user/modifyphoto',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        'AuthorizationPhoto': 'updatePhoto'
      },
      data: formData
    })
  },
  // 作物信息检索
  getPlantByName (name = '玫瑰', pageNum = 1, pageSize = 3) {
    return $axios({
      url: `/common/plant/foundbyname?name=${name}&pageNum=${pageNum}&pageSize=${pageSize}`,
      method: 'get'
    })
  },
  // 显示作物的详细信息
  getPlantInfo (plantID) {
    return $axios({
      url: `/common/plant/info?plantID=${plantID}`,
      method: 'get'
    })
  },
  // 根据作物科属联动检索
  getPlantByCategory (params) {
    return $axios({
      url: '/common/plant/foundbycate',
      method: 'post',
      data: params
    })
  },
  // 显示界门纲目科属的所属关系
  getCategory (params) {
    return $axios({
      url: '/common/category/found',
      method: 'post',
      data: params
    })
  },
  // 根据作物图像检索
  getPlantByPhoto (params) {
    return $axios({
      url: '/common/plant/foundbyphoto',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  // 根据天敌名称检索
  getEnemyByName (name = '瓢虫', pageNum = 1, pageSize = 3) {
    return $axios({
      url: `/common/enemy/foundbyname?name=${name}&pageNum=${pageNum}&pageSize=${pageSize}`,
      method: 'get'
    })
  },
  // 显示天敌详细信息
  getEnemyInfo (enemyid) {
    return $axios({
      url: `/common/enemy/info?enemy=${enemyid}`,
      method: 'get'
    })
  },
  // 根据天敌科属联动检索
  getEnemyByCategory (params) {
    return $axios({
      url: '/common/enemy/foundbycate',
      method: 'post',
      data: params
    })
  },
  // 根据天敌图像检索
  getEnemyByPhoto (params) {
    return $axios({
      url: '/common/enemy/foundbyphoto',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  // 根据病害名称检索
  getDiseaseByName (params) {
    return $axios({
      url: '/common/disease/foundbyname',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  // 根据虫害名称检索
  getPestByName (params) {
    return $axios({
      url: '/common/pest/foundbyname',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  // 根据虫害科属联动检索
  getPestByCategory (params) {
    return $axios({
      url: '/common/pest/foundbycate',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  // 植保信息检索
  getProtectInfo (keyword = '稻瘟病', PageNum = 1, PageSize = 3) {
    return $axios({
      url: `/common/protect/foundbykey?keyword=${keyword}&PageNum=${PageNum}&PageSize=${PageSize}`,
      method: 'get'
    })
  },
  // 咨询信息检索
  getQuestionInfo (keyword = '水稻', PageNum = 1, PageSize = 3) {
    return $axios({
      url: `/common/message/foundbykey?keyword=${keyword}&PageNum=${PageNum}&PageSize=${PageSize}`,
      method: 'get'
    })
  }
}

export default common
