import Vue from 'vue'
import router from '@/router'

// 拿到 Vue 原型上的 $toast 对象
const prototype = Vue.prototype

export function ifLogin () {
  // 判断是否登录
  if (!localStorage.getItem('userInfo')) {
    prototype.$toast('请先登录!', {
      x: 'right',
      y: 'top',
      icon: 'info',
      dismissable: false,
      showClose: true
    })
    // 跳转到登录页
    setTimeout(() => {
      router.replace({
        path: `/login`,
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }, 1000)
    return false
  }
  return true
}
