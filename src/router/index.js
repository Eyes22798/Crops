import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import common from './common'
import expert from './expert'
import ordinary from './ordinary'
// import globalStore from '@/store/global'

// 拿到 Vue 原型上的 $toast 对象
const prototype = Vue.prototype

Vue.use(Router)

// 合并所有的路由
let routerArr = common.concat(expert, ordinary)
const router = new Router({
  routes: routerArr
})

// 设置路由拦截
router.beforeEach((to, from, next) => {
  NProgress.start()
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 验证是否需要登录
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 查询本地是否登录
    if (localStorage.getItem('userInfo')) {
      next()
    } else {
      // 避免登录死循环
      if (to.fullPath === '/login') {
        next()
      } else {
        prototype.$toast('请先登录或者注册!', {
          x: 'right',
          y: 'top',
          icon: 'info',
          dismissable: false,
          showClose: true,
          timeout: 1000
        })
        setTimeout(() => {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
        }, 1500)
      }
    }
  } else {
    next()
  }
  NProgress.done()
})

export default router
