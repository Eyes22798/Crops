# crops

> **本项目构建工具及其相关库**
>
> + 基本库：` Vue 2.60` + `vue-router 3.0.3` + `vuex 3.0.1`
> + 构建工具： `Vue `脚手架工具 ` Vue-cli 3.0 `+ `webpack-dev-server 3.7.2`
> + 项目UI框架:  使用 google 的 `vuetify 2.0.0`
> + CSS 预处理器：`sass-loader 7.1.0` + `stylus-loader 3.0.2`
> + ajax库：`axios 0.19.0`
> + 工具类：`qs 6.8.0` 、`nprogress 0.2.0` 、`vuetify-toast-snackbar 0.5.0`
> + 字体图标库： `Material Design Icons`、`Font-awesome 4.0`

## 1. 项目初始

### 安装项目

```shell
npm install
```

### 启动项目
```shell
npm run serve
```

### 打包项目
```shell
npm run build
```

### 测试项目
```shell
npm run test
```

### 修复文件
```shell
// Eslint 配置 standard 标准
npm run lint
npm run lint --fix		// 自动修复已知不规范代码
```

### 项目结构

> **项目初始目录**

```
.
|-- README.md						# 项目说明文件
|-- babel.config.js					# babel 配置文件
|-- package-lock.json					# package.josn 绑定文件
|-- package.json					# 项目管理文件
|-- postcss.config.js
|-- vue.config.js					# webpack 配置文件
|-- public
|   |-- favicon.ico
|   `-- index.html
`-- src
    |-- App.vue						# 路由文件顶层路由
    |-- api						# 后端交互相关方法和配置
    |   |-- config.js					# 项目配置：生产、开发、测试接口配置 全局常量
    |   |-- index.js					# sercice文件夹api统一出口
    |   `-- service					# 对应组件使用的api方法和数据处理
    |       |-- modules					# 对应组件相关api
    |		|	|-- index.js			# 导出所有模块的api
    |		|	|-- common.js			# 公共模块api
    |		|	|-- expert.js			# 专家模块api
    |		|	|-- ordinary.js			# 普通用户模块api
    |       `-- http.js					# 封装使用ajax方法，拦截器
    |-- assets						# 静态文件目录
    |   |-- icon					# 字体图标目录
    |   |-- images					# 静态图片目录(背景图，logo)
    |   |-- logo.png
    |   |-- logo.svg
    |   `-- styles					# 自定义样式目录(由于使用框架，此目录少改动)
    |       `-- base.css       
    |-- common						# 公有目录
    |   |-- const.js					# 封装的js变量(不包括axios)
    |   `-- untils					# 封装的工具函数
    |		|-- cookieUntil.js			# cookie 操作工具函数
    |		|-- untils.js				# 未定义扩展工具函数
    |-- components					# 公共组件目录
    |   |-- HelloWorld.vue
    |   |-- common					# 封装的公共组件(非项目可以使用)
    |	|	|-- Loading.vue				# loading 动画组件
    |	|	|-- Snackbars.vue			# message 提示组件
    |   `-- content					# 封装的公共组件(本项目使用)
    |		|-- Header.vue				# 公共组件--appbar
    |		|-- Footer.vue				# 公共组件--footer
    |-- main.js						# vue入口文件
    |-- plugins
    |   `-- vuetify.js					# vuetify 基本配置文件
    |-- router						# vue-router相关配置
    |   |-- index.js					# 导出所有路由
    |   `-- routes.js					# 所有路由
    |-- store						# vuex相关配置
    |   |-- global					# 全局vuex
    |   |   |-- actions.js
    |   |   |-- index.js				# 导出全局vuex配置
    |   |   |-- mutations.js
    |   |   `-- state.js
    |   |-- index.js
    |   `-- modules					# 模块vuex
    |       |-- disease.js
    |		|-- index.js				# 导出所有modules vuex配置
    |       `-- pest.js
    `-- views						# 视图(路由)组件
        |-- home					# 主页面
        |   |-- Home.vue
        |   `-- components
        |       |-- Mian.vue
        |       |-- Header.vue
        |       |-- Search.vue      			#搜索框
        |       `-- Slidebar.vue
        `-- login					# 登录页面
            |-- Login.vue
            `-- components

===============================================================================
项目结构树文档更新规则:
	+ 新增文件
	~ 修改文件
	- 删除文件
view 目录中更新不需要写文档
===============================================================================
>> 第一次更新 + api目录 	新增 modules 目录 => 对应模块 API
>> 第二次更新 ~ api目录 	修改 instance.js 文件名称为 http.js
>> 第三次更新 + 根目录	       新增 vue.config.js 文件 => webpack 配置文件
>> 第四次更新 ~ common目录 	修改 untils.js 文件变更为 untils 文件夹
>> 第五次更新 + untils目录 	新增 cookieUntil.js 文件 untils.js 文件
>> 第六次更新 + components目录 新增 Loading.vue Snackbars.vue 两个组件
>> 第七次更新 + components目录 新增 Header.vue Footer.vue 两个组件
```

