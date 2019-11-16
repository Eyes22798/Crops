import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import common from './common'
import expert from './expert'
import ordinary from './ordinary'
import globalStore from '@/store/global'

Vue.use(Router)

// 合并所有的路由
const routerObj = Object.assign(
  common,
  expert,
  ordinary
)

const router = new Router({
  routes: routerObj
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
    if (globalStore.state.sessionID) {
      next()
    } else {
      // 避免登录死循环
      if (to.fullPath === '/login') {
        next()
      } else {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      }
    }
  } else {
    next()
  }
  NProgress.done()
})

export default router
