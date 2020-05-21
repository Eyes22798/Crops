import $axios from '../http'
// 专家模块所有接口

const ordinary = {
  // 查询自己的咨询
  getOrdinarySelect (page = 1, pageSize = 2) {
    return $axios({
      url: `/ordinary/quest/select?page=${page}&pageSize=${pageSize}`,
      method: 'get'
    })
  },
  // 查询全部咨询
  getOrdinarySelectAll (page = 1, pageSize = 2) {
    return $axios({
      url: `/ordinary/quest/selectAll?page=${page}&pageSize=${pageSize}`,
      method: 'get'
    })
  },
  // 添加咨询
  addQuestion (formData) {
    return $axios({
      url: '/ordinary/quest/insert',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        'AuthorizationPhoto': 'updatePhoto'
      },
      data: formData
    })
  },
  // 修改自己的咨询--文字
  updateQuestionText (params) {
    return $axios({
      url: '/ordinary/quest/update',
      method: 'post',
      data: params
    })
  },
  // 修改添加图片内容
  updateQuestionAddImg (formData) {
    return $axios({
      url: '/ordinary/quest/insertImage',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        'AuthorizationPhoto': 'updatePhoto'
      },
      data: formData
    })
  },
  // 删除图片
  updateQuestionDelImg (questID, imageID) {
    return $axios({
      url: `/ordinary/quest/deleteImage?questID=${questID}&imageID=${imageID}`,
      method: 'get'
    })
  },
  // 删除咨询
  deleteQuestion (questID) {
    return $axios({
      url: `/ordinary/quest/delete?questID=${questID}`,
      method: 'get'
    })
  },
  // 胁迫情报上传
  uploadDuress (formData) {
    return $axios({
      url: '/ordinary/info/insert',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        'AuthorizationPhoto': 'updatePhoto'
      },
      data: formData
    })
  },
  getImageDataBySolr (name = '海棠', start = 0, row = 10) {
    return $axios({
      url: `/ordinary/solr?name=${name}&start=${start}&row=${row}`,
      method: 'get'
    })
  }
}

export default ordinary