## 2. 封装 `axios`

### 2.1 相关库介绍

#### 2.1.1 `qs` 库的使用

> + ajax请求的get请求是通过URL传参的(以？和&符连接)
> + post大多是通过json传参的。
>
> qs是一个库。里面的stringify方法可以将一个json对象直接转为(以?和&符连接的形式)。在开发中，发送请求的入参大多是一个对象。
>
> 在发送时，如果该请求为get请求，就需要对参数进行转化。使用该库，就可以自动转化，而不需要手动去拼接

```js
qs.stringify(config.data)			// 转化参数
```

#### 2.1.2 `nprogress` 库

> 进度条动画，模拟网络

``` js
NProgress.start()					// 开启动画
NProgress.done()					// 结束动画
```

#### 2.1.3 `vuetify-toast-snackbar` 库

> snackbar message 提示插件，高度封装，调用方便

```js
// vuetify-toast-snackbar 默认配置及可配置选项
Vue.use(VuetifyToast, {
    x: 'right', // default
    y: 'bottom', // default
    color: 'info', // default
    icon: 'info',
    iconColor: '', // default
    classes: [
        'body-2'
    ],
    timeout: 3000, // default
    dismissable: true, // default
    multiLine: false, // default
    vertical: false, // default
    queueable: false, // default
    showClose: false, // default
    closeText: '', // default
    closeColor: '', // default
    shorts: {
        custom: {
            color: 'purple'
        }
    },
    property: '$toast' // default
})
```

```js
// 引入
Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})
// 使用
Vue.use(VuetifyToast)

// 案例
this.$toast('异常错误!', {
  x: 'right',
  y: 'top',
  icon: 'info',
  color: 'error',
  dismissable: false,
  showClose: true
})
```

> **本项目中将添加到原型上的`$toast`变量存储为vuex变量，变量名称为`$toast`**

### 2.2  `Axios` 封装过程

#### 2.2.1 相关库的导入

``` js
// http.js 所需库
import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
```

#### 2.2.2 相关工具及其他文件导入

``` js
import config from '../config'
import { getCookie } from '@/common/untils/cookieUntil'		// 获取cookie 按操作
import globalStore from '@/store/global'					// 全局路由token或cookie或 jssessionid
import router from '@/router'								// 404、 跳转 login 跳转				
```

#### 2.2.3 封装 `toLogin`() 跳转登录

``` js
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
```

#### 2.2.4 封装 `HTTP` 状态码 错误处理

> 后端未统一，赶快和后端商量

``` js

```

#### 2.2.5 `Axios` 封装 骨架

> + `$axios()` 
>   + `Promise(resolve, reject)`
>     + 创建 `instance` 实例，并导入 `config.js` 配置
>     + `instance.interceptors.request` 请求拦截器
>     + `instance.interceptors.response` 响应拦截器
>     + `instance` 请求处理

``` js
export default function $axios (options) {
	return new Promise((resolve, reject) => {
        const instance = axios.create({...})
        instance.interceptors.request.use(...)
        instance.interceptors.response.use(...)
        instance.(options)
    })
}
```

#### 2.2.6 `HTTP` 请求拦截器

##### 2.2.6.1 **`Axios` 响应结构**

