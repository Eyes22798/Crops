import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import config from '../config'
import {
  getCookie,
  setCookie,
  delCookie
} from '@/common/untils/cookieUntil'
import globalStore from '@/store/global'
import router from '@/router'
import Vue from 'vue'

// 拿到 Vue 原型上的 $toast 对象
const $toast = Vue.prototype.$toast

const routerToObj = (type) => {
  router.replace({
    path: `/${type}`,
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

const errorHandle = (status, other) => {
  // 状态码判断
  const items = [
    [404, '数据不存在，请刷新一下'],
    [405, '请求出错，请再一下'],
    [406, '您未登录，请先登录'],
    [409, '服务端数据操作错误'],
    [500, '服务器错误，请稍后再试'],
    [1000, '用户名或者密码错误'],
    [1001, '该号码未注册，请先注册'],
    [1002, '验证码错误'],
    [1003, '登录已过期，请重新登录'],
    [1004, '该号码已停用，请重新输入'],
    [1005, '请使用一个新的电话号码'],
    [1006, '未找到任何相关信息']
  ]
  console.log(other)
  const statusMap = new Map(items)
  return statusMap.get(status)
}

const serverErrorHanle = (status) => {
  const items = [
    [400, '请求错误'],
    [401, '未授权，请登录'],
    [403, '拒绝访问'],
    [404, '请求地址出错'],
    [408, '请求超时'],
    [500, '服务器繁忙，请稍后再试'],
    [501, '服务器未实现'],
    [502, '网络错误'],
    [503, '服务不可用'],
    [504, '网络超时'],
    [505, 'HTTP版本不受支持']
  ]
  const errorMap = new Map(items)
  return errorMap.get(status)
}

export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // baseURL: config.baseURL,
      timeout: config.timeout,
      headers: config.headers
    })
    instance.defaults.headers.common['Authorization'] = getCookie('JSESSIONID')
    // http request 拦截器
    instance.interceptors.request.use(
      config => {
        if (config) {
          NProgress.start()
        }
        console.log(config)
        // 获取 cookie
        const token = globalStore.state.sessionID
        const loginMeta = config.url.toLocaleLowerCase().includes('common')
        // const token = getCookie('JSESSIONID')
        // bug-2
        console.log(`当前的token: ${token}`)
        if (!token && !loginMeta) {
          $toast('请先登录!', {
            x: 'right',
            y: 'top',
            icon: 'info',
            dismissable: false,
            showClose: true
          })
          // 没有 cookie 重定向到登录页
          setTimeout(() => {
            routerToObj('login')
          }, 2000)
        }
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if ((config.method.toLocaleLowerCase() === 'post' && !config.headers.AuthorizationPhoto) ||
          config.method.toLocaleLowerCase() === 'put' ||
          config.method.toLocaleLowerCase() === 'delete') {
          config.data = qs.stringify(config.data)
        }
        return config
      },
      error => {
        console.log('request:', error)
        $toast('异常错误!', {
          x: 'right',
          y: 'top',
          icon: 'info',
          color: 'error',
          dismissable: false,
          showClose: true
        })
        //  1.判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          $toast('抱歉，请求超时!', {
            x: 'right',
            y: 'top',
            icon: 'info',
            color: 'error',
            dismissable: false,
            showClose: true
          })
          console.log('请求超时')
          // 重新请求一次
          const originalRequest = error.config
          return instance.request(originalRequest)
        }
        //  2.需要重定向到错误页面
        const errorInfo = error.response
        $toast(`错误: ${errorInfo}`, {
          x: 'right',
          y: 'top',
          icon: 'info',
          color: 'error',
          dismissable: false,
          showClose: true
        })
        console.log(errorInfo)
        if (errorInfo) {
          // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status // 404 403 500 ... 等
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )
    // response 拦截器
    instance.interceptors.response.use(
      response => {
        console.log(response)
        // 拿到 header 上的 cookie
        let cookie = []
        if (response.headers.cookie) {
          cookie = response.headers.cookie.toString().split('=')
          setCookie(cookie[0], cookie[1], 50000)
        }
        // 1. 保存 response 中的数据
        //    注意： IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        let data
        if (response.data === undefined) {
          data = response.request.responseText
        } else {
          data = response.data
        }
        // 2. 处理错误请求 ==> 根据返回的code值来做不同的处理
        const responseError = new Error()
        responseError.data = data
        responseError.response = response
        // 特殊状态码特殊处理
        if (data.errcode === 404) {
          setTimeout(() => {
            routerToObj('404')
          })
        } else if (data.code === 1003) {
          // 清除 localstorage cookie 跳转登录
          delCookie('JSESSIONID')
          localStorage.clear()
          routerToObj('login')
        } else if (data.code === 500) {
          setTimeout(() => {
            routerToObj('500')
          })
        }
        responseError.message = errorHandle(data.code, response.data.message)
        // 3. 错误 => 显示错误消息 || 正常 => 结束 Nprogress 动画
        if (responseError.message) {
          $toast(`错误消息: ${responseError.message}`, {
            x: 'right',
            y: 'top',
            icon: 'info',
            color: 'error',
            dismissable: false,
            showClose: true,
            timeout: 2000
          })
        } else {
          NProgress.done()
        }
        return data
      },
      err => {
        NProgress.done()
        if (err && err.response) {
          err.message = serverErrorHanle(err.response.status)
        }
        if (err.toString().includes('timeout')) {
          err.message = '抱歉，服务器超时，请稍后再试！'
        }
        // 404 500 状态码跳转
        routerToObj(`${err.response.status}`)
        console.error(`错误消息： ${err}`)
        // 显示错误消息
        $toast(`错误: ${err.message}`, {
          x: 'right',
          y: 'top',
          icon: 'info',
          color: 'error',
          dismissable: false,
          showClose: true
        })
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )
    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res)
        return false
      })
      .catch((error) => {
        reject(error)
      })
  })
}
