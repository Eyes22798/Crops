import {
  getCookie
} from '@/common/untils/cookieUntil'

import Vue from 'vue'
// vuetify-toast-snack $toast 变量
const $toast = Vue.prototype.$toast

let sessionID
const cookie = getCookie('JSSESSIONID') ? getCookie('JSSESSIONID') : null
if (cookie && !localStorage.getItem('JSSESSIONID')) {
  localStorage.setItem('JSSESSIONID', cookie)
  sessionID = localStorage.getItem('JSSESSIONID')
}

export default {
  // 全局状态
  sessionID,
  $toast
}