``` js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

  // `config` 是为请求提供的配置信息
  config: {},
  
  // `request` XMLHttpRequest 对象, client 响应结构体
  request: {
      readyState: 4,
      response: {
          // data 中的数据
      },
      responseText: {
          // data 中的数据
      },
      responseType: "",
      responseURL: "http://localhost:8080/eyes/index",
      responseXML: null,
      status: 200,
      statusText: "OK",
      timeout: 2000
  }
}
```

##### 2.2.6.2 `config` **参数配置**

> **请求响应参数**
>
> - `config` 参数

`Axios` 中 设置 config

``` js
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
  // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

![alt](data:image/png;base64,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)

##### 2.2.6.3 请求拦截器

``` js
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
```

##### 2.2.6.4 响应拦截器

``` js
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
              err.message = '服务器繁忙,请稍后再试!'
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
```

##### 2.2.6.5 封装成插件

```js
// 导出所有接口
import apiList from './service/modules'

const install = Vue => {
  if (install.installed) {
    return
  }
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    // 注意哦，此处挂载在 Vue 原型的 $api 对象上
    $api: {
      get () {
        return apiList
      }
    }
  })
}

export default install

// this.$api.common.login()
// this.$api.common.loginout().then(res => {console.log(res)})
```



### 2.3 API 封装

#### 2.3.1 modules 导出模块

> + common 公共模块接口
> + expert 专家模块接口
> + ordinary 普通用户模块接口

``` js
=========================================================================
本代码所在文件 index.js
=========================================================================
import common from './common'
import expert from './expert'
import ordinary from './ordinary'

