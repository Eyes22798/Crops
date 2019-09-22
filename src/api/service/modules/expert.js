import $axios from '../http'
import qs from 'qs'
// 专家模块所有接口

const expert = {
  // 咨询信息检索
  getAnswerInfo (pagenum = 1, pagesize = 3) {
    return $axios({
      url: `/expert/anwserbyexpertid/find?page=${pagenum}&pagesize=${pagesize}`,
      method: 'get'
    })
  },
  // 回答咨询
  addAnswerInfo (params) {
    return $axios({
      url: `/expert/answerbyexpertid/add`,
      method: 'get',
      data: qs.stringify(params)
    })
  },
  // 修改自己相关回答
  updateAnswer (params) {
    return $axios({
      url: '/expert/answer/update',
      method: 'get',
      data: qs.stringify(params)
    })
  },
  // 删除自己相关回答
  deleteAnswer (params) {
    return $axios({
      url: '/expert/answer/remove',
      method: 'get',
      data: qs.stringify(params)
    })
  },
  // 诊断规则查询
  getRule (ruleid = 1, pagenum = 1, pagesize = 3) {
    return $axios({
      url: `/expert/rule/find?ruleid=${ruleid}&pagenum=${pagenum}&pagesize=${pagesize}`,
      method: 'get'
    })
  },
  // 增添诊断规则
  addRule (formData) {
    return $axios({
      url: '/expert/rule/save',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
  },
  // 删除自己相关的规则
  deleteRule (ruleid) {
    return $axios({
      url: `/expert/rule/remove?ruleid=${ruleid}`,
      method: 'get'
    })
  },
  // 修改自己录入的规则
  updateRule (params) {
    return $axios({
      url: '/expert/rule/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  // 默认查询诊断模型
  getModel (pagenum = 1, pagesize = 3) {
    return $axios({
      url: `/expert/model/find?pagenum=${pagenum}&pagesize=${pagesize}`,
      method: 'get'
    })
  },
  // 增添诊断模型
  addModel (params) {
    return $axios({
      url: `/expert/model/add`,
      method: 'post',
      data: qs.stringify(params)
    })
  },
  // 删除自己录入的模型
  deleteModel (modelId) {
    return $axios({
      url: `/expert/model/remove?modelID=${modelId}`,
      method: 'get'
    })
  },
  // 修改自己录入的模型
  updateModel (params) {
    return $axios({
      url: '/expert/model/update',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  // 胁迫情况分析--概要信息
  getDuressMap () {
    return $axios({
      url: '/expert/operating/map',
      method: 'get'
    })
  },
  // 胁迫情况分析--详细信息
  getDuressMapInfo (pagenum = 1, pagesize = 3) {
    return $axios({
      url: `/expert/information/find?pagenum=${pagenum}&pagesize=${pagesize}`,
      method: 'get'
    })
  },
  // 添加胁迫情报
  addDuress (params) {
    return $axios({
      url: '/expert/information/save',
      method: 'post',
      data: qs.stringify(params)
    })
  },
  // 删除自己录入的胁迫情报
  deleteDuress (infoid) {
    return $axios({
      url: `/expert/information/remove?infoid=${infoid}`,
      method: 'get'
    })
  },
  // 修改自己录入的胁迫情报
  updateDuress (params) {
    return $axios({
      url: '/expert/information/update',
      method: 'post',
      data: qs.stringify(params)
    })
  }
}

export default expert
