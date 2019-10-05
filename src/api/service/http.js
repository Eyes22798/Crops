import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import config from '../config'
import {
  getCookie
} from '@/common/untils/cookieUntil'
import globalStore from '@/store/global'
import router from '@/router'
import Vue from 'vue'

// 拿到 Vue 原型上的 $toast 对象
const $toast = Vue.prototype.$toast

const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
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
        if (config.params) {
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
            toLogin()
          }, 2000)
        }
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method.toLocaleLowerCase() === 'post' ||
          config.method.toLocaleLowerCase() === 'put' ||
          config.method.toLocaleLowerCase() === 'delete') {
          config.data = qs.stringify(config.data)
        }
        return config
      },
      error => {
        // 请求错误时做些事(接口错误、超时等) 关闭 nprogress
        NProgress.done()
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
        let data
        const responseError = new Error()
        responseError.data = data
        responseError.response = response
        const errorHandle = (status, other) => {
          // 状态码判断
          switch (status) {
            case 1000:
              responseError.message = '用户名或者密码错误'
              break
            case 1001:
              responseError.message = '该号码未绑定，请先注册'
              break
            case 1002:
              responseError.message = '验证码错误'
              break
            case 1003:
              responseError.message = '登录过期，请重新登录'
              break
            case 1004:
              responseError.message = '该号码已被注册，请重新输入'
              break
            case 1005:
              responseError.message = '请选择新的电话号码'
              break
            case 1006:
              responseError.message = '未找到任何相关信息'
              break
            default:
              console.log(other)
          }
        }
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = response.request.responseText
        } else {
          data = response.data
        }
        // 一切正常 结束 Nprogress
        NProgress.done()
        // 根据返回的code值来做不同的处理
        console.log(data)
        errorHandle(data.code, response.data.message)
        // 显示错误消息
        let errMessage = !!responseError.message
        if (errMessage) {
          $toast(`错误消息: ${responseError.message}`, {
            x: 'right',
            y: 'top',
            icon: 'info',
            color: 'error',
            dismissable: false,
            showClose: true
          })
        }
        return data
      },
      err => {
        NProgress.done()
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break

            case 401:
              err.message = '未授权，请登录'
              break

            case 403:
              err.message = '拒绝访问'
              break

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break

            case 408:
              err.message = '请求超时'
              break

            case 500:
              err.message = '服务器内部错误'
              break

            case 501:
              err.message = '服务未实现'
              break

            case 502:
              err.message = '网关错误'
              break

            case 503:
              err.message = '服务不可用'
              break

            case 504:
              err.message = '网关超时'
              break

            case 505:
              err.message = 'HTTP版本不受支持'
              break

            default:
          }
        }
        if (err.toString().includes('timeout')) {
          err.message = '抱歉，服务器超时，请稍后再试！'
        }
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