export default {
  common,
  expert,
  ordinary
}
```

#### 2.3.2 `Common`模块

| 名称                       | 接口                                                         | 地址                                                         | 方法 |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| 用户注销                   | loginout(phone)                                              | /common/loginout?phone=${phone}                              | Get  |
| 用户登录                   | login(params)                                                | /common/login                                                | Post |
| 验证码登录                 | loginSendCode (params)                                       | /common/login/sendcode                                       | Post |
| 获取session数据            | getSessionData ()                                            | /common/get/user                                             | Get  |
| 普通用户注册               | ordinaryRegister (params)                                    | /common/ordinary/register                                    | Post |
| 专家用户注册               | expertRegister (params)                                      | /common/expert/register                                      | Post |
| 省市县三级联动             | linkAge (level = 1, parentId = 0)                            | /common/linkage?level=${level}&parentId=${parentId}          | Get  |
| 验证注册使用的电话         | registerSendCode (params)                                    | /common/register/sendcode                                    | Post |
| 个人信息修改               | updateInfo (params)                                          | /common/user/modify                                          | Post |
| 修改密码                   | updatePassword (params)                                      | /common/user/password                                        | Post |
| 验证电话号码               | phoneSendCode (params)                                       | /common/changephone/sendcode                                 | Post |
| 验证新的电话号码           | newPhoneSendCode (params)                                    | /common/modifyphone/sendcode                                 | Post |
| 验证验证码                 | verificationPhone (params)                                   | /common/phone/verification                                   | Post |
| 绑定电话修改               | updatePhone (params)                                         | /common/user/phone                                           | Post |
| 头像修改                   | updateAvatar (formData, config)                              | /common/user/photo                                           | Post |
| 作物信息检索               | getPlantByName (params)                                      | /common/plant/foundbyname                                    | Post |
| 显示作物的详细信息         | getPlantInfo (params)                                        | /common/plant/info                                           | Post |
| 根据作物科属联动检索       | getPlantByCategory (params)                                  | /common/plant/foundbycate                                    | Post |
| 根据作物图像检索           | getPlantInfo (plantID)                                       | /common/plant/info?plantID=${plantID}                        | Get  |
| 根据天敌名称检索           | getEnemyByName (params)                                      | /common/enemy/foundbyname                                    | Post |
| 显示天敌详细信息           | getEnemyInfo (enemyid)                                       | /common/enemy/info?enemy=${enemyid}                          | Post |
| 根据天敌科属联动检索       | getEnemyByCategory (params)                                  | /common/enemy/foundbycate                                    | Post |
| 显示界门纲目科属的所属关系 | getCategory (params)                                         | /common/category/found                                       | Post |
| 根据天敌图像检索           | getEnemyByPhoto (params)                                     | /common/enemy/foundbyphoto                                   | Post |
| 根据病害名称检索           | getDiseaseByName (params)                                    | /common/disease/foundbyname                                  | Post |
| 根据虫害名称检索           | getPestByName (params)                                       | /common/pest/foundbyname                                     | Post |
| 根据虫害科属联动检索       | getPestByCategory (params)                                   | /common/pest/foundbycate                                     | Post |
| 植保信息检索               | getProtectInfo (keyword = "稻瘟病", PageNum = 1, PageSize = 3) | /common/protect/foundbykey?keyword=${keyword}&PageNum=${PageNum}&PageSize=${PageSize} | Get  |
| 咨询信息检索               | getQuestionInfo (keyword = "水稻", PageNum = 1, PageSize = 3) | /common/message/foundbykey?keyword=${keyword}&PageNum=${PageNum}&PageSize=${PageSize} | Get  |

#### 2.3.3 `Expert` 模块

|          名称          | 接口                                            | 地址                                                         | 方法 |
| :--------------------: | :---------------------------------------------- | ------------------------------------------------------------ | ---- |
|      咨询信息检索      | getAnswerInfo (pagenum = 1, pagesize = 3)       | /expert/anwserbyexpertid/find?page=${pagenum}&pagesize=${pagesize} | Get  |
|        回答咨询        | addAnswerInfo (params)                          | /expert/answerbyexpertid/add                                 | Post |
|    修改自己相关回答    | updateAnswer (params)                           | /expert/answer/update                                        | Post |
|    删除自己相关回答    | deleteAnswer (params)                           | /expert/answer/remove                                        | Post |
|      诊断规则查询      | getRule (ruleid = 1, pagenum = 1, pagesize = 3) | /expert/rule/find?ruleid=${ruleid}&pagenum=${pagenum}&pagesize=${pagesize} | Get  |
|      增添诊断规则      | addRule (formData, config)                      | /expert/rule/save                                            | Get  |
|   删除自己相关的规则   | deleteRule (ruleid)                             | /expert/rule/remove?ruleid=${ruleid}                         | Get  |
|   修改自己录入的规则   | updateRule (params)                             | /expert/rule/update                                          | Post |
|    默认查询诊断模型    | getModel (pagenum = 1, pagesize = 3)            | /expert/model/find?pagenum=${pagenum}&pagesize=${pagesize}   | Get  |
|      增添诊断模型      | addModel (params)                               | /expert/model/add                                            | Post |
|   删除自己录入的模型   | deleteModel (modelId)                           | /expert/model/remove?modelID=${modelId}                      | Get  |
|   修改自己录入的模型   | updateModel (params)                            | /expert/model/update                                         | Post |
| 胁迫情况分析--概要信息 | getDuressMap ()                                 | /expert/operating/map                                        | Get  |
| 胁迫情况分析--详细信息 | getDuressMapInfo (pagenum = 1, pagesize = 3)    | /expert/information/find?pagenum=${pagenum}&pagesize=${pagesize} | Get  |
|      添加胁迫情报      | addDuress (params)                              | /expert/information/save                                     | Post |
| 删除自己录入的胁迫情报 | deleteDuress (infoid)                           | /expert/information/remove?infoid=${infoid}                  | Get  |
| 修改自己录入的胁迫情报 | updateDuress (params)                           | /expert/information/update                                   | Post |

#### 2.3.4 `Ordinary` 模块

| 名称                 | 接口                                          | 地址                                                         | 方法 |
| -------------------- | --------------------------------------------- | ------------------------------------------------------------ | ---- |
| 查询自己的咨询       | getOrdinarySelect (page = 1, pageSize = 2)    | /ordinary/quest/select?page=${page}&pageSize=${pageSize}     | Get  |
| 查询全部咨询         | getOrdinarySelectAll (page = 1, pageSize = 2) | /ordinary/quest/selectAll?page=${page}&pageSize=${pageSize}  | Get  |
| 添加咨询             | addQuestion (formData, config)                | /ordinary/quest/insert                                       | Post |
| 修改自己的咨询--文字 | updateQuestionText (params)                   | /ordinary/quest/update                                       | Post |
| 修改添加图片内容     | updateQuestionAddImg (formData, config)       | /ordinary/quest/insertImage                                  | Post |
| 删除图片             | updateQuestionDelImg (questID, imageID)       | /ordinary/quest/deleteImage?questID=${questID}&imageID=${imageID} | Get  |
| 删除咨询             | deleteQuestion (questID)                      | /ordinary/quest/delete?questID=${questID}                    | Get  |
| 胁迫情报上传         | uploadDuress (formData, config)               | /ordinary/info/insert                                        | Post |

## 3. 工具函数

### 3.1 `Cookie` 操作

> + 设置 cookie  **setCookie('cookie1', 'eyes', 50000)**
> + 获取 cookie  **getCookie(cookie1)**
> + 删除 cookie  **delCookie(cookie1)**

```js
// 设置cookie
export function setCookie (cName, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = cName + '=' + escape(value) + '; expires=' + date.toGMTString()
  console.log(document.cookie)
};
// 获取cookie
export function getCookie (cName) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + '=')
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      let cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) cEnd = document.cookie.length
      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
};
/* 删除cookie */
export function delCookie (cName) {
  setCookie(cName, '', -1)
};
```

## 4. 路由封装

### 4.1 `Vue.router`介绍

> **路由拦截 `beforeEach` 拦截器**

```js
router.beforeEach((to, from, next)) => {
	...
}
```

```js
/** 
 * to表示即将进入的页面路由，
 * to.fullPath 当前点击的页面 登录完成跳转页面
 * from表示当前导航正要离开的路由
 * next: Function:执行效果依赖 next 方法的调用参数。
 * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
 * next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
 * next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
 * next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
 */
