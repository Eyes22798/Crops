import {
  getCookie
} from '@/common/untils/cookieUntil'
import { stroage } from '@/common/untils/strogeUntil.js'

// 引用封装好的 stroage 构造器
const local = stroage.local
// 从 localStorege 中获取用户的详细信息
const userInfo = '' || local.get('userInfo')
// 获取后端定义的 cookie
const cookie = getCookie('JSSESSIONID') ? getCookie('JSSESSIONID') : null
// 创建唯一标识判断，判断登录状态
let sessionID
if (cookie && !local.get('JSSESSIONID')) {
  local.set('JSSESSIONID', cookie)
  sessionID = local.get('JSSESSIONID')
}

export default {
  userInfo,
  sessionID
}
