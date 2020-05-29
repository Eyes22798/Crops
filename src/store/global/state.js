import { stroage } from '@/common/untils/strogeUntil.js'

// 引用封装好的 stroage 构造器
const local = stroage.local
// 从 localStorege 中获取用户的详细信息
const userInfo = '' || local.get('userInfo')
// 创建唯一标识判断，判断登录状态
const sessionID = stroage.local.get('JSESSIONID')
// 从注册到登录信息
const namePassword = null
// 分页 name 属性
const pageName = null
// 联动搜索 传参
const category = null
// 病害名称
const diseaseName = null
// 虫害名称
const pestDiseaseName = null
// 图像识别得到的名字
const imageName = null
// 保存首页热点推送搜索文字
const searchText = null

export default {
  namePassword,
  userInfo,
  sessionID,
  pageName,
  category,
  diseaseName,
  pestDiseaseName,
  imageName,
  searchText
}