```

### 4.2 封装路由

> 以不同模块拆分路由，便于管理和后期维护
>
> + index.js  导出所有的路由
> + common.js 公共模块路由
> + expert.js 专家模块路由
> + ordinary.js 普通用户路由

#### 4.2.1 公共模块路由

> **路由各参数设置**
>
> + path:  跳转路径 <vue-router to="/"></vue-router> 或者 <vue-router :to="{path: '/' }"></vue-router>
> + name: 路由名称
> + meta: 路由自定义属性
>   + title: 页面标题
>   + requireAuth: 是否需要登录 false true
> + component: Home

```js
========================================================================================
   common.js 文件
========================================================================================
import Home from '@/views/home/Home.vue'
import Login from '@/views/login/Login.vue'

const COMMON_ROUTER = [{
  path: '/',
  name: 'Home',
  meta: {
    title: '主页',
    requireAuth: false
  },
  // 跳默认路由用redirect
  component: Home
},
{
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录',
    requireAuth: false
  },
  component: Login
}
]

export default COMMON_ROUTER

```

#### 4.2.2 普通用户模块

```js
const ORDINARY_ROUTER = [
	...
]

export default ORDINARY_ROUTER
```

#### 4.2.3 专家用户模块

```js
const EXPERT_ROUTER = [
	...
]

export default EXPERT_ROUTER
```

#### 4.2.4 合并路由

> `Object.assign` **方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象**

```js
/*
  Object.assign() 方法讲解
  合并具有相同属性的对象
  复制对象 (浅拷贝)
  合并对象
*/

=========================================================
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source)
console.log(target)	// { a: 1, b: 4, c: 5 }
console.log(returnedTarget); // { a: 1, b: 4, c: 5 }
=========================================================
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
=========================================================
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1); // { a: 1, b: 2, c: 3 }注意目标对象自身也会改变
============================================================
```

__合并路由后导出__

```js
// 合并所有的路由
const routerObj = Object.assign(
  common,
  expert,
  ordinary
)

const router = new Router({
  routes: routerObj		// 注意是 routes 而不是 routers
})
```

***路由拦截器中使用了 Nprogress 插件，每次跳转路由时都会加载进度条动画***

**路由拦截器（权限管理）**

> 根据 vuex 中 `sessionID`  是否存在，然用户进行跳转登录
>
> 后面会添加 **登录过期** 判断

```js
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
    if (this.$store.state.sessionID) {
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
```

