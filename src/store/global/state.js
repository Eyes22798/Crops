import {
  getCookie
} from '@/common/untils/cookieUntil'
import { stroage } from '@/common/untils/strogeUntil.js'

// 引用封装好的 stroage 构造器
const local = stroage.local
// 从 localStorege 中获取用户的详细信息
const userInfo = '' || local.get('userInfo')
// 获取后端定义的 cookie
const cookie = getCookie('JSESSIONID') ? getCookie('JSESSIONID') : null
// 创建唯一标识判断，判断登录状态
let sessionID = local.get('JSESSIONID')
if (cookie && !local.get('JSESSIONID')) {
  local.set('JSESSIONID', cookie)
  sessionID = local.get('JSESSIONID')
}
// 从注册到登录信息
const namePassword = null

export default {
  namePassword,
  userInfo,
  sessionID
}
